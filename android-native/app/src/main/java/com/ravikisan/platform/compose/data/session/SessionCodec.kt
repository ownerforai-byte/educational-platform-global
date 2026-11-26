package com.ravikisan.platform.compose.data.session

import com.ravikisan.platform.compose.core.contract.UserDto
import kotlinx.serialization.json.Json

/**
 * Pure JSON codec for the cached user payload — split out of [SessionManager] so the
 * serialization rules (ignoreUnknownKeys, garbage input → null) are unit-testable
 * on the JVM without Android.
 */
object SessionCodec {

    private val json = Json { ignoreUnknownKeys = true }

    fun encodeUser(user: UserDto): String = json.encodeToString(UserDto.serializer(), user)

    /** Returns null on malformed input instead of crashing sign-in restore. */
    fun decodeUser(raw: String?): UserDto? = raw?.let { value ->
        runCatching { json.decodeFromString<UserDto>(value) }.getOrNull()
    }
}
