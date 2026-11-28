package com.ravikisan.platform.compose.ui.screens.downloads.local

import com.ravikisan.platform.compose.core.logic.FormulaSheetUnit
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
 * Unit-pack source seam — the native counterpart of the website's
 * `useSubjectBank()` + `/api/formula-unit` fetch pair
 * (`frontend/components/study/downloads-view.tsx`).
 *
 * The web side reads the generated content manifest; on mobile the same data
 * is served by the landed `GET /api/mobile/pyqs` (+ `/file`) and
 * `GET /api/mobile/formulas` (+ `/file`) endpoints (auth-gated plus tier).
 * Production binds [MobileUnitPackSource] through `MobileBankRepository`:
 * real PYQ question lines + real formula lines per unit, so saved packs are
 * genuinely readable offline.
 *
 * Honest scope note: the mobile endpoints expose question/formula LINES only
 * — the website bank additionally carries authored theory blocks and drills
 * (no mobile endpoint yet), so a mobile pack holds past questions + formulas
 * for the unit, never invented theory.
 *
 * [PendingBindingUnitPackSource] remains bound UNQUALIFIED in the
 * parent-owned `di/AppModule.kt`; the qualified [provideMobileUnitPackSource]
 * binding is the one the screen consumes, so no shared-file edit was needed.
 * [FakeUnitPackSource] feeds ViewModel tests.
 */
interface UnitPackSource {
    /** Full pyq-bank for `classSlug/subjectSlug`, or null when none. */
    suspend fun bank(subjectKey: String): SubjectPyqBank?

    /** Formula sheet for one unit of `classSlug/subjectSlug`, or null when none. */
    suspend fun formulaUnit(subjectKey: String, unitId: String): FormulaSheetUnit?
}

/** Real pack source over the landed mobile PYQ + formula endpoints. */
class MobileUnitPackSource @Inject constructor(
    private val repository: MobileBankRepository,
) : UnitPackSource {
    override suspend fun bank(subjectKey: String): SubjectPyqBank? =
        repository.subjectPyqBank(subjectKey)

    override suspend fun formulaUnit(subjectKey: String, unitId: String): FormulaSheetUnit? =
        repository.formulaUnit(subjectKey, unitId)
}

/** Qualifier separating the real Wave 1 binding from the parent's stub. */
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class MobilePacks

@Module
@InstallIn(SingletonComponent::class)
abstract class MobileUnitPackSourceModule {

    @Binds
    @Singleton
    @MobilePacks
    abstract fun bindMobileUnitPackSource(impl: MobileUnitPackSource): UnitPackSource
}

/** Legacy parent-bound stand-in (kept compiling; no longer consumed). */
class PendingBindingUnitPackSource : UnitPackSource {
    override suspend fun bank(subjectKey: String): SubjectPyqBank? = null
    override suspend fun formulaUnit(subjectKey: String, unitId: String): FormulaSheetUnit? = null
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
        "class-11-notes/physics" to mapOf(
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

    override suspend fun formulaUnit(subjectKey: String, unitId: String): FormulaSheetUnit? =
        formulas[subjectKey]?.get(unitId)
}
