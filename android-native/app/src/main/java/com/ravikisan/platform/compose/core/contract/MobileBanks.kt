package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * Wire DTOs for the mobile PYQ + formula-sheet endpoints (Wave 1 bank seams),
 * pinned to `backend/src/api/contracts/public-schemas.ts`:
 *
 * - `GET /api/mobile/pyqs` → `mobilePyqsResponseSchema`:
 *   `{ ok: true, data: { items: [{id, class, subject, unit, year, title, questionCount}], nextCursor } }`
 * - `GET /api/mobile/pyqs/file?path=` → `mobilePyqFileResponseSchema`:
 *   `{ ok: true, data: { path, title, questions: string[] } }`
 * - `GET /api/mobile/formulas` → `mobileFormulasResponseSchema` (same page shape
 *   over `mobileFormulaItemSchema`).
 * - `GET /api/mobile/formulas/file?path=` → `mobileFormulaFileResponseSchema`:
 *   `{ ok: true, data: { path, title, formulas: string[] } }`.
 *
 * Both families are auth-gated (`requireAuth` + `requireTier("plus")` on the
 * backend, mirroring the website's minLevel "plus" for /pyqs and /formulas),
 * so every call carries the session Bearer token explicitly (`@Header` on
 * `RnApi` — the shared OkHttp stack deliberately has no auth interceptor yet).
 */
@Serializable
data class MobilePyqsResponse(
    val ok: Boolean? = null,
    val data: MobilePyqPageDto? = null,
)

@Serializable
data class MobilePyqPageDto(
    val items: List<MobilePyqItemDto> = emptyList(),
    val nextCursor: String? = null,
)

@Serializable
data class MobilePyqItemDto(
    val id: String,
    /** Manifest class directory, e.g. `class-11` (the website key is `class-11-notes`). */
    @SerialName("class") val classDir: String,
    val subject: String,
    val unit: String? = null,
    val year: Int? = null,
    val title: String,
    val questionCount: Int = 0,
)

@Serializable
data class MobilePyqFileResponse(
    val ok: Boolean? = null,
    val data: MobilePyqFileDto? = null,
)

@Serializable
data class MobilePyqFileDto(
    val path: String,
    val title: String = "",
    val questions: List<String> = emptyList(),
)

@Serializable
data class MobileFormulasResponse(
    val ok: Boolean? = null,
    val data: MobileFormulaPageDto? = null,
)

@Serializable
data class MobileFormulaPageDto(
    val items: List<MobileFormulaItemDto> = emptyList(),
    val nextCursor: String? = null,
)

@Serializable
data class MobileFormulaItemDto(
    val id: String,
    @SerialName("class") val classDir: String,
    val subject: String,
    val unit: String,
    val title: String,
    val formulaCount: Int = 0,
)

@Serializable
data class MobileFormulaFileResponse(
    val ok: Boolean? = null,
    val data: MobileFormulaFileDto? = null,
)

@Serializable
data class MobileFormulaFileDto(
    val path: String,
    val title: String = "",
    val formulas: List<String> = emptyList(),
)
