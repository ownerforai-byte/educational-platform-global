package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileNotesResponse
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectRefDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.core.contract.MobileUnitsResponse
import com.ravikisan.platform.compose.core.contract.RNoteItemDto
import com.ravikisan.platform.compose.core.contract.RNoteResponse
import com.ravikisan.platform.compose.data.db.CacheEntry
import com.ravikisan.platform.compose.data.repository.StudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/** In-memory [StudyCache] fake standing in for the Room DAO (JVM tests). */
class FakeStudyCache : StudyCache {
    val rows = mutableMapOf<String, CacheEntry>()
    var clearCount = 0

    override suspend fun get(key: String): CacheEntry? = rows[key]
    override suspend fun put(key: String, json: String, updatedAt: Long) {
        rows[key] = CacheEntry(key = key, json = json, updatedAt = updatedAt)
    }

    override suspend fun delete(key: String) {
        rows.remove(key)
        clearCount++
    }
}

/**
 * Offline behavior tests for [SyllabusRepository] — the Room-cache-backed
 * cold-start path across all four payload kinds (tree, units, notes catalog,
 * note content). "Room-cached syllabus must survive airplane mode."
 */
class SyllabusRepositoryTest {

    private lateinit var api: FakeRnApi
    private lateinit var cache: FakeStudyCache
    private lateinit var repo: SyllabusRepository

    private val json = Json { ignoreUnknownKeys = true }

    private val classes = listOf(
        MobileClassDto(
            id = "c1",
            slug = "class-11-notes",
            name = "Class 11 Notes",
            subjects = listOf(MobileSubjectDto("s1", "physics", "Physics")),
        ),
    )

    private val treePayload =
        """{"ok":true,"data":{"classes":[{"id":"c1","slug":"class-11-notes",""" +
            """"name":"Class 11 Notes","subjects":[{"id":"s1","slug":"physics","name":"Physics"}]}]}}"""

    private val unitsPayload =
        """{"ok":true,"data":{"subject":{"id":"s1","slug":"physics","name":"Physics"},""" +
            """"units":[{"id":"u1","slug":"vectors","title":"Vectors","order":1,"topicCount":3}]}}"""

    private val notesPayload =
        """{"ok":true,"data":{"items":[{"id":"vectors-notes","subject":"physics",""" +
            """"chapter":"Vectors","title":"Vectors","noteCount":2}],"nextCursor":null}}"""

    private val noteContentPayload =
        """{"ok":true,"data":{"id":"vectors-notes","subject":"physics","chapter":"Vectors",""" +
            """"title":"Vectors","notes":["<p>Intro paragraph.</p>",""" +
            """"<h1>1. Laws</h1>","<p>Triangle law.</p>"]}}"""

    @Before
    fun setUp() {
        api = FakeRnApi()
        cache = FakeStudyCache()
        repo = SyllabusRepository(api, cache)
    }

    /** Unwraps Fresh/Cached payloads; fails the test on Unavailable. */
    private fun payloadOf(result: SyllabusRepository.Result): SyllabusRepository.Payload = when (result) {
        is SyllabusRepository.Result.Fresh -> result.payload
        is SyllabusRepository.Result.Cached -> result.payload
        is SyllabusRepository.Result.Unavailable -> throw AssertionError("unexpected Unavailable: " + result.message)
    }

    private fun cachedAgeOf(result: SyllabusRepository.Result): Long =
        (result as SyllabusRepository.Result.Cached).ageMs

    // ── tree ───────────────────────────────────────────────────────────────

    @Test
    fun `fresh tree fetch returns classes and writes the cache`() = kotlinx.coroutines.runBlocking {
        api.mobileSyllabusResponse = retrofit2.Response.success(
            json.decodeFromString(com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse.serializer(), treePayload),
        )
        val result = repo.load()
        val fresh = payloadOf(result) as SyllabusRepository.Payload.SyllabusTree
        assertEquals(listOf("class-11-notes"), fresh.classes.map { it.slug })
        assertEquals("Physics", fresh.classes[0].subjects[0].name)
        assertTrue(cache.rows.getValue(SyllabusRepository.SYLLABUS_CACHE_KEY).json.contains("class-11-notes"))
    }

