package com.ravikisan.platform.compose.ui.screens.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.UserDto
import com.ravikisan.platform.compose.data.api.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** State for the auth screens. UI (Agent 4-owned screens render it; this VM is Agent 3). */
data class AuthUiState(
    val loading: Boolean = false,
    val error: String? = null,
    val info: String? = null,
    val signedInUser: UserDto? = null,
)

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val repository: AuthRepository,
) : ViewModel() {

    private val _state = MutableStateFlow(AuthUiState())
    val state: StateFlow<AuthUiState> = _state.asStateFlow()

    fun login(email: String, password: String) = submit {
        repository.login(email, password)
    }

    fun signup(fullName: String, email: String, password: String) = submit {
        repository.signup(fullName, email, password)
    }

    /** Re-validate a stored session on app start (wipes dead tokens). */
    fun refreshSession() {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null)
        viewModelScope.launch {
            when (val result = repository.refreshMe()) {
                is AuthRepository.Result.Success ->
                    _state.value = AuthUiState(signedInUser = result.user)
                is AuthRepository.Result.Failure ->
                    _state.value = AuthUiState(error = result.message)
            }
        }
    }

    fun signOut() {
        repository.signOut()
        _state.value = AuthUiState()
    }

    fun clearError() {
        _state.value = _state.value.copy(error = null, info = null)
    }

    private fun submit(block: suspend () -> AuthRepository.Result) {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null, info = null)
        viewModelScope.launch {
            when (val result = block()) {
                is AuthRepository.Result.Success ->
                    _state.value = AuthUiState(signedInUser = result.user, info = result.message)
                is AuthRepository.Result.Failure ->
                    _state.value = _state.value.copy(loading = false, error = result.message)
            }
        }
    }
}
