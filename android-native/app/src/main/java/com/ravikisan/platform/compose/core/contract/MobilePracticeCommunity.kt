package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable

/**
 * Wire DTOs for the mobile practice + community endpoints — pinned to
 * `backend/src/api/contracts/public-schemas.ts` (mobilePracticeResponseSchema,
 * mobileCommunityResponseSchema) and the exam-detail shape served by
 * `GET /api/practice/exams/:slug` (`{ slug, title, durationMin, questions[] }`).
 *
 * Envelopes mirror the shared /api/mobile convention: `{ ok, data: { items, nextCursor } }`.
 * (`CursorPageDto` in MobileNotes.kt is note-typed, so these carry their own
 * item lists instead of forcing a generic retrofit of that type.)
 */

// ── GET /api/mobile/practice (exam catalog, cursor-paginated) ──────────────

@Serializable
data class MobilePracticeResponse(
    val ok: Boolean? = null,
    val data: MobilePracticePageDto? = null,
)

@Serializable
data class MobilePracticePageDto(
    val items: List<MobilePracticeSetDto> = emptyList(),
    val nextCursor: String? = null,
)

@Serializable
data class MobilePracticeSetDto(
    val slug: String,
    val title: String? = null,
    val durationMin: Int = 0,
    val questionCount: Int = 0,
)

// ── GET /api/practice/exams/:slug (full exam with questions) ───────────────

@Serializable
data class ExamDto(
    val slug: String,
    val title: String? = null,
    val durationMin: Int = 0,
    val questions: List<ExamQuestionDto> = emptyList(),
)

@Serializable
data class ExamQuestionDto(
    val id: String,
    val prompt: String? = null,
    val options: List<String> = emptyList(),
    val correctIndex: Int = 0,
    val explanation: String? = null,
)

// ── GET /api/mobile/community (public feed, cursor-paginated) ──────────────

@Serializable
data class MobileCommunityResponse(
    val ok: Boolean? = null,
    val data: MobileCommunityPageDto? = null,
)

@Serializable
data class MobileCommunityPageDto(
    val items: List<MobileCommunityPostDto> = emptyList(),
    val nextCursor: String? = null,
)

@Serializable
data class MobileCommunityPostDto(
    val id: String,
    val authorId: String? = null,
    val title: String? = null,
    val body: String? = null,
    val category: String? = null,
    val kind: String? = null,
    val createdAt: String? = null,
)
