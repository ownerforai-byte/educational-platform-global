package com.ravikisan.platform.compose.data.db

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

/**
 * AES-256-GCM field encryption backed by an Android Keystore key. Personal Room
 * payloads must pass through this boundary; authentication/decryption failures
 * are surfaced and never fall back to plaintext.
 */
interface PersonalFieldCipher {
    fun seal(plaintext: String): String
    fun open(sealed: String): String
}

class FieldCipher : PersonalFieldCipher {
    override fun seal(plaintext: String): String {
        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.ENCRYPT_MODE, key())
        val ciphertext = cipher.doFinal(plaintext.toByteArray(Charsets.UTF_8))
        val iv = cipher.iv
        require(iv.size == IV_BYTES) { "Unexpected AES-GCM IV length" }
        return PREFIX + Base64.encodeToString(iv + ciphertext, Base64.NO_WRAP)
    }

    override fun open(sealed: String): String {
        require(sealed.startsWith(PREFIX)) { "Unsupported encrypted personal-store value" }
        val packed = Base64.decode(sealed.removePrefix(PREFIX), Base64.NO_WRAP)
        require(packed.size > IV_BYTES) { "Invalid encrypted personal-store value" }
        val iv = packed.copyOfRange(0, IV_BYTES)
        val ciphertext = packed.copyOfRange(IV_BYTES, packed.size)
        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.DECRYPT_MODE, key(), GCMParameterSpec(TAG_BITS, iv))
        return cipher.doFinal(ciphertext).toString(Charsets.UTF_8)
    }

    private fun key(): SecretKey {
        val keyStore = KeyStore.getInstance(KEYSTORE).apply { load(null) }
        (keyStore.getKey(ALIAS, null) as? SecretKey)?.let { return it }
        val generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, KEYSTORE)
        generator.init(
            KeyGenParameterSpec.Builder(
                ALIAS,
                KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT,
            )
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setKeySize(256)
                .setRandomizedEncryptionRequired(true)
                .build(),
        )
        return generator.generateKey()
    }

    private companion object {
        const val KEYSTORE = "AndroidKeyStore"
        const val ALIAS = "rn_personal_store_aes_gcm_v1"
        const val TRANSFORMATION = "AES/GCM/NoPadding"
        const val PREFIX = "enc:v1:"
        const val IV_BYTES = 12
        const val TAG_BITS = 128
    }
}
