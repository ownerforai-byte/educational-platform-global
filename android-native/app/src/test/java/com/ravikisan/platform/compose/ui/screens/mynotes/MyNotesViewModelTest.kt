package com.ravikisan.platform.compose.ui.screens.mynotes

import com.ravikisan.platform.compose.MainDispatcherRule
import com.ravikisan.platform.compose.core.logic.NoteDraft
import com.ravikisan.platform.compose.core.logic.PersonalNote
import com.ravikisan.platform.compose.ui.screens.mynotes.local.FakeNotesStore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test

/**
 * My Notes ViewModel tests (/my-notes): every mutation goes through the
 * golden-tested `core/logic/PersonalNotes.kt` rules and persists the exact
 * JSON the website stores under `neb-my-notes:v1`.
 */
class MyNotesViewModelTest {

    @get:Rule val mainDispatcherRule = MainDispatcherRule()

    private fun vm(store: FakeNotesStore = FakeNotesStore()) =
        MyNotesViewModel(
            store,
            com.ravikisan.platform.compose.data.repository.SyllabusRepository(
                com.ravikisan.platform.compose.data.FakeRnApi(),
                com.ravikisan.platform.compose.data.FakeStudyCache(),
            ),
            CoroutineScope(Dispatchers.Unconfined),
        )

    @Test
    fun `empty device store starts with no notes`() {
        val vm = vm()
        assertTrue(vm.state.value.notes.isEmpty())
        assertTrue(vm.state.value.shown.isEmpty())
        assertTrue(vm.state.value.isEmptyLibrary)
    }

    @Test
    fun `saveDraft validates and persists the note`() {
        val store = FakeNotesStore()
        val vm = vm(store)
        vm.onDraftChanged(NoteDraft(title = "Ohm's law", body = "V = IR across a resistor."))
        assertTrue(vm.saveDraft(nowIso = "2026-03-10T10:00:00Z", nowMs = 1_000))
        assertEquals(1, vm.state.value.notes.size)
        assertEquals("Ohm's law", vm.state.value.notes.first().title)
        assertTrue(store.writes > 0)
        assertTrue(store.raw!!.contains("Ohm's law"))
        // Draft resets after save (website flow).
        assertTrue(vm.state.value.draft.title.isEmpty())
    }

    @Test
    fun `validation failures keep the error message and reject the write`() {
        val store = FakeNotesStore()
        val vm = vm(store)
        vm.onDraftChanged(NoteDraft(title = "  ", body = "V = IR"))
        assertFalse(vm.saveDraft(nowIso = "2026-03-10T10:00:00Z", nowMs = 1_000))
        assertEquals("Give the note a title.", vm.state.value.error)
        assertEquals(0, store.writes)
        assertTrue(vm.state.value.notes.isEmpty())
    }

    @Test
    fun `editing updates the same note and keeps one row`() {
        val store = FakeNotesStore()
        val vm = vm(store)
        vm.onDraftChanged(NoteDraft(title = "First", body = "body"))
        vm.saveDraft("2026-03-10T10:00:00Z", 1_000)
        val note = vm.state.value.notes.first()

        vm.startEditing(note)
        vm.onDraftChanged(NoteDraft(title = "First (edited)", body = "body"))
        assertTrue(vm.saveDraft("2026-03-10T11:00:00Z", 2_000))
        assertEquals(1, vm.state.value.notes.size)
        assertEquals("First (edited)", vm.state.value.notes.first().title)
        assertEquals("2026-03-10T11:00:00Z", vm.state.value.notes.first().updatedAt)
        assertTrue(vm.state.value.editingId == null)
    }

    @Test
    fun `delete removes and persists`() {
        val vm = vm()
        vm.onDraftChanged(NoteDraft(title = "First", body = "body"))
        vm.saveDraft("2026-03-10T10:00:00Z", 1_000)
        vm.deleteNote(vm.state.value.notes.first().id)
        assertTrue(vm.state.value.notes.isEmpty())
    }

    @Test
    fun `search and subject filter mirror filterNotes`() {
        val vm = vm()
        vm.onDraftChanged(NoteDraft(title = "Vectors", body = "scalar vs vector", subjectKey = "class-11-notes/physics"))
        vm.saveDraft("2026-03-10T10:00:00Z", 1_000)
        vm.onDraftChanged(NoteDraft(title = "Mole concept", body = "6.022e23", subjectKey = "class-11-notes/chemistry"))
        vm.saveDraft("2026-03-10T10:05:00Z", 2_000)

        vm.onQueryChanged("vector")
        assertEquals(1, vm.state.value.shown.size)
        vm.onQueryChanged("")
        vm.onSubjectFilterChanged("class-11-notes/chemistry")
        assertEquals(1, vm.state.value.shown.size)
        assertEquals("Mole concept", vm.state.value.shown.first().title)
        vm.onSubjectFilterChanged("")
        assertEquals(2, vm.state.value.shown.size)
        // Newest edit first.
        assertEquals("Mole concept", vm.state.value.shown.first().title)
    }

    @Test
    fun `account-changed rejection reloads and reports the unsaved note`() {
        val store = FakeNotesStore().apply {
            raw = """[{"id":"n-1","title":"Kept","body":"b","quote":"","subjectKey":"","createdAt":"2026-03-10T10:00:00Z","updatedAt":"2026-03-10T10:00:00Z"}]"""
        }
        val vm = vm(store)
        vm.onDraftChanged(NoteDraft(title = "New note", body = "Not yet saved."))
        store.rejectNextWith = com.ravikisan.platform.compose.ui.screens.mynotes.local.RejectionReason.ACCOUNT_CHANGED
        assertTrue(vm.saveDraft("2026-03-10T10:05:00Z", 2_000))
        // Rejected: the note is NOT in state; the pre-change library was
        // reloaded from storage (website commit() contract).
        assertEquals(1, vm.state.value.notes.size)
        assertEquals("Kept", vm.state.value.notes.first().title)
        assertEquals(
            "Your account changed. Your notes were reloaded and this change was not saved.",
            vm.state.value.error,
        )
        assertTrue(store.raw!!.contains("Kept"))
        assertFalse(store.raw!!.contains("Not yet saved."))
    }

    @Test
    fun `stored JSON round-trips through the website shape`() {
        val notes = listOf(
            PersonalNote(
                id = "n-1",
                title = "T",
                body = "B",
                quote = "Q",
                subjectKey = "class-11-notes/physics",
                createdAt = "2026-03-10T10:00:00Z",
                updatedAt = "2026-03-10T10:00:00Z",
            ),
        )
        val round = decodeNotes(encodeNotes(notes))
        assertEquals(notes, round)
    }
}
