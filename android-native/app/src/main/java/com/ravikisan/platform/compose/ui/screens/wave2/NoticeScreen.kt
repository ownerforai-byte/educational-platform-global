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
import com.ravikisan.platform.compose.core.contract.NoticeItem
import com.ravikisan.platform.compose.data.repository.Wave2Repository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class NoticeViewModel @Inject constructor(
    private val repository: Wave2Repository,
) : ViewModel() {
    data class UiState(val loading: Boolean = true, val items: List<NoticeItem> = emptyList(), val error: String? = null)
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state
    init { load() }
    fun load() {
        viewModelScope.launch {
            _state.value = UiState(loading = true)
            repository.loadNotice().fold(
                onSuccess = { _state.value = UiState(loading = false, items = it.items) },
                onFailure = { _state.value = UiState(loading = false, error = it.message) },
            )
        }
    }
}

@Composable
fun NoticeScreen(viewModel: NoticeViewModel = androidx.hilt.navigation.compose.hiltViewModel()) {
    val state by viewModel.state.collectAsState()
    LazyColumn(modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp), contentPadding = PaddingValues(vertical = 16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Text("Notice Board", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("Official exam notices and schedule updates.", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
            Spacer(Modifier.height(8.dp))
        }
        if (state.loading) { item { Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) { CircularProgressIndicator() } } }
        state.error?.let { item { Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)) { Column(Modifier.padding(16.dp)) { Text("Could not load notices"); TextButton(onClick = { viewModel.load() }) { Text("Retry") } } } } }
        items(state.items) { notice ->
            Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(Modifier.padding(16.dp)) {
                    Text(notice.date, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(notice.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(top = 4.dp))
                    Text(notice.body, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                    Text("Source: ${notice.source}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary, modifier = Modifier.padding(top = 8.dp))
                }
            }
        }
    }
}
