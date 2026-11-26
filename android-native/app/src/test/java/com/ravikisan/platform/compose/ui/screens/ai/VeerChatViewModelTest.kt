package com.ravikisan.platform.compose.ui.screens.ai

import com.ravikisan.platform.compose.ui.screens.ai.local.FakeChatStream
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Veer chat VM tests with the fake SSE stream (Agent 4 task 6). Uses
 * Dispatchers.Unconfined + a zero-delay stream so the whole flow runs
 * synchronously inside runBlocking — no coroutines-test dependency needed.
 */
class VeerChatViewModelTest {

    private fun vm() = VeerChatViewModel(
        stream = FakeChatStream(chunkDelayMs = 0),
        scope = CoroutineScope(Dispatchers.Unconfined),
    )

    @Test
    fun `starts with the welcome assistant message`() {
        val chat = vm()
        assertEquals(1, chat.messages.value.size)
        assertEquals(ChatRole.ASSISTANT, chat.messages.value.first().role)
        assertFalse(chat.messages.value.first().isStreaming)
    }

    @Test
    fun `sending appends user message then streams assistant reply to completion`() = runBlocking {
        val chat = vm()
        chat.send("explain projectile motion")
        // Unconfined + zero delay: the stream completes synchronously.
        assertFalse(chat.isStreaming.value)
        val roles = chat.messages.value.map { it.role }
        assertEquals(listOf(ChatRole.ASSISTANT, ChatRole.USER, ChatRole.ASSISTANT), roles)
        val reply = chat.messages.value.last()
        assertFalse(reply.isStreaming)
        assertTrue(reply.text.contains("projectile", ignoreCase = true))
        return@runBlocking
    }

    @Test
    fun `assistant reply is streamed in multiple chunks`() {
        val stream = FakeChatStream(chunkDelayMs = 0)
        val chunks = mutableListOf<String>()
        runBlocking { stream.stream("hello world this is a test").collect { chunks.add(it) } }
        assertTrue("expected chunked stream, got ${chunks.size}", chunks.size > 1)
        assertEquals("hello world this is a test", chunks.joinToString(""))
    }

    @Test
    fun `empty prompt is ignored`() {
        val chat = vm()
        chat.send("   ")
        assertEquals(1, chat.messages.value.size)
        assertFalse(chat.isStreaming.value)
    }

    @Test
    fun `stopStreaming ends the streaming flag even if job cancelled`() {
        val chat = vm()
        chat.send("hello")
        chat.stopStreaming()
        assertFalse(chat.isStreaming.value)
        assertTrue(chat.messages.value.none { it.isStreaming })
    }

    @Test
    fun `reply is curriculum-aware for known keywords`() {
        val stream = FakeChatStream(chunkDelayMs = 0)
        assertTrue(stream.replyFor("what are vectors").contains("parallelogram", ignoreCase = true))
        assertTrue(stream.replyFor("cell structure").contains("mitochondrion", ignoreCase = true))
    }
}
