package com.ravikisan.platform.compose.data.sync

import android.content.Context
import androidx.work.BackoffPolicy
import androidx.work.Constraints
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.ravikisan.platform.compose.core.network.HttpException
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.db.AppDatabase
import dagger.hilt.EntryPoint
import dagger.hilt.InstallIn
import dagger.hilt.android.EntryPointAccessors
import dagger.hilt.components.SingletonComponent
import java.util.concurrent.TimeUnit
import kotlinx.coroutines.runBlocking

/**
 * Offline-cache sync worker (legacy `ContentSyncWorker` semantics):
 * - network required;
 * - unique work with `ExistingWorkPolicy.KEEP` → foreground syncs are deduped;
 * - retries capped at [MAX_ATTEMPTS] (4) by [SyncScheduler].
 *
 * Dependencies arrive through [SyncEntryPoint] (Hilt entry point) so WorkManager keeps
 * its default initializer — no `Configuration.Provider` change to `RnApp` is needed
 * (`RnApp.kt` is outside this agent's owned paths).
 */
class ContentSyncWorker(
    context: Context,
    params: WorkerParameters,
) : Worker(context, params) {

    private val deps by lazy {
        EntryPointAccessors.fromApplication(applicationContext, SyncEntryPoint::class.java)
    }

    override fun doWork(): Result = runBlocking {
        val api = deps.api()
        val db = deps.database()
        try {
            // 1. Validate the session; a 401/403 here must not loop sync forever.
            val me = api.me()
            if (me.code() == 401 || me.code() == 403) {
                deps.sessionStore().clear()
                db.cache().clearAll()
                return@runBlocking Result.failure()
            }
            // 2. Refresh the offline snapshot. Phase 5 extends this with the real
            //    syllabus/note payload list; today it stores the session snapshot.
            val snapshot = me.body()?.let { user -> user.toString() } ?: "{}"
            db.cache().put(
                com.ravikisan.platform.compose.data.db.CacheEntry(
                    key = SESSION_SNAPSHOT_KEY,
                    json = snapshot,
                    updatedAt = System.currentTimeMillis(),
                ),
            )
            Result.success()
        } catch (e: HttpException) {
            if (e.isAuthError) {
                deps.sessionStore().clear()
                db.cache().clearAll()
                Result.failure()
            } else {
                retryOrFail()
            }
        } catch (e: java.io.IOException) {
            retryOrFail()
        }
    }

    private fun retryOrFail(): Result =
        when (SyncRetryPolicy.decide(runAttemptCount)) {
            SyncRetryPolicy.Decision.RETRY -> Result.retry()
            SyncRetryPolicy.Decision.FAIL -> Result.failure()
        }

    @EntryPoint
    @InstallIn(SingletonComponent::class)
    interface SyncEntryPoint {
        fun api(): RnApi
        fun database(): AppDatabase
        fun sessionStore(): com.ravikisan.platform.compose.data.session.SessionStore
    }

    companion object {
        const val UNIQUE_WORK_NAME = "rn_content_sync"
        const val MAX_ATTEMPTS = 4
        const val SESSION_SNAPSHOT_KEY = "session_snapshot"
    }
}

/** Schedules deduped, network-constrained sync with a capped 4-attempt backoff. */
object SyncScheduler {

    fun requestSync(context: Context) {
        val request = OneTimeWorkRequestBuilder<ContentSyncWorker>()
            .setConstraints(
                Constraints.Builder()
                    .setRequiredNetworkType(NetworkType.CONNECTED)
                    .build(),
            )
            .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30, TimeUnit.SECONDS)
            .build()
        WorkManager.getInstance(context)
            .enqueueUniqueWork(ContentSyncWorker.UNIQUE_WORK_NAME, ExistingWorkPolicy.KEEP, request)
    }

    /** Sign-out: drop any queued sync so a dead token never re-runs. */
    fun cancelSync(context: Context) {
        WorkManager.getInstance(context).cancelUniqueWork(ContentSyncWorker.UNIQUE_WORK_NAME)
    }
}
