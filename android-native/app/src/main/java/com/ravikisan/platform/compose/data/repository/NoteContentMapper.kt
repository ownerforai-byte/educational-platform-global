package com.ravikisan.platform.compose.data.repository

/**
 * Maps raw r-notes content (`GET /api/r-notes/:id` → `notes: [html strings]`,
 * where a block starting with `<h1>` marks a section heading) into plain
 * reader sections.
 *
 * v1 rendering strips tags — rich HTML/math rendering is a later reader
 * milestone (Agent 4 schedules it with the Supervisor). Pure + JVM-testable.
 */
object NoteContentMapper {

    data class Section(val heading: String, val paragraphs: List<String>)

    data class ReaderContent(val title: String, val intro: String, val sections: List<Section>)

    fun map(note: com.ravikisan.platform.compose.core.contract.RNoteItemDto): ReaderContent {
        data class Builder(val heading: String, val paragraphs: MutableList<String>)

        val groups = mutableListOf<Builder>()
        var current = Builder("", mutableListOf())
        for (raw in note.notes) {
            val text = stripTags(raw)
            if (text.isEmpty()) continue
            if (raw.trim().lowercase().startsWith("<h1")) {
                groups += current
                current = Builder(text, mutableListOf())
            } else {
                current.paragraphs += text
            }
        }
        groups += current

        val intro = groups.firstOrNull { it.heading.isEmpty() }
            ?.paragraphs?.joinToString("\n\n") ?: ""
        val body = groups.filter { it.heading.isNotEmpty() && it.paragraphs.isNotEmpty() }
            .map { Section(it.heading, it.paragraphs.toList()) }
        return ReaderContent(
            title = note.title,
            intro = intro.ifBlank { note.chapter.replaceFirstChar { it.uppercase() } },
            sections = body,
        )
    }

    /** Remove HTML tags and collapse whitespace; entities like α/⁴ are already unicode. */
    fun stripTags(html: String): String = html
        .replace(Regex("<[^>]*>"), " ")
        .replace(Regex("\\s+"), " ")
        .trim()
}
