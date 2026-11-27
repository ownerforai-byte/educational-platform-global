package com.ravikisan.platform.compose.ui.screens.ai

import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Veer chat state — REAL transport (fake→real swap): replies stream from
 * `POST /api/ai {messages, stream:true}` over the OkHttp SSE client
 * ([SseChatStream]), token chunk by token chunk, exactly like the website.
 * Requires a signed-in session — the backend gates the route on auth; a
 * signed-out send surfaces an honest "Sign in to chat with Veer" message.
 *
 * [scope] is injectable so JVM tests run with Dispatchers.Unconfined and the
 * fake stream; production uses a Main-dispatcher scope cancelled in
 * [onCleared] (viewModelScope's ktx artifact is not declared in the module).
 */
@HiltViewModel
class VeerChatViewModel @Inject constructor(
    private val stream: ChatEventStream,
) : ViewModel() {

    /** Test constructor: injectable scope (Dispatchers.Unconfined on the JVM). */
    constructor(stream: ChatEventStream, scope: CoroutineScope) : this(stream) {
        this.scope = scope
    }

    internal var scope: CoroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

    private val _messages = MutableStateFlow<List<ChatMessage>>(emptyList())
    val messages: StateFlow<List<ChatMessage>> = _messages.asStateFlow()

    private val _isStreaming = MutableStateFlow(false)
    val isStreaming: StateFlow<Boolean> = _isStreaming.asStateFlow()

    private var streamJob: Job? = null

    init {
        _messages.value = listOf(
            ChatMessage(
                role = ChatRole.ASSISTANT,
                text = "Namaste! I'm Veer, your study companion. Ask me anything from your syllabus.",
            ),
        )
    }

    fun send(prompt: String) {
        val trimmed = prompt.trim()
        if (trimmed.isEmpty() || _isStreaming.value) return

        _messages.value = _messages.value + ChatMessage(role = ChatRole.USER, text = trimmed)
        _messages.value = _messages.value + ChatMessage(role = ChatRole.ASSISTANT, text = "", isStreaming = true)
        _isStreaming.value = true

        // Send the visible conversation tail (never the streaming placeholder).
        val history = _messages.value.dropLast(1)
            .filter { it.text.isNotBlank() }
            .takeLast(MAX_HISTORY_TURNS)
            .map { ChatTurn(it.role, it.text) }

        streamJob = scope.launch {
            try {
                stream.stream(history).collect { chunk ->
                    val current = _messages.value
                    val last = current.last()
                    _messages.value = current.dropLast(1) +
                        last.copy(text = last.text + chunk)
                }
            } catch (cancelled: CancellationException) {
                throw cancelled
            } catch (t: Throwable) {
                val current = _messages.value
                val last = current.lastOrNull()
                if (last != null && last.isStreaming && last.text.isEmpty()) {
                    _messages.value = current.dropLast(1) + last.copy(
                        text = t.message?.takeIf { it.isNotBlank() }
                            ?: "Veer is unreachable right now — try again in a moment.",
                    )
                }
            } finally {
                finishStreaming()
            }
        }
    }

    fun stopStreaming() {
        streamJob?.cancel()
        finishStreaming()
    }

    private fun finishStreaming() {
        val current = _messages.value
        val last = current.lastOrNull()
        if (last != null && last.isStreaming) {
            _messages.value = current.dropLast(1) + last.copy(isStreaming = false)
        }
        _isStreaming.value = false
    }

    override fun onCleared() {
        streamJob?.cancel()
        super.onCleared()
    }

    private companion object {
        /** Conversation tail sent with each request (the server re-anchors on its own corpus). */
        const val MAX_HISTORY_TURNS = 8
    }
}
