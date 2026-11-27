package com.ravikisan.platform.compose.data.repository

import com.ravikisan.platform.compose.core.logic.ResultKind
import com.ravikisan.platform.compose.core.logic.SearchEngine
import com.ravikisan.platform.compose.core.logic.SearchEntry

/**
 * Where the search index comes from. Production: [SyllabusSearchIndexSource]
 * builds entries from the REAL syllabus tree (fake→real swap, session 3).
 * Tests: [StaticSearchIndexSource] wraps the fake index and is available
 * synchronously, exactly like the pre-swap ViewModel.
 *
 * Relocated from `ui/screens/search/SearchViewModel.kt` (parity plan §0.5
 * task 0 / RQ-12): data-source classes belong to the data layer, so Worker 4's
 * UI tree no longer hosts them. Behavior byte-identical — a move, not a rewrite.
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
 * REAL source (session 3): builds search entries from the REAL curriculum —
 * the syllabus tree served by `GET /api/mobile/syllabus` plus each subject's
 * units from `GET /api/mobile/units?subject=<slug>` — offline-tolerant
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
                    val units = when (val unitsResult = repository.loadUnits(subject.slug)) {
                        is SyllabusRepository.Result.Fresh ->
                            (unitsResult.payload as? SyllabusRepository.Payload.Units)?.units
                        is SyllabusRepository.Result.Cached ->
                            (unitsResult.payload as? SyllabusRepository.Payload.Units)?.units
                        is SyllabusRepository.Result.Unavailable -> null
                    } ?: continue
                    for (unit in units) {
                        add(
                            SearchEntry(
                                kind = ResultKind.UNIT,
                                unitId = "${subject.slug}:${unit.slug}",
                                className = klass.name,
                                subjectName = subject.name,
                                unitTitle = unit.title,
                                matchText = unit.title,
                                snippet = "${klass.name} · ${subject.name} · ${unit.topicCount} topics",
                            ),
                        )
                    }
                }
            }
        }
    }
}
