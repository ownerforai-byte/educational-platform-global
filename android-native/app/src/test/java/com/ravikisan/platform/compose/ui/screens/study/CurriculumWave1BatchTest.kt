package com.ravikisan.platform.compose.ui.screens.study

import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.data.api.RnApi
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Wave 1 batch B (class-11 math/language subject routes + /subjects) — route
 * contract, data-fix locks and remaining blocker pins for the seven routes
 * this batch owns:
 *
 *   /class-11-notes/mathematics           /class-11-notes/mathematics/theory
 *   /class-11-notes/english               /class-11-notes/english/theory
 *   /class-11-notes/nepali                /class-11-notes/nepali/theory
 *   /subjects
 *
 * These routes all resolve into the SHARED parent-owned surfaces
 * (CurriculumScreen + SyllabusViewModel + SyllabusRepository). This file
 * locks the resolution contract the parent wires against, pins the additive
 * class-scope fix the backend now provides for `/api/mobile/units`, and
 * keeps the still-open theory-block gap visible so the theory variants are
 * not promoted as full website parity while they cannot render the
 * website's authored theory payloads.
 */
class CurriculumWave1BatchTest {

    // ── Route resolution contract ─────────────────────────────────────────

    @Test
    fun `subject hub routes resolve to the shared subject hub surface`() {
        assertEquals(
            CurriculumEntry(CurriculumSurface.SUBJECT_HUB, "class-11-notes", "mathematics"),
            CurriculumRouteMap.resolve("/class-11-notes/mathematics"),
        )
        assertEquals(
            CurriculumEntry(CurriculumSurface.SUBJECT_HUB, "class-11-notes", "english"),
            CurriculumRouteMap.resolve("/class-11-notes/english"),
        )
        assertEquals(
            CurriculumEntry(CurriculumSurface.SUBJECT_HUB, "class-11-notes", "nepali"),
            CurriculumRouteMap.resolve("/class-11-notes/nepali"),
        )
    }

    @Test
    fun `theory variants resolve to the shared theory surface`() {
        assertEquals(
            CurriculumEntry(CurriculumSurface.THEORY, "class-11-notes", "mathematics"),
            CurriculumRouteMap.resolve("/class-11-notes/mathematics/theory"),
        )
        assertEquals(
            CurriculumEntry(CurriculumSurface.THEORY, "class-11-notes", "english"),
            CurriculumRouteMap.resolve("/class-11-notes/english/theory"),
        )
        assertEquals(
            CurriculumEntry(CurriculumSurface.THEORY, "class-11-notes", "nepali"),
            CurriculumRouteMap.resolve("/class-11-notes/nepali/theory"),
        )
    }

    @Test
    fun `subjects picker route resolves to the shared subjects surface`() {
        assertEquals(
            CurriculumEntry(CurriculumSurface.SUBJECTS),
            CurriculumRouteMap.resolve("/subjects"),
        )
    }

    @Test
    fun `trailing slashes do not change the batch route entries`() {
        for (path in listOf(
            "/class-11-notes/mathematics/",
            "/class-11-notes/mathematics/theory/",
            "/class-11-notes/english/",
            "/class-11-notes/english/theory/",
            "/class-11-notes/nepali/",
            "/class-11-notes/nepali/theory/",
            "/subjects/",
        )) {
            assertTrue("expected $path to resolve", CurriculumRouteMap.resolve(path) != null)
        }
    }

    // ── Class-scope fix (batch B, backend additive contract) ──────────────

    /**
     * `/api/mobile/units` now accepts an OPTIONAL `class` parameter (additive,
     * response shape unchanged): the subject row is matched WITHIN the class
     * track, mirroring the website's `getSubjectSyllabus(classSlug,
     * subjectSlug)`. The param takes `class-11` (class dir) or
     * `class-11-notes` (track slug); omitting it keeps the legacy slug-only
     * behaviour. The seam the parent wiring calls is `RnApi.mobileUnitsScoped`
     * — lock its query params so the class scope cannot silently regress.
     */
    @Test
    fun `units endpoint gains an additive class-scope seam with subject and class query params`() {
        val scoped = RnApi::class.java.declaredMethods.first { it.name == "mobileUnitsScoped" }
        val queries = scoped.annotations
            .filterIsInstance<retrofit2.http.GET>()
            .map { it.value }
        assertEquals(listOf("api/mobile/units"), queries)
        val paramNames = scoped.parameterAnnotations
            .flatMap { it.filterIsInstance<retrofit2.http.Query>() }
            .map { it.value }
            .sorted()
        assertEquals(listOf("class", "subject"), paramNames)
    }

