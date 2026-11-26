package com.ravikisan.platform.compose.core.network

import com.ravikisan.platform.compose.core.SecurityContract
import com.ravikisan.platform.compose.core.SignatureGuard
import okhttp3.Interceptor
import okhttp3.Response

/**
 * Adds the identification + attestation headers on every request:
 * - `User-Agent: RavikisanAndroid/<version> (Android <rel>; <model>)` — always.
 * - `X-Rn-Client: android-native` + `X-Rn-Signing-Cert: <sha256>` — only on official
 *   release builds (debug builds omit attestation so local dev works before Play signing,
 *   mirroring legacy `ApiClient.applyOfficialNativeAttestation`).
 */
class AttestationInterceptor(
    private val appContext: android.content.Context,
    private val versionName: String,
) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val builder = chain.request().newBuilder()
            .header("User-Agent", userAgent(versionName))
            .header("Accept", "application/json")

        if (!com.ravikisan.platform.compose.BuildConfig.DEBUG) {
            val cert = SignatureGuard.getPrimarySigningCertSha256Hex(appContext)
            if (cert != null && SignatureGuard.isOfficialBuild(appContext)) {
                builder.header("X-Rn-Client", SecurityContract.CLIENT_HEADER)
                builder.header(SecurityContract.HEADER_SIGNING_CERT, cert)
            }
        }
        return chain.proceed(builder.build())
    }

    companion object {
        fun userAgent(versionName: String): String =
            "RavikisanAndroid/$versionName (Android ${android.os.Build.VERSION.RELEASE}; ${android.os.Build.MODEL})"
    }
}
