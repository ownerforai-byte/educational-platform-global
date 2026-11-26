package com.ravikisan.platform.compose.data.session

import com.ravikisan.platform.compose.core.contract.UserDto

/**
 * Testability seam over the encrypted session store. Production binding is
 * [SessionManager] (EncryptedSharedPreferences); tests use in-memory fakes.
 * No plaintext fallback in any implementation (SECURITY.md).
 */
interface SessionStore {
    fun getAccessToken(): String?
    fun setAccessToken(token: String)
    fun getUser(): UserDto?
    fun setUser(user: UserDto)
    val isSignedIn: Boolean
    fun clear()
}
