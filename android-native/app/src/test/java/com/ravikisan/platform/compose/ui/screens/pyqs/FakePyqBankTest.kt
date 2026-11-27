package com.ravikisan.platform.compose.ui.screens.pyqs

import com.ravikisan.platform.compose.ui.screens.pyqs.local.FakePyqBank
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** Fake integrity — the same guarantees the web bank builder provides. */
class FakePyqBankTest {

    private val source = FakePyqBank()

    @Test
    fun `hub rows exist and carry consistent counts`() {
        val subjects = source.subjects()
        assertTrue(subjects.isNotEmpty())
        subjects.forEach { s ->
            val bank = source.bank(s.classSlug, s.subjectSlug)
            assertNotNull("summary without bank: ${s.subjectSlug}", bank)
            assertEquals(bank!!.pyqs.size, s.yearCount)
            assertEquals(bank.pyqs.sumOf { it.questions.size }, s.questionCount)
            assertEquals(bank.pyqs.flatMap { it.units }.distinct().size, s.unitCount)
        }
    }

    @Test
    fun `hub rows agree with bank years newest-first`() {
        source.subjects().forEach { s ->
            val years = source.bank(s.classSlug, s.subjectSlug)!!.pyqs.map { it.year }
            assertEquals(years.maxOrNull(), s.newestYear)
            assertEquals(years.minOrNull(), s.oldestYear)
            assertEquals(years.sortedDescending(), years)
        }
    }

    @Test
    fun `every question in every year is well-formed`() {
        source.subjects().forEach { s ->
            source.bank(s.classSlug, s.subjectSlug)!!.pyqs.forEach { year ->
                assertTrue("year ${year.year} has no questions", year.questions.isNotEmpty())
                assertTrue(year.units.isNotEmpty())
                year.questions.forEach { q ->
                    assertTrue(q.question.isNotBlank())
                }
            }
        }
    }

    @Test
    fun `unknown subject resolves to null not a crash`() {
        assertNull(source.bank("class-11-notes", "nonexistent"))
        assertNull(source.bank("class-99-notes", "physics"))
    }

    @Test
    fun `drill kinds are only concept or practical`() {
        source.subjects().forEach { s ->
            source.bank(s.classSlug, s.subjectSlug)!!.drills.forEach { d ->
                assertTrue("bad kind ${d.kind}", d.kind in setOf("concept", "practical"))
            }
        }
    }
}
