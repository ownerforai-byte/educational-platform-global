package com.ravikisan.platform.compose.core.logic

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Loader + mappers for the golden vectors generated from the REAL website
 * TypeScript (`android-native/golden/generate-golden.ts` →
 * app/src/test/resources/golden/). The core/logic ports must reproduce these
 * outputs exactly.
 */
object Golden {

    private val json = Json { ignoreUnknownKeys = true }

    fun obj(name: String): JsonObject =
        Golden::class.java.classLoader
            .getResourceAsStream("golden/$name")!!
            .bufferedReader().readText()
            .let { json.parseToJsonElement(it).jsonObject }
}

fun JsonObject.obj(key: String): JsonObject = getValue(key).jsonObject

fun JsonObject.arr(key: String): JsonArray = getValue(key).jsonArray

fun JsonObject.str(key: String): String = getValue(key).jsonPrimitive.content

fun JsonObject.strOrNull(key: String): String? =
    (this[key] as? JsonPrimitive)?.takeIf { it.isString }?.content

fun JsonObject.int(key: String): Int = getValue(key).jsonPrimitive.content.toDouble().toInt()

fun JsonObject.double(key: String): Double = getValue(key).jsonPrimitive.content.toDouble()

fun JsonObject.doubleOrNull(key: String): Double? {
    val v = (this[key] as? JsonPrimitive) ?: return null
    if (v.isString) return null
    return v.content.toDoubleOrNull()
}

fun JsonObject.bool(key: String): Boolean = getValue(key).jsonPrimitive.content == "true"

fun JsonObject.strList(key: String): List<String> =
    (getValue(key) as? JsonArray)?.map { it.jsonPrimitive.content } ?: emptyList()

/** String-or-number field rendered the way the TS contract stringifies it. */
fun JsonObject.rawOrNull(key: String): String? =
    (this[key] as? JsonPrimitive)?.content

fun JsonObject.arrOrNull(key: String): JsonArray? =
    (this[key] as? JsonArray)

/* ── fixture mappers (JSON → port input models) ── */

fun JsonObject.toBank(): SubjectPyqBank = SubjectPyqBank(
    theory = (arrOrNull("theory") ?: JsonArray(emptyList())).map { b -> val bo = b.jsonObject
        BankTheoryBlock(
            title = bo.str("title"),
            notes = bo.strList("notes"),
            detail = bo.strOrNull("detail"),
        )
    },
    pyqs = (arrOrNull("pyqs") ?: JsonArray(emptyList())).map { y -> val yo = y.jsonObject
        BankPyqYear(
            year = yo.int("year"),
            title = yo.str("title"),
            units = yo.strList("units"),
            questions = yo.arr("questions").map { q -> val qo = q.jsonObject
                BankPyqQuestion(
                    question = qo.str("question"),
                    marks = qo.rawOrNull("marks"),
                    solution = qo.strOrNull("solution"),
                )
            },
        )
    },
    drills = (arrOrNull("drills") ?: JsonArray(emptyList())).map { d -> val djo = d.jsonObject
        BankDrill(
            id = djo.str("id"),
            question = djo.str("question"),
            solution = djo.strOrNull("solution"),
            unit = djo.str("unit"),
            kind = djo.str("kind"),
        )
    },
)

fun JsonArray.toMcqPool(): List<EntranceQuestion> = map { e ->
    EntranceQuestion(
        q = e.jsonObject.str("q"),
        options = e.jsonObject.strList("options"),
        answer = e.jsonObject.int("answer"),
        why = e.jsonObject.str("why"),
        exam = e.jsonObject.strOrNull("exam"),
    )
}

fun JsonArray.toQuizRows(): List<QuizRowLite> = map { e ->
    QuizRowLite(
        id = e.jsonObject.str("id"),
        subjectSlug = e.jsonObject.strOrNull("subjectSlug"),
        topic = e.jsonObject.strOrNull("topic"),
        answered = e.jsonObject.int("answered"),
        correct = e.jsonObject.int("correct"),
        createdat = e.jsonObject.str("createdat"),
    )
}

fun JsonArray.toProgressEntries(): List<ProgressEntryLite> = map { e ->
    val o = e.jsonObject
    ProgressEntryLite(
        id = o.str("id"),
        completed = o.bool("completed"),
        completedAt = o.strOrNull("completedAt"),
        status = o.strOrNull("status"),
        classSlug = o.strOrNull("classSlug"),
        subjectSlug = o.strOrNull("subjectSlug"),
        unitSlug = o.strOrNull("unitSlug"),
        topicSlug = o.strOrNull("topicSlug"),
        topic = (o["topic"] as? kotlinx.serialization.json.JsonObject)?.let { t ->
            ProgressTopicLite(
                slug = t.jsonObject.str("slug"),
                title = t.jsonObject.str("title"),
                chapterTitle = t.jsonObject["chapter"]?.let { c -> c.jsonObject.str("title") },
            )
        },
    )
}

fun JsonArray.toGoalCatalog(): List<GoalSubject> = map { e ->
    GoalSubject(
        key = e.jsonObject.str("key"),
        classSlug = e.jsonObject.str("classSlug"),
        className = e.jsonObject.str("className"),
        subjectSlug = e.jsonObject.str("subjectSlug"),
        subjectName = e.jsonObject.str("subjectName"),
    )
}
