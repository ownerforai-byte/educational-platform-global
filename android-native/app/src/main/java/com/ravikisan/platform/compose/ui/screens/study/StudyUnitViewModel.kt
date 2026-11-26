package com.ravikisan.platform.compose.ui.screens.study

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.data.repository.NoteContentMapper
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * One reader section mapped from real note content (r-notes HTML blocks).
 * Kept UI-shape-agnostic so the screen maps it onto NoteReader components.
 */
data class ReaderSectionUi(val heading: String, val paragraphs: List<String>)

/**
 * State for the unit reader screen.
 *
 * Route arg format (set by SyllabusScreen — navigation is untouched):
 *   `<subjectSlug>:<unitSlug>` — legacy plain unit ids resolve via the fake
 *   ONLY in unit tests; the UI never falls back to fakes.
 */
data class StudyUnitUiState(
    val loading: Boolean = false,
    val error: String? = null,
    val fromCache: Boolean = false,
    val subjectSlug: String = "",
    val unit: MobileUnitDto? = null,
    val noteTitle: String = "",
    val noteIntro: String = "",
    val sections: List<ReaderSectionUi> = emptyList(),
    val noteFromCache: Boolean = false,
)

@HiltViewModel
class StudyUnitViewModel @Inject constructor(
    private val repository: SyllabusRepository,
) : ViewModel() {

    private val _state = MutableStateFlow(StudyUnitUiState())
    val state: StateFlow<StudyUnitUiState> = _state.asStateFlow()

    /**
     * Resolve the unit metadata (units endpoint, offline-tolerant) and then the
     * note content chain: catalog (`/api/mobile/notes?chapter=<unit title>`)
     * → content (`/api/r-notes/:id`). Every hop serves the Room cache offline.
     */
    fun load(routeArg: String) {
        val parts = routeArg.split(":", limit = 2)
        if (parts.size != 2 || parts.any { it.isBlank() }) {
            _state.value = StudyUnitUiState(error = "Open a unit from the syllabus list")
            return
        }
        val subjectSlug = parts[0]
        val unitSlug = parts[1]
        _state.value = StudyUnitUiState(loading = true, subjectSlug = subjectSlug)
        viewModelScope.launch {
            // 1. Unit metadata.
            when (val unitsResult = repository.loadUnits(subjectSlug)) {
                is SyllabusRepository.Result.Unavailable -> {
                    _state.value = StudyUnitUiState(error = unitsResult.message, subjectSlug = subjectSlug)
                    return@launch
                }
                else -> {
                    val units = payloadUnits(unitsResult)
                    val unit = units.firstOrNull { it.slug == unitSlug }
                    if (unit == null) {
                        _state.value = StudyUnitUiState(
                            error = "Unit not found in $subjectSlug",
                            subjectSlug = subjectSlug,
                        )
                        return@launch
                    }
                    _state.value = _state.value.copy(
                        loading = false,
                        unit = unit,
                        fromCache = unitsResult is SyllabusRepository.Result.Cached,
                    )
                }
            }
            // 2. Notes catalog for this chapter (unit title == chapter name).
            val unit = _state.value.unit ?: return@launch
            when (val catalogResult = repository.loadNotes(subject = null, chapter = unit.title)) {
                is SyllabusRepository.Result.Unavailable -> {
                    _state.value = _state.value.copy(error = catalogResult.message)
                    return@launch
                }
                else -> {
                    val items = payloadCatalog(catalogResult)
                    _state.value = _state.value.copy(
                        noteFromCache = catalogResult is SyllabusRepository.Result.Cached,
                    )
                    val first = items.firstOrNull()
                    if (first == null) {
                        // No published notes for this chapter yet — outline still renders.
                        _state.value = _state.value.copy(noteIntro = "", sections = emptyList())
                        return@launch
                    }
                    loadNoteContent(first)
                }
            }
        }
    }

    private suspend fun loadNoteContent(item: MobileNoteItemDto) {
        when (val contentResult = repository.loadNoteContent(item.id)) {
            is SyllabusRepository.Result.Unavailable -> {
                _state.value = _state.value.copy(error = contentResult.message)
            }
            is SyllabusRepository.Result.Fresh -> renderNote(contentResult.payload, fromCache = false)
            is SyllabusRepository.Result.Cached -> renderNote(contentResult.payload, fromCache = true)
        }
    }

    private fun renderNote(payload: SyllabusRepository.Payload, fromCache: Boolean) {
        val note = (payload as? SyllabusRepository.Payload.NoteContent)?.note
        if (note == null) {
            _state.value = _state.value.copy(error = "Note content unavailable")
            return
        }
        val mapped = NoteContentMapper.map(note)
        _state.value = _state.value.copy(
            noteTitle = mapped.title,
            noteIntro = mapped.intro,
            sections = mapped.sections.map { ReaderSectionUi(it.heading, it.paragraphs) },
            noteFromCache = fromCache,
        )
    }

    fun dismissError() {
        _state.value = _state.value.copy(error = null)
    }

    private fun payloadUnits(result: SyllabusRepository.Result): List<MobileUnitDto> =
        when (result) {
            is SyllabusRepository.Result.Fresh ->
                (result.payload as? SyllabusRepository.Payload.Units)?.units ?: emptyList()
            is SyllabusRepository.Result.Cached ->
                (result.payload as? SyllabusRepository.Payload.Units)?.units ?: emptyList()
            is SyllabusRepository.Result.Unavailable -> emptyList()
        }

    private fun payloadCatalog(result: SyllabusRepository.Result): List<MobileNoteItemDto> =
        when (result) {
            is SyllabusRepository.Result.Fresh ->
                (result.payload as? SyllabusRepository.Payload.NoteCatalog)?.items ?: emptyList()
            is SyllabusRepository.Result.Cached ->
                (result.payload as? SyllabusRepository.Payload.NoteCatalog)?.items ?: emptyList()
            is SyllabusRepository.Result.Unavailable -> emptyList()
        }
}
