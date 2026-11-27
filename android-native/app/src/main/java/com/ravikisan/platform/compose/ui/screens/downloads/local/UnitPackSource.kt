package com.ravikisan.platform.compose.ui.screens.downloads.local

import com.ravikisan.platform.compose.core.logic.FormulaSheetUnit
import com.ravikisan.platform.compose.core.logic.SubjectPyqBank

/**
 * Unit-pack source seam — the native counterpart of the website's
 * `useSubjectBank()` + `/api/formula-unit` fetch pair
 * (`frontend/components/study/downloads-view.tsx`).
 *
 * NO-WAIT: the subject-bank and formula-unit endpoint families have no mobile
 * routes in `RnApi` yet. Production binds [PendingBindingUnitPackSource]
 * (no bank, no formulas) so the screen honestly shows the website's "No notes,
 * past questions, drills or formulas are indexed for this unit yet" state
 * instead of inventing content. [FakeUnitPackSource] feeds ViewModel tests.
 */
interface UnitPackSource {
    /** Full pyq-bank for `classSlug/subjectSlug`, or null when none. */
    suspend fun bank(subjectKey: String): SubjectPyqBank?

    /** Formula sheet for one unit, or null when the subject has none. */
    suspend fun formulaUnit(subjectSlug: String, unitId: String): FormulaSheetUnit?
}

/** Production stand-in until the bank/formula repositories land (honest empty). */
class PendingBindingUnitPackSource : UnitPackSource {
    override suspend fun bank(subjectKey: String): SubjectPyqBank? = null
    override suspend fun formulaUnit(subjectSlug: String, unitId: String): FormulaSheetUnit? = null
}

/** Test fixture mirroring the website's bank + formula shapes. */
class FakeUnitPackSource : UnitPackSource {

    val banks = mapOf(
        "class-11-notes/physics" to SubjectPyqBank(
            theory = listOf(
                com.ravikisan.platform.compose.core.logic.BankTheoryBlock(
                    title = "Kinematics essentials",
                    notes = listOf("Displacement is a vector; distance is a scalar."),
                ),
            ),
            pyqs = listOf(
                com.ravikisan.platform.compose.core.logic.BankPyqYear(
                    year = 2079,
                    title = "NEB Grade 11 — 2079",
                    units = listOf("kinematics"),
                    questions = listOf(
                        com.ravikisan.platform.compose.core.logic.BankPyqQuestion(
                            question = "A body starts from rest with acceleration 2 m/s². Distance in the 3rd second?",
                            marks = "2",
                            solution = "s = 5 m.",
                        ),
                    ),
                ),
            ),
            drills = listOf(
                com.ravikisan.platform.compose.core.logic.BankDrill(
                    id = "phy-drill-1",
                    question = "Ball thrown up returns to the thrower. Displacement zero?",
                    solution = "Yes.",
                    unit = "kinematics",
                ),
            ),
        ),
    )

    val formulas = mapOf(
        "physics" to mapOf(
            "kinematics" to FormulaSheetUnit(
                id = "kinematics",
                title = "Kinematics",
                topics = listOf(
                    com.ravikisan.platform.compose.core.logic.FormulaSheetTopic(
                        title = "Equations of motion",
                        formulas = listOf("v = u + at", "s = ut + ½at²"),
                    ),
                ),
            ),
        ),
    )

    override suspend fun bank(subjectKey: String): SubjectPyqBank? = banks[subjectKey]

    override suspend fun formulaUnit(subjectSlug: String, unitId: String): FormulaSheetUnit? =
        formulas[subjectSlug]?.get(unitId)
}
