package com.ravikisan.platform.compose.ui.screens.ai

import androidx.lifecycle.ViewModel
import com.ravikisan.platform.compose.ui.screens.ai.local.FakeChatStream
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Veer chat state (Agent 4 task 6). Consumes the fake SSE stream chunk by
 * chunk and appends each delta to the streaming assistant message — the same
 * reduction the real SseClient will feed. [scope] is injectable so JVM tests
 * run with Dispatchers.Unconfined and a zero-delay fake stream; production
 * uses a Main-dispatcher scope cancelled in [onCleared] (viewModelScope's
 * ktx artifact is not declared in the module yet — avoids a gradle request).
 */
class VeerChatViewModel(
    private val stream: FakeChatStream = FakeChatStream(),
    private val scope: CoroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate),
) : ViewModel() {

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
        val placeholder = FakeChatStream.streamingPlaceholder()
        _messages.value = _messages.value + placeholder
        _isStreaming.value = true

        streamJob = scope.launch {
            try {
                stream.stream(stream.replyFor(trimmed)).collect { chunk ->
                    val current = _messages.value
                    val last = current.last()
                    _messages.value = current.dropLast(1) +
                        last.copy(text = last.text + chunk)
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
}
