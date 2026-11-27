package com.ravikisan.platform.compose.ui.screens.ai

import com.ravikisan.platform.compose.core.network.HttpException
import com.ravikisan.platform.compose.data.session.SessionStore
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonObject
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/** One conversation turn exchanged with the Veer backend. */
data class ChatTurn(val role: ChatRole, val text: String)

/**
 * Source of the assistant's streaming reply. Production binding is
 * [SseChatStream] (real `POST /api/ai` SSE channel); tests bind
 * [com.ravikisan.platform.compose.ui.screens.ai.local.FakeChatStream].
 */
interface ChatEventStream {
    /** Streams the assistant's reply as token chunks; completes when done. */
    fun stream(history: List<ChatTurn>): Flow<String>
}

@Serializable
data class AiChatMessageDto(val role: String, val content: String)

/** `POST /api/ai` body — `stream: true` opens the live SSE answer channel. */
@Serializable
data class AiChatRequestDto(
    val messages: List<AiChatMessageDto> = emptyList(),
    val stream: Boolean = true,
)

/**
 * Real Veer chat transport: `POST /api/ai {messages, stream:true}` over
 * [SseClient]. The backend writes JSON frames on `data:` lines —
 * `{content}` token deltas, `{phase, label}` status, `{imageStart, …}`,
 * `{done: true, …}` and `{error, errorId}` on failure. Only content deltas
 * surface here as chunks; an error frame throws so the ViewModel can show an
 * honest error instead of a silently truncated reply.
 */
class SseChatStream(
    private val sseClient: com.ravikisan.platform.compose.core.stream.SseClient,
    private val session: SessionStore,
    private val json: Json = Json { ignoreUnknownKeys = true },
) : ChatEventStream {

    override fun stream(history: List<ChatTurn>): Flow<String> = flow {
        val token = session.getAccessToken()
        if (token.isNullOrBlank()) {
            throw HttpException(401, "Sign in to chat with Veer")
        }
        val body = json.encodeToString(
            AiChatRequestDto(
                messages = history.map { turn ->
                    AiChatMessageDto(
                        role = if (turn.role == ChatRole.USER) "user" else "assistant",
                        content = turn.text,
                    )
                },
            ),
        )
        sseClient.stream(url = "api/ai", authToken = token, body = body).collect { event ->
            val data = event.data ?: return@collect
            contentOrThrow(data)?.let { chunk -> if (chunk.isNotEmpty()) emit(chunk) }
        }
    }

    /**
     * Extract the `{content}` delta from one SSE frame. `{error}` frames throw;
     * status frames (`phase`/`done`/`imageStart`) return null.
     */
    private fun contentOrThrow(data: String): String? {
        val obj = runCatching { json.parseToJsonElement(data).jsonObject }.getOrNull() ?: return null
        (obj["error"] as? JsonPrimitive)?.content?.let { errorText ->
            throw HttpException(502, errorText)
        }
        return (obj["content"] as? JsonPrimitive)?.content
    }
}
