package com.ravikisan.platform.compose.ui.screens.profile

/**
 * Profile + notification models (Agent 4 task 7) — local shapes until the
 * Supervisor orders the fake→real swap (auth via Agent 3, FCM notifications).
 */
data class ProfileUser(
    val name: String,
    val handle: String,
    val className: String,
)

data class ProfileStats(
    val notesRead: Int,
    val quizzesDone: Int,
    val streakDays: Int,
)

data class RnNotification(
    val id: String,
    val title: String,
    val body: String,
    val timeAgo: String,
    val isUnread: Boolean,
)
