package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable

/**
 * Wire DTOs for `GET /api/mobile/syllabus` — pinned to
 * `backend/src/api/contracts/public-schemas.ts::mobileSyllabusResponseSchema`:
 * `{ ok: true, data: { classes: [{ id, slug, name, subjects: [{ id, slug, name }] }] } }`.
 * Chapters/topics/units are NOT in this payload (they stay on per-subject routes
 * until Agent 2's units endpoint lands).
 */
@Serializable
data class MobileSyllabusResponse(
    val ok: Boolean? = null,
    val data: MobileSyllabusData? = null,
)

@Serializable
data class MobileSyllabusData(
    val classes: List<MobileClassDto> = emptyList(),
)

@Serializable
data class MobileClassDto(
    val id: String,
    val slug: String,
    val name: String,
    val subjects: List<MobileSubjectDto> = emptyList(),
)

@Serializable
data class MobileSubjectDto(
    val id: String,
    val slug: String,
    val name: String,
)
