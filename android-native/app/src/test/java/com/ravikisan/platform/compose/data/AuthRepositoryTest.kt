package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.AuthResponse
import com.ravikisan.platform.compose.core.contract.MeResponse
import com.ravikisan.platform.compose.core.contract.UserDto
import com.ravikisan.platform.compose.data.api.AuthRepository
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * JVM tests for [AuthRepository] error paths and session side effects.
 * No Android, no OkHttp — [FakeRnApi] replays scripted [retrofit2.Response]s.
 */
class AuthRepositoryTest {

    private lateinit var api: FakeRnApi
    private lateinit var session: FakeSessionStore
    private lateinit var repo: AuthRepository

    private val user = UserDto(id = "u1", email = "a@b.c", fullName = "Ravi", sparkBalance = 42)

    @Before
    fun setUp() {
        api = FakeRnApi()
        session = FakeSessionStore()
        repo = AuthRepository(api, session)
    }

    // ── login ──────────────────────────────────────────────────────────────

    @Test
    fun `login success stores token and user`() = runBlocking {
        api.loginResponse = retrofit2.Response.success(
            AuthResponse(user = user, accessToken = "tok-1"),
        )
        val result = repo.login("a@b.c", "secret1")
        assertTrue(result is AuthRepository.Result.Success)
        assertEquals("tok-1", session.storedToken)
        assertEquals("Ravi", session.storedUser?.fullName)
        assertEquals(1, session.setTokenCount)
        assertEquals(0, session.clearedCount)
    }

    @Test
    fun `login 401 wipes any existing session`() = runBlocking {
        session.setAccessToken("stale-token")
        api.loginResponse = FakeRnApi.error(401, """{"error":"Invalid credentials"}""")
        val result = repo.login("a@b.c", "wrong")
        assertTrue(result is AuthRepository.Result.Failure)
        assertEquals(401, (result as AuthRepository.Result.Failure).status)
        assertNull(session.storedToken)
        assertEquals(1, session.clearedCount)
    }

    @Test
    fun `login 403 also wipes session`() = runBlocking {
        session.setAccessToken("stale-token")
        api.loginResponse = FakeRnApi.error(403, """{"error":"Forbidden"}""")
        val result = repo.login("a@b.c", "x")
        assertEquals(403, (result as AuthRepository.Result.Failure).status)
        assertNull(session.storedToken)
    }

    @Test
    fun `login 400 parses error body message`() = runBlocking {
        api.loginResponse = FakeRnApi.error(400, """{"error":"Invalid email or password format"}""")
        val result = repo.login("not-an-email", "x")
        val failure = result as AuthRepository.Result.Failure
        assertEquals(400, failure.status)
        assertEquals("Invalid email or password format", failure.message)
        assertNull(session.storedToken) // nothing stored on failure
    }

    @Test
    fun `login success without token is a failure with message (202-style gate)`() = runBlocking {
        api.loginResponse = retrofit2.Response.success(
            AuthResponse(message = "Awaiting approval"),
        )
        val result = repo.login("a@b.c", "secret1")
        val failure = result as AuthRepository.Result.Failure
        assertEquals("Awaiting approval", failure.message)
        assertNull(session.storedToken)
    }

    @Test
    fun `network exception becomes Failure with truncated message`() = runBlocking {
        api.loginError = java.io.IOException("connection refused, plus a very long tail " + "x".repeat(500))
        val result = repo.login("a@b.c", "secret1")
        val failure = result as AuthRepository.Result.Failure
        assertTrue(failure.message.length <= 301)
        assertNull(session.storedToken)
    }

    // ── signup ─────────────────────────────────────────────────────────────

    @Test
    fun `signup success stores session`() = runBlocking {
        api.signupResponse = retrofit2.Response.success(
            AuthResponse(user = user, accessToken = "tok-2"),
        )
        val result = repo.signup("Ravi Kisan", "a@b.c", "secret12")
        assertTrue(result is AuthRepository.Result.Success)
        assertEquals("tok-2", session.storedToken)
        assertEquals("Ravi Kisan", api.signupBodies.single().fullName)
    }

    @Test
    fun `signup 409 conflict surfaces server message`() = runBlocking {
        api.signupResponse = FakeRnApi.error(409, """{"error":"Email already registered"}""")
        val result = repo.signup("Ravi Kisan", "a@b.c", "secret12")
        assertEquals("Email already registered", (result as AuthRepository.Result.Failure).message)
    }

    // ── refreshMe ──────────────────────────────────────────────────────────

    @Test
    fun `me success updates stored user`() = runBlocking {
        session.setAccessToken("tok")
        api.meResponse = retrofit2.Response.success(MeResponse(user = user))
        val result = repo.refreshMe()
        assertTrue(result is AuthRepository.Result.Success)
        assertEquals(42, session.storedUser?.sparkBalance)
        assertEquals(1, api.meCalls)
    }

    @Test
    fun `me 401 clears session (dead-token guard)`() = runBlocking {
        session.setAccessToken("dead")
        api.meResponse = FakeRnApi.error(401, """{"error":"Expired"}""")
        val result = repo.refreshMe()
        assertTrue(result is AuthRepository.Result.Failure)
        assertNull(session.storedToken)
    }

    @Test
    fun `me malformed error body still reports failure without crashing`() = runBlocking {
        session.setAccessToken("tok")
        api.meResponse = FakeRnApi.error(500, "<html>not json</html>")
        val result = repo.refreshMe()
        val failure = result as AuthRepository.Result.Failure
        assertEquals(500, failure.status)
        assertNotNull(failure.message)
        assertEquals("tok", session.storedToken) // non-auth errors keep the session
    }

    // ── signOut ────────────────────────────────────────────────────────────

    @Test
    fun `signOut clears session`() = runBlocking {
        session.setAccessToken("tok")
        session.setUser(user)
        repo.signOut()
        assertNull(session.storedToken)
        assertNull(session.storedUser)
        assertEquals(1, session.clearedCount)
    }
}
