package com.ravikisan.platform.compose.core.logic

/**
 * Minimal progress-journey shapes shared by the plan/analytics ports
 * (parity plan §0.5 tasks 3–4, 11). These mirror the fields the website's
 * pure functions actually read from `ProgressEntry` / `QuizHistoryRow`;
 * the native DTO layer maps its API models onto these before calling in.
 */

data class ProgressTopicLite(
    val slug: String,
    val title: String,
    val chapterTitle: String? = null,
)

data class ProgressEntryLite(
    /** Row id, or `new:<path>` for a topic with no journey row yet. */
    val id: String,
    val completed: Boolean = false,
    val completedAt: String? = null,
    /** Journey state; null when the entry is still untracked. */
    val status: String? = null,
    val classSlug: String? = null,
    val subjectSlug: String? = null,
    val unitSlug: String? = null,
    val topicSlug: String? = null,
    val topic: ProgressTopicLite? = null,
)

enum class ProgressStatusLite { COMPLETED, IN_PROGRESS, NOT_STARTED }

/** Port of `frontend/features/progress/catalog.ts` entryStatus. */
fun entryStatus(entry: ProgressEntryLite): ProgressStatusLite = when {
    entry.completed || entry.status == "completed" -> ProgressStatusLite.COMPLETED
    entry.status == "in_progress" -> ProgressStatusLite.IN_PROGRESS
    // Untracked rows (no status yet) count as in progress once they exist.
    entry.status == null && !entry.id.startsWith("new:") -> ProgressStatusLite.IN_PROGRESS
    else -> ProgressStatusLite.NOT_STARTED
}

/** One AI-quiz history row, as the analytics port consumes it. */
data class QuizRowLite(
    val id: String,
    val subjectSlug: String? = null,
    val topic: String? = null,
    val answered: Int = 0,
    val correct: Int = 0,
    val createdat: String,
)
