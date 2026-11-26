package com.ravikisan.platform.compose.ui.screens.practice

/**
 * Practice domain models — swapped to the real `/api/mobile/practice` catalog
 * shape (fake→real swap, session 3). A "set" is now an exam from the shared
 * `content/practice/exams` catalog; questions come from
 * `GET /api/practice/exams/:slug`. [PracticeQuestion] mirrors the exam JSON
 * question shape (prompt/options/correctIndex/explanation).
 */
data class PracticeQuestion(
    val id: String,
    val unitId: String,
    val stem: String,
    val options: List<String>,
    /** Zero-based index of the correct option. */
    val answerIndex: Int,
    val explanation: String? = null,
)

data class PracticeSet(
    val id: String,
    val title: String,
    val durationMin: Int,
    val questionCount: Int,
)
