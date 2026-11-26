package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable

/**
 * Wire DTOs for `GET /api/mobile/units?subject=<slug>` — pinned to
 * `backend/src/api/contracts/public-schemas.ts::mobileUnitsResponseSchema`:
 * `{ ok: true, data: { subject: {id,slug,name}, units: [{id, slug, title, order, topicCount}] } }`.
 * Units are the official NEB chapters in curriculum `order` — never reorder.
 * Topic NAMES are not in this payload (only `topicCount`).
 */
@Serializable
data class MobileUnitsResponse(
    val ok: Boolean? = null,
    val data: MobileUnitsData? = null,
)

@Serializable
data class MobileUnitsData(
    val subject: MobileSubjectRefDto? = null,
    val units: List<MobileUnitDto> = emptyList(),
)

@Serializable
data class MobileSubjectRefDto(
    val id: String,
    val slug: String,
    val name: String,
)

@Serializable
data class MobileUnitDto(
    val id: String,
    val slug: String,
    val title: String,
    val order: Int,
    val topicCount: Int,
)
