package com.ravikisan.platform.compose.ui.screens.practice

import com.ravikisan.platform.compose.ui.screens.practice.local.FakePracticeRepo
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** Fake-repo sanity tests — the fake now mirrors the real catalog shape (session 3). */
class FakePracticeRepoTest {

    @Test
    fun `sets carry the exam catalog shape`() {
        val sets = FakePracticeRepo.sets
        assertTrue(sets.isNotEmpty())
        assertTrue(sets.all { it.id.startsWith("exam-") && it.questionCount > 0 && it.durationMin > 0 })
    }

    @Test
    fun `questions carry the exam slug as unitId`() {
        val questions = FakePracticeRepo.questionsFor("exam-01")
        assertEquals(3, questions.size)
        assertTrue(questions.all { it.unitId == "exam-01" })
        assertTrue(questions.all { it.options.size == 4 && it.answerIndex in it.options.indices })
    }

    @Test
    fun `unknown set yields no questions`() {
        assertTrue(FakePracticeRepo.questionsFor("nope").isEmpty())
    }
}
