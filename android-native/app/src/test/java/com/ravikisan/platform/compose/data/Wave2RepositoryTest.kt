package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.*
import com.ravikisan.platform.compose.data.repository.Wave2Repository
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import retrofit2.Response
import java.io.IOException

class Wave2RepositoryTest {
    private val json = Json { ignoreUnknownKeys = true; explicitNulls = false }

    @Test
    fun `fresh announcements write cache and offline fallback reads cache`() = runBlocking {
        val cache = FakeStudyCache()
        var failNetwork = false
        val api = object : FakeRnApi() {
            override suspend fun mobileAnnouncements(): Response<AnnouncementsResponse> {
                if (failNetwork) throw IOException("offline")
                return Response.success(
                    AnnouncementsResponse(
                        ok = true,
                        data = AnnouncementsData(
                            listOf(AnnouncementItem("Nov 2026", "Feature", "AI Citations", "Live now")),
                        ),
                    ),
                )
            }
        }
        val repo = Wave2Repository(api, cache, json)

        val fresh = repo.loadAnnouncements()
        assertTrue(fresh.isSuccess)
        assertEquals(1, fresh.getOrThrow().items.size)
        assertEquals("AI Citations", fresh.getOrThrow().items.first().title)

        failNetwork = true
        val cached = repo.loadAnnouncements()
        assertTrue(cached.isSuccess)
        assertEquals("AI Citations", cached.getOrThrow().items.first().title)
    }

    @Test
    fun `cold start offline returns failure`() = runBlocking {
        val cache = FakeStudyCache()
        val api = object : FakeRnApi() {
            override suspend fun mobileLoksewa(): Response<KnowledgeHubResponse> =
                Response.error(503, "{}".toResponseBody("application/json".toMediaType()))
        }
        val repo = Wave2Repository(api, cache, json)
        val result = repo.loadLoksewaHub()
        assertTrue(result.isFailure)
    }
}
