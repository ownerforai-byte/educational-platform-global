package com.ravikisan.platform.compose.data.db

import androidx.room.Dao
import androidx.room.Database
import androidx.room.Entity
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.PrimaryKey
import androidx.room.Query
import androidx.room.RoomDatabase
import kotlinx.coroutines.flow.Flow

/**
 * Offline cache for API payloads (SECURITY.md: "Offline API cache (Room) — JSON
 * sealed with FieldCipher"; sealing is applied by callers, the store is opaque).
 */
@Entity(tableName = "app_cache")
data class CacheEntry(
    @PrimaryKey val key: String,
    val json: String,
    val updatedAt: Long,
)

@Dao
interface CacheDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun put(entry: CacheEntry)

    @Query("SELECT * FROM app_cache WHERE `key` = :key")
    suspend fun get(key: String): CacheEntry?

    @Query("SELECT * FROM app_cache WHERE `key` = :key")
    fun observe(key: String): Flow<CacheEntry?>

    @Query("DELETE FROM app_cache")
    suspend fun clearAll()

    @Query("DELETE FROM app_cache WHERE `key` = :key")
    suspend fun delete(key: String)

    @Query("SELECT COUNT(*) FROM app_cache")
    suspend fun count(): Int
}

@Database(entities = [CacheEntry::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun cache(): CacheDao

    companion object {
        const val NAME = "rn_platform_cache"
    }
}
