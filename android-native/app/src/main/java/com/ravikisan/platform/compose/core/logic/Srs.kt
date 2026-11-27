package com.ravikisan.platform.compose.core.logic

import java.time.LocalDate
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Spaced repetition: SM-2 scheduler and card builder — Kotlin port of
 * `frontend/features/srs/index.ts` (parity plan §0.5 task 1).
 *
 * Cards are DERIVED from the pyq-bank (theory/concept notes, PYQ questions,
 * concept drills); nothing is authored here. Review state is device-local.
 * Ported rule-for-rule; unit-tested against golden vectors generated from the
 * TypeScript (`app/src/test/resources/golden/srs-golden.json`).
 */

const val SRS_KEY = "neb-srs:v1"

data class SrsCard(
    val id: String,
    val subjectKey: String,
    val kind: String,
    val front: String,
    val back: String,
)

data class SrsState(
    /** SM-2 easiness factor (>= 1.3). */
    val ease: Double,
    /** Current interval in days. */
    val interval: Int,
    /** Consecutive successful reviews. */
    val reps: Int,
    val lapses: Int,
    /** ISO date (YYYY-MM-DD) the card is next due. */
    val due: String,
)

/** Self-grade 0-5 as in SM-2; < 3 is a lapse. */
const val NEW_CARD_EASE = 2.5

fun newCardState(today: String): SrsState = SrsState(ease = 2.5, interval = 0, reps = 0, lapses = 0, due = today)

fun isoDay(date: LocalDate): String = date.toString()

fun addDays(iso: String, days: Int): String = LocalDate.parse(iso).plusDays(days.toLong()).toString()

/** One SM-2 step. Pure: returns the next state for a review done on `today`. */
fun sm2(prev: SrsState?, quality: Int, today: String): SrsState {
    val base = prev ?: newCardState(today)
    val ease = maxOf(1.3, base.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
    if (quality < 3) {
        return SrsState(ease = ease, interval = 1, reps = 0, lapses = base.lapses + 1, due = addDays(today, 1))
    }
    val reps = base.reps + 1
    val interval = when (reps) {
        1 -> 1
        2 -> 6
        else -> maxOf(1, Math.round(base.interval * ease).toInt())
    }
    return SrsState(ease = ease, interval = interval, reps = reps, lapses = base.lapses, due = addDays(today, interval))
}

/** djb2 over UTF-16 code units, then base-36 — identical to the TS `hash`. */
internal fun srsHash(text: String): String {
    var h = 5381
    for (ch in text) {
        // Int arithmetic wraps mod 2^32, matching the TS `(h << 5) + h + code | 0`.
        h = (h shl 5) + h + ch.code
    }
    // TS does `>>> 0` (uint32) before base-36; Kotlin Long.toString(36) gives the same digits.
    return (h.toLong() and 0xFFFFFFFFL).toString(36)
}

/** Build the card deck for one subject from its pyq-bank. Stable ids, deduped. */
fun buildCards(subjectKey: String, bank: SubjectPyqBank): List<SrsCard> {
    val cards = ArrayList<SrsCard>()
    val seen = HashSet<String>()
    fun add(kind: String, front: String, back: String) {
        val f = front.trim()
        val b = back.trim()
        if (f.isEmpty() || b.isEmpty()) return
        val id = "$subjectKey:$kind:${srsHash(f)}"
        if (!seen.add(id)) return
        cards.add(SrsCard(id = id, subjectKey = subjectKey, kind = kind, front = f, back = b))
    }
    for (block in bank.theory) {
        val back = (block.notes + listOfNotNull(block.detail))
            .filter { it.isNotEmpty() }
            .joinToString("\n")
        add("concept", block.title, back)
    }
    for (year in bank.pyqs) {
        for (q in year.questions) add("pyq", q.question, q.solution ?: "")
    }
    for (drill in bank.drills) add("drill", drill.question, drill.solution ?: "")
    return cards
}

data class DueQueue(
    val due: List<SrsCard>,
    val fresh: List<SrsCard>,
)

/** Cards due today or earlier (oldest first), plus up to `newLimit` unseen cards. */
fun dueQueue(cards: List<SrsCard>, store: Map<String, SrsState>, today: String, newLimit: Int = 10): DueQueue {
    val due = cards
        .filter { store[it.id]?.let { s -> s.due <= today } == true }
        .sortedBy { store.getValue(it.id).due }
    val fresh = cards.filter { it.id !in store }.take(maxOf(0, newLimit))
    return DueQueue(due = due, fresh = fresh)
}

private val ISO_DATE = Regex("""^\d{4}-\d{2}-\d{2}$""")

private fun isValidState(entry: JsonObject): Boolean {
    fun isNumber(key: String) = entry[key]?.let { it is kotlinx.serialization.json.JsonPrimitive && !it.jsonPrimitive.isString } == true
    val due = entry["due"]?.let { it as? kotlinx.serialization.json.JsonPrimitive } ?: return false
    return isNumber("ease") && isNumber("interval") && isNumber("reps") && isNumber("lapses") &&
        due.isString && ISO_DATE.containsMatchIn(due.content)
}

/**
 * Coerce parsed JSON into a valid store, dropping every invalid entry —
 * the TS `normalizeStore`. Takes the RAW JSON text (device-local storage
 * holds a string); corrupt JSON yields an empty store, never a crash.
 */
fun normalizeStore(raw: String?): Map<String, SrsState> {
    if (raw.isNullOrBlank()) return emptyMap()
    val obj = try {
        Json.parseToJsonElement(raw).jsonObject
    } catch (_: Exception) {
        return emptyMap()
    }
    val out = LinkedHashMap<String, SrsState>()
    for ((id, value) in obj) {
        val entry = value as? JsonObject ?: continue
        if (!isValidState(entry)) continue
        out[id] = SrsState(
            ease = entry.jsonNumber("ease"),
            interval = entry.jsonNumber("interval").toInt(),
            reps = entry.jsonNumber("reps").toInt(),
            lapses = entry.jsonNumber("lapses").toInt(),
            due = entry.getValue("due").jsonPrimitive.content,
        )
    }
    return out
}

private fun JsonObject.jsonNumber(key: String): Double =
    getValue(key).jsonPrimitive.content.toDouble()
