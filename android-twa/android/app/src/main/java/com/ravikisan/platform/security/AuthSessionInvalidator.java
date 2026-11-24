package com.ravikisan.platform.security;

import android.content.Context;
import android.content.Intent;

import com.ravikisan.platform.LoginActivity;
import com.ravikisan.platform.data.AppDatabase;
import com.ravikisan.platform.session.SessionManager;

import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Clears local secrets once when the API returns 401/403 on an authenticated call.
 * Prevents sync/push loops that hammer the backend with a dead token.
 */
public final class AuthSessionInvalidator {
    private static final AtomicBoolean INVALIDATING = new AtomicBoolean(false);

    private AuthSessionInvalidator() {}

    public static void invalidate(Context context) {
        if (!INVALIDATING.compareAndSet(false, true)) {
            return;
        }
        try {
            Context app = context.getApplicationContext();
            new SessionManager(app).clear();
            AppDatabase.get(app).cache().clearAll();
            Intent login = new Intent(app, LoginActivity.class);
            login.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            app.startActivity(login);
        } finally {
            INVALIDATING.set(false);
        }
    }
}