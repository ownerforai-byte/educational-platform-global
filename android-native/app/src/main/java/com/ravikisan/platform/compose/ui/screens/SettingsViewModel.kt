package com.ravikisan.platform.compose.ui.screens

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
 * Settings state — wired to the REAL session store and FCM registrar
 * (Phase 1 placeholders removed). [user] mirrors the signed-in session;
 * [signOut] deregisters the FCM token server-side before the local wipe
 * (legacy `unregisterAndSignOut` semantics).
 */
data class SettingsUiState(
    val user: UserDto? = null,
    val signingOut: Boolean = false,
    val message: String? = null,
)

@HiltViewModel
class SettingsViewModel @Inject constructor(
    private val session: SessionStore,
    private val authRepository: AuthRepository,
    private val fcmRegistrar: FcmRegistrar,
) : ViewModel() {

    private val _state = MutableStateFlow(SettingsUiState())
    val state: StateFlow<SettingsUiState> = _state.asStateFlow()

    /** Re-read the session (on screen entry and on every resume). */
    fun refresh() {
        _state.value = _state.value.copy(user = if (session.isSignedIn) session.getUser() else null)
    }

    /**
     * Enable push: request POST_NOTIFICATIONS on Android 13+ (needs an
     * Activity) then register the current FCM token for the signed-in user.
     */
    fun enableNotifications(activity: android.app.Activity) {
        fcmRegistrar.requestPermissionIfNeeded(activity)
        fcmRegistrar.registerForSignedInUser()
        _state.value = _state.value.copy(
            message = if (session.isSignedIn) "Registering this device for notifications"
            else "Sign in to receive notifications on this device",
        )
    }

    fun signOut() {
        if (_state.value.signingOut) return
        _state.value = _state.value.copy(signingOut = true)
        viewModelScope.launch {
            fcmRegistrar.unregisterAndSignOut(authRepository)
            _state.value = SettingsUiState(user = null, message = "Signed out")
        }
    }

    fun clearMessage() {
        _state.value = _state.value.copy(message = null)
    }
}
