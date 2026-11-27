package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable

/**
 * Wire DTOs for the social notifications endpoints (auth required):
 * - `GET  /api/notifications?cursor=<n>&unread=1` →
 *   `{ items, nextCursor, unreadCount, migrated }`
 * - `PATCH /api/notifications/read` `{all: true}` or `{ids: [...]}` → `{ok}`
 * Pinned to `backend/src/api/social/social-notifications.controller.ts`.
 */
@Serializable
data class SocialNotificationsResponse(
    val items: List<SocialNotificationDto> = emptyList(),
    val nextCursor: Long? = null,
    val unreadCount: Int = 0,
    val migrated: Boolean? = null,
)

@Serializable
data class SocialNotificationDto(
    val id: String,
    val actorId: String? = null,
    val actor: NotificationActorDto? = null,
    val kind: String? = null,
    val postId: String? = null,
    val postTitle: String? = null,
    val commentId: String? = null,
    val readAt: String? = null,
    val createdAt: String? = null,
)

@Serializable
data class NotificationActorDto(
    val fullName: String? = null,
    val username: String? = null,
    val avatarUrl: String? = null,
)

@Serializable
data class MarkNotificationsReadRequest(
    val all: Boolean? = null,
    val ids: List<String> = emptyList(),
)