    @Test
    fun `network failure serves the tree cache (airplane mode)`() = kotlinx.coroutines.runBlocking {
        cache.put(SyllabusRepository.SYLLABUS_CACHE_KEY, treePayload, System.currentTimeMillis())
        api.mobileSyllabusError = java.io.IOException("airplane mode")
        val result = repo.load()
        assertTrue(result is SyllabusRepository.Result.Cached)
        val cached = payloadOf(result) as SyllabusRepository.Payload.SyllabusTree
        assertEquals(listOf("class-11-notes"), cached.classes.map { it.slug })
        assertTrue(cachedAgeOf(result) >= 0)
    }

    @Test
    fun `http 500 serves the tree cache too`() = kotlinx.coroutines.runBlocking {
        cache.put(SyllabusRepository.SYLLABUS_CACHE_KEY, treePayload, System.currentTimeMillis())
        api.mobileSyllabusResponse = FakeRnApi.error(500, """{"error":"boom"}""")
        assertTrue(payloadOf(repo.load()) is SyllabusRepository.Payload.SyllabusTree)
    }

    @Test
    fun `cold start with no cache and no network is Unavailable with a friendly message`() =
        kotlinx.coroutines.runBlocking {
            api.mobileSyllabusError = java.io.IOException("airplane mode")
            val result = repo.load()
            assertTrue(result is SyllabusRepository.Result.Unavailable)
            val message = (result as SyllabusRepository.Result.Unavailable).message
            assertTrue(message.isNotBlank())
            assertTrue(message.length < 100) // displayable, not a stack trace
        }

    @Test
    fun `corrupt cache json falls back to Unavailable instead of crashing`() =
        kotlinx.coroutines.runBlocking {
            cache.put(SyllabusRepository.SYLLABUS_CACHE_KEY, "<html>corrupt</html>", System.currentTimeMillis())
            api.mobileSyllabusError = java.io.IOException("offline")
            assertTrue(repo.load() is SyllabusRepository.Result.Unavailable)
        }

    @Test
    fun `stale cache older than marker still serves (offline tolerance wins)`() =
        kotlinx.coroutines.runBlocking {
            cache.put(SyllabusRepository.SYLLABUS_CACHE_KEY, treePayload, updatedAt = 0L)
            api.mobileSyllabusError = java.io.IOException("offline")
            val result = repo.load()
            assertTrue(result is SyllabusRepository.Result.Cached)
            assertTrue(cachedAgeOf(result) > 0)
        }

    // ── units ──────────────────────────────────────────────────────────────

    @Test
    fun `fresh units fetch caches per subject key in NEB order`() = kotlinx.coroutines.runBlocking {
        api.mobileUnitsResponse = retrofit2.Response.success(
            json.decodeFromString(MobileUnitsResponse.serializer(), unitsPayload),
        )
        val result = repo.loadUnits("physics")
        val units = (payloadOf(result) as SyllabusRepository.Payload.Units).units
        assertEquals(listOf("Vectors"), units.map { it.title })
        assertEquals(3, units[0].topicCount)
        assertEquals("physics", api.lastUnitsSubject)
        assertTrue(cache.rows.containsKey("mobile-units:v1:physics"))
    }

    @Test
    fun `units offline fallback serves the per-subject cache`() = kotlinx.coroutines.runBlocking {
        cache.put("mobile-units:v1:physics", unitsPayload, System.currentTimeMillis())
        api.mobileUnitsError = java.io.IOException("airplane mode")
        val result = repo.loadUnits("physics")
        val units = (payloadOf(result) as SyllabusRepository.Payload.Units).units
        assertEquals("Vectors", units.single().title)
    }

    @Test
    fun `units 404 maps to Unavailable with the server's message`() = kotlinx.coroutines.runBlocking {
        api.mobileUnitsResponse = FakeRnApi.error(404, """{"error":"Subject not found"}""")
        val result = repo.loadUnits("nope")
        assertEquals("Subject not found", (result as SyllabusRepository.Result.Unavailable).message)
    }

