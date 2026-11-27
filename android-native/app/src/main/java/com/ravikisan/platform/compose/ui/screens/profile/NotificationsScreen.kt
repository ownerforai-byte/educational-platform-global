package com.ravikisan.platform.compose.ui.screens.profile

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.ravikisan.platform.compose.core.contract.SocialNotificationDto

/**
 * Notifications screen — REAL feed (fake→real swap): likes, replies and
 * mentions from `GET /api/notifications` with mark-all-read. Signed-out
 * users see a sign-in path instead of demo content.
 */
@Composable
fun NotificationsScreen(
    onBack: () -> Unit = {},
    onOpenAuth: () -> Unit = {},
    viewModel: NotificationsViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsStateWithLifecycle()

    Column(Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 8.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
            }
            Spacer(Modifier.width(4.dp))
            Column {
                Text("Notifications", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                val unread = state.items.count { viewModel.isUnread(it) }
                Text(
                    when {
                        state.needsAuth -> "Sign in to see your notifications"
                        unread > 0 -> "$unread unread"
                        else -> "All caught up"
                    },
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            Spacer(Modifier.weight(1f))
            if (!state.needsAuth && state.items.isNotEmpty() && state.items.any { viewModel.isUnread(it) }) {
                Button(
                    onClick = viewModel::markAllRead,
                    modifier = Modifier.padding(end = 8.dp),
                ) { Text("Mark all read") }
            }
        }

        when {
            state.needsAuth -> Column(Modifier.padding(24.dp)) {
                Text(
                    "Your notification feed lives with your account.",
                    style = MaterialTheme.typography.bodyMedium,
                )
                Spacer(Modifier.height(12.dp))
                Button(onClick = onOpenAuth) { Text("Sign in") }
            }
            state.loading -> Row(
                modifier = Modifier.fillMaxWidth().padding(24.dp),
                horizontalArrangement = Arrangement.Center,
            ) { androidx.compose.material3.CircularProgressIndicator() }
            state.error != null -> Column(Modifier.padding(24.dp)) {
                Text(state.error!!, color = MaterialTheme.colorScheme.error)
                Spacer(Modifier.height(8.dp))
                Button(onClick = viewModel::load) { Text("Retry") }
            }
            state.items.isEmpty() -> Column(Modifier.padding(24.dp)) {
                Text("No notifications yet.", style = MaterialTheme.typography.bodyMedium)
            }
            else -> LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                items(state.items, key = { it.id }) { notification ->
                    NotificationCard(
                        title = notification.title(),
                        body = notification.body(),
                        timeAgo = relativeTime(notification.createdAt),
                        unread = viewModel.isUnread(notification),
                    )
                }
                if (!state.endReached) {
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
                            horizontalArrangement = Arrangement.Center,
                        ) {
                            if (state.loadingMore) {
                                androidx.compose.material3.CircularProgressIndicator()
                            } else {
                                Button(onClick = viewModel::loadMore) { Text("Load more") }
                            }
                        }
                    }
                }
            }
        }
    }
}

/** Human title: "Aarav liked your post '…'" style, kind-aware. */
private fun SocialNotificationDto.title(): String {
    val who = actor?.fullName ?: actor?.username
    return when (kind) {
        "like" -> "${who ?: "Someone"} liked your post"
        "comment" -> "${who ?: "Someone"} replied to your post"
        "follow" -> "${who ?: "Someone"} started following you"
        else -> who?.let { "$it · ${kind ?: "activity"}" } ?: (kind ?: "Activity")
    }
}

private fun SocialNotificationDto.body(): String = postTitle ?: ""

/** Coarse relative time from the ISO timestamp (no external dependency). */
private fun relativeTime(createdAt: String?): String {
    val parsed = createdAt?.let { iso ->
        runCatching {
            java.time.Instant.parse(iso).toEpochMilli()
        }.getOrNull()
    } ?: return ""
    val deltaMs = System.currentTimeMillis() - parsed
    val minutes = deltaMs / 60_000
    return when {
        minutes < 1 -> "just now"
        minutes < 60 -> "$minutes min ago"
        minutes < 60 * 24 -> "${minutes / 60} h ago"
        minutes < 60 * 24 * 7 -> "${minutes / (60 * 24)} d ago"
        else -> "${minutes / (60 * 24 * 7)} w ago"
    }
}

@Composable
private fun NotificationCard(
    title: String,
    body: String,
    timeAgo: String,
    unread: Boolean,
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (unread) MaterialTheme.colorScheme.primary.copy(alpha = 0.06f)
            else MaterialTheme.colorScheme.surface,
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Column(Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                if (unread) {
                    Text("●", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelSmall)
                    Spacer(Modifier.width(6.dp))
                }
                Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                Spacer(Modifier.weight(1f))
                Text(
                    timeAgo,
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            if (body.isNotBlank()) {
                Spacer(Modifier.height(4.dp))
                Text(
                    body,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}
