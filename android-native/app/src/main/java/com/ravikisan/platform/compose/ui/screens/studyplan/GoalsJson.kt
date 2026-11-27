package com.ravikisan.platform.compose.ui.screens.studyplan

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.logic.AppLanguage
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.StudyGoals
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.put

/**
 * Goals <-> raw JSON glue for the device-local store (Agent 4 feature model).
 *
 * Reading is golden-tested `core/logic` (`normalizeGoalsJson`); this file is
 * only the WRITE side plus the syllabus-tree → [GoalSubject] catalog mapping
 * (native injects the catalog from the live syllabus endpoint — the website
 * reads its static `SYLLABUS` — same field-for-field shape).
 */

/** Map `GET /api/mobile/syllabus` classes onto the goal-subject catalog. */
fun goalSubjectsFrom(classes: List<MobileClassDto>): List<GoalSubject> =
    classes.flatMap { cls ->
        cls.subjects.map { subject ->
            GoalSubject(
                key = "${cls.slug}/${subject.slug}",
                classSlug = cls.slug,
                className = cls.name,
                subjectSlug = subject.slug,
                subjectName = subject.name,
            )
        }
    }

/**
 * Encode [StudyGoals] to the exact JSON shape `study-goals.ts` writes
 * (`subjects`, `examDate`, `targetPercent`, `dailyMinutes`, `onboarded`,
 * `preferences{…}`) so `normalizeGoalsJson` (and the TS original, if the
 * record ever crosses over) round-trips it losslessly.
 */
fun encodeGoals(goals: StudyGoals): String = buildJsonObject {
    put("subjects", JsonArray(goals.subjects.map { JsonPrimitive(it) }))
    put("examDate", goals.examDate?.let { JsonPrimitive(it) } ?: JsonNull)
    put("targetPercent", goals.targetPercent?.let { JsonPrimitive(it) } ?: JsonNull)
    put("dailyMinutes", JsonPrimitive(goals.dailyMinutes))
    put("onboarded", JsonPrimitive(goals.onboarded))
    put(
        "preferences",
        buildJsonObject {
            put(
                "language",
                JsonPrimitive(if (goals.preferences.language == AppLanguage.NE) "ne" else "en"),
            )
            put("notifyDailyReminder", JsonPrimitive(goals.preferences.notifyDailyReminder))
            put("notifyStreakAlerts", JsonPrimitive(goals.preferences.notifyStreakAlerts))
            put("reduceMotion", JsonPrimitive(goals.preferences.reduceMotion))
            put("largeText", JsonPrimitive(goals.preferences.largeText))
        },
    )
}.toString()

/** Re-parse stored JSON through the golden-tested normalizer. */
fun decodeGoals(raw: String?, catalog: List<GoalSubject>): StudyGoals =
    com.ravikisan.platform.compose.core.logic.normalizeGoalsJson(raw, catalog)

/** Read an existing local record before the live catalog has finished loading. */
fun decodeGoalsPreservingSubjectKeys(raw: String?): StudyGoals {
    val subjectKeys = runCatching {
        val root = kotlinx.serialization.json.Json.parseToJsonElement(raw.orEmpty()).jsonObject
        (root["subjects"] as? JsonArray)
            ?.mapNotNull { (it as? JsonPrimitive)?.takeIf(JsonPrimitive::isString)?.content }
            .orEmpty()
    }.getOrDefault(emptyList())
    val provisionalCatalog = subjectKeys.distinct().map { key ->
        val parts = key.split("/", limit = 2)
        GoalSubject(
            key = key,
            classSlug = parts.getOrElse(0) { "" },
            className = parts.getOrElse(0) { "" },
            subjectSlug = parts.getOrElse(1) { "" },
            subjectName = parts.getOrElse(1) { key },
        )
    }
    return decodeGoals(raw, provisionalCatalog)
}

/** Strict ISO date check mirroring the goals screen's date input contract. */
fun isIsoDateOrNull(value: String): String? =
    value.takeIf { Regex("""^\d{4}-\d{2}-\d{2}$""").matches(it) }
