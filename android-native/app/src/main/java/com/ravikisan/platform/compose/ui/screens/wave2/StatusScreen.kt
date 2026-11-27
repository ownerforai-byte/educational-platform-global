package com.ravikisan.platform.compose.ui.screens.wave2

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.PlatformStatusData
import com.ravikisan.platform.compose.data.repository.Wave2Repository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class StatusViewModel @Inject constructor(
    private val repository: Wave2Repository,
) : ViewModel() {
    data class UiState(
        val loading: Boolean = true,
        val status: PlatformStatusData? = null,
        val error: String? = null,
    )
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state
    init { load() }
    fun load() {
        viewModelScope.launch {
            _state.value = UiState(loading = true)
            repository.loadStatus().fold(
                onSuccess = { _state.value = UiState(loading = false, status = it) },
                onFailure = { _state.value = UiState(loading = false, error = it.message) },
            )
        }
    }
}

@Composable
fun StatusScreen(viewModel: StatusViewModel = androidx.hilt.navigation.compose.hiltViewModel()) {
    val state by viewModel.state.collectAsState()
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
        contentPadding = PaddingValues(vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Platform Status", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("Live health and service status.", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
            Spacer(Modifier.height(8.dp))
        }
        if (state.loading) {
            item { Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) { CircularProgressIndicator() } }
        }
        state.error?.let { err ->
            item {
                Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)) {
                    Column(Modifier.padding(16.dp)) {
                        Text("Could not reach status endpoint", style = MaterialTheme.typography.titleSmall)
                        Text(err, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                        TextButton(onClick = { viewModel.load() }) { Text("Retry") }
                    }
                }
            }
        }
        state.status?.let { s ->
            item {
                Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)) {
                    Column(Modifier.padding(16.dp)) {
                        Text("Overall: ${s.status.uppercase()}", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        Text("Checked: ${s.timestamp}", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                        s.commit?.let { Text("Revision: $it", style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(top = 4.dp)) }
                    }
                }
            }
            item {
                ServiceStatusRow("API", s.services.api)
            }
            item {
                ServiceStatusRow("Veer AI", s.services.ai)
            }
            item {
                ServiceStatusRow("Content Corpus", s.services.content)
            }
        }
    }
}

@Composable
private fun ServiceStatusRow(name: String, state: String) {
    Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
            Surface(shape = MaterialTheme.shapes.small, color = MaterialTheme.colorScheme.secondaryContainer) {
                Text(state, style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp))
            }
        }
    }
}
