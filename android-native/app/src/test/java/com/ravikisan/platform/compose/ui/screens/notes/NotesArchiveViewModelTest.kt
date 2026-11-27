package com.ravikisan.platform.compose.ui.screens.notes

import com.ravikisan.platform.compose.core.contract.CursorPageDto
import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobileNotesResponse
import com.ravikisan.platform.compose.core.contract.RNoteItemDto
import com.ravikisan.platform.compose.core.contract.RNoteResponse
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import retrofit2.Response

/**
 * `/notes` archive tests against the REAL repository chain ([FakeRnApi] as the
 * wire, [FakeStudyCache] as Room): paging, offline fallback into the saved
 * archive, the website's search/subject filtering, the per-subject 30-row cap
 * and the reader.
 */
class NotesArchiveViewModelTest {

    private fun note(id: String, subject: String, chapter: String, title: String) =
        MobileNoteItemDto(id = id, subject = subject, chapter = chapter, title = title, noteCount = 1)

    private fun page(vararg items: MobileNoteItemDto, nextCursor: String? = null) =
        MobileNotesResponse(ok = true, data = CursorPageDto(items.toList(), nextCursor))

    private fun apiWith(vararg items: MobileNoteItemDto) = FakeRnApi().apply {
        mobileNotesResponse = Response.success(page(*items))
    }

    private fun viewModel(api: FakeRnApi, cache: FakeStudyCache = FakeStudyCache()) =
        NotesArchiveViewModel(
            SyllabusRepository(api, cache),
            CoroutineScope(Dispatchers.Unconfined),
        )

    @Test
    fun `first page loads into the archive and is cached`() {
        val cache = FakeStudyCache()
        val vm = viewModel(
            apiWith(note("n1", "physics", "kinematics", "Motion basics")),
            cache,
        )
        vm.load()

        assertEquals(1, vm.state.value.items.size)
        assertFalse(vm.state.value.fromCache)
        assertTrue(cache.rows.containsKey("mobile-notes:v1:all"))
    }

    @Test
    fun `offline start serves the saved archive and flags it`() {
        val cache = FakeStudyCache()
        val online = viewModel(
            apiWith(note("n1", "physics", "kinematics", "Motion basics")),
            cache,
        )
        online.load()

        val offlineApi = FakeRnApi().apply { mobileNotesError = java.io.IOException("airplane") }
        val offline = viewModel(offlineApi, cache)
        offline.load()

        assertTrue(offline.state.value.fromCache)
        assertEquals(listOf("n1"), offline.state.value.items.map { it.id })
        assertNull(offline.state.value.error)
    }

    @Test
    fun `no network and no cache surfaces the honest error`() {
        val api = FakeRnApi().apply { mobileNotesError = java.io.IOException("airplane") }
        val vm = viewModel(api)

        vm.load()

        assertTrue(vm.state.value.items.isEmpty())
        assertEquals("Couldn't reach the server", vm.state.value.error)
    }

    @Test
    fun `query filters across groups and drops empty ones`() {
        val vm = viewModel(
            apiWith(
                note("n1", "physics", "kinematics", "Motion basics"),
                note("n2", "chemistry", "bonding", "Hybridisation rules"),
            ),
        )
        vm.load()

        vm.onQueryChanged("hyb")

        assertEquals(listOf("chemistry"), vm.state.value.groups.map { it.subject })
        assertEquals(1, vm.state.value.resultCount)
    }

    @Test
    fun `subject chip narrows the archive and toggles back to all subjects`() {
        val vm = viewModel(
            apiWith(
                note("n1", "physics", "kinematics", "Motion basics"),
                note("n2", "chemistry", "bonding", "Hybridisation rules"),
            ),
        )
        vm.load()

        vm.onSubjectSelected("physics")
        assertEquals(listOf("physics"), vm.state.value.groups.map { it.subject })

        vm.onSubjectSelected(null)
        assertEquals(2, vm.state.value.groups.size)
    }

    @Test
    fun `groups cap at 30 rows and report the hidden remainder`() {
        val api = apiWith(*(1..32).map { note("n$it", "physics", "kinematics", "Note $it") }.toTypedArray())
        val vm = viewModel(api)
        vm.load()

        val group = vm.state.value.groups.single()
        assertEquals(30, group.notes.size)
        assertEquals(2, group.hidden)
    }

    @Test
    fun `load more appends the next cursor page`() {
        val api = FakeRnApi()
        api.mobileNotesResponse = Response.success(
            page(note("n1", "physics", "kinematics", "Motion"), nextCursor = "c2"),
        )
        val vm = viewModel(api)
        vm.load()
        // The same fake now answers the paging request with the tail page.
        api.mobileNotesResponse = Response.success(
            page(note("n2", "physics", "kinematics", "Momentum"), nextCursor = null),
        )

        vm.loadMore()

        assertEquals(listOf("n1", "n2"), vm.state.value.items.map { it.id })
        assertTrue(vm.state.value.endReached)
    }

    @Test
    fun `opening a note renders reader sections`() {
        val api = apiWith(note("n1", "physics", "kinematics", "Motion basics"))
        api.rNoteResponse = Response.success(
            RNoteResponse(
                ok = true,
                data = RNoteItemDto(
                    id = "n1",
                    subject = "physics",
                    chapter = "kinematics",
                    title = "Motion basics",
                    notes = listOf("<h1>Displacement</h1>", "<p>Vector quantity.</p>"),
                ),
            ),
        )
        val vm = viewModel(api)
        vm.load()

        vm.openNote("n1")

        val reader = vm.state.value.reader
        assertEquals("Motion basics", reader?.title)
        assertEquals("Displacement", reader?.sections?.single()?.heading)
        assertFalse(reader!!.fromCache)

        vm.closeNote()
        assertNull(vm.state.value.reader)
    }

    @Test
    fun `subject chips expose counts in stable order`() {
        val vm = viewModel(
            apiWith(
                note("n1", "physics", "kinematics", "Motion basics"),
                note("n2", "physics", "optics", "Lens formula"),
                note("n3", "chemistry", "bonding", "Hybridisation rules"),
            ),
        )
        vm.load()

        assertEquals(listOf("chemistry" to 1, "physics" to 2), vm.state.value.subjectChips)
    }
}
