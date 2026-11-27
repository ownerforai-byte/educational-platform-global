package com.ravikisan.platform.compose.ui.screens.mynotes

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ravikisan.platform.compose.core.logic.EMPTY_DRAFT
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.MAX_NOTE_BODY
import com.ravikisan.platform.compose.core.logic.MAX_NOTE_QUOTE
import com.ravikisan.platform.compose.core.logic.PersonalNote
import java.time.format.DateTimeFormatter
import java.util.Locale

/**
 * /my-notes — the student's own notes and annotations (`MyNotesView`, parity
 * plan §2 P2): device-local, apart from the curriculum notes. Same flow as the
 * website — new/edit form with an optional quoted passage, search, subject
 * filter, newest-edit-first cards with edit/delete.
 */
@Composable
fun MyNotesScreen(
    viewModel: MyNotesViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()

    Column(Modifier.fillMaxSize()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.MenuBook, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                Spacer(Modifier.padding(horizontal = 4.dp))
                Text("My notes", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            }
            Text(
                "Your own notes and annotations, separate from the curriculum notes. Saved on this device.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        // New / edit card
        Card(
            Modifier.padding(horizontal = 16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        ) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text(
                    if (state.editingId != null) "Edit note" else "New note",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.SemiBold,
                )
                Text(
                    "Paste a passage into “Annotating” to comment on it.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                OutlinedTextField(
                    value = state.draft.title,
                    onValueChange = { viewModel.onDraftChanged(state.draft.copy(title = it)) },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Title") },
                    singleLine = true,
                )
                SubjectPicker(
                    catalog = state.catalog,
                    selected = state.draft.subjectKey,
                    onSelect = { viewModel.onDraftChanged(state.draft.copy(subjectKey = it)) },
                )
                OutlinedTextField(
                    value = state.draft.quote,
                    onValueChange = {
                        if (it.length <= MAX_NOTE_QUOTE) {
                            viewModel.onDraftChanged(state.draft.copy(quote = it))
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Annotating (optional)") },
                    minLines = 2,
                )
                OutlinedTextField(
                    value = state.draft.body,
                    onValueChange = {
                        if (it.length <= MAX_NOTE_BODY) {
                            viewModel.onDraftChanged(state.draft.copy(body = it))
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Note") },
                    minLines = 4,
                )
                state.error?.let { error ->
                    Text(error, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.error)
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = {
                        val now = java.time.Instant.now()
                        viewModel.saveDraft(
                            nowIso = now.toString(),
                            nowMs = now.toEpochMilli(),
                        )
                    }) {
                        Text(if (state.editingId != null) "Save changes" else "Add note")
                    }
                    if (state.editingId != null) {
                        OutlinedButton(onClick = viewModel::cancelEditing) { Text("Cancel") }
                    }
                }
            }
        }

        Spacer(Modifier.height(12.dp))

        // Search + subject filter
        Row(
            Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            OutlinedTextField(
                value = state.query,
                onValueChange = viewModel::onQueryChanged,
                modifier = Modifier.weight(1f),
                placeholder = { Text("Search notes") },
                singleLine = true,
            )
            Spacer(Modifier.padding(horizontal = 6.dp))
            FilterChip(
                selected = state.subjectFilter.isEmpty(),
                onClick = { viewModel.onSubjectFilterChanged("") },
                label = { Text("All subjects") },
            )
        }

        // Notes list
        if (state.shown.isEmpty()) {
            Text(
                if (state.isEmptyLibrary) {
                    "No notes yet. Add your first one above."
                } else {
                    "No notes match."
                },
                Modifier.padding(16.dp),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        } else {
            LazyColumn(
                contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                items(state.shown, key = { it.id }) { note ->
                    NoteCard(
                        note = note,
                        subjectName = note.subjectKey.takeIf { it.isNotEmpty() }
                            ?.let { viewModel.subjectName(it) },
                        onEdit = { viewModel.startEditing(note) },
                        onDelete = { viewModel.deleteNote(note.id) },
                    )
                }
            }
        }
    }
}

@Composable
private fun SubjectPicker(
    catalog: List<GoalSubject>,
    selected: String,
    onSelect: (String) -> Unit,
) {
    var expanded by remember { mutableStateOf(false) }
    val selectedName = catalog.firstOrNull { it.key == selected }?.let { "${it.subjectName} (${it.className})" }
        ?: "No subject"
    Column {
        OutlinedButton(onClick = { expanded = true }) { Text(selectedName) }
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            DropdownMenuItem(text = { Text("No subject") }, onClick = {
                onSelect("")
                expanded = false
            })
            catalog.forEach { subject ->
                DropdownMenuItem(
                    text = { Text("${subject.subjectName} (${subject.className})", maxLines = 1, overflow = TextOverflow.Ellipsis) },
                    onClick = {
                        onSelect(subject.key)
                        expanded = false
                    },
                )
            }
        }
    }
}

private val editedOn = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH)

@Composable
private fun NoteCard(
    note: PersonalNote,
    subjectName: String?,
    onEdit: () -> Unit,
    onDelete: () -> Unit,
) {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(note.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
            Text(
                "${subjectName ?: "No subject"} · edited ${editedLabel(note.updatedAt)}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            if (note.quote.isNotEmpty()) {
                Text(
                    note.quote,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(start = 8.dp),
                )
            }
            if (note.body.isNotEmpty()) {
                Text(note.body, style = MaterialTheme.typography.bodySmall)
            }
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                IconButton(onClick = onEdit) {
                    Icon(Icons.Filled.Edit, contentDescription = "Edit ${note.title}")
                }
                IconButton(onClick = onDelete) {
                    Icon(
                        Icons.Filled.Delete,
                        contentDescription = "Delete ${note.title}",
                        tint = MaterialTheme.colorScheme.error,
                    )
                }
            }
        }
    }
}

private fun editedLabel(updatedAt: String): String = try {
    java.time.Instant.parse(updatedAt).atZone(java.time.ZoneId.systemDefault()).toLocalDate().format(editedOn)
} catch (_: Exception) {
    updatedAt.take(10)
}
