package com.ravikisan.platform.compose.ui.screens.revision

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectRefDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.core.contract.MobileUnitsData
import com.ravikisan.platform.compose.core.contract.MobileUnitsResponse
import com.ravikisan.platform.compose.core.contract.MobileSyllabusData
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.studyplan.local.FakeGoalsStore
import java.time.LocalDate
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import retrofit2.Response

/**
 * `/revision` tests: the page renders only the student's goal subjects, the
 * countdown appears only while the exam is ahead, and the empty card shows
 * when no subject is chosen — all from the real chain ([FakeRnApi] wire,
 * [FakeStudyCache] Room, [FakeGoalsStore] device-local goals).
 */
class RevisionViewModelTest {

    private val today = LocalDate.of(2026, 3, 1)

    private val syllabus = MobileSyllabusResponse(
        ok = true,
        data = MobileSyllabusData(
            classes = listOf(
                MobileClassDto(
                    id = "c11",
                    slug = "class-11-notes",
                    name = "Class 11 Notes",
                    subjects = listOf(
                        MobileSubjectDto("s1", "physics", "Physics"),
                        MobileSubjectDto("s2", "chemistry", "Chemistry"),
                    ),
                ),
            ),
        ),
    )

    private fun api() = FakeRnApi().apply {
        mobileSyllabusResponse = Response.success(syllabus)
        mobileUnitsResponse = Response.success(
            MobileUnitsResponse(
                ok = true,
                data = MobileUnitsData(
                    subject = MobileSubjectRefDto("s1", "physics", "Physics"),
                    units = listOf(
                        MobileUnitDto("u1", "kinematics", "Kinematics", 1, 3),
                        MobileUnitDto("u2", "optics", "Optics", 2, 2),
                    ),
                ),
            ),
        )
    }

    private fun viewModel(goalsRaw: String?, api: FakeRnApi = api()) = RevisionViewModel(
        FakeGoalsStore(goalsRaw),
        SyllabusRepository(api, FakeStudyCache()),
        CoroutineScope(Dispatchers.Unconfined),
    )

    @Test
    fun `goal subjects render with their unit counts`() {
        val vm = viewModel("""{"subjects":["class-11-notes/physics"],"onboarded":true}""")

        vm.load(today)

        assertEquals(1, vm.state.value.subjects.size)
        assertEquals("Physics", vm.state.value.subjects.single().subjectName)
        assertEquals("Class 11 Notes", vm.state.value.subjects.single().className)
        assertEquals(2, vm.state.value.subjects.single().unitCount)
    }

    @Test
    fun `subjects outside the chosen goals are not listed`() {
        val vm = viewModel("""{"subjects":["class-11-notes/chemistry"]}""")

        vm.load(today)

        assertEquals(listOf("class-11-notes/chemistry"), vm.state.value.subjects.map { it.key })
    }

    @Test
    fun `countdown shows only while the exam date is ahead`() {
        val ahead = viewModel(
            """{"subjects":["class-11-notes/physics"],"examDate":"2026-03-11"}""",
        )
        ahead.load(today)
        assertEquals(10, ahead.state.value.daysLeft)

        val past = viewModel(
            """{"subjects":["class-11-notes/physics"],"examDate":"2026-02-20"}""",
        )
        past.load(today)
        assertNull(past.state.value.daysLeft)
    }

    @Test
    fun `no goals record shows the empty card state`() {
        val vm = viewModel(null)

        vm.load(today)

        assertTrue(vm.state.value.subjects.isEmpty())
        assertTrue(vm.state.value.goalsEmpty)
        assertEquals(false, vm.state.value.loading)
    }

    @Test
    fun `offline with a cached syllabus still lists goal subjects`() {
        val cache = FakeStudyCache()
        // Warm the cache with a live call first.
        val warm = RevisionViewModel(
            FakeGoalsStore("""{"subjects":["class-11-notes/physics"]}"""),
            SyllabusRepository(api(), cache),
            CoroutineScope(Dispatchers.Unconfined),
        )
        warm.load(today)

        val offlineApi = FakeRnApi().apply {
            mobileSyllabusError = java.io.IOException("airplane")
            mobileUnitsError = java.io.IOException("airplane")
        }
        val offline = RevisionViewModel(
            FakeGoalsStore("""{"subjects":["class-11-notes/physics"]}"""),
            SyllabusRepository(offlineApi, cache),
            CoroutineScope(Dispatchers.Unconfined),
        )
        offline.load(today)

        assertEquals(listOf("class-11-notes/physics"), offline.state.value.subjects.map { it.key })
        // Units fell back to the cached row only if it was written; the count is
        // optional, so a null unit count is acceptable offline.
        assertEquals(2, offline.state.value.subjects.single().unitCount)
    }
}
