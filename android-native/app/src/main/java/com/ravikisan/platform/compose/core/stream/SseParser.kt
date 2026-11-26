package com.ravikisan.platform.compose.core.stream

/**
 * Pure server-sent-events line parser — split out of [SseClient] so it is unit-testable
 * on the JVM without OkHttp or Android.
 */
object SseParser {

    /** One parsed SSE event. `data` is the joined `data:` payload; null when the event carries none. */
    data class Event(val event: String? = null, val data: String? = null)

    /**
     * Feed raw lines (without trailing newline) one at a time. Blank line = event
     * dispatch. Returns the completed event, or null while the event is still open.
     */
    fun feed(state: MutableState, line: String): Event? {
        when {
            line.isEmpty() -> {
                val event = if (state.data != null) Event(state.event, state.data) else null
                state.event = null
                state.data = null
                return event
            }
            line.startsWith(":") -> return null // comment / keep-alive
            line.startsWith("event:") -> state.event = line.removePrefix("event:").trim()
            line.startsWith("data:") -> {
                val chunk = line.removePrefix("data:").removePrefix(" ")
                state.data = if (state.data == null) chunk else state.data + "\n" + chunk
            }
            // `id:` and unknown fields are ignored (we do not resume streams).
        }
        return null
    }

    /** Parse a complete SSE text chunk (already received, e.g. in tests) into events. */
    fun parse(chunk: String): List<Event> {
        val state = MutableState()
        val events = mutableListOf<Event>()
        chunk.split("\r\n", "\n").forEach { line ->
            feed(state, line)?.let(events::add)
        }
        return events
    }

    class MutableState {
        var event: String? = null
        var data: String? = null
    }
}
