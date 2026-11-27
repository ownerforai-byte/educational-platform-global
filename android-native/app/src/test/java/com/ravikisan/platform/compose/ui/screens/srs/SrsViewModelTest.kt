package com.ravikisan.platform.compose.ui.screens.srs

import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileSyllabusData
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.MainDispatcherRule
import com.ravikisan.platform.compose.data.FakeRnApi
import com.ravikisan.platform.compose.data.FakeStudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.srs.local.FakeCardSource
import com.ravikisan.platform.compose.ui.screens.srs.local.FakeSrsReviewStore
import com.ravikisan.platform.compose.ui.screens.studyplan.local.FakeGoalsStore
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
 * SRS ViewModel tests (/srs): the golden-tested `buildCards`/`dueQueue`/`sm2`
 * chain over a fixture pyq-bank, review state persisted device-local in the
 * website's exact `neb-srs:v1` JSON shape.
 */
class SrsViewModelTest {

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

    private fun vm(
        srsStore: FakeSrsReviewStore = FakeSrsReviewStore(),
        goalsStore: FakeGoalsStore = FakeGoalsStore(),
    ) = SrsViewModel(
        srsStore,
        goalsStore,
        SyllabusRepository(api(), FakeStudyCache()),
        FakeCardSource(),
        CoroutineScope(Dispatchers.Unconfined),
    )

    @Test
    fun `fixture bank builds a three-card deck with a fresh queue`() {
        val vm = vm()
        val state = vm.state.value
        assertEquals("class-11-notes/physics", state.subjectKey)
        assertEquals(3, state.deckSize)
        assertEquals(0, state.dueCount)
        assertEquals(3, state.freshCount)
        // First fresh card = first theory block (stable builder order).
        assertEquals("concept", state.current?.kind)
        assertEquals("Kinematics essentials", state.current?.front)
        assertFalse(state.revealed)
    }

    @Test
    fun `grading writes the SM-2 state device-local and advances the queue`() {
        val srsStore = FakeSrsReviewStore()
        val vm = vm(srsStore = srsStore)
        vm.reveal()
        assertTrue(vm.state.value.revealed)
        val firstId = vm.state.value.current!!.id

        vm.grade(quality = 4, today = today)
        assertTrue(srsStore.writes > 0)
        val decoded = decodeSrsStore(srsStore.raw)
        assertTrue(decoded.containsKey(firstId))
        assertEquals(1, decoded.getValue(firstId).interval)
        // Grading reveals the next fresh card with the answer hidden again.
        assertTrue(vm.state.value.current!!.id != firstId)
        assertFalse(vm.state.value.revealed)
    }

    @Test
    fun `subject without a bank shows the honest empty state`() {
        val goalsStore = FakeGoalsStore().apply {
            kotlinx.coroutines.runBlocking { writeRaw("""{"subjects":["class-11-notes/physics"],"dailyMinutes":60,"preferences":{}}""") }
        }
        val vm = vm(goalsStore = goalsStore)
        // Pick a subject the fake has no bank for.
        vm.pickSubject("class-11-notes/chemistry", today)
        val state = vm.state.value
        assertTrue(state.bankUnavailable)
        assertEquals(0, state.deckSize)
        assertNull(state.current)
    }

    @Test
    fun `goal subjects limit the picker options`() {
        val goalsStore = FakeGoalsStore().apply {
            kotlinx.coroutines.runBlocking { writeRaw("""{"subjects":["class-11-notes/physics"],"dailyMinutes":60,"preferences":{}}""") }
        }
        val vm = vm(goalsStore = goalsStore)
        assertEquals(listOf("class-11-notes/physics"), vm.state.value.subjects.map { it.key })
    }
}
