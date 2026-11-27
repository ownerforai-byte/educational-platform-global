package com.ravikisan.platform.compose.ui.screens.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.UserDto
import com.ravikisan.platform.compose.data.api.AuthRepository
import com.ravikisan.platform.compose.data.fcm.FcmRegistrar
import com.ravikisan.platform.compose.data.session.SessionStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Profile state — REAL session (fake→real swap): the user card mirrors the
 * signed-in session store; Sign out deregisters the FCM token server-side
 * before the local session wipe. Unread count comes from
 * `GET /api/notifications` when signed in.
 */
data class ProfileUiState(
    val user: UserDto? = null,
    val unreadCount: Int? = null,
    val signingOut: Boolean = false,
)

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val session: SessionStore,
    private val api: com.ravikisan.platform.compose.data.api.RnApi,
    private val authRepository: AuthRepository,
    private val fcmRegistrar: FcmRegistrar,
) : ViewModel() {

    private val _state = MutableStateFlow(ProfileUiState())
    val state: StateFlow<ProfileUiState> = _state.asStateFlow()

    /** Re-read the session (entry + every resume) and probe the unread badge. */
    fun refresh() {
        val user = if (session.isSignedIn) session.getUser() else null
        _state.value = _state.value.copy(user = user, unreadCount = if (user == null) null else _state.value.unreadCount)
        if (user != null) loadUnreadCount()
    }

    private fun loadUnreadCount() {
        viewModelScope.launch {
            val result = runCatching { api.notifications() }.getOrNull()
            val body = result?.takeIf { it.isSuccessful }?.body()
            if (body != null) {
                _state.value = _state.value.copy(unreadCount = body.unreadCount)
            }
        }
    }

    fun signOut() {
        if (_state.value.signingOut) return
        _state.value = _state.value.copy(signingOut = true)
        viewModelScope.launch {
            fcmRegistrar.unregisterAndSignOut(authRepository)
            _state.value = ProfileUiState(user = null, unreadCount = null)
        }
    }
}
