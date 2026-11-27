package com.ravikisan.platform.compose.core.logic

/**
 * Shared shapes for the PYQ-bank data the pure logic modules consume
 * (SRS card builder, offline packs, mock-exam written section).
 *
 * These mirror `frontend/features/pyqs/pyq-bank.ts`. The native app receives
 * banks through Worker 2's mobile endpoints; the ports here are pure and
 * never touch networking. `marks` stays a raw string because the website
 * renders `[${marks}]` verbatim and `parseFloat`-parses it for exam scoring —
 * numbers are stringified at the API boundary exactly like `String(marks)` does.
 */

/** One theory block rendered as a card (definition / concept / derivation). */
data class BankTheoryBlock(
    val title: String,
    val notes: List<String>,
    val detail: String? = null,
)

/** One PYQ card = one exam year for one subject (aggregated across units). */
data class BankPyqQuestion(
    val question: String,
    val marks: String? = null,
    val solution: String? = null,
)

data class BankPyqYear(
    val year: Int,
    val title: String,
    /** Unit slugs whose questions appear in this year, in stable order. */
    val units: List<String> = emptyList(),
    val questions: List<BankPyqQuestion> = emptyList(),
)

/** One concept drill: a misconception-busting Q&A that clears the concept. */
data class BankDrill(
    val id: String,
    val question: String,
    val solution: String? = null,
    val unit: String,
    val kind: String = "concept",
)

data class SubjectPyqBank(
    val theory: List<BankTheoryBlock> = emptyList(),
    /** Sorted newest first. */
    val pyqs: List<BankPyqYear> = emptyList(),
    val drills: List<BankDrill> = emptyList(),
)

/** One formula-sheet unit, as consumed by the offline pack builder. */
data class FormulaSheetTopic(
    val title: String,
    val formulas: List<String> = emptyList(),
)

data class FormulaSheetUnit(
    val id: String,
    val title: String,
    val topics: List<FormulaSheetTopic> = emptyList(),
)
