package com.ravikisan.platform.fcm;

import android.app.NotificationChannel;
import android.app.NotificationChannelGroup;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

/** Tray channels aligned with web notification categories. */
public final class NotificationChannels {
    public static final String COMMUNITY = "community_activity";
    public static final String ACCOUNT = "account_alerts";
    public static final String STUDY = "study_reminders";
    private static final String GROUP_ID = "ravikisan_alerts";

    private NotificationChannels() {}

    public static void ensureAll(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = context.getSystemService(NotificationManager.class);
        if (nm == null) return;

        NotificationChannelGroup group =
                new NotificationChannelGroup(GROUP_ID, "Platform alerts");
        nm.createNotificationChannelGroup(group);

        NotificationChannel community = new NotificationChannel(
                COMMUNITY,
                "Community & social",
                NotificationManager.IMPORTANCE_HIGH);
        community.setDescription("Replies, mentions, and board activity.");
        community.setGroup(GROUP_ID);

        NotificationChannel account = new NotificationChannel(
                ACCOUNT,
                "Account & access",
                NotificationManager.IMPORTANCE_HIGH);
        account.setDescription("Approvals, membership, and security.");
        account.setGroup(GROUP_ID);

        NotificationChannel study = new NotificationChannel(
                STUDY,
                "Study & Veer",
                NotificationManager.IMPORTANCE_DEFAULT);
        study.setDescription("Lessons, reminders, and tutor updates.");
        study.setGroup(GROUP_ID);

        nm.createNotificationChannel(community);
        nm.createNotificationChannel(account);
        nm.createNotificationChannel(study);
    }

    public static String channelForKind(String kind) {
        if (kind == null) return COMMUNITY;
        if (kind.startsWith("account_") || "access_request".equals(kind)) {
            return ACCOUNT;
        }
        if (kind.contains("social") || kind.contains("community") || kind.contains("comment")
                || kind.contains("quote") || kind.contains("mention")) {
            return COMMUNITY;
        }
        if (kind.contains("study") || kind.contains("lesson") || kind.contains("curriculum")
                || kind.contains("ai_")) {
            return STUDY;
        }
        return COMMUNITY;
    }
}