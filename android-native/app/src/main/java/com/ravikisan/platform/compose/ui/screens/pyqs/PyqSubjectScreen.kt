package com.ravikisan.platform.compose.ui.screens.pyqs

import androidx.compose.animation.AnimatedVisibility
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
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

/**
 * PYQ subject screen — native counterpart of the website's
 * `class-11-notes/[subject]/theory` page: theory blocks, then PYQ year
 * buckets (newest first), each question expandable with a Show/Hide
 * solution, then the concept drills. Same flow, same order.
 */
@Composable
fun PyqSubjectScreen(
    classSlug: String,
    subjectSlug: String,
    onBack: () -> Unit,
    modifier: Modifier = Modifier,
    viewModel: PyqsViewModel = viewModel(),
) {
    val state by viewModel.subject.collectAsStateWithLifecycle()

    androidx.compose.runtime.LaunchedEffect(classSlug, subjectSlug) {
        viewModel.openSubject(classSlug, subjectSlug)
    }

    val bank = state.bank
    if (bank == null) {
        // Honest empty state — the website 404s here; we say so in place.
        Column(
            modifier = modifier.fillMaxSize().padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            Text(
                text = state.subjectName.ifEmpty { "PYQs" },
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
            )
            Text(
                text = "No PYQ bank is published for this subject yet.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
        return
    }

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text(
                text = "${state.subjectName} — PYQ bank",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
            )
        }
        if (bank.theory.isNotEmpty()) {
            item { SectionHeading("Theory") }
            items(bank.theory, key = { it.title }) { block -> TheoryCard(block) }
        }
        item { SectionHeading("Past year questions") }
        bank.pyqs.forEach { year ->
            item(key = "year-${year.year}") { YearHeading(year) }
            items(year.questions, key = { "${year.year}:${it.question}" }) { q ->
                ExpandableQuestion(q)
            }
        }
        if (bank.drills.isNotEmpty()) {
            item { SectionHeading("Concept drills") }
            items(bank.drills, key = { it.id }) { drill -> DrillCard(drill) }
        }
        item { Spacer(Modifier.height(8.dp)) }
    }
}

@Composable
private fun SectionHeading(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.titleMedium,
        fontWeight = FontWeight.SemiBold,
        modifier = Modifier.padding(top = 8.dp),
    )
}

@Composable
private fun TheoryCard(block: TheoryBlock) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(block.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
            block.notes.forEach { note ->
                Text("• $note", style = MaterialTheme.typography.bodySmall)
            }
            block.detail?.let {
                Text(
                    it,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}

@Composable
private fun YearHeading(year: PyqYear) {
    Column(Modifier.padding(top = 8.dp)) {
        Text(
            text = year.title,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.SemiBold,
        )
        Text(
            text = buildString {
                append("${year.questions.size} question${if (year.questions.size == 1) "" else "s"}")
                year.examSource?.let { append(" · $it") }
                append(" · units: ${year.units.joinToString()}")
            },
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

/** Web behaviour mirrored: question row expands to reveal the solution. */
@Composable
private fun ExpandableQuestion(q: PyqQuestion) {
    var open by rememberSaveable(q.question) { mutableStateOf(false) }
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Column(Modifier.clickable { open = !open }) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    q.marks?.let {
                        Text(
                            text = "$it mark${if (it == "1") "" else "s"}",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.padding(end = 8.dp),
                        )
                    }
                    Text(
                        text = if (open) "Hide solution" else "Show solution",
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.SemiBold,
                        color = MaterialTheme.colorScheme.primary,
                    )
                }
                Text(q.question, style = MaterialTheme.typography.bodyMedium)
            }
            AnimatedVisibility(visible = open) {
                Column(Modifier.padding(start = 16.dp, end = 16.dp, bottom = 16.dp)) {
                    q.solution?.let {
                        Text(it, style = MaterialTheme.typography.bodySmall)
                    } ?: Text(
                        "Solution not provided yet.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        }
    }
}

@Composable
private fun DrillCard(drill: ConceptDrill) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = if (drill.kind == "practical") "Practical" else "Concept",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.padding(end = 8.dp),
                )
                drill.concept?.let {
                    Text(it, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            Text(drill.question, style = MaterialTheme.typography.bodyMedium)
            drill.solution?.let {
                Text(
                    it,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}
