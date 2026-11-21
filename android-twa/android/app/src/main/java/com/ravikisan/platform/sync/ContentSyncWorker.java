package com.ravikisan.platform.sync;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import com.ravikisan.platform.net.ApiClient;
import com.ravikisan.platform.session.SessionManager;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class ContentSyncWorker extends Worker {
    public ContentSyncWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
    }

    @NonNull
    @Override
    public Result doWork() {
        SessionManager session = new SessionManager(getApplicationContext());
        if (!session.isSignedIn()) return Result.success();
        ApiClient api = new ApiClient(getApplicationContext());
        try {
            CountDownLatch latch = new CountDownLatch(2);
            api.refreshMe((value, error) -> latch.countDown());
            api.refreshFeed((value, error) -> latch.countDown());
            boolean ok = latch.await(25, TimeUnit.SECONDS);
            return ok ? Result.success() : Result.retry();
        } catch (Exception e) {
            return Result.retry();
        }
    }
}