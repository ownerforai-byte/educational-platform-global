package com.ravikisan.platform.compose.core.logic

import java.time.LocalDate
import kotlinx.serialization.json.jsonObject
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Golden-vector tests for the analytics port (parity plan §0.5 task 4) —
 * expectations generated from the REAL website TypeScript
 * (frontend/features/analytics). dailyStudyActivity is pinned to the
 * generator's `pinnedNow` instant (the TS reads `new Date()` internally).
 */
class AnalyticsGoldenTest {

    private val golden = Golden.obj("analytics-golden.json")

    @Test
    fun `accuracyBySubject matches the TS buckets and order`() {
        val a = golden.obj("accuracyBySubject")
        val expected = a.arr("expected").map { bucket(it.jsonObject) }
        assertEquals(expected, accuracyBySubject(a.arr("rows").toQuizRows()))
    }

    @Test
    fun `accuracyByTopic matches the TS buckets and order`() {
        val a = golden.obj("accuracyByTopic")
        val expected = a.arr("expected").map { bucket(it.jsonObject) }
        assertEquals(expected, accuracyByTopic(a.arr("rows").toQuizRows()))
    }

    @Test
    fun `completionByUnit matches the TS unit rollup`() {
        val a = golden.obj("completionByUnit")
        val expected = a.arr("expected").map { u ->
            UnitCompletion(
                key = u.jsonObject.str("key"),
                label = u.jsonObject.str("label"),
                total = u.jsonObject.int("total"),
                completed = u.jsonObject.int("completed"),
                percent = u.jsonObject.int("percent"),
            )
        }
        assertEquals(expected, completionByUnit(a.arr("entries").toProgressEntries()))
    }

    @Test
    fun `weeklyTrend matches the TS Monday-anchored weeks`() {
        val a = golden.obj("weeklyTrend")
        val expected = a.arr("expected").map { w ->
            WeekPoint(
                week = w.jsonObject.str("week"),
                quizzes = w.jsonObject.int("quizzes"),
                answered = w.jsonObject.int("answered"),
                accuracy = w.jsonObject.int("accuracy"),
                topicsCompleted = w.jsonObject.int("topicsCompleted"),
            )
        }
        val actual = weeklyTrend(
            rows = a.arr("rows").toQuizRows(),
            entries = a.arr("entries").toProgressEntries(),
        )
        assertEquals(expected, actual)
    }

    @Test
    fun `dailyStudyActivity matches the TS day series for the pinned now`() {
        val a = golden.obj("dailyStudyActivity")
        val expected = a.arr("expected").map { d ->
            DayStudyPoint(
                day = d.jsonObject.str("day"),
                quizzes = d.jsonObject.int("quizzes"),
                topicsCompleted = d.jsonObject.int("topicsCompleted"),
                points = d.jsonObject.int("points"),
            )
        }
        val actual = dailyStudyActivity(
            rows = a.arr("rows").toQuizRows(),
            entries = a.arr("entries").toProgressEntries(),
            days = a.int("days"),
            today = LocalDate.parse(a.str("pinnedNow").substring(0, 10)),
        )
        assertEquals(expected, actual)
    }

    @Test
    fun `overallAccuracy matches the TS totals`() {
        val a = golden.obj("overallAccuracy")
        val e = a.obj("expected")
        val actual = overallAccuracy(a.arr("rows").toQuizRows())
        assertEquals(e.int("quizzes"), actual.quizzes)
        assertEquals(e.int("answered"), actual.answered)
        assertEquals(e.int("accuracy"), actual.accuracy)
    }

    private fun bucket(o: kotlinx.serialization.json.JsonObject) = AccuracyBucket(
        key = o.str("key"),
        label = o.str("label"),
        quizzes = o.int("quizzes"),
        answered = o.int("answered"),
        correct = o.int("correct"),
        accuracy = o.int("accuracy"),
    )
}
