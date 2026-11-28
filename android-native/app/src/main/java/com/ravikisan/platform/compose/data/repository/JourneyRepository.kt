package com.ravikisan.platform.compose.data.repository

import com.ravikisan.platform.compose.core.contract.JourneyRowDto
import com.ravikisan.platform.compose.core.logic.ProgressEntryLite
import com.ravikisan.platform.compose.core.logic.ProgressTopicLite
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.session.SessionStore
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Journey loader for the weekly planner (`/planner` weak topics) over the
 * already-landed `GET /api/progress` route — the same rows the website's
 * `useJourney()` hook consumes (`frontend/components/study/use-journey.ts`).
 *
 * The route is `requireAuth`; the session Bearer token is attached per call
 * (the shared OkHttp stack has no auth interceptor yet). Signed out / 401 /
 * network failure all map to `Result.Unavailable`, which the planner renders
 * as the website's "Progress is unavailable, so no weak topics are suggested"
 * line — no invented topics.
 *
 * Row → entry mapping follows `frontend/features/progress/catalog.ts`:
 * `started` → in-progress, `completed` → completed; labels fall back to the
 * website's own `titleize(topicSlug)` because the mobile syllabus payloads
 * carry no topic names (units endpoint exposes `topicCount` only).
 */
@Singleton
class JourneyRepository @Inject constructor(
    private val api: RnApi,
    private val session: SessionStore,
) {

    sealed class Result {
        data class Fresh(val entries: List<ProgressEntryLite>) : Result()
        data class Unavailable(val message: String) : Result()
    }

    suspend fun load(): Result {
        val auth = session.getAccessToken()?.let { "Bearer $it" }
        if (auth == null) {
            return Result.Unavailable("Sign in to include your progress in the plan.")
        }
        val response = runCatching { api.progress(authorization = auth) }.getOrNull()
        if (response == null) {
            return Result.Unavailable("Progress is unavailable, so no weak topics are suggested.")
        }
        if (response.code() == 401 || response.code() == 403) {
            return Result.Unavailable("Sign in to include your progress in the plan.")
        }
        val rows = response.body()?.data
        if (!response.isSuccessful || rows == null) {
            return Result.Unavailable("Progress is unavailable, so no weak topics are suggested.")
        }
        return Result.Fresh(rows.map { it.toEntryLite() })
    }
}

/** `started` → in-progress, `completed` → completed (website `toProgressStatus`). */
internal fun JourneyRowDto.toEntryLite(): ProgressEntryLite {
    val completed = status == "completed"
    return ProgressEntryLite(
        id = id,
        completed = completed,
        completedAt = completedAt,
        status = if (completed) "completed" else "in_progress",
        classSlug = classSlug,
        subjectSlug = subjectSlug,
        unitSlug = unitSlug,
        topicSlug = topicSlug,
        topic = ProgressTopicLite(
            slug = topicSlug,
            title = titleize(topicSlug),
            chapterTitle = unitSlug,
        ),
    )
}

/** `equations-of-motion` → `Equations Of Motion` (website fallback labels). */
internal fun titleize(slug: String): String =
    slug.split(Regex("[-_]+"))
        .filter { it.isNotEmpty() }
        .joinToString(" ") { word ->
            word.replaceFirstChar { it.uppercase() }
        }
