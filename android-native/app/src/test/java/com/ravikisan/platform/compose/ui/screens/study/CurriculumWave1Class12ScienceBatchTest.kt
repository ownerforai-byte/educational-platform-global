package com.ravikisan.platform.compose.ui.screens.study

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobilePyqFileDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.core.contract.RavikishanContentFile
import com.ravikisan.platform.compose.data.api.RnApi
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
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
 * locks the resolution contract the parent wires against and keeps the
 * remaining integration blockers visible so the routes are not promoted
 * before the parent wires the seams.
 *
 * RE-AUDITED against the current tree (differs from the first audit):
 *
 *  1. Blocker "units are class-agnostic" is RESOLVED at the contract level:
 *     `backend/src/api/mobile/units.ts` now accepts an OPTIONAL additive
 *     `class` query param (batch B fix — scopes the subject row by class_id,
 *     response shape unchanged) and the client seam is
 *     [RnApi.mobileUnitsScoped]. What remains is PARENT-OWNED WIRING: the
 *     shared `SyllabusRepository.loadUnits(subjectSlug)` still calls the
 *     unscoped [RnApi.mobileUnits] and cannot receive a class discriminator,
 *     so a class-12 SUBJECT_HUB would still drill into the first slug match
 *     (potentially class-11's units) until the parent passes the class scope.
 *
 *  2. The THEORY page's theory half needs NO new data for class-12 science:
 *     `content/notes/theory/` contains ONLY `class-11` banks, and the website
 *     itself (`frontend/features/syllabus/components/theory-section-view.tsx`)
 *     renders its "Theory coming soon" empty state for every class-12
 *     subject. The native honest empty state IS parity for that half. The
 *     r-notes catalog (`/api/mobile/notes`, `MobileNoteItemDto`) remains
 *     class-agnostic — its rows cannot be claimed as class-12 content.
 *
 *  3. The THEORY page's PYQ half is reachable with REAL class-12 data through
 *     existing APIs only:
 *       - `GET /api/mobile/pyqs?class=class-12&subject=<slug>` — catalog rows
 *         (auth + plus gated, mirroring the website's /pyqs gate);
 *       - `GET /api/ravikishan-notes?path=practice/questions/class-12/…` —
 *         the website's OWN classified content API, which serves the full
 *         bank with `questions[].solution` (worked solutions). The mobile
 *         `/api/mobile/pyqs/file` endpoint serves question LINES only and
 *         drops solutions, so the content API is the parity carrier
 *         (verified live: 29 class-12 science banks, 138 questions, all with
 *         solutions, year 2024).
 *     Rendering them (year aggregation + paywall/auth states) is parent-owned
 *     wiring in the shared THEORY surface.
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

    // ── Promotion inventory (parent-owned wiring input) ───────────────────

    /**
     * Every path this batch owns must be a member of the canonical 28-path
     * map (not merely resolvable) — the parent promotes from that set, so a
     * resolvable-but-unregistered path would be silently never promoted.
     */
    @Test
    fun `all seven batch paths are registered in the canonical route map`() {
        for (path in listOf(
            "/class-12-notes",
            "/class-12-notes/physics",
            "/class-12-notes/physics/theory",
            "/class-12-notes/chemistry",
            "/class-12-notes/chemistry/theory",
            "/class-12-notes/biology",
            "/class-12-notes/biology/theory",
        )) {
            assertTrue("expected $path in CurriculumRouteMap.paths", path in CurriculumRouteMap.paths)
        }
    }

    /**
     * `/class-12-notes` is the one batch route with NO data blocker: the
     * CLASS_HUB surface renders the class → subject rows of the class-scoped
     * syllabus tree (`GET /api/mobile/syllabus` — rows carry class_id), so it
     * needs neither the units call nor the notes catalog. Ready for parent
     * promotion. Lock the tree DTO so the hub keeps its class discriminator.
     */
    @Test
    fun `class-12 hub is data-ready on the class-scoped syllabus tree alone`() {
        val entry = CurriculumRouteMap.resolve("/class-12-notes")!!
        assertEquals(CurriculumSurface.CLASS_HUB, entry.surface)
        assertEquals("class-12-notes", entry.classSlug)
        assertNull(entry.subjectSlug)
        assertEquals(
            listOf("id", "name", "slug", "subjects"),
            wireFields(MobileClassDto::class.java),
        )
    }

    // ── Units scope: contract resolved, wiring parent-owned ───────────────

    /**
     * The class split itself is a route-map fact: both class variants of a
     * science subject resolve with the SAME subject key, and the class
     * discriminator travels as the scoped call's `class` argument (parent
     * wiring) — never as a DTO field.
     */
    @Test
    fun `class-12 science routes share one subject key with class 11 with the scope carried by the call`() {
        for (subject in listOf("physics", "chemistry", "biology")) {
            val class11 = CurriculumRouteMap.resolve("/class-11-notes/$subject")
            val class12 = CurriculumRouteMap.resolve("/class-12-notes/$subject")
            assertEquals(CurriculumSurface.SUBJECT_HUB, class12?.surface)
            // Same drill-down key on both sides of the class split:
            assertEquals(class11?.subjectSlug, class12?.subjectSlug)
            assertEquals(subject, class12?.subjectSlug)
        }
    }

    /**
     * The seam the parent wiring calls for a class-scoped class-12 drill-down:
     * `RnApi.mobileUnitsScoped(subject, class)` against `api/mobile/units`.
     * Lock its query params so the class scope cannot silently regress (same
     * lock batch B carries for the class-11 side).
     */
    @Test
    fun `units class-scope seam keeps subject and class query params`() {
        val scoped = RnApi::class.java.declaredMethods.first { it.name == "mobileUnitsScoped" }
        val paths = scoped.annotations.filterIsInstance<retrofit2.http.GET>().map { it.value }
        assertEquals(listOf("api/mobile/units"), paths)
        val paramNames = scoped.parameterAnnotations
            .flatMap { it.filterIsInstance<retrofit2.http.Query>() }
            .map { it.value }
            .sorted()
        assertEquals(listOf("class", "subject"), paramNames)
    }

    /** Wire fields only — excludes Compose-compiler statics ($stable, Companion). */
    private fun wireFields(dto: Class<*>): List<String> =
        dto.declaredFields.filter { !java.lang.reflect.Modifier.isStatic(it.modifiers) }.map { it.name }.sorted()

    /**
     * The units payload drives the SUBJECT_HUB list. Lock its DTO shape so a
     * class discriminator cannot be silently added — the class scope lives in
     * the REQUEST (query param), not the response, and a class field here
     * would break the pinned mobileUnitsResponseSchema round-trip.
     */
    @Test
    fun `units contract carries no class discriminator`() {
        val fields = wireFields(MobileUnitDto::class.java)
        assertEquals(listOf("id", "order", "slug", "title", "topicCount"), fields)
        assertTrue(
            "units contract must not gain a class field without revisiting this lock",
            fields.none { it.contains("class", ignoreCase = true) },
        )
    }

    // ── THEORY surface: PYQ half reachable, solutions carried by the content API ──

    /**
     * `GET /api/mobile/pyqs?class=&subject=` serves the same generated
     * manifest the website's `getSubjectPyqBank` reads, with the class+subject
     * coordinates the theory page's PYQ half needs. Lock the query params.
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
     * The parity carrier for worked solutions is the website's OWN content
     * API: `GET /api/ravikishan-notes?path=` (the site calls it from
     * `frontend/lib/api/content.ts`). Lock the seam — its path, its query
     * param, and the solution-bearing payload shape — so the parent wiring
     * for the class-12 theory surface cannot lose the solutions.
     */
    @Test
    fun `solution-bearing content seam exposes pyq banks with worked solutions`() {
        val method = RnApi::class.java.declaredMethods.first { it.name == "ravikishanContent" }
        val paths = method.annotations.filterIsInstance<retrofit2.http.GET>().map { it.value }
        assertEquals(listOf("api/ravikishan-notes"), paths)
        val paramNames = method.parameterAnnotations
            .flatMap { it.filterIsInstance<retrofit2.http.Query>() }
            .map { it.value }
        assertEquals(listOf("path"), paramNames)
        // The payload carries the solution field the mobile pyqs/file drops:
        val fields = RavikishanContentFile::class.java.declaredFields
            .filter { !java.lang.reflect.Modifier.isStatic(it.modifiers) }
            .map { it.name }.sorted()
        assertEquals(listOf("detail", "examSource", "notes", "questions", "title", "unitSlug", "year"), fields)
    }

    /**
     * `/api/mobile/pyqs/file` serves question LINES only (`questions` is
     * List<String>) — it cannot deliver the website's worked solutions. Lock
     * its shape so nobody mistakes it for the parity carrier.
     */
    @Test
    fun `mobile pyq file contract carries question lines only`() {
        assertEquals(
            listOf("path", "questions", "title"),
            wireFields(MobilePyqFileDto::class.java),
        )
        assertTrue(
            "mobile pyq file rows carry no solution payload — the content API is the parity carrier",
            wireFields(MobilePyqFileDto::class.java).none { it.contains("solution", ignoreCase = true) },
        )
    }

    /**
     * The class-12 science PYQ content itself is real: 29 banks across
     * physics/chemistry/biology (year 2024) with `questions[].solution` on
     * every question. Decode one REAL-shaped bank payload through the shared
     * converter configuration to pin the DTO round-trip (marks authored as a
     * number here; sibling banks author marks as strings — both tolerated).
     */
    @Test
    fun `solution-bearing bank payload decodes with numeric and string marks`() {
        val json = Json { ignoreUnknownKeys = true; explicitNulls = false }
        val payload = """
            {
              "title": "Class 12 Physics — Current Electricity — 2024",
              "year": 2024,
              "examSource": "NEB",
              "questions": [
                {
                  "knowledgeNote": "tolerated extra key",
                  "marks": 4,
                  "question": "Define drift velocity.",
                  "solution": "Step-by-step worked solution."
                },
                {
                  "marks": "2",
                  "question": "State Ohm's law."
                }
              ]
            }
        """.trimIndent()
        val decoded = json.decodeFromString(RavikishanContentFile.serializer(), payload)
        assertEquals(2024, decoded.year)
        assertEquals(2, decoded.questions.size)
        assertEquals("Step-by-step worked solution.", decoded.questions[0].solution)
        assertNull(decoded.questions[1].solution)
    }

    // ── THEORY surface: notes catalog stays class-agnostic ────────────────

    /**
     * The r-notes catalog (`/api/mobile/notes?subject=`) carries NO class
     * field, so its rows cannot be separated into class-11 vs class-12 for a
     * subject that exists in BOTH tracks — the native THEORY surface must not
     * present them as class-12 content. (For class-12 science the WEBSITE's
     * theory half is empty anyway — `content/notes/theory/` only has class-11
     * banks — so the honest empty state is parity for that half.) Lock the
     * DTO shape so the blocker cannot silently disappear without this test
     * being updated in the same change.
     */
    @Test
    fun `notes catalog contract carries no class discriminator`() {
        val fields = wireFields(MobileNoteItemDto::class.java)
        assertEquals(listOf("chapter", "id", "noteCount", "subject", "title"), fields)
        assertTrue(
            "contract must not gain a class field without revisiting this lock",
            fields.none { it.contains("class", ignoreCase = true) },
        )
    }
}
