package com.ravikisan.platform.compose.ui.screens.social

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MobileCommunityPostDto
import com.ravikisan.platform.compose.data.repository.CommunityRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Community feed state — REAL data (fake→real swap, session 3): the public
 * feed comes from `GET /api/mobile/community` (read-only, cursor-paginated)
 * through [CommunityRepository] with the Room cache serving airplane mode.
 * Publishing stays on the website for now — the app reads.
 */
data class CommunityUiState(
    val loading: Boolean = false,
    val loadingMore: Boolean = false,
    val error: String? = null,
    val fromCache: Boolean = false,
    val posts: List<MobileCommunityPostDto> = emptyList(),
    val nextCursor: String? = null,
    val endReached: Boolean = false,
)

@HiltViewModel
class CommunityViewModel @Inject constructor(
    private val repository: CommunityRepository,
) : ViewModel() {

    private val _state = MutableStateFlow(CommunityUiState())
    val state: StateFlow<CommunityUiState> = _state.asStateFlow()

    init {
        load()
    }

    fun load() {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null)
        viewModelScope.launch {
            apply(repository.loadFeed())
        }
    }

    /** Fetch the next cursor page and append (no-op when already loading or done). */
    fun loadMore() {
        val current = _state.value
        if (current.loading || current.loadingMore || current.endReached || current.nextCursor == null) return
        _state.value = current.copy(loadingMore = true)
        viewModelScope.launch {
            val cursor = current.nextCursor
            when (val result = repository.loadFeed(cursor = cursor)) {
                is CommunityRepository.Result.Fresh -> _state.value = _state.value.copy(
                    loadingMore = false,
                    posts = _state.value.posts + result.posts,
                    nextCursor = result.nextCursor,
                    endReached = result.nextCursor == null,
                    fromCache = false,
                )
                is CommunityRepository.Result.Cached -> _state.value = _state.value.copy(loadingMore = false, fromCache = true)
                is CommunityRepository.Result.Unavailable -> _state.value = _state.value.copy(loadingMore = false, error = result.message)
            }
        }
    }

    fun dismissError() {
        _state.value = _state.value.copy(error = null)
    }

    private fun apply(result: CommunityRepository.Result) {
        _state.value = when (result) {
            is CommunityRepository.Result.Fresh -> _state.value.copy(
                loading = false, posts = result.posts, nextCursor = result.nextCursor,
                endReached = result.nextCursor == null, fromCache = false,
            )
            is CommunityRepository.Result.Cached -> _state.value.copy(
                loading = false, posts = result.posts, nextCursor = result.nextCursor,
                endReached = result.nextCursor == null, fromCache = true,
            )
            is CommunityRepository.Result.Unavailable -> _state.value.copy(loading = false, error = result.message)
        }
    }
}
