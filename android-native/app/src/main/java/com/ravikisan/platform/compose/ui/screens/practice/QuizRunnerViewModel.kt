package com.ravikisan.platform.compose.ui.screens.practice

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.data.repository.PracticeRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Scored quiz runner — REAL data (fake→real swap, session 3): questions load
 * from `GET /api/practice/exams/:slug` through [PracticeRepository] (Room
 * cache offline). Route: `quiz/{quizId}` where quizId is the exam slug
 * (Agent 1 wires it; [SavedStateHandle] carries it in).
 */
@HiltViewModel
class QuizRunnerViewModel @Inject constructor(
    private val repository: PracticeRepository,
    savedStateHandle: SavedStateHandle,
) : ViewModel() {

    /** Test constructor: explicit setId + scope (no SavedStateHandle / Main needed on JVM). */
    constructor(repository: PracticeRepository, setId: String, scope: kotlinx.coroutines.CoroutineScope) :
        this(repository, SavedStateHandle(mapOf("quizId" to setId))) {
        this.scope = scope
    }

    val setId: String = savedStateHandle.get<String>("quizId").orEmpty()

    /** Injectable coroutine scope — tests pass Dispatchers.Unconfined (no Main on JVM). */
    internal var scope: kotlinx.coroutines.CoroutineScope = viewModelScope

    private val _examTitle = MutableStateFlow(setId)
    val examTitle: String get() = _examTitle.value

    private val _questions = MutableStateFlow<List<PracticeQuestion>>(emptyList())
    val questions: StateFlow<List<PracticeQuestion>> = _questions.asStateFlow()

    private val _loading = MutableStateFlow(true)
    val loading: StateFlow<Boolean> = _loading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    private val _index = MutableStateFlow(0)
    val index: StateFlow<Int> = _index.asStateFlow()

    private val _selected = MutableStateFlow<Int?>(null)
    val selected: StateFlow<Int?> = _selected.asStateFlow()

    private val _checked = MutableStateFlow(false)
    val checked: StateFlow<Boolean> = _checked.asStateFlow()

    private val _correctCount = MutableStateFlow(0)
    val correctCount: StateFlow<Int> = _correctCount.asStateFlow()

    private val _finished = MutableStateFlow(false)
    val finished: StateFlow<Boolean> = _finished.asStateFlow()

    val current: PracticeQuestion? get() = _questions.value.getOrNull(_index.value)

    init {
        scope = viewModelScope
    }

    /** Test-visible load so JVM tests can drive the async fetch deterministically. */
    fun load() {
        _loading.value = true
        _error.value = null
        scope.launch {
            when (val result = repository.loadExam(setId)) {
                is PracticeRepository.ExamResult.Fresh -> {
                    _questions.value = result.exam.questions.map { it.toModel(setId) }
                    _examTitle.value = result.exam.title ?: setId
                }
                is PracticeRepository.ExamResult.Cached -> {
                    _questions.value = result.exam.questions.map { it.toModel(setId) }
                    _examTitle.value = result.exam.title ?: setId
                }
                is PracticeRepository.ExamResult.Unavailable -> _error.value = result.message
            }
            _loading.value = false
        }
    }

    /** True once checked and the selected option was the correct one. */
    val lastAnswerCorrect: Boolean
        get() {
            val q = current ?: return false
            val sel = _selected.value ?: return false
            return _checked.value && sel == q.answerIndex
        }

    fun selectOption(optionIndex: Int) {
        if (_checked.value || optionIndex !in (current?.options?.indices ?: emptyList())) return
        _selected.value = optionIndex
    }

    fun check() {
        val q = current ?: return
        val sel = _selected.value ?: return
        if (_checked.value) return
        _checked.value = true
        if (sel == q.answerIndex) _correctCount.value += 1
    }

    fun next() {
        if (!_checked.value) return
        if (_index.value + 1 >= _questions.value.size) {
            _finished.value = true
        } else {
            _index.value += 1
            _selected.value = null
            _checked.value = false
        }
    }

    fun retry() = load()
}
