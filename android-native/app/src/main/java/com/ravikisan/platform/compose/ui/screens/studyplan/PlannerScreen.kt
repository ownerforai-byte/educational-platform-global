package com.ravikisan.platform.compose.ui.screens.studyplan

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ravikisan.platform.compose.core.logic.PlanDay
import java.time.format.DateTimeFormatter
import java.util.Locale

/**
 * /planner — Weekly Planner (`PlannerView`, parity plan §2 P3). The week comes
 * from the golden-tested `buildWeeklyPlan`; when goals are missing it shows
 * the website's "Needs your study goals" empty state, and when progress is
 * unavailable it says so instead of inventing topics.
 */
@Composable
fun PlannerScreen(
    onOpenSettings: () -> Unit = {},
    onOpenTopic: (topicHref: String) -> Unit = {},
    viewModel: PlannerViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()

    if (state.needsGoals) {
        Column(
            Modifier
                .fillMaxSize()
                .padding(32.dp),
            verticalArrangement = Arrangement.Center,
        ) {
            Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Weekly planner", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(
                        "Needs your study goals",
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = FontWeight.Medium,
                        color = MaterialTheme.colorScheme.primary,
                    )
                    Text(
                        "Pick your subjects, exam date and daily study time and the planner builds your week.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    OutlinedButton(onClick = onOpenSettings) { Text("Dashboard") }
                }
            }
        }
        return
    }

    Column(Modifier.fillMaxSize()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Weekly planner", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text(
                listOfNotNull(
                    "${state.goals?.dailyMinutes ?: 60} minutes a day over your subjects, aimed at topics you have not finished.",
                    if (state.journeyFailed) "Progress is unavailable, so no weak topics are suggested." else null,
                    if (state.journeyLoading) "Loading your progress…" else null,
                ).joinToString(" "),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            OutlinedButton(onClick = onOpenSettings, contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 12.dp, vertical = 4.dp)) {
                Text("Edit goals")
            }
        }

        if (state.examPassed) {
            Text(
                "Your exam date has passed. Update it in Settings to plan again.",
                Modifier.padding(horizontal = 16.dp),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        LazyColumn(
            contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            items(state.days, key = { it.date }) { day ->
                PlanDayCard(day, onOpenTopic)
            }
        }
    }
}

private val dayHeader = DateTimeFormatter.ofPattern("EEEE, MMM d", Locale.ENGLISH)

@Composable
private fun PlanDayCard(day: PlanDay, onOpenTopic: (String) -> Unit) {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(
                formatDate(day.date),
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold,
            )
            Text(
                when {
                    day.daysToExam == 0 -> "Exam day"
                    day.revision -> "Revision day: go over what you know"
                    day.daysToExam != null -> "${day.daysToExam} days to the exam"
                    else -> "Study day"
                },
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            day.blocks.forEach { block ->
                Row(
                    Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                ) {
                    Column {
                        Text(block.subjectName, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Medium)
                        block.focus?.let { focus ->
                            val text = focus.title
                            if (focus.href != null) {
                                Text(
                                    text,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    textDecoration = androidx.compose.ui.text.style.TextDecoration.Underline,
                                    modifier = Modifier.clickable { onOpenTopic(focus.href) },
                                )
                            } else {
                                Text(
                                    text,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                )
                            }
                        }
                    }
                    Text(
                        "${block.minutes} min",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        }
    }
}

private fun formatDate(iso: String): String = try {
    java.time.LocalDate.parse(iso).atStartOfDay().format(dayHeader)
} catch (_: Exception) {
    iso
}
