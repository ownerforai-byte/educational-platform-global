package com.ravikisan.platform;

import android.os.Build;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.work.Configuration;

import com.ravikisan.platform.security.SecureStorageBootstrap;

public class Application extends android.app.Application implements Configuration.Provider {
    @Override
    public void onCreate() {
        super.onCreate();
        SecureStorageBootstrap.runOnce(this);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && !BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(false);
        }
    }

    @NonNull
    @Override
    public Configuration getWorkManagerConfiguration() {
        return new Configuration.Builder().build();
    }
}