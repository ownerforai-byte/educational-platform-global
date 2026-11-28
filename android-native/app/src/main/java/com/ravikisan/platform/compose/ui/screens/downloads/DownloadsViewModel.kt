package com.ravikisan.platform.compose.ui.screens.downloads

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ravikisan.platform.compose.core.logic.FormulaSheetUnit
import com.ravikisan.platform.compose.core.logic.GoalSubject
import com.ravikisan.platform.compose.core.logic.OfflinePack
import com.ravikisan.platform.compose.core.logic.SubjectPyqBank
import com.ravikisan.platform.compose.core.logic.buildUnitPack
import com.ravikisan.platform.compose.core.logic.packItemCount
import com.ravikisan.platform.compose.core.logic.packToMarkdown
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.downloads.local.MobilePacks
import com.ravikisan.platform.compose.ui.screens.downloads.local.PacksStore
import com.ravikisan.platform.compose.ui.screens.downloads.local.StoredPack
import com.ravikisan.platform.compose.ui.screens.downloads.local.UnitPackSource
import com.ravikisan.platform.compose.ui.screens.studyplan.decodeGoals
import com.ravikisan.platform.compose.ui.screens.studyplan.goalSubjectsFrom
import com.ravikisan.platform.compose.ui.screens.studyplan.local.GoalsStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Offline Study state (/downloads) — mirrors `DownloadsView`
 * (`frontend/components/study/downloads-view.tsx`): pick a goal subject, pick
 * a unit (live syllabus endpoint through the Room-cached
 * [SyllabusRepository], so units work offline too), build the pack with the
 * golden-tested `buildUnitPack`, save its markdown device-local via
 * [PacksStore]. Saved packs open inside the app with no connection.
 *
 * Bank + formula sheets come from [UnitPackSource]; until those endpoint
 * families land (Worker 2/3) production binds the honest-empty stand-in, so
 * the screen shows the website's "nothing indexed for this unit yet" state.
 */
data class UnitRow(
    /** Database identifier, retained for stable list keys and routes. */
    val id: String,
    /** Public curriculum slug used by PYQ/formula banks. */
    val slug: String,
    val title: String,
)

data class DownloadsUiState(
    /** Goal subjects after the website's chosen-first filter. */
    val subjects: List<GoalSubject> = emptyList(),
    val subjectKey: String = "",
    val units: List<UnitRow> = emptyList(),
    val unitsFromCache: Boolean = false,
    val unitsError: String? = null,
    val activeUnitId: String = "",
    val activeUnitSlug: String = "",
    val loadingPack: Boolean = false,
    /** No bank/empty pack for the unit (website ComingSoon state). */
    val packUnavailable: Boolean = false,
    val pack: OfflinePack? = null,
    val packCount: Int = 0,
    val alreadySaved: Boolean = false,
    val savedPacks: List<StoredPack> = emptyList(),
    val justSaved: Boolean = false,
)

@HiltViewModel
class DownloadsViewModel @Inject constructor(
    private val goalsStore: GoalsStore,
    private val packsStore: PacksStore,
    private val syllabus: SyllabusRepository,
    @MobilePacks private val packSource: UnitPackSource,
) : ViewModel() {

    internal var scope: CoroutineScope = viewModelScope

    constructor(
        goalsStore: GoalsStore,
        packsStore: PacksStore,
        syllabus: SyllabusRepository,
        packSource: UnitPackSource,
        scope: CoroutineScope,
    ) : this(goalsStore, packsStore, syllabus, packSource) {
        this.scope = scope
    }

    private val _state = MutableStateFlow(DownloadsUiState())
    val state: StateFlow<DownloadsUiState> = _state.asStateFlow()

    init {
        refresh()
    }

    fun refresh() {
        scope.launch {
            val (subjects, chosen) = loadSubjects()
            val subjectKey = _state.value.subjectKey.ifEmpty {
                chosen.firstOrNull() ?: subjects.firstOrNull()?.key ?: ""
            }
            _state.value = _state.value.copy(subjects = subjects, subjectKey = subjectKey)
            if (subjectKey.isNotEmpty()) {
                loadUnits(subjectKey)
            }
            reloadSaved()
        }
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
        val chosen = goals.subjects.filter { key -> catalog.any { it.key == key } }
        val options = if (chosen.isEmpty()) catalog else catalog.filter { it.key in chosen }
        return catalog to options.map { it.key }
    }

    private suspend fun loadUnits(subjectKey: String) {
        val (classSlug, subjectSlug) = subjectKey.split("/", limit = 2).let {
            it.getOrElse(0) { "" } to it.getOrElse(1) { "" }
        }
        _state.value = _state.value.copy(unitsError = null, loadingPack = true)
        when (val result = syllabus.loadUnits(subjectSlug)) {

            is SyllabusRepository.Result.Fresh -> {
                val units = unitsOf(result.payload)
                _state.value = _state.value.copy(units = units, unitsFromCache = false)
                loadPack(subjectKey, units.firstOrNull()?.id ?: "")
            }
            is SyllabusRepository.Result.Cached -> {
                val units = unitsOf(result.payload)
                _state.value = _state.value.copy(units = units, unitsFromCache = true)
                loadPack(subjectKey, units.firstOrNull()?.id ?: "")
            }
            is SyllabusRepository.Result.Unavailable -> _state.value = _state.value.copy(
                units = emptyList(),
                unitsError = "Couldn't load the unit list — check your connection",
                loadingPack = false,
                packUnavailable = true,
                pack = null,
                packCount = 0,
            )
        }
    }

    private fun unitsOf(payload: SyllabusRepository.Payload): List<UnitRow> =
        (payload as? SyllabusRepository.Payload.Units)?.units?.map {
            UnitRow(id = it.id, slug = it.slug, title = it.title)
        } ?: emptyList()

    /** Rebuild the pack for the active unit (bank + formula unit best-effort). */
    fun loadPack(subjectKey: String, unitId: String) {
        val (classSlug, subjectSlug) = subjectKey.split("/", limit = 2).let {
            it.getOrElse(0) { "" } to it.getOrElse(1) { "" }
        }
        val units = _state.value.units
        val activeUnitId = unitId.ifEmpty { _state.value.activeUnitId.ifEmpty { units.firstOrNull()?.id ?: "" } }
        if (activeUnitId.isEmpty()) return
        val selectedUnit = units.firstOrNull { it.id == activeUnitId }
        val unitSlug = selectedUnit?.slug ?: activeUnitId
        val title = selectedUnit?.title ?: activeUnitId
        _state.value = _state.value.copy(activeUnitId = activeUnitId, loadingPack = true, packUnavailable = false)

        scope.launch {
            val bank = runCatching { packSource.bank(subjectKey) }.getOrNull()
            val formulaUnit: FormulaSheetUnit? = runCatching {
                packSource.formulaUnit(subjectKey, unitSlug)
            }.getOrNull()
            val pack = if (bank == null) null else buildUnitPack(title, unitSlug, bank, formulaUnit)
            val count = pack?.let(::packItemCount) ?: 0
            val currentId = packId(classSlug, subjectSlug, activeUnitId)
            val saved = decodePacks(packsStore.readRaw())
            _state.value = _state.value.copy(
                activeUnitSlug = unitSlug,
                loadingPack = false,
                pack = pack,
                packCount = count,
                packUnavailable = pack == null || count == 0,
                alreadySaved = saved.containsKey(currentId),
            )
        }
    }

    fun pickSubject(subjectKey: String) {
        if (subjectKey == _state.value.subjectKey) return
        _state.value = _state.value.copy(
            subjectKey = subjectKey,
            units = emptyList(),
            activeUnitId = "",
            activeUnitSlug = "",
            pack = null,
            packCount = 0,
            packUnavailable = false,
        )
        refresh()
    }

    fun pickUnit(unitId: String) {
        loadPack(_state.value.subjectKey, unitId)
    }

    /** Save (or update) the pack for the active unit, device-local only. */
    fun savePackForOffline(nowIso: String) {
        val pack = _state.value.pack ?: return
        val subjectKey = _state.value.subjectKey
        scope.launch {
            val (classSlug, subjectSlug) = subjectKey.split("/", limit = 2).let {
                it.getOrElse(0) { "" } to it.getOrElse(1) { "" }
            }
            val currentId = packId(classSlug, subjectSlug, _state.value.activeUnitSlug.ifEmpty { _state.value.activeUnitId })
            val stored = StoredPack(
                id = currentId,
                title = pack.title,
                savedAt = nowIso,
                markdown = packToMarkdown(pack),
                count = packItemCount(pack),
            )
            val next = decodePacks(packsStore.readRaw()) + (currentId to stored)
            _state.value = _state.value.copy(
                alreadySaved = true,
                justSaved = true,
                savedPacks = sortedSaved(next),
            )
            if (!packsStore.writeRaw(encodePacks(next))) {
                _state.value = _state.value.copy(justSaved = false, alreadySaved = false)
            }
        }
    }

    fun clearJustSaved() {
        _state.value = _state.value.copy(justSaved = false)
    }

    fun removePack(id: String) {
        scope.launch {
            val next = decodePacks(packsStore.readRaw()).toMutableMap().apply { remove(id) }
            _state.value = _state.value.copy(
                savedPacks = sortedSaved(next),
                alreadySaved = next.containsKey(currentPackId()),
            )
            packsStore.writeRaw(encodePacks(next))
        }
    }

    private fun currentPackId(): String {
        val (classSlug, subjectSlug) = _state.value.subjectKey.split("/", limit = 2).let {
            it.getOrElse(0) { "" } to it.getOrElse(1) { "" }
        }
        return packId(classSlug, subjectSlug, _state.value.activeUnitSlug.ifEmpty { _state.value.activeUnitId })
    }

    private fun reloadSaved() {
        scope.launch {
            _state.value = _state.value.copy(savedPacks = sortedSaved(decodePacks(packsStore.readRaw())))
        }
    }

    /** Newest save first, exactly like the website's savedList sort. */
    private fun sortedSaved(packs: Map<String, StoredPack>): List<StoredPack> =
        packs.values.sortedByDescending { it.savedAt }
}
