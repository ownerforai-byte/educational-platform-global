package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable

/**
 * Wire DTOs for `GET /api/progress` (the signed-in student's journey), pinned
 * to `backend/src/services/user.service.ts::JourneyDto` inside the shared
 * `sendSuccess` envelope `{ ok: true, data: JourneyRowDto[] }`.
 *
 * The route is auth-gated (`requireAuth`); the call carries the session
 * Bearer token explicitly (`@Header` on `RnApi` — no shared auth interceptor
 * exists yet). The website's planner uses the same rows through
 * `frontend/lib/api/progress.ts::getJourney`.
 */
@Serializable
data class JourneyRowsResponse(
    val ok: Boolean? = null,
    val data: List<JourneyRowDto> = emptyList(),
)

@Serializable
data class JourneyRowDto(
    val id: String,
    val classSlug: String,
    val subjectSlug: String,
    val unitSlug: String,
    val topicSlug: String,
    /** `started` | `completed` (the server never downgrades a completed topic). */
    val status: String,
    val startedAt: String? = null,
    val lastViewedAt: String? = null,
    val viewCount: Int = 0,
    val completedAt: String? = null,
    val updatedAt: String? = null,
)
