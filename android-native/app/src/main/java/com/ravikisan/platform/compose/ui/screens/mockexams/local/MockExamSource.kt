package com.ravikisan.platform.compose.ui.screens.mockexams.local

import com.ravikisan.platform.compose.core.logic.BankPyqQuestion
import com.ravikisan.platform.compose.core.logic.BankPyqYear
import com.ravikisan.platform.compose.core.logic.EntranceQuestion
import com.ravikisan.platform.compose.core.logic.SubjectPyqBank
import com.ravikisan.platform.compose.data.repository.MobileBankRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Paper-source seam for mock exams — the native counterpart of the website's
 * two inputs: the entrance MCQ bank (`frontend/lib/entrance-questions`, keyed
 * by subject+unit) and the subject PYQ bank (`useSubjectBank()` →
 * `GET /api/content/subject-bank`).
 *
 * The written section is REAL: the landed `GET /api/mobile/pyqs` (+ `/file`)
 * endpoints serve the same manifest PYQs the website bank reads, so
 * [MobileMockExamSource] feeds them to the golden `assembleMock`.
 *
 * HONEST REMAINING GAP (unresolvable with existing APIs): the website's
 * entrance MCQ bank is hand-authored TypeScript compiled into the web bundle
 * (frontend/lib/entrance-questions files). No backend or mobile endpoint
 * exposes it, and porting the authored questions is a content task outside
 * this wave — so [entrancePool] stays empty and a native paper carries the
 * written section only. The screen renders this honestly ("0 MCQs and N
 * written questions") and the subject's ComingSoon card appears exactly when
 * the website's would (no entrance MCQs AND no PYQs).
 */
interface MockExamSource {
    /** Entrance MCQs for `classSlug/subjectSlug`, deduped by question text. */
    suspend fun entrancePool(subjectKey: String): List<EntranceQuestion>

    /** PYQ bank for the written section, or null when none is indexed. */
    suspend fun pyqBank(subjectKey: String): SubjectPyqBank?
}

/** Real written-section source; entrance pool waits for a mobile API. */
class MobileMockExamSource @Inject constructor(
    private val repository: MobileBankRepository,
) : MockExamSource {

    override suspend fun entrancePool(subjectKey: String): List<EntranceQuestion> = emptyList()

    override suspend fun pyqBank(subjectKey: String): SubjectPyqBank? =
        repository.subjectPyqBank(subjectKey)
}

/** Honest-empty stand-in (kept for ViewModel tests and parity fixtures). */
class PendingBindingMockExamSource : MockExamSource {
    override suspend fun entrancePool(subjectKey: String): List<EntranceQuestion> = emptyList()

    override suspend fun pyqBank(subjectKey: String): SubjectPyqBank? = null
}

/** Test bank: two MCQ units and one written year for the physics class-11 key. */
class FakeMockExamSource : MockExamSource {

    override suspend fun entrancePool(subjectKey: String): List<EntranceQuestion> =
        if (subjectKey !in banks) emptyList() else listOf(
            EntranceQuestion(
                q = "SI unit of acceleration?",
                options = listOf("m/s", "m/s²", "N", "J"),
                answer = 1,
                why = "Acceleration is m/s².",
                exam = "CEE 2024",
            ),
            EntranceQuestion(
                q = "A body at rest stays at rest unless acted on by a force — which law?",
                options = listOf("First", "Second", "Third", "Gravitation"),
                answer = 0,
                why = "Newton's first law.",
                exam = "IOE 2023",
            ),
            EntranceQuestion(
                q = "Resultant of two 3 N forces at 120°?",
                options = listOf("6 N", "3 N", "0 N", "1.5 N"),
                answer = 1,
                why = "2F cos(θ/2) = 2·3·cos60° = 3 N.",
                exam = "CEE 2023",
            ),
        )

    override suspend fun pyqBank(subjectKey: String): SubjectPyqBank? = banks[subjectKey]

    private val banks = mapOf(
        "class-11-notes/physics" to SubjectPyqBank(
            pyqs = listOf(
                BankPyqYear(
                    year = 2079,
                    title = "NEB Grade 11 — 2079",
                    units = listOf("kinematics"),
                    questions = listOf(
                        BankPyqQuestion(
                            question = "State Newton's second law and derive F = ma.",
                            marks = "4",
                            solution = "F ∝ dp/dt; with constant mass F = ma.",
                        ),
                    ),
                ),
            ),
        ),
    )
}

/** Feature-owned binding (keeps the shared `di/AppModule.kt` untouched). */
@Module
@InstallIn(SingletonComponent::class)
object MockExamSourceModule {

    @Provides
    @Singleton
    fun provideMockExamSource(repository: MobileBankRepository): MockExamSource =
        MobileMockExamSource(repository)
}
