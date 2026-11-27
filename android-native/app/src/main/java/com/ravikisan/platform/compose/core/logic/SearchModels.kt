package com.ravikisan.platform.compose.core.logic

/**
 * Search domain model + pure scoring engine.
 *
 * Relocated from `ui/screens/search/SearchModels.kt` (parity plan §0.5 task 0 /
 * RQ-12): the engine and its models are pure Kotlin with no Android or data-layer
 * dependency, so they live in `core/logic/` beside the other algorithm ports and
 * both the UI (Worker 4) and the data layer (Worker 3) can depend on them without
 * a UI↔data straddle. Behavior is byte-identical to the pre-move file — this was
 * a move, not a rewrite.
 *
 * Results always carry the unitId so the shell can navigate to `study/{unitId}`.
 */
enum class ResultKind { UNIT, TOPIC, NOTE }

data class SearchResult(
    val kind: ResultKind,
    /** Destination unit for navigation. */
    val unitId: String,
    val className: String,
    val subjectName: String,
    val unitTitle: String,
    /** The matched line itself (unit title, topic text or note heading). */
    val matchText: String,
    /** Short excerpt shown under the result. */
    val snippet: String,
    val score: Int,
)

/** One indexable line of content. Built by the local fake (later: the API). */
data class SearchEntry(
    val kind: ResultKind,
    val unitId: String,
    val className: String,
    val subjectName: String,
    val unitTitle: String,
    val matchText: String,
    val snippet: String,
)

class SearchEngine(val entries: List<SearchEntry>) {

    /**
     * Case-insensitive substring search, best-match first. Scoring is
     * KIND-AWARE: a UNIT title match (40–50) always outranks a TOPIC exact
     * match (25) or NOTE exact match (22) — the unit is the navigation target,
     * so it must win even when a topic/note line equals the query verbatim.
     * Tiebreak: shorter matchText (more specific) first.
     */
    fun search(rawQuery: String, limit: Int = DEFAULT_LIMIT): List<SearchResult> {
        val query = rawQuery.trim()
        if (query.length < MIN_QUERY_LENGTH) return emptyList()
        val q = query.lowercase()
        return entries.asSequence()
            .mapNotNull { entry ->
                val text = entry.matchText.lowercase()
                val snippet = entry.snippet.lowercase()
                val score = when (entry.kind) {
                    ResultKind.UNIT -> when {
                        text == q -> 50
                        text.startsWith(q) -> 45
                        text.contains(q) -> 40
                        snippet.contains(q) -> 5
                        else -> return@mapNotNull null
                    }
                    ResultKind.TOPIC -> when {
                        text == q -> 25
                        text.startsWith(q) -> 20
                        text.contains(q) -> 15
                        snippet.contains(q) -> 5
                        else -> return@mapNotNull null
                    }
                    ResultKind.NOTE -> when {
                        text == q -> 22
                        text.startsWith(q) -> 18
                        text.contains(q) -> 12
                        snippet.contains(q) -> 5
                        else -> return@mapNotNull null
                    }
                }
                SearchResult(
                    kind = entry.kind,
                    unitId = entry.unitId,
                    className = entry.className,
                    subjectName = entry.subjectName,
                    unitTitle = entry.unitTitle,
                    matchText = entry.matchText,
                    snippet = entry.snippet,
                    score = score,
                )
            }
            .sortedWith(compareByDescending<SearchResult> { it.score }.thenBy { it.matchText.length })
            .take(limit)
            .toList()
    }

    companion object {
        const val MIN_QUERY_LENGTH = 2
        const val DEFAULT_LIMIT = 20
    }
}
