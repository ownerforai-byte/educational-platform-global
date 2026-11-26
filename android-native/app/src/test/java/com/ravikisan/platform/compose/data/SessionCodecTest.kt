package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.UserDto
import com.ravikisan.platform.compose.data.session.SessionCodec
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * JVM tests for [SessionCodec] — the pure serialization rules behind
 * [com.ravikisan.platform.compose.data.session.SessionManager].
 */
class SessionCodecTest {

    private val user = UserDto(id = "u1", email = "a@b.c", fullName = "Ravi", sparkBalance = 7)

    @Test
    fun `encode then decode round-trips`() {
        val decoded = SessionCodec.decodeUser(SessionCodec.encodeUser(user))
        assertEquals(user, decoded)
    }

    @Test
    fun `decode tolerates unknown backend fields`() {
        val decoded = SessionCodec.decodeUser("""{"id":"u1","future_field":true}""")
        assertEquals("u1", decoded?.id)
        assertNull(decoded?.fullName)
    }

    @Test
    fun `decode of garbage returns null instead of crashing sign-in restore`() {
        assertNull(SessionCodec.decodeUser("<html>corrupt</html>"))
        assertNull(SessionCodec.decodeUser("{"))
        assertNull(SessionCodec.decodeUser(null))
    }

    @Test
    fun `decode of blank string returns null`() {
        assertNull(SessionCodec.decodeUser(""))
    }
}
