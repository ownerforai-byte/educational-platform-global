package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.MobileFormulaFileResponse
import com.ravikisan.platform.compose.core.contract.MobileFormulaItemDto
import com.ravikisan.platform.compose.core.contract.MobileFormulaPageDto
import com.ravikisan.platform.compose.core.contract.MobileFormulasResponse
import com.ravikisan.platform.compose.core.contract.MobilePyqFileDto
import com.ravikisan.platform.compose.core.contract.MobilePyqFileResponse
import com.ravikisan.platform.compose.core.contract.MobilePyqItemDto
import com.ravikisan.platform.compose.core.contract.MobilePyqPageDto
import com.ravikisan.platform.compose.core.contract.MobilePyqsResponse
import com.ravikisan.platform.compose.core.contract.UserDto
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import retrofit2.Response

/**
 * MobileBankRepository (/srs cards, /downloads packs, /mock written section):
 * the real bank is built from the landed `GET /api/mobile/pyqs`(+`/file`) and
 * `GET /api/mobile/formulas`(+`/file`) endpoints, carrying the session Bearer
 * token (both families are plus-tier gated on the backend).
 */
class MobileBankRepositoryTest {

    private val rows = listOf(
        MobilePyqItemDto(
            id = "practice/questions/class-11/physics/kinematics/02-neb-2079.json",
            classDir = "class-11",
            subject = "physics",
            unit = "kinematics",
            year = 2079,
            title = "NEB Class 11 Physics — Kinematics — 2079",
            questionCount = 2,
        ),
        MobilePyqItemDto(
            id = "practice/questions/class-11/physics/optics/01-neb-2080.json",
            classDir = "class-11",
            subject = "physics",
            unit = "optics",
            year = 2080,
            title = "NEB 2080",
            questionCount = 1,
        ),
        // Same exam year, different unit folder — the website buckets these
        // into ONE year card (a NEB paper draws questions across units).
        MobilePyqItemDto(
            id = "practice/questions/class-11/physics/mechanics/03-neb-2079.json",
            classDir = "class-11",
            subject = "physics",
            unit = "mechanics",
            year = 2079,
            title = "NEB Class 11 Physics — Mechanics — 2079",
            questionCount = 1,
        ),
        // Empty file rows must never become a year card.
        MobilePyqItemDto(
            id = "practice/questions/class-11/physics/misc/00-empty.json",
            classDir = "class-11",
            subject = "physics",
            unit = null,
            year = null,
            title = "Empty",
            questionCount = 0,
        ),
    )

    /** Scriptable fake recording auth headers and returning fixture payloads. */
    private inner class BankApi : FakeRnApi() {
        var lastPyqAuth: String? = null
        var lastFormulaAuth: String? = null
        var lastPyqPath: String? = null
        var lastFormulaClass: String? = null
        var lastFormulaSubject: String? = null
        var lastFormulaUnit: String? = null
        var failCatalog = false

        override suspend fun mobilePyqs(
            classDir: String?,
            subject: String?,
            limit: Int?,
            cursor: String?,
            authorization: String?,
        ): Response<com.ravikisan.platform.compose.core.contract.MobilePyqsResponse> {
            lastPyqAuth = authorization
            if (failCatalog) {
                return Response.error(500, "{}".toResponseBody("application/json".toMediaType()))
            }
            return Response.success(MobilePyqsResponse(ok = true, data = MobilePyqPageDto(rows, null)))
        }

        override suspend fun mobilePyqFile(
            path: String,
            authorization: String?,
        ): Response<com.ravikisan.platform.compose.core.contract.MobilePyqFileResponse> {
            lastPyqAuth = authorization
            val questions = when {
                path.endsWith("02-neb-2079.json") -> listOf("State Newton's second law.", "Derive F = ma.")
                path.endsWith("01-neb-2080.json") -> listOf("Define magnification.")
                path.endsWith("03-neb-2079.json") -> listOf("State Newton's third law.")
                else -> emptyList()
            }
            return Response.success(
                MobilePyqFileResponse(
                    ok = true,
                    data = MobilePyqFileDto(path = path, title = "Sheet", questions = questions),
                ),
            )
        }

        override suspend fun mobileFormulas(
            classDir: String?,
            subject: String?,
            unit: String?,
            limit: Int?,
            cursor: String?,
            authorization: String?,
        ): Response<com.ravikisan.platform.compose.core.contract.MobileFormulasResponse> {
            lastFormulaAuth = authorization
            lastFormulaClass = classDir
            lastFormulaSubject = subject
            lastFormulaUnit = unit
            val items = if (unit == "kinematics") {
                listOf(
                    MobileFormulaItemDto(
                        id = "formulas/class-11/physics/kinematics/01.json",
                        classDir = "class-11",
                        subject = "physics",
                        unit = "kinematics",
                        title = "Kinematics",
                        formulaCount = 2,
                    ),
                )
            } else {
                emptyList()
            }
            return Response.success(MobileFormulasResponse(ok = true, data = MobileFormulaPageDto(items, null)))
        }

        override suspend fun mobileFormulaFile(
            path: String,
            authorization: String?,
        ): Response<com.ravikisan.platform.compose.core.contract.MobileFormulaFileResponse> {
            lastFormulaAuth = authorization
            return Response.success(
                MobileFormulaFileResponse(
                    ok = true,
                    data = com.ravikisan.platform.compose.core.contract.MobileFormulaFileDto(
                        path = path,
                        title = "Kinematics sheet",
                        formulas = listOf("v = u + at", "s = ut + ½at²"),
                    ),
                ),
            )
        }
    }

