package com.ravikisan.platform.compose.ui.screens.studyplan

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
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
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ravikisan.platform.compose.core.logic.DAILY_MINUTES_OPTIONS
import com.ravikisan.platform.compose.core.logic.StudyGoals

/**
 * /onboarding — goal setup (`OnboardingView`, parity plan §2 P2). Saved on
 * this device only through the device-local goals store; nothing is invented.
 * The website routes to /dashboard after saving; native lands on `home`
 * (the same student desk) until Worker 1 wires the dashboard route.
 */
@Composable
fun OnboardingScreen(
    onSaved: () -> Unit = {},
    viewModel: GoalsViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()
    val goals = state.goals ?: StudyGoals()
    var draftGoals by remember { mutableStateOf<StudyGoals?>(null) }
    val formGoals = draftGoals ?: goals

    Column(
        Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Set your study goals", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text(
                "Saved on this device only. You can change everything later in Settings.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        OfflineCatalogNotice(state)

        // Subjects card
        Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("Subjects", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                Text(
                    "Pick what you are studying.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                when {
                    state.catalogLoading -> Row(
                        Modifier.padding(vertical = 12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        CircularProgressIndicator(Modifier.height(18.dp))
                        Spacer(Modifier.padding(horizontal = 8.dp))
                        Text("Loading subjects…", style = MaterialTheme.typography.bodySmall)
                    }
                    state.catalog.isEmpty() -> Text(
                        state.catalogError ?: "No subjects available yet.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    else -> LazyVerticalGrid(
                        columns = GridCells.Adaptive(minSize = 180.dp),
                        modifier = Modifier.fillMaxWidth().height(gridHeight(state.catalog.size)),
                        contentPadding = PaddingValues(vertical = 4.dp),
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                    ) {
                        items(state.catalog, key = { it.key }) { subject ->
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Checkbox(
                                    checked = subject.key in formGoals.subjects,
                                    onCheckedChange = { checked ->
                                        draftGoals = formGoals.copy(
                                            subjects = if (checked) (formGoals.subjects + subject.key).distinct()
                                            else formGoals.subjects.filterNot { it == subject.key },
                                        )
                                    },
                                )
                                Text(
                                    "${subject.subjectName} (${subject.className})",
                                    style = MaterialTheme.typography.bodySmall,
                                )
                            }
                        }
                    }
                }
            }
        }

        // Exam date / target / daily time card
        Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                var examDateText by remember(formGoals.examDate) { mutableStateOf(formGoals.examDate ?: "") }
                OutlinedTextField(
                    value = examDateText,
                    onValueChange = {
                        examDateText = it
                        if (isCompleteIsoDate(it)) draftGoals = formGoals.copy(examDate = it.takeIf(String::isNotEmpty))
                    },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Exam date (YYYY-MM-DD)") },
                    singleLine = true,
                )
                OutlinedTextField(
                    value = formGoals.targetPercent?.toString() ?: "",
                    onValueChange = { raw ->
                        val parsed = raw.trim().toIntOrNull()
                        draftGoals = formGoals.copy(targetPercent = parsed?.takeIf { it in 0..100 })
                    },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Target % (0–100)") },
                    singleLine = true,
                )
                Text("Daily study time", style = MaterialTheme.typography.labelMedium)
                MinuteOptions(
                    options = DAILY_MINUTES_OPTIONS,
                    selected = formGoals.dailyMinutes,
                    onSelect = { draftGoals = formGoals.copy(dailyMinutes = it) },
                )
            }
        }

        Button(
            onClick = { viewModel.saveBeforeLeaving(formGoals, onboarded = true, onSaved = onSaved) },
            modifier = Modifier.fillMaxWidth(),
        ) {
            Text("Save and open dashboard")
        }
    }
}

@Composable
internal fun MinuteOptions(options: List<Int>, selected: Int, onSelect: (Int) -> Unit) {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        options.forEach { minutes ->
            val chipLabel = if (minutes < 60) "$minutes min" else "${minutes / 60} hr${if (minutes > 60) "s" else ""}"
            androidx.compose.material3.FilterChip(
                selected = selected == minutes,
                onClick = { onSelect(minutes) },
                label = { Text(chipLabel) },
            )
        }
    }
}

/** Offline/empty catalog honesty, shared by the goals-family screens. */
@Composable
internal fun OfflineCatalogNotice(state: GoalsUiState) {
    when {
        state.catalogError != null -> NoticeCard(
            text = state.catalogError ?: "",
            tone = NoticeTone.Warning,
        )
        state.catalogFromCache -> NoticeCard(
            text = "Offline — showing your saved subject list.",
            tone = NoticeTone.Info,
        )
    }
}

internal enum class NoticeTone { Info, Warning }

@Composable
internal fun NoticeCard(text: String, tone: NoticeTone) {
    val color = when (tone) {
        NoticeTone.Info -> MaterialTheme.colorScheme.primary
        NoticeTone.Warning -> MaterialTheme.colorScheme.error
    }
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
        Text(
            text,
            Modifier.padding(horizontal = 12.dp, vertical = 10.dp),
            style = MaterialTheme.typography.bodySmall,
            fontWeight = FontWeight.Medium,
            color = color,
        )
    }
}

/** Fixed grid height so the subjects list scrolls inside the card. */
private fun isCompleteIsoDate(value: String): Boolean = value.isEmpty() ||
    runCatching { java.time.LocalDate.parse(value) }.isSuccess

private fun gridHeight(count: Int): androidx.compose.ui.unit.Dp =
    (count.coerceAtLeast(1) * 48 + 16).dp
