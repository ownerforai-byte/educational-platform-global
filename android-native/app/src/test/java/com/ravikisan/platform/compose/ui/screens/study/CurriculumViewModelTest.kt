package com.ravikisan.platform.compose.ui.screens.study

import com.ravikisan.platform.compose.core.contract.CursorPageDto
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobileNotesResponse
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectRefDto
import com.ravikisan.platform.compose.core.contract.MobileSyllabusData
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.core.contract.MobileUnitsData
import com.ravikisan.platform.compose.core.contract.MobileUnitsResponse
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

class CurriculumViewModelTest {
    @Test
    fun `tree and units preserve server curriculum ordering`() {
        val api = FakeRnApi().apply {
            mobileSyllabusResponse = Response.success(
                MobileSyllabusResponse(
                    ok = true,
                    data = MobileSyllabusData(
                        listOf(
                            MobileClassDto("c11", "class-11-notes", "Class 11 Notes", listOf(MobileSubjectDto("s1", "biology", "Biology"))),
                            MobileClassDto("c12", "class-12-notes", "Class 12 Notes", listOf(MobileSubjectDto("s2", "physics", "Physics"))),
                        ),
                    ),
                ),
            )
            mobileUnitsResponse = Response.success(
                MobileUnitsResponse(
                    ok = true,
                    data = MobileUnitsData(
                        MobileSubjectRefDto("s2", "physics", "Physics"),
                        listOf(
                            MobileUnitDto("u1", "rotational-dynamics", "Rotational Dynamics", 1, 3),
                            MobileUnitDto("u2", "periodic-motion", "Periodic Motion", 2, 2),
                        ),
                    ),
                ),
            )
        }
        val vm = viewModel(api)

        vm.loadTree()
        assertEquals(listOf("class-11-notes", "class-12-notes"), vm.state.value.tree.map { it.slug })
        vm.loadUnits("physics")
        assertEquals(listOf("Rotational Dynamics", "Periodic Motion"), vm.state.value.units.map { it.title })
        assertEquals("physics", api.lastUnitsSubject)
        assertNull(vm.state.value.error)
    }

    @Test
    fun `theory catalog uses live notes endpoint and reports no cache for fresh data`() {
        val api = FakeRnApi().apply {
            mobileNotesResponse = Response.success(
                MobileNotesResponse(
                    ok = true,
                    data = CursorPageDto(
                        items = listOf(MobileNoteItemDto("note-1", "physics", "Rotational Dynamics", "Angular momentum", 4)),
                        nextCursor = null,
                    ),
                ),
            )
        }
        val vm = viewModel(api)

        vm.loadNotes("physics")

        assertEquals("note-1", vm.state.value.notes.single().id)
        assertEquals("subject=physics chapter=null cursor=null", api.lastNotesQuery)
        assertFalse(vm.state.value.notesFromCache)
        assertFalse(vm.state.value.notesLoading)
        assertNull(vm.state.value.notesError)
    }

    @Test
    fun `cold offline syllabus shows an honest unavailable message`() {
        val api = FakeRnApi().apply { mobileSyllabusError = java.io.IOException("offline") }
        val vm = viewModel(api)

        vm.loadTree()

        assertTrue(vm.state.value.tree.isEmpty())
        assertFalse(vm.state.value.loading)
        assertFalse(vm.state.value.error.isNullOrBlank())
    }

    private fun viewModel(api: FakeRnApi) = SyllabusViewModel(
        SyllabusRepository(api, FakeStudyCache()),
        CoroutineScope(Dispatchers.Unconfined),
    )
}
