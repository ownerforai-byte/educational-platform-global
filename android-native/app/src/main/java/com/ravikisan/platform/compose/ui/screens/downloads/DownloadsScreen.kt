package com.ravikisan.platform.compose.ui.screens.downloads

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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
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
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ravikisan.platform.compose.ui.screens.downloads.local.StoredPack
import java.time.format.DateTimeFormatter

/**
 * /downloads — Offline Study (`DownloadsView`, parity plan §2 P5 row — device
 * local, no backend write): save unit packs to the device so they open inside
 * the app with no internet connection. NO file downloads, exactly like the
 * website. Subject + unit pickers, pack preview with counts, save/update,
 * saved-pack list with Read/Remove, and an inline plain-text reader.
 */
@Composable
fun DownloadsScreen(
    viewModel: DownloadsViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()
    var reading by remember { mutableStateOf<StoredPack?>(null) }

    reading?.let { pack ->
        PackReader(pack = pack, onClose = { reading = null })
        return
    }

    Column(
        Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.CloudOff, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                Spacer(Modifier.padding(horizontal = 4.dp))
                Text("Offline Study", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            }
            Text(
                "Save units to your device. Once saved, they open inside the app without any internet connection.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        // Offline badge — content is stored on-device, readable with no signal.
        Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
            Text(
                "Content is stored on your device — readable with no signal.",
                Modifier.padding(horizontal = 12.dp, vertical = 10.dp),
                style = MaterialTheme.typography.bodySmall,
                fontWeight = FontWeight.Medium,
                color = MaterialTheme.colorScheme.primary,
            )
        }

        SubjectUnitPickers(state, viewModel)

        when {
            state.unitsError != null -> EmptyCard(state.unitsError ?: "")
            state.loadingPack -> Row(verticalAlignment = Alignment.CenterVertically) {
                CircularProgressIndicator(Modifier.padding(end = 8.dp))
                Text("Preparing pack…", style = MaterialTheme.typography.bodySmall)
            }
            state.packUnavailable || state.packCount == 0 -> EmptyCard(
                "No notes, past questions, drills or formulas are indexed for this unit yet.",
            )
            state.pack != null -> PackPreviewCard(state, viewModel)
        }

        // Saved packs
        if (state.savedPacks.isNotEmpty()) {
            Text(
                "SAVED PACKS (${state.savedPacks.size})",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            state.savedPacks.forEach { saved ->
                SavedPackRow(
                    saved = saved,
                    onRead = { reading = saved },
                    onRemove = { viewModel.removePack(saved.id) },
                )
            }
        } else {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            ) {
                Text(
                    "No units saved yet. Pick a unit above and tap “Save for offline”.",
                    Modifier.padding(20.dp),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}

@Composable
private fun SubjectUnitPickers(state: DownloadsUiState, viewModel: DownloadsViewModel) {
    var subjectExpanded by remember { mutableStateOf(false) }
    var unitExpanded by remember { mutableStateOf(false) }
    val subjectName = state.subjects.firstOrNull { it.key == state.subjectKey }
        ?.let { "${it.subjectName} (${it.className})" } ?: state.subjectKey.ifEmpty { "No subjects" }
    val activeUnit = state.units.firstOrNull { it.id == state.activeUnitId }
    Row(
        Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text("Subject", style = MaterialTheme.typography.labelMedium)
        OutlinedButton(onClick = { subjectExpanded = true }) { Text(subjectName, maxLines = 1) }
        DropdownMenu(expanded = subjectExpanded, onDismissRequest = { subjectExpanded = false }) {
            state.subjects.forEach { subject ->
                DropdownMenuItem(
                    text = { Text("${subject.subjectName} (${subject.className})", maxLines = 1) },
                    onClick = {
                        viewModel.pickSubject(subject.key)
                        subjectExpanded = false
                    },
                )
            }
        }
        if (state.units.isNotEmpty()) {
            Text("Unit", style = MaterialTheme.typography.labelMedium)
            OutlinedButton(onClick = { unitExpanded = true }) { Text(activeUnit?.title ?: "Unit", maxLines = 1) }
            DropdownMenu(expanded = unitExpanded, onDismissRequest = { unitExpanded = false }) {
                state.units.forEach { unit ->
                    DropdownMenuItem(
                        text = { Text(unit.title, maxLines = 1) },
                        onClick = {
                            viewModel.pickUnit(unit.id)
                            unitExpanded = false
                        },
                    )
                }
            }
        }
    }
    if (state.unitsFromCache) {
        Text(
            "Offline — showing your saved unit list.",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.primary,
        )
    }
}

@Composable
private fun EmptyCard(message: String) {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
        Text(
            message,
            Modifier.padding(20.dp),
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

@Composable
private fun PackPreviewCard(state: DownloadsUiState, viewModel: DownloadsViewModel) {
    val pack = state.pack ?: return
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(
                Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top,
            ) {
                Column(Modifier.weight(1f)) {
                    Text(pack.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                    Text(
                        "${pack.theory.size} concept notes · ${pack.pyqs.size} exam years · " +
                            "${pack.drills.size} drills · ${pack.formulas.size} formulas",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
                if (state.alreadySaved) {
                    Text(
                        "Saved offline",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.primary,
                        fontWeight = FontWeight.Bold,
                    )
                }
            }
            Button(onClick = {
                viewModel.savePackForOffline(java.time.Instant.now().toString())
            }) {
                Text(
                    when {
                        state.justSaved -> "Saved!"
                        state.alreadySaved -> "Update saved pack"
                        else -> "Save for offline"
                    },
                )
            }
        }
    }
}

@Composable
private fun SavedPackRow(saved: StoredPack, onRead: () -> Unit, onRemove: () -> Unit) {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
        Row(
            Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Column(Modifier.weight(1f)) {
                Text(
                    saved.title,
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 1,
                )
                Text(
                    "Saved ${formatSaved(saved.savedAt)} · ${saved.count} items",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                OutlinedButton(onClick = onRead) {
                    Icon(Icons.Filled.MenuBook, contentDescription = null)
                    Spacer(Modifier.padding(horizontal = 2.dp))
                    Text("Read")
                }
                IconButton(onClick = onRemove) {
                    Icon(
                        Icons.Filled.Delete,
                        contentDescription = "Remove ${saved.title}",
                        tint = MaterialTheme.colorScheme.error,
                    )
                }
            }
        }
    }
}

@Composable
private fun PackReader(pack: StoredPack, onClose: () -> Unit) {
    Column(
        Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Row(
            Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column {
                Text(pack.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                Text(
                    "Saved ${formatSaved(pack.savedAt)} · ${pack.count} items",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            OutlinedButton(onClick = onClose) { Text("← Back") }
        }
        Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
            Text(
                pack.markdown,
                Modifier.padding(12.dp),
                style = MaterialTheme.typography.bodySmall,
                fontFamily = FontFamily.Monospace,
            )
        }
    }
}

private val savedFormat = DateTimeFormatter.ofPattern("MMM d, HH:mm")

private fun formatSaved(iso: String): String = try {
    java.time.Instant.parse(iso).atZone(java.time.ZoneId.systemDefault()).format(savedFormat)
} catch (_: Exception) {
    iso
}
