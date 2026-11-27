package com.ravikisan.platform.compose.ui.screens.studyplan

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.PlannerSeedItem
import com.ravikisan.platform.compose.core.logic.StudyGoals
import com.ravikisan.platform.compose.core.logic.daysUntilExam
import com.ravikisan.platform.compose.core.logic.seedDailyPlan
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.studyplan.local.GoalsStore
import dagger.hilt.android.lifecycle.HiltViewModel
import java.time.LocalDate
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Study schedule state (/schedule) — mirrors the website's SchedulePage:
 * `seedDailyPlan(goals)` split over the next 7 days from today, plus the
 * "N days until your exam" banner. All device-local; the catalog only names
 * the subjects (offline it falls back to the raw key, same as the planner).
 */
data class ScheduleUiState(
    val goals: StudyGoals? = null,
    val plan: List<PlannerSeedItem> = emptyList(),
    val catalog: List<GoalSubject> = emptyList(),
    val daysLeft: Int? = null,
    val today: LocalDate = LocalDate.now(),
) {
    val hasPlan: Boolean get() = plan.isNotEmpty()
}

@HiltViewModel
class ScheduleViewModel @Inject constructor(
    private val store: GoalsStore,
    private val syllabus: SyllabusRepository,
) : ViewModel() {

    internal var scope: CoroutineScope = viewModelScope

    constructor(store: GoalsStore, syllabus: SyllabusRepository, scope: CoroutineScope) : this(store, syllabus) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(ScheduleUiState())
    val state: StateFlow<ScheduleUiState> = _state.asStateFlow()

    init {
        rebuild(today = LocalDate.now())
    }

    fun rebuild(today: LocalDate) {
        _state.value = _state.value.copy(today = today)
        scope.launch {
            val rawGoals = store.readRaw()
            val catalog = runCatching {
                when (val result = syllabus.load()) {
                    is SyllabusRepository.Result.Fresh ->
                        (result.payload as? SyllabusRepository.Payload.SyllabusTree)
                            ?.let { goalSubjectsFrom(it.classes) }
                    is SyllabusRepository.Result.Cached ->
                        (result.payload as? SyllabusRepository.Payload.SyllabusTree)
                            ?.let { goalSubjectsFrom(it.classes) }
                    is SyllabusRepository.Result.Unavailable -> null
                }
            }.getOrNull() ?: emptyList()
            val goals = decodeGoals(rawGoals, catalog)
            _state.value = ScheduleUiState(
                goals = goals,
                plan = seedDailyPlan(goals, catalog),
                catalog = catalog,
                daysLeft = daysUntilExam(goals, today),
                today = today,
            )
        }
    }
}
