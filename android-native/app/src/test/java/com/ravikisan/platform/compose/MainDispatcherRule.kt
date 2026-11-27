package com.ravikisan.platform.compose

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.setMain
import org.junit.rules.TestWatcher
import org.junit.runner.Description

/**
 * JUnit 4 rule that swaps [Dispatchers.Main] for an [UnconfinedTestDispatcher]
 * before each test, then resets it afterwards. Apply to any test class that
 * instantiates an `androidx.lifecycle.ViewModel` — the ViewModel constructor
 * initialises `viewModelScope` on `Dispatchers.Main`, which requires a Looper
 * that plain-JVM tests do not have.
 *
 * Usage:
 * ```
 * @get:Rule val mainDispatcherRule = MainDispatcherRule()
 * ```
 */
@OptIn(ExperimentalCoroutinesApi::class)
class MainDispatcherRule : TestWatcher() {

    private val testDispatcher = UnconfinedTestDispatcher()

    override fun starting(description: Description) {
        Dispatchers.setMain(testDispatcher)
    }

    override fun finished(description: Description) {
        Dispatchers.resetMain()
    }
}
