package com.ravikisan.platform.compose

import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onAllNodes
import androidx.compose.ui.test.onNode
import androidx.compose.ui.test.performClick
import dagger.hilt.android.testing.HiltAndroidRule
import dagger.hilt.android.testing.HiltAndroidTest
import org.junit.Rule
import org.junit.Test

/**
 * Smoke tests for the app shell: first frame renders, bottom navigation
 * is shown, and every top-level tab can be tapped without crashing.
 *
 * Network: the Home/Learn/Practice screens may start background loads. The
 * tests only assert on shell UI (content present, tabs visible), so they
 * pass whether those loads succeed or fail. No sleeps; waits are
 * condition-based via composeRule.waitUntil / waitForIdle.
 */
@HiltAndroidTest
class SmokeNavigationTest {

    // HiltAndroidRule must run first so the Hilt component exists before
    // MainActivity (@AndroidEntryPoint) is launched by the compose rule.
    @get:Rule(order = 0)
    val hiltRule = HiltAndroidRule(this)

    @get:Rule(order = 1)
    val composeRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun contentAppearsWithinTimeout() {
        composeRule.waitUntil(timeoutMillis = CONTENT_TIMEOUT_MS) {
            composeRule.onAllNodes(hasText("", substring = true))
                .fetchSemanticsNodes()
                .isNotEmpty()
        }
        composeRule.onNode(tab("Home")).assertIsDisplayed()
    }

    @Test
    fun bottomNavigationItemsAreDisplayed() {
        composeRule.waitUntil(timeoutMillis = CONTENT_TIMEOUT_MS) {
            composeRule.onAllNodes(tab("Home")).fetchSemanticsNodes().isNotEmpty()
        }
        TAB_LABELS.forEach { label ->
            composeRule.onNode(tab(label)).assertIsDisplayed()
        }
    }

    @Test
    fun tappingEachNavItemKeepsBarVisibleWithoutCrash() {
        composeRule.waitUntil(timeoutMillis = CONTENT_TIMEOUT_MS) {
            composeRule.onAllNodes(tab("Home")).fetchSemanticsNodes().isNotEmpty()
        }
        TAB_LABELS.forEach { label ->
            composeRule.onNode(tab(label)).performClick()
            composeRule.waitForIdle()
            TAB_LABELS.forEach { other ->
                composeRule.onNode(tab(other)).assertIsDisplayed()
            }
        }
    }

    private companion object {
        const val CONTENT_TIMEOUT_MS = 15_000L

        // Labels from topDestinations in navigation/RnNavHost.kt.
        val TAB_LABELS = listOf("Home", "Learn", "Practice", "Veer", "Community", "Profile")

        /** NavigationBarItem is a Role.Tab; this avoids matching same-text content. */
        fun tab(label: String): SemanticsMatcher =
            hasText(label) and SemanticsMatcher.expectValue(SemanticsProperties.Role, Role.Tab)
    }
}
