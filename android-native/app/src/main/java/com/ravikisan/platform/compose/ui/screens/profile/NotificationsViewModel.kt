package com.ravikisan.platform.compose.ui.screens.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MarkNotificationsReadRequest
import com.ravikisan.platform.compose.core.contract.SocialNotificationDto
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.session.SessionStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Notification feed state — REAL data (fake→real swap): `GET /api/notifications`
 * (auth required, cursor-paginated) with `PATCH /api/notifications/read` for
 * mark-as-read. Signed-out users get [needsAuth] and a sign-in path instead
 * of demo content.
 */
data class NotificationsUiState(
    val loading: Boolean = false,
    val loadingMore: Boolean = false,
    val error: String? = null,
    val needsAuth: Boolean = false,
    val items: List<SocialNotificationDto> = emptyList(),
    val unreadCount: Int = 0,
    val nextCursor: Long? = null,
    val endReached: Boolean = false,
    val locallyRead: Set<String> = emptySet(),
)

@HiltViewModel
class NotificationsViewModel @Inject constructor(
    private val api: RnApi,
    private val session: SessionStore,
) : ViewModel() {

    private val _state = MutableStateFlow(NotificationsUiState())
    val state: StateFlow<NotificationsUiState> = _state.asStateFlow()

    init {
        load()
    }

    fun load() {
        if (!session.isSignedIn) {
            _state.value = _state.value.copy(loading = false, needsAuth = true, items = emptyList())
            return
        }
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null, needsAuth = false)
        viewModelScope.launch {
            applyPage(runCatching { api.notifications() }.getOrNull(), replace = true)
        }
    }

    fun loadMore() {
        val current = _state.value
        if (current.loading || current.loadingMore || current.endReached || current.nextCursor == null) return
        _state.value = current.copy(loadingMore = true)
        viewModelScope.launch {
            applyPage(runCatching { api.notifications(cursor = current.nextCursor) }.getOrNull(), replace = false)
        }
    }

    /** Mark everything read (server + local mirror). */
    fun markAllRead() {
        viewModelScope.launch {
            val result = runCatching { api.markNotificationsRead(MarkNotificationsReadRequest(all = true)) }.getOrNull()
            if (result != null && result.isSuccessful) {
                _state.value = _state.value.copy(
                    unreadCount = 0,
                    locallyRead = _state.value.items.map { it.id }.toSet(),
                )
            } else {
                _state.value = _state.value.copy(error = "Couldn't mark notifications read")
            }
        }
    }

    fun isUnread(item: SocialNotificationDto): Boolean =
        item.readAt == null && item.id !in _state.value.locallyRead

    fun dismissError() {
        _state.value = _state.value.copy(error = null)
    }

    private fun applyPage(
        response: retrofit2.Response<com.ravikisan.platform.compose.core.contract.SocialNotificationsResponse>?,
        replace: Boolean,
    ) {
        val body = response?.takeIf { it.isSuccessful }?.body()
        when {
            body == null -> _state.value = _state.value.copy(
                loading = false,
                loadingMore = false,
                error = "Couldn't load notifications — check your connection",
            )
            replace -> _state.value = _state.value.copy(
                loading = false,
                items = body.items,
                unreadCount = body.unreadCount,
                nextCursor = body.nextCursor,
                endReached = body.nextCursor == null,
                locallyRead = emptySet(),
            )
            else -> _state.value = _state.value.copy(
                loadingMore = false,
                items = _state.value.items + body.items,
                unreadCount = body.unreadCount,
                nextCursor = body.nextCursor,
                endReached = body.nextCursor == null,
            )
        }
    }
}
