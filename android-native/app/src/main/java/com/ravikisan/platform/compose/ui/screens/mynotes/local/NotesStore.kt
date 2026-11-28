package com.ravikisan.platform.compose.ui.screens.mynotes.local

import com.ravikisan.platform.compose.data.repository.PersonalStoreRepository
import com.ravikisan.platform.compose.data.session.AccountScope
import com.ravikisan.platform.compose.data.session.scopedNamespace
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Device-local seam for the personal notes list — the native counterpart of
 * the website's `localStorage` under `neb-my-notes:v1`
 * (`frontend/features/personal-notes/index.ts`). The value is the SAME raw
 * JSON array string the TS reads/writes; the golden-tested `PersonalNotes.kt`
 * normalizer parses it unchanged.
 *
 * Scoping matches the website's `scoped-storage.ts`: the record is namespaced
 * by the signed-in account (`u:<id>` / `anon:<id>`), so two students on one
 * device never share notes. A write is REJECTED when the account changed
 * since the read (the website's `writeNotes(loadedScope)` contract) — the
 * ViewModel surfaces the failure honestly. Legacy unscoped records are NOT
 * migrated (same policy as the website).
 *
 * Production binding is [PersonalNotesStore] over the parent's encrypted
 * [PersonalStoreRepository]; tests use the in-memory fake.
 */
interface NotesStore {
    /** Raw JSON array of notes, or null when none saved yet. */
    suspend fun readRaw(): String?

    /** Persist raw JSON; null clears. The outcome distinguishes the
     * website's two failure paths: storage refusal and the account having
     * changed since [readRaw] (the `writeNotes(loadedScope)` contract). */
    suspend fun writeRaw(raw: String?): WriteOutcome

    /** Why the last write was rejected — null after a successful write. */
    val lastRejection: RejectionReason?
}

enum class WriteOutcome { STORED, REJECTED }

enum class RejectionReason { ACCOUNT_CHANGED, STORAGE_REFUSED }

class PersonalNotesStore @Inject constructor(
    private val personal: PersonalStoreRepository,
    private val scope: AccountScope,
) : NotesStore {

    /** Scope the notes were last read under (website `loadedScope`). */
    private var loadedScope: String? = null

    override var lastRejection: RejectionReason? = null
        private set

    override suspend fun readRaw(): String? {
        val current = scope.current()
        loadedScope = current
        return personal.read(scopedNamespace(NAMESPACE, current))
    }

    override suspend fun writeRaw(raw: String?): WriteOutcome = try {
        val current = scope.current()
        when {
            loadedScope != null && loadedScope != current -> {
                // Another account took over — never write A's notes under B.
                lastRejection = RejectionReason.ACCOUNT_CHANGED
                WriteOutcome.REJECTED
            }
            raw == null -> {
                personal.delete(scopedNamespace(NAMESPACE, current))
                lastRejection = null
                WriteOutcome.STORED
            }
            else -> {
                personal.write(scopedNamespace(NAMESPACE, current), raw)
                lastRejection = null
                WriteOutcome.STORED
            }
        }
    } catch (_: Exception) {
        lastRejection = RejectionReason.STORAGE_REFUSED
        WriteOutcome.REJECTED
    }

    companion object {
        /** Namespace-safe form of `MY_NOTES_KEY` (`:` → `-`, same record). */
        const val NAMESPACE = "neb-my-notes-v1"
    }
}

/** In-memory store for JVM ViewModel tests. */
class FakeNotesStore(initialRaw: String? = null) : NotesStore {
    var raw: String? = initialRaw
    var writes = 0
    /** When set, the next write is rejected with this reason. */
    var rejectNextWith: RejectionReason? = null

    override var lastRejection: RejectionReason? = null

    override suspend fun readRaw(): String? = raw

    override suspend fun writeRaw(newRaw: String?): WriteOutcome {
        val rejection = rejectNextWith
        return if (rejection != null) {
            rejectNextWith = null
            lastRejection = rejection
            WriteOutcome.REJECTED
        } else {
            raw = newRaw
            writes++
            lastRejection = null
            WriteOutcome.STORED
        }
    }
}

@Module
@InstallIn(SingletonComponent::class)
object NotesStoreModule {

    @Provides
    @Singleton
    fun provideNotesStore(
        personal: PersonalStoreRepository,
        scope: com.ravikisan.platform.compose.data.session.AccountScope,
    ): NotesStore = PersonalNotesStore(personal, scope)
}
