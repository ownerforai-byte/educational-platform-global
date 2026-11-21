package com.ravikisan.platform.session;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.security.crypto.EncryptedSharedPreferences;
import androidx.security.crypto.MasterKey;

public class SessionManager {
    private static final String PREFS = "rn_session";
    private static final String KEY_TOKEN = "access_token";
    private static final String KEY_USER_JSON = "user_json";

    private final SharedPreferences prefs;

    public SessionManager(Context context) {
        SharedPreferences stored;
        try {
            MasterKey masterKey = new MasterKey.Builder(context)
                    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                    .build();
            stored = EncryptedSharedPreferences.create(
                    context,
                    PREFS,
                    masterKey,
                    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM);
        } catch (Exception e) {
            stored = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        }
        prefs = stored;
    }

    public boolean isSignedIn() {
        String token = prefs.getString(KEY_TOKEN, null);
        return token != null && !token.isEmpty();
    }

    public String getAccessToken() {
        return prefs.getString(KEY_TOKEN, null);
    }

    public String getUserJson() {
        return prefs.getString(KEY_USER_JSON, null);
    }

    public void saveSession(String token, String userJson) {
        prefs.edit().putString(KEY_TOKEN, token).putString(KEY_USER_JSON, userJson).apply();
    }

    public void clear() {
        prefs.edit().remove(KEY_TOKEN).remove(KEY_USER_JSON).apply();
    }
}