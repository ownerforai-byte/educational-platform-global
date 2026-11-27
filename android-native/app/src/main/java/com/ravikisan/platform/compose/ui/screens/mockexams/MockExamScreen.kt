package com.ravikisan.platform.compose.ui.screens.mockexams

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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ravikisan.platform.compose.core.logic.OMR_LETTERS
import kotlinx.coroutines.delay

/**
 * `/mock-exams` — timed mock paper: subject picker, OMR sheet that is
 * auto-scored on submit, written past questions marked against the model
 * answer, the answer key, and the "no MCQs or past questions indexed" card
 * with its link back to the PYQ bank. Same flow and same strings as the web.
 */
@Composable
fun MockExamScreen(
    onOpenPyqs: () -> Unit = {},
    modifier: Modifier = Modifier,
    viewModel: MockExamViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsState()

    LaunchedEffect(Unit) { viewModel.init() }

    // Countdown interval — stops on submit, exactly like the website effect.
    val hasPaper = state.paper != null
    val submitted = state.submitted
    LaunchedEffect(hasPaper, submitted) {
        while (hasPaper && !submitted) {
            delay(1_000)
            viewModel.tick()
        }
    }

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Column {
                Text("Mock exams", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(4.dp))
                Text(
                    "Objective section on an OMR sheet with auto scoring, plus written past questions you mark against the model answer.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                SubjectPicker(
                    subjects = state.subjects.map { it.key to "${it.subjectName} (${it.className})" },
                    selectedKey = state.subjectKey,
                    onPick = viewModel::pickSubject,
                    modifier = Modifier.weight(1f),
                )
                Button(
                    onClick = { viewModel.start() },
                    enabled = !state.loading && !state.empty && state.canStart,
                ) {
                    Text(if (state.paper != null) "New paper" else "Start mock")
                }
            }
        }

        if (!state.canStart) {
            item {
                Text(
                    "Access session ended. Upgrade your plan to continue.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        if (state.empty) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                ) {
                    Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text(
                            "Mock paper for this subject",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                        )
                        Text(
                            "No entrance MCQs or past questions are indexed for this subject yet.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        TextButton(onClick = onOpenPyqs) { Text("PYQ bank") }
                    }
                }
            }
        }

        val paper = state.paper
        val score = state.score
        if (paper != null && score != null) {
            item {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text(
                            if (state.submitted) {
                                "Score ${trimNumber(score.total)} / ${trimNumber(score.outOf)} (${score.percent}%)"
                            } else {
                                "Time left ${clock(state.secondsLeft)}"
                            },
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                        )
                        Text(
                            "${paper.objective.size} MCQs and ${paper.written.size} written questions, " +
                                "${trimNumber(paper.durationMinutes)} minutes.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        if (state.submitted) {
                            Text(
                                "Objective: ${score.correct} correct, ${score.wrong} wrong, ${score.blank} blank.",
                                style = MaterialTheme.typography.bodySmall,
                            )
                            Text(
                                "Written (self-marked): ${trimNumber(score.writtenMarks)}",
                                style = MaterialTheme.typography.bodySmall,
                            )
                            Text(
                                "Answer key: " + state.answerKey.joinToString("  ") { "${it.number}.${it.letter}" },
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
            }

            if (paper.objective.isNotEmpty()) {
                item {
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp)) {
                            Text(
                                "Section A: OMR sheet",
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold,
                            )
                        }
                    }
                }
                items(paper.objective, key = { it.id }) { item ->
                    val number = paper.objective.indexOfFirst { it.id == item.id } + 1
                    OmrRow(
                        number = number,
                        itemId = item.id,
                        question = item.q,
                        options = item.options,
                        answerIndex = item.answer,
                        why = item.why,
                        chosen = state.answers[item.id],
                        submitted = state.submitted,
                        onChoose = { index -> viewModel.choose(item.id, index) },
                    )
                }
            }

            if (paper.written.isNotEmpty()) {
                item {
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(
                                "Section B: written",
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold,
                            )
                            Text(
                                "After submitting, compare with the model answer and enter your marks.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
                items(paper.written, key = { it.id }) { item ->
                    val number = paper.written.indexOfFirst { it.id == item.id } + 1
                    WrittenRow(
                        number = number,
                        question = item.question,
                        marks = item.marks,
                        year = item.year,
                        solution = item.solution,
                        submitted = state.submitted,
                        entered = state.marks[item.id],
                        onMarks = { marks -> viewModel.setMarks(item.id, marks) },
                    )
                }
            }

            if (!state.submitted) {
                item {
                    Button(onClick = viewModel::submit) { Text("Submit paper") }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SubjectPicker(
    subjects: List<Pair<String, String>>,
    selectedKey: String,
    onPick: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    var expanded by remember { mutableStateOf(false) }
    val label = subjects.firstOrNull { it.first == selectedKey }?.second ?: "Select subject"

    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier,
    ) {
        OutlinedTextField(
            value = label,
            onValueChange = {},
            readOnly = true,
            singleLine = true,
            label = { Text("Subject") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier
                .menuAnchor(androidx.compose.material3.MenuAnchorType.PrimaryNotEditable)
                .fillMaxWidth(),
        )
        ExposedDropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            subjects.forEach { (key, name) ->
                DropdownMenuItem(
                    text = { Text(name) },
                    onClick = {
                        onPick(key)
                        expanded = false
                    },
                )
            }
        }
    }
}

@Composable
private fun OmrRow(
    number: Int,
    itemId: String,
    question: String,
    options: List<String>,
    answerIndex: Int,
    why: String,
    chosen: Int?,
    submitted: Boolean,
    onChoose: (Int) -> Unit,
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text("$number. $question", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Medium)
            options.forEachIndexed { index, option ->
                val isChosen = chosen == index
                val isRight = submitted && index == answerIndex
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable(enabled = !submitted) { onChoose(index) }
                        .padding(vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(
                        OMR_LETTERS.getOrNull(index) ?: "?",
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = FontWeight.Bold,
                        color = if (isChosen) {
                            MaterialTheme.colorScheme.primary
                        } else {
                            MaterialTheme.colorScheme.onSurfaceVariant
                        },
                        modifier = Modifier.width(20.dp),
                    )
                    Text(
                        option,
                        style = MaterialTheme.typography.bodySmall,
                        fontWeight = if (isRight) FontWeight.Bold else FontWeight.Normal,
                        color = when {
                            isRight -> MaterialTheme.colorScheme.primary
                            isChosen -> MaterialTheme.colorScheme.onSurface
                            else -> MaterialTheme.colorScheme.onSurfaceVariant
                        },
                    )
                }
            }
            if (submitted) {
                Text(why, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}

@Composable
private fun WrittenRow(
    number: Int,
    question: String,
    marks: Double,
    year: Int,
    solution: String?,
    submitted: Boolean,
    entered: Double?,
    onMarks: (Double) -> Unit,
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(
                "$number. $question [${trimNumber(marks)}] NEB $year",
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.Medium,
            )
            if (submitted) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                ) {
                    Text(
                        solution ?: "No model answer indexed.",
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(12.dp),
                    )
                }
                OutlinedTextField(
                    value = entered?.let { trimNumber(it) } ?: "",
                    onValueChange = { raw -> raw.toDoubleOrNull()?.let(onMarks) },
                    label = { Text("Your marks (0-${trimNumber(marks)})") },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    modifier = Modifier.width(220.dp),
                )
            }
        }
    }
}

/** `07:30` clock format from seconds. */
private fun clock(seconds: Int): String {
    val safe = seconds.coerceAtLeast(0)
    val minutes = (safe / 60).toString().padStart(2, '0')
    val rest = (safe % 60).toString().padStart(2, '0')
    return "$minutes:$rest"
}

/** JS number → string: whole numbers lose the trailing `.0`. */
private fun trimNumber(value: Double): String =
    if (value == Math.floor(value) && !value.isInfinite()) value.toLong().toString() else value.toString()
