package com.ravikisan.platform.compose.core.logic

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * Golden vectors from the REAL website TypeScript
 * (`frontend/features/personal-notes/index.ts`, executed by
 * `android-native/golden/generate-golden.ts`). The Kotlin port must
 * reproduce these outputs exactly — parity plan §5.
 */
class PersonalNotesGoldenTest {

    private fun golden() = Golden.obj("personal-notes-golden.json")

    private fun JsonObject.toDraft() = NoteDraft(
        title = str("title"),
        body = str("body"),
        quote = str("quote"),
        subjectKey = str("subjectKey"),
    )

    private fun JsonObject.toNote() = PersonalNote(
        id = str("id"),
        title = str("title"),
        body = str("body"),
        quote = str("quote"),
        subjectKey = str("subjectKey"),
        createdAt = str("createdAt"),
        updatedAt = str("updatedAt"),
    )

    private fun JsonObject.toNotes() = arr("seed").jsonArray.map { it.jsonObject.toNote() }

    @Test
    fun `validateNote matches TS messages`() {
        val cases = golden().obj("validate")
        assertNull(validateNote(cases.obj("valid").obj("draft").toDraft()))
        assertEquals("Give the note a title.", cases.obj("emptyTitle").str("expected"))
        assertEquals("Title must be 120 characters or fewer.", cases.obj("longTitle").str("expected"))
        assertEquals("Write something in the note.", cases.obj("emptyBodyAndQuote").str("expected"))
        assertEquals("Note must be 5000 characters or fewer.", cases.obj("longBody").str("expected"))
        assertEquals("Quoted passage must be 600 characters or fewer.", cases.obj("longQuote").str("expected"))
    }

    @Test
    fun `addNote prepends trimmed note`() {
        val c = golden().obj("addNote")
        val result = addNote(c.toNotes(), c.obj("draft").toDraft(), c.str("id"), c.str("now"))
        val expected = c.arr("expected").jsonArray.map { it.jsonObject.toNote() }
        assertEquals(expected, result)
    }

    @Test
    fun `updateNote rewrites only the target`() {
        val c = golden().obj("updateNote")
        val result = updateNote(c.toNotes(), c.str("id"), c.obj("draft").toDraft(), c.str("now"))
        val expected = c.arr("expected").jsonArray.map { it.jsonObject.toNote() }
        assertEquals(expected, result)
    }

    @Test
    fun `removeNote drops only the target`() {
        val c = golden().obj("removeNote")
        val result = removeNote(c.toNotes(), c.str("id"))
        val expected = c.arr("expected").jsonArray.map { it.jsonObject.toNote() }
        assertEquals(expected, result)
    }

    @Test
    fun `filterNotes matches TS filtering and ordering`() {
        val cases = golden().obj("filterNotes")
        for (key in listOf("bySubject", "byQuery", "byQueryBody", "noMatch")) {
            val c = cases.obj(key)
            val result = filterNotes(c.toNotes(), c.str("query"), c.str("subjectKey"))
            val expected = c.arr("expected").jsonArray.map { it.jsonObject.toNote() }
            assertEquals(key, expected, result)
        }
    }

    @Test
    fun `normalizeNotes drops junk exactly like the TS isNote filter`() {
        val c = golden().obj("normalizeNotes")
        val result = normalizeNotes(c["input"])
        val expected = c.arr("expected").jsonArray.map { it.jsonObject.toNote() }
        assertEquals(expected, result)
    }
}
