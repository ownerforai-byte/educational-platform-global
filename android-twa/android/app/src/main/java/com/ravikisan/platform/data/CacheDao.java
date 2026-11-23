package com.ravikisan.platform.data;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

@Dao
public interface CacheDao {
    @Query("SELECT json FROM app_cache WHERE `key` = :key LIMIT 1")
    String get(String key);

    @Query("SELECT updatedAt FROM app_cache WHERE `key` = :key LIMIT 1")
    Long updatedAt(String key);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void put(CacheEntry entry);

    @Query("DELETE FROM app_cache")
    void clearAll();
}