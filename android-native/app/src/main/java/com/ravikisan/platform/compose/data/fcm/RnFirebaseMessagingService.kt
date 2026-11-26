package com.ravikisan.platform.compose.data.fcm

import android.app.PendingIntent
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.ravikisan.platform.compose.MainActivity
import com.ravikisan.platform.compose.R
import com.ravikisan.platform.compose.RnApp

/**
 * Native FCM entry point. Handles incoming push notifications from Cloud Functions
 * (`sendChatPushNotification`, etc.) and shows system-tray notifications.
 *
 * Channel IDs must match the values in the Cloud Function payloads and the channels
 * created in [RnApp.createNotificationChannels].
 */
class RnFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        // Re-register on the next open; avoids coupling token refresh to the API here.
    }

    override fun onMessageReceived(message: RemoteMessage) {
        val data = message.data
        val kind = data["kind"]

        when (kind) {
            "chat_message" -> showChatNotification(message, data)
            else -> showGenericNotification(message)
        }
    }

    // ── Chat message notifications ──────────────────────────────────────

    private fun showChatNotification(message: RemoteMessage, data: Map<String, String>) {
        val title = message.notification?.title ?: data["senderName"] ?: "New message"
        val body = message.notification?.body ?: data["text"] ?: "Sent a message"
        val roomId = data["roomId"] ?: ""

        val intent = Intent(this, MainActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
            putExtra("navigateTo", "chat")
            putExtra("roomId", roomId)
        }

        val pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT or
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0

        val pendingIntent = PendingIntent.getActivity(
            this, roomId.hashCode(), intent, pendingFlags,
        )

        val notification = NotificationCompat.Builder(this, RnApp.CHANNEL_CHAT)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setContentIntent(pendingIntent)
            .setCategory(NotificationCompat.CATEGORY_MESSAGE)
            .build()

        try {
            NotificationManagerCompat.from(this).notify(roomId.hashCode(), notification)
        } catch (_: SecurityException) {
            // POST_NOTIFICATIONS not granted; silently drop.
        }
    }

    // ── Fallback for unknown / generic notifications ────────────────────

    private fun showGenericNotification(message: RemoteMessage) {
        val title = message.notification?.title ?: return
        val body = message.notification?.body ?: ""

        val intent = Intent(this, MainActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
        }

        val pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT or
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0

        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent, pendingFlags,
        )

        val notification = NotificationCompat.Builder(this, RnApp.CHANNEL_GENERAL)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()

        try {
            NotificationManagerCompat.from(this).notify(message.messageId.hashCode(), notification)
        } catch (_: SecurityException) {
            // POST_NOTIFICATIONS not granted; silently drop.
        }
    }
}
