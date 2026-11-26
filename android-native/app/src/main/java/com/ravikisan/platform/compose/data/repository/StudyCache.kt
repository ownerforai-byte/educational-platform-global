package com.ravikisan.platform.compose.data.repository

import com.ravikisan.platform.compose.data.db.CacheDao
import com.ravikisan.platform.compose.data.db.CacheEntry

/**
 * Offline-cache seam over Room for keyed payload rows in `app_cache`.
 * Production binding is [RoomStudyCache]; tests use in-memory fakes — Room
 * itself needs an Android context and stays off the JVM test path.
 *
 * Keys mirror the backend content-cache keys so a cache row maps 1:1 to the
 * endpoint payload it holds:
 * - `mobile-syllabus:v1`                 → GET /api/mobile/syllabus
 * - `mobile-units:v1:<subjectSlug>`      → GET /api/mobile/units?subject=…
 * - `mobile-notes:v1:<subject|all>`      → GET /api/mobile/notes (first page only)
 * - `r-note:v1:<id>`                     → GET /api/r-notes/:id
 */
interface StudyCache {
    suspend fun get(key: String): CacheEntry?

    suspend fun put(key: String, json: String, updatedAt: Long)

    suspend fun delete(key: String)
}

/** Room-backed [StudyCache] — one row per payload kind in `app_cache`. */
class RoomStudyCache(
    private val dao: CacheDao,
) : StudyCache {

    override suspend fun get(key: String): CacheEntry? = dao.get(key)

    override suspend fun put(key: String, json: String, updatedAt: Long) {
        dao.put(CacheEntry(key = key, json = json, updatedAt = updatedAt))
    }

    override suspend fun delete(key: String) {
        dao.delete(key)
    }
}
