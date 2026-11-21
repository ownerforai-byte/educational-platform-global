package com.ravikisan.platform;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.ravikisan.platform.fcm.FcmRegistrar;
import com.ravikisan.platform.session.SessionManager;

public class RnPushMessagingService extends FirebaseMessagingService {

    private static final String CHANNEL_ID = "community_activity";

    @Override
    public void onNewToken(String token) {
        SessionManager session = new SessionManager(this);
        if (!session.isSignedIn()) return;
        new Thread(() -> {
            try {
                new com.ravikisan.platform.net.ApiClient(this).registerFcmToken(token);
            } catch (Exception ignored) {
                /* retried on next foreground */
            }
        }).start();
    }

    @Override
    public void onMessageReceived(RemoteMessage message) {
        String title = message.getNotification() != null
                ? message.getNotification().getTitle()
                : null;
        String body = message.getNotification() != null
                ? message.getNotification().getBody()
                : null;
        if (title == null) title = message.getData().get("title");
        if (body == null) body = message.getData().get("body");
        if (title == null) title = getString(R.string.appName);
        if (body == null) body = "Open the app to continue.";

        String deepLink = message.getData().get("deepLink");
        if (deepLink == null) deepLink = message.getData().get("url");
        if (deepLink == null) deepLink = "/home/member";

        ensureChannel();

        Intent open = new Intent(this, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        open.putExtra(MainActivity.EXTRA_DEEP_LINK, deepLink);

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
        channel.enableVibration(true);
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (nm != null) {
            nm.createNotificationChannel(channel);
        }
    }
}