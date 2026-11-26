package com.ravikisan.platform.sync;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import com.ravikisan.platform.net.ApiClient;
import com.ravikisan.platform.session.SessionManager;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

public class ContentSyncWorker extends Worker {
  private static final int MAX_ATTEMPTS = 4;

  public ContentSyncWorker(@NonNull Context context, @NonNull WorkerParameters params) {
    super(context, params);
  }

  @NonNull
  @Override
  public Result doWork() {
    if (getRunAttemptCount() > MAX_ATTEMPTS) {
      return Result.success();
    }
    SessionManager session = new SessionManager(getApplicationContext());
    if (!session.isSignedIn()) {
      return Result.success();
    }
    ApiClient api = new ApiClient(getApplicationContext());
    CountDownLatch latch = new CountDownLatch(2);
    AtomicBoolean authFailed = new AtomicBoolean(false);

    api.refreshMe((value, error) -> {
      if (isAuthError(error)) {
        authFailed.set(true);
      }
      latch.countDown();
    });
    api.refreshFeed((value, error) -> {
      if (isAuthError(error)) {
        authFailed.set(true);
      }
      latch.countDown();
    });

    try {
      latch.await(25, TimeUnit.SECONDS);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      return Result.success();
    }

    if (authFailed.get()) {
      return Result.success();
    }
    return latch.getCount() == 0 ? Result.success() : Result.retry();
  }

  /** Java-8-safe auth-error check (pattern matching in instanceof needs source 16+). */
  private static boolean isAuthError(Object error) {
    if (!(error instanceof ApiClient.HttpException)) {
      return false;
    }
    ApiClient.HttpException ex = (ApiClient.HttpException) error;
    return ex.status == 401 || ex.status == 403;
  }
}