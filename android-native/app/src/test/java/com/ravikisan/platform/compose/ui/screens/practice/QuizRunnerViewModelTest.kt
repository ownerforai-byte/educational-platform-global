package com.ravikisan.platform.compose.ui.screens.practice

import com.ravikisan.platform.compose.core.contract.ExamDto
import com.ravikisan.platform.compose.core.contract.ExamQuestionDto
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.PracticeRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Quiz runner flow tests against the REAL repository chain (fake→real swap,
 * session 3). Dispatchers.Unconfined runs the load eagerly.
 */
class QuizRunnerViewModelTest {

    private fun exam() = ExamDto(
        slug = "exam-01",
        title = "NEB Mock Exam 01",
        durationMin = 60,
        questions = (1..3).map { i ->
            ExamQuestionDto(
                id = "e1-q0$i",
                prompt = "Question $i",
                options = listOf("A", "B", "C", "D"),
                correctIndex = i % 4,
                explanation = "Because $i",
            )
        },
    )

    private fun vm(): QuizRunnerViewModel {
        val api = FakeRnApi().apply {
            practiceExamResponses.addLast(retrofit2.Response.success(exam()))
        }
        return QuizRunnerViewModel(PracticeRepository(api, FakeStudyCache()), setId = "exam-01", scope = CoroutineScope(Dispatchers.Unconfined))
            .apply { load() }
    }

    @Test
    fun `loads questions for the exam in order`() {
        val runner = vm()
        assertEquals(3, runner.questions.value.size)
        assertEquals(0, runner.index.value)
        assertEquals("exam-01", runner.setId)
        assertEquals("NEB Mock Exam 01", runner.examTitle)
        assertFalse(runner.loading.value)
        assertNull(runner.error.value)
    }

    @Test
    fun `correct answer increments score on check`() {
        val runner = vm()
        val answer = runner.current!!.answerIndex
        runner.selectOption(answer)
        runner.check()
        assertTrue(runner.checked.value)
        assertTrue(runner.lastAnswerCorrect)
        assertEquals(1, runner.correctCount.value)
    }

    @Test
    fun `wrong answer does not increment score and shows not-correct`() {
        val runner = vm()
        val wrong = runner.current!!.options.indices.first { it != runner.current!!.answerIndex }
        runner.selectOption(wrong)
        runner.check()
        assertFalse(runner.lastAnswerCorrect)
        assertEquals(0, runner.correctCount.value)
    }

    @Test
    fun `next advances and finishes after the last question`() {
        val runner = vm()
        repeat(3) {
            runner.selectOption(runner.current!!.answerIndex)
            runner.check()
            runner.next()
        }
        assertTrue(runner.finished.value)
    }

    @Test
    fun `missing exam surfaces an error state`() {
        val api = FakeRnApi() // no queued exam → 404
        val runner = QuizRunnerViewModel(PracticeRepository(api, FakeStudyCache()), setId = "nope", scope = CoroutineScope(Dispatchers.Unconfined))
            .apply { load() }
        assertTrue(runner.error.value != null)
        assertTrue(runner.questions.value.isEmpty())
    }
}
