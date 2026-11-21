package com.ravikisan.platform;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

/**
 * Shows community / system pushes in the tray and opens the in-app WebView
 * (not an external Chrome tab) when the user taps.
 */
public class RnPushMessagingService extends FirebaseMessagingService {

    private static final String CHANNEL_ID = "community_activity";

    @Override
    public void onNewToken(String token) {
        // The WebView shell re-registers after login via window.__RN_ON_NATIVE_FCM_TOKEN__.
    }

    @Override
    public void onMessageReceived(RemoteMessage message) {
        String title = message.getNotification() != null
                ? message.getNotification().getTitle()
                : null;
        String body = message.getNotification() != null
                ? message.getNotification().getBody()
                : null;
        if (title == null) {
            title = message.getData().get("title");
        }
        if (body == null) {
            body = message.getData().get("body");
        }
        if (title == null) title = getString(R.string.appName);
        if (body == null) body = "Open the app to continue.";

        String deepLink = message.getData().get("deepLink");
        if (deepLink == null) deepLink = message.getData().get("url");
        if (deepLink == null) deepLink = "/home";

        ensureChannel();

        Uri target = Uri.parse(deepLink.startsWith("http")
                ? deepLink
                : "https://harindrasah.com.np" + (deepLink.startsWith("/") ? deepLink : "/" + deepLink));

        Intent open = new Intent(this, LauncherActivity.class);
        open.setAction(Intent.ACTION_VIEW);
        open.setData(target);
        open.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pending = PendingIntent.getActivity(this, 0, open, flags);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_notification_icon)
                .setContentTitle(title)
                .setContentText(body)
                .setAutoCancel(true)
                .setContentIntent(pending)
                .setPriority(NotificationCompat.PRIORITY_HIGH);

        NotificationManager nm = getSystemService(NotificationManager.class);
        if (nm != null) {
            nm.notify((int) System.currentTimeMillis(), builder.build());
        }
    }

    private void ensureChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Community & alerts",
                NotificationManager.IMPORTANCE_HIGH);
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (nm != null) {
            nm.createNotificationChannel(channel);
        }
    }
}