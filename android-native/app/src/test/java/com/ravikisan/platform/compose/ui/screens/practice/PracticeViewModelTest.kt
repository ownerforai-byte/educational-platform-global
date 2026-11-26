package com.ravikisan.platform.compose.ui.screens.practice

import com.ravikisan.platform.compose.core.contract.ExamDto
import com.ravikisan.platform.compose.core.contract.ExamQuestionDto
import com.ravikisan.platform.compose.core.contract.MobilePracticePageDto
import com.ravikisan.platform.compose.core.contract.MobilePracticeResponse
import com.ravikisan.platform.compose.core.contract.MobilePracticeSetDto
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.PracticeRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Practice hub ViewModel tests against the REAL repository chain
 * (fake→real swap, session 3) — [FakeRnApi] stands in for the wire and
 * [FakeStudyCache] for Room. Dispatchers.Unconfined runs the coroutines
 * eagerly, so no coroutine-test dependency is needed.
 */
class PracticeViewModelTest {

    private fun examDto(slug: String, count: Int = 3) = ExamDto(
        slug = slug,
        title = "Exam $slug",
        durationMin = 45,
        questions = (1..count).map { i ->
            ExamQuestionDto(id = "$slug-q$i", prompt = "Q$i", options = listOf("A", "B", "C", "D"), correctIndex = 0)
        },
    )

    /** API fake that serves the catalog plus per-slug exam detail. */
    private fun apiWith(vararg exams: ExamDto): FakeRnApi = FakeRnApi().apply {
        mobilePracticeResponse = retrofit2.Response.success(
            MobilePracticeResponse(
                ok = true,
                data = MobilePracticePageDto(
                    items = exams.map {
                        MobilePracticeSetDto(slug = it.slug, title = it.title, durationMin = it.durationMin, questionCount = it.questions.size)
                    },
                    nextCursor = null,
                ),
            ),
        )
        // Exam detail dispatches on slug via the request log + queued responses.
        practiceExamResponses.clear()
        exams.forEach { practiceExamResponses.addLast(retrofit2.Response.success(it)) }
    }

    private fun viewModel(api: FakeRnApi = apiWith(examDto("exam-01"), examDto("exam-02"))) =
        PracticeViewModel(PracticeRepository(api, FakeStudyCache()), CoroutineScope(Dispatchers.Unconfined))

    @Test
    fun `catalog loads from the api into sets`() {
        val vm = viewModel()
        vm.loadCatalog()
        assertEquals(2, vm.state.value.sets.size)
        assertEquals("exam-01", vm.state.value.sets.first().id)
        assertEquals(3, vm.state.value.sets.first().questionCount)
        assertNull(vm.state.value.error)
    }

    @Test
    fun `offline catalog falls back to the room cache with fromCache flag`() = runBlockingJvm {
        val api = apiWith(examDto("exam-01"))
        val cache = FakeStudyCache()
        val repo = PracticeRepository(api, cache)
        val warm = PracticeViewModel(repo, CoroutineScope(Dispatchers.Unconfined))
        warm.loadCatalog()
        assertTrue(warm.state.value.sets.isNotEmpty())

        // Now the wire fails; the cache must serve the catalog.
        api.mobilePracticeError = RuntimeException("airplane mode")
        val cold = PracticeViewModel(PracticeRepository(api, cache), CoroutineScope(Dispatchers.Unconfined))
        cold.loadCatalog()
        assertEquals(1, cold.state.value.sets.size)
        assertTrue(cold.state.value.fromCache)
    }

    @Test
    fun `opening a set loads its questions from the exam endpoint`() {
        val vm = viewModel()
        vm.loadCatalog()
        vm.openSet("exam-01")
        assertEquals("exam-01", vm.selectedSetId.value)
        assertEquals(3, vm.state.value.previewQuestions.size)
        assertTrue(vm.state.value.previewQuestions.all { it.unitId == "exam-01" })
    }

    @Test
    fun `closing a set clears selection and preview`() {
        val vm = viewModel()
        vm.loadCatalog()
        vm.openSet("exam-02")
        vm.closeSet()
        assertNull(vm.selectedSetId.value)
        assertTrue(vm.state.value.previewQuestions.isEmpty())
    }

    /** Minimal runBlocking without the coroutines-test artifact. */
    private fun runBlockingJvm(block: suspend kotlinx.coroutines.CoroutineScope.() -> Unit) =
        kotlinx.coroutines.runBlocking(block = block)
}
