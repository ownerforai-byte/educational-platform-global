package com.ravikisan.platform.compose.ui.screens.mynotes

import com.ravikisan.platform.compose.core.logic.PersonalNote
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/**
 * Notes <-> raw JSON glue (Agent 4 feature model). Reading is the
 * golden-tested `PersonalNotes.kt` (`normalizeNotes`); this file is the WRITE
 * side: serialize the list back to the exact array-of-objects shape
 * `personal-notes/index.ts` stores (id, title, body, quote, subjectKey,
 * createdAt, updatedAt — all plain strings, newest first by updatedAt).
 */

fun encodeNotes(notes: List<PersonalNote>): String {
    val array = JsonArray(
        notes.map { note ->
            buildJsonObject {
                put("id", note.id)
                put("title", note.title)
                put("body", note.body)
                put("quote", note.quote)
                put("subjectKey", note.subjectKey)
                put("createdAt", note.createdAt)
                put("updatedAt", note.updatedAt)
            }
        },
    )
    return array.toString()
}

/** Junk-tolerant read through the golden-tested normalizer. */
fun decodeNotes(raw: String?): List<PersonalNote> {
    if (raw.isNullOrBlank()) return emptyList()
    return try {
        com.ravikisan.platform.compose.core.logic.normalizeNotes(Json.parseToJsonElement(raw))
    } catch (_: Exception) {
        emptyList()
    }
}

/** New note ids — same shape the website uses (`n-<base36 now>-<index>`). */
internal fun newNoteId(nowMs: Long, existingCount: Int): String =
    "n-${nowMs.toString(36)}-$existingCount"
