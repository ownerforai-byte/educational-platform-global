package com.ravikisan.platform.compose.ui.screens.practice

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
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.LinearProgressIndicator
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
import androidx.lifecycle.viewmodel.compose.viewModel

/**
 * Scored quiz runner (Agent 4 task 5). Hosted at the shell's `quiz/{quizId}`
 * route where quizId is a practice set id — Agent 1 wires it via the
 * Integration queue. Flow: select an option → Check → feedback + explanation
 * → Next → score summary.
 */
@Composable
fun PracticeQuizScreen(
    setId: String,
    onExit: () -> Unit = {},
    viewModel: QuizRunnerViewModel = hiltViewModel(),
) {
    val index by viewModel.index.collectAsState()
    val selected by viewModel.selected.collectAsState()
    val checked by viewModel.checked.collectAsState()
    val correctCount by viewModel.correctCount.collectAsState()
    val finished by viewModel.finished.collectAsState()
    val loading by viewModel.loading.collectAsState()
    val error by viewModel.error.collectAsState()
    val questions by viewModel.questions.collectAsState()

    androidx.compose.runtime.LaunchedEffect(setId) { viewModel.load() }

    when {
        error != null -> EmptyQuiz(message = error!!, onExit = onExit, onRetry = viewModel::retry)
        loading || questions.isEmpty() -> EmptyQuiz(message = "Loading exam…", onExit = onExit)
        finished -> ScoreSummary(
            set = PracticeSet(id = setId, title = viewModel.examTitle, durationMin = 0, questionCount = questions.size),
            correct = correctCount,
            total = questions.size,
            onExit = onExit,
        )
        else -> QuestionCard(
            question = viewModel.current!!,
            position = index + 1,
            total = questions.size,
            selected = selected,
            checked = checked,
            lastAnswerCorrect = viewModel.lastAnswerCorrect,
            onSelect = viewModel::selectOption,
            onCheck = viewModel::check,
            onNext = viewModel::next,
        )
    }
}

@Composable
private fun EmptyQuiz(message: String, onExit: () -> Unit, onRetry: (() -> Unit)? = null) {
    Column(
        modifier = Modifier.fillMaxSize().padding(32.dp),
        verticalArrangement = Arrangement.Center,
    ) {
        Text(message, style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        if (onRetry != null) OutlinedButton(onClick = onRetry) { Text("Retry") }
        OutlinedButton(onClick = onExit) { Text("Back to practice") }
    }
}

@Composable
private fun QuestionCard(
    question: PracticeQuestion,
    position: Int,
    total: Int,
    selected: Int?,
    checked: Boolean,
    lastAnswerCorrect: Boolean,
    onSelect: (Int) -> Unit,
    onCheck: () -> Unit,
    onNext: () -> Unit,
) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Column {
                Text(
                    "Question $position of $total",
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                Spacer(Modifier.height(6.dp))
                LinearProgressIndicator(
                    progress = { position.toFloat() / total },
                    modifier = Modifier.fillMaxWidth(),
                )
            }
        }
        item {
            Text(question.stem, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
        }
        items(question.options.size) { optionIndex ->
            val isCorrectOption = checked && optionIndex == question.answerIndex
            val isWrongPick = checked && optionIndex == selected && optionIndex != question.answerIndex
            val container = when {
                isCorrectOption -> MaterialTheme.colorScheme.primary.copy(alpha = 0.15f)
                isWrongPick -> MaterialTheme.colorScheme.error.copy(alpha = 0.15f)
                optionIndex == selected -> MaterialTheme.colorScheme.surfaceVariant
                else -> MaterialTheme.colorScheme.surface
            }
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 2.dp),
                colors = CardDefaults.cardColors(containerColor = container),
                onClick = { onSelect(optionIndex) },
                enabled = !checked,
            ) {
                Text(
                    "${'A' + optionIndex}. ${question.options[optionIndex]}",
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.bodyMedium,
                )
            }
        }
        if (checked) {
            item {
                val verdict = if (lastAnswerCorrect) "Correct!" else "Not quite."
                Text(
                    verdict,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = if (lastAnswerCorrect) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error,
                )
                question.explanation?.let {
                    Spacer(Modifier.height(4.dp))
                    Text(it, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                if (!checked) {
                    Button(onClick = onCheck, enabled = selected != null) { Text("Check") }
                } else {
                    Button(onClick = onNext) {
                        Text(if (position == total) "See results" else "Next")
                    }
                }
            }
        }
    }
}

@Composable
private fun ScoreSummary(
    set: PracticeSet,
    correct: Int,
    total: Int,
    onExit: () -> Unit,
) {
    Column(
        modifier = Modifier.fillMaxSize().padding(32.dp),
        verticalArrangement = Arrangement.Center,
    ) {
        Text("Set complete", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(8.dp))
        Text(
            "$correct of $total correct — ${set.title}",
            style = MaterialTheme.typography.titleMedium,
        )
        Text(
            "${set.questionCount} questions · scored just now",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Spacer(Modifier.height(16.dp))
        Button(onClick = onExit) { Text("Back to practice") }
    }
}
