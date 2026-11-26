package com.ravikisan.platform.compose.core

/**
 * Hardcoded security contract for the native Compose app — keep in sync with:
 * - `android-twa/android/.../security/SecurityContract.java` (legacy app)
 * - `.well-known/assetlinks.json` + CI verified fingerprints
 * - `backend/src/lib/native-android-security.ts`
 * - `frontend/lib/owner.ts` (OWNER_EMAIL)
 * - `android-twa/security/tls-pins.json` (pins live in network_security_config.xml)
 */
object SecurityContract {
    const val API_ORIGIN: String = "https://harindrasah.com.np"
    const val API_HOST: String = "harindrasah.com.np"

    /** Dev applicationId (production `com.ravikisan.platform` arrives at Phase 8 promotion). */
    const val PACKAGE_ID: String = "com.ravikisan.platform.compose"

    /** Root operator — only this account may run on rooted / emulator release builds. */
    const val OWNER_ROOT_EMAIL: String = "sahrocky81@gmail.com"

    /** Value sent in the `X-Rn-Client` header on every API request. */
    const val CLIENT_HEADER: String = "android-native"

    /** Header carrying the SHA-256 signing-cert fingerprint of the installed APK. */
    const val HEADER_SIGNING_CERT: String = "X-Rn-Signing-Cert"

    /** Play upload + App Signing keys (SHA-256, hex, uppercase) — mirrors legacy contract. */
    val OFFICIAL_SIGNING_CERT_SHA256: List<String> = listOf(
        "5BF3921CD99DC1E7EB31CDCB26923857F66733EA609C29D747E1A7ED85C5E390",
        "851CCFEE75B9B6837810673F9F590DADB5FACC1E67EA2F438A24CD8B8C02C452",
        "7144C2807A97D33B1BA7E6AE17AD4D0F8517820396472C42476523BA9FE70D2D",
        "D0D73F3A19CB17808995D98125735E926F734A225B31A34A536DC230C0B266AE",
        "9DFE46804D11F96C5215E163AC063DE39A54B02294079EC03FFB3E4A441A0169",
    )

    /** Response bodies are capped at 2 MB (mirrors legacy ApiClient.MAX_RESPONSE_CHARS). */
    const val MAX_RESPONSE_BYTES: Int = 2 * 1024 * 1024

    /** Request bodies are capped at 500 KB. */
    const val MAX_REQUEST_BYTES: Int = 512_000

    /** Max same-origin redirect hops followed by [com.ravikisan.platform.compose.core.network.RedirectGuardInterceptor]. */
    const val MAX_REDIRECTS: Int = 3
}
