package com.ravikisan.platform.compose.ui.screens.mockexams

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.logic.AssembleOptions
import com.ravikisan.platform.compose.core.logic.EntranceQuestion
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.MockPaper
import com.ravikisan.platform.compose.core.logic.MockScore
import com.ravikisan.platform.compose.core.logic.SubjectPyqBank
import com.ravikisan.platform.compose.core.logic.AnswerKeyRow
import com.ravikisan.platform.compose.core.logic.answerKey
import com.ravikisan.platform.compose.core.logic.assembleMock
import com.ravikisan.platform.compose.core.logic.scoreMock
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.mockexams.local.MockExamSource
import com.ravikisan.platform.compose.ui.screens.studyplan.decodeGoals
import com.ravikisan.platform.compose.ui.screens.studyplan.goalSubjectsFrom
import com.ravikisan.platform.compose.ui.screens.studyplan.local.GoalsStore
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * `/mock-exams` state — the website's timed paper: OMR objective section
 * (auto-scored) plus written past questions (self-marked against the model
 * answer), a countdown that auto-submits, and the empty card when the subject
 * has no indexed MCQs or PYQs.
 */
data class MockExamUiState(
    val loading: Boolean = false,
    /** Subject options in the website's `SubjectSelect` order (goals first). */
    val subjects: List<GoalSubject> = emptyList(),
    val subjectKey: String = "",
    /** No entrance MCQs AND no PYQs for the picked subject (ComingSoon card). */
    val empty: Boolean = false,
    val paper: MockPaper? = null,
    val answers: Map<String, Int> = emptyMap(),
    val marks: Map<String, Double> = emptyMap(),
    val submitted: Boolean = false,
    val secondsLeft: Int = 0,
    /**
     * Whether a NEW paper may start. The website ties this to the credits
     * "attempt hold" window; the hold is a no-op today (the coin gate was
     * removed), so an in-flight paper never blocks the next one.
     */
    val canStart: Boolean = true,
) {
    val score: MockScore? get() = paper?.let { scoreMock(it, answers, marks) }

    val answerKey: List<AnswerKeyRow> get() = paper?.let { answerKey(it) }.orEmpty()
}

/**
 * `/mock-exams` ViewModel — the exam algorithm itself is the landed golden
 * `core/logic/MockExam.kt` ([assembleMock], [scoreMock], [answerKey]); this
 * class only holds the attempt state and feeds the pools from
 * [MockExamSource]. Subjects follow the website's goal-first
 * `SubjectSelect` semantics.
 */
@HiltViewModel
class MockExamViewModel @Inject constructor(
    private val goalsStore: GoalsStore,
    private val syllabus: SyllabusRepository,
    private val source: MockExamSource,
) : ViewModel() {

    internal var scope: CoroutineScope = viewModelScope

    constructor(
        goalsStore: GoalsStore,
        syllabus: SyllabusRepository,
        source: MockExamSource,
        scope: CoroutineScope,
    ) : this(goalsStore, syllabus, source) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(MockExamUiState(loading = true))
    val state: StateFlow<MockExamUiState> = _state.asStateFlow()

    private var pool: List<EntranceQuestion> = emptyList()
    private var bank: SubjectPyqBank? = null

    /** Load the subject options and settle on the goal-first pick. */
    fun init() {
        scope.launch {
            val catalog = loadCatalog()
            val goals = decodeGoals(goalsStore.readRaw(), catalog)
            val chosen = catalog.filter { it.key in goals.subjects }
            val options = if (chosen.isEmpty()) catalog else chosen
            val subjectKey = _state.value.subjectKey.ifEmpty { options.firstOrNull()?.key.orEmpty() }
            _state.value = _state.value.copy(
                loading = false,
                subjects = options,
                subjectKey = subjectKey,
            )
            loadPools(subjectKey)
        }
    }

    private suspend fun loadPools(subjectKey: String) {
        if (subjectKey.isEmpty()) {
            _state.value = _state.value.copy(empty = true)
            return
        }
        pool = runCatching { source.entrancePool(subjectKey) }.getOrDefault(emptyList())
        bank = runCatching { source.pyqBank(subjectKey) }.getOrNull()
        _state.value = _state.value.copy(
            empty = pool.isEmpty() && bank?.pyqs.isNullOrEmpty(),
        )
    }

    /** Subject change clears the paper (blocked mid-attempt while gated). */
    fun pickSubject(subjectKey: String) {
        if (paperActiveLocked()) return
        if (_state.value.subjectKey == subjectKey) return
        pool = emptyList()
        bank = null
        _state.value = _state.value.copy(
            subjectKey = subjectKey,
            paper = null,
            answers = emptyMap(),
            marks = emptyMap(),
            submitted = false,
            secondsLeft = 0,
            empty = false,
            loading = true,
        )
        scope.launch {
            loadPools(subjectKey)
            _state.value = _state.value.copy(loading = false)
        }
    }

    /** Start a paper with the same seed→paper contract as the website. */
    fun start(seed: Int = (System.currentTimeMillis() % 2_147_483_647L).toInt()) {
        if (!_state.value.canStart) return
        val paper = assembleMock(
            AssembleOptions(mcqPool = pool, pyqs = bank?.pyqs.orEmpty(), seed = seed),
        )
        _state.value = _state.value.copy(
            paper = paper,
            answers = emptyMap(),
            marks = emptyMap(),
            submitted = false,
            secondsLeft = Math.round(paper.durationMinutes * 60).toInt(),
        )
    }

    /** One OMR bubble. */
    fun choose(itemId: String, optionIndex: Int) {
        if (_state.value.submitted) return
        _state.value = _state.value.copy(answers = _state.value.answers + (itemId to optionIndex))
    }

    /** Self-marked written marks (clamped by the scorer against the item max). */
    fun setMarks(itemId: String, marks: Double) {
        if (_state.value.submitted.not()) return
        _state.value = _state.value.copy(marks = _state.value.marks + (itemId to marks))
    }

    /** Countdown tick; auto-submits at zero exactly like the website's interval. */
    fun tick() {
        val state = _state.value
        if (state.paper == null || state.submitted) return
        _state.value = if (state.secondsLeft <= 1) {
            state.copy(secondsLeft = 0, submitted = true)
        } else {
            state.copy(secondsLeft = state.secondsLeft - 1)
        }
    }

    fun submit() {
        if (_state.value.paper == null) return
        _state.value = _state.value.copy(submitted = true)
    }

    private fun paperActiveLocked(): Boolean =
        _state.value.paper != null && !_state.value.canStart

    private suspend fun loadCatalog(): List<GoalSubject> {
        val classes: List<MobileClassDto> = when (val result = syllabus.load()) {
            is SyllabusRepository.Result.Fresh ->
                (result.payload as? SyllabusRepository.Payload.SyllabusTree)?.classes.orEmpty()
            is SyllabusRepository.Result.Cached ->
                (result.payload as? SyllabusRepository.Payload.SyllabusTree)?.classes.orEmpty()
            is SyllabusRepository.Result.Unavailable -> emptyList()
        }
        return goalSubjectsFrom(classes)
    }
}
