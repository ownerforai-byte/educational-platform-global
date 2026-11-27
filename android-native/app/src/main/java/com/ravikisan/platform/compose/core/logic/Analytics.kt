package com.ravikisan.platform.compose.core.logic

import java.time.Instant
import java.time.LocalDate
import java.time.LocalDate.parse
import java.time.OffsetDateTime
import java.time.ZoneOffset

/**
 * Performance analytics: pure aggregation over data the platform already
 * records (AI quiz history rows and the progress journey) — Kotlin port of
 * `frontend/features/analytics/index.ts` (parity plan §0.5 task 4). No writes.
 *
 * Date parsing note: the platform's API always emits Z-suffixed ISO instants;
 * bare `YYYY-MM-DD` strings parse as UTC midnight (matching JS `new Date(...)`
 * for date-only forms). Offset datetimes parse by their offset.
 */

data class AccuracyBucket(
    val key: String,
    val label: String,
    val quizzes: Int,
    val answered: Int,
    val correct: Int,
    /** Correct share of answered, 0-100 (rounded). */
    val accuracy: Int,
)

data class WeekPoint(
    /** ISO date (YYYY-MM-DD) of the Monday that starts the week. */
    val week: String,
    val quizzes: Int,
    val answered: Int,
    val accuracy: Int,
    val topicsCompleted: Int,
)

private fun pct(correct: Int, answered: Int): Int =
    if (answered > 0) Math.round((correct.toDouble() / answered) * 100).toInt() else 0

private fun titleCase(slug: String): String =
    slug.split("-").filter { it.isNotEmpty() }
        .joinToString(" ") { w -> w.take(1).uppercase() + w.substring(1) }

private data class MutableBucket(
    val key: String,
    val label: String,
    var quizzes: Int = 0,
    var answered: Int = 0,
    var correct: Int = 0,
)

private fun bucketize(
    rows: List<QuizRowLite>,
    keyOf: (QuizRowLite) -> Pair<String, String>?,
): List<AccuracyBucket> {
    val map = LinkedHashMap<String, MutableBucket>()
    for (row in rows) {
        if (row.answered <= 0) continue
        val k = keyOf(row) ?: continue
        val b = map.getOrPut(k.first) { MutableBucket(key = k.first, label = k.second) }
        b.quizzes += 1
        b.answered += row.answered
        b.correct += minOf(row.correct, row.answered)
    }
    return map.values
        .map { AccuracyBucket(key = it.key, label = it.label, quizzes = it.quizzes, answered = it.answered, correct = it.correct, accuracy = pct(it.correct, it.answered)) }
        .sortedWith(compareBy({ it.accuracy }, { -it.answered }))
}

/** Accuracy per subject, weakest first. */
fun accuracyBySubject(rows: List<QuizRowLite>): List<AccuracyBucket> =
    bucketize(rows) { r ->
        r.subjectSlug?.takeIf { it.isNotEmpty() }?.let { it to titleCase(it) }
    }

/** Accuracy per quiz topic (free text on the row), weakest first. */
fun accuracyByTopic(rows: List<QuizRowLite>): List<AccuracyBucket> =
    bucketize(rows) { r ->
        r.topic?.trim()?.takeIf { it.isNotEmpty() }?.let { it.lowercase() to it }
    }

data class UnitCompletion(
    val key: String,
    val label: String,
    val total: Int,
    val completed: Int,
    val percent: Int,
)

/** Journey completion per unit (topic-level accuracy is not recorded for the journey). */
fun completionByUnit(entries: List<ProgressEntryLite>): List<UnitCompletion> {
    val map = LinkedHashMap<String, MutableUnit>()
    for (e in entries) {
        if (e.classSlug.isNullOrEmpty() || e.subjectSlug.isNullOrEmpty() || e.unitSlug.isNullOrEmpty()) continue
        val key = "${e.classSlug}/${e.subjectSlug}/${e.unitSlug}"
        val label = e.topic?.chapterTitle ?: titleCase(e.unitSlug)
        val u = map.getOrPut(key) { MutableUnit(key = key, label = label) }
        u.total += 1
        if (e.completed || e.status == "completed") u.completed += 1
    }
    return map.values
        .map { UnitCompletion(key = it.key, label = it.label, total = it.total, completed = it.completed, percent = pct(it.completed, it.total)) }
        .sortedWith(compareByDescending<UnitCompletion> { it.percent }.thenBy { it.label })
}

