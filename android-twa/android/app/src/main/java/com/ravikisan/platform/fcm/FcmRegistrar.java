package com.ravikisan.platform.fcm;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.content.ContextCompat;

import com.google.firebase.messaging.FirebaseMessaging;
import com.ravikisan.platform.net.ApiClient;
import com.ravikisan.platform.session.SessionManager;

public final class FcmRegistrar {
    private FcmRegistrar() {}

    public static void requestPermissionIfNeeded(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return;
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS)
                == PackageManager.PERMISSION_GRANTED) {
            return;
        }
        if (context instanceof androidx.activity.ComponentActivity) {
            ((androidx.activity.ComponentActivity) context)
                    .requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 9102);
        }
    }

    public static void registerForSignedInUser(Context context) {
        SessionManager session = new SessionManager(context);
        if (!session.isSignedIn()) return;
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {
            if (!task.isSuccessful() || task.getResult() == null) return;
            String token = task.getResult();
            ApiClient api = new ApiClient(context);
            new Thread(() -> {
                try {
                    api.registerFcmToken(token);
                } catch (Exception ignored) {
                    /* retry on next app open */
                }
            }).start();
        });
    }
}