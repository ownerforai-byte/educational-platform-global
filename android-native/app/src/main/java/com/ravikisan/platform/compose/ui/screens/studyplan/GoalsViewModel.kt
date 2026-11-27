package com.ravikisan.platform.compose.ui.screens.studyplan

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.StudyGoals
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.studyplan.local.GoalsStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Study-goals state — shared by /onboarding and /goals (Agent 4, parity plan
 * §2 P2 rows). The record is device-local (`GoalsStore`, key
 * `neb-study-goals:v1`) and is read/written through the golden-tested
 * `core/logic/StudyGoals.kt` normalizers, so the saved JSON is identical to
 * the website's `study-goals.ts` record.
 *
 * The subject catalog is INJECTED from the live syllabus endpoint through
 * [SyllabusRepository] (the website reads its static SYLLABUS); offline the
 * Room cache serves it and [GoalsUiState.catalogFromCache] flags the banner.
 */
data class GoalsUiState(
    /** Device record — null only before the first read (website "Loading…"). */
    val goals: StudyGoals? = null,
    val catalog: List<GoalSubject> = emptyList(),
    val catalogLoading: Boolean = true,
    val catalogFromCache: Boolean = false,
    val catalogError: String? = null,
)

@HiltViewModel
class GoalsViewModel @Inject constructor(
    private val store: GoalsStore,
    private val syllabus: SyllabusRepository,
) : ViewModel() {

    /** Injectable coroutine scope — tests pass Dispatchers.Unconfined (no Main on JVM). */
    internal var scope: CoroutineScope = viewModelScope

    constructor(store: GoalsStore, syllabus: SyllabusRepository, scope: CoroutineScope) : this(store, syllabus) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(GoalsUiState())
    val state: StateFlow<GoalsUiState> = _state.asStateFlow()

    init {
        // Device record: read first, then the catalog — the goals paint as soon
        // as the device store answers (website: post-mount `readGoals()`).
        scope.launch {
            val raw = store.readRaw()
            _state.value = GoalsUiState(goals = decodeGoalsPreservingSubjectKeys(raw))
            refreshCatalog()
        }
    }

    /** (Re)load the subject catalog from the syllabus repository. */
    fun refreshCatalog() {
        _state.value = _state.value.copy(catalogLoading = true, catalogError = null)
        scope.launch {
            when (val result = syllabus.load()) {
                is SyllabusRepository.Result.Fresh -> {
                    val catalog = (result.payload as? SyllabusRepository.Payload.SyllabusTree)
                        ?.let { goalSubjectsFrom(it.classes) }
                        ?: emptyList()
                    _state.value = _state.value.copy(
                        catalog = catalog,
                        catalogLoading = false,
                        catalogFromCache = false,
                    )
                    _state.value = _state.value.copy(
                        // Re-validate only after the actual catalog is in state.
                        goals = _state.value.goals?.let { normalize(it) },
                    )
                }
                is SyllabusRepository.Result.Cached -> {
                    val catalog = (result.payload as? SyllabusRepository.Payload.SyllabusTree)
                        ?.let { goalSubjectsFrom(it.classes) }
                        ?: emptyList()
                    _state.value = _state.value.copy(
                        catalog = catalog,
                        catalogLoading = false,
                        catalogFromCache = true,
                    )
                    _state.value = _state.value.copy(
                        goals = _state.value.goals?.let { normalize(it) },
                    )
                }
                is SyllabusRepository.Result.Unavailable -> _state.value = _state.value.copy(
                    catalogLoading = false,
                    catalogError = "Couldn't load the subject list — check your connection",
                )
            }
        }
    }

    /** Toggle one subject key in the draft (both screens edit the live record). */
    fun toggleSubject(key: String) {
        val goals = _state.value.goals ?: return
        val subjects = if (key in goals.subjects) {
            goals.subjects.filterNot { it == key }
        } else {
            goals.subjects + key
        }
        update(goals.copy(subjects = subjects))
    }

    fun setExamDate(isoDate: String) {
        val goals = _state.value.goals ?: return
        update(goals.copy(examDate = isIsoDateOrNull(isoDate)))
    }

    fun setTargetPercent(percent: Int?) {
        val goals = _state.value.goals ?: return
        update(goals.copy(targetPercent = percent))
    }

    fun setDailyMinutes(minutes: Int) {
        val goals = _state.value.goals ?: return
        update(goals.copy(dailyMinutes = minutes))
    }

    /**
     * Normalize + persist the current record; returns the saved record
     * (mirrors `writeGoals` — the normalizer is the contract, and both
     * screens write through it).
     */
    fun save(onboarded: Boolean = false): StudyGoals? {
        val goals = _state.value.goals ?: return null
        return saveRecord(goals.copy(onboarded = onboarded || goals.onboarded))
    }

    /** Persist onboarding before leaving the screen; report storage failures in-place. */
    fun saveBeforeLeaving(draft: StudyGoals, onboarded: Boolean = false, onSaved: () -> Unit) {
        val normalized = normalize(draft.copy(onboarded = onboarded || draft.onboarded))
        _state.value = _state.value.copy(goals = normalized)
        scope.launch {
            if (store.writeRaw(encodeGoals(normalized))) {
                _state.value = _state.value.copy(catalogError = null)
                onSaved()
            } else {
                _state.value = _state.value.copy(
                    catalogError = "Couldn't save — device storage refused the write.",
                )
            }
        }
    }

    private fun update(goals: StudyGoals) {
        val normalized = normalize(goals)
        _state.value = _state.value.copy(goals = normalized)
        scope.launch {
            if (!store.writeRaw(encodeGoals(normalized))) {
                _state.value = _state.value.copy(
                    catalogError = "Couldn't save — device storage refused the write.",
                )
            }
        }
    }

    /**
     * Persist + return the saved record (mirrors `writeGoals` — the
     * normalizer is the contract, and both screens write through it).
     */
    private fun saveRecord(goals: StudyGoals): StudyGoals {
        val normalized = normalize(goals)
        _state.value = _state.value.copy(goals = normalized)
        scope.launch {
            if (!store.writeRaw(encodeGoals(normalized))) {
                _state.value = _state.value.copy(
                    catalogError = "Couldn't save — device storage refused the write.",
                )
            }
        }
        return normalized
    }

    /**
     * Normalize through the golden-tested rules. While the catalog has not
     * loaded (offline cold start), the subject set is validated against
     * itself so saved subjects are never silently dropped.
     */
    private fun normalize(goals: StudyGoals): StudyGoals {
        val catalog = _state.value.catalog.ifEmpty {
            goals.subjects.map { subject ->
                com.ravikisan.platform.compose.core.logic.GoalSubject(
                    key = subject,
                    classSlug = "",
                    className = "",
                    subjectSlug = "",
                    subjectName = subject,
                )
            }
        }
        return decodeGoals(encodeGoals(goals), catalog)
    }
}