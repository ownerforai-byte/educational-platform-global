package com.ravikisan.platform.compose.core.network

import com.ravikisan.platform.compose.core.SecurityContract

/**
 * Pure redirect policy: only same-origin redirects on the API host may be followed
 * (legacy `ApiClient` rule — no cross-origin hops, no off-site redirects).
 */
object RedirectPolicy {

    enum class Decision { FOLLOW, REJECT }

    /**
     * @param location the raw `Location` header value of a 3xx response.
     * @return FOLLOW when the redirect stays on [SecurityContract.API_ORIGIN], REJECT otherwise.
     */
    fun decide(location: String?): Decision {
        if (location.isNullOrBlank()) return Decision.REJECT
        val origin = SecurityContract.API_ORIGIN
        return when {
            location.startsWith("$origin/") -> Decision.FOLLOW
            location == origin -> Decision.FOLLOW
            // Relative Location values resolve against the API origin — same-origin by
            // definition, BUT a leading `//` is a protocol-relative URL pointing at
            // another host — must be rejected.
            location.startsWith("/") && !location.startsWith("//") -> Decision.FOLLOW
            else -> Decision.REJECT
        }
    }

    /** Resolve a redirect target to an absolute URL against the API origin. */
    fun resolve(location: String): String {
        val origin = SecurityContract.API_ORIGIN
        return if (location.startsWith("/")) "$origin$location" else location
    }
}
