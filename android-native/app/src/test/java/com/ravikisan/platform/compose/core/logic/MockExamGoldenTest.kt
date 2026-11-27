package com.ravikisan.platform.compose.core.logic

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Golden-vector tests for the mock-exam port (parity plan §0.5 task 2) —
 * expectations generated from the REAL website TypeScript
 * (frontend/features/mock-exam) including the exact mulberry32 sequence.
 */
class MockExamGoldenTest {

    private val golden = Golden.obj("mock-exam-golden.json")

    private fun objective(o: kotlinx.serialization.json.JsonObject) = ObjectiveItem(
        id = o.str("id"),
        q = o.str("q"),
        options = o.strList("options"),
        answer = o.int("answer"),
        why = o.str("why"),
        exam = (o["exam"] as? JsonPrimitive)?.takeIf { it.isString }?.content,
    )

    private fun written(o: kotlinx.serialization.json.JsonObject) = WrittenItem(
        id = o.str("id"),
        question = o.str("question"),
        solution = (o["solution"] as? JsonPrimitive)?.takeIf { it.isString }?.content,
        marks = o.double("marks"),
        year = o.int("year"),
    )

    private fun paper(o: kotlinx.serialization.json.JsonObject) = MockPaper(
        seed = o.int("seed"),
        objective = o.arr("objective").map { objective(it.jsonObject) },
        written = o.arr("written").map { written(it.jsonObject) },
        durationMinutes = o.double("durationMinutes"),
        totalMarks = o.double("totalMarks"),
    )

    private fun defaultPaper(): MockPaper =
        paper(golden.arr("assemble").first { it.jsonObject.str("name") == "default" }.jsonObject.obj("expected"))

    @Test
    fun `mulberry32 reproduces the TS sequence bit-exactly for every seed`() {
        for ((seed, values) in golden.obj("mulberry32")) {
            val rnd = mulberry32(seed.toLong().toInt()) // uint32 bit pattern, as JS `seed >>> 0`
            values.jsonArray.forEachIndexed { i, v ->
                assertEquals("seed $seed value #$i", v.jsonPrimitive.content.toDouble(), rnd(), 0.0)
            }
        }
    }

    @Test
    fun `assembleMock reproduces the TS papers for every golden case`() {
        val mcqPool = golden.arr("mcqPool").toMcqPool()
        val pyqs = golden.obj("pyqBank").toBank().pyqs
        for (c in golden.arr("assemble")) {
            val o = c.jsonObject
            val expected = paper(o.obj("expected"))
            val actual = assembleMock(
                AssembleOptions(
                    mcqPool = mcqPool,
                    pyqs = pyqs,
                    objectiveCount = o.int("objectiveCount"),
                    writtenCount = o.int("writtenCount"),
                    seed = o.int("seed"),
                ),
            )
            assertEquals("case ${o.str("name")}", expected, actual)
        }
    }

    @Test
    fun `parseMarks matches TS parseFloat semantics`() {
        for (c in golden.arr("parseMarks")) {
            val o = c.jsonObject
            val marks = o["marks"]?.let { (it as JsonPrimitive).content }
            assertEquals("case ${o.str("name")}", o.double("expected"), parseMarks(marks), 0.0)
        }
    }

    @Test
    fun `scoreMock matches the TS scorer incl clamps and blanks`() {
        val score = golden.obj("score")
        val mainPaper = defaultPaper()
        val answers = score.obj("answers").mapValues { it.value.jsonPrimitive.content.toInt() }
        val selfMarks = score.obj("selfMarks").mapValues { it.value.jsonPrimitive.content.toDouble() }

        fun score(o: kotlinx.serialization.json.JsonObject) = MockScore(
            correct = o.int("correct"),
            wrong = o.int("wrong"),
            blank = o.int("blank"),
            objectiveMarks = o.int("objectiveMarks"),
            writtenMarks = o.double("writtenMarks"),
            total = o.double("total"),
            outOf = o.double("outOf"),
            percent = o.int("percent"),
        )

        assertEquals(score(score.obj("expected")), scoreMock(mainPaper, answers, selfMarks))
        assertEquals(score(score.obj("blankAll").obj("expected")), scoreMock(mainPaper, emptyMap(), emptyMap()))
    }

    @Test
    fun `answerKey matches the TS rows`() {
        val expected = golden.obj("score").getValue("key") as JsonArray
        val actual = answerKey(defaultPaper())
        assertEquals(expected.size, actual.size)
        expected.forEachIndexed { i, e ->
            assertEquals(e.jsonObject.str("id"), actual[i].id)
            assertEquals(e.jsonObject.int("number"), actual[i].number)
            assertEquals(e.jsonObject.str("letter"), actual[i].letter)
        }
    }
}
