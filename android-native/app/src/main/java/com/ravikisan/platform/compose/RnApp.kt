package com.ravikisan.platform.compose

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class RnApp : Application() {
    override fun onCreate() {
        super.onCreate()
        createNotificationChannels()
    }

    /**
     * Create the notification channels required by FCM push payloads.
     * Must match the `channelId` values sent from Cloud Functions
     * (e.g. `chat_messages` in `chat-notifications.ts`).
     */
    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return

        val manager = getSystemService(NotificationManager::class.java) ?: return

        val channels = listOf(
            NotificationChannel(
                CHANNEL_CHAT,
                "Chat Messages",
                NotificationManager.IMPORTANCE_HIGH,
            ).apply {
                description = "Real-time chat message notifications"
                enableVibration(true)
            },
            NotificationChannel(
                CHANNEL_GENERAL,
                "General",
                NotificationManager.IMPORTANCE_DEFAULT,
            ).apply {
                description = "General app notifications"
            },
            NotificationChannel(
                CHANNEL_UPDATES,
                "App Updates",
                NotificationManager.IMPORTANCE_LOW,
            ).apply {
                description = "New content and feature updates"
            },
        )

        manager.createNotificationChannels(channels)
    }

    companion object {
        /** Must match `channelId: "chat_messages"` in Cloud Function payload. */
        const val CHANNEL_CHAT = "chat_messages"
        const val CHANNEL_GENERAL = "general"
        const val CHANNEL_UPDATES = "app_updates"
    }
}
