package com.ravikisan.platform.security;

import android.content.Context;
import android.content.Intent;

import com.ravikisan.platform.SecurityBlockedActivity;

public final class SecurityBootstrap {
    private SecurityBootstrap() {}

    /** Process start: signing keys + wipe legacy plaintext cache. */
    public static void enforceAtStartup(Context context) {
        try {
            AppSignatureGuard.assertOfficialBuild(context);
        } catch (SecurityException e) {
            showBlocked(context, "This APK is not signed with the official Play certificate.");
            return;
        }
        SecureStorageBootstrap.runOnce(context);
    }

    /** After login / before member UI: rooted/emulator unless root operator. */
    public static void enforceAuthenticatedSession(Context context) {
        String block = OwnerBypassGuard.blockReasonOrNull(context);
        if (block == null) {
            return;
        }
        showBlocked(context, block);
    }

    private static void showBlocked(Context context, String reason) {
        Intent blocked = new Intent(context, SecurityBlockedActivity.class);
        blocked.putExtra(SecurityBlockedActivity.EXTRA_REASON, reason);
        blocked.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(blocked);
        if (context instanceof android.app.Activity) {
            ((android.app.Activity) context).finish();
        }
    }
}