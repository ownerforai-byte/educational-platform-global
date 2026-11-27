package com.ravikisan.platform.compose.ui.screens.studyplan.local

import com.ravikisan.platform.compose.core.logic.ProgressEntryLite

/**
 * Journey (progress) source seam for the weekly planner — the native
 * counterpart of the website's `useJourney()` hook
 * (`frontend/components/study/use-journey.ts`, `GET /api/progress`).
 *
 * NO-WAIT: the progress/journey endpoints belong to Wave 3 Cluster A — no
 * mobile route exists in `RnApi` yet. Production binds
 * [PendingBindingJourneySource], which reports [Result.Unavailable] honestly,
 * so the planner renders the exact message the website shows when the
 * progress API fails ("Progress is unavailable, so no weak topics are
 * suggested"). [FakeJourneySource] feeds ViewModel tests with fixtures.
 */
interface JourneySource {
    sealed class Result {
        data class Fresh(val entries: List<ProgressEntryLite>) : Result()
        data class Cached(val entries: List<ProgressEntryLite>) : Result()
        data class Unavailable(val message: String) : Result()
    }

    suspend fun load(): Result
}

/** Production stand-in until the progress endpoints land (honest unavailable). */
class PendingBindingJourneySource : JourneySource {
    override suspend fun load(): JourneySource.Result =
        JourneySource.Result.Unavailable("Progress is unavailable, so no weak topics are suggested.")
}

/** Test fixture: a small journey with one in-progress and one untouched topic. */
class FakeJourneySource(
    private vararg val entries: ProgressEntryLite,
) : JourneySource {
    override suspend fun load(): JourneySource.Result = JourneySource.Result.Fresh(entries.toList())
}
