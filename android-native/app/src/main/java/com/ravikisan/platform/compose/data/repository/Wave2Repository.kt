package com.ravikisan.platform.compose.data.repository

import com.ravikisan.platform.compose.core.contract.*
import com.ravikisan.platform.compose.data.api.RnApi
import kotlinx.serialization.json.Json
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Repository for Wave 2 thin surfaces + GK banks.
 * Same offline-tolerance contract as SyllabusRepository:
 * fresh → cache write; failure → cache read; else Unavailable.
 */
@Singleton
class Wave2Repository @Inject constructor(
    private val api: RnApi,
    private val cache: StudyCache,
    private val json: Json,
) {
    // ── Thin Surfaces (simple, no cache needed — static data) ───────────

    suspend fun loadAnnouncements(): Result<AnnouncementsData> = fetchSimple("wave2:announcements") {
        api.mobileAnnouncements()
    }

    suspend fun loadChangelog(): Result<ChangelogData> = fetchSimple("wave2:changelog") {
        api.mobileChangelog()
    }

    suspend fun loadNotice(): Result<NoticeData> = fetchSimple("wave2:notice") {
        api.mobileNotice()
    }

    suspend fun loadExamCountdown(): Result<ExamCountdownData> = fetchSimple("wave2:exam-countdown") {
        api.mobileExamCountdown()
    }

    suspend fun loadFeedback(): Result<FeedbackData> = fetchSimple("wave2:feedback") {
        api.mobileFeedback()
    }

    suspend fun loadStatus(): Result<PlatformStatusData> = fetchSimple("wave2:status") {
        api.mobileStatus()
    }

    suspend fun loadReferrals(): Result<ReferralsData> = fetchSimple("wave2:referrals") {
        api.mobileReferrals()
    }

    suspend fun loadSiteIndex(): Result<SiteIndexData> = fetchSimple("wave2:site-index") {
        api.mobileSiteIndex()
    }

    suspend fun loadLevels(): Result<LevelsData> = fetchSimple("wave2:levels") {
        api.mobileLevels()
    }

    // ── GK Banks ────────────────────────────────────────────────────────

    suspend fun loadLoksewaHub(): Result<KnowledgeHubData> = fetchSimple("wave2:loksewa") {
        api.mobileLoksewa()
    }

    suspend fun loadLoksewaTopic(slug: String): Result<KnowledgeSectionFull> = fetchSimple("wave2:loksewa:$slug") {
        api.mobileLoksewaTopic(slug)
    }

    suspend fun loadWorldKnowledgeHub(): Result<KnowledgeHubData> = fetchSimple("wave2:world-knowledge") {
        api.mobileWorldKnowledge()
    }

    suspend fun loadWorldKnowledgeTopic(slug: String): Result<KnowledgeSectionFull> = fetchSimple("wave2:world-knowledge:$slug") {
        api.mobileWorldKnowledgeTopic(slug)
    }

    // ── Shared fetch helper with Room cache ─────────────────────────────

    private suspend inline fun <reified D> fetchSimple(
        cacheKey: String,
        crossinline apiCall: suspend () -> retrofit2.Response<out Any>,
    ): Result<D> {
        return try {
            val response = apiCall()
            if (response.isSuccessful) {
                val body = response.body()
                @Suppress("UNCHECKED_CAST")
                val data = extractData(body) as? D
                if (data != null) {
                    // Write to cache
                    try {
                        cache.put(cacheKey, json.encodeToString(kotlinx.serialization.serializer<D>(), data), System.currentTimeMillis())
                    } catch (_: Exception) { /* cache write failure is non-fatal */ }
                    Result.success(data)
                } else {
                    readCache(cacheKey)
                }
            } else {
                readCache(cacheKey)
            }
        } catch (_: Exception) {
            readCache(cacheKey)
        }
    }

    private fun extractData(body: Any?): Any? {
        if (body == null) return null
        return when (body) {
            is AnnouncementsResponse -> body.data
            is ChangelogResponse -> body.data
            is NoticeResponse -> body.data
            is ExamCountdownResponse -> body.data
            is FeedbackResponse -> body.data
            is PlatformStatusResponse -> body.data
            is ReferralsResponse -> body.data
            is SiteIndexResponse -> body.data
            is LevelsResponse -> body.data
            is KnowledgeHubResponse -> body.data
            is KnowledgeSectionResponse -> body.data
            else -> null
        }
    }

    private suspend inline fun <reified D> readCache(cacheKey: String): Result<D> {
        return try {
            val cached = cache.get(cacheKey)
            if (cached != null) {
                val data = json.decodeFromString(kotlinx.serialization.serializer<D>(), cached.json)
                Result.success(data)
            } else {
                Result.failure(Exception("Unavailable"))
            }
        } catch (_: Exception) {
            Result.failure(Exception("Unavailable"))
        }
    }
}
