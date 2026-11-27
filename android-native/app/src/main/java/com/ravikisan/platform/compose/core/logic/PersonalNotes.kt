package com.ravikisan.platform.compose.core.logic

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonPrimitive

/**
 * Personal notes and annotations: the student's OWN writing, kept apart from
 * the curriculum corpus. An annotation is a note with an optional `quote` (the
 * curriculum passage being commented on).
 *
 * Kotlin port of `frontend/features/personal-notes/index.ts` (parity plan
 * §0.5 #7, Wave 1) — pure rules only; the TS reads/writes localStorage, which
 * on Android becomes the device-local Room store owned by the repository
 * layer. Rule-for-rule identical, golden-tested against the real TS.
 */
const val MY_NOTES_KEY = "neb-my-notes:v1"
const val MAX_NOTE_TITLE = 120
const val MAX_NOTE_BODY = 5000
const val MAX_NOTE_QUOTE = 600

data class PersonalNote(
    val id: String,
    val title: String,
    val body: String,
    /** Curriculum passage this note annotates (empty for a free note). */
    val quote: String,
    /** `classSlug/subjectSlug` or "" when not tied to a subject. */
    val subjectKey: String,
    val createdAt: String,
    val updatedAt: String,
)

data class NoteDraft(
    val title: String = "",
    val body: String = "",
    val quote: String = "",
    val subjectKey: String = "",
)

val EMPTY_DRAFT = NoteDraft()

/** Null when valid, otherwise a user-facing message (TS strings verbatim). */
fun validateNote(draft: NoteDraft): String? {
    if (draft.title.trim().isEmpty()) return "Give the note a title."
    if (draft.title.trim().length > MAX_NOTE_TITLE) return "Title must be $MAX_NOTE_TITLE characters or fewer."
    if (draft.body.trim().isEmpty() && draft.quote.trim().isEmpty()) return "Write something in the note."
    if (draft.body.length > MAX_NOTE_BODY) return "Note must be $MAX_NOTE_BODY characters or fewer."
    if (draft.quote.length > MAX_NOTE_QUOTE) return "Quoted passage must be $MAX_NOTE_QUOTE characters or fewer."
    return null
}

/** Pure: add a note from a valid draft. `id` and `now` are injected for testability. */
fun addNote(notes: List<PersonalNote>, draft: NoteDraft, id: String, now: String): List<PersonalNote> {
    val note = PersonalNote(
        id = id,
        title = draft.title.trim(),
        body = draft.body.trim(),
        quote = draft.quote.trim(),
        subjectKey = draft.subjectKey,
        createdAt = now,
        updatedAt = now,
    )
    return listOf(note) + notes
}

fun updateNote(notes: List<PersonalNote>, id: String, draft: NoteDraft, now: String): List<PersonalNote> =
    notes.map { n ->
        if (n.id == id) {
            n.copy(
                title = draft.title.trim(),
                body = draft.body.trim(),
                quote = draft.quote.trim(),
                subjectKey = draft.subjectKey,
                updatedAt = now,
            )
        } else {
            n
        }
    }

fun removeNote(notes: List<PersonalNote>, id: String): List<PersonalNote> =
    notes.filterNot { it.id == id }

/** Newest edit first; optional subject filter and case-insensitive text search. */
fun filterNotes(notes: List<PersonalNote>, query: String, subjectKey: String): List<PersonalNote> {
    val q = query.trim().lowercase()
    return notes
        .filter { subjectKey.isEmpty() || it.subjectKey == subjectKey }
        .filter { q.isEmpty() || "${it.title} ${it.body} ${it.quote}".lowercase().contains(q) }
        .sortedWith(compareByDescending { it.updatedAt })
}

private fun isNote(v: JsonElement?): Boolean {
    val o = v as? JsonObject ?: return false
    return listOf("id", "title", "body", "quote", "subjectKey", "createdAt", "updatedAt").all { key ->
        (o[key] as? JsonPrimitive)?.isString == true
    }
}

private fun JsonElement.toNote(): PersonalNote {
    val o = this as JsonObject
    return PersonalNote(
        id = o["id"]!!.jsonPrimitive.content,
        title = o["title"]!!.jsonPrimitive.content,
        body = o["body"]!!.jsonPrimitive.content,
        quote = o["quote"]!!.jsonPrimitive.content,
        subjectKey = o["subjectKey"]!!.jsonPrimitive.content,
        createdAt = o["createdAt"]!!.jsonPrimitive.content,
        updatedAt = o["updatedAt"]!!.jsonPrimitive.content,
    )
}

/** Junk-tolerant: non-arrays and malformed entries are dropped (TS isNote filter). */
fun normalizeNotes(input: JsonElement?): List<PersonalNote> {
    val arr = input as? JsonArray ?: return emptyList()
    return arr.filter(::isNote).map { it.toNote() }
}
