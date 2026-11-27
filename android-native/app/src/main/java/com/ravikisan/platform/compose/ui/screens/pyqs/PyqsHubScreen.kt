package com.ravikisan.platform.compose.ui.screens.pyqs

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

/**
 * PYQ hub — native counterpart of the website's `/pyqs` page: one summary
 * card per subject (year range, question count, unit count), tap-through to
 * the subject bank. Matches the web flow; no redesign.
 */
@Composable
fun PyqsHubScreen(
    onOpenSubject: (classSlug: String, subjectSlug: String) -> Unit,
    modifier: Modifier = Modifier,
    viewModel: PyqsViewModel = viewModel(),
) {
    val state by viewModel.hub.collectAsStateWithLifecycle()

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Column {
                Text(
                    text = "Past Year Questions",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                )
                Text(
                    text = "Grouped by exam year, tagged with the syllabus unit, each with a worked solution.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }
        items(state.subjects, key = { "${it.classSlug}:${it.subjectSlug}" }) { subject ->
            PyqSubjectCard(subject = subject, onClick = {
                onOpenSubject(subject.classSlug, subject.subjectSlug)
            })
        }
    }
}

@Composable
private fun PyqSubjectCard(subject: PyqSubjectSummary, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            Text(
                text = subject.subjectName,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold,
            )
            val years = if (subject.newestYear != null && subject.oldestYear != null) {
                if (subject.newestYear == subject.oldestYear) "${subject.newestYear}"
                else "${subject.oldestYear}–${subject.newestYear}"
            } else {
                null
            }
            Text(
                text = buildString {
                    append("${subject.questionCount} questions")
                    append(" · ${subject.yearCount} year${if (subject.yearCount == 1) "" else "s"}")
                    append(" · ${subject.unitCount} unit${if (subject.unitCount == 1) "" else "s"}")
                    years?.let { append(" · $it") }
                },
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}
