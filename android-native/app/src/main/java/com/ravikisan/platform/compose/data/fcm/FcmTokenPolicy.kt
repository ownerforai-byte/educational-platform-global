package com.ravikisan.platform.compose.data.fcm

/**
 * Client-side mirror of the backend `POST /api/access-requests/fcm` schema
 * (`backend/src/api/access-requests.ts`: `fcmToken: z.string().min(8).max(4096)`).
 * Registering an out-of-bounds token is a guaranteed 400 — skip the call instead.
 */
object FcmTokenPolicy {

    const val MIN_LENGTH: Int = 8
    const val MAX_LENGTH: Int = 4096

    fun isValid(token: String?): Boolean =
        !token.isNullOrBlank() && token.length in MIN_LENGTH..MAX_LENGTH
}
