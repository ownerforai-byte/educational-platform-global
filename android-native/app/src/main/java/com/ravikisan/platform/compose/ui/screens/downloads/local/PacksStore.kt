package com.ravikisan.platform.compose.ui.screens.downloads.local

import com.ravikisan.platform.compose.data.repository.PersonalStoreRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Singleton

/** One saved offline pack — the website's `StoredPack` record verbatim. */
data class StoredPack(
    val id: String,
    val title: String,
    /** ISO instant of the save. */
    val savedAt: String,
    /** Full unit-pack markdown. */
    val markdown: String,
    /** Total items (theory + formulas + drills + questions). */
    val count: Int,
)

/**
 * Device-local seam for saved offline packs — the native counterpart of the
 * website's `localStorage` under `neb-offline-packs:v1`
 * (`frontend/components/study/downloads-view.tsx`). The value is the SAME
 * `Record<packId, StoredPack>` JSON the TS writes; nothing here is authored.
 *
 * Like the website: NO file downloads — packs stay inside the app and are
 * readable with no connection at all. Production binding is
 * [PersonalPacksStore] over the parent's encrypted [PersonalStoreRepository].
 */
interface PacksStore {
    /** Raw `Record<packId, StoredPack>` JSON, or null when none saved. */
    suspend fun readRaw(): String?

    /** Persist raw JSON; null clears. Returns false when storage refused. */
    suspend fun writeRaw(raw: String?): Boolean
}

class PersonalPacksStore @Inject constructor(
    private val personal: PersonalStoreRepository,
) : PacksStore {

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
        /** Namespace-safe form of the website's `neb-offline-packs:v1` key. */
        const val NAMESPACE = "neb-offline-packs-v1"
    }
}

/** In-memory store for JVM ViewModel tests. */
class FakePacksStore(initialRaw: String? = null) : PacksStore {
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
object PacksStoreModule {

    @Provides
    @Singleton
    fun providePacksStore(personal: PersonalStoreRepository): PacksStore =
        PersonalPacksStore(personal)
}
