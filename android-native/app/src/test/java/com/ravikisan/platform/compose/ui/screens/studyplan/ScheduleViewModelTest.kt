package com.ravikisan.platform.compose.ui.screens.studyplan

import com.ravikisan.platform.compose.MainDispatcherRule
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.studyplan.local.FakeGoalsStore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import java.time.LocalDate

/**
 * Study schedule ViewModel tests (/schedule): `seedDailyPlan` + the
 * days-until-exam banner, all device-local.
 */
class ScheduleViewModelTest {

    @get:Rule val mainDispatcherRule = MainDispatcherRule()

    private val today = LocalDate.of(2026, 3, 10)

    private fun api() = FakeRnApi().apply {
        mobileSyllabusResponse = retrofit2.Response.success(
            com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse(
                ok = true,
                data = com.ravikisan.platform.compose.core.contract.MobileSyllabusData(
                    listOf(
                        com.ravikisan.platform.compose.core.contract.MobileClassDto(
                            id = "c1",
                            slug = "class-11-notes",
                            name = "Class 11 Notes",
                            subjects = listOf(
                                com.ravikisan.platform.compose.core.contract.MobileSubjectDto("s1", "physics", "Physics"),
                                com.ravikisan.platform.compose.core.contract.MobileSubjectDto("s2", "chemistry", "Chemistry"),
                            ),
                        ),
                    ),
                ),
            ),
        )
    }

    @Test
    fun `seed splits the daily minutes evenly over the subjects`() {
        val store = FakeGoalsStore().apply {
            kotlinx.coroutines.runBlocking {
                writeRaw(
                    """{"subjects":["class-11-notes/physics","class-11-notes/chemistry"],"dailyMinutes":90,""" +
                        """"preferences":{"language":"en"}}""",
                )
            }
        }
        val vm = ScheduleViewModel(
            store,
            SyllabusRepository(api(), FakeStudyCache()),
            CoroutineScope(Dispatchers.Unconfined),
        ).apply { rebuild(today) }
        val state = vm.state.value
        assertTrue(state.hasPlan)
        assertEquals(2, state.plan.size)
        assertEquals(45, state.plan.first().minutes)
        assertEquals("Physics", state.plan.first().subjectName)
    }

    @Test
    fun `days-until-exam banner comes from the stored date`() {
        val store = FakeGoalsStore().apply {
            kotlinx.coroutines.runBlocking {
                writeRaw(
                    """{"subjects":["class-11-notes/physics"],"dailyMinutes":60,"examDate":"2026-03-14",""" +
                        """"preferences":{"language":"en"}}""",
                )
            }
        }
        val vm = ScheduleViewModel(
            store,
            SyllabusRepository(api(), FakeStudyCache()),
            CoroutineScope(Dispatchers.Unconfined),
        ).apply { rebuild(today) }
        assertEquals(4, vm.state.value.daysLeft)
    }

    @Test
    fun `no goals means the empty state with the goals link`() {
        val vm = ScheduleViewModel(
            FakeGoalsStore(),
            SyllabusRepository(api(), FakeStudyCache()),
            CoroutineScope(Dispatchers.Unconfined),
        ).apply { rebuild(today) }
        assertFalse(vm.state.value.hasPlan)
        assertNullDaysLeft(vm)
    }

    private fun assertNullDaysLeft(vm: ScheduleViewModel) {
        assertTrue(vm.state.value.daysLeft == null)
    }

    @Test
    fun `scheduleDays groups seed items j mod 7 from today`() {
        val plan = (1..9).map { i ->
            com.ravikisan.platform.compose.core.logic.PlannerSeedItem(
                subjectKey = "class-11-notes/physics",
                subjectName = "Physics $i",
                minutes = 30,
            )
        }
        val days = scheduleDays(plan, today)
        assertEquals(7, days.size)
        assertEquals("Today", days.first().label)
        // Items 0..8 → day i gets items where j % 7 == i: day0 gets 0 and 7.
        assertEquals(2, days.first().items.size)
        assertEquals("Physics 1", days.first().items.first().subjectName)
        assertEquals("Physics 8", days.first().items.last().subjectName)
        // Day 6 gets only item 6.
        assertEquals(1, days[6].items.size)
        assertEquals("Physics 7", days[6].items.first().subjectName)
    }
}
