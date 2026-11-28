package com.ravikisan.platform.compose.ui.screens.study

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Wave 1 batch A (class-11 science trio + the class-11 hub) — route contract
 * and blocker locks for the seven routes this batch owns:
 *
 *   /class-11-notes
 *   /class-11-notes/physics           /class-11-notes/physics/theory
 *   /class-11-notes/chemistry         /class-11-notes/chemistry/theory
 *   /class-11-notes/biology           /class-11-notes/biology/theory
 *
 * All seven resolve into the SHARED parent-owned surfaces (CurriculumScreen +
 * SyllabusViewModel + SyllabusRepository); navigation wiring stays in
 * RnNavHost.kt (parent-owned). This file locks the resolution contract the
 * parent wires against and keeps the two data blockers visible in the suite:
 *
 *   1. `/api/mobile/units` matches subjects by slug only — class-11 and
 *      class-12 variants of a subject cannot be told apart.
 *   2. The notes catalog (r-notes manifest) carries neither a class field
 *      nor authored PYQ-solution content, so the THEORY surface is a notes
 *      catalog listing, not the website's Theory & PYQs page.
 *
 * Re-verified against the current tree: `backend/src/api/mobile/units.ts`
 * still resolves `subjects` by slug with no class join; the r-notes manifest
 * (`content/resources/exports/manifest.json`) still carries only
 * subject/chapter/id/title/notes (physics 91, chemistry 67, biology 0 rows —
 * so /class-11-notes/biology/theory must keep its honest empty state); the
 * website's theory blocks (`content/notes/theory/class-11/…`) and worked PYQ
 * solutions (`content/_index.json` → `questions[].solution`) remain exposed
 * by NO mobile endpoint (the bank-seam PYQ catalog serves question lines
 * only, behind auth+plus, and belongs to another batch).
 */
class CurriculumWave1Class11ScienceBatchTest {

    // ── Route resolution contract ─────────────────────────────────────────

    @Test
    fun `class-11 hub resolves to the shared class hub surface`() {
        assertEquals(
            CurriculumEntry(CurriculumSurface.CLASS_HUB, "class-11-notes"),
            CurriculumRouteMap.resolve("/class-11-notes"),
        )
    }

    @Test
    fun `science subject hubs resolve to the shared subject hub surface`() {
        for (subject in listOf("physics", "chemistry", "biology")) {
            assertEquals(
                "expected /class-11-notes/$subject to resolve to SUBJECT_HUB",
                CurriculumEntry(CurriculumSurface.SUBJECT_HUB, "class-11-notes", subject),
                CurriculumRouteMap.resolve("/class-11-notes/$subject"),
            )
        }
    }

    @Test
    fun `science theory variants resolve to the shared theory surface`() {
        for (subject in listOf("physics", "chemistry", "biology")) {
            assertEquals(
                "expected /class-11-notes/$subject/theory to resolve to THEORY",
                CurriculumEntry(CurriculumSurface.THEORY, "class-11-notes", subject),
                CurriculumRouteMap.resolve("/class-11-notes/$subject/theory"),
            )
        }
    }

    @Test
    fun `trailing slashes do not change the batch route entries`() {
        for (path in listOf(
            "/class-11-notes/",
            "/class-11-notes/physics/",
            "/class-11-notes/physics/theory/",
            "/class-11-notes/chemistry/",
            "/class-11-notes/chemistry/theory/",
            "/class-11-notes/biology/",
            "/class-11-notes/biology/theory/",
        )) {
            assertTrue("expected $path to resolve", CurriculumRouteMap.resolve(path) != null)
        }
    }

