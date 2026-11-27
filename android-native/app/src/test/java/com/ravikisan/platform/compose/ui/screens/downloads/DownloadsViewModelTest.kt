package com.ravikisan.platform.compose.ui.screens.downloads

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileSyllabusData
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.core.contract.MobileUnitDto
import com.ravikisan.platform.compose.core.contract.MobileUnitsData
import com.ravikisan.platform.compose.core.contract.MobileSubjectRefDto
import com.ravikisan.platform.compose.core.contract.MobileUnitsResponse
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.downloads.local.FakePacksStore
import com.ravikisan.platform.compose.ui.screens.downloads.local.FakeUnitPackSource
import com.ravikisan.platform.compose.ui.screens.studyplan.local.FakeGoalsStore
import com.ravikisan.platform.compose.MainDispatcherRule
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test

/**
 * Offline Study ViewModel tests (/downloads): unit list from the Room-cached
 * syllabus endpoint, pack built by the golden-tested `buildUnitPack`, saved
 * packs persisted device-local in the website's exact `neb-offline-packs:v1`
 * JSON shape.
 */
class DownloadsViewModelTest {

    @get:Rule val mainDispatcherRule = MainDispatcherRule()

    private fun api() = FakeRnApi().apply {
        mobileSyllabusResponse = retrofit2.Response.success(
            MobileSyllabusResponse(
                ok = true,
                data = MobileSyllabusData(
                    listOf(
                        MobileClassDto(
                            id = "c1",
                            slug = "class-11-notes",
                            name = "Class 11 Notes",
                            subjects = listOf(MobileSubjectDto("s1", "physics", "Physics")),
                        ),
                    ),
                ),
            ),
        )
        mobileUnitsResponse = retrofit2.Response.success(
            MobileUnitsResponse(
                ok = true,
                data = MobileUnitsData(
                    subject = MobileSubjectRefDto(id = "s1", slug = "physics", name = "Physics"),
                    units = listOf(
                        MobileUnitDto(id = "u1", slug = "kinematics", title = "Kinematics", order = 1, topicCount = 3),
                        MobileUnitDto(id = "u2", slug = "newtons-laws", title = "Newton's Laws", order = 2, topicCount = 4),
                    ),
                ),
            ),
        )
    }

    private fun vm(packsStore: FakePacksStore = FakePacksStore(), api: FakeRnApi = api()) =
        DownloadsViewModel(
            FakeGoalsStore(),
            packsStore,
            SyllabusRepository(api, FakeStudyCache()),
            FakeUnitPackSource(),
            CoroutineScope(Dispatchers.Unconfined),
        )

    @Test
    fun `units load from the syllabus endpoint in curriculum order`() {
        val vm = vm()
        val state = vm.state.value
        assertEquals("class-11-notes/physics", state.subjectKey)
        assertEquals(listOf("Kinematics", "Newton's Laws"), state.units.map { it.title })
        assertFalse(state.unitsFromCache)
    }

    @Test
    fun `pack is built for the active unit with the right item count`() {
        val vm = vm()
        val state = vm.state.value
        assertTrue(state.pack != null)
        // 1 theory block + 2 formulas + 1 drill + 1 PYQ question.
        assertEquals(5, state.packCount)
        assertFalse(state.packUnavailable)
        assertFalse(state.alreadySaved)
    }

    @Test
    fun `save for offline persists the markdown pack device-local`() {
        val packsStore = FakePacksStore()
        val vm = vm(packsStore = packsStore)
        vm.savePackForOffline("2026-03-10T10:00:00Z")
        assertTrue(packsStore.writes > 0)
        val state = vm.state.value
        assertTrue(state.alreadySaved)
        assertEquals(1, state.savedPacks.size)
        val saved = state.savedPacks.first()
        assertEquals("class-11-notes/physics/kinematics", saved.id)
        assertTrue(saved.markdown.startsWith("# Kinematics"))
        assertEquals(5, saved.count)
        // Round-trips through the website's Record<packId, StoredPack> shape.
        val decoded = decodePacks(packsStore.raw)
        assertEquals("Kinematics", decoded.getValue("class-11-notes/physics/kinematics").title)
    }

    @Test
    fun `remove clears the saved pack and updates the already-saved flag`() {
        val vm = vm()
        vm.savePackForOffline("2026-03-10T10:00:00Z")
        val id = vm.state.value.savedPacks.first().id
        vm.removePack(id)
        assertTrue(vm.state.value.savedPacks.isEmpty())
        assertFalse(vm.state.value.alreadySaved)
    }

    @Test
    fun `offline units serve the room cache with the banner`() {
        val api = api()
        val cache = FakeStudyCache()
        val warm = DownloadsViewModel(
            FakeGoalsStore(),
            FakePacksStore(),
            SyllabusRepository(api, cache),
            FakeUnitPackSource(),
            CoroutineScope(Dispatchers.Unconfined),
        )
        assertTrue(warm.state.value.units.isNotEmpty())

        api.mobileUnitsError = RuntimeException("airplane mode")
        val cold = DownloadsViewModel(
            FakeGoalsStore(),
            FakePacksStore(),
            SyllabusRepository(api, cache),
            FakeUnitPackSource(),
            CoroutineScope(Dispatchers.Unconfined),
        )
        val state = cold.state.value
        assertTrue(state.unitsFromCache)
        assertTrue(state.units.isNotEmpty())
    }
}
