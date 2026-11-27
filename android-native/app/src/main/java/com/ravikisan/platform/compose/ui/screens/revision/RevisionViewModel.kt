package com.ravikisan.platform.compose.ui.screens.revision

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.daysUntilExam
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.studyplan.decodeGoals
import com.ravikisan.platform.compose.ui.screens.studyplan.goalSubjectsFrom
import com.ravikisan.platform.compose.ui.screens.studyplan.local.GoalsStore
import dagger.hilt.android.lifecycle.HiltViewModel
import java.time.LocalDate
import javax.inject.Inject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/** One revision row — the student's own goal subject plus its unit count. */
data class RevisionSubject(
    val key: String,
    val subjectName: String,
    val className: String,
    /** Units available for review, or null when the unit list didn't load. */
    val unitCount: Int?,
)

/**
 * `/revision` state — mirrors `frontend/app/(app)/revision/page.tsx`: the
 * days-until-exam banner (only while the exam is still ahead), then one SRS
 * entry per goal subject, else the "set your study goals" card.
 */
data class RevisionUiState(
    val loading: Boolean = true,
    val daysLeft: Int? = null,
    val subjects: List<RevisionSubject> = emptyList(),
    /** Goals record loaded but no subject chosen → website's empty card. */
    val goalsEmpty: Boolean = false,
)

/**
 * `/revision` ViewModel. Goals stay device-local ([GoalsStore], same
 * `neb-study-goals:v1` record the website reads) and the subject catalog +
 * unit counts come from the live syllabus chain ([SyllabusRepository]) with
 * the Room cache serving airplane mode.
 */
@HiltViewModel
class RevisionViewModel @Inject constructor(
    private val store: GoalsStore,
    private val syllabus: SyllabusRepository,
) : ViewModel() {

    internal var scope: CoroutineScope = viewModelScope

    constructor(store: GoalsStore, syllabus: SyllabusRepository, scope: CoroutineScope) : this(store, syllabus) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(RevisionUiState())
    val state: StateFlow<RevisionUiState> = _state.asStateFlow()

    fun load(today: LocalDate = LocalDate.now()) {
        scope.launch {
            val catalog = loadCatalog()
            val goals = decodeGoals(store.readRaw(), catalog)
            val chosen = catalog.filter { it.key in goals.subjects }
            val daysLeft = daysUntilExam(goals, today)
            _state.value = RevisionUiState(
                loading = false,
                daysLeft = daysLeft?.takeIf { it > 0 },
                goalsEmpty = chosen.isEmpty(),
            )
            // Unit counts are per-subject requests; failure leaves the count null
            // (the website omits the line when the syllabus has no match).
            _state.value = _state.value.copy(
                subjects = chosen.map { subject ->
                    RevisionSubject(
                        key = subject.key,
                        subjectName = subject.subjectName,
                        className = subject.className,
                        unitCount = unitCount(subject),
                    )
                },
            )
        }
    }

    private suspend fun unitCount(subject: GoalSubject): Int? =
        when (val result = syllabus.loadUnits(subject.subjectSlug)) {
            is SyllabusRepository.Result.Fresh ->
                (result.payload as? SyllabusRepository.Payload.Units)?.units?.size
            is SyllabusRepository.Result.Cached ->
                (result.payload as? SyllabusRepository.Payload.Units)?.units?.size
            is SyllabusRepository.Result.Unavailable -> null
        }

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
