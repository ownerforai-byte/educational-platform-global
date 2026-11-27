package com.ravikisan.platform.compose.ui.screens.search

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.logic.SearchEngine
import com.ravikisan.platform.compose.core.logic.SearchResult
import com.ravikisan.platform.compose.data.repository.SearchIndexSource
import com.ravikisan.platform.compose.data.repository.StaticSearchIndexSource
import com.ravikisan.platform.compose.data.repository.SyllabusSearchIndexSource
import com.ravikisan.platform.compose.data.repository.asSource
import com.ravikisan.platform.compose.ui.screens.search.local.FakeSearchIndex
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Search state holder — REAL index (session 3). Query in, scored results out.
 * Production binds [SyllabusSearchIndexSource] through Hilt; with
 * [StaticSearchIndexSource] (tests) the engine is ready on the calling
 * thread, otherwise [indexLoading] gates the UI until it lands.
 *
 * The [SearchIndexSource] implementations moved to `data/repository/`
 * (parity plan §0.5 task 0 / RQ-12) — this file is UI-only now.
 */
@HiltViewModel
class SearchViewModel @Inject constructor(
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
