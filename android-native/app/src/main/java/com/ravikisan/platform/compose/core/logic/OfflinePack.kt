package com.ravikisan.platform.compose.core.logic

/**
 * Offline study packs: a presentation of existing readers for one unit —
 * Kotlin port of `frontend/features/offline/index.ts` (parity plan §0.5 task 8).
 *
 * Nothing is authored here. Output is plain Markdown the student saves locally
 * (no server write). Unit matching uses the syllabus-notes-manifest slug
 * resolver, ported below with the exact alias table.
 */

/** `frontend/lib/core/syllabus-notes-manifest.ts` UNIT_SLUG_ALIASES — keep in sync. */
val UNIT_SLUG_ALIASES: Map<String, String> = mapOf(
    // Chemistry: 6 short-name folders → canonical long syllabus names
    "classification-of-elements" to "classification-of-elements-and-periodic-table",
    "chemical-bonding" to "chemical-bonding-and-shapes-of-molecules",
    "oxidation-reduction" to "oxidation-and-reduction",
    "basic-concept-organic" to "basic-concept-of-organic-chemistry",
    "fundamental-principles-organic" to "fundamental-principles-of-organic-chemistry",
    "modern-manufactures" to "modern-chemical-manufactures",
    // Mathematics: limits-and-continuity is subsumed into calculus unit
    "limits-and-continuity" to "calculus",
    // Physics: short-form work-energy-power → canonical with "and"
    "work-energy-power" to "work-energy-and-power",
)

fun resolveUnitSlug(slug: String?): String {
    if (slug.isNullOrEmpty()) return ""
    return UNIT_SLUG_ALIASES[slug] ?: slug
}

fun sameUnit(a: String?, b: String?): Boolean = resolveUnitSlug(a) == resolveUnitSlug(b)

data class OfflinePack(
    val title: String,
    /** Concept notes of the subject (the bank does not tag theory by unit). */
    val theory: List<BankTheoryBlock>,
    val pyqs: List<OfflinePyqYear>,
    val drills: List<BankDrill>,
    val formulas: List<String>,
)

data class OfflinePyqYear(
    val year: Int,
    val title: String,
    val questions: List<BankPyqQuestion>,
)

/** Pure: slice a subject bank (and optional formula unit) down to one unit. */
fun buildUnitPack(
    title: String,
    unitId: String,
    bank: SubjectPyqBank,
    formulaUnit: FormulaSheetUnit?,
): OfflinePack {
    val pyqs = bank.pyqs
        .filter { year -> year.units.any { sameUnit(it, unitId) } }
        .map { year -> OfflinePyqYear(year = year.year, title = year.title, questions = year.questions) }
    return OfflinePack(
        title = title,
        theory = bank.theory,
        pyqs = pyqs,
        drills = bank.drills.filter { sameUnit(it.unit, unitId) },
        formulas = formulaUnit?.topics?.flatMap { it.formulas } ?: emptyList(),
    )
}

fun packItemCount(pack: OfflinePack): Int =
    pack.theory.size +
        pack.formulas.size +
        pack.drills.size +
        pack.pyqs.sumOf { it.questions.size }

fun packFilename(title: String): String {
    val slug = title.lowercase()
        .replace(Regex("[^a-z0-9]+"), "-")
        .trim('-')
        .take(60)
    return "${slug.ifEmpty { "study-pack" }}.md"
}

fun packToMarkdown(pack: OfflinePack): String {
    val out = ArrayList<String>()
    out += "# ${pack.title}"
    out += ""
    if (pack.theory.isNotEmpty()) {
        out += "## Concept notes"
        out += ""
        for (t in pack.theory) {
            out += "### ${t.title}"
            out += ""
            for (n in t.notes) out += "- $n"
            if (!t.detail.isNullOrEmpty()) {
                out += ""
                out += t.detail
            }
            out += ""
        }
    }
    if (pack.formulas.isNotEmpty()) {
        out += "## Formulas"
        out += ""
        for (f in pack.formulas) out += "- $f"
        out += ""
    }
    if (pack.pyqs.isNotEmpty()) {
        out += "## Past questions"
        out += ""
        for (y in pack.pyqs) {
            out += "### ${y.title.ifEmpty { y.year.toString() }}"
            out += ""
            y.questions.forEachIndexed { i, q ->
                val marks = if (q.marks != null) " [${q.marks}]" else ""
                out += "${i + 1}. ${q.question}$marks"
                if (q.solution != null) out += "   - Answer: ${q.solution}"
            }
            out += ""
        }
    }
    if (pack.drills.isNotEmpty()) {
        out += "## Concept drills"
        out += ""
        pack.drills.forEachIndexed { i, d ->
            out += "${i + 1}. ${d.question}"
            if (d.solution != null) out += "   - Answer: ${d.solution}"
        }
        out += ""
    }
    return out.joinToString("\n")
}
