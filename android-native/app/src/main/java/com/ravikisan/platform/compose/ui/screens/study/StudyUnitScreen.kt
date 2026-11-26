package com.ravikisan.platform.compose.ui.screens.study

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.ravikisan.platform.compose.ui.components.reader.NoteReader
import com.ravikisan.platform.compose.ui.components.reader.NoteSection

/**
 * Study unit screen — note reader host. Route: `study/{unitId}` (Agent 1 wires
 * it; this file never touches RnNavHost).
 *
 * REAL DATA (fake→real swap, study phase 1): [SyllabusScreen] passes
 * `<subjectSlug>:<unitSlug>`; this screen resolves unit metadata from
 * `GET /api/mobile/units?subject=<slug>` and the note body from the real
 * chain `/api/mobile/notes?chapter=<unit title>` → `/api/r-notes/:id`, all
 * offline-tolerant through the Room cache (offline banner when served from
 * cache). Fakes (`local/FakeNotes`) are for unit tests only — never rendered.
 */
@Composable
fun StudyUnitScreen(
    unitId: String,
    viewModel: StudyUnitViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsStateWithLifecycle()

    LaunchedEffect(unitId) { viewModel.load(unitId) }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        item {
            when {
                state.loading -> Text(
                    "Loading unit…",
                    style = MaterialTheme.typography.titleMedium,
                )
                state.error != null -> Column {
                    Text(
                        state.error!!,
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.error,
                    )
                    Spacer(Modifier.height(8.dp))
                    Button(onClick = { viewModel.load(unitId) }) {
                        Text("Retry")
                    }
                }
                state.unit != null -> {
                    val unit = state.unit!!
                    Text(
                        unit.title,
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold,
                    )
                    Text(
                        "${state.subjectSlug} · unit ${unit.order}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    Spacer(Modifier.height(4.dp))
                    UnitHoursChip(hours = null)
                    if (state.fromCache || state.noteFromCache) {
                        Spacer(Modifier.height(4.dp))
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                Icons.Filled.CloudOff,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.height(16.dp),
                            )
                            Spacer(Modifier.height(0.dp))
                            Text(
                                "  Offline — showing saved copy",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
            }
        }
        if (state.error == null && state.unit != null) {
            val unit = state.unit!!
            item {
                Text(
                    "${unit.topicCount} curriculum topics",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                )
            }
            item {
                Text(
                    "Topic names load with the per-topic content contract (see RQ-6).",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            item {
                Text(
                    "Notes",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(top = 8.dp),
                )
            }
            if (state.sections.isEmpty() && !state.loading) {
                item {
                    Text(
                        "No published notes for this unit yet.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            } else {
                item {
                    NoteReader(
                        title = state.noteTitle.ifBlank { unit.title },
                        intro = state.noteIntro,
                        sections = state.sections.map { section ->
                            NoteSection(heading = section.heading, paragraphs = section.paragraphs)
                        },
                    )
                }
            }
        }
    }
}
