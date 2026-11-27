package com.ravikisan.platform.compose.core.logic

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonObject
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Golden-vector tests for the offline-pack port (parity plan §0.5 task 8) —
 * expectations generated from the REAL website TypeScript
 * (frontend/features/offline), including the unit-slug alias resolver.
 */
class OfflinePackGoldenTest {

    private val golden = Golden.obj("offline-golden.json")

    private fun pack(o: JsonObject): OfflinePack {
        val theory = o.arr("theory").map { b ->
            val bo = b.jsonObject
            BankTheoryBlock(
                title = bo.str("title"),
                notes = bo.strList("notes"),
                detail = bo.strOrNull("detail"),
            )
        }
        val pyqs = o.arr("pyqs").map { y ->
            val yo = y.jsonObject
            OfflinePyqYear(
                year = yo.int("year"),
                title = yo.str("title"),
                questions = yo.arr("questions").map { q ->
                    val qo = q.jsonObject
                    BankPyqQuestion(
                        question = qo.str("question"),
                        marks = qo.rawOrNull("marks"),
                        solution = qo.strOrNull("solution"),
                    )
                },
            )
        }
        val drills = o.arr("drills").map { d ->
            val djo = d.jsonObject
            BankDrill(
                id = djo.str("id"),
                question = djo.str("question"),
                solution = djo.strOrNull("solution"),
                unit = djo.str("unit"),
                kind = djo.str("kind"),
            )
        }
        return OfflinePack(
            title = o.str("title"),
            theory = theory,
            pyqs = pyqs,
            drills = drills,
            formulas = o.strList("formulas"),
        )
    }

    private fun formulaUnit(o: JsonObject): FormulaSheetUnit = FormulaSheetUnit(
        id = o.str("id"),
        title = o.str("title"),
        topics = o.arr("topics").map { t ->
            val to = t.jsonObject
            FormulaSheetTopic(title = to.str("title"), formulas = to.strList("formulas"))
        },
    )

    @Test
    fun `sameUnit resolves aliases exactly like the TS manifest resolver`() {
        for (c in golden.arr("sameUnit")) {
            val o = c.jsonObject
            assertEquals("case ${o.rawOrNull("a")} vs ${o.rawOrNull("b")}", o.bool("expected"), sameUnit(o.rawOrNull("a"), o.rawOrNull("b")))
        }
    }

    @Test
    fun `buildUnitPack slices the bank exactly like the TS`() {
        val bank = golden.obj("bank").toBank()
        val formulaUnit = formulaUnit(golden.obj("formulaUnit"))
        val expected = pack(golden.obj("pack"))
        val actual = buildUnitPack(
            title = expected.title,
            unitId = "work-energy-and-power",
            bank = bank,
            formulaUnit = formulaUnit,
        )
        assertEquals(expected, actual)
        assertEquals(golden.int("packItemCount"), packItemCount(actual))
        assertEquals(golden.str("packToMarkdown"), packToMarkdown(actual))
    }

    @Test
    fun `empty pack renders the TS markdown for a unit with no matches`() {
        val bank = golden.obj("bank").toBank()
        val expected = pack(golden.obj("emptyPack"))
        val actual = buildUnitPack(title = expected.title, unitId = "optics", bank = bank, formulaUnit = null)
        assertEquals(expected, actual)
        assertEquals(golden.str("emptyPackMarkdown"), packToMarkdown(actual))
    }

    @Test
    fun `packFilename slugifies exactly like the TS`() {
        for (c in golden.arr("filenames")) {
            val o = c.jsonObject
            assertEquals("case ${o.str("name")}", o.str("expected"), packFilename(o.str("title")))
        }
    }
}
