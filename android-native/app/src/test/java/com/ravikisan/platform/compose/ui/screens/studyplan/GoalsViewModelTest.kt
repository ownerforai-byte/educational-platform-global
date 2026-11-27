package com.ravikisan.platform.compose.ui.screens.studyplan

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileSyllabusData
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.MainDispatcherRule
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.studyplan.local.FakeGoalsStore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test

/**
 * Study-goals ViewModel tests (/onboarding + /goals) against the real
 * [SyllabusRepository] chain ([FakeRnApi] wire + [FakeStudyCache] Room fake)
 * and the in-memory [FakeGoalsStore] device store.
 */
class GoalsViewModelTest {

    @get:Rule val mainDispatcherRule = MainDispatcherRule()

    private val classes = listOf(
        MobileClassDto(
            id = "c1",
            slug = "class-11-notes",
            name = "Class 11 Notes",
            subjects = listOf(
                MobileSubjectDto("s1", "physics", "Physics"),
                MobileSubjectDto("s2", "chemistry", "Chemistry"),
            ),
        ),
        MobileClassDto(
            id = "c2",
            slug = "class-12-notes",
            name = "Class 12 Notes",
            subjects = listOf(MobileSubjectDto("s3", "mathematics", "Mathematics")),
        ),
    )

    private fun api() = FakeRnApi().apply {
        mobileSyllabusResponse = retrofit2.Response.success(
            MobileSyllabusResponse(ok = true, data = MobileSyllabusData(classes)),
        )
    }

    private fun vm(
        store: FakeGoalsStore = FakeGoalsStore(),
        api: FakeRnApi = api(),
        cache: FakeStudyCache = FakeStudyCache(),
    ) = GoalsViewModel(
        store,
        SyllabusRepository(api, cache),
        CoroutineScope(Dispatchers.Unconfined),
    )

    @Test
    fun `goals record is ready immediately from the device store`() {
        val vm = vm()
        assertTrue(vm.state.value.goals != null)
        assertTrue(vm.state.value.goals!!.subjects.isEmpty())
        assertFalse(vm.state.value.goals!!.onboarded)
    }

    @Test
    fun `catalog maps the syllabus tree field-for-field`() {
        val vm = vm()
        assertEquals(3, vm.state.value.catalog.size)
        assertEquals(
            "class-11-notes/physics",
            vm.state.value.catalog.first().key,
        )
        assertEquals("Class 11 Notes", vm.state.value.catalog.first().className)
        assertEquals("Physics", vm.state.value.catalog.first().subjectName)
    }

    @Test
    fun `toggling a subject persists the record through the normalizer`() {
        val store = FakeGoalsStore()
        val vm = vm(store = store)
        vm.toggleSubject("class-11-notes/physics")
        assertTrue(store.writes > 0)
        assertTrue(store.raw!!.contains("class-11-notes/physics"))
        assertTrue(vm.state.value.goals!!.subjects.contains("class-11-notes/physics"))
        vm.toggleSubject("class-11-notes/physics")
        assertFalse(vm.state.value.goals!!.subjects.contains("class-11-notes/physics"))
    }

    @Test
    fun `exam date and daily minutes clamp through the normalizer`() {
        val vm = vm()
        vm.setExamDate("2026-05-14")
        assertEquals("2026-05-14", vm.state.value.goals!!.examDate)
        vm.setExamDate("not-a-date")
        assertNull(vm.state.value.goals!!.examDate)
        vm.setDailyMinutes(900)
        assertEquals(60, vm.state.value.goals!!.dailyMinutes)
    }

    @Test
    fun `onboarding save marks the record onboarded`() {
        val vm = vm()
        vm.toggleSubject("class-11-notes/physics")
        var saved: Boolean? = null
        vm.saveBeforeLeaving(vm.state.value.goals!!, onboarded = true) {
            saved = vm.state.value.goals?.onboarded
        }
        assertEquals(true, saved)
    }

    @Test
    fun `onboarding save callback waits for successful persistence`() {
        val store = object : com.ravikisan.platform.compose.ui.screens.studyplan.local.GoalsStore {
            var persisted: String? = null
            var allowWrite = false

            override suspend fun readRaw(): String? = persisted

            override suspend fun writeRaw(raw: String?): Boolean {
                if (!allowWrite) return false
                persisted = raw
                return true
            }
        }
        val viewModel = GoalsViewModel(
            store,
            SyllabusRepository(api(), FakeStudyCache()),
            CoroutineScope(Dispatchers.Unconfined),
        )
        var callbackCount = 0

        viewModel.saveBeforeLeaving(viewModel.state.value.goals!!, onboarded = true) { callbackCount++ }
        assertEquals(0, callbackCount)
        assertTrue(viewModel.state.value.catalogError != null)

        store.allowWrite = true
        viewModel.saveBeforeLeaving(viewModel.state.value.goals!!, onboarded = true) { callbackCount++ }
        assertEquals(1, callbackCount)
        assertTrue(store.persisted!!.contains("\"onboarded\":true"))
    }

    @Test
    fun `offline catalog shows the honest error`() {
        val api = api().apply { mobileSyllabusError = RuntimeException("airplane mode") }
        val vm = vm(api = api)
        assertTrue(vm.state.value.catalog.isEmpty())
        assertTrue(vm.state.value.catalogError != null)
        assertFalse(vm.state.value.catalogFromCache)
    }

    @Test
    fun `catalog refresh removes stored subject keys absent from the published tree`() {
        val store = FakeGoalsStore(
            """{"subjects":["class-10-notes/physics"],"dailyMinutes":60,"preferences":{"language":"en"}}""",
        )
        val viewModel = vm(store = store)
        assertTrue(viewModel.state.value.catalog.isNotEmpty())
        assertTrue(viewModel.state.value.goals!!.subjects.isEmpty())
    }

    @Test
    fun `cached catalog serves airplane mode with the offline banner`() {
        val api = api()
        val cache = FakeStudyCache()
        // Warm the cache, then cut the wire.
        val warm = vm(api = api, cache = cache)
        assertTrue(warm.state.value.catalog.isNotEmpty())

        api.mobileSyllabusError = RuntimeException("airplane mode")
        val cold = GoalsViewModel(
            FakeGoalsStore(),
            SyllabusRepository(api, cache),
            CoroutineScope(Dispatchers.Unconfined),
        )
        assertTrue(cold.state.value.catalog.isNotEmpty())
        assertTrue(cold.state.value.catalogFromCache)
    }
}