    // ── notes catalog ──────────────────────────────────────────────────────

    @Test
    fun `first page is cached - cursor pages are not`() = kotlinx.coroutines.runBlocking {
        api.mobileNotesResponse = retrofit2.Response.success(
            json.decodeFromString(MobileNotesResponse.serializer(), notesPayload),
        )
        repo.loadNotes(chapter = "Vectors")
        assertTrue(cache.rows.keys.any { it.startsWith("mobile-notes:v1:") })

        val paged = notesPayload.replace("\"nextCursor\":null", "\"nextCursor\":\"YW5jaG9y\"")
        api.mobileNotesResponse = retrofit2.Response.success(
            json.decodeFromString(MobileNotesResponse.serializer(), paged),
        )
        repo.loadNotes(chapter = "Vectors", cursor = "YW5jaG9y")
        assertEquals(1, cache.rows.keys.count { it.startsWith("mobile-notes:v1:") })
    }

    @Test
    fun `notes catalog offline fallback serves the cached page`() = kotlinx.coroutines.runBlocking {
        cache.put("mobile-notes:v1:all:Vectors", notesPayload, System.currentTimeMillis())
        api.mobileNotesError = java.io.IOException("airplane mode")
        val result = repo.loadNotes(chapter = "Vectors")
        val items = (payloadOf(result) as SyllabusRepository.Payload.NoteCatalog).items
        assertEquals("vectors-notes", items.single().id)
    }

    // ── note content ───────────────────────────────────────────────────────

    @Test
    fun `note content fresh fetch caches per note id`() = kotlinx.coroutines.runBlocking {
        api.rNoteResponse = retrofit2.Response.success(
            json.decodeFromString(RNoteResponse.serializer(), noteContentPayload),
        )
        val result = repo.loadNoteContent("vectors-notes")
        val note = (payloadOf(result) as SyllabusRepository.Payload.NoteContent).note
        assertEquals(3, note.notes.size)
        assertTrue(cache.rows.containsKey("r-note:v1:vectors-notes"))
    }

    @Test
    fun `note content offline fallback serves the cached note`() = kotlinx.coroutines.runBlocking {
        cache.put("r-note:v1:vectors-notes", noteContentPayload, System.currentTimeMillis())
        api.rNoteError = java.io.IOException("airplane mode")
        val result = repo.loadNoteContent("vectors-notes")
        val note = (payloadOf(result) as SyllabusRepository.Payload.NoteContent).note
        assertEquals("Vectors", note.title)
    }

    @Test
    fun `note content 404 maps to Unavailable`() = kotlinx.coroutines.runBlocking {
        api.rNoteResponse = FakeRnApi.error(404, """{"error":"Note not found"}""")
        val result = repo.loadNoteContent("missing")
        assertEquals("Note not found", (result as SyllabusRepository.Result.Unavailable).message)
    }

    // ── cache management ───────────────────────────────────────────────────

    @Test
    fun `clearCache wipes only the given key`() = kotlinx.coroutines.runBlocking {
        cache.put(SyllabusRepository.SYLLABUS_CACHE_KEY, treePayload, System.currentTimeMillis())
        cache.put("r-note:v1:x", noteContentPayload, System.currentTimeMillis())
        repo.clearCache()
        assertEquals(null, cache.rows[SyllabusRepository.SYLLABUS_CACHE_KEY])
        assertEquals(1, cache.clearCount)
        assertTrue(cache.rows.containsKey("r-note:v1:x"))
    }

    @Test
    fun `domain mapping keeps class and subject identity for the UI`() = kotlinx.coroutines.runBlocking {
        cache.put(SyllabusRepository.SYLLABUS_CACHE_KEY, treePayload, System.currentTimeMillis())
        api.mobileSyllabusError = java.io.IOException("offline")
        val cached = payloadOf(repo.load()) as SyllabusRepository.Payload.SyllabusTree
        val klass: MobileClassDto = cached.classes.single()
        assertEquals("c1", klass.id)
        assertEquals("s1", klass.subjects.single().id)
    }
}
