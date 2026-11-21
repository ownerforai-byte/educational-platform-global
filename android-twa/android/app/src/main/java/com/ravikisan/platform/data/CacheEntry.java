package com.ravikisan.platform.data;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

@Entity(tableName = "app_cache")
public class CacheEntry {
    public CacheEntry() {}

    @Ignore
    public CacheEntry(@NonNull String key, String json, long updatedAt) {
        this.key = key;
        this.json = json;
        this.updatedAt = updatedAt;
    }

    @PrimaryKey
    @NonNull
    public String key;
    public String json;
    public long updatedAt;
}