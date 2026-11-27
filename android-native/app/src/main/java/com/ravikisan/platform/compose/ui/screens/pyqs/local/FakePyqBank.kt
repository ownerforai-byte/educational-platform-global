package com.ravikisan.platform.compose.ui.screens.pyqs.local

import com.ravikisan.platform.compose.ui.screens.pyqs.ConceptDrill
import com.ravikisan.platform.compose.ui.screens.pyqs.PyqQuestion
import com.ravikisan.platform.compose.ui.screens.pyqs.PyqSubjectSummary
import com.ravikisan.platform.compose.ui.screens.pyqs.PyqYear
import com.ravikisan.platform.compose.ui.screens.pyqs.SubjectPyqBank
import com.ravikisan.platform.compose.ui.screens.pyqs.TheoryBlock

/**
 * Data source seam for the PYQ feature. Today: [FakePyqBank] (local fakes).
 * When Worker 2 lands the PYQ endpoints, a repository implements this and the
 * ViewModel swaps without touching the screens (same pattern as search/practice).
 */
interface PyqBankSource {
    /** Hub rows for the /pyqs equivalent (class-11 subjects, web order). */
    fun subjects(): List<PyqSubjectSummary>

    /** Full bank for one subject, or null when the subject has no PYQ bank. */
    fun bank(classSlug: String, subjectSlug: String): SubjectPyqBank?
}

/**
 * Local fake mirroring the website's PYQ bank shape so the screens can be
 * built and unit-tested before the backend contract lands (no-wait rule).
 * Content is illustrative — the real corpus stays server-side.
 */
class FakePyqBank : PyqBankSource {

    private val banks = mapOf(
        "class-11-notes:physics" to SubjectPyqBank(
            theory = listOf(
                TheoryBlock(
                    title = "Kinematics essentials",
                    notes = listOf(
                        "Displacement is a vector; distance is a scalar.",
                        "Slope of a displacement–time graph gives velocity.",
                    ),
                    detail = "Revise the three standard graphs before attempting NEB numericals.",
                ),
                TheoryBlock(
                    title = "Newton's laws — exam framing",
                    notes = listOf(
                        "Draw the free-body diagram first; then write ΣF = ma per axis.",
                    ),
                ),
            ),
            pyqs = listOf(
                PyqYear(
                    year = 2079,
                    title = "NEB Grade 11 — 2079",
                    examSource = "NEB",
                    units = listOf("kinematics", "newtons-laws"),
                    questions = listOf(
                        PyqQuestion(
                            question = "A body starts from rest with uniform acceleration 2 m/s². Find the distance covered in the 3rd second.",
                            marks = "2",
                            solution = "s_n = u + a/2·(2n−1) = 0 + 1·(5) = 5 m.",
                        ),
                        PyqQuestion(
                            question = "State Newton's second law and show that F = ma.",
                            marks = "2",
                            solution = "F = dp/dt = d(mv)/dt = ma for constant mass.",
                        ),
                        PyqQuestion(
                            question = "Why does a passenger jerk forward when a bus stops suddenly?",
                            marks = "1",
                            solution = "The body continues in its state of motion (inertia) while the bus decelerates.",
                        ),
                    ),
                ),
                PyqYear(
                    year = 2078,
                    title = "NEB Grade 11 — 2078",
                    examSource = "NEB",
                    units = listOf("kinematics"),
                    questions = listOf(
                        PyqQuestion(
                            question = "Derive v² = u² + 2as graphically.",
                            marks = "3",
                            solution = "Area under the v–t line gives s = (u+v)t/2; substitute v = u + at.",
                        ),
                    ),
                ),
            ),
            drills = listOf(
                ConceptDrill(
                    id = "phy-drill-1",
                    question = "A ball thrown up returns to the thrower. Is its displacement zero?",
                    solution = "Yes — initial and final positions coincide, so displacement is zero even though distance is not.",
                    concept = "Displacement vs distance",
                    unit = "kinematics",
                    marks = "2",
                    kind = "concept",
                ),
            ),
        ),
        "class-11-notes:chemistry" to SubjectPyqBank(
            theory = listOf(
                TheoryBlock(
                    title = "Mole concept quick sheet",
                    notes = listOf(
                        "1 mol = 6.022×10²³ particles = molar mass in grams.",
                    ),
                ),
            ),
            pyqs = listOf(
                PyqYear(
                    year = 2079,
                    title = "NEB Grade 11 — 2079",
                    examSource = "NEB",
                    units = listOf("stoichiometry"),
                    questions = listOf(
                        PyqQuestion(
                            question = "Calculate the number of moles in 4.4 g of CO₂.",
                            marks = "2",
                            solution = "n = m/M = 4.4/44 = 0.1 mol.",
                        ),
                    ),
                ),
            ),
            drills = emptyList(),
        ),
    )

    override fun subjects(): List<PyqSubjectSummary> = banks.map { (key, bank) ->
        val (classSlug, subjectSlug) = key.split(":")
        val years = bank.pyqs.map { it.year }
        PyqSubjectSummary(
            classSlug = classSlug,
            subjectSlug = subjectSlug,
            subjectName = subjectNameOf(subjectSlug),
            description = "Every NEB previous year question, grouped by exam year, with worked solutions.",
            yearCount = bank.pyqs.size,
            questionCount = bank.pyqs.sumOf { it.questions.size },
            unitCount = bank.pyqs.flatMap { it.units }.distinct().size,
            newestYear = years.maxOrNull(),
            oldestYear = years.minOrNull(),
        )
    }

    override fun bank(classSlug: String, subjectSlug: String): SubjectPyqBank? =
        banks["$classSlug:$subjectSlug"]

    private fun subjectNameOf(slug: String) = when (slug) {
        "physics" -> "Physics"
        "chemistry" -> "Chemistry"
        "mathematics" -> "Mathematics"
        "biology" -> "Biology"
        "english" -> "English"
        "nepali" -> "Nepali"
        else -> slug.replaceFirstChar { it.uppercase() }
    }
}
