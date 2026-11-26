package com.ravikisan.platform.compose.core

import com.ravikisan.platform.compose.core.network.RedirectPolicy
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * JVM unit test for the pure parts of [RedirectPolicy] — no OkHttp, no Android.
 */
class RedirectPolicyTest {

    @Test
    fun `same-origin absolute redirect is followed`() {
        assertEquals(
            RedirectPolicy.Decision.FOLLOW,
            RedirectPolicy.decide("https://harindrasah.com.np/api/v2/notes"),
        )
    }

    @Test
    fun `bare origin redirect is followed`() {
        assertEquals(
            RedirectPolicy.Decision.FOLLOW,
            RedirectPolicy.decide("https://harindrasah.com.np"),
        )
    }

    @Test
    fun `relative redirect is followed (resolves against API origin)`() {
        assertEquals(
            RedirectPolicy.Decision.FOLLOW,
            RedirectPolicy.decide("/api/v2/notes"),
        )
        assertEquals(
            "https://harindrasah.com.np/api/v2/notes",
            RedirectPolicy.resolve("/api/v2/notes"),
        )
    }

    @Test
    fun `cross-origin redirect is rejected`() {
        assertEquals(
            RedirectPolicy.Decision.REJECT,
            RedirectPolicy.decide("https://evil.example.com/api/steal"),
        )
    }

    @Test
    fun `lookalike host is rejected`() {
        assertEquals(
            RedirectPolicy.Decision.REJECT,
            RedirectPolicy.decide("https://harindrasah.com.np.evil.example.com/"),
        )
    }

    @Test
    fun `missing or blank location is rejected`() {
        assertEquals(RedirectPolicy.Decision.REJECT, RedirectPolicy.decide(null))
        assertEquals(RedirectPolicy.Decision.REJECT, RedirectPolicy.decide("  "))
    }

    @Test
    fun `protocol-relative host is rejected`() {
        assertEquals(
            RedirectPolicy.Decision.REJECT,
            RedirectPolicy.decide("//evil.example.com/api"),
        )
    }

    @Test
    fun `same-origin with query and fragment is followed`() {
        assertEquals(
            RedirectPolicy.Decision.FOLLOW,
            RedirectPolicy.decide("https://harindrasah.com.np/api/v2/notes?u=1#top"),
        )
    }

    @Test
    fun `downgraded scheme on API host is rejected (https origin only)`() {
        // The policy pins the exact https origin; TLS is enforced by the network
        // security config, so an http redirect target is never followed.
        assertEquals(
            RedirectPolicy.Decision.REJECT,
            RedirectPolicy.decide("http://harindrasah.com.np/api/x"),
        )
    }

    @Test
    fun `origin prefix must end at path boundary`() {
        // https://harindrasah.com.np.evil.com starts with the origin text but is a
        // different host — must be rejected because it lacks the `/` boundary.
        assertEquals(
            RedirectPolicy.Decision.REJECT,
            RedirectPolicy.decide("https://harindrasah.com.np.evil.com/api"),
        )
    }

    @Test
    fun `resolve keeps full path and query`() {
        assertEquals(
            "https://harindrasah.com.np/api/v2/notes?u=1",
            RedirectPolicy.resolve("/api/v2/notes?u=1"),
        )
    }
}
