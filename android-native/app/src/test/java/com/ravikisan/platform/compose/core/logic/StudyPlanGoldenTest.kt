package com.ravikisan.platform.compose.core.logic

import java.time.LocalDate
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.jsonObject
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Golden-vector tests for the study-goals + weekly-plan ports
 * (parity plan §0.5 tasks 3 & 7) — expectations generated from the REAL
 * website TypeScript (frontend/features/study-plan) with the real SYLLABUS
 * catalog rows for the fixture subject keys.
 */
class StudyPlanGoldenTest {

    private val golden = Golden.obj("study-plan-golden.json")
    private val catalog = golden.arr("catalog").toGoalCatalog()

    private fun goals(o: JsonObject): StudyGoals {
        val prefs = o.obj("preferences")
        return StudyGoals(
            subjects = o.strList("subjects"),
            examDate = (o["examDate"] as? JsonPrimitive)?.takeIf { it.isString }?.content,
            targetPercent = o.doubleOrNull("targetPercent")?.toInt(),
            dailyMinutes = o.int("dailyMinutes"),
            onboarded = o.bool("onboarded"),
            preferences = StudyPreferences(
                language = if (prefs.str("language") == "ne") AppLanguage.NE else AppLanguage.EN,
                notifyDailyReminder = prefs.bool("notifyDailyReminder"),
                notifyStreakAlerts = prefs.bool("notifyStreakAlerts"),
                reduceMotion = prefs.bool("reduceMotion"),
                largeText = prefs.bool("largeText"),
            ),
        )
    }

    private fun assertGoals(expected: JsonObject, actual: StudyGoals) {
        assertEquals(expected.strList("subjects"), actual.subjects)
        assertEquals(
            (expected["examDate"] as? JsonPrimitive)?.takeIf { it.isString }?.content,
            actual.examDate,
        )
        assertEquals(expected.doubleOrNull("targetPercent")?.toInt(), actual.targetPercent)
        assertEquals(expected.int("dailyMinutes"), actual.dailyMinutes)
        assertEquals(expected.bool("onboarded"), actual.onboarded)
        val p = expected.obj("preferences")
        assertEquals(p.str("language") == "ne", actual.preferences.language == AppLanguage.NE)
        assertEquals(p.bool("notifyDailyReminder"), actual.preferences.notifyDailyReminder)
        assertEquals(p.bool("notifyStreakAlerts"), actual.preferences.notifyStreakAlerts)
        assertEquals(p.bool("reduceMotion"), actual.preferences.reduceMotion)
        assertEquals(p.bool("largeText"), actual.preferences.largeText)
    }

    @Test
    fun `normalizeGoals coerces junk exactly like the TS`() {
        for (c in golden.arr("normalize")) {
            val o = c.jsonObject
            val input = o["input"] as? JsonObject
            assertGoals(o.obj("expected"), normalizeGoals(input, catalog))
        }
    }

    @Test
    fun `daysUntilExam matches the TS whole-day arithmetic`() {
        for (c in golden.arr("daysUntilExam")) {
            val o = c.jsonObject
            val expected = o.doubleOrNull("expected")?.toInt()
            assertEquals(
                "case ${o.str("name")}",
                expected,
                daysUntilExam(goals(o.obj("goals")), LocalDate.parse(o.str("today"))),
            )
        }
    }

    @Test
    fun `seedDailyPlan splits minutes exactly like the TS`() {
        for (c in golden.arr("seedDailyPlan")) {
            val o = c.jsonObject
            val expected = o.arr("expected").map { e ->
                PlannerSeedItem(
                    subjectKey = e.jsonObject.str("subjectKey"),
                    subjectName = e.jsonObject.str("subjectName"),
                    minutes = e.jsonObject.int("minutes"),
                )
            }
            assertEquals("case ${o.str("name")}", expected, seedDailyPlan(goals(o.obj("goals")), catalog))
        }
    }

    @Test
    fun `weakTopicsFromJourney orders and filters exactly like the TS`() {
        val wt = golden.obj("weakTopics")
        val entries = wt.arr("entries").toProgressEntries()
        val expected = wt.arr("expected").map { e ->
            WeakTopic(
                subjectKey = e.jsonObject.str("subjectKey"),
                title = e.jsonObject.str("title"),
                href = (e.jsonObject["href"] as? JsonPrimitive)?.takeIf { it.isString }?.content,
                status = when (e.jsonObject.str("status")) {
                    "in_progress" -> ProgressStatusLite.IN_PROGRESS
                    else -> ProgressStatusLite.NOT_STARTED
                },
            )
        }
        assertEquals(expected, weakTopicsFromJourney(entries))
    }

    @Test
    fun `buildWeeklyPlan matches the TS planner on every golden case`() {
        val weak = weakTopicsFromJourney(golden.obj("weakTopics").arr("entries").toProgressEntries())
        for (c in golden.arr("weeklyPlan")) {
            val o = c.jsonObject
            val expected = o.arr("expected").map { d ->
                PlanDay(
                    date = d.jsonObject.str("date"),
                    daysToExam = d.jsonObject.doubleOrNull("daysToExam")?.toInt(),
                    revision = d.jsonObject.bool("revision"),
                    blocks = d.jsonObject.arr("blocks").map { b ->
                        PlanBlock(
                            subjectKey = b.jsonObject.str("subjectKey"),
                            subjectName = b.jsonObject.str("subjectName"),
                            minutes = b.jsonObject.int("minutes"),
                            focus = (b.jsonObject["focus"] as? kotlinx.serialization.json.JsonObject)?.let { f ->
                                WeakTopic(
                                    subjectKey = f.jsonObject.str("subjectKey"),
                                    title = f.jsonObject.str("title"),
                                    href = (f.jsonObject["href"] as? JsonPrimitive)?.takeIf { it.isString }?.content,
                                    status = when (f.jsonObject.str("status")) {
                                        "in_progress" -> ProgressStatusLite.IN_PROGRESS
                                        else -> ProgressStatusLite.NOT_STARTED
                                    },
                                )
                            },
                        )
                    },
                )
            }
            val actual = buildWeeklyPlan(
                goals = goals(o.obj("goals")),
                weak = weak,
                today = LocalDate.parse(o.str("today")),
                catalog = catalog,
            )
            assertEquals("case ${o.str("name")}", expected, actual)
        }
    }
}
