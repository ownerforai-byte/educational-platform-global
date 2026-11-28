package com.ravikisan.platform.compose.ui.screens.study

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
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
    val notes: List<MobileNoteItemDto> = emptyList(),
    val notesLoading: Boolean = false,
    val notesError: String? = null,
    val notesFromCache: Boolean = false,
)

@HiltViewModel
class SyllabusViewModel @Inject constructor(
    private val repository: SyllabusRepository,
) : ViewModel() {

    internal var scope: CoroutineScope = viewModelScope

    constructor(repository: SyllabusRepository, scope: CoroutineScope) : this(repository) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(SyllabusUiState())
    val state: StateFlow<SyllabusUiState> = _state.asStateFlow()
    private var notesJob: Job? = null

    /** Load (or re-load) the class → subject tree. Cold start safe. */
    fun loadTree() {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null)
        scope.launch {
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
    fun loadUnits(subjectSlug: String, classSlug: String? = null) {
        if (_state.value.unitsLoading) return
        _state.value = _state.value.copy(unitsLoading = true, error = null, units = emptyList())
        scope.launch {
            when (val result = repository.loadUnits(subjectSlug, classSlug)) {
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

    /** Load the complete subject-filtered notes catalog, following opaque cursors. */
    fun loadNotes(subjectSlug: String) {
        notesJob?.cancel()
        _state.value = _state.value.copy(
            notes = emptyList(),
            notesLoading = true,
            notesError = null,
            notesFromCache = false,
        )
        notesJob = scope.launch {
            val collected = mutableListOf<MobileNoteItemDto>()
            var cursor: String? = null
            var usedCache = false
            do {
                when (val result = repository.loadNotes(subject = subjectSlug, cursor = cursor, limit = 100)) {
                    is SyllabusRepository.Result.Unavailable -> {
                        if (collected.isNotEmpty()) {
                            // The first catalog page is Room-cached. If later cursor pages
                            // cannot be fetched offline, keep the usable saved prefix honest.
                            _state.value = _state.value.copy(
                                notes = collected,
                                notesLoading = false,
                                notesFromCache = true,
                            )
                        } else {
                            _state.value = _state.value.copy(notesLoading = false, notesError = result.message)
                        }
                        return@launch
                    }
                    is SyllabusRepository.Result.Fresh -> {
                        val page = result.payload as? SyllabusRepository.Payload.NoteCatalog
                        if (page == null) {
                            _state.value = _state.value.copy(notesLoading = false, notesError = "Notes catalog unavailable")
                            return@launch
                        }
                        collected += page.items
                        cursor = page.nextCursor
                    }
                    is SyllabusRepository.Result.Cached -> {
                        usedCache = true
                        val page = result.payload as? SyllabusRepository.Payload.NoteCatalog
                        if (page == null) {
                            _state.value = _state.value.copy(notesLoading = false, notesError = "Saved notes catalog is unavailable")
                            return@launch
                        }
                        collected += page.items
                        // The repository caches only the first page. Never replay its
                        // cursor against the same cached page during offline pagination.
                        cursor = null
                    }
                }
            } while (cursor != null)
            _state.value = _state.value.copy(
                notes = collected,
                notesLoading = false,
                notesFromCache = usedCache,
            )
        }
    }

    /** Leaving a curriculum level clears its transient lists. */
    fun closeUnits() {
        _state.value = _state.value.copy(units = emptyList(), unitsFromCache = false, error = null)
    }

    fun closeNotes() {
        notesJob?.cancel()
        _state.value = _state.value.copy(notes = emptyList(), notesLoading = false, notesError = null, notesFromCache = false)
    }

    fun dismissError() {
        _state.value = _state.value.copy(error = null)
    }
}
