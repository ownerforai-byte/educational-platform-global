package com.ravikisan.platform.compose.ui.screens.studyplan.local

import com.ravikisan.platform.compose.core.logic.ProgressEntryLite
import com.ravikisan.platform.compose.data.repository.JourneyRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Qualifier
import javax.inject.Singleton

/**
 * Journey (progress) source seam for the weekly planner — the native
 * counterpart of the website's `useJourney()` hook
 * (`frontend/components/study/use-journey.ts`, `GET /api/progress`).
 *
 * The backend route already exists (auth-gated, `sendSuccess` rows), so
 * production binds [MobileJourneySource] through `JourneyRepository`: real
 * journey rows mapped to `ProgressEntryLite` exactly like the website's
 * `journeyRowToEntry` (started → in-progress, completed → completed,
 * `titleize(topicSlug)` fallback labels). Signed out / 401 / network failure
 * all map to [Result.Unavailable] — the planner renders the same message the
 * website shows when the progress API fails, never invented topics.
 *
 * [PendingBindingJourneySource] remains bound UNQUALIFIED in the parent-owned
 * `di/AppModule.kt`; the qualified [bindMobileJourneySource] binding is the
 * one the screen consumes, so no shared-file edit was needed.
 * [FakeJourneySource] feeds ViewModel tests with fixtures.
 */
interface JourneySource {
    sealed class Result {
        data class Fresh(val entries: List<ProgressEntryLite>) : Result()
        data class Cached(val entries: List<ProgressEntryLite>) : Result()
        data class Unavailable(val message: String) : Result()
    }

    suspend fun load(): Result
}

/** Real journey source over the landed `GET /api/progress` route. */
class MobileJourneySource @Inject constructor(
    private val repository: JourneyRepository,
) : JourneySource {
    override suspend fun load(): JourneySource.Result = when (val result = repository.load()) {
        is JourneyRepository.Result.Fresh -> JourneySource.Result.Fresh(result.entries)
        is JourneyRepository.Result.Unavailable -> JourneySource.Result.Unavailable(result.message)
    }
}

/** Qualifier separating the real Wave 1 binding from the parent's stub. */
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class MobileJourney

@Module
@InstallIn(SingletonComponent::class)
abstract class MobileJourneySourceModule {

    @Binds
    @Singleton
    @MobileJourney
    abstract fun bindMobileJourneySource(impl: MobileJourneySource): JourneySource
}

/** Legacy parent-bound stand-in (kept compiling; no longer consumed). */
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
