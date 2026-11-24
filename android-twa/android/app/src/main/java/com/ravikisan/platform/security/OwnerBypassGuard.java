package com.ravikisan.platform.security;

import android.content.Context;
import android.os.Build;

import com.ravikisan.platform.BuildConfig;
import com.ravikisan.platform.session.SessionManager;

import org.json.JSONObject;

import java.io.File;

/**
 * Release builds refuse rooted / emulator environments unless the signed-in
 * account is the hardcoded root operator ({@link SecurityContract#OWNER_ROOT_EMAIL}).
 */
public final class OwnerBypassGuard {
    private OwnerBypassGuard() {}

    public static boolean isHighRiskEnvironment() {
        return isEmulator() || isRooted();
    }

    public static boolean isOperatorSession(Context context) {
        try {
            String json = new SessionManager(context).getUserJson();
            if (json == null) {
                return false;
            }
            JSONObject user = new JSONObject(json);
            String email = user.optString("email", null);
            if (email == null) {
                email = user.optString("userEmail", null);
            }
            return email != null
                    && SecurityContract.OWNER_ROOT_EMAIL.equalsIgnoreCase(email.trim());
        } catch (Exception ignored) {
            return false;
        }
    }

    /** @return null if allowed; otherwise a user-facing block reason */
    public static String blockReasonOrNull(Context context) {
        if (BuildConfig.DEBUG) {
            return null;
        }
        if (!isHighRiskEnvironment()) {
            return null;
        }
        if (isOperatorSession(context)) {
            return null;
        }
        return "This device environment is not supported for member accounts. "
                + "Use the official website or sign in with the platform operator account.";
    }

    private static boolean isEmulator() {
        return Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || "google_sdk".equals(Build.PRODUCT);
    }

    private static boolean isRooted() {
        String[] paths = {
            "/system/app/Superuser.apk",
            "/sbin/su",
            "/system/bin/su",
            "/system/xbin/su",
            "/data/local/xbin/su",
            "/data/local/bin/su",
            "/data/local/su",
        };
        for (String path : paths) {
            if (new File(path).exists()) {
                return true;
            }
        }
        String tags = Build.TAGS;
        return tags != null && tags.contains("test-keys");
    }
}