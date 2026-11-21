package com.ravikisan.platform;

import androidx.annotation.NonNull;
import androidx.work.Configuration;

public class Application extends android.app.Application implements Configuration.Provider {
    @Override
    public void onCreate() {
        super.onCreate();
    }

    @NonNull
    @Override
    public Configuration getWorkManagerConfiguration() {
        return new Configuration.Builder().build();
    }
}