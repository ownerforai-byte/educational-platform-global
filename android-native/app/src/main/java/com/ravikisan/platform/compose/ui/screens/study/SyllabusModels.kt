package com.ravikisan.platform.compose.ui.screens.study

/**
 * Syllabus domain model — Agent 4 local copy until the Supervisor says swap to
 * the shared data layer (Agent 3's `core/contract/`). Mirrors the website's
 * canonical shape in `frontend/lib/core/syllabus.ts`:
 *
 *   ClassSyllabus → SubjectSyllabus → SyllabusUnit → topics[]
 *
 * Units stay in official NEB 2076/2078 curriculum order — never reorder.
 */
data class SyllabusUnit(
    val id: String,
    val title: String,
    val topics: List<String>,
    val hours: Int? = null,
    val introducedIn: Int? = null,
)

data class SubjectSyllabus(
    val slug: String,
    val name: String,
    val description: String,
    val units: List<SyllabusUnit>,
)

data class ClassSyllabus(
    val slug: String,
    val name: String,
    val subjects: List<SubjectSyllabus>,
)

/** Total teaching hours across a subject's units (null when none carry hours). */
fun SubjectSyllabus.totalHours(): Int? =
    units.mapNotNull { it.hours }.takeIf { it.isNotEmpty() }?.sum()
