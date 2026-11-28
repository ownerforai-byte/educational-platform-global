package com.ravikisan.platform.compose.ui.screens.srs.local

import com.ravikisan.platform.compose.core.logic.BankDrill
import com.ravikisan.platform.compose.core.logic.BankPyqQuestion
import com.ravikisan.platform.compose.core.logic.BankPyqYear
import com.ravikisan.platform.compose.core.logic.BankTheoryBlock
import com.ravikisan.platform.compose.core.logic.SubjectPyqBank
import com.ravikisan.platform.compose.data.repository.MobileBankRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Qualifier
import javax.inject.Singleton

/**
 * Card-source seam for SRS — the native counterpart of the website's
 * `useSubjectBank()` hook (`GET /api/content/subject-bank`, member-gated).
 *
 * The web bank comes from the generated content manifest; on mobile the same
 * data is served by the landed `GET /api/mobile/pyqs` (+ `/file`) endpoints
 * (auth-gated plus tier, like the website's /pyqs). Production binds
 * [MobilePyqCardSource] through `MobileBankRepository`, which builds a real
 * `SubjectPyqBank` from the PYQ catalog + per-file question lines.
 *
 * Honest scope note: the mobile endpoint exposes PYQ question lines only —
 * the website bank additionally carries authored theory blocks and concept
 * drills, which have no mobile endpoint yet. A mobile deck therefore holds
 * `pyq` cards only for the same subject (smaller, never invented).
 *
 * [PendingBindingCardSource] remains bound UNQUALIFIED in the parent-owned
 * `di/AppModule.kt`; the qualified [provideMobileSrsCardSource] binding is
 * the one the screen consumes, so no shared-file edit was needed.
 * [FakeCardSource] feeds ViewModel tests with a small fixture bank.
 */
interface SrsCardSource {
    /** Full pyq-bank for `classSlug/subjectSlug`, or null when none. */
    suspend fun bank(subjectKey: String): SubjectPyqBank?
}

/** Real card source over the landed mobile PYQ endpoints (plus-tier gated). */
class MobilePyqCardSource @Inject constructor(
    private val repository: MobileBankRepository,
) : SrsCardSource {
    override suspend fun bank(subjectKey: String): SubjectPyqBank? =
        repository.subjectPyqBank(subjectKey)
}

/** Qualifier separating the real Wave 1 binding from the parent's stub. */
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class MobileSrsBank

@Module
@InstallIn(SingletonComponent::class)
abstract class MobileSrsCardSourceModule {

    @Binds
    @Singleton
    @MobileSrsBank
    abstract fun bindMobileSrsCardSource(impl: MobilePyqCardSource): SrsCardSource
}

/** Legacy parent-bound stand-in (kept compiling; no longer consumed). */
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
