package com.ravikisan.platform.compose.core.logic

/**
 * Achievement rules: badges and milestones derived from the device streak and
 * the progress journey — Kotlin port of `frontend/features/achievements/index.ts`
 * (parity plan §0.5 task 5). Pure; nothing is stored or awarded server-side.
 */

data class AchievementInput(
    val streak: Int,
    val topicsCompleted: Int,
    val topicsInProgress: Int,
    /** Share of the whole catalogue completed, 0-100. */
    val percent: Int,
)

data class Achievement(
    val id: String,
    val title: String,
    val description: String,
    val earned: Boolean,
    /** Progress toward the goal, 0-100. */
    val progress: Int,
)

data class AchievementRule(
    val id: String,
    val title: String,
    val description: String,
    val value: (AchievementInput) -> Int,
    val target: Int,
)

val ACHIEVEMENT_RULES: List<AchievementRule> = listOf(
    AchievementRule("streak-3", "Warm Up", "Study 3 days in a row.", { it.streak }, 3),
    AchievementRule("streak-7", "One Week Strong", "Study 7 days in a row.", { it.streak }, 7),
    AchievementRule("streak-30", "Monthly Habit", "Study 30 days in a row.", { it.streak }, 30),
    AchievementRule("first-topic", "First Step", "Complete your first topic.", { it.topicsCompleted }, 1),
    AchievementRule("topics-10", "Ten Down", "Complete 10 topics.", { it.topicsCompleted }, 10),
    AchievementRule("topics-50", "Fifty Club", "Complete 50 topics.", { it.topicsCompleted }, 50),
    AchievementRule("explorer", "Explorer", "Open 5 topics you have not finished yet.", { it.topicsInProgress }, 5),
    AchievementRule("quarter", "Quarter Way", "Finish 25% of the syllabus.", { it.percent }, 25),
    AchievementRule("half", "Halfway There", "Finish 50% of the syllabus.", { it.percent }, 50),
)

fun evaluateAchievements(input: AchievementInput): List<Achievement> =
    ACHIEVEMENT_RULES.map { r ->
        val v = maxOf(0, r.value(input))
        Achievement(
            id = r.id,
            title = r.title,
            description = r.description,
            earned = v >= r.target,
            progress = minOf(100, Math.round(v.toDouble() / r.target * 100).toInt()),
        )
    }

/** The nearest unearned achievement (highest progress), or null when all are earned. */
fun nextMilestone(list: List<Achievement>): Achievement? {
    val open = list.filter { !it.earned }
    if (open.isEmpty()) return null
    return open.reduce { best, a -> if (a.progress > best.progress) a else best }
}
