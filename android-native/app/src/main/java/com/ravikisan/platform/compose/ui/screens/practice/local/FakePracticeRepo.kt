package com.ravikisan.platform.compose.ui.screens.practice.local

import com.ravikisan.platform.compose.ui.screens.practice.PracticeQuestion
import com.ravikisan.platform.compose.ui.screens.practice.PracticeSet

/**
 * Local fake practice repo — KEPT FOR UNIT TESTS ONLY after the fake→real
 * swap (session 3); production UI reads [com.ravikisan.platform.compose.data.repository.PracticeRepository].
 * Sets mirror the real catalog shape (exam slug + metadata); questions keep
 * the exam-JSON question shape.
 */
object FakePracticeRepo {

    val sets: List<PracticeSet> = listOf(
        PracticeSet(id = "exam-01", title = "NEB Class 11 Mock Exam 01", durationMin = 60, questionCount = 3),
        PracticeSet(id = "exam-02", title = "NEB Class 11 Mock Exam 02", durationMin = 60, questionCount = 3),
    )

    private val questions: Map<String, List<PracticeQuestion>> = mapOf(
        "exam-01" to listOf(
            PracticeQuestion(
                id = "e1-q01",
                unitId = "exam-01",
                stem = "Enzymes are chemically which class of biomolecules?",
                options = listOf("Carbohydrates", "Lipids", "Proteins", "Nucleic acids"),
                answerIndex = 2,
                explanation = "Enzymes are globular proteins.",
            ),
            PracticeQuestion(
                id = "e1-q02",
                unitId = "exam-01",
                stem = "Which law explains the recoil of a gun when fired?",
                options = listOf("Newton's first law", "Conservation of momentum", "Hooke's law", "Archimedes' principle"),
                answerIndex = 1,
                explanation = "Momentum before equals momentum after.",
            ),
            PracticeQuestion(
                id = "e1-q03",
                unitId = "exam-01",
                stem = "The SI unit of power is:",
                options = listOf("Joule", "Newton", "Watt", "Pascal"),
                answerIndex = 2,
            ),
        ),
        "exam-02" to listOf(
            PracticeQuestion(
                id = "e2-q01",
                unitId = "exam-02",
                stem = "Which organelle is the site of aerobic respiration?",
                options = listOf("Nucleus", "Ribosome", "Mitochondrion", "Golgi body"),
                answerIndex = 2,
                explanation = "The mitochondrion hosts the electron transport chain.",
            ),
            PracticeQuestion(
                id = "e2-q02",
                unitId = "exam-02",
                stem = "d/dx(x²) equals:",
                options = listOf("x", "2x", "x²/2", "2"),
                answerIndex = 1,
            ),
            PracticeQuestion(
                id = "e2-q03",
                unitId = "exam-02",
                stem = "pH of a neutral solution at 25°C is:",
                options = listOf("0", "7", "10", "14"),
                answerIndex = 1,
            ),
        ),
    )

    fun questionsFor(setId: String): List<PracticeQuestion> = questions[setId].orEmpty()
}
