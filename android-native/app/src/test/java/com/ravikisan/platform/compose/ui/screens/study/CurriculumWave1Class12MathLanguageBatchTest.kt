package com.ravikisan.platform.compose.ui.screens.study

import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Wave 1 batch D (remaining class-12 subject routes + /syllabus) — route
 * contract and blocker locks for the seven routes this batch owns:
 *
 *   /syllabus
 *   /class-12-notes/mathematics        /class-12-notes/mathematics/theory
 *   /class-12-notes/english            /class-12-notes/english/theory
 *   /class-12-notes/nepali             /class-12-notes/nepali/theory
 *
 * These routes all resolve into the SHARED parent-owned surfaces
 * (CurriculumScreen + SyllabusViewModel + SyllabusRepository). This file only
 * locks the resolution contract the parent wires against and keeps the data
 * blockers visible in the suite so incomplete routes are not promoted:
 *
 *  1. `/api/mobile/units` matches `subjects` by slug only
 *     (`backend/src/api/mobile/units.ts`: `.eq("slug", subject).limit(1)`,
 *     no class filter) while mathematics, english and nepali exist in BOTH
 *     class tracks — the class-12 drill-down cannot be scoped to class 12;
 *  2. the notes catalog (`/api/mobile/notes`) carries no class field and no
 *     PYQ/solution payload, while the website theory page
 *     (`frontend/features/syllabus/components/theory-section-view.tsx`)
 *     serves unit theory blocks PLUS the year-wise NEB PYQ bank with
 *     step-by-step solutions (`content/practice/questions/class-12/…`) —
 *     so the THEORY surface is structurally a subset;
 *  3. `/syllabus` is NOT data-blocked: its aggregated subject grid needs
 *     only the class-scoped tree from `GET /api/mobile/syllabus`
 *     (classes → subjects with class_id), which the shared
 *     SYLLABUS surface already renders — ready for parent promotion.
 */
class CurriculumWave1Class12MathLanguageBatchTest {

    // ── Route resolution contract ─────────────────────────────────────────

    @Test
    fun `syllabus route resolves to the shared syllabus surface`() {
        assertEquals(
            CurriculumEntry(CurriculumSurface.SYLLABUS),
            CurriculumRouteMap.resolve("/syllabus"),
        )
    }

    @Test
    fun `class-12 math and language hub routes resolve to the shared subject hub surface`() {
        for (subject in listOf("mathematics", "english", "nepali")) {
            assertEquals(
                CurriculumEntry(CurriculumSurface.SUBJECT_HUB, "class-12-notes", subject),
                CurriculumRouteMap.resolve("/class-12-notes/$subject"),
            )
        }
    }

    @Test
    fun `class-12 math and language theory variants resolve to the shared theory surface`() {
        for (subject in listOf("mathematics", "english", "nepali")) {
            assertEquals(
                CurriculumEntry(CurriculumSurface.THEORY, "class-12-notes", subject),
                CurriculumRouteMap.resolve("/class-12-notes/$subject/theory"),
            )
        }
    }

    @Test
    fun `trailing slashes do not change the batch route entries`() {
        for (path in listOf(
            "/syllabus/",
            "/class-12-notes/mathematics/",
            "/class-12-notes/mathematics/theory/",
            "/class-12-notes/english/",
            "/class-12-notes/english/theory/",
            "/class-12-notes/nepali/",
            "/class-12-notes/nepali/theory/",
        )) {
            assertTrue("expected $path to resolve", CurriculumRouteMap.resolve(path) != null)
        }
    }

    // ── Blocker 1: units are class-agnostic (kept visible, do not promote) ─

    /**
     * `/api/mobile/units` looks the subject up with
     * `.eq("slug", subject).eq("is_active", true).limit(1)` and never receives
     * a class discriminator, while mathematics, english and nepali are
     * syllabus subjects of BOTH class tracks. Both class variants therefore
     * drill down through the SAME subject key and the app cannot tell which
     * class's chapters the single matched subject row will return. Until the
     * contract gains a class discriminator, the class-12 SUBJECT_HUB/THEORY
     * routes must stay stubs.
     */
    @Test
    fun `class-12 math and language routes share one subject key with class 11 so units cannot be class-scoped`() {
        for (subject in listOf("mathematics", "english", "nepali")) {
            val class11 = CurriculumRouteMap.resolve("/class-11-notes/$subject")
            val class12 = CurriculumRouteMap.resolve("/class-12-notes/$subject")
            assertEquals(CurriculumSurface.SUBJECT_HUB, class11?.surface)
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
     * step-by-step solutions, which no landed mobile contract carries at all.
     * Lock the DTO shape so the blocker cannot silently disappear without
     * this test being updated in the same change.
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

    // ── /syllabus: ready for promotion (no data blocker) ───────────────────

    /**
     * The website /syllabus page aggregates UNIQUE subjects across the class
     * tracks (subjectMap over SYLLABUS classes) and links each card into the
     * class-track drill-downs. The shared SYLLABUS surface reproduces exactly
     * this aggregation from `GET /api/mobile/syllabus` — whose rows already
     * carry `class_id` — so no units/notes call (and no class discriminator)
     * is required for this route. Promotion is parent-owned.
     */
    @Test
    fun `syllabus surface resolves without subject or class arguments`() {
        val entry = CurriculumRouteMap.resolve("/syllabus")!!
        assertEquals(CurriculumSurface.SYLLABUS, entry.surface)
        assertEquals(null, entry.classSlug)
        assertEquals(null, entry.subjectSlug)
    }
}
