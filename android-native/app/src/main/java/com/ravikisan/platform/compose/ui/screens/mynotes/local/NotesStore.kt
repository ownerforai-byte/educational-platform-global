package com.ravikisan.platform.compose.ui.screens.mynotes.local

import com.ravikisan.platform.compose.data.repository.PersonalStoreRepository
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
 * Native keeps ONE device scope (no multi-account scoping — that part of the
 * website's storageScope needs a browser identity; noted in the parity
 * report). Production binding is [PersonalNotesStore] over the parent's
 * encrypted [PersonalStoreRepository]; tests use the in-memory fake.
 */
interface NotesStore {
    /** Raw JSON array of notes, or null when none saved yet. */
    suspend fun readRaw(): String?

    /** Persist raw JSON; null clears. Returns false when storage refused. */
    suspend fun writeRaw(raw: String?): Boolean
}

class PersonalNotesStore @Inject constructor(
    private val personal: PersonalStoreRepository,
) : NotesStore {

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
        /** Namespace-safe form of `MY_NOTES_KEY` (`:` → `-`, same record). */
        const val NAMESPACE = "neb-my-notes-v1"
    }
}

/** In-memory store for JVM ViewModel tests. */
class FakeNotesStore(initialRaw: String? = null) : NotesStore {
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
object NotesStoreModule {

    @Provides
    @Singleton
    fun provideNotesStore(personal: PersonalStoreRepository): NotesStore =
        PersonalNotesStore(personal)
}
