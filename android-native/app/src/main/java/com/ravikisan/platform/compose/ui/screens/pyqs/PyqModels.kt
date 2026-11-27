package com.ravikisan.platform.compose.ui.screens.pyqs

/**
 * PYQ domain models — mirrored field-for-field from the website's
 * `frontend/features/pyqs/pyq-bank.ts` (parity = match, not redesign).
 * The backend contract (Worker 2) will serve these shapes; until then the
 * screens run on `local/FakePyqBank.kt`.
 */

/** One PYQ card = one exam year for one subject (aggregated across units). */
data class PyqQuestion(
    val question: String,
    /** Display string, e.g. "1" or "1+2" — the website renders it verbatim. */
    val marks: String? = null,
    val solution: String? = null,
)

data class PyqYear(
    val year: Int,
    val title: String,
    val examSource: String? = null,
    /** Unit slugs whose questions appear in this year, in stable order. */
    val units: List<String>,
    val questions: List<PyqQuestion>,
)

/** A theory block rendered as a card (definition / concept / derivation). */
data class TheoryBlock(
    val title: String,
    val notes: List<String>,
    val detail: String? = null,
)

/** One concept drill: a misconception-busting Q&A that clears the concept. */
data class ConceptDrill(
    val id: String,
    val question: String,
    val solution: String? = null,
    /** The concept this drill clears, e.g. "Field inside a conductor". */
    val concept: String? = null,
    val unit: String,
    val marks: String? = null,
    /** "concept" (misconception-buster) or "practical" (application). */
    val kind: String,
)

data class SubjectPyqBank(
    val theory: List<TheoryBlock>,
    /** Sorted newest first (the website's orderPyqYears contract). */
    val pyqs: List<PyqYear>,
    val drills: List<ConceptDrill>,
)

/** Hub-row summary — computed exactly like the website's /pyqs subject cards. */
data class PyqSubjectSummary(
    val classSlug: String,
    val subjectSlug: String,
    val subjectName: String,
    val description: String,
    val yearCount: Int,
    val questionCount: Int,
    val unitCount: Int,
    val newestYear: Int?,
    val oldestYear: Int?,
)
