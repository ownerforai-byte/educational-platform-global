package com.ravikisan.platform.security;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Build;

import com.ravikisan.platform.BuildConfig;

import java.security.MessageDigest;
import java.util.Locale;

/** Rejects repackaged APKs that are not signed with a Play-registered key. */
public final class AppSignatureGuard {
    private AppSignatureGuard() {}

    public static void assertOfficialBuild(Context context) {
        if (BuildConfig.DEBUG) {
            return;
        }
        if (!isOfficialBuild(context)) {
            throw new SecurityException("Unofficial app signature");
        }
    }

    public static boolean isOfficialBuild(Context context) {
        String hex = getPrimarySigningCertSha256Hex(context);
        if (hex == null) {
            return false;
        }
        for (String allowed : SecurityContract.OFFICIAL_SIGNING_CERT_SHA256) {
            if (allowed.equals(hex)) {
                return true;
            }
        }
        return false;
    }

    public static String getPrimarySigningCertSha256Hex(Context context) {
        try {
            PackageManager pm = context.getPackageManager();
            PackageInfo info;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                info = pm.getPackageInfo(
                        context.getPackageName(),
                        PackageManager.GET_SIGNING_CERTIFICATES);
                if (info.signingInfo == null) {
                    return null;
                }
                Signature[] signatures = info.signingInfo.hasMultipleSigners()
                        ? info.signingInfo.getApkContentsSigners()
                        : info.signingInfo.getSigningCertificateHistory();
                if (signatures == null || signatures.length == 0) {
                    return null;
                }
                return sha256Hex(signatures[0].toByteArray());
            }
            info = pm.getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES);
            if (info.signatures == null || info.signatures.length == 0) {
                return null;
            }
            return sha256Hex(info.signatures[0].toByteArray());
        } catch (PackageManager.NameNotFoundException e) {
            return null;
        }
    }

    private static String sha256Hex(byte[] bytes) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(bytes);
            StringBuilder sb = new StringBuilder(digest.length * 2);
            for (byte b : digest) {
                sb.append(String.format(Locale.US, "%02X", b));
            }
            return sb.toString();
        } catch (Exception e) {
            return null;
        }
    }
}