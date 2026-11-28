package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.JourneyRowDto
import com.ravikisan.platform.compose.core.contract.JourneyRowsResponse
import com.ravikisan.platform.compose.data.repository.JourneyRepository
import com.ravikisan.platform.compose.data.repository.titleize
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import retrofit2.Response

/**
 * JourneyRepository (/planner weak topics): rows from the landed
 * `GET /api/progress` map to `ProgressEntryLite` exactly like the website's
 * `journeyRowToEntry` — `started` → in-progress, `completed` → completed;
 * signed out / 401 / network failure are honest Unavailable, never fake rows.
 */
class JourneyRepositoryTest {

    private class JourneyApi(
        private val code: Int = 200,
        private val rows: List<JourneyRowDto> = emptyList(),
        private val fail: Boolean = false,
    ) : FakeRnApi() {
        var lastAuth: String? = null

        override suspend fun progress(
            authorization: String?,
        ): Response<JourneyRowsResponse> {
            lastAuth = authorization
            if (fail) throw java.io.IOException("offline")
            return if (code == 200) {
                Response.success(JourneyRowsResponse(ok = true, data = rows))
            } else {
                Response.error(code, "{}".toResponseBody("application/json".toMediaType()))
            }
        }
    }

    private fun row(status: String) = JourneyRowDto(
        id = "row-1",
        classSlug = "class-11-notes",
        subjectSlug = "physics",
        unitSlug = "kinematics",
        topicSlug = "newtons-first-law",
        status = status,
    )

    @Test
    fun `signed out reports unavailable without a network call`() = kotlinx.coroutines.test.runTest {
        val api = JourneyApi(fail = true) // must never be reached
        val result = JourneyRepository(api, FakeSessionStore()).load()

        assertTrue(result is JourneyRepository.Result.Unavailable)
        assertEquals(null, api.lastAuth)
    }

    @Test
    fun `rows map with website status semantics and titleized labels`() = kotlinx.coroutines.test.runTest {
        val api = JourneyApi(
            rows = listOf(row("started"), row("completed")),
        )
        val session = FakeSessionStore().apply { storedToken = "tok" }
        val result = JourneyRepository(api, session).load()

        val entries = (result as JourneyRepository.Result.Fresh).entries
        assertEquals(listOf("in_progress", "completed"), entries.map { it.status })
        assertEquals(false, entries[0].completed)
        assertEquals(true, entries[1].completed)
        assertEquals("class-11-notes/physics", "${entries[0].classSlug}/${entries[0].subjectSlug}")
        assertEquals("Newtons First Law", entries[0].topic?.title)
        assertEquals("Bearer tok", api.lastAuth)
    }

    @Test
    fun `auth failure and network failure are unavailable`() = kotlinx.coroutines.test.runTest {
        val session = FakeSessionStore().apply { storedToken = "tok" }

        assertTrue(JourneyRepository(JourneyApi(code = 401), session).load() is JourneyRepository.Result.Unavailable)
        assertTrue(JourneyRepository(JourneyApi(fail = true), session).load() is JourneyRepository.Result.Unavailable)
    }

    @Test
    fun `titleize matches the website fallback labels`() {
        assertEquals("Equations Of Motion", titleize("equations-of-motion"))
        assertEquals("Kinematics", titleize("kinematics"))
        assertEquals("Unit 2", titleize("unit_2"))
    }
}