private data class MutableUnit(val key: String, val label: String, var total: Int = 0, var completed: Int = 0)

/** UTC calendar date of an instant string, or null when unparsable. */
internal fun utcDate(iso: String): LocalDate? = try {
    Instant.parse(iso).atZone(ZoneOffset.UTC).toLocalDate()
} catch (_: Exception) {
    try {
        OffsetDateTime.parse(iso).toLocalDate()
    } catch (_: Exception) {
        try {
            parse(iso)
        } catch (_: Exception) {
            try {
                java.time.LocalDateTime.parse(iso).atOffset(ZoneOffset.UTC).toLocalDate()
            } catch (_: Exception) {
                null
            }
        }
    }
}

/** ISO date of the Monday that starts the week containing `iso` (UTC), or null. */
fun weekStart(iso: String): String? {
    val date = utcDate(iso) ?: return null
    val jsDay = date.dayOfWeek.value % 7 // JS getUTCDay(): Sunday=0 … Saturday=6
    val back = (jsDay + 6) % 7
    return date.minusDays(back.toLong()).toString()
}

/** Weekly trend (oldest first) of quizzes taken, accuracy and topics completed. */
fun weeklyTrend(rows: List<QuizRowLite>, entries: List<ProgressEntryLite>): List<WeekPoint> {
    data class MutableWeek(
        var quizzes: Int = 0,
        var answered: Int = 0,
        var correct: Int = 0,
        var topicsCompleted: Int = 0,
    )

    val map = LinkedHashMap<String, MutableWeek>()
    fun get(week: String): MutableWeek = map.getOrPut(week) { MutableWeek() }
    for (r in rows) {
        val w = weekStart(r.createdat)
        if (w == null || r.answered <= 0) continue
        val p = get(w)
        p.quizzes += 1
        p.answered += r.answered
        p.correct += minOf(r.correct, r.answered)
    }
    for (e in entries) {
        if (e.completedAt == null) continue
        val w = weekStart(e.completedAt)
        if (w != null) get(w).topicsCompleted += 1
    }
    return map.entries
        .sortedBy { it.key }
        .map { (week, p) ->
            WeekPoint(week = week, quizzes = p.quizzes, answered = p.answered, accuracy = pct(p.correct, p.answered), topicsCompleted = p.topicsCompleted)
        }
}

data class DayStudyPoint(
    val day: String,
    val quizzes: Int,
    val topicsCompleted: Int,
    /** Rough live score: 10 pts per topic finished, 5 per quiz taken. */
    val points: Int,
)

/** Per-day study signal for the last N calendar days (newest last). */
fun dailyStudyActivity(
    rows: List<QuizRowLite>,
    entries: List<ProgressEntryLite>,
    days: Int = 14,
    today: LocalDate,
): List<DayStudyPoint> {
    data class MutableDay(var quizzes: Int = 0, var topicsCompleted: Int = 0, var points: Int = 0)

    val map = LinkedHashMap<String, MutableDay>()
    fun touch(day: String): MutableDay = map.getOrPut(day) { MutableDay() }
    for (r in rows) {
        val d = utcDate(r.createdat)?.toString()
        if (d == null || r.answered <= 0) continue
        val p = touch(d)
        p.quizzes += 1
        p.points += 5
    }
    for (e in entries) {
        if (e.completedAt == null) continue
        val d = utcDate(e.completedAt)?.toString() ?: continue
        val p = touch(d)
        p.topicsCompleted += 1
        p.points += 10
    }
    val series = ArrayList<DayStudyPoint>(days)
    for (i in days - 1 downTo 0) {
        val key = today.minusDays(i.toLong()).toString()
        val p = map[key]
        series.add(
            if (p != null) DayStudyPoint(day = key, quizzes = p.quizzes, topicsCompleted = p.topicsCompleted, points = p.points)
            else DayStudyPoint(day = key, quizzes = 0, topicsCompleted = 0, points = 0),
        )
    }
    return series
}

data class OverallAccuracy(val quizzes: Int, val answered: Int, val accuracy: Int)

fun overallAccuracy(rows: List<QuizRowLite>): OverallAccuracy {
    var quizzes = 0
    var answered = 0
    var correct = 0
    for (r in rows) {
        if (r.answered <= 0) continue
        quizzes += 1
        answered += r.answered
        correct += minOf(r.correct, r.answered)
    }
    return OverallAccuracy(quizzes = quizzes, answered = answered, accuracy = pct(correct, answered))
}
