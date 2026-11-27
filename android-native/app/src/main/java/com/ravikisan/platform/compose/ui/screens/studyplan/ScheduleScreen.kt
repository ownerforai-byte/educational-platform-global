package com.ravikisan.platform.compose.ui.screens.studyplan

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
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
import com.ravikisan.platform.compose.core.logic.PlannerSeedItem
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale

/**
 * /schedule — Study Schedule (website SchedulePage): the daily plan seed split
 * over the next 7 days from today, with the "N days until your exam" banner
 * and the same empty state pointing at goal setup.
 */
@Composable
fun ScheduleScreen(
    onOpenGoals: () -> Unit = {},
    onOpenPlanner: () -> Unit = {},
    viewModel: ScheduleViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()

    Column(
        Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Study Schedule", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text(
                "A calendar view of your planner output — see what topics are scheduled for each day.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        val daysLeft = state.daysLeft
        if (daysLeft != null && daysLeft > 0) {
            Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Text(
                    "$daysLeft days until your exam.",
                    Modifier.padding(horizontal = 12.dp, vertical = 10.dp),
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.Medium,
                    color = MaterialTheme.colorScheme.primary,
                )
            }
        }

        if (!state.hasPlan) {
            Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        "No study plan yet. Set your study goals and subjects to generate a weekly schedule.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    OutlinedButton(onClick = onOpenGoals) { Text("Set study goals") }
                }
            }
        } else {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                itemsIndexed(scheduleDays(state.plan, state.today)) { _, day ->
                    ScheduleDayCard(day)
                }
            }
        }

        androidx.compose.material3.TextButton(onClick = onOpenPlanner) {
            Text("Back to Planner")
        }
    }
}

internal data class ScheduleDay(
    val label: String,
    val dateLabel: String,
    val items: List<PlannerSeedItem>,
)

/** Website grouping: item j of the seed goes to day (j mod 7), today first. */
internal fun scheduleDays(plan: List<PlannerSeedItem>, today: LocalDate): List<ScheduleDay> =
    (0 until 7).map { i ->
        val date = today.plusDays(i.toLong())
        ScheduleDay(
            label = if (i == 0) "Today" else date.dayOfWeek.getDisplayName(java.time.format.TextStyle.SHORT, Locale.ENGLISH),
            dateLabel = date.format(DateTimeFormatter.ofPattern("MMM d", Locale.ENGLISH)),
            items = plan.filterIndexed { j, _ -> j % 7 == i },
        )
    }

@Composable
private fun ScheduleDayCard(day: ScheduleDay) {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(day.label, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                Text(
                    day.dateLabel,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            if (day.items.isEmpty()) {
                Text(
                    "No topics scheduled.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            } else {
                day.items.forEach { item ->
                    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                        Row(
                            Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 12.dp, vertical = 8.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                        ) {
                            Text(item.subjectName, style = MaterialTheme.typography.bodySmall)
                            Text(
                                "${item.minutes} min",
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
            }
        }
    }
}