    private fun signedIn(session: FakeSessionStore = FakeSessionStore()): FakeSessionStore = session.apply {
        storedToken = "tok"
        storedUser = UserDto(id = "u-1")
    }

    @Test
    fun `builds a pyq bank newest year first and drops empty files`() = kotlinx.coroutines.test.runTest {
        val api = BankApi()
        val repo = com.ravikisan.platform.compose.data.repository.MobileBankRepository(api, signedIn())

        val bank = repo.subjectPyqBank("class-11-notes/physics")

        // The two 2079 unit files collapse into one year card (website bucket).
        assertEquals(listOf(2080, 2079), bank?.pyqs?.map { it.year })
        assertEquals(4, bank?.pyqs?.sumOf { it.questions.size })
        assertEquals(1, bank?.pyqs?.count { it.year == 2079 })
        val year2079 = bank?.pyqs?.last()
        assertEquals(listOf("kinematics", "mechanics"), year2079?.units)
        assertEquals("NEB Class 11 Physics — 2079", year2079?.title)
        assertEquals("Bearer tok", api.lastPyqAuth)
        assertTrue(bank?.theory?.isEmpty() == true) // no theory endpoint yet — honest gap
    }

    @Test
    fun `signed out users get no bank (plus-tier gate)`() = kotlinx.coroutines.test.runTest {
        val repo = com.ravikisan.platform.compose.data.repository.MobileBankRepository(BankApi(), FakeSessionStore())

        assertNull(repo.subjectPyqBank("class-11-notes/physics"))
        assertNull(repo.formulaUnit("class-11-notes/physics", "kinematics"))
    }

    @Test
    fun `catalog failure yields no bank, never a partial one`() = kotlinx.coroutines.test.runTest {
        val api = BankApi().apply { failCatalog = true }
        val repo = com.ravikisan.platform.compose.data.repository.MobileBankRepository(api, signedIn())

        assertNull(repo.subjectPyqBank("class-11-notes/physics"))
    }

    @Test
    fun `formula unit resolves the unit row and reads its sheet`() = kotlinx.coroutines.test.runTest {
        val api = BankApi()
        val repo = com.ravikisan.platform.compose.data.repository.MobileBankRepository(api, signedIn())

        val unit = repo.formulaUnit("class-11-notes/physics", "kinematics")

        assertEquals("class-11", api.lastFormulaClass)
        assertEquals("physics", api.lastFormulaSubject)
        assertEquals("kinematics", api.lastFormulaUnit)
        assertEquals("Bearer tok", api.lastFormulaAuth)
        assertEquals(listOf("v = u + at", "s = ut + ½at²"), unit?.topics?.single()?.formulas)
        // Website FormulaSheetUnit.id contract: canonical (lowercase) syllabus
        // unit id — the manifest folder slug, never a display title.
        assertEquals("kinematics", unit?.id)
    }

    @Test
    fun `unknown unit yields no formula sheet`() = kotlinx.coroutines.test.runTest {
        val repo = com.ravikisan.platform.compose.data.repository.MobileBankRepository(BankApi(), signedIn())

        assertNull(repo.formulaUnit("class-11-notes/physics", "nonexistent-unit"))
    }
}
