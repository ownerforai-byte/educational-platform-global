package com.ravikisan.platform.compose.ui.screens.study

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * State for the syllabus drill-down (class → subject → units).
 * [fromCache] true = the screen is showing the offline Room cache (airplane
 * mode) — the UI must surface that honestly, not pretend it is fresh.
 */
data class SyllabusUiState(
    val loading: Boolean = false,
    val error: String? = null,
    val fromCache: Boolean = false,
    val tree: List<MobileClassDto> = emptyList(),
    val units: List<MobileUnitDto> = emptyList(),
    val unitsLoading: Boolean = false,
    val unitsFromCache: Boolean = false,
)

@HiltViewModel
class SyllabusViewModel @Inject constructor(
    private val repository: SyllabusRepository,
) : ViewModel() {

    private val _state = MutableStateFlow(SyllabusUiState())
    val state: StateFlow<SyllabusUiState> = _state.asStateFlow()

    /** Load (or re-load) the class → subject tree. Cold start safe. */
    fun loadTree() {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null)
        viewModelScope.launch {
            when (val result = repository.load()) {
                is SyllabusRepository.Result.Fresh ->
                    _state.value = SyllabusUiState(tree = (result.payload as SyllabusRepository.Payload.SyllabusTree).classes)
                is SyllabusRepository.Result.Cached -> {
                    val tree = result.payload as SyllabusRepository.Payload.SyllabusTree
                    _state.value = SyllabusUiState(tree = tree.classes, fromCache = true)
                }
                is SyllabusRepository.Result.Unavailable ->
                    _state.value = SyllabusUiState(error = result.message)
            }
        }
    }

    /** Load the units of one subject (drill-down level 3). */
    fun loadUnits(subjectSlug: String) {
        if (_state.value.unitsLoading) return
        _state.value = _state.value.copy(unitsLoading = true, error = null, units = emptyList())
        viewModelScope.launch {
            when (val result = repository.loadUnits(subjectSlug)) {
                is SyllabusRepository.Result.Fresh -> {
                    val units = result.payload as SyllabusRepository.Payload.Units
                    _state.value = _state.value.copy(unitsLoading = false, units = units.units, unitsFromCache = false)
                }
                is SyllabusRepository.Result.Cached -> {
                    val units = result.payload as SyllabusRepository.Payload.Units
                    _state.value = _state.value.copy(
                        unitsLoading = false,
                        units = units.units,
                        unitsFromCache = true,
                    )
                }
                is SyllabusRepository.Result.Unavailable ->
                    _state.value = _state.value.copy(unitsLoading = false, error = result.message)
            }
        }
    }

    /** Leaving the units level clears the unit list (fresh load on re-entry). */
    fun closeUnits() {
        _state.value = _state.value.copy(units = emptyList(), unitsFromCache = false, error = null)
    }

    fun dismissError() {
        _state.value = _state.value.copy(error = null)
    }
}
