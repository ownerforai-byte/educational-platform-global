package com.ravikisan.platform.compose.data.api

import com.ravikisan.platform.compose.core.contract.AuthResponse
import com.ravikisan.platform.compose.core.contract.LoginRequest
import com.ravikisan.platform.compose.core.contract.SignupRequest
import com.ravikisan.platform.compose.core.contract.UserDto
import com.ravikisan.platform.compose.core.network.HttpException
import com.ravikisan.platform.compose.data.session.SessionStore
import kotlinx.serialization.json.Json

/**
 * Auth orchestration: calls the API, stores the session on success, wipes it on
 * 401/403 (SECURITY.md: dead-token sync loops must return the user to login).
 */
class AuthRepository(
    private val api: RnApi,
    private val session: SessionStore,
    private val json: Json = Json { ignoreUnknownKeys = true },
) {

    sealed class Result {
        data class Success(val user: UserDto?, val message: String?) : Result()
        data class Failure(val message: String, val status: Int? = null) : Result()
    }

    suspend fun login(email: String, password: String): Result = runCatching {
        val response = api.login(LoginRequest(email.trim(), password))
        handleAuthResponse(response)
    }.getOrElse { Result.Failure(HttpException.truncate(it.message ?: "Network error")) }

    suspend fun signup(fullName: String, email: String, password: String): Result = runCatching {
        val response = api.signup(SignupRequest(fullName.trim(), email.trim(), password))
        handleAuthResponse(response)
    }.getOrElse { Result.Failure(HttpException.truncate(it.message ?: "Network error")) }

    /** Validate the stored token against /api/auth/me; wipe on auth errors. */
    suspend fun refreshMe(): Result = runCatching {
        val response = api.me()
        if (response.isSuccessful) {
            val user = response.body()?.user
            if (user != null) session.setUser(user)
            Result.Success(user, null)
        } else {
            val status = response.code()
            if (status == 401 || status == 403) session.clear()
            Result.Failure(errorBodyMessage(response), status)
        }
    }.getOrElse { Result.Failure(HttpException.truncate(it.message ?: "Network error")) }

    fun signOut() {
        session.clear()
    }

    private suspend fun handleAuthResponse(response: retrofit2.Response<AuthResponse>): Result {
        val status = response.code()
        if (status == 401 || status == 403) session.clear()
        if (!response.isSuccessful) {
            return Result.Failure(errorBodyMessage(response), status)
        }
        val body = response.body() ?: return Result.Failure("Empty response", status)
        val token = body.accessToken
        if (token.isNullOrBlank()) {
            // 202-style "needs email confirmation" or gated account — no session stored.
            return Result.Failure(body.message ?: body.error ?: "Sign-in incomplete", status)
        }
        session.setAccessToken(token)
        body.user?.let { session.setUser(it) }
        return Result.Success(body.user, body.message)
    }

    private fun errorBodyMessage(response: retrofit2.Response<*>): String {
        val raw = runCatching { response.errorBody()?.string() }.getOrNull()
        val parsed = raw?.let { runCatching { json.decodeFromString<AuthResponse>(it) }.getOrNull() }
        val message = parsed?.error ?: raw?.take(300) ?: "HTTP ${response.code()}"
        return HttpException.truncate(message)
    }
}
