package com.ravikisan.platform.compose.ui.screens.search

import com.ravikisan.platform.compose.ui.screens.search.local.FakeSearchIndex
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** ViewModel tests with the fake repo (Agent 4 task 3, per §7 order). */
class SearchViewModelTest {

    private fun viewModel() = SearchViewModel(SearchEngine(FakeSearchIndex.index()))

    @Test
    fun `initial state is empty and has not searched`() {
        val vm = viewModel()
        assertEquals("", vm.query.value)
        assertTrue(vm.results.value.isEmpty())
        assertFalse(vm.hasSearched)
    }

    @Test
    fun `typing a query updates results synchronously`() {
        val vm = viewModel()
        vm.onQueryChanged("vectors")
        assertEquals("vectors", vm.query.value)
        assertTrue(vm.hasSearched)
        assertTrue(vm.results.value.isNotEmpty())
        assertTrue(vm.results.value.all { it.unitId == "vectors" || it.matchText.contains("vector", ignoreCase = true) })
    }

    @Test
    fun `clear resets query and results`() {
        val vm = viewModel()
        vm.onQueryChanged("vectors")
        vm.clear()
        assertEquals("", vm.query.value)
        assertTrue(vm.results.value.isEmpty())
        assertFalse(vm.hasSearched)
    }

    @Test
    fun `short query keeps hasSearched false even after typing`() {
        val vm = viewModel()
        vm.onQueryChanged("v")
        assertFalse(vm.hasSearched)
        assertTrue(vm.results.value.isEmpty())
    }
}
