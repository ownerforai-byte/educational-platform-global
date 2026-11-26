package com.ravikisan.platform.compose.ui.screens.social

/**
 * Community feed model (Agent 4 task 7) — local shape until the Supervisor
 * orders the fake→real swap against `/api/community`.
 */
data class CommunityPost(
    val id: String,
    val author: String,
    val body: String,
    val subjectTag: String,
    val timeAgo: String,
    val likes: Int,
    val replies: Int,
)
