package com.ravikisan.platform.compose.core.logic

import kotlinx.serialization.json.jsonObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * Golden-vector tests for the achievements port (parity plan §0.5 task 5) —
 * expectations generated from the REAL website TypeScript
 * (frontend/features/achievements).
 */
class AchievementsGoldenTest {

    private val golden = Golden.obj("achievements-golden.json")

    private fun achievement(o: kotlinx.serialization.json.JsonObject) = Achievement(
        id = o.str("id"),
        title = o.str("title"),
        description = o.str("description"),
        earned = o.bool("earned"),
        progress = o.int("progress"),
    )

    @Test
    fun `evaluateAchievements matches the TS rules on every golden input`() {
        for (c in golden.arr("evaluate")) {
            val o = c.jsonObject
            val input = AchievementInput(
                streak = o.obj("input").int("streak"),
                topicsCompleted = o.obj("input").int("topicsCompleted"),
                topicsInProgress = o.obj("input").int("topicsInProgress"),
                percent = o.obj("input").int("percent"),
            )
            val expected = o.arr("expected").map { achievement(it.jsonObject) }
            assertEquals("case ${o.str("name")}", expected, evaluateAchievements(input))
        }
    }

    @Test
    fun `nextMilestone picks the highest-progress open achievement`() {
        val nm = golden.obj("nextMilestone")
        // mixed: rebuild the input list from the "early" evaluate case
        val early = golden.arr("evaluate").first { it.jsonObject.str("name") == "early" }.jsonObject
        val mixedList = early.arr("expected").map { achievement(it.jsonObject) }
        assertEquals(achievement(nm.obj("mixed")), nextMilestone(mixedList))
    }

    @Test
    fun `nextMilestone keeps the first of tied progress values`() {
        // The golden `tie` object is the RESULT for this input list (generated from TS).
        val tieInput = listOf(
            Achievement("a", "A", "a", earned = false, progress = 40),
            Achievement("b", "B", "b", earned = false, progress = 40),
        )
        assertEquals(achievement(golden.obj("nextMilestone").obj("tie")), nextMilestone(tieInput))
    }

    @Test
    fun `nextMilestone returns null when all earned or list empty`() {
        val allEarned = listOf(Achievement("a", "A", "a", earned = true, progress = 100))
        assertNull(nextMilestone(allEarned))
        assertNull(nextMilestone(emptyList()))
    }
}
