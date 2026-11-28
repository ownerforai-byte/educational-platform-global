package com.ravikisan.platform.compose.ui.screens.study

import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Wave 1 batch C (class-12 science subject routes + the class-12 hub) — route
 * contract and blocker locks for the seven routes this batch owns:
 *
 *   /class-12-notes
 *   /class-12-notes/physics            /class-12-notes/physics/theory
 *   /class-12-notes/chemistry          /class-12-notes/chemistry/theory
 *   /class-12-notes/biology            /class-12-notes/biology/theory
 *
 * These routes all resolve into the SHARED parent-owned surfaces
 * (CurriculumScreen + SyllabusViewModel + SyllabusRepository). This file only
 * locks the resolution contract the parent wires against and keeps the two
 * data blockers visible in the suite so the routes are not promoted while:
 *
 *  1. `/api/mobile/units` matches `subjects` by slug only (`limit(1)`, no
 *     class filter) and physics/chemistry/biology exist in BOTH class tracks
 *     — the drill-down cannot be scoped to class 12;
 *  2. the notes catalog (`/api/mobile/notes`) carries no class field and no
 *     PYQ/solution payload, while the website theory page serves class-scoped
 *     NEB PYQ year cards with worked solutions
 *     (`content/practice/questions/class-12/<subject>/neb-*.json`) next to its
 *     theory blocks — so the THEORY surface is structurally a subset.
 */
class CurriculumWave1Class12ScienceBatchTest {

    // ── Route resolution contract ─────────────────────────────────────────

    @Test
    fun `class-12 hub route resolves to the shared class hub surface`() {
        assertEquals(
            CurriculumEntry(CurriculumSurface.CLASS_HUB, "class-12-notes"),
            CurriculumRouteMap.resolve("/class-12-notes"),
        )
    }

    @Test
    fun `class-12 science subject hub routes resolve to the shared subject hub surface`() {
        for (subject in listOf("physics", "chemistry", "biology")) {
            assertEquals(
                CurriculumEntry(CurriculumSurface.SUBJECT_HUB, "class-12-notes", subject),
                CurriculumRouteMap.resolve("/class-12-notes/$subject"),
            )
        }
    }

    @Test
    fun `class-12 science theory variants resolve to the shared theory surface`() {
        for (subject in listOf("physics", "chemistry", "biology")) {
            assertEquals(
                CurriculumEntry(CurriculumSurface.THEORY, "class-12-notes", subject),
                CurriculumRouteMap.resolve("/class-12-notes/$subject/theory"),
            )
        }
    }

    @Test
    fun `trailing slashes do not change the batch route entries`() {
        for (path in listOf(
            "/class-12-notes/",
            "/class-12-notes/physics/",
            "/class-12-notes/physics/theory/",
            "/class-12-notes/chemistry/",
            "/class-12-notes/chemistry/theory/",
            "/class-12-notes/biology/",
            "/class-12-notes/biology/theory/",
        )) {
            assertTrue("expected $path to resolve", CurriculumRouteMap.resolve(path) != null)
        }
    }

    // ── Blocker 1: units are class-agnostic (kept visible, do not promote) ─

    /**
     * `/api/mobile/units` looks the subject up with
     * `.eq("slug", subject).eq("is_active", true).limit(1)` and never receives
     * a class discriminator, while physics, chemistry and biology are syllabus
     * subjects of BOTH class tracks. Both class variants therefore drill down
     * through the SAME subject key and the app cannot tell which class's
     * chapters the single matched subject row will return. Until the contract
     * gains a class discriminator, the class-12 SUBJECT_HUB/THEORY routes must
     * stay stubs.
     */
    @Test
    fun `class-12 science routes share one subject key with class 11 so units cannot be class-scoped`() {
        for (subject in listOf("physics", "chemistry", "biology")) {
            val class11 = CurriculumRouteMap.resolve("/class-11-notes/$subject")
            val class12 = CurriculumRouteMap.resolve("/class-12-notes/$subject")
            assertEquals(CurriculumSurface.SUBJECT_HUB, class12?.surface)
            // Same drill-down key on both sides of the class split:
            assertEquals(class11?.subjectSlug, class12?.subjectSlug)
            assertEquals(subject, class12?.subjectSlug)
        }
    }

    /** Wire fields only — excludes Compose-compiler statics ($stable, Companion). */
    private fun wireFields(dto: Class<*>): List<String> =
        dto.declaredFields.filter { !java.lang.reflect.Modifier.isStatic(it.modifiers) }.map { it.name }.sorted()

    /**
     * The units payload drives the SUBJECT_HUB list. Lock its DTO shape so a
     * class discriminator cannot be silently added (or the class-agnostic
     * blocker silently regress) without this test being updated in the same
     * change.
     */
    @Test
    fun `units contract carries no class discriminator`() {
        val fields = wireFields(MobileUnitDto::class.java)
        assertEquals(listOf("id", "order", "slug", "title", "topicCount"), fields)
        assertTrue(
            "units contract must not gain a class field without revisiting this blocker",
            fields.none { it.contains("class", ignoreCase = true) },
        )
    }

    // ── Blocker 2: notes catalog ≠ website theory content ─────────────────

    /**
     * The THEORY surface reads only the notes catalog, whose manifest item has
     * subject/chapter/title but NO class field — so class-12 entries cannot be
     * separated from class-11 entries with the same subject. The website
     * theory page additionally renders class-scoped NEB PYQ year cards with
     * step-by-step solutions (`content/practice/questions/class-12/…`), which
     * no landed mobile contract carries at all. Lock the DTO shape so the
     * blocker cannot silently disappear without this test being updated.
     */
    @Test
    fun `notes catalog contract carries no class discriminator and no PYQ payload`() {
        val fields = wireFields(MobileNoteItemDto::class.java)
        assertEquals(listOf("chapter", "id", "noteCount", "subject", "title"), fields)
        assertTrue(
            "contract must not gain a class field without revisiting this blocker",
            fields.none { it.contains("class", ignoreCase = true) },
        )
        assertTrue(
            "notes catalog rows carry no question/solution payload — PYQ parity is out of reach",
            fields.none { it.contains("question", ignoreCase = true) || it.contains("solution", ignoreCase = true) },
        )
    }
}
