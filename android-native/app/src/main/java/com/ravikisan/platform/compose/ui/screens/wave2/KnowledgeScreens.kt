package com.ravikisan.platform.compose.ui.screens.wave2

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.KnowledgeSectionFull
import com.ravikisan.platform.compose.core.contract.KnowledgeSectionSummary
import com.ravikisan.platform.compose.data.repository.Wave2Repository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

// ── Shared Knowledge Hub + Section Reader ViewModels & Composables ──────────

@HiltViewModel
class KnowledgeHubViewModel @Inject constructor(
    private val repository: Wave2Repository,
) : ViewModel() {
    data class UiState(val loading: Boolean = true, val sections: List<KnowledgeSectionSummary> = emptyList(), val error: String? = null)
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state

    fun load(kind: String) {
        viewModelScope.launch {
            _state.value = UiState(loading = true)
            val result = if (kind == "loksewa") repository.loadLoksewaHub() else repository.loadWorldKnowledgeHub()
            result.fold(
                onSuccess = { _state.value = UiState(loading = false, sections = it.sections) },
                onFailure = { _state.value = UiState(loading = false, error = it.message) },
            )
        }
    }
}

@HiltViewModel
class KnowledgeTopicViewModel @Inject constructor(
    private val repository: Wave2Repository,
) : ViewModel() {
    data class UiState(val loading: Boolean = true, val section: KnowledgeSectionFull? = null, val error: String? = null)
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state

    fun load(kind: String, slug: String) {
        viewModelScope.launch {
            _state.value = UiState(loading = true)
            val result = if (kind == "loksewa") repository.loadLoksewaTopic(slug) else repository.loadWorldKnowledgeTopic(slug)
            result.fold(
                onSuccess = { _state.value = UiState(loading = false, section = it) },
                onFailure = { _state.value = UiState(loading = false, error = it.message) },
            )
        }
    }
}

@Composable
fun KnowledgeHubScreen(
    kind: String,
    title: String,
    subtitle: String,
    onOpenTopic: (String) -> Unit,
    viewModel: KnowledgeHubViewModel = androidx.hilt.navigation.compose.hiltViewModel(),
) {
    LaunchedEffect(kind) { viewModel.load(kind) }
    val state by viewModel.state.collectAsState()

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
        contentPadding = PaddingValues(vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text(title, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text(subtitle, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
            Spacer(Modifier.height(8.dp))
        }
        if (state.loading) {
            item { Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) { CircularProgressIndicator() } }
        }
        state.error?.let { err ->
            item {
                Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)) {
                    Column(Modifier.padding(16.dp)) {
                        Text("Could not load $title", style = MaterialTheme.typography.titleSmall)
                        Text(err, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                        TextButton(onClick = { viewModel.load(kind) }) { Text("Retry") }
                    }
                }
            }
        }
        items(state.sections) { section ->
            Card(
                modifier = Modifier.fillMaxWidth().clickable { onOpenTopic(section.slug) },
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            ) {
                Column(Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text(section.name, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Surface(shape = MaterialTheme.shapes.small, color = MaterialTheme.colorScheme.primaryContainer) {
                            Text("${section.topicCount} topics", style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp))
                        }
                    }
                    Text(section.description, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
    }
}

@Composable
fun KnowledgeTopicScreen(
    kind: String,
    slug: String,
    viewModel: KnowledgeTopicViewModel = androidx.hilt.navigation.compose.hiltViewModel(),
) {
    LaunchedEffect(kind, slug) { viewModel.load(kind, slug) }
    val state by viewModel.state.collectAsState()
    val selectedAnswers = remember { mutableStateMapOf<String, Int>() }

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
        contentPadding = PaddingValues(vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        if (state.loading) {
            item { Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) { CircularProgressIndicator() } }
        }
        state.error?.let { err ->
            item {
                Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)) {
                    Column(Modifier.padding(16.dp)) {
                        Text("Could not load topic", style = MaterialTheme.typography.titleSmall)
                        Text(err, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                        TextButton(onClick = { viewModel.load(kind, slug) }) { Text("Retry") }
                    }
                }
            }
        }
        state.section?.let { sec ->
            item {
                Text(sec.name, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
                Text(sec.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                Spacer(Modifier.height(8.dp))
            }

            if (sec.topics.isNotEmpty()) {
                item {
                    Text("Syllabus Topics", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                }
                items(sec.topics) { topic ->
                    Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                        Column(Modifier.padding(16.dp)) {
                            Text(topic.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                            topic.points.forEach { pt ->
                                Text("• $pt", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 3.dp))
                            }
                        }
                    }
                }
            }

            if (sec.notes.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(4.dp))
                    Text("Key Notes & Facts", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                }
                items(sec.notes) { note ->
                    Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                        Column(Modifier.padding(16.dp)) {
                            Text(note.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                            Text(note.summary, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                            note.facts.forEach { fact ->
                                Text("• $fact", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                            }
                        }
                    }
                }
            }

            if (sec.practice.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(4.dp))
                    Text("Practice Questions", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                }
                items(sec.practice) { q ->
                    val chosen = selectedAnswers[q.id]
                    Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                        Column(Modifier.padding(16.dp)) {
                            Text(q.question, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                            Spacer(Modifier.height(8.dp))
                            q.options.forEachIndexed { idx, opt ->
                                val isSelected = chosen == idx
                                val isCorrect = idx == q.correctIndex
                                val btnColors = when {
                                    chosen == null -> ButtonDefaults.outlinedButtonColors()
                                    isCorrect -> ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primaryContainer, contentColor = MaterialTheme.colorScheme.onPrimaryContainer)
                                    isSelected -> ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.errorContainer, contentColor = MaterialTheme.colorScheme.onErrorContainer)
                                    else -> ButtonDefaults.outlinedButtonColors()
                                }
                                OutlinedButton(
                                    onClick = { selectedAnswers[q.id] = idx },
                                    colors = btnColors,
                                    modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp),
                                ) {
                                    Text(opt, modifier = Modifier.fillMaxWidth())
                                }
                            }
                            if (chosen != null) {
                                Text(
                                    q.explanation,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.primary,
                                    modifier = Modifier.padding(top = 8.dp),
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
