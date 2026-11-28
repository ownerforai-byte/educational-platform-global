package com.ravikisan.platform.compose.ui.screens.downloads.local

import com.ravikisan.platform.compose.data.repository.PersonalStoreRepository
import com.ravikisan.platform.compose.data.session.AccountScope
import com.ravikisan.platform.compose.data.session.scopedNamespace
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
 * readable with no connection at all. The record is account-scoped like the
 * website (`neb-offline-packs:v1:u:<id>`); a write is rejected when the
 * account changed since the read, and legacy unscoped records are NOT
 * migrated (website policy). Production binding is [PersonalPacksStore] over
 * the parent's encrypted [PersonalStoreRepository].
 */
interface PacksStore {
    /** Raw `Record<packId, StoredPack>` JSON, or null when none saved. */
    suspend fun readRaw(): String?

    /** Persist raw JSON; null clears. Returns false when storage refused
     * or the account changed since [readRaw]. */
    suspend fun writeRaw(raw: String?): Boolean
}

class PersonalPacksStore @Inject constructor(
    private val personal: PersonalStoreRepository,
    private val scope: AccountScope,
) : PacksStore {

    /** Scope the packs were last read under. */
    private var loadedScope: String? = null

    override suspend fun readRaw(): String? {
        val current = scope.current()
        loadedScope = current
        return personal.read(scopedNamespace(NAMESPACE, current))
    }

    override suspend fun writeRaw(raw: String?): Boolean = try {
        val current = scope.current()
        if (loadedScope != null && loadedScope != current) {
            false
        } else if (raw == null) {
            personal.delete(scopedNamespace(NAMESPACE, current))
            true
        } else {
            personal.write(scopedNamespace(NAMESPACE, current), raw)
            true
        }
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
    fun providePacksStore(
        personal: PersonalStoreRepository,
        scope: AccountScope,
    ): PacksStore = PersonalPacksStore(personal, scope)
}
