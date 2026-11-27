package com.ravikisan.platform.compose.ui.screens.srs.local

import com.ravikisan.platform.compose.core.logic.SRS_KEY
import com.ravikisan.platform.compose.data.repository.PersonalStoreRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Device-local seam for the SM-2 review state — the native counterpart of the
 * website's `localStorage` under `neb-srs:v1` (`frontend/features/srs/index.ts`
 * `readSrsStore`/`writeSrsStore`). The value is the SAME raw JSON object
 * (`{ "<cardId>": { ease, interval, reps, lapses, due } }`) the TS reads and
 * writes; `core/logic/Srs.kt::normalizeStore` parses it unchanged.
 *
 * Production binding is [PersonalSrsReviewStore] over the parent's encrypted
 * [PersonalStoreRepository]; tests use the in-memory fake.
 */
interface SrsReviewStore {
    /** Raw JSON review-state object, or null when empty. */
    suspend fun readRaw(): String?

    /** Persist raw JSON; null clears. Returns false when storage refused. */
    suspend fun writeRaw(raw: String?): Boolean
}

class PersonalSrsReviewStore @Inject constructor(
    private val personal: PersonalStoreRepository,
) : SrsReviewStore {

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
        /** Namespace-safe form of [SRS_KEY] (`:` → `-`, same record). */
        const val NAMESPACE = "neb-srs-v1"
    }
}

/** In-memory store for JVM ViewModel tests. */
class FakeSrsReviewStore(initialRaw: String? = null) : SrsReviewStore {
    var raw: String? = initialRaw
    var writes = 0

    override suspend fun readRaw(): String? = raw

    override suspend fun writeRaw(newRaw: String?): Boolean {
        raw = newRaw
        writes++
        return true
    }
}

@Module
@InstallIn(SingletonComponent::class)
object SrsStoreModule {

    @Provides
    @Singleton
    fun provideSrsReviewStore(personal: PersonalStoreRepository): SrsReviewStore =
        PersonalSrsReviewStore(personal)
}
