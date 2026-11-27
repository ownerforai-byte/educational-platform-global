package com.ravikisan.platform.compose.ui.screens.srs

import com.ravikisan.platform.compose.core.logic.SrsState
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/**
 * SRS review-state <-> raw JSON glue (Agent 4 feature model). Reading is the
 * golden-tested `core/logic/Srs.kt::normalizeStore`; this file is the WRITE
 * side: serialize the store map back to the exact object shape the website's
 * `writeSrsStore` persists (`{ "<cardId>": { ease, interval, reps, lapses,
 * due } }`).
 */

fun encodeSrsStore(store: Map<String, SrsState>): String {
    val obj = buildJsonObject {
        store.forEach { (id, state) ->
            put(
                id,
                buildJsonObject {
                    put("ease", JsonPrimitive(state.ease))
                    put("interval", JsonPrimitive(state.interval))
                    put("reps", JsonPrimitive(state.reps))
                    put("lapses", JsonPrimitive(state.lapses))
                    put("due", JsonPrimitive(state.due))
                },
            )
        }
    }
    return obj.toString()
}

/** Corrupt-tolerant read through the golden-tested normalizer. */
fun decodeSrsStore(raw: String?): Map<String, SrsState> =
    com.ravikisan.platform.compose.core.logic.normalizeStore(raw)
