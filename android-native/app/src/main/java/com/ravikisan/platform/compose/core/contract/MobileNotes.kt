package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable

/**
 * Wire DTOs for the notes chain — pinned to:
 * - `GET /api/mobile/notes` → `mobileNotesResponseSchema`:
 *   `{ ok: true, data: { items: [{id, subject, chapter, title, noteCount}], nextCursor: string|null } }`
 *   (shared cursor-pagination envelope; `nextCursor: null` = end of list).
 * - `GET /api/r-notes/:id` → `sendSuccess` envelope over the manifest item:
 *   `{ ok: true, data: { id, subject, chapter, title, notes: [html strings] } }`
 *   — `notes` entries are HTML blocks; `<h1>` marks section headings.
 */
@Serializable
data class MobileNotesResponse(
    val ok: Boolean? = null,
    val data: CursorPageDto? = null,
)

@Serializable
data class CursorPageDto(
    val items: List<MobileNoteItemDto> = emptyList(),
    val nextCursor: String? = null,
)

@Serializable
data class MobileNoteItemDto(
    val id: String,
    val subject: String,
    val chapter: String,
    val title: String,
    val noteCount: Int,
)

@Serializable
data class RNoteResponse(
    val ok: Boolean? = null,
    val data: RNoteItemDto? = null,
)

@Serializable
data class RNoteItemDto(
    val id: String,
    val subject: String,
    val chapter: String,
    val title: String,
    val notes: List<String> = emptyList(),
)
