package com.ravikisan.platform.compose.ui.screens.mynotes

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.NoteDraft
import com.ravikisan.platform.compose.core.logic.PersonalNote
import com.ravikisan.platform.compose.core.logic.addNote
import com.ravikisan.platform.compose.core.logic.filterNotes
import com.ravikisan.platform.compose.core.logic.removeNote
import com.ravikisan.platform.compose.core.logic.updateNote
import com.ravikisan.platform.compose.core.logic.validateNote
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.mynotes.local.NotesStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * My Notes state (/my-notes) — mirrors `MyNotesView`
 * (`frontend/components/study/my-notes-view.tsx`): the student's own notes and
 * annotations, device-local through [NotesStore], every mutation computed by
 * the golden-tested `core/logic/PersonalNotes.kt` rules and persisted as the
 * same JSON the website stores. Subject names for the filter come from the
 * live syllabus catalog (offline-tolerant).
 */
data class MyNotesUiState(
    val notes: List<PersonalNote> = emptyList(),
    val draft: NoteDraft = com.ravikisan.platform.compose.core.logic.EMPTY_DRAFT,
    /** When set, the draft edits this note id. */
    val editingId: String? = null,
    val error: String? = null,
    val query: String = "",
    /** Empty string = all subjects (website filter semantics). */
    val subjectFilter: String = "",
    val catalog: List<GoalSubject> = emptyList(),
) {
    /** [filterNotes] output — what the screen renders. */
    val shown: List<PersonalNote> get() = filterNotes(notes, query, subjectFilter)

    val isEmptyLibrary: Boolean get() = notes.isEmpty()
}

@HiltViewModel
class MyNotesViewModel @Inject constructor(
    private val store: NotesStore,
    private val syllabus: SyllabusRepository,
) : ViewModel() {

    internal var scope: CoroutineScope = viewModelScope

    constructor(store: NotesStore, syllabus: SyllabusRepository, scope: CoroutineScope) : this(store, syllabus) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(MyNotesUiState())
    val state: StateFlow<MyNotesUiState> = _state.asStateFlow()

    init {
        scope.launch {
            val notes = decodeNotes(store.readRaw())
            _state.value = _state.value.copy(notes = notes)
            val catalog = runCatching {
                when (val result = syllabus.load()) {
                    is SyllabusRepository.Result.Fresh ->
                        (result.payload as? SyllabusRepository.Payload.SyllabusTree)
                            ?.let { goalCatalogFrom(it.classes) }
                    is SyllabusRepository.Result.Cached ->
                        (result.payload as? SyllabusRepository.Payload.SyllabusTree)
                            ?.let { goalCatalogFrom(it.classes) }
                    is SyllabusRepository.Result.Unavailable -> null
                }
            }.getOrNull() ?: emptyList()
            _state.value = _state.value.copy(catalog = catalog)
        }
    }

    /** Catalog keys only (the UI shows names via [catalog] lookup). */
    private fun goalCatalogFrom(classes: List<com.ravikisan.platform.compose.core.contract.MobileClassDto>) =
        com.ravikisan.platform.compose.ui.screens.studyplan.goalSubjectsFrom(classes)

    fun onDraftChanged(draft: NoteDraft) {
        _state.value = _state.value.copy(draft = draft)
    }

    fun onQueryChanged(query: String) {
        _state.value = _state.value.copy(query = query)
    }

    fun onSubjectFilterChanged(subjectKey: String) {
        _state.value = _state.value.copy(subjectFilter = subjectKey)
    }

    /** Start editing an existing note (draft is preloaded from it). */
    fun startEditing(note: PersonalNote) {
        _state.value = _state.value.copy(
            editingId = note.id,
            draft = NoteDraft(
                title = note.title,
                body = note.body,
                quote = note.quote,
                subjectKey = note.subjectKey,
            ),
            error = null,
        )
    }

    fun cancelEditing() {
        _state.value = _state.value.copy(
            editingId = null,
            draft = com.ravikisan.platform.compose.core.logic.EMPTY_DRAFT,
            error = null,
        )
    }

    /**
     * Validate → add/update → persist. Returns true when the note was saved
     * (false leaves the error message in state, exactly like the website).
     */
    fun saveDraft(nowIso: String, nowMs: Long): Boolean {
        val current = _state.value
        val problem = validateNote(current.draft)
        if (problem != null) {
            _state.value = current.copy(error = problem)
            return false
        }
        val editing = current.editingId
        val next = if (editing != null) {
            updateNote(current.notes, editing, current.draft, nowIso)
        } else {
            addNote(current.notes, current.draft, newNoteId(nowMs, current.notes.size), nowIso)
        }
        _state.value = current.copy(
            notes = next,
            editingId = null,
            draft = com.ravikisan.platform.compose.core.logic.EMPTY_DRAFT,
            error = null,
        )
        scope.launch {
            if (!store.writeRaw(encodeNotes(next))) {
                _state.value = _state.value.copy(error = "Couldn't save — device storage refused the write.")
            }
        }
        return true
    }

    fun deleteNote(id: String) {
        val next = removeNote(_state.value.notes, id)
        _state.value = _state.value.copy(notes = next)
        scope.launch {
            store.writeRaw(encodeNotes(next))
        }
    }

    /** Human subject name for a note's `classSlug/subjectSlug` key, or null. */
    fun subjectName(key: String): String? =
        _state.value.catalog.firstOrNull { it.key == key }?.subjectName
}
