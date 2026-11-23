package com.ravikisan.platform.security;

import android.app.Activity;
import android.view.WindowManager;

/**
 * Blocks screenshots, screen recording, and sensitive content in the recents snapshot.
 */
public final class SecureWindow {
    private SecureWindow() {}

    public static void apply(Activity activity) {
        activity.getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_SECURE,
                WindowManager.LayoutParams.FLAG_SECURE);
    }
}