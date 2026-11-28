package com.ravikisan.platform.compose.data.session

import com.ravikisan.platform.compose.data.repository.PersonalStoreRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import java.util.UUID
import javax.inject.Inject
import javax.inject.Qualifier
import javax.inject.Singleton

/**
 * Account-scoped storage suffix — the native port of the website's
 * `lib/state/scoped-storage.ts::storageScope()`:
 *
 * - signed in → `u:<userId>` (id from the validated session);
 * - signed out → `anon:<stableId>` (a UUID minted once per device, kept in
 *   the encrypted personal store).
 *
 * Two accounts on one device must never share notes, SRS review state or
 * saved packs; every device-local store in the Wave 1 batch namespaces its
 * record through this suffix. Legacy unscoped records are deliberately NOT
 * migrated — the website makes the same choice ("we cannot know which
 * account owned them, and copying them would reproduce the leak").
 */
interface AccountScope {
    /** Current scope suffix, e.g. `u:1073...` or `anon:5f2c...`. */
    suspend fun current(): String
}

@Singleton
class PersonalAccountScope @Inject constructor(
    private val session: SessionStore,
    private val personal: PersonalStoreRepository,
) : AccountScope {

    override suspend fun current(): String {
        val userId = session.getUser()?.id?.trim()?.takeIf { it.isNotEmpty() }
        return userId?.let { "u:$it" } ?: "anon:${anonId()}"
    }

    private suspend fun anonId(): String {
        val stored = runCatching { personal.read(ANON_ID_NAMESPACE) }.getOrNull()
        if (!stored.isNullOrBlank()) return stored.trim()
        val fresh = UUID.randomUUID().toString()
        // Best-effort persist: on storage failure fall back to the website's
        // constant `anon` scope (state stays usable, just not stable).
        val persisted = runCatching { personal.write(ANON_ID_NAMESPACE, fresh) }.isSuccess
        return if (persisted) fresh else "anon"
    }

    companion object {
        const val ANON_ID_NAMESPACE = "neb-anon-id-v1"
    }
}

/**
 * Namespace-safe personal-store record for one account:
 * `neb-my-notes:v1` + `u:<id>` → `neb-my-notes-v1-u-<sanitized-id>`, matching
 * `PersonalStoreRepository`'s `[a-z0-9_-]{1,64}` namespace contract and the
 * website's `key(base)` = `<base>:<scope>` shape (both `:` are dash-folded).
 */
fun scopedNamespace(base: String, scope: String): String {
    fun sanitize(value: String) = value.lowercase()
        .replace(Regex("[^a-z0-9_-]+"), "-")
        .trim('-')
    val budget = 64 - base.length - 1
    val suffix = sanitize(scope).take(budget.coerceAtLeast(1))
    return "${sanitize(base)}-$suffix"
}

/** Marks the real account-scoped store bindings (Wave 1 batch). */
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class AccountScoped

@Module
@InstallIn(SingletonComponent::class)
object AccountScopeModule {

    @Provides
    @Singleton
    fun provideAccountScope(
        session: SessionStore,
        personal: PersonalStoreRepository,
    ): AccountScope = PersonalAccountScope(session, personal)
}
