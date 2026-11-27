package com.ravikisan.platform.compose.data.repository

import com.ravikisan.platform.compose.data.db.PersonalFieldCipher
import com.ravikisan.platform.compose.data.db.PersonalStoreDao
import com.ravikisan.platform.compose.data.db.PersonalStoreEntry

/**
 * Device-local private data boundary. The Room row is opaque ciphertext at
 * rest; callers serialize their feature-specific models and use a stable
 * namespace. No network or account sync is performed here.
 */
class PersonalStoreRepository(
    private val dao: PersonalStoreDao,
    private val cipher: PersonalFieldCipher,
    private val now: () -> Long = System::currentTimeMillis,
) {
    suspend fun read(namespace: String): String? {
        require(NAMESPACE.matches(namespace)) { "Invalid personal-store namespace" }
        val entry = dao.get(namespace) ?: return null
        return cipher.open(entry.json)
    }

    suspend fun write(namespace: String, json: String) {
        require(NAMESPACE.matches(namespace)) { "Invalid personal-store namespace" }
        require(json.toByteArray(Charsets.UTF_8).size <= MAX_PAYLOAD_BYTES) {
            "Personal store exceeds the 256 KB limit"
        }
        dao.put(
            PersonalStoreEntry(
                namespace = namespace,
                json = cipher.seal(json),
                updatedAt = now(),
            ),
        )
    }

    suspend fun delete(namespace: String) {
        require(NAMESPACE.matches(namespace)) { "Invalid personal-store namespace" }
        dao.delete(namespace)
    }

    private companion object {
        val NAMESPACE = Regex("[a-z0-9_-]{1,64}")
        const val MAX_PAYLOAD_BYTES = 256 * 1024
    }
}
