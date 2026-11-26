package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.data.sync.SyncRetryPolicy
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * JVM tests for the 4-attempt sync backoff cap (legacy ContentSyncWorker rule).
 */
class SyncRetryPolicyTest {

    @Test
    fun `first failure retries (attempt 0 of 4)`() {
        assertEquals(SyncRetryPolicy.Decision.RETRY, SyncRetryPolicy.decide(0))
    }

    @Test
    fun `intermediate failures retry`() {
        assertEquals(SyncRetryPolicy.Decision.RETRY, SyncRetryPolicy.decide(1))
        assertEquals(SyncRetryPolicy.Decision.RETRY, SyncRetryPolicy.decide(2))
    }

    @Test
    fun `attempt 3 of 4 is the last allowed run`() {
        assertEquals(SyncRetryPolicy.Decision.FAIL, SyncRetryPolicy.decide(3))
    }

    @Test
    fun `beyond the cap never retries`() {
        assertEquals(SyncRetryPolicy.Decision.FAIL, SyncRetryPolicy.decide(10))
    }

    @Test
    fun `custom cap respected`() {
        assertEquals(SyncRetryPolicy.Decision.FAIL, SyncRetryPolicy.decide(0, maxAttempts = 1))
        assertEquals(SyncRetryPolicy.Decision.RETRY, SyncRetryPolicy.decide(0, maxAttempts = 2))
        assertEquals(SyncRetryPolicy.Decision.FAIL, SyncRetryPolicy.decide(1, maxAttempts = 2))
    }
}
