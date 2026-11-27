package com.ravikisan.platform.compose.data.repository

import android.content.Context
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

/** One recently opened study unit (device-local, no PII beyond unit ids). */
@Serializable
data class RecentUnit(
    val id: String,
    val title: String,
    val openedAt: Long,
)

/**
 * Device-local "continue studying" recents for the Home dashboard. Stores the
 * `<subjectSlug>:<unitSlug>` route ids plus unit titles in a private
 * SharedPreferences file — same class of data as the Room curriculum cache
 * (public curriculum payloads, no tokens, no PII; see MainActivity's
 * security notes). Most-recent-first, capped at [CAPACITY].
 */
class RecentUnitsStore(context: Context, private val json: Json = Json { ignoreUnknownKeys = true }) {

    private val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    /** Record a unit open (moves it to the front, deduped). */
    fun record(unitRouteId: String, title: String) {
        if (unitRouteId.isBlank()) return
        val current = recent().filterNot { it.id == unitRouteId }
        val updated = (listOf(RecentUnit(unitRouteId, title, System.currentTimeMillis())) + current)
            .take(CAPACITY)
        prefs.edit().putString(KEY, json.encodeToString(updated)).apply()
    }

    /** Most-recent-first list (empty on first run). */
    fun recent(): List<RecentUnit> = runCatching {
        json.decodeFromString<List<RecentUnit>>(prefs.getString(KEY, "[]").orEmpty())
    }.getOrDefault(emptyList())

    private companion object {
        const val PREFS_NAME = "rn_recents"
        const val KEY = "recent_units"
        const val CAPACITY = 5
    }
}
