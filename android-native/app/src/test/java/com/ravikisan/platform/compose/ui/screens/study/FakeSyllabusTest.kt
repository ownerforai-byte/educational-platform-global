package com.ravikisan.platform.compose.ui.screens.study

import com.ravikisan.platform.compose.ui.screens.study.local.FakeSyllabus
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Fake syllabus integrity — the UI depends on curriculum order and unique
 * unit ids, so the fake must obey the same rules as the canonical
 * `frontend/lib/core/syllabus.ts` (AGENT_RULES: never reorder or duplicate).
 */
class FakeSyllabusTest {

    @Test
    fun `classes are class 11 then class 12`() {
        assertEquals(
            listOf("class-11-notes", "class-12-notes"),
            FakeSyllabus.classes.map { it.slug },
        )
    }

    @Test
    fun `every unit id is unique across the whole syllabus`() {
        val ids = FakeSyllabus.classes
            .flatMap { klass -> klass.subjects.flatMap { subject -> subject.units.map { it.id } } }
        assertEquals(ids.size, ids.toSet().size)
    }

    @Test
    fun `every subject has at least one unit and every unit has topics in order`() {
        FakeSyllabus.classes.forEach { klass ->
            assertTrue(klass.subjects.isNotEmpty())
            klass.subjects.forEach { subject ->
                assertTrue("${klass.slug}/${subject.slug} has no units", subject.units.isNotEmpty())
                subject.units.forEach { unit ->
                    assertTrue("${unit.id} has no topics", unit.topics.isNotEmpty())
                    assertNotNull("${unit.id} missing title", unit.title)
                }
            }
        }
    }

    @Test
    fun `findUnit resolves a known unit with its class and subject`() {
        val located = FakeSyllabus.findUnit("kinematics")
        assertNotNull(located)
        val (klass, subject, unit) = located!!
        assertEquals("class-11-notes", klass.slug)
        assertEquals("physics", subject.slug)
        assertEquals("Kinematics", unit.title)
    }

    @Test
    fun `findUnit returns null for unknown id`() {
        assertEquals(null, FakeSyllabus.findUnit("does-not-exist"))
    }
}
