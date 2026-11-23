package com.ravikisan.platform.security;

import android.content.Context;

import com.ravikisan.platform.data.AppDatabase;

/**
 * Wipes legacy plaintext offline rows after security upgrades ship.
 */
public final class SecureStorageBootstrap {
    private static final String PREFS = "rn_security_bootstrap";
    private static final String KEY_CACHE_MIGRATION = "cache_encryption_v1";

    private SecureStorageBootstrap() {}

    public static void runOnce(Context context) {
        android.content.SharedPreferences prefs =
                context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        if (prefs.getBoolean(KEY_CACHE_MIGRATION, false)) {
            return;
        }
        AppDatabase.get(context).cache().clearAll();
        prefs.edit().putBoolean(KEY_CACHE_MIGRATION, true).apply();
    }
}