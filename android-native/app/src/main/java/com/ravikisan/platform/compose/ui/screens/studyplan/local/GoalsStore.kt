package com.ravikisan.platform.compose.ui.screens.studyplan.local

import com.ravikisan.platform.compose.core.logic.STUDY_GOALS_KEY
import com.ravikisan.platform.compose.data.repository.PersonalStoreRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Device-local seam for the study-goals record — the native counterpart of
 * the website's `localStorage` under `neb-study-goals:v1`
 * (`frontend/features/study-plan/study-goals.ts`). The stored value is the
 * SAME raw JSON string the TS reads/writes, so the golden-tested
 * `core/logic/StudyGoals.kt` normalizers parse it unchanged.
 *
 * Production binding is [PersonalGoalsStore], persisted through the parent's
 * encrypted Room [PersonalStoreRepository] (AES-GCM at rest, bounded payload)
 * under a namespace-safe key derived from the website's storage key. Tests
 * use [FakeGoalsStore].
 */
interface GoalsStore {
    /** Raw JSON for the goals record, or null when never saved. */
    suspend fun readRaw(): String?

    /** Persist raw JSON; null clears the record. Returns false when storage refused. */
    suspend fun writeRaw(raw: String?): Boolean
}

/** [GoalsStore] over the encrypted personal-store boundary (Worker 3's repo). */
class PersonalGoalsStore @Inject constructor(
    private val personal: PersonalStoreRepository,
) : GoalsStore {

    override suspend fun readRaw(): String? = personal.read(NAMESPACE)

    override suspend fun writeRaw(raw: String?): Boolean = try {
        if (raw == null) {
            personal.delete(NAMESPACE)
        } else {
            personal.write(NAMESPACE, raw)
        }
        true
    } catch (_: Exception) {
        false
    }

    companion object {
        /** Namespace-safe form of [STUDY_GOALS_KEY] (`:` → `-`, same record). */
        const val NAMESPACE = "neb-study-goals-v1"
    }
}

/** In-memory store for JVM ViewModel tests (mirrors FakeStudyCache usage). */
class FakeGoalsStore(initialRaw: String? = null) : GoalsStore {
    var raw: String? = initialRaw
    var writes = 0

    override suspend fun readRaw(): String? = raw

    override suspend fun writeRaw(newRaw: String?): Boolean {
        raw = newRaw
        writes++
        return true
    }
}

/**
 * Feature-owned Hilt wiring for the device-local goals store (Agent 4's tree;
 * no shared `di/AppModule.kt` edit — the parent owns that file).
 */
@Module
@InstallIn(SingletonComponent::class)
object StudyPlanStoreModule {

    @Provides
    @Singleton
    fun provideGoalsStore(personal: PersonalStoreRepository): GoalsStore =
        PersonalGoalsStore(personal)
}
