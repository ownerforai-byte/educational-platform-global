package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.RNoteItemDto
import com.ravikisan.platform.compose.data.repository.NoteContentMapper
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * JVM tests for mapping raw r-notes HTML blocks (`<h1>` = section heading)
 * into plain reader sections for the note reader swap.
 */
class NoteContentMapperTest {

    private fun note(vararg blocks: String) = RNoteItemDto(
        id = "n1",
        subject = "physics",
        chapter = "Vectors",
        title = "Vectors",
        notes = blocks.toList(),
    )

    @Test
    fun `h1 blocks start new sections, paragraphs accumulate`() {
        val content = NoteContentMapper.map(
            note(
                "<p>Intro text.</p>",
                "<h1>1. Laws</h1>",
                "<p>Triangle law.</p>",
                "<p>Polygon law.</p>",
                "<h1>2. Products</h1>",
                "<p>Dot product.</p>",
            ),
        )
        assertEquals("Intro text.", content.intro)
        assertEquals(2, content.sections.size)
        assertEquals("1. Laws", content.sections[0].heading)
        assertEquals(listOf("Triangle law.", "Polygon law."), content.sections[0].paragraphs)
        assertEquals("2. Products", content.sections[1].heading)
    }

    @Test
    fun `tags are stripped and whitespace collapsed`() {
        val content = NoteContentMapper.map(note("<p>  A   <b>bold</b>  sentence. </p>"))
        assertEquals("A bold sentence.", content.intro)
    }

    @Test
    fun `empty content yields empty sections and chapter-name intro without crashing`() {
        val content = NoteContentMapper.map(note())
        assertEquals("Vectors", content.intro) // designed fallback: chapter name
        assertTrue(content.sections.isEmpty())
    }

    @Test
    fun `content with no headings falls back to chapter name as intro`() {
        val content = NoteContentMapper.map(note("<p>Only a paragraph.</p>"))
        assertEquals("Only a paragraph.", content.intro)
        assertTrue(content.sections.isEmpty())
    }

    @Test
    fun `unicode entities survive stripping`() {
        val content = NoteContentMapper.map(note("<p>Charge 2+, mass 4 amu — α particle.</p>"))
        assertEquals("Charge 2+, mass 4 amu — α particle.", content.intro)
    }
}
