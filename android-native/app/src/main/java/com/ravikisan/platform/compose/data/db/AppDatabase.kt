package com.ravikisan.platform.compose.data.db

import androidx.room.Dao
import androidx.room.Database
import androidx.room.Entity
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.PrimaryKey
import androidx.room.Query
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
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

/** Device-local JSON stores for personal notes, journal, goals and review state. */
@Entity(tableName = "personal_store")
data class PersonalStoreEntry(
    @PrimaryKey val namespace: String,
    val json: String,
    val updatedAt: Long,
)

@Dao
interface PersonalStoreDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun put(entry: PersonalStoreEntry)

    @Query("SELECT * FROM personal_store WHERE namespace = :namespace")
    suspend fun get(namespace: String): PersonalStoreEntry?

    @Query("SELECT * FROM personal_store WHERE namespace = :namespace")
    fun observe(namespace: String): Flow<PersonalStoreEntry?>

    @Query("DELETE FROM personal_store WHERE namespace = :namespace")
    suspend fun delete(namespace: String)
}

@Database(entities = [CacheEntry::class, PersonalStoreEntry::class], version = 2, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun cache(): CacheDao
    abstract fun personalStore(): PersonalStoreDao

    companion object {
        const val NAME = "rn_platform_cache"

        /** Preserve the existing content cache while creating device-local stores. */
        val MIGRATION_1_2: Migration = object : Migration(1, 2) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL(
                    "CREATE TABLE IF NOT EXISTS `personal_store` " +
                        "(`namespace` TEXT NOT NULL, `json` TEXT NOT NULL, " +
                        "`updatedAt` INTEGER NOT NULL, PRIMARY KEY(`namespace`))",
                )
            }
        }
    }
}