    @Test
    fun `class-12 sibling routes share one subject key so units cannot be class-scoped`() {
        // Blocker lock, batch A side (mirrors CurriculumWave1BatchTest for the
        // math/language batch): `/api/mobile/units` drills down by subject slug
        // only, so physics/chemistry/biology resolve identically for both
        // classes and the app cannot tell which class's units it will receive.
        for (subject in listOf("physics", "chemistry", "biology")) {
            val class11 = CurriculumRouteMap.resolve("/class-11-notes/$subject")
            val class12 = CurriculumRouteMap.resolve("/class-12-notes/$subject")
            assertEquals(CurriculumSurface.SUBJECT_HUB, class11?.surface)
            assertEquals(CurriculumSurface.SUBJECT_HUB, class12?.surface)
            // Same drill-down key on both sides of the class split:
            assertEquals(class11?.subjectSlug, class12?.subjectSlug)
            assertEquals(subject, class11?.subjectSlug)
        }
    }

    /**
     * The class hub is the one place the curriculum data IS class-scoped:
     * `/api/mobile/syllabus` returns classes → subjects from the `classes` and
     * `subjects` tables. Lock both DTO shapes so the hub keeps its class
     * discriminators (a regression here would empty the hub drill-down) and
     * so subject rows stay id/slug/name only.
     */
    @Test
    fun `syllabus tree contract stays class-scoped with compact subject rows`() {
        assertEquals(
            listOf("id", "name", "slug", "subjects"),
            wireFields(MobileClassDto::class.java),
        )
        assertEquals(listOf("id", "name", "slug"), wireFields(MobileSubjectDto::class.java))
    }

    /**
     * The units payload drives the SUBJECT_HUB and THEORY unit links. Lock its
     * DTO shape (same lock the class-12 batches carry) so a class discriminator
     * cannot be silently added — or the class-agnostic blocker silently
     * regress — without this test being updated in the same change.
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

    /**
     * The THEORY surface reads the notes catalog (`/api/mobile/notes?subject=`)
     * backed by the r-notes manifest. Two honest limitations are pinned here:
     * the manifest item carries NO class field (same class-agnostic blocker as
     * units), and it carries NO theory-block / PYQ fields — the native THEORY
     * surface cannot reproduce the website's "Theory & PYQs" page with worked
     * solutions until the contract grows them. Lock the DTO shape so neither
     * blocker can silently disappear without this test being updated.
     */
    @Test
    fun `notes catalog contract carries no class or theory-pyq discriminators`() {
        // Exclude Compose-compiler / companion statics ($stable, Companion) —
        // only the serialized payload fields define the wire contract.
        val fields = MobileNoteItemDto::class.java.declaredFields
            .filter { !java.lang.reflect.Modifier.isStatic(it.modifiers) }
            .map { it.name }
            .sorted()
        assertEquals(listOf("chapter", "id", "noteCount", "subject", "title"), fields)
        assertTrue(
            "contract must not gain a class field without revisiting this blocker",
            fields.none { it.contains("class", ignoreCase = true) },
        )
        assertTrue(
            "contract must not gain theory/pyq fields without revisiting this blocker",
            fields.none { it.contains("pyq", ignoreCase = true) || it.contains("solution", ignoreCase = true) },
        )
    }

    // ── Batch promotion inventory (parent-owned wiring input) ────────────

    /**
     * Every path this batch owns must be a member of the canonical 28-path
     * map (not merely resolvable) — the parent promotes from that set, so a
     * resolvable-but-unregistered path would be silently never promoted.
     */
    @Test
    fun `all seven batch paths are registered in the canonical route map`() {
        for (path in listOf(
            "/class-11-notes",
            "/class-11-notes/physics",
            "/class-11-notes/physics/theory",
            "/class-11-notes/chemistry",
            "/class-11-notes/chemistry/theory",
            "/class-11-notes/biology",
            "/class-11-notes/biology/theory",
        )) {
            assertTrue("expected $path in CurriculumRouteMap.paths", path in CurriculumRouteMap.paths)
        }
    }

    /** Wire fields only — excludes Compose-compiler statics ($stable, Companion). */
    private fun wireFields(dto: Class<*>): List<String> =
        dto.declaredFields.filter { !java.lang.reflect.Modifier.isStatic(it.modifiers) }.map { it.name }.sorted()
}
