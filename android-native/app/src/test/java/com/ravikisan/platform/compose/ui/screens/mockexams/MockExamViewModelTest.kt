package com.ravikisan.platform.compose.ui.screens.mockexams

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileSyllabusData
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.mockexams.local.FakeMockExamSource
import com.ravikisan.platform.compose.ui.screens.mockexams.local.MockExamSource
import com.ravikisan.platform.compose.ui.screens.mockexams.local.PendingBindingMockExamSource
import com.ravikisan.platform.compose.ui.screens.studyplan.local.FakeGoalsStore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import retrofit2.Response

/**
 * `/mock-exams` ViewModel tests — the landed golden `MockExam.kt` algorithm is
 * bound through this VM, so the assertions cover the website's flow: goal-first
 * subject list, seeded paper assembly, OMR answers, auto/self scoring, the
 * answer key, countdown auto-submit and the empty card for an unindexed subject.
 */
class MockExamViewModelTest {

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

    private fun api() = FakeRnApi().apply { mobileSyllabusResponse = Response.success(syllabus) }

    private fun viewModel(
        goalsRaw: String? = null,
        source: MockExamSource = FakeMockExamSource(),
        api: FakeRnApi = api(),
    ) = MockExamViewModel(
        FakeGoalsStore(goalsRaw),
        SyllabusRepository(api, FakeStudyCache()),
        source,
        CoroutineScope(Dispatchers.Unconfined),
    ).apply { init() }

    @Test
    fun `goal subjects come first in the picker`() {
        val vm = viewModel("""{"subjects":["class-11-notes/chemistry"]}""")

        assertEquals(listOf("class-11-notes/chemistry"), vm.state.value.subjects.map { it.key })
        assertEquals("class-11-notes/chemistry", vm.state.value.subjectKey)
    }

    @Test
    fun `all subjects are offered when no goal is set`() {
        val vm = viewModel()

        assertEquals(2, vm.state.value.subjects.size)
        assertEquals("class-11-notes/physics", vm.state.value.subjectKey)
    }

    @Test
    fun `start assembles the paper from both pools`() {
        val vm = viewModel()

        vm.start(seed = 1)

        val paper = vm.state.value.paper
        assertNotNull(paper)
        assertEquals(3, paper!!.objective.size)
        assertEquals(1, paper.written.size)
        // 3 MCQs (1 min each) + 4 written marks × 2 = 11 minutes on the clock.
        assertEquals(11 * 60, vm.state.value.secondsLeft)
        assertEquals(7.0, paper.totalMarks, 0.0)
    }

    @Test
    fun `answering scores correct wrong and blank`() {
        val vm = viewModel()
        vm.start(seed = 1)
        val paper = vm.state.value.paper!!
        val objective = paper.objective

        vm.choose(objective[0].id, objective[0].answer)
        vm.choose(objective[1].id, (objective[1].answer + 1) % objective[1].options.size)
        // objective[2] stays blank
        vm.submit()

        val score = vm.state.value.score!!
        assertEquals(1, score.correct)
        assertEquals(1, score.wrong)
        assertEquals(1, score.blank)
        assertEquals(1, score.objectiveMarks)
    }

    @Test
    fun `written self-marks are clamped to the item maximum`() {
        val vm = viewModel()
        vm.start(seed = 1)
        val written = vm.state.value.paper!!.written.single()

        vm.setMarks(written.id, 9.0)
        vm.submit()
        vm.setMarks(written.id, 9.0)

        assertEquals(4.0, vm.state.value.score!!.writtenMarks, 0.0)
    }

    @Test
    fun `marks are ignored before submitting`() {
        val vm = viewModel()
        vm.start(seed = 1)
        val written = vm.state.value.paper!!.written.single()

        vm.setMarks(written.id, 2.0)

        assertTrue(vm.state.value.marks.isEmpty())
    }

    @Test
    fun `answer key previews every objective item in order`() {
        val vm = viewModel()
        vm.start(seed = 1)
        val paper = vm.state.value.paper!!

        val key = vm.state.value.answerKey

        assertEquals(listOf(1, 2, 3), key.map { it.number })
        key.forEachIndexed { index, row ->
            assertEquals(vm.state.value.paper!!.objective[index].id, row.id)
        }
    }

    @Test
    fun `countdown auto-submits at zero and stops`() {
        val vm = viewModel()
        vm.start(seed = 1)
        val seconds = vm.state.value.secondsLeft

        repeat(seconds) { vm.tick() }
        vm.tick()

        assertTrue(vm.state.value.submitted)
        assertEquals(0, vm.state.value.secondsLeft)
    }

    @Test
    fun `answers are frozen after submitting`() {
        val vm = viewModel()
        vm.start(seed = 1)
        val item = vm.state.value.paper!!.objective[0]
        vm.submit()

        vm.choose(item.id, item.answer)

        assertTrue(vm.state.value.answers.isEmpty())
    }

    @Test
    fun `subject with no pools shows the empty card`() {
        val vm = viewModel(
            source = PendingBindingMockExamSource(),
            api = FakeRnApi().apply { mobileSyllabusResponse = Response.success(syllabus) },
        )

        assertTrue(vm.state.value.empty)
    }

    @Test
    fun `picking another subject clears the paper`() {
        val vm = viewModel()
        vm.start(seed = 1)

        vm.pickSubject("class-11-notes/chemistry")

        assertEquals("class-11-notes/chemistry", vm.state.value.subjectKey)
        assertNull(vm.state.value.paper)
        assertFalse(vm.state.value.submitted)
        assertEquals(0, vm.state.value.secondsLeft)
        // chemistry has no bank in the fake source → website empty card.
        assertTrue(vm.state.value.empty)
    }
}
