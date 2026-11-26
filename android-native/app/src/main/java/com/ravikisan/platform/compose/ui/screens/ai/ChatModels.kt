package com.ravikisan.platform.compose.ui.screens.ai

/**
 * Veer chat domain model (Agent 4 task 6). Sender mirrors the SSE wire shape
 * the real client will use (Agent 3's SseClient emits role+delta events), so
 * the swap from the fake stream is a repository change only.
 */
enum class ChatRole { USER, ASSISTANT }

data class ChatMessage(
    val role: ChatRole,
    val text: String,
    /** True while the assistant's reply is still streaming token chunks. */
    val isStreaming: Boolean = false,
)
