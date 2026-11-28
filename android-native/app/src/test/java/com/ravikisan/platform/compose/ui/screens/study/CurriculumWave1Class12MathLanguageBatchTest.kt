package com.ravikisan.platform.compose.ui.screens.study

import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobilePyqFileDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.data.api.RnApi
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Wave 1 batch D (remaining class-12 subject routes + /syllabus) — route
 * contract, data-fix locks and remaining blocker pins for the seven routes
 * this batch owns:
 *
 *   /syllabus
 *   /class-12-notes/mathematics        /class-12-notes/mathematics/theory
 *   /class-12-notes/english            /class-12-notes/english/theory
 *   /class-12-notes/nepali             /class-12-notes/nepali/theory
 *
 * These routes all resolve into the SHARED parent-owned surfaces
 * (CurriculumScreen + SyllabusViewModel + SyllabusRepository). This file
 * locks the resolution contract the parent wires against and keeps the
 * remaining data blockers visible in the suite so incomplete routes are not
 * promoted.
 *
 * BLOCKER STATUS (re-audited against the current working tree):
 *
 *  1. RESOLVED at contract level — `/api/mobile/units` now accepts an
 *     OPTIONAL `class` parameter (additive batch-B fix,
 *     `backend/src/api/mobile/units.ts`: the subject row is matched WITHIN
 *     the class track, mirroring the website's
 *     `getSubjectSyllabus(classSlug, subjectSlug)`), and the app-side seam
 *     `RnApi.mobileUnitsScoped(subject, class)` exists. REMAINING WORK IS
 *     PARENT WIRING, not data: the shared `SyllabusRepository.loadUnits`
 *     still calls the legacy unscoped `api.mobileUnits(subjectSlug)`, so the
 *     parent must switch the drill-down to the scoped seam with the
 *     class-12 track slug for these routes. Until that wiring lands, the
 *     SUBJECT_HUB routes must stay stubs.
 *  2. THEORY — the DATA is now reachable; the remaining gap is PARENT-OWNED
 *     SURFACE WIRING plus one contract fact:
 *       a. The website's class-12 THEORY page has NO authored theory banks
 *          (`content/notes/theory/` carries class-11 banks only — 26
 *          entries, none under class-12), so the web theory section itself
 *          renders the honest "Theory coming soon" empty state for class-12.
 *          A native theory surface can mirror that state honestly — no
 *          class-12 data is missing.
 *       b. The PYQ half is fully reachable with EXISTING APIs:
 *          `GET /api/mobile/pyqs?class=&subject=` serves the same generated
 *          manifest the website's `getSubjectPyqBank` reads (year/unit/
 *          questionCount rows), and the step-by-step SOLUTIONS the website
 *          reveals are carried by the website's OWN content API
 *          `GET /api/ravikishan-notes?path=practice/questions/class-12/
 *          <subject>/<unit>/NN-neb-YYYY.json` (additive batch-C client seam
 *          `RnApi.ravikishanContent(path)` → `RavikishanContentFile` with
 *          `questions[{question, marks, solution}]`).
 *       c. CONTRACT FACT (pinned below): the mobile shortcut endpoint
 *          `/api/mobile/pyqs/file` serves question LINES only and DROPS the
 *          `solution` field — the solution-bearing carrier is the
 *          ravikishan-notes content API, not the mobile PYQ file endpoint.
 *       d. The CURRENT shared THEORY surface renders only the class-agnostic
 *          notes catalog (`/api/mobile/notes` has no `class` query param and
 *          its item DTO has no class field — the class-12 catalog rows
 *          cannot be separated from class-11 rows for the same subject; the
 *          r-export manifest carries 50 items across six class-agnostic
 *          subject slugs). Re-rendering THEORY as the website does — honest
 *          empty theory state + class-scoped PYQ year view with revealed
 *          solutions — is parent-owned wiring, so the theory variants must
 *          stay stubs until the parent decides the surface contract.
 *  3. `/syllabus` is NOT data-blocked: its aggregated subject grid needs
 *     only the class-scoped tree from `GET /api/mobile/syllabus`
 *     (classes → subjects with class_id), which the shared SYLLABUS surface
 *     already renders — ready for parent promotion.
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

    // ── Blocker 1 RESOLVED: class-scoped units seam (parent wires it) ─────

    /**
     * The class-agnostic-units blocker from the prior audit is RESOLVED at
     * the contract level by the batch-B additive fix: `RnApi.mobileUnitsScoped`
     * calls `GET api/mobile/units` with `subject` + `class` query params, and
     * the backend matches the subject row WITHIN the class track. Lock the
     * seam so the class scope cannot silently regress.
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
     * The class split itself is a route-map fact: the class-12 math/language
     * routes share the SAME subject key with their class-11 siblings, and the
     * class discriminator travels as the scoped call's `class` argument
     * (parent wiring) — never as a DTO field. The parent must call
     * `mobileUnitsScoped(subject, "class-12-notes")` for these routes; the
     * legacy `api.mobileUnits(subjectSlug)` call in the shared repository
     * cannot tell the two class tracks apart.
     */
    @Test
    fun `class-12 math and language routes share one subject key with class 11 — scope travels on the call`() {
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
     * The units payload drives the SUBJECT_HUB list. The class scope lives in
     * the REQUEST (query param), not the response — lock the DTO shape so a
     * class field cannot appear silently (it would break the pinned
     * mobileUnitsResponseSchema round-trip).
     */
    @Test
    fun `units contract stays class-free while the scope travels on the request`() {
        val fields = wireFields(MobileUnitDto::class.java)
        assertEquals(listOf("id", "order", "slug", "title", "topicCount"), fields)
        assertTrue(
            "units contract must not gain a class field without revisiting this lock",
            fields.none { it.contains("class", ignoreCase = true) },
        )
    }

    // ── Blocker 2: THEORY content — what is reachable and what is not ─────

    /**
     * The PYQ half of the website theory page IS reachable by class-12
     * coordinates: `GET /api/mobile/pyqs?class=&subject=` serves the same
     * generated manifest the website's `getSubjectPyqBank` reads. Lock the
     * class+subject query params so the year-bucket drill-down keeps its
     * coordinates.
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
     * CONTRACT FACT: the website PYQ cards reveal step-by-step solutions
     * (`{question, marks, solution}` in the exam bank), but the mobile file
     * endpoint serves question LINES only — `MobilePyqFileDto` carries
     * path/title/questions and NO solution field. The solution-bearing
     * carrier is the ravikishan-notes content API (pinned below). Lock the
     * DTO shape so the shortcut endpoint cannot be silently believed to
     * serve solutions; update this lock in the same change that extends the
     * contract.
     */
    @Test
    fun `pyq file payload carries no solution field — worked solutions are not served yet`() {
        val fields = wireFields(MobilePyqFileDto::class.java)
        assertEquals(listOf("path", "questions", "title"), fields)
        assertTrue(
            "mobile PYQ file endpoint must not gain a solution field without revisiting this blocker",
            fields.none { it.contains("solution", ignoreCase = true) || it.contains("marks", ignoreCase = true) },
        )
    }

    /**
     * REMAINING BLOCKER (do not promote the theory variants as full parity):
     * no /api/mobile endpoint exposes authored theory-block payloads at all,
     * and for class-12 the WEBSITE has no authored theory banks either —
     * `content/notes/theory/` carries class-11 banks only (26 entries, none
     * under class-12), so the web class-12 theory section itself renders the
     * honest "Theory coming soon" empty state. The populated half of the web
     * page is the class-scoped NEB PYQ bank (reachable by coordinates, but
     * without solutions — see the lock above), and the shared THEORY surface
     * that would render it is parent-owned. Until the parent decides the
     * contract, the native THEORY surface stays a chapter-catalog surface and
     * must keep its honest empty states.
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
     * (chapter/id/noteCount/subject/title) — still class-agnostic (no `class`
     * query param on `/api/mobile/notes`, no class field on the item), so
     * class-12 catalog entries cannot be separated from class-11 entries with
     * the same subject; and still theory-free (no theory-block fields).
     */
    @Test
    fun `notes catalog contract stays class- and theory-free`() {
        val fields = wireFields(MobileNoteItemDto::class.java)
        assertEquals(listOf("chapter", "id", "noteCount", "subject", "title"), fields)
        assertTrue(
            "contract must not gain a class field without revisiting this blocker",
            fields.none { it.contains("class", ignoreCase = true) },
        )
        assertTrue(
            "notes catalog rows carry no theory-block fields",
            fields.none { it.contains("theory", ignoreCase = true) },
        )
    }

    /**
     * The SOLUTION-BEARING carrier for the theory page's PYQ half: the
     * website's own classified content API, reached through the additive
     * batch-C client seam `RnApi.ravikishanContent(path)` →
     * `GET api/ravikishan-notes?path=…` (same endpoint the website's
     * `lib/api/content.ts` uses). Lock the seam so the coordinates cannot
     * silently regress.
     */
    @Test
    fun `ravikishan content seam carries the solution-bearing PYQ payloads by path`() {
        val seam = RnApi::class.java.declaredMethods.first { it.name == "ravikishanContent" }
        val queries = seam.annotations
            .filterIsInstance<retrofit2.http.GET>()
            .map { it.value }
        assertEquals(listOf("api/ravikishan-notes"), queries)
        val paramNames = seam.parameterAnnotations
            .flatMap { it.filterIsInstance<retrofit2.http.Query>() }
            .map { it.value }
        assertEquals(listOf("path"), paramNames)
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

    // ── Batch promotion inventory (parent-owned wiring input) ────────────

    /**
     * Every path this batch owns must be a member of the canonical 28-path
     * map (not merely resolvable) — the parent promotes from that set.
     */
    @Test
    fun `all seven batch paths are registered in the canonical route map`() {
        for (path in listOf(
            "/syllabus",
            "/class-12-notes/mathematics",
            "/class-12-notes/mathematics/theory",
            "/class-12-notes/english",
            "/class-12-notes/english/theory",
            "/class-12-notes/nepali",
            "/class-12-notes/nepali/theory",
        )) {
            assertTrue("expected $path in CurriculumRouteMap.paths", path in CurriculumRouteMap.paths)
        }
    }
}
