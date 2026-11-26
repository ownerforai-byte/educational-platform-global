package com.ravikisan.platform.compose.data.repository

import com.ravikisan.platform.compose.core.contract.ExamDto
import com.ravikisan.platform.compose.core.contract.MobileCommunityPostDto
import com.ravikisan.platform.compose.core.contract.MobileCommunityResponse
import com.ravikisan.platform.compose.core.contract.MobilePracticeResponse
import com.ravikisan.platform.compose.core.contract.MobilePracticeSetDto
import com.ravikisan.platform.compose.data.api.RnApi
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

/**
 * Practice + community data sources (fake→real swap, session 3). Same
 * offline-tolerance contract as [SyllabusRepository]: live fetch → fresh +
 * cache write; failure → Room cache; no cache → [Result.Unavailable].
 * Fakes stay for unit tests only.
 */
class PracticeRepository(
    private val api: RnApi,
    private val cache: StudyCache,
    private val json: Json = Json { ignoreUnknownKeys = true },
) {
    sealed class Result {
        data class Fresh(val sets: List<MobilePracticeSetDto>, val nextCursor: String?) : Result()
        data class Cached(val sets: List<MobilePracticeSetDto>, val nextCursor: String?, val ageMs: Long) : Result()
        data class Unavailable(val message: String) : Result()
    }

    suspend fun loadCatalog(cursor: String? = null): Result {
        val network = runCatching { api.mobilePractice(cursor = cursor) }
        val body = network.getOrNull()?.body()
        val page = body?.data
        if (body != null && body.ok == true && page != null) {
            if (cursor == null) {
                cache.put(CATALOG_KEY, json.encodeToString(MobilePracticeResponse.serializer(), body), System.currentTimeMillis())
            }
            return Result.Fresh(page.items, page.nextCursor)
        }
        return cachedCatalog()
    }

    suspend fun cachedCatalog(): Result {
        val entry = runCatching { cache.get(CATALOG_KEY) }.getOrNull()
        val page = entry?.json?.takeIf { it.isNotBlank() }?.let { raw ->
            runCatching { json.decodeFromString<MobilePracticeResponse>(raw).data }.getOrNull()
        }
        return if (page != null) {
            Result.Cached(page.items, page.nextCursor, System.currentTimeMillis() - entry.updatedAt)
        } else {
            Result.Unavailable("Couldn't load practice sets — check your connection")
        }
    }

    /** Full exam with questions for the scored runner. 404 → [Result.Unavailable]. */
    suspend fun loadExam(slug: String): ExamResult {
        val network = runCatching { api.practiceExam(slug) }
        val response = network.getOrNull()
        if (response != null) {
            if (response.code() == 404) return ExamResult.Unavailable("Exam not found")
            val exam = response.body()
            if (response.isSuccessful && exam != null) {
                cache.put("exam:v1:$slug", json.encodeToString(ExamDto.serializer(), exam), System.currentTimeMillis())
                return ExamResult.Fresh(exam)
            }
        }
        // Offline fallback: cached exam copy.
        val entry = runCatching { cache.get("exam:v1:$slug") }.getOrNull()
        val exam = entry?.json?.let { raw -> runCatching { json.decodeFromString<ExamDto>(raw) }.getOrNull() }
        return if (exam != null) ExamResult.Cached(exam) else ExamResult.Unavailable("Couldn't load the exam — check your connection")
    }

    sealed class ExamResult {
        data class Fresh(val exam: ExamDto) : ExamResult()
        data class Cached(val exam: ExamDto) : ExamResult()
        data class Unavailable(val message: String) : ExamResult()
    }

    companion object {
        const val CATALOG_KEY: String = "mobile-practice:v1"
    }
}

class CommunityRepository(
    private val api: RnApi,
    private val cache: StudyCache,
    private val json: Json = Json { ignoreUnknownKeys = true },
) {
    sealed class Result {
        data class Fresh(val posts: List<MobileCommunityPostDto>, val nextCursor: String?) : Result()
        data class Cached(val posts: List<MobileCommunityPostDto>, val nextCursor: String?, val ageMs: Long) : Result()
        data class Unavailable(val message: String) : Result()
    }

    suspend fun loadFeed(category: String? = null, cursor: String? = null): Result {
        val network = runCatching { api.mobileCommunity(category, cursor = cursor) }
        val body = network.getOrNull()?.body()
        val page = body?.data
        if (body != null && body.ok == true && page != null) {
            if (cursor == null) {
                cache.put(FEED_KEY, json.encodeToString(MobileCommunityResponse.serializer(), body), System.currentTimeMillis())
            }
            return Result.Fresh(page.items, page.nextCursor)
        }
        return cachedFeed()
    }

    suspend fun cachedFeed(): Result {
        val entry = runCatching { cache.get(FEED_KEY) }.getOrNull()
        val page = entry?.json?.takeIf { it.isNotBlank() }?.let { raw ->
            runCatching { json.decodeFromString<MobileCommunityResponse>(raw).data }.getOrNull()
        }
        return if (page != null) {
            Result.Cached(page.items, page.nextCursor, System.currentTimeMillis() - entry.updatedAt)
        } else {
            Result.Unavailable("Couldn't load the community feed — check your connection")
        }
    }

    companion object {
        const val FEED_KEY: String = "mobile-community:v1"
    }
}
