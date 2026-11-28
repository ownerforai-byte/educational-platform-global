package com.ravikisan.platform.compose.data.repository

import com.ravikisan.platform.compose.core.contract.CursorPageDto
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobileNotesResponse
import com.ravikisan.platform.compose.core.contract.MobileSyllabusData
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.core.contract.MobileUnitsData
import com.ravikisan.platform.compose.core.contract.MobileUnitsResponse
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.core.contract.RNoteResponse
import com.ravikisan.platform.compose.data.api.RnApi
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

/**
 * Study data source (syllabus tree, units, notes) with offline tolerance:
 * - online: live `GET` → return fresh + write the Room cache;
 * - offline / API error: serve the Room cache (stale-but-usable);
 * - cold start with no cache: [Result.Unavailable] with a user-displayable message.
 *
 * Wire DTOs mirror the pinned backend schemas (`mobileSyllabusResponseSchema`,
 * `mobileUnitsResponseSchema`, `mobileNotesResponseSchema`, r-notes manifest item).
 * Agent 4's fakes stay for unit tests only — never for UI.
 */
class SyllabusRepository(
    private val api: RnApi,
    private val cache: StudyCache,
    private val json: Json = Json { ignoreUnknownKeys = true },
) {

    sealed class Result {
        /** Live fetch succeeded. */
        data class Fresh(val payload: Payload) : Result()

        /** Network/HTTP failed — served from the offline cache instead. */
        data class Cached(val payload: Payload, val ageMs: Long) : Result()

        /** No network and no cache (cold start in airplane mode), or 404/not found. */
        data class Unavailable(val message: String) : Result()
    }

    /** The one payload kind a call returned. */
    sealed class Payload {
        data class SyllabusTree(val classes: List<MobileClassDto>) : Payload()
        data class Units(
            val subjectSlug: String,
            val units: List<MobileUnitDto>,
            val classSlug: String? = null,
        ) : Payload()
        data class NoteCatalog(
            val items: List<MobileNoteItemDto>,
            val nextCursor: String?,
            val pageKey: String,
        ) : Payload()

        data class NoteContent(val note: com.ravikisan.platform.compose.core.contract.RNoteItemDto) : Payload()
    }

    // ── Syllabus tree ──────────────────────────────────────────────────────

    suspend fun load(): Result = fetchAndCache(
        cacheKey = SYLLABUS_CACHE_KEY,
        fetch = { api.mobileSyllabus() },
        extract = { it.data?.classes?.let { classes -> Payload.SyllabusTree(classes) } },
        encode = { payload ->
            json.encodeToString(
                MobileSyllabusResponse.serializer(),
                MobileSyllabusResponse(ok = true, data = MobileSyllabusData(payload.classes)),
            )
        },
        decodeCache = { raw ->
            json.decodeFromString<MobileSyllabusResponse>(raw)
                .data?.classes?.let { Payload.SyllabusTree(it) }
        },
    )

    // ── Units (per subject) ────────────────────────────────────────────────

    suspend fun loadUnits(subjectSlug: String, classSlug: String? = null): Result {
        val normalizedClass = classSlug?.trim()?.takeIf { it.isNotEmpty() }
        val cacheKey = normalizedClass?.let { "mobile-units:v1:c:$it:$subjectSlug" }
            ?: "mobile-units:v1:$subjectSlug"
        return fetchAndCache(
            cacheKey = cacheKey,
            fetch = {
                if (normalizedClass == null) api.mobileUnits(subjectSlug)
                else api.mobileUnitsScoped(subjectSlug, normalizedClass)
            },
            extract = { response ->
                response.data?.units?.takeIf { response.data.subject != null }?.let {
                    Payload.Units(response.data.subject!!.slug, it, normalizedClass)
                }
            },
            encode = { payload ->
                json.encodeToString(
                    MobileUnitsResponse.serializer(),
                    MobileUnitsResponse(
                        ok = true,
                        data = MobileUnitsData(
                            subject = com.ravikisan.platform.compose.core.contract.MobileSubjectRefDto(
                                id = payload.subjectSlug,
                                slug = payload.subjectSlug,
                                name = payload.subjectSlug,
                            ),
                            units = payload.units,
                        ),
                    ),
                )
            },
            decodeCache = { raw ->
                json.decodeFromString<MobileUnitsResponse>(raw).data?.let {
                    Payload.Units(it.subject?.slug ?: "", it.units, normalizedClass)
                }
            },
            notFoundMessage = if (normalizedClass == null) "Subject not found" else "Class or subject not found",
        )
    }

    // ── Notes catalog (cursor-paginated; first page cached) ───────────────

    suspend fun loadNotes(
        subject: String? = null,
        chapter: String? = null,
        cursor: String? = null,
        limit: Int? = null,
    ): Result {
        val pageKey = "mobile-notes:v1:" + (subject ?: "all") +
            (chapter?.let { ":$it" } ?: "") +
            if (cursor == null) "" else ":p"
        return fetchAndCache(
            cacheKey = pageKey,
            fetch = { api.mobileNotes(subject, chapter, limit, cursor) },
            extract = { response ->
                response.data?.let { page ->
                    Payload.NoteCatalog(page.items, page.nextCursor, pageKey)
                }
            },
            encode = { payload ->
                json.encodeToString(
                    MobileNotesResponse.serializer(),
                    MobileNotesResponse(
                        ok = true,
                        data = CursorPageDto(payload.items, payload.nextCursor),
                    ),
                )
            },
            decodeCache = { raw ->
                json.decodeFromString<MobileNotesResponse>(raw).data?.let {
                    Payload.NoteCatalog(it.items, it.nextCursor, pageKey)
                }
            },
            // Cursor pages are transient — only the first page is worth caching.
            cacheWrite = cursor == null,
        )
    }

    // ── Note content ───────────────────────────────────────────────────────

    suspend fun loadNoteContent(noteId: String): Result = fetchAndCache(
        cacheKey = "r-note:v1:$noteId",
        fetch = { api.rNote(noteId) },
        extract = { response ->
            response.data?.let { Payload.NoteContent(it) }
        },
        encode = { payload ->
            json.encodeToString(RNoteResponse.serializer(), RNoteResponse(ok = true, data = payload.note))
        },
        decodeCache = { raw ->
            json.decodeFromString<RNoteResponse>(raw).data?.let { Payload.NoteContent(it) }
        },
        notFoundMessage = "Note not found",
    )

    // ── Generic fetch → cache → fallback engine ───────────────────────────

    private suspend fun <T, P : Payload> fetchAndCache(
        cacheKey: String,
        fetch: suspend () -> retrofit2.Response<T>,
        extract: (T) -> P?,
        encode: (P) -> String,
        decodeCache: (String) -> P?,
        notFoundMessage: String? = null,
        cacheWrite: Boolean = true,
    ): Result {
        // 1. Try the network first.
        val network = runCatching { fetch() }
        val response = network.getOrNull()
        if (response != null) {
            if (response.code() == 404 && notFoundMessage != null) {
                return Result.Unavailable(notFoundMessage)
            }
            if (response.isSuccessful) {
                val payload = response.body()?.let(extract)
                if (payload != null) {
                    if (cacheWrite) {
                        // Re-serialize the typed payload — raw bodies are unavailable
                        // on some transports and the typed form is exactly what
                        // decodeCache reads back.
                        cache.put(cacheKey, encode(payload), System.currentTimeMillis())
                    }
                    return Result.Fresh(payload)
                }
            }
        }
        // 2. Fall back to the offline cache.
        return loadCached(cacheKey, fallbackMessage = "Couldn't reach the server")
    }

    /** Force the cached path (tests + manual refresh fallback). */
    suspend fun loadCached(cacheKey: String, fallbackMessage: String = "Offline and no saved copy yet"): Result {
        val entry = runCatching { cache.get(cacheKey) }.getOrNull()
        val payload = entry?.json?.takeIf { it.isNotBlank() }?.let { raw ->
            runCatching { decodeAny(cacheKey, raw) }.getOrNull()
        }
        return if (payload != null) {
            Result.Cached(payload, ageMs = System.currentTimeMillis() - (entry?.updatedAt ?: 0))
        } else {
            Result.Unavailable(fallbackMessage)
        }
    }

    private fun decodeAny(cacheKey: String, raw: String): Payload? = when {
        cacheKey == SYLLABUS_CACHE_KEY ->
            json.decodeFromString<MobileSyllabusResponse>(raw).data?.classes
                ?.let { Payload.SyllabusTree(it) }
        cacheKey.startsWith("mobile-units:v1:") -> {
            val classSlug = cacheKey
                .removePrefix("mobile-units:v1:c:")
                .takeIf { cacheKey.startsWith("mobile-units:v1:c:") }
                ?.substringBefore(':')
            json.decodeFromString<MobileUnitsResponse>(raw).data
                ?.let { Payload.Units(it.subject?.slug ?: "", it.units, classSlug) }
        }
        cacheKey.startsWith("mobile-notes:v1:") ->
            json.decodeFromString<MobileNotesResponse>(raw).data
                ?.let { Payload.NoteCatalog(it.items, it.nextCursor, cacheKey) }
        cacheKey.startsWith("r-note:v1:") ->
            json.decodeFromString<RNoteResponse>(raw).data?.let { Payload.NoteContent(it) }
        else -> null
    }

    /** Sign-out / corrupt-cache recovery for one payload kind. */
    suspend fun clearCache(cacheKey: String = SYLLABUS_CACHE_KEY) {
        cache.delete(cacheKey)
    }

    companion object {
        const val SYLLABUS_CACHE_KEY: String = "mobile-syllabus:v1"
    }
}
