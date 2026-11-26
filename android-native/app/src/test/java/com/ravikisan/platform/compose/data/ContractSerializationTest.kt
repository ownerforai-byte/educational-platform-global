package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.AuthResponse
import com.ravikisan.platform.compose.core.contract.FcmRegistrationRequest
import com.ravikisan.platform.compose.core.contract.LoginRequest
import com.ravikisan.platform.compose.core.contract.SignupRequest
import com.ravikisan.platform.compose.core.contract.UserDto
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * JVM unit tests for the wire DTOs in `core/contract` — verifies the exact field
 * names the backend expects (`snake_case` for spark_balance) survive serialization.
 */
class ContractSerializationTest {

    private val json = Json { ignoreUnknownKeys = true; explicitNulls = false }

    @Test
    fun `login request serializes to backend shape`() {
        val body = json.encodeToString(LoginRequest(email = "a@b.c", password = "secret1"))
        assertEquals("""{"email":"a@b.c","password":"secret1"}""", body)
    }

    @Test
    fun `signup request serializes to backend shape`() {
        val body = json.encodeToString(SignupRequest(fullName = "Ravi Kisan", email = "a@b.c", password = "secret12"))
        assertEquals("""{"fullName":"Ravi Kisan","email":"a@b.c","password":"secret12"}""", body)
    }

    @Test
    fun `fcm registration body matches access-requests schema`() {
        val body = json.encodeToString(FcmRegistrationRequest(fcmToken = "token-1234567890"))
        assertEquals("""{"fcmToken":"token-1234567890"}""", body)
    }

    @Test
    fun `auth response decodes user with snake_case spark_balance`() {
        val payload = """
            {"user":{"id":"u1","email":"a@b.c","spark_balance":42,"unknown_field":true},
             "accessToken":"tok"}
        """.trimIndent()
        val decoded = json.decodeFromString<AuthResponse>(payload)
        assertEquals("u1", decoded.user?.id)
        assertEquals(42, decoded.user?.sparkBalance)
        assertEquals("tok", decoded.accessToken)
        assertNull(decoded.message)
    }

    @Test
    fun `error payload decodes error and code`() {
        val decoded = json.decodeFromString<AuthResponse>("""{"error":"Invalid email or password format"}""")
        assertEquals("Invalid email or password format", decoded.error)
        assertTrue(decoded.user == null)
    }

    @Test
    fun `user dto round-trips`() {
        val user = UserDto(id = "u1", email = "a@b.c", fullName = "Ravi", sparkBalance = 7)
        val decoded = json.decodeFromString<UserDto>(json.encodeToString(UserDto.serializer(), user))
        assertEquals(user, decoded)
    }
}
