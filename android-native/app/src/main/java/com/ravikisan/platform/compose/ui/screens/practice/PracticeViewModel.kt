package com.ravikisan.platform.compose.ui.screens.practice

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.ExamQuestionDto
import com.ravikisan.platform.compose.core.contract.MobilePracticeSetDto
import com.ravikisan.platform.compose.data.repository.PracticeRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject
import kotlinx.coroutines.CoroutineScope

/**
 * Practice hub state — REAL data (fake→real swap, session 3): the catalog
 * comes from `GET /api/mobile/practice` through [PracticeRepository] with the
 * Room cache serving airplane mode. Opening a set loads the full exam
 * (`GET /api/practice/exams/:slug`) for the inline preview; the scored runner
 * route `quiz/{quizId}` plays the same exam.
 */
data class PracticeUiState(
    val loading: Boolean = false,
    val error: String? = null,
    val fromCache: Boolean = false,
    val sets: List<PracticeSet> = emptyList(),
    val previewLoading: Boolean = false,
    val previewQuestions: List<PracticeQuestion> = emptyList(),
)

@HiltViewModel
class PracticeViewModel @Inject constructor(
    private val repository: PracticeRepository,
) : ViewModel() {

    /** Injectable coroutine scope — tests pass Dispatchers.Unconfined (no Main on JVM). */
    internal var scope: kotlinx.coroutines.CoroutineScope = viewModelScope

    constructor(repository: PracticeRepository, scope: kotlinx.coroutines.CoroutineScope) : this(repository) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(PracticeUiState())
    val state: StateFlow<PracticeUiState> = _state.asStateFlow()

    private val _selectedSetId = MutableStateFlow<String?>(null)
    val selectedSetId: StateFlow<String?> = _selectedSetId.asStateFlow()

    init {
        scope = viewModelScope
    }

    fun loadCatalog() {
        if (_state.value.loading) return
        _state.value = _state.value.copy(loading = true, error = null)
        scope.launch {
            when (val result = repository.loadCatalog()) {
                is PracticeRepository.Result.Fresh -> _state.value = _state.value.copy(
                    loading = false, sets = result.sets.map { it.toModel() }, fromCache = false,
                )
                is PracticeRepository.Result.Cached -> _state.value = _state.value.copy(
                    loading = false, sets = result.sets.map { it.toModel() }, fromCache = true,
                )
                is PracticeRepository.Result.Unavailable -> _state.value = _state.value.copy(
                    loading = false, error = result.message,
                )
            }
        }
    }

    fun openSet(setId: String) {
        _selectedSetId.value = setId
        _state.value = _state.value.copy(previewLoading = true, previewQuestions = emptyList())
        scope.launch {
            when (val result = repository.loadExam(setId)) {
                is PracticeRepository.ExamResult.Fresh ->
                    _state.value = _state.value.copy(previewLoading = false, previewQuestions = result.exam.questions.map { it.toModel(setId) })
                is PracticeRepository.ExamResult.Cached ->
                    _state.value = _state.value.copy(previewLoading = false, previewQuestions = result.exam.questions.map { it.toModel(setId) })
                is PracticeRepository.ExamResult.Unavailable ->
                    _state.value = _state.value.copy(previewLoading = false, error = result.message)
            }
        }
    }

    fun closeSet() {
        _selectedSetId.value = null
        _state.value = _state.value.copy(previewQuestions = emptyList(), previewLoading = false)
    }

    fun dismissError() {
        _state.value = _state.value.copy(error = null)
    }
}

/** Catalog row → UI model. */
fun MobilePracticeSetDto.toModel(): PracticeSet = PracticeSet(
    id = slug,
    title = title ?: slug,
    durationMin = durationMin,
    questionCount = questionCount,
)

/** Exam question → UI model (`unitId` carries the exam slug for navigation). */
fun ExamQuestionDto.toModel(examSlug: String): PracticeQuestion = PracticeQuestion(
    id = id,
    unitId = examSlug,
    stem = prompt ?: "",
    options = options,
    answerIndex = correctIndex,
    explanation = explanation,
)
