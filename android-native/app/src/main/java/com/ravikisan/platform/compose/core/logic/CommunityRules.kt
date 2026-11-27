package com.ravikisan.platform.compose.core.logic

/**
 * Community spaces: one study space per class and subject, derived from the
 * curriculum source of truth. Kotlin port of `frontend/features/community/index.ts`
 * (parity plan §0.5 #6, Wave 1) — rule-for-rule identical, golden-tested
 * against the real TS.
 *
 * The web reads the static SYLLABUS through `listGoalSubjects()`; the port
 * injects the catalog as a parameter (same deviation as `StudyGoals.kt`) —
 * Worker 4's ViewModels supply the loaded catalog.
 */
data class CommunitySpace(
    /** URL id, `<classSlug>-<subjectSlug>`. */
    val id: String,
    val title: String,
    val classSlug: String,
    val className: String,
    val subjectSlug: String,
    val subjectName: String,
    /** Subject page this space belongs to. */
    val subjectHref: String,
)

private fun toSpace(s: GoalSubject): CommunitySpace = CommunitySpace(
    id = "${s.classSlug}-${s.subjectSlug}",
    title = "${s.subjectName} (${s.className})",
    classSlug = s.classSlug,
    className = s.className,
    subjectSlug = s.subjectSlug,
    subjectName = s.subjectName,
    subjectHref = "/${s.classSlug}/${s.subjectSlug}",
)

fun listCommunitySpaces(catalog: List<GoalSubject>): List<CommunitySpace> = catalog.map(::toSpace)

fun getCommunitySpace(id: String, catalog: List<GoalSubject>): CommunitySpace? =
    listCommunitySpaces(catalog).find { it.id == id }

/** Wraps a student's question with its subject so the Veer tutor answers in scope. */
fun buildAskPrompt(question: String, subjectName: String? = null): String {
    val q = question.trim()
    // TS truthiness: an empty-string subject is falsy → no prefix.
    return if (!subjectName.isNullOrEmpty()) "[NEB $subjectName] $q" else q
}

const val MAX_QUESTION_LENGTH = 1000

fun validateQuestion(question: String): String? {
    val q = question.trim()
    if (q.length < 8) return "Write a little more so the question is clear (at least 8 characters)."
    if (q.length > MAX_QUESTION_LENGTH) return "Keep the question under $MAX_QUESTION_LENGTH characters."
    return null
}
