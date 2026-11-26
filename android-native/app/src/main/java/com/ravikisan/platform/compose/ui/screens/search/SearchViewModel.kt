package com.ravikisan.platform.compose.ui.screens.search

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.search.local.FakeSearchIndex
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Where the search index comes from. Production: [SyllabusSearchIndexSource]
 * builds entries from the REAL syllabus tree (fake→real swap, session 3).
 * Tests: [StaticSearchIndexSource] wraps the fake index and is available
 * synchronously, exactly like the pre-swap ViewModel.
 */
interface SearchIndexSource {
    suspend fun index(): List<SearchEntry>
}

/** Test/demo source — serves a fixed entry list immediately (no async load). */
class StaticSearchIndexSource(val entries: List<SearchEntry>) : SearchIndexSource {
    override suspend fun index(): List<SearchEntry> = entries
}

/** Convenience for tests: wrap a prebuilt engine's entries. */
fun SearchEngine.asSource(): SearchIndexSource = StaticSearchIndexSource(entries)

/**
 * REAL source (session 3): builds search entries from the syllabus tree served
 * by `GET /api/mobile/syllabus` (classes → subjects → units), offline-tolerant
 * through the Room cache. Unit ids use the same `<subjectSlug>:<unitSlug>`
 * route string the study screens navigate with.
 */
class SyllabusSearchIndexSource(
    private val repository: SyllabusRepository,
) : SearchIndexSource {
    override suspend fun index(): List<SearchEntry> {
        val classes = when (val result = repository.load()) {
            is SyllabusRepository.Result.Fresh ->
                (result.payload as? SyllabusRepository.Payload.SyllabusTree)?.classes
            is SyllabusRepository.Result.Cached ->
                (result.payload as? SyllabusRepository.Payload.SyllabusTree)?.classes
            is SyllabusRepository.Result.Unavailable -> null
        } ?: return emptyList()
        return buildList {
            for (klass in classes) {
                for (subject in klass.subjects) {
                    add(
                        SearchEntry(
                            kind = ResultKind.UNIT,
                            unitId = "${subject.slug}:@subject",
                            className = klass.name,
                            subjectName = subject.name,
                            unitTitle = subject.name,
                            matchText = subject.name,
                            snippet = "${klass.name} · ${subject.name}",
                        ),
                    )
                }
            }
        }
    }
}

/**
 * Search state holder — REAL index (session 3). Query in, scored results out.
 * With [StaticSearchIndexSource] (tests) the engine is ready on the calling
 * thread; with [SyllabusSearchIndexSource] it loads asynchronously and
 * [indexLoading] gates the UI until it lands.
 */
class SearchViewModel(
    private val source: SearchIndexSource,
) : ViewModel() {

    /** Test-compatible constructor: a prebuilt engine, available immediately. */
    constructor(engine: SearchEngine) : this(engine.asSource())

    private val _query = MutableStateFlow("")
    val query: StateFlow<String> = _query.asStateFlow()

    private val _results = MutableStateFlow<List<SearchResult>>(emptyList())
    val results: StateFlow<List<SearchResult>> = _results.asStateFlow()

    private val _indexLoading = MutableStateFlow(source !is StaticSearchIndexSource)
    val indexLoading: StateFlow<Boolean> = _indexLoading.asStateFlow()

    private var engine: SearchEngine? =
        (source as? StaticSearchIndexSource)?.let { SearchEngine(it.entries) }

    init {
        if (engine == null) refreshIndex()
    }

    /** Rebuild the index (initial load and manual retry after a failure). */
    fun refreshIndex() {
        _indexLoading.value = true
        viewModelScope.launch {
            val entries = runCatching { source.index() }.getOrDefault(emptyList())
            engine = SearchEngine(entries)
            _indexLoading.value = false
            recompute()
        }
    }

    /** True once the user has typed a query long enough to search. */
    val hasSearched: Boolean get() = _query.value.trim().length >= SearchEngine.MIN_QUERY_LENGTH

    fun onQueryChanged(newQuery: String) {
        _query.value = newQuery
        recompute()
    }

    private fun recompute() {
        val currentEngine = engine
        _results.value = if (currentEngine == null) emptyList() else currentEngine.search(_query.value)
    }

    fun clear() = onQueryChanged("")
}
