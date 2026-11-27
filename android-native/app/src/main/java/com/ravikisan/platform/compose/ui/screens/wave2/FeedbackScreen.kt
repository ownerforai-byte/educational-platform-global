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
import com.ravikisan.platform.compose.core.contract.FeedbackCategory
import com.ravikisan.platform.compose.data.repository.Wave2Repository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class FeedbackViewModel @Inject constructor(
    private val repository: Wave2Repository,
) : ViewModel() {
    data class UiState(
        val loading: Boolean = true,
        val categories: List<FeedbackCategory> = emptyList(),
        val contactUrl: String = "https://harindrasah.com.np/contact",
        val error: String? = null,
    )
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state
    init { load() }
    fun load() {
        viewModelScope.launch {
            _state.value = UiState(loading = true)
            repository.loadFeedback().fold(
                onSuccess = { _state.value = UiState(loading = false, categories = it.categories, contactUrl = it.contactUrl) },
                onFailure = { _state.value = UiState(loading = false, error = it.message) },
            )
        }
    }
}

@Composable
fun FeedbackScreen(viewModel: FeedbackViewModel = androidx.hilt.navigation.compose.hiltViewModel()) {
    val state by viewModel.state.collectAsState()
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
        contentPadding = PaddingValues(vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Feedback", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text(
                "Report wrong content, suggest new topics or rate your experience — your feedback shapes the platform.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 4.dp),
            )
            Spacer(Modifier.height(8.dp))
        }
        if (state.loading) {
            item { Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) { CircularProgressIndicator() } }
        }
        state.error?.let { err ->
            item {
                Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)) {
                    Column(Modifier.padding(16.dp)) {
                        Text("Could not load feedback categories", style = MaterialTheme.typography.titleSmall)
                        Text(err, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                        TextButton(onClick = { viewModel.load() }) { Text("Retry") }
                    }
                }
            }
        }
        items(state.categories) { cat ->
            Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(Modifier.padding(16.dp)) {
                    Text("${cat.icon}  ${cat.title}", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(cat.description, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
        if (!state.loading && state.error == null) {
            item {
                Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)) {
                    Column(Modifier.padding(16.dp)) {
                        Text(
                            "All feedback is routed through the contact channel (${state.contactUrl}). Include as much detail as you can.",
                            style = MaterialTheme.typography.bodySmall,
                        )
                    }
                }
            }
        }
    }
}
