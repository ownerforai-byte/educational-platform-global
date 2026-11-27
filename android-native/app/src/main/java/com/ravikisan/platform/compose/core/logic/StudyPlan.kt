package com.ravikisan.platform.compose.core.logic

import java.time.LocalDate

/**
 * Weekly study plan generator — Kotlin port of
 * `frontend/features/study-plan/study-plan.ts` (parity plan §0.5 task 3).
 * Pure; no storage, no server write. `today` is explicit (the website
 * defaults to `new Date()`; native ViewModels pass the device date).
 */

data class WeakTopic(
    val subjectKey: String,
    val title: String,
    val href: String?,
    /** in_progress topics are tackled before untouched ones. */
    val status: ProgressStatusLite,
)

data class PlanBlock(
    val subjectKey: String,
    val subjectName: String,
    val minutes: Int,
    val focus: WeakTopic?,
)

data class PlanDay(
    val date: String,
    val daysToExam: Int?,
    /** Revision-only day right before the exam. */
    val revision: Boolean,
    val blocks: List<PlanBlock>,
)

/** Topics the student has not finished, in-progress first, in curriculum order. */
fun weakTopicsFromJourney(entries: List<ProgressEntryLite>): List<WeakTopic> {
    val out = ArrayList<WeakTopic>()
    for (e in entries) {
        val status = entryStatus(e)
        if (status == ProgressStatusLite.COMPLETED) continue
        if (e.classSlug.isNullOrEmpty() || e.subjectSlug.isNullOrEmpty()) continue
        val title = e.topic?.title ?: e.topicSlug
        if (title.isNullOrEmpty()) continue
        val href =
            if (!e.unitSlug.isNullOrEmpty() && !e.topicSlug.isNullOrEmpty() &&
                (e.classSlug == "class-11-notes" || e.classSlug == "class-12-notes")
            ) {
                "/${e.classSlug}/${e.subjectSlug}/chapters/${e.unitSlug}/topics/${e.topicSlug}"
            } else {
                null
            }
        out.add(WeakTopic(subjectKey = "${e.classSlug}/${e.subjectSlug}", title = title, href = href, status = status))
    }
    return out.filter { it.status == ProgressStatusLite.IN_PROGRESS } +
        out.filter { it.status == ProgressStatusLite.NOT_STARTED }
}

/**
 * Up to 7 days starting `today`, ending on the exam day when it is closer.
 * Each day splits goals.dailyMinutes across the chosen subjects and hands each
 * block the next weak topic of that subject (rotating, never repeating within
 * the week while topics remain). The day before the exam is revision-only.
 */
fun buildWeeklyPlan(
    goals: StudyGoals,
    weak: List<WeakTopic>,
    today: LocalDate,
    catalog: List<GoalSubject>,
): List<PlanDay> {
    if (goals.subjects.isEmpty()) return emptyList()
    val left = daysUntilExam(goals, today)
    if (left != null && left < 0) return emptyList()
    val length = left?.let { minOf(7, it + 1) } ?: 7
    val names = catalog.associate { it.key to it.subjectName }
    val each = maxOf(5, goals.dailyMinutes / goals.subjects.size)
    val queues = goals.subjects.associateWith { key -> weak.filter { it.subjectKey == key } }
    val days = ArrayList<PlanDay>()
    for (i in 0 until length) {
        val date = today.plusDays(i.toLong())
        val daysToExam = left?.minus(i)
        val revision = daysToExam == 1 || daysToExam == 0
        val blocks = goals.subjects.map { key ->
            val queue = queues[key] ?: emptyList()
            PlanBlock(
                subjectKey = key,
                subjectName = names[key] ?: key,
                minutes = each,
                focus = if (revision || queue.isEmpty()) null else queue[i % queue.size],
            )
        }
        days.add(PlanDay(date = date.toString(), daysToExam = daysToExam, revision = revision, blocks = blocks))
    }
    return days
}
