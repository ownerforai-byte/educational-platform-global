package com.ravikisan.platform.compose.ui.screens.studyplan

import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ravikisan.platform.compose.core.logic.DAILY_MINUTES_OPTIONS
import com.ravikisan.platform.compose.core.logic.GoalSubject

/**
 * /goals — Study Goals (`(app)/goals/page.tsx`, parity plan §2 P2): exam
 * date, daily-minutes chips and grouped subject toggles, all written straight
 * through the device-local goals store (every change persists immediately,
 * like the website's `update()`/`toggleSubject()`).
 */
@Composable
fun GoalsScreen(
    onOpenOnboarding: () -> Unit = {},
    viewModel: GoalsViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()
    val goals = state.goals

    if (goals == null) {
        LoadingShell()
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
            Text("Study Goals", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text(
                "Your subjects, exam date, daily study target — all in one place.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        // Exam date
        CardSection {
            var examDateText by remember { mutableStateOf(goals.examDate ?: "") }
            OutlinedTextField(
                value = examDateText,
                onValueChange = {
                    examDateText = it
                    if (isCompleteIsoDate(it)) viewModel.setExamDate(it)
                },
                modifier = Modifier.fillMaxWidth(),
                label = { Text("Exam date (YYYY-MM-DD)") },
                singleLine = true,
            )
        }

        // Daily study target
        CardSection {
            Text("Daily study target", style = MaterialTheme.typography.labelMedium)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                DAILY_MINUTES_OPTIONS.forEach { minutes ->
                    FilterChip(
                        selected = goals.dailyMinutes == minutes,
                        onClick = { viewModel.setDailyMinutes(minutes) },
                        label = {
                            Text(if (minutes < 60) "$minutes min" else "${minutes / 60} hr${if (minutes > 60) "s" else ""}")
                        },
                    )
                }
            }
        }

        // Subject selection
        CardSection {
            Text("Your subjects", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
            Text(
                "Select the subjects you are studying. The planner and dashboard use these to build your weekly schedule.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            OfflineCatalogNotice(state)
            state.catalog
                .groupBy { it.classSlug }
                .forEach { (classSlug, subjects) ->
                    val className = subjects.firstOrNull()?.className ?: classSlug
                    Text(
                        className.uppercase(),
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                    SubjectChips(
                        subjects = subjects,
                        selected = subjects.filter { it.key in goals.subjects }.map { it.key }.toSet(),
                        onToggle = viewModel::toggleSubject,
                    )
                }
        }

        androidx.compose.material3.TextButton(onClick = onOpenOnboarding) {
            Text("Back to onboarding")
        }
    }
}

private fun isCompleteIsoDate(value: String): Boolean = value.isEmpty() ||
    runCatching { java.time.LocalDate.parse(value) }.isSuccess

@Composable
internal fun CardSection(content: @Composable androidx.compose.foundation.layout.ColumnScope.() -> Unit) {
    androidx.compose.material3.Card(
        colors = androidx.compose.material3.CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface,
        ),
    ) {
        Column(
            Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            content = content,
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
internal fun SubjectChips(
    subjects: List<GoalSubject>,
    selected: Set<String>,
    onToggle: (String) -> Unit,
) {
    androidx.compose.foundation.layout.FlowRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        subjects.forEach { subject ->
            FilterChip(
                selected = subject.key in selected,
                onClick = { onToggle(subject.key) },
                leadingIcon = if (subject.key in selected) {
                    { Icon(Icons.Filled.Check, contentDescription = null, modifier = Modifier.padding(0.dp)) }
                } else {
                    null
                },
                label = { Text(subject.subjectName) },
            )
        }
    }
}

@Composable
internal fun LoadingShell() {
    Column(
        Modifier
            .fillMaxSize()
            .padding(32.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally,
    ) {
        Text(
            "Loading…",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}
