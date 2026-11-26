package com.ravikisan.platform.compose.data.sync

/**
 * Pure retry/backoff decision for [ContentSyncWorker] — extracted so the 4-attempt
 * cap is unit-testable on the JVM without WorkManager or Android.
 */
object SyncRetryPolicy {

    enum class Decision { RETRY, FAIL }

    /**
     * @param runAttemptCount zero-based attempt index of the current run
     * (WorkManager semantics: first run = 0).
     * @param maxAttempts total attempts allowed, inclusive of the first run.
     */
    fun decide(runAttemptCount: Int, maxAttempts: Int = ContentSyncWorker.MAX_ATTEMPTS): Decision =
        if (runAttemptCount < maxAttempts - 1) Decision.RETRY else Decision.FAIL
}
