package com.ravikisan.platform.compose.ui.screens.wave2

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
import com.ravikisan.platform.compose.core.contract.ExamSubjectCountdown
import com.ravikisan.platform.compose.data.repository.Wave2Repository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ExamCountdownViewModel @Inject constructor(
    private val repository: Wave2Repository,
) : ViewModel() {
    data class UiState(val loading: Boolean = true, val subjects: List<ExamSubjectCountdown> = emptyList(), val error: String? = null)
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state
    init { load() }
    fun load() {
        viewModelScope.launch {
            _state.value = UiState(loading = true)
            repository.loadExamCountdown().fold(
                onSuccess = { _state.value = UiState(loading = false, subjects = it.subjects) },
                onFailure = { _state.value = UiState(loading = false, error = it.message) },
            )
        }
    }
}

@Composable
fun ExamCountdownScreen(viewModel: ExamCountdownViewModel = androidx.hilt.navigation.compose.hiltViewModel()) {
    val state by viewModel.state.collectAsState()
    LazyColumn(modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp), contentPadding = PaddingValues(vertical = 16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Text("Exam Countdown", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("Days remaining until NEB Class 12 examinations.", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
            Spacer(Modifier.height(8.dp))
        }
        if (state.loading) { item { Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) { CircularProgressIndicator() } } }
        state.error?.let { item { Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)) { Column(Modifier.padding(16.dp)) { Text("Could not load exam dates"); TextButton(onClick = { viewModel.load() }) { Text("Retry") } } } } }
        items(state.subjects) { subj ->
            Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(Modifier.padding(16.dp)) {
                    Text(subj.name, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(8.dp))
                    Row(verticalAlignment = Alignment.Bottom) {
                        Text("${subj.daysLeft}", style = MaterialTheme.typography.headlineLarge, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                        Text(" days left", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                    }
                    Text("Exam date: ${subj.examDateAd}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
    }
}
