package com.ravikisan.platform.compose.ui.screens.pyqs

import com.ravikisan.platform.compose.ui.screens.pyqs.local.FakePyqBank
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/** ViewModel state tests over the fake source (JVM-only, same pattern as search/practice).
 *  The VM is synchronous (no coroutines launched), so no coroutines-test dep is needed
 *  (RQ-7 still open — do not add one here). */
class PyqsViewModelTest {
    @Test
    fun `hub loads subjects on init`() {
        val vm = PyqsViewModel(FakePyqBank())
        assertTrue(vm.hub.value.subjects.isNotEmpty())
    }

    @Test
    fun `openSubject loads the bank for a known subject`() {
        val vm = PyqsViewModel(FakePyqBank())
        vm.openSubject("class-11-notes", "physics")
        val state = vm.subject.value
        assertEquals("class-11-notes", state.classSlug)
        assertEquals("physics", state.subjectSlug)
        assertNotNull(state.bank)
        assertTrue(state.bank!!.pyqs.isNotEmpty())
        assertTrue(state.bank!!.pyqs.first().year >= state.bank!!.pyqs.last().year)
    }

    @Test
    fun `openSubject for an unknown subject shows the honest empty state`() {
        val vm = PyqsViewModel(FakePyqBank())
        vm.openSubject("class-11-notes", "nonexistent")
        val state = vm.subject.value
        assertNull(state.bank)
        assertEquals("nonexistent", state.subjectSlug)
    }

    @Test
    fun `openSubject does not reload the same subject`() {
        val vm = PyqsViewModel(FakePyqBank())
        vm.openSubject("class-11-notes", "physics")
        val first = vm.subject.value
        vm.openSubject("class-11-notes", "physics")
        assertEquals(first, vm.subject.value)
    }

    @Test
    fun `closeSubject resets subject state`() {
        val vm = PyqsViewModel(FakePyqBank())
        vm.openSubject("class-11-notes", "physics")
        vm.closeSubject()
        assertNull(vm.subject.value.bank)
        assertEquals("", vm.subject.value.classSlug)
    }
}
