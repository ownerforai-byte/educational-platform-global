package com.ravikisan.platform.compose.core.logic

import java.time.LocalDate
import java.time.temporal.ChronoUnit
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Study goals & preferences — pure core of `frontend/features/study-plan/study-goals.ts`
 * (parity plan §0.5 task 7, goals half).
 *
 * The record is device-local (never leaves the phone). The website reads the
 * subject catalog from the static SYLLABUS; on native the catalog comes from
 * the loaded syllabus cache and is INJECTED, so every function here takes it
 * as a parameter — same rules, no hidden global.
 */

const val STUDY_GOALS_KEY = "neb-study-goals:v1"

enum class AppLanguage { EN, NE }

data class StudyPreferences(
    val language: AppLanguage = AppLanguage.EN,
    /** Daily study reminder opt-in (in-app notifications center only). */
    val notifyDailyReminder: Boolean = false,
    val notifyStreakAlerts: Boolean = false,
    /** Accessibility toggles. */
    val reduceMotion: Boolean = false,
    val largeText: Boolean = false,
)

data class StudyGoals(
    /** Subject keys `classSlug/subjectSlug`, as produced by the catalog. */
    val subjects: List<String> = emptyList(),
    /** ISO date (YYYY-MM-DD) of the exam, or null. */
    val examDate: String? = null,
    /** Target percentage 0-100, or null. */
    val targetPercent: Int? = null,
    /** Minutes of study per day. */
    val dailyMinutes: Int = 60,
    /** True once onboarding was completed. */
    val onboarded: Boolean = false,
    val preferences: StudyPreferences = StudyPreferences(),
)

data class GoalSubject(
    val key: String,
    val classSlug: String,
    val className: String,
    val subjectSlug: String,
    val subjectName: String,
)

val DAILY_MINUTES_OPTIONS = listOf(30, 60, 90, 120, 180)

val DEFAULT_GOALS = StudyGoals()

private val ISO_DATE = Regex("""^\d{4}-\d{2}-\d{2}$""")

private fun isIsoDate(value: JsonPrimitive?): Boolean {
    if (value == null || !value.isString) return false
    if (!ISO_DATE.containsMatchIn(value.content)) return false
    // V8 Date.parse semantics (what the TS `!isNaN(Date.parse(...))` encodes):
    // month must be 01-12 and day 01-31; out-of-range days ROLL OVER
    // ("2026-02-30" is accepted), months 00/13 and days 00/32 are rejected.
    val month = value.content.substring(5, 7).toIntOrNull() ?: return false
    val day = value.content.substring(8, 10).toIntOrNull() ?: return false
    return month in 1..12 && day in 1..31
}

private fun JsonObject.intField(key: String): Double? =
    (this[key] as? JsonPrimitive)?.takeIf { !it.isString }?.content?.toDoubleOrNull()

private fun JsonObject.boolField(key: String): Boolean? =
    (this[key] as? JsonPrimitive)?.takeIf { !it.isString }?.booleanOrNull

/** Coerce anything (parsed JSON, partial record) into a valid StudyGoals. */
fun normalizeGoals(input: JsonObject?, catalog: List<GoalSubject>): StudyGoals {
    val raw = input ?: JsonObject(emptyMap())
    val rawPrefs = (raw["preferences"] as? JsonObject) ?: JsonObject(emptyMap())
    val known = catalog.map { it.key }.toHashSet()
    val subjects = (raw["subjects"] as? JsonArray)
        ?.mapNotNull { (it as? JsonPrimitive)?.takeIf { p -> p.isString }?.content }
        ?.filter { it in known }
        ?.distinct()
        ?: emptyList()
    val target = raw.intField("targetPercent")
        ?.takeIf { it >= 0 && it <= 100 }
        ?.let { Math.round(it).toInt() }
    val minutes = raw.intField("dailyMinutes")
        ?.takeIf { it >= 5 && it <= 720 }
        ?.let { Math.round(it).toInt() }
        ?: DEFAULT_GOALS.dailyMinutes
    fun prefFlag(key: String, default: Boolean): Boolean = rawPrefs.boolField(key) ?: default
    return StudyGoals(
        subjects = subjects,
        examDate = if (isIsoDate(raw["examDate"] as? JsonPrimitive)) raw.getValue("examDate").jsonPrimitive.content else null,
        targetPercent = target,
        dailyMinutes = minutes,
        onboarded = raw.boolField("onboarded") == true,
        preferences = StudyPreferences(
            language = if (rawPrefs["language"]?.jsonPrimitive?.content == "ne") AppLanguage.NE else AppLanguage.EN,
            notifyDailyReminder = prefFlag("notifyDailyReminder", DEFAULT_GOALS.preferences.notifyDailyReminder),
            notifyStreakAlerts = prefFlag("notifyStreakAlerts", DEFAULT_GOALS.preferences.notifyStreakAlerts),
            reduceMotion = prefFlag("reduceMotion", DEFAULT_GOALS.preferences.reduceMotion),
            largeText = prefFlag("largeText", DEFAULT_GOALS.preferences.largeText),
        ),
    )
}

/** Convenience: normalize straight from raw device-local JSON. */
fun normalizeGoalsJson(rawJson: String?, catalog: List<GoalSubject>): StudyGoals {
    if (rawJson.isNullOrBlank()) return normalizeGoals(null, catalog)
    val parsed = try {
        Json.parseToJsonElement(rawJson).jsonObject
    } catch (_: Exception) {
        return normalizeGoals(null, catalog)
    }
    return normalizeGoals(parsed, catalog)
}

/** Whole days from `today` to the exam date (negative once past), or null. */
fun daysUntilExam(goals: StudyGoals, today: LocalDate): Int? {
    val examDate = goals.examDate ?: return null
    // V8 day-rollover: Date.UTC(y, m-1, d) accepts d up to 31 and rolls over.
    val exam = LocalDate.of(
        examDate.substring(0, 4).toInt(),
        examDate.substring(5, 7).toInt(),
        1,
    ).plusDays(examDate.substring(8, 10).toInt().toLong() - 1)
    return ChronoUnit.DAYS.between(today, exam).toInt()
}

data class PlannerSeedItem(
    val subjectKey: String,
    val subjectName: String,
    val minutes: Int,
)

/** Split the daily minutes evenly over the chosen subjects (planner seed). */
fun seedDailyPlan(goals: StudyGoals, catalog: List<GoalSubject>): List<PlannerSeedItem> {
    if (goals.subjects.isEmpty()) return emptyList()
    val byKey = catalog.associateBy { it.key }
    val each = maxOf(5, goals.dailyMinutes / goals.subjects.size)
    return goals.subjects.map { key ->
        PlannerSeedItem(
            subjectKey = key,
            subjectName = byKey[key]?.subjectName ?: key,
            minutes = each,
        )
    }
}
