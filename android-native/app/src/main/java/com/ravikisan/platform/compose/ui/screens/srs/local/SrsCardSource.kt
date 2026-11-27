package com.ravikisan.platform.compose.ui.screens.srs.local

import com.ravikisan.platform.compose.core.logic.BankDrill
import com.ravikisan.platform.compose.core.logic.BankPyqQuestion
import com.ravikisan.platform.compose.core.logic.BankPyqYear
import com.ravikisan.platform.compose.core.logic.BankTheoryBlock
import com.ravikisan.platform.compose.core.logic.SubjectPyqBank

/**
 * Card-source seam for SRS — the native counterpart of the website's
 * `useSubjectBank()` hook (`GET /api/content/subject-bank`, member-gated).
 *
 * NO-WAIT: the subject-bank endpoint family has no mobile route in `RnApi`
 * yet (Wave 1 note: SRS binds to the pyq-bank, Worker 2/3). Production binds
 * [PendingBindingCardSource], which reports no bank — the screen then shows
 * the website's exact empty state ("No concept notes or past questions are
 * indexed for this subject yet") instead of inventing cards.
 * [FakeCardSource] feeds ViewModel tests with a small fixture bank.
 */
interface SrsCardSource {
    /** Full pyq-bank for `classSlug/subjectSlug`, or null when none. */
    suspend fun bank(subjectKey: String): SubjectPyqBank?
}

/** Production stand-in until the subject-bank repository lands (honest empty). */
class PendingBindingCardSource : SrsCardSource {
    override suspend fun bank(subjectKey: String): SubjectPyqBank? = null
}

/** Test fixture bank (shapes mirror `core/logic/Bank.kt` / the TS pyq-bank). */
class FakeCardSource : SrsCardSource {

    val banks = mapOf(
        "class-11-notes/physics" to SubjectPyqBank(
            theory = listOf(
                BankTheoryBlock(
                    title = "Kinematics essentials",
                    notes = listOf("Displacement is a vector; distance is a scalar."),
                    detail = "Revise the three standard graphs before numericals.",
                ),
            ),
            pyqs = listOf(
                BankPyqYear(
                    year = 2079,
                    title = "NEB Grade 11 — 2079",
                    units = listOf("kinematics"),
                    questions = listOf(
                        BankPyqQuestion(
                            question = "A body starts from rest with acceleration 2 m/s². Distance in the 3rd second?",
                            marks = "2",
                            solution = "s = 5 m.",
                        ),
                    ),
                ),
            ),
            drills = listOf(
                BankDrill(
                    id = "phy-drill-1",
                    question = "Ball thrown up returns to the thrower. Displacement zero?",
                    solution = "Yes.",
                    unit = "kinematics",
                ),
            ),
        ),
    )

    override suspend fun bank(subjectKey: String): SubjectPyqBank? = banks[subjectKey]
}
