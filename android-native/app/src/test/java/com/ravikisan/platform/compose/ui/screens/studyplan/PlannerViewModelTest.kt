package com.ravikisan.platform.compose.ui.screens.studyplan

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileSyllabusData
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.core.logic.ProgressEntryLite
import com.ravikisan.platform.compose.core.logic.ProgressTopicLite
import com.ravikisan.platform.compose.MainDispatcherRule
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.studyplan.local.FakeGoalsStore
import com.ravikisan.platform.compose.ui.screens.studyplan.local.FakeJourneySource
import com.ravikisan.platform.compose.ui.screens.studyplan.local.PendingBindingJourneySource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import java.time.LocalDate

/**
 * Weekly planner ViewModel tests (/planner): goals + journey → the
 * golden-tested `buildWeeklyPlan`. The pending journey binding must behave
 * like the website's failed-progress path — honest "no weak topics", no
 * invented content.
 */
class PlannerViewModelTest {

    @get:Rule val mainDispatcherRule = MainDispatcherRule()

    private val today = LocalDate.of(2026, 3, 10)

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
    }

    private fun goalsWithPhysics(store: FakeGoalsStore) {
        kotlinx.coroutines.runBlocking {
            store.writeRaw(
                """{"subjects":["class-11-notes/physics"],"dailyMinutes":60,"onboarded":true,""" +
                    """"preferences":{"language":"en"}}""",
            )
        }
    }

    private val inProgressEntry = ProgressEntryLite(
        id = "j1",
        classSlug = "class-11-notes",
        subjectSlug = "physics",
        unitSlug = "kinematics",
        topicSlug = "vectors",
        topic = ProgressTopicLite(slug = "vectors", title = "Vectors"),
        status = "in_progress",
    )

    @Test
    fun `no goals shows the website's needs-goals gate`() {
        val vm = PlannerViewModel(
            FakeGoalsStore(),
            SyllabusRepository(api(), FakeStudyCache()),
            FakeJourneySource(inProgressEntry),
            CoroutineScope(Dispatchers.Unconfined),
        ).apply { rebuild(today) }
        assertTrue(vm.state.value.needsGoals)
        assertTrue(vm.state.value.days.isEmpty())
    }

    @Test
    fun `plan days carry the weak topic of the subject`() {
        val store = FakeGoalsStore().also(::goalsWithPhysics)
        val vm = PlannerViewModel(
            store,
            SyllabusRepository(api(), FakeStudyCache()),
            FakeJourneySource(inProgressEntry),
            CoroutineScope(Dispatchers.Unconfined),
        ).apply { rebuild(today) }
        val state = vm.state.value
        assertFalse(state.needsGoals)
        assertTrue(state.days.isNotEmpty())
        val focus = state.days.first().blocks.first().focus
        assertEquals("Vectors", focus?.title)
        assertEquals("class-11-notes/physics", focus?.subjectKey)
    }

    @Test
    fun `unavailable journey keeps the plan but drops weak topics`() {
        val store = FakeGoalsStore().also(::goalsWithPhysics)
        val vm = PlannerViewModel(
            store,
            SyllabusRepository(api(), FakeStudyCache()),
            PendingBindingJourneySource(),
            CoroutineScope(Dispatchers.Unconfined),
        ).apply { rebuild(today) }
        val state = vm.state.value
        assertTrue(state.journeyFailed)
        assertTrue(state.days.isNotEmpty())
        assertNull(state.days.first().blocks.first().focus)
    }

    @Test
    fun `no exam date means a full 7-day plan`() {
        val store = FakeGoalsStore().also(::goalsWithPhysics)
        val vm = PlannerViewModel(
            store,
            SyllabusRepository(api(), FakeStudyCache()),
            FakeJourneySource(inProgressEntry),
            CoroutineScope(Dispatchers.Unconfined),
        ).apply { rebuild(today) }
        assertEquals(7, vm.state.value.days.size)
    }
}
