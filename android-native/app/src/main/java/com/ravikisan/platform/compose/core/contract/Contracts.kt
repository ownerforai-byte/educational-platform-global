package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * Wire DTOs shared by the data layer (Agent 3) and UI fakes (Agent 4).
 * Shapes mirror the backend contract:
 * - `POST /api/auth/login`  {email,password} → {user, accessToken}
 * - `POST /api/auth/signup` {fullName,email,password} → {user, accessToken, message?}
 * - `GET  /api/auth/me` → {user}
 * - `POST /api/access-requests/fcm` {fcmToken}
 * - `DELETE /api/access-requests/fcm`
 */
@Serializable
data class UserDto(
    val id: String? = null,
    val email: String? = null,
    val fullName: String? = null,
    val role: String? = null,
    val status: String? = null,
    val tier: String? = null,
    @SerialName("spark_balance") val sparkBalance: Int? = null,
)

@Serializable
data class LoginRequest(val email: String, val password: String)

@Serializable
data class SignupRequest(
    val fullName: String,
    val email: String,
    val password: String,
)

@Serializable
data class AuthResponse(
    val user: UserDto? = null,
    val accessToken: String? = null,
    val message: String? = null,
    val error: String? = null,
)

@Serializable
data class MeResponse(val user: UserDto? = null, val error: String? = null)

@Serializable
data class FcmRegistrationRequest(val fcmToken: String)

@Serializable
data class ApiError(val error: String? = null, val code: String? = null)
