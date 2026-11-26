package com.ravikisan.platform.compose.core

import com.ravikisan.platform.compose.core.stream.SseParser
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * JVM unit tests for the pure SSE parser (no OkHttp, no coroutines).
 */
class SseParserTest {

    @Test
    fun `single data line becomes one event on blank line`() {
        val events = SseParser.parse("data: hello\n\n")
        assertEquals(1, events.size)
        assertEquals("hello", events[0].data)
        assertNull(events[0].event)
    }

    @Test
    fun `named event carries its name`() {
        val events = SseParser.parse("event: token\ndata: {\"t\":\"Hi\"}\n\n")
        assertEquals(1, events.size)
        assertEquals("token", events[0].event)
        assertEquals("{\"t\":\"Hi\"}", events[0].data)
    }

    @Test
    fun `multiple data lines are joined with newline`() {
        val events = SseParser.parse("data: a\ndata: b\n\n")
        assertEquals(1, events.size)
        assertEquals("a\nb", events[0].data)
    }

    @Test
    fun `comments and keep-alives are ignored`() {
        val events = SseParser.parse(": ping\n\n: keep-alive\n\n")
        assertEquals(0, events.size)
    }

    @Test
    fun `blank line with no data dispatches nothing`() {
        val events = SseParser.parse("event: ping\n\n")
        assertEquals(0, events.size)
    }

    @Test
    fun `crlf line endings are handled`() {
        val events = SseParser.parse("data: x\r\n\r\n")
        assertEquals(1, events.size)
        assertEquals("x", events[0].data)
    }

    @Test
    fun `id and unknown fields are ignored`() {
        val events = SseParser.parse("id: 42\ndata: y\n\n")
        assertEquals(1, events.size)
        assertEquals("y", events[0].data)
    }

    @Test
    fun `data without trailing blank line stays buffered until blank line`() {
        val state = SseParser.MutableState()
        assertNull(SseParser.feed(state, "data: partial")) // still open
        val event = SseParser.feed(state, "") // blank line dispatches
        assertEquals("partial", event?.data)
    }

    @Test
    fun `multiple events in one chunk are all parsed`() {
        val events = SseParser.parse("data: one\n\ndata: two\n\n")
        assertEquals(2, events.size)
        assertEquals("one", events[0].data)
        assertEquals("two", events[1].data)
    }

    @Test
    fun `empty data payload dispatches an event with empty string`() {
        val events = SseParser.parse("data:\n\n")
        assertEquals(1, events.size)
        assertEquals("", events[0].data)
    }

    @Test
    fun `data prefix without space is not trimmed of payload`() {
        val events = SseParser.parse("data:no-space\n\n")
        assertEquals("no-space", events[0].data)
    }

    @Test
    fun `event field without value is tolerated`() {
        val events = SseParser.parse("event:\ndata: x\n\n")
        assertEquals(1, events.size)
        assertEquals("", events[0].event)
        assertEquals("x", events[0].data)
    }

    @Test
    fun `stream of tokens parses incrementally through feed`() {
        val state = SseParser.MutableState()
        assertNull(SseParser.feed(state, "event: token"))
        assertNull(SseParser.feed(state, "data: {\"t\":\"Hi\"}"))
        val event = SseParser.feed(state, "")
        assertEquals("token", event?.event)
        assertEquals("{\"t\":\"Hi\"}", event?.data)
    }
}
