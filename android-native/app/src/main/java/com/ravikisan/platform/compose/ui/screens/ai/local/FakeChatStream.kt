package com.ravikisan.platform.compose.ui.screens.ai.local

import com.ravikisan.platform.compose.ui.screens.ai.ChatEventStream
import com.ravikisan.platform.compose.ui.screens.ai.ChatMessage
import com.ravikisan.platform.compose.ui.screens.ai.ChatRole
import com.ravikisan.platform.compose.ui.screens.ai.ChatTurn
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/**
 * Fake chat transport — KEPT FOR UNIT TESTS ONLY after the fake→real swap.
 * Production UI streams through [com.ravikisan.platform.compose.ui.screens.ai.SseChatStream]
 * (`POST /api/ai`, SSE). Emits token chunks with a small delay, exactly like
 * the wire protocol: many small deltas that the UI appends to the streaming
 * assistant message.
 *
 * [chunkDelayMs] is injectable so JVM tests can set it to 0.
 */
class FakeChatStream(private val chunkDelayMs: Long = 40) : ChatEventStream {

    /** Canned, curriculum-aware replies — keyword matched, NEB-flavoured. */
    fun replyFor(prompt: String): String {
        val p = prompt.lowercase()
        return when {
            "projectile" in p -> "A projectile's horizontal and vertical motions are independent. " +
                "Horizontal velocity stays constant while gravity accelerates the body vertically. " +
                "Time of flight T = 2u·sinθ/g, range R = u²·sin2θ/g, and the range is maximum at θ = 45°."
            "vector" in p -> "A vector has magnitude and direction. Use the parallelogram law for the " +
                "resultant: R = √(A² + B² + 2AB·cosθ). Resolve into components with Ax = A·cosθ and " +
                "Ay = A·sinθ, and remember the dot product vanishes for perpendicular vectors."
            "cell" in p || "mitochond" in p -> "Eukaryotic cells contain membrane-bound organelles. " +
                "The mitochondrion is the powerhouse: its inner membrane hosts the electron transport " +
                "chain, producing most of the cell's ATP. Cell division proceeds through the cell cycle " +
                "by mitosis (growth) or meiosis (gametes, halving chromosome number)."
            "dimension" in p || "significant" in p -> "Significant figures show measurement precision: " +
                "all non-zero digits count, zeros between non-zero digits count, and trailing zeros " +
                "after a decimal point count. Dimensional analysis checks equation homogeneity and can " +
                "derive relations — but it cannot find dimensionless constants."
            "hello" in p || "hi" in p || "namaste" in p -> "Namaste! I'm Veer, your study companion. " +
                "Ask me about any NEB syllabus topic — physics, biology, chemistry or maths."
            else -> "Good question. In the full build I answer from the curriculum corpus with citations " +
                "to your syllabus units. For now this is the offline demo reply — try asking about " +
                "projectiles, vectors, cells or significant figures."
        }
    }

    /** Streams [message] as small token chunks, then a completion signal. */
    fun stream(message: String): Flow<String> = flow {
        val chunks = message.chunked(7)
        chunks.forEachIndexed { index, chunk ->
            emit(chunk)
            if (index < chunks.lastIndex && chunkDelayMs > 0) delay(chunkDelayMs)
        }
    }

    /** [ChatEventStream] port: replies to the last user turn. */
    override fun stream(history: List<ChatTurn>): Flow<String> =
        stream(history.lastOrNull { it.role == ChatRole.USER }?.text.orEmpty())

    companion object {
        /** Convenience: build the assistant's streaming placeholder message. */
        fun streamingPlaceholder(): ChatMessage =
            ChatMessage(role = ChatRole.ASSISTANT, text = "", isStreaming = true)
    }
}
