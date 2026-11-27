package com.ravikisan.platform.compose.ui.screens.study

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertNotNull
import org.junit.Test

class CurriculumRouteMapTest {
    @Test
    fun `route inventory contains exactly the 28 requested web sections`() {
        assertEquals(28, CurriculumRouteMap.paths.size)
        assertEquals(28, CurriculumRouteMap.paths.count { CurriculumRouteMap.resolve(it) != null })
    }

    @Test
    fun `class and subject variants resolve to the shared data driven surfaces`() {
        assertEquals(
            CurriculumEntry(CurriculumSurface.CLASS_HUB, "class-11-notes"),
            CurriculumRouteMap.resolve("/class-11-notes"),
        )
        assertEquals(
            CurriculumEntry(CurriculumSurface.SUBJECT_HUB, "class-12-notes", "physics"),
            CurriculumRouteMap.resolve("/class-12-notes/physics"),
        )
        assertEquals(
            CurriculumEntry(CurriculumSurface.THEORY, "class-11-notes", "nepali"),
            CurriculumRouteMap.resolve("/class-11-notes/nepali/theory"),
        )
    }

    @Test
    fun `top level curriculum routes resolve`() {
        assertEquals(CurriculumSurface.SYLLABUS, CurriculumRouteMap.resolve("/syllabus")?.surface)
        assertEquals(CurriculumSurface.SUBJECTS, CurriculumRouteMap.resolve("/subjects")?.surface)
    }

    @Test
    fun `unknown subject and unrelated paths are rejected`() {
        assertNull(CurriculumRouteMap.resolve("/class-11-notes/history"))
        assertNull(CurriculumRouteMap.resolve("/class-10-notes/physics"))
        assertNull(CurriculumRouteMap.resolve("/class-11-notes/physics/chapters"))
        assertNull(CurriculumRouteMap.resolve("/practice"))
    }

    @Test
    fun `trailing slash does not change a canonical route`() {
        assertNotNull(CurriculumRouteMap.resolve("/class-12-notes/biology/theory/"))
    }
}
