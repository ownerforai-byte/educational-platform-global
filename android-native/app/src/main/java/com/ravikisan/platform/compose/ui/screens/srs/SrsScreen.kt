package com.ravikisan.platform.compose.ui.screens.srs

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
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
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import java.time.LocalDate

/**
 * /srs — Spaced Repetition (`SrsView`, parity plan §2 P3): SM-2 flashcards
 * from concept notes + past questions. Review state stays on this device.
 * Same flow as the website: subject select → card front → reveal → grade
 * (Again/Hard/Good/Easy) with due/new/deck counts, and the same honest empty
 * state when no cards are indexed for the subject yet.
 */
@Composable
fun SrsScreen(
    viewModel: SrsViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()
    val today = remember { LocalDate.now() }

    Column(
        Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.Layers, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                Spacer(Modifier.padding(horizontal = 4.dp))
                Text("Spaced repetition", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            }
            Text(
                "Cards come from concept notes and past questions. Review state stays on this device.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        // Subject picker (chosen-first, website SubjectSelect semantics)
        SubjectSelectRow(state, onPick = { viewModel.pickSubject(it, today) })

        when {
            state.loadingCards -> Row(verticalAlignment = Alignment.CenterVertically) {
                CircularProgressIndicator(Modifier.padding(end = 8.dp))
                Text("Loading cards…", style = MaterialTheme.typography.bodySmall)
            }
            state.bankUnavailable || state.deckSize == 0 -> EmptyDeckCard()
            else -> DeckCard(state, onReveal = viewModel::reveal, onGrade = { q -> viewModel.grade(q, today) })
        }
    }
}

@Composable
private fun SubjectSelectRow(state: SrsUiState, onPick: (String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    val selectedName = state.subjects.firstOrNull { it.key == state.subjectKey }
        ?.let { "${it.subjectName} (${it.className})" }
        ?: state.subjectKey.ifEmpty { "No subjects" }
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Subject", style = MaterialTheme.typography.labelMedium)
        OutlinedButton(onClick = { expanded = true }) { Text(selectedName) }
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            state.subjects.forEach { subject ->
                DropdownMenuItem(
                    text = { Text("${subject.subjectName} (${subject.className})") },
                    onClick = {
                        onPick(subject.key)
                        expanded = false
                    },
                )
            }
        }
    }
}

@Composable
private fun EmptyDeckCard() {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
        Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Cards for this subject", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
            Text(
                "No concept notes or past questions are indexed for this subject yet. Cards appear here as the pyq-bank grows.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

@Composable
private fun DeckCard(state: SrsUiState, onReveal: () -> Unit, onGrade: (Int) -> Unit) {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(
                state.current?.let { c ->
                    when (c.kind) {
                        "concept" -> "Concept"
                        "pyq" -> "Past question"
                        else -> "Drill"
                    }
                } ?: "All done",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold,
            )
            Text(
                "${state.dueCount} due, ${state.freshCount} new today, ${state.deckSize} cards in deck",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            val current = state.current
            if (current != null) {
                Text(current.front, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Medium)
                if (state.revealed) {
                    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                        Text(
                            current.back,
                            Modifier
                                .fillMaxWidth()
                                .padding(12.dp),
                            style = MaterialTheme.typography.bodySmall,
                        )
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        listOf(1 to "Again", 3 to "Hard", 4 to "Good", 5 to "Easy").forEach { (q, label) ->
                            OutlinedButton(onClick = { onGrade(q) }) { Text(label) }
                        }
                    }
                } else {
                    Button(onClick = onReveal) { Text("Show answer") }
                }
            } else {
                Text(
                    "Nothing due. Come back tomorrow.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}
