package com.ravikisan.platform.auth;

import android.content.Context;

import com.google.android.gms.tasks.Tasks;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.ravikisan.platform.net.ApiClient;

import java.util.concurrent.TimeUnit;

/** Production auth uses Firebase idToken → POST /api/auth/login. */
public final class FirebaseAuthGateway {
    private FirebaseAuthGateway() {}

    public static boolean isReady(Context context) {
        try {
            return FirebaseApp.getApps(context).size() > 0;
        } catch (Throwable t) {
            return false;
        }
    }

    public static void signIn(Context context, String email, String password, ApiClient.Callback<String> idTokenCb) {
        if (!isReady(context)) {
            idTokenCb.onResult(null, new IllegalStateException("Add google-services.json and rebuild."));
            return;
        }
        FirebaseAuth.getInstance()
                .signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (!task.isSuccessful()) {
                        Exception err = task.getException();
                        idTokenCb.onResult(
                                null,
                                err != null ? err : new IllegalStateException("Firebase sign-in failed"));
                        return;
                    }
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                    if (user == null) {
                        idTokenCb.onResult(null, new IllegalStateException("No Firebase user"));
                        return;
                    }
                    try {
                        String token = Tasks.await(user.getIdToken(false), 30, TimeUnit.SECONDS).getToken();
                        idTokenCb.onResult(token, null);
                    } catch (Exception e) {
                        idTokenCb.onResult(null, e);
                    }
                });
    }
}