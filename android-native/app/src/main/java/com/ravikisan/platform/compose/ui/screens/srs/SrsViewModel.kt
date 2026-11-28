package com.ravikisan.platform.compose.ui.screens.srs

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.SrsCard
import com.ravikisan.platform.compose.core.logic.SrsState
import com.ravikisan.platform.compose.core.logic.buildCards
import com.ravikisan.platform.compose.core.logic.dueQueue
import com.ravikisan.platform.compose.core.logic.isoDay
import com.ravikisan.platform.compose.core.logic.sm2
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.srs.local.MobileSrsBank
import com.ravikisan.platform.compose.ui.screens.srs.local.SrsCardSource
import com.ravikisan.platform.compose.ui.screens.srs.local.SrsReviewStore
import com.ravikisan.platform.compose.ui.screens.studyplan.decodeGoals
import com.ravikisan.platform.compose.ui.screens.studyplan.goalSubjectsFrom
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
 * SRS state (/srs) — mirrors `SrsView` (`frontend/components/study/srs-view.tsx`):
 * flashcards built by the golden-tested `buildCards` from the subject's
 * pyq-bank ([SrsCardSource]), scheduled by `sm2`, review state device-local
 * via [SrsReviewStore] under `neb-srs:v1`.
 *
 * Subject selection matches the website's `SubjectSelect`: the student's goal
 * subjects (all subjects when none are chosen), with the goal-first pick.
 */
data class SrsUiState(
    val subjectKey: String = "",
    /** Subject options after the website's chosen-first filter. */
    val subjects: List<GoalSubject> = emptyList(),
    val loadingCards: Boolean = false,
    /** No bank / bank failed for the picked subject (website ComingSoon state). */
    val bankUnavailable: Boolean = false,
    val deckSize: Int = 0,
    val dueCount: Int = 0,
    val freshCount: Int = 0,
    /** Current card to show, or null = "All done". */
    val current: SrsCard? = null,
    val revealed: Boolean = false,
)

@HiltViewModel
class SrsViewModel @Inject constructor(
    private val store: SrsReviewStore,
    private val goalsStore: GoalsStore,
    private val syllabus: SyllabusRepository,
    @MobileSrsBank private val cardSource: SrsCardSource,
) : ViewModel() {

    internal var scope: CoroutineScope = viewModelScope

    constructor(
        store: SrsReviewStore,
        goalsStore: GoalsStore,
        syllabus: SyllabusRepository,
        cardSource: SrsCardSource,
        scope: CoroutineScope,
    ) : this(store, goalsStore, syllabus, cardSource) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(SrsUiState())
    val state: StateFlow<SrsUiState> = _state.asStateFlow()

    private var reviewStore: Map<String, SrsState> = emptyMap()
    private var deck: List<SrsCard> = emptyList()

    init {
        scope.launch { reviewStore = decodeSrsStore(store.readRaw()) }
        refresh(today = LocalDate.now())
    }

    /** Full recompute: goals → subject pick → bank → cards → due queue. */
    fun refresh(today: LocalDate) {
        scope.launch {
            reviewStore = decodeSrsStore(store.readRaw())
            val (catalog, chosen) = loadSubjects()
            val subjectKey = _state.value.subjectKey.ifEmpty {
                chosen.firstOrNull() ?: catalog.firstOrNull()?.key ?: ""
            }
            if (subjectKey.isEmpty()) {
                _state.value = SrsUiState(subjects = catalog, bankUnavailable = true)
                return@launch
            }
            _state.value = _state.value.copy(
                subjects = catalog,
                subjectKey = subjectKey,
                loadingCards = true,
                bankUnavailable = false,
                revealed = false,
            )
            val bank = runCatching { cardSource.bank(subjectKey) }.getOrNull()
            deck = if (bank == null) emptyList() else buildCards(subjectKey, bank)
            recompute(today, bankWasEmpty = deck.isEmpty())
        }
    }

    fun pickSubject(subjectKey: String, today: LocalDate) {
        if (subjectKey == _state.value.subjectKey) return
        _state.value = _state.value.copy(subjectKey = subjectKey, revealed = false)
        refresh(today)
    }

    fun reveal() {
        _state.value = _state.value.copy(revealed = true)
    }

    /** One SM-2 step on the current card (self-grade 1/3/4/5 like the website). */
    fun grade(quality: Int, today: LocalDate) {
        val current = _state.value.current ?: return
        reviewStore = reviewStore + (current.id to sm2(reviewStore[current.id], quality, isoDay(today)))
        recompute(today, bankWasEmpty = deck.isEmpty(), justGraded = true)
        scope.launch {
            store.writeRaw(encodeSrsStore(reviewStore))
        }
    }

    private fun recompute(today: LocalDate, bankWasEmpty: Boolean, justGraded: Boolean = false) {
        val queue = if (deck.isEmpty()) {
            com.ravikisan.platform.compose.core.logic.DueQueue(emptyList(), emptyList())
        } else {
            dueQueue(deck, reviewStore, isoDay(today))
        }
        val next = queue.due.firstOrNull() ?: queue.fresh.firstOrNull()
        _state.value = _state.value.copy(
            loadingCards = false,
            bankUnavailable = bankWasEmpty,
            deckSize = deck.size,
            dueCount = queue.due.size,
            freshCount = queue.fresh.size,
            current = next,
            revealed = if (justGraded) false else _state.value.revealed,
        )
    }

    /** Website `SubjectSelect` semantics: goal subjects only, else all. */
    private suspend fun loadSubjects(): Pair<List<GoalSubject>, List<String>> {
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
        val goals = decodeGoals(goalsStore.readRaw(), catalog)
        val chosen = goals.subjects.filter { key -> catalog.any { subject -> subject.key == key } }
        val options = if (chosen.isEmpty()) catalog else catalog.filter { subject -> subject.key in chosen }
        return catalog to options.map { subject -> subject.key }
    }
}
