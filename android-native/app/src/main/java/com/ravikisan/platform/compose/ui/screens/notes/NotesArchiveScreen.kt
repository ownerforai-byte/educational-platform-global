package com.ravikisan.platform.compose.ui.screens.notes

import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ravikisan.platform.compose.ui.components.reader.NoteReader
import com.ravikisan.platform.compose.ui.components.reader.NoteSection

/**
 * `/notes` — the searchable notes archive, native counterpart of the website
 * page: banner, practical-lab cross-link, one search box, subject chips and
 * the grouped results, each row opening the note reader (`/notes/view`).
 * Matching the web means: 30 rows per subject then a "more notes" hint, the
 * "No notes match your search" card, and the query result counter.
 */
@Composable
fun NotesArchiveScreen(
    onOpenPractical: () -> Unit = {},
    modifier: Modifier = Modifier,
    viewModel: NotesArchiveViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()

    LaunchedEffect(Unit) { viewModel.load() }

    val reader = state.reader
    when {
        reader != null -> NoteReaderPane(reader = reader, onBack = viewModel::closeNote)
        else -> ArchiveList(
            state = state,
            onQueryChanged = viewModel::onQueryChanged,
            onSubjectSelected = viewModel::onSubjectSelected,
            onOpenNote = viewModel::openNote,
            onLoadMore = viewModel::loadMore,
            onOpenPractical = onOpenPractical,
            onRetry = viewModel::load,
            modifier = modifier,
        )
    }
}

@Composable
private fun NoteReaderPane(reader: ArchiveReader, onBack: () -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
    ) {
        item {
            Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = onBack) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back to notes")
                }
                Column(Modifier.weight(1f)) {
                    Text(reader.title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                    Text(
                        buildString {
                            append(reader.sections.size)
                            append(" sections · imported note")
                            if (reader.fromCache) append(" · offline copy")
                        },
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
            Spacer(Modifier.height(12.dp))
        }
        item {
            NoteReader(
                title = reader.title,
                intro = reader.intro,
                sections = reader.sections.map { NoteSection(it.heading, it.paragraphs) },
            )
        }
    }
}

@Composable
private fun ArchiveList(
    state: NotesArchiveUiState,
    onQueryChanged: (String) -> Unit,
    onSubjectSelected: (String?) -> Unit,
    onOpenNote: (String) -> Unit,
    onLoadMore: () -> Unit,
    onOpenPractical: () -> Unit,
    onRetry: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val groups = state.groups

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Column {
                Text(
                    "📚 Notes",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    "One searchable archive for imported notes. Each result opens its note, with no repeated source sections below.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            ) {
                Column(Modifier.padding(16.dp)) {
                    Text(
                        "Hands-on science practicals & viva voce",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                    )
                    Spacer(Modifier.height(4.dp))
                    Text(
                        "Physics, Chemistry or Biology experiment manuals with viva questions.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    Spacer(Modifier.height(8.dp))
                    Button(onClick = onOpenPractical) { Text("Open practical hub") }
                }
            }
        }

        item {
            OutlinedTextField(
                value = state.query,
                onValueChange = onQueryChanged,
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                label = { Text("Search notes by title, subject, or unit…") },
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                keyboardActions = KeyboardActions(onSearch = { }),
            )
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                FilterChip(
                    label = "All Subjects",
                    selected = state.activeSubject == null,
                    onClick = { onSubjectSelected(null) },
                )
                if (state.query.isNotBlank()) {
                    Text(
                        "${state.resultCount} result${if (state.resultCount == 1) "" else "s"}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 10.dp),
                    )
                }
            }
        }

        if (state.subjectChips.isNotEmpty()) {
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    state.subjectChips.chunked(3).forEach { row ->
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            row.forEach { (subject, count) ->
                                FilterChip(
                                    label = "${subject.replaceFirstChar { it.uppercase() }} ($count)",
                                    selected = state.activeSubject == subject,
                                    onClick = {
                                        onSubjectSelected(if (state.activeSubject == subject) null else subject)
                                    },
                                )
                            }
                        }
                    }
                }
            }
        }

        state.error?.let { message ->
            item {
                Column {
                    Text(message, style = MaterialTheme.typography.titleSmall, color = MaterialTheme.colorScheme.error)
                    TextButton(onClick = onRetry) { Text("Retry") }
                }
            }
        }

        if (state.loading) {
            item { Text("Loading notes…", style = MaterialTheme.typography.bodyMedium) }
        }

        if (state.fromCache) {
            item {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        Icons.Filled.CloudOff,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.height(16.dp),
                    )
                    Text(
                        "  Offline — showing saved archive",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        }

        if (!state.loading && groups.isEmpty()) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                ) {
                    Text(
                        if (state.query.isNotBlank() || state.activeSubject != null) {
                            "No notes match your search. Try another keyword or subject filter."
                        } else {
                            "No imported notes are indexed yet."
                        },
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(24.dp),
                    )
                }
            }
        }

        groups.forEach { group ->
            item(key = "subject:${group.subject}") {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        group.subject.replaceFirstChar { it.uppercase() },
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                    )
                    Text(
                        "  (${group.notes.size} note${if (group.notes.size == 1) "" else "s"})",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
            items(group.notes, key = { "note:${it.id}" }) { note ->
                NoteCard(note = note, onClick = { onOpenNote(note.id) })
            }
            if (group.hidden > 0) {
                item {
                    Text(
                        "+ ${group.hidden} more notes in ${group.subject}. Refine your search to see specific topics.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        }

        if (!state.endReached) {
            item {
                if (state.loadingMore) {
                    Text("Loading more notes…", style = MaterialTheme.typography.bodySmall)
                } else {
                    TextButton(onClick = onLoadMore) { Text("Load more notes") }
                }
            }
        }
    }
}

@Composable
private fun FilterChip(label: String, selected: Boolean, onClick: () -> Unit) {
    AssistChip(
        onClick = onClick,
        label = { Text(label) },
        colors = AssistChipDefaults.assistChipColors(
            containerColor = if (selected) {
                MaterialTheme.colorScheme.primary.copy(alpha = 0.12f)
            } else {
                MaterialTheme.colorScheme.surface
            },
            labelColor = if (selected) {
                MaterialTheme.colorScheme.primary
            } else {
                MaterialTheme.colorScheme.onSurfaceVariant
            },
        ),
    )
}

@Composable
private fun NoteCard(note: ArchiveNote, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Column(Modifier.padding(14.dp)) {
            Text(note.title, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.SemiBold)
            Text(
                "Unit: ${note.chapter}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Spacer(Modifier.height(6.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                Text(
                    "Read →",
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.primary,
                )
            }
        }
    }
}
