package com.ravikisan.platform.compose.ui.screens.downloads

import com.ravikisan.platform.compose.ui.screens.downloads.local.StoredPack
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Saved-packs <-> raw JSON glue (Agent 4 feature model). The store shape is
 * the website's `Record<packId, StoredPack>` verbatim
 * (`{ "<classSlug>/<subjectSlug>/<unitId>": { id, title, savedAt, markdown,
 * count } }`).
 */

/** Native pack id — identical to the website's `packId()` helper. */
fun packId(classSlug: String, subjectSlug: String, unitId: String): String =
    "$classSlug/$subjectSlug/$unitId"

fun encodePacks(packs: Map<String, StoredPack>): String {
    val obj = JsonObject(
        packs.mapValues { (_, p) ->
            JsonObject(
                mapOf(
                    "id" to kotlinx.serialization.json.JsonPrimitive(p.id),
                    "title" to kotlinx.serialization.json.JsonPrimitive(p.title),
                    "savedAt" to kotlinx.serialization.json.JsonPrimitive(p.savedAt),
                    "markdown" to kotlinx.serialization.json.JsonPrimitive(p.markdown),
                    "count" to kotlinx.serialization.json.JsonPrimitive(p.count),
                ),
            )
        },
    )
    return obj.toString()
}

/** Junk-tolerant read (malformed rows are dropped, like the TS try/catch). */
fun decodePacks(raw: String?): Map<String, StoredPack> {
    if (raw.isNullOrBlank()) return emptyMap()
    val obj = try {
        Json.parseToJsonElement(raw).jsonObject
    } catch (_: Exception) {
        return emptyMap()
    }
    return obj.mapNotNull { (key, value) ->
        val o = value as? JsonObject ?: return@mapNotNull null
        fun str(field: String) = (o[field] as? kotlinx.serialization.json.JsonPrimitive)?.takeIf { it.isString }?.jsonPrimitive?.content
        val id = str("id") ?: key
        val title = str("title") ?: return@mapNotNull null
        val savedAt = str("savedAt") ?: return@mapNotNull null
        val markdown = str("markdown") ?: return@mapNotNull null
        val count = (o["count"] as? kotlinx.serialization.json.JsonPrimitive)?.content?.toIntOrNull() ?: return@mapNotNull null
        key to StoredPack(id = id, title = title, savedAt = savedAt, markdown = markdown, count = count)
    }.toMap()
}
