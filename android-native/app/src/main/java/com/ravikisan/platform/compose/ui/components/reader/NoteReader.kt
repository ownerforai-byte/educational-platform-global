package com.ravikisan.platform.compose.ui.components.reader

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

/** One reader section: a heading plus its paragraphs, in curriculum order. */
data class NoteSection(
    val heading: String,
    val paragraphs: List<String>,
)

/**
 * Note reader v1 — plain-text sections only. Math/LaTeX rendering and media
 * are later reader milestones (migration plan §5). Pure presentational
 * component: content comes in, no data source of its own, so it can be reused
 * by the study screen, search results and AI answers.
 */
@Composable
fun NoteReader(
    title: String,
    intro: String?,
    sections: List<NoteSection>,
    modifier: Modifier = Modifier,
) {
    Column(modifier = modifier.fillMaxWidth()) {
        Text(title, style = MaterialTheme.typography.headlineSmall)
        if (!intro.isNullOrBlank()) {
            Spacer(Modifier.height(8.dp))
            Text(intro, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        Spacer(Modifier.height(16.dp))
        sections.forEach { section ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
            ) {
                Column(Modifier.padding(16.dp)) {
                    Text(
                        section.heading,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                    )
                    Spacer(Modifier.height(8.dp))
                    section.paragraphs.forEachIndexed { index, paragraph ->
                        if (index > 0) Spacer(Modifier.height(8.dp))
                        Text(paragraph, style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }
        }
    }
}
