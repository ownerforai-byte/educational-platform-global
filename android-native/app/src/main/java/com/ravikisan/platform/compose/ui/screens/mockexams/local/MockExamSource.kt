package com.ravikisan.platform.compose.ui.screens.mockexams.local

import com.ravikisan.platform.compose.core.logic.BankPyqQuestion
import com.ravikisan.platform.compose.core.logic.BankPyqYear
import com.ravikisan.platform.compose.core.logic.EntranceQuestion
import com.ravikisan.platform.compose.core.logic.SubjectPyqBank
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

/**
 * Paper-source seam for mock exams — the native counterpart of the website's
 * two inputs: the entrance MCQ bank (`frontend/lib/entrance-questions`, keyed
 * by subject+unit) and the subject PYQ bank (`useSubjectBank()` →
 * `GET /api/content/subject-bank`).
 *
 * Both live behind compile-time TS imports on the web. No mobile route exposes
 * them yet (`/api/mobile/pyqs` + `?file` is the pending W2 contract), so
 * production binds [PendingBindingMockExamSource]: the assembler (`assembleMock`,
 * golden-tested) still runs, and the screen shows the website's exact
 * "no entrance MCQs or past questions" card until the binding lands.
 * [FakeMockExamSource] feeds the ViewModel tests.
 */
interface MockExamSource {
    /** Entrance MCQs for `classSlug/subjectSlug`, deduped by question text. */
    suspend fun entrancePool(subjectKey: String): List<EntranceQuestion>

    /** PYQ bank for the written section, or null when none is indexed. */
    suspend fun pyqBank(subjectKey: String): SubjectPyqBank?
}

/** Production stand-in until the PYQ/entrance routes land (honest empty paper). */
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
    fun provideMockExamSource(): MockExamSource = PendingBindingMockExamSource()
}
