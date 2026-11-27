package com.ravikisan.platform.compose.ui.screens.search

import com.ravikisan.platform.compose.core.logic.ResultKind
import com.ravikisan.platform.compose.core.logic.SearchEngine
import com.ravikisan.platform.compose.ui.screens.search.local.FakeSearchIndex
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Search engine tests against the fake index (Agent 4 task 3, per §7 order).
 */
class SearchEngineTest {

    private val engine = SearchEngine(FakeSearchIndex.index())

    @Test
    fun `queries shorter than minimum return nothing`() {
        assertTrue(engine.search("").isEmpty())
        assertTrue(engine.search("v").isEmpty())
    }

    @Test
    fun `unit title match outranks topic and note matches for the same word`() {
        val results = engine.search("kinematics")
        assertEquals("kinematics", results.first().unitId)
        assertEquals(ResultKind.UNIT, results.first().kind)
        // The unit-title hit and note-section hits both exist; title ranks first.
        assertTrue(results.size > 1)
        assertTrue(results.none { it.score < results.first().score && it.kind == ResultKind.UNIT })
    }

    @Test
    fun `topic search finds the right unit`() {
        val results = engine.search("projectile")
        assertTrue(results.isNotEmpty())
        assertTrue(results.all { it.unitId == "kinematics" })
        assertTrue(results.any { it.kind == ResultKind.TOPIC })
    }

    @Test
    fun `note body matches carry the unit for navigation`() {
        val results = engine.search("dimensional analysis")
        assertTrue(results.isNotEmpty())
        assertEquals("physical-quantities", results.first().unitId)
    }

    @Test
    fun `search is case-insensitive and trims whitespace`() {
        assertEquals(engine.search("VECTORS"), engine.search("  vectors  "))
        assertTrue(engine.search("  vectors  ").isNotEmpty())
    }

    @Test
    fun `results are limited and deduplicated by key`() {
        val results = engine.search("cell", limit = 5)
        assertTrue(results.size <= 5)
        val keys = results.map { "${it.kind}:${it.unitId}:${it.matchText}" }
        assertEquals(keys.size, keys.toSet().size)
    }

    @Test
    fun `every result points at a unit that exists in the fake syllabus`() {
        val sampleQueries = listOf("vector", "cell", "motion", "equilibrium", "sets")
        sampleQueries.forEach { q ->
            engine.search(q).forEach { r ->
                assertEquals(
                    "result for '$q' points at unknown unit ${r.unitId}",
                    Triple(r.className, r.subjectName, r.unitTitle),
                    FakeSyllabusBridge.locate(r.unitId),
                )
            }
        }
    }
}

/** Test-only bridge so the search test can verify unit ids without importing study internals directly. */
private object FakeSyllabusBridge {
    fun locate(unitId: String): Triple<String, String, String>? =
        com.ravikisan.platform.compose.ui.screens.study.local.FakeSyllabus
            .findUnit(unitId)
            ?.let { (klass, subject, unit) -> Triple(klass.name, subject.name, unit.title) }
}
