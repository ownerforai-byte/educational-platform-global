package com.ravikisan.platform.compose.ui.screens

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileHomeFeatures
import com.ravikisan.platform.compose.core.contract.UserDto
import com.ravikisan.platform.compose.data.api.AuthRepository
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.fcm.FcmRegistrar
import com.ravikisan.platform.compose.data.repository.RecentUnit
import com.ravikisan.platform.compose.data.repository.RecentUnitsStore
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Home dashboard state. One cold-start pass:
 * 1. `GET /api/mobile/home` — live feature flags (bootstrap, never blocks UI);
 * 2. `GET /api/mobile/syllabus` through [SyllabusRepository] — subject
 *    quick-launch cards, Room-cached for airplane mode;
 * 3. session validation via `GET /api/auth/me` — the auth banner reflects the
 *    REAL signed-in state (dead tokens wipe to signed-out);
 * 4. device-local recents — the "continue studying" row;
 * 5. silent FCM registration for the signed-in user (best-effort, legacy rule).
 */
data class HomeUiState(
    val loading: Boolean = false,
    val fromCache: Boolean = false,
    val error: String? = null,
    val classes: List<MobileClassDto> = emptyList(),
    val recents: List<RecentUnit> = emptyList(),
    val user: UserDto? = null,
    val sessionChecked: Boolean = false,
    val features: MobileHomeFeatures? = null,
)

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val syllabusRepository: SyllabusRepository,
    private val api: RnApi,
    private val authRepository: AuthRepository,
    private val recents: RecentUnitsStore,
    private val fcmRegistrar: FcmRegistrar,
) : ViewModel() {

    private val _state = MutableStateFlow(HomeUiState())
    val state: StateFlow<HomeUiState> = _state.asStateFlow()

    init {
        // Silent best-effort FCM token registration on app open (legacy rule).
        fcmRegistrar.registerForSignedInUser()
        refresh()
    }

    /** Reload everything shown on the dashboard (pull-to-refresh / retry). */
    fun refresh() {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null)
        viewModelScope.launch {
            // Session first — the banner must reflect the validated state.
            when (val session = authRepository.refreshMe()) {
                is AuthRepository.Result.Success -> _state.value = _state.value.copy(
                    user = session.user ?: _state.value.user,
                    sessionChecked = true,
                )
                is AuthRepository.Result.Failure -> _state.value = _state.value.copy(
                    user = null,
                    sessionChecked = true,
                )
            }

            // Bootstrap flags — cheap, never fatal.
            runCatching { api.mobileHome() }.getOrNull()?.body()?.data?.features?.let { features ->
                _state.value = _state.value.copy(features = features)
            }

            // Subject quick-launch tree (offline-tolerant).
            when (val result = syllabusRepository.load()) {
                is SyllabusRepository.Result.Fresh -> _state.value = _state.value.copy(
                    loading = false,
                    classes = (result.payload as SyllabusRepository.Payload.SyllabusTree).classes,
                    fromCache = false,
                )
                is SyllabusRepository.Result.Cached -> _state.value = _state.value.copy(
                    loading = false,
                    classes = (result.payload as SyllabusRepository.Payload.SyllabusTree).classes,
                    fromCache = true,
                )
                is SyllabusRepository.Result.Unavailable -> _state.value = _state.value.copy(
                    loading = false,
                    error = result.message,
                )
            }

            _state.value = _state.value.copy(recents = recents.recent())
        }
    }

    fun dismissError() {
        _state.value = _state.value.copy(error = null)
    }
}
