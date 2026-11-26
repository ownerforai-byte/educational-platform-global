package com.ravikisan.platform.compose.core

import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import java.security.MessageDigest

/**
 * Computes the SHA-256 fingerprint of the signing certificate of the *installed* APK
 * and checks it against [SecurityContract.OFFICIAL_SIGNING_CERT_SHA256].
 *
 * Mirrors legacy `AppSignatureGuard`: debug/local builds omit attestation headers so
 * API calls work before Play signing is in place.
 */
object SignatureGuard {

    /** Uppercase hex SHA-256 of the first signing cert, or null when unavailable. */
    fun getPrimarySigningCertSha256Hex(context: Context): String? = runCatching {
        val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            PackageManager.GET_SIGNING_CERTIFICATES
        } else {
            @Suppress("DEPRECATION")
            PackageManager.GET_SIGNATURES
        }
        val info = context.packageManager.getPackageInfo(context.packageName, flags)
        val signatures = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            info.signingInfo?.apkContentsSigners
        } else {
            @Suppress("DEPRECATION")
            info.signatures
        } ?: return null
        if (signatures.isEmpty()) return null
        val digest = MessageDigest.getInstance("SHA-256").digest(signatures[0].toByteArray())
        digest.joinToString("") { "%02X".format(it) }
    }.getOrNull()

    /** True when the installed APK is signed with one of the official certs. */
    fun isOfficialBuild(context: Context): Boolean {
        val hex = getPrimarySigningCertSha256Hex(context) ?: return false
        return SecurityContract.OFFICIAL_SIGNING_CERT_SHA256.any { it.equals(hex, ignoreCase = true) }
    }
}
