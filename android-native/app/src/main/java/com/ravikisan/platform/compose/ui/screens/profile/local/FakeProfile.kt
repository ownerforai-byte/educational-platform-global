package com.ravikisan.platform.compose.ui.screens.profile.local

import com.ravikisan.platform.compose.ui.screens.profile.ProfileStats
import com.ravikisan.platform.compose.ui.screens.profile.RnNotification

/** Fake signed-in user + stats (Agent 4 task 7) until auth/API land. */
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

object FakeProfile {
    val user = ProfileUser(
        name = "Guest Student",
        handle = "@guest",
        className = "Class 11",
    )

    val stats = ProfileStats(notesRead = 12, quizzesDone = 5, streakDays = 3)
}

/** Fake notifications (Agent 4 task 7). */
data class RnNotification(
    val id: String,
    val title: String,
    val body: String,
    val timeAgo: String,
    val isUnread: Boolean,
)

object FakeNotifications {
    val items: List<RnNotification> = listOf(
        RnNotification(
            id = "n1",
            title = "New notes published",
            body = "Class 12 Physics — Rotational Dynamics notes are now available.",
            timeAgo = "2 h ago",
            isUnread = true,
        ),
        RnNotification(
            id = "n2",
            title = "Quiz reminder",
            body = "You have an unfinished Kinematics — basics set. Pick up where you left off.",
            timeAgo = "6 h ago",
            isUnread = true,
        ),
        RnNotification(
            id = "n3",
            title = "Veer tip",
            body = "Ask Veer about 'dimensional analysis' to revise before your unit test.",
            timeAgo = "yesterday",
            isUnread = false,
        ),
        RnNotification(
            id = "n4",
            title = "Community reply",
            body = "Sneha replied to your question about the vegetation unit.",
            timeAgo = "2 days ago",
            isUnread = false,
        ),
    )
}
