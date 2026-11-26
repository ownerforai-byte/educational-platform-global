package com.ravikisan.platform.compose.data.session

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.ravikisan.platform.compose.core.contract.UserDto

/**
 * Encrypted session store — AES-256-GCM via Android Keystore
 * (`EncryptedSharedPreferences`), **no plaintext fallback** (SECURITY.md "Data at rest").
 * Holds the access token + cached user JSON. Sign-out clears everything.
 * Implements [SessionStore] (the test seam); serialization rules live in [SessionCodec].
 */
class SessionManager(context: Context) : SessionStore {

    private val prefs: SharedPreferences = run {
        val masterKey = MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
        EncryptedSharedPreferences.create(
            context,
            "rn_secure_session",
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM,
        )
    }

    override fun getAccessToken(): String? =
        prefs.getString(KEY_ACCESS_TOKEN, null)?.takeIf { it.isNotBlank() }

    override fun setAccessToken(token: String) {
        prefs.edit().putString(KEY_ACCESS_TOKEN, token).apply()
    }

    override fun getUser(): UserDto? = SessionCodec.decodeUser(prefs.getString(KEY_USER, null))

    override fun setUser(user: UserDto) {
        prefs.edit().putString(KEY_USER, SessionCodec.encodeUser(user)).apply()
    }

    override val isSignedIn: Boolean
        get() = getAccessToken() != null

    /** Sign-out: wipes token + user (Room cache wipe is handled by the sync layer). */
    override fun clear() {
        prefs.edit().clear().apply()
    }

    private companion object {
        const val KEY_ACCESS_TOKEN = "access_token"
        const val KEY_USER = "user_json"
    }
}