    /**
     * The class split itself is a route-map fact: both class variants of a
     * shared subject resolve with the SAME subject key, and the class
     * discriminator travels as the scoped call's `class` argument (parent
     * wiring) — never as a DTO field.
     */
    @Test
    fun `class sibling routes share one subject key with the scope carried by the call`() {
        for (subject in listOf("mathematics", "english", "nepali")) {
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
     * The units DTO stays as pinned by the sibling batches: id/slug/title/
     * order/topicCount, no class field. The class scope lives in the REQUEST
     * (query param), not the response — a class field appearing here would
     * break the pinned mobileUnitsResponseSchema round-trip.
     */
    @Test
    fun `units DTO stays class-free while the scope travels on the request`() {
        val fields = com.ravikisan.platform.compose.core.contract.MobileUnitDto::class.java.declaredFields
            .filter { !java.lang.reflect.Modifier.isStatic(it.modifiers) }
            .map { it.name }
            .sorted()
        assertEquals(listOf("id", "order", "slug", "title", "topicCount"), fields)
    }

    // ── THEORY surface: what is reachable and what remains blocked ────────

    /**
     * The PYQ half of the website theory page IS reachable with real data:
     * `GET /api/mobile/pyqs?class=&subject=` serves the same generated
     * manifest the website's `getSubjectPyqBank` reads. Lock the class+subject
     * query params so the year-bucket drill-down keeps its coordinates.
     */
    @Test
    fun `pyq catalog keeps class and subject query params for the theory page's PYQ half`() {
        val method = RnApi::class.java.declaredMethods.first { it.name == "mobilePyqs" }
        val paramNames = method.parameterAnnotations
            .flatMap { it.filterIsInstance<retrofit2.http.Query>() }
            .map { it.value }
            .sorted()
        assertTrue("expected class/subject/limit/cursor params, got $paramNames",
            paramNames.containsAll(listOf("class", "subject")))
    }

    /**
     * REMAINING BLOCKER (do not promote the theory variants as full parity):
     * the website theory page renders authored theory blocks
     * (content/notes/theory/{class}/{subject}/*.json — class-11 mathematics
     * has 5, english 2, nepali 2) with MathMarkdown notes plus detail. No
     * /api/mobile endpoint exposes those payloads, and the notes catalog
     * contract (`/api/mobile/notes`, r-notes manifest) carries chapter-level
     * catalog rows only — no class field, no theory-block fields. Until the
     * parent decides the contract, the native THEORY surface stays a
     * chapter-catalog + unit-link surface and must keep its honest
     * "no published notes" empty states.
     */
    @Test
    fun `no theory-block endpoint exists yet on the mobile contract`() {
        val paths = RnApi::class.java.declaredMethods
            .flatMap { it.annotations.filterIsInstance<retrofit2.http.GET>() }
            .map { it.value }
        assertTrue(
            "theory-block payloads are still not served by any mobile endpoint — " +
                "update this lock in the same change that adds them",
            paths.none { it.contains("theory", ignoreCase = true) },
        )
    }

    /**
     * The notes catalog DTO stays exactly as the sibling batches pinned it
     * (chapter/id/noteCount/subject/title) — the same class-agnostic and
     * theory-free contract as before; this batch adds nothing to it.
     */
    @Test
    fun `notes catalog contract stays class- and theory-free`() {
        val fields = MobileNoteItemDto::class.java.declaredFields
            .filter { !java.lang.reflect.Modifier.isStatic(it.modifiers) }
            .map { it.name }
            .sorted()
        assertEquals(listOf("chapter", "id", "noteCount", "subject", "title"), fields)
    }

    // ── Batch promotion inventory (parent-owned wiring input) ────────────

    /**
     * Every path this batch owns must be a member of the canonical 28-path
     * map (not merely resolvable) — the parent promotes from that set.
     */
    @Test
    fun `all seven batch paths are registered in the canonical route map`() {
        for (path in listOf(
            "/subjects",
            "/class-11-notes/mathematics",
            "/class-11-notes/mathematics/theory",
            "/class-11-notes/english",
            "/class-11-notes/english/theory",
            "/class-11-notes/nepali",
            "/class-11-notes/nepali/theory",
        )) {
            assertTrue("expected $path in CurriculumRouteMap.paths", path in CurriculumRouteMap.paths)
        }
    }
}
