package com.ravikisan.platform.compose.ui.screens.notes

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MobileNoteItemDto
import com.ravikisan.platform.compose.data.repository.NoteContentMapper
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** One note row of the archive (r-notes catalog item). */
data class ArchiveNote(
    val id: String,
    val subject: String,
    val chapter: String,
    val title: String,
    val noteCount: Int,
)

/** One subject group of the archive, with the website's 30-row cap. */
data class ArchiveGroup(
    val subject: String,
    val notes: List<ArchiveNote>,
    /** Rows hidden by the per-subject cap; shown as "N more notes". */
    val hidden: Int,
)

/** Opened note content (reader sections mapped from r-notes HTML blocks). */
data class ArchiveReader(
    val id: String,
    val title: String,
    val intro: String,
    val sections: List<ReaderBlock>,
    val fromCache: Boolean,
)

data class ReaderBlock(val heading: String, val paragraphs: List<String>)

/**
 * State for `/notes` — the notes archive: subject chips, one search box and
 * the grouped result list, exactly like `SubjectSearch`
 * (`frontend/components/layout/subject-search.tsx`), plus the reader that the
 * website opens on `/notes/view`.
 */
data class NotesArchiveUiState(
    val loading: Boolean = false,
    val error: String? = null,
    val fromCache: Boolean = false,
    val query: String = "",
    /** Null = "All Subjects" (the website's default active filter). */
    val activeSubject: String? = null,
    val items: List<ArchiveNote> = emptyList(),
    val nextCursor: String? = null,
    val loadingMore: Boolean = false,
    val reader: ArchiveReader? = null,
    val readerLoading: Boolean = false,
) {

    /**
     * [SubjectSearch.filteredGroups] semantics: subject filter first, then the
     * case-insensitive query over title/subject/unit(breadcrumb), dropping
     * groups left empty. Each group is capped at [GROUP_CAP].
     */
    val groups: List<ArchiveGroup>
        get() {
            val bySubject = if (activeSubject == null) items else items.filter { it.subject == activeSubject }
            val q = query.trim().lowercase()
            val filtered = if (q.isEmpty()) {
                bySubject
            } else {
                bySubject.filter { note ->
                    note.title.lowercase().contains(q) ||
                        note.subject.lowercase().contains(q) ||
                        note.chapter.lowercase().contains(q)
                }
            }
            return filtered.groupBy { it.subject }
                .toSortedMap()
                .map { (subject, notes) ->
                    ArchiveGroup(
                        subject = subject,
                        notes = notes.take(GROUP_CAP),
                        hidden = (notes.size - GROUP_CAP).coerceAtLeast(0),
                    )
                }
        }

    /** Result counter shown only while a query is active (website behaviour). */
    val resultCount: Int
        get() = if (query.isBlank()) 0 else groups.sumOf { it.notes.size }

    /** Subjects with at least one note, for the chip row (count = before cap). */
    val subjectChips: List<Pair<String, Int>>
        get() = items.groupingBy { it.subject }.eachCount().toSortedMap().toList()

    val endReached: Boolean get() = nextCursor == null

    companion object {
        const val GROUP_CAP = 30
    }
}

/**
 * `/notes` ViewModel — REAL data through [SyllabusRepository]
 * (`GET /api/mobile/notes` first page + cursor paging, `GET /api/r-notes/:id`
 * for the reader) with the Room cache serving airplane mode, per the plan's
 * offline-tolerance contract (fresh → cache; failure → cache; else error).
 */
@HiltViewModel
class NotesArchiveViewModel @Inject constructor(
    private val repository: SyllabusRepository,
) : ViewModel() {

    internal var scope: CoroutineScope = viewModelScope

    constructor(repository: SyllabusRepository, scope: CoroutineScope) : this(repository) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(NotesArchiveUiState())
    val state: StateFlow<NotesArchiveUiState> = _state.asStateFlow()

    /** Initial archive load (page 1). Also the retry path. */
    fun load() {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null)
        scope.launch {
            when (val result = repository.loadNotes()) {
                is SyllabusRepository.Result.Fresh -> applyPage(result.payload, fromCache = false)
                is SyllabusRepository.Result.Cached -> applyPage(result.payload, fromCache = true)
                is SyllabusRepository.Result.Unavailable -> _state.value = _state.value.copy(
                    loading = false,
                    error = result.message,
                )
            }
        }
    }

    /** "Load more" — cursor pages are transient (not cached), same as the repo. */
    fun loadMore() {
        val cursor = _state.value.nextCursor ?: return
        if (_state.value.loadingMore) return
        _state.value = _state.value.copy(loadingMore = true)
        scope.launch {
            val result = repository.loadNotes(cursor = cursor)
            val page = when (result) {
                is SyllabusRepository.Result.Fresh -> result.payload
                is SyllabusRepository.Result.Cached -> result.payload
                is SyllabusRepository.Result.Unavailable -> null
            }
            if (page is SyllabusRepository.Payload.NoteCatalog) {
                _state.value = _state.value.copy(
                    items = _state.value.items + page.items.map { it.toArchiveNote() },
                    nextCursor = page.nextCursor,
                )
            }
            _state.value = _state.value.copy(loadingMore = false)
        }
    }

    private fun applyPage(payload: SyllabusRepository.Payload, fromCache: Boolean) {
        val page = payload as? SyllabusRepository.Payload.NoteCatalog
        _state.value = _state.value.copy(
            loading = false,
            fromCache = fromCache,
            items = page?.items.orEmpty().map { it.toArchiveNote() },
            nextCursor = page?.nextCursor,
        )
    }

    fun onQueryChanged(query: String) {
        _state.value = _state.value.copy(query = query)
    }

    /** Chip toggle; tapping the active subject returns to "All Subjects". */
    fun onSubjectSelected(subject: String?) {
        _state.value = _state.value.copy(activeSubject = subject)
    }

    /** Open one note in the in-screen reader (`/notes/view` counterpart). */
    fun openNote(id: String) {
        _state.value = _state.value.copy(readerLoading = true, reader = null)
        scope.launch {
            when (val result = repository.loadNoteContent(id)) {
                is SyllabusRepository.Result.Fresh -> render(result.payload, fromCache = false)
                is SyllabusRepository.Result.Cached -> render(result.payload, fromCache = true)
                is SyllabusRepository.Result.Unavailable -> _state.value = _state.value.copy(
                    readerLoading = false,
                    error = result.message,
                )
            }
        }
    }

    private fun render(payload: SyllabusRepository.Payload, fromCache: Boolean) {
        val note = (payload as? SyllabusRepository.Payload.NoteContent)?.note
        if (note == null) {
            _state.value = _state.value.copy(readerLoading = false, error = "Note content unavailable")
            return
        }
        val mapped = NoteContentMapper.map(note)
        _state.value = _state.value.copy(
            readerLoading = false,
            reader = ArchiveReader(
                id = note.id,
                title = mapped.title,
                intro = mapped.intro,
                sections = mapped.sections.map { ReaderBlock(it.heading, it.paragraphs) },
                fromCache = fromCache,
            ),
        )
    }

    fun closeNote() {
        _state.value = _state.value.copy(reader = null, readerLoading = false)
    }

    fun dismissError() {
        _state.value = _state.value.copy(error = null)
    }
}

private fun MobileNoteItemDto.toArchiveNote(): ArchiveNote = ArchiveNote(
    id = id,
    subject = subject,
    chapter = chapter,
    title = title,
    noteCount = noteCount,
)
