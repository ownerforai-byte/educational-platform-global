package com.ravikisan.platform.compose.core.logic

/**
 * Mock exam assembler + scorer — Kotlin port of
 * `frontend/features/mock-exam/index.ts` (parity plan §0.5 task 2).
 *
 * Section A (objective, OMR sheet): MCQs shuffled with a seeded RNG so a
 * paper is reproducible; auto-scored against the answer key. Section B
 * (written): PYQs marked by the student against the model solution. 1 mark
 * per objective question, no negative marking. Ported rule-for-rule; tested
 * against `golden/mock-exam-golden.json`.
 */

data class ObjectiveItem(
    val id: String,
    val q: String,
    val options: List<String>,
    /** Index of the correct option AFTER shuffling. */
    val answer: Int,
    val why: String,
    val exam: String? = null,
)

data class WrittenItem(
    val id: String,
    val question: String,
    val solution: String? = null,
    val marks: Double,
    val year: Int,
)

data class MockPaper(
    val seed: Int,
    val objective: List<ObjectiveItem>,
    val written: List<WrittenItem>,
    val durationMinutes: Double,
    val totalMarks: Double,
)

data class MockScore(
    val correct: Int,
    val wrong: Int,
    val blank: Int,
    val objectiveMarks: Int,
    val writtenMarks: Double,
    val total: Double,
    val outOf: Double,
    val percent: Int,
)

val OMR_LETTERS = listOf("A", "B", "C", "D", "E", "F")

/** One MCQ of the entrance bank, as the assembler consumes it. */
data class EntranceQuestion(
    val q: String,
    val options: List<String>,
    /** Index of the correct option BEFORE shuffling. */
    val answer: Int,
    val why: String,
    val exam: String? = null,
)

/**
 * mulberry32 PRNG — bit-exact port of the TS version. Int arithmetic wraps
 * mod 2^32 exactly like the JS `>>> 0` / `Math.imul` dance, so the sequence
 * of doubles is identical for a given seed.
 */
fun mulberry32(seed: Int): () -> Double {
    var a = seed
    return {
        a += 0x6d2b79f5
        var t = a
        t = (t xor (t ushr 15)) * (t or 1)
        // TS: `t ^= t + Math.imul(t ^ (t >>> 7), t | 61)` — add first, then xor.
        t = t xor (t + ((t xor (t ushr 7)) * (t or 61)))
        val uint32 = (t xor (t ushr 14)).toLong() and 0xFFFFFFFFL
        uint32 / 4294967296.0
    }
}

/** Fisher–Yates exactly as the TS `shuffle` (descending i, rnd per step). */
private fun <T> shuffle(items: List<T>, rnd: () -> Double): List<T> {
    val out = items.toMutableList()
    for (i in out.size - 1 downTo 1) {
        val j = Math.floor(rnd() * (i + 1)).toInt()
        val tmp = out[i]
        out[i] = out[j]
        out[j] = tmp
    }
    return out
}

/** TS `parseFloat` semantics: leading-number prefix, else NaN → fallback. */
private val FLOAT_PREFIX = Regex("""[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?""")

fun parseMarks(marks: String?, fallback: Double = 5.0): Double {
    if (marks == null) return fallback
    val match = FLOAT_PREFIX.find(marks.trimStart()) ?: return fallback
    val n = match.value.toDoubleOrNull() ?: return fallback
    // TS: `Number.isFinite(n) && n > 0 ? n : fallback`
    return if (n > 0) n else fallback
}

data class AssembleOptions(
    val mcqPool: List<EntranceQuestion>,
    val pyqs: List<BankPyqYear>,
    val objectiveCount: Int = 20,
    val writtenCount: Int = 4,
    val seed: Int = 1,
)

/** Build a paper. Counts are capped by what the pools actually hold. */
fun assembleMock(options: AssembleOptions): MockPaper {
    val rnd = mulberry32(options.seed)
    val objective = shuffle(options.mcqPool, rnd)
        .take(maxOf(0, options.objectiveCount))
        .mapIndexed { i, item ->
            val order = shuffle(List(item.options.size) { it }, rnd)
            ObjectiveItem(
                id = "o${i + 1}",
                q = item.q,
                options = order.map { item.options[it] },
                answer = order.indexOf(item.answer),
                why = item.why,
                exam = item.exam,
            )
        }
    val flat = options.pyqs.flatMap { y -> y.questions.map { q -> q to y.year } }
    val written = shuffle(flat, rnd)
        .take(maxOf(0, options.writtenCount))
        .mapIndexed { i, (q, year) ->
            WrittenItem(
                id = "w${i + 1}",
                question = q.question,
                solution = q.solution,
                marks = parseMarks(q.marks),
                year = year,
            )
        }
    val writtenMarks = written.sumOf { it.marks }
    return MockPaper(
        seed = options.seed,
        objective = objective,
        written = written,
        // 1 minute per MCQ, 2 minutes per written mark.
        durationMinutes = objective.size + writtenMarks * 2,
        totalMarks = objective.size + writtenMarks,
    )
}

/** Auto-score the OMR sheet; `selfMarks` is written-section marks awarded per id (clamped). */
fun scoreMock(
    paper: MockPaper,
    answers: Map<String, Int>,
    selfMarks: Map<String, Double> = emptyMap(),
): MockScore {
    var correct = 0
    var wrong = 0
    var blank = 0
    for (item in paper.objective) {
        val picked = answers[item.id]
        when {
            picked == null || picked < 0 -> blank += 1
            picked == item.answer -> correct += 1
            else -> wrong += 1
        }
    }
    val writtenMarks = paper.written.sumOf { w ->
        minOf(w.marks, maxOf(0.0, selfMarks[w.id] ?: 0.0))
    }
    val total = correct + writtenMarks
    return MockScore(
        correct = correct,
        wrong = wrong,
        blank = blank,
        objectiveMarks = correct,
        writtenMarks = writtenMarks,
        total = total,
        outOf = paper.totalMarks,
        percent = if (paper.totalMarks > 0) Math.round(total / paper.totalMarks * 100).toInt() else 0,
    )
}

/** Answer key as printable rows, e.g. "1. B". */
data class AnswerKeyRow(val id: String, val number: Int, val letter: String)

fun answerKey(paper: MockPaper): List<AnswerKeyRow> =
    paper.objective.mapIndexed { i, item ->
        AnswerKeyRow(id = item.id, number = i + 1, letter = OMR_LETTERS.getOrNull(item.answer) ?: "?")
    }
