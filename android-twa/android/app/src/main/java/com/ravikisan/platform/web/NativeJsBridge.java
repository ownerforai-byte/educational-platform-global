package com.ravikisan.platform.web;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.provider.Settings;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationManagerCompat;

import android.webkit.JavascriptInterface;

import com.ravikisan.platform.BuildConfig;
import com.ravikisan.platform.fcm.FcmRegistrar;
import com.ravikisan.platform.security.SecurityContract;

/**
 * Called from the embedded site as {@code window.RnNative.*} and bootstraps
 * {@code window.__RN_NATIVE_ANDROID__} for the web FCM listener.
 */
public class NativeJsBridge {
    private final Context context;

    public NativeJsBridge(@NonNull Context context) {
        this.context = context.getApplicationContext();
    }

    @JavascriptInterface
    public boolean isNativeAndroid() {
        return true;
    }

    @JavascriptInterface
    public String getClientHeader() {
        return SecurityContract.CLIENT_HEADER;
    }

    @JavascriptInterface
    public String getAppVersion() {
        return BuildConfig.VERSION_NAME;
    }

    @JavascriptInterface
    public void refreshFcmRegistration() {
        FcmRegistrar.registerForSignedInUser(context);
    }

    @JavascriptInterface
    public boolean areNotificationsEnabled() {
        return NotificationManagerCompat.from(context).areNotificationsEnabled();
    }

    @JavascriptInterface
    public void openNotificationSettings() {
        Intent intent = new Intent();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            intent.setAction(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
            intent.putExtra(Settings.EXTRA_APP_PACKAGE, context.getPackageName());
        } else {
            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.setData(android.net.Uri.parse("package:" + context.getPackageName()));
        }
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
}