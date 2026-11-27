package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable

/**
 * Wire DTOs for `GET /api/mobile/home` — the one cheap bootstrap call the app
 * makes on cold start (pinned to
 * `backend/src/api/mobile/index.ts`): which features are live at this API
 * version and which existing API routes back them.
 */
@Serializable
data class MobileHomeResponse(
    val ok: Boolean? = null,
    val data: MobileHomeData? = null,
)

@Serializable
data class MobileHomeData(
    val apiVersion: String? = null,
    val features: MobileHomeFeatures? = null,
    val links: Map<String, String> = emptyMap(),
)

@Serializable
data class MobileHomeFeatures(
    val syllabus: Boolean = false,
    val notes: Boolean = false,
    val practice: Boolean = false,
    val aiChat: Boolean = false,
    val community: Boolean = false,
)
