package com.ravikisan.platform.compose.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.NavType
import androidx.navigation.navArgument
import androidx.navigation.navDeepLink
import com.ravikisan.platform.compose.ui.screens.HomeScreen
import com.ravikisan.platform.compose.ui.screens.SettingsScreen
import com.ravikisan.platform.compose.ui.screens.ai.VeerChatScreen
import com.ravikisan.platform.compose.ui.screens.auth.LoginScreen
import com.ravikisan.platform.compose.ui.screens.auth.SignupScreen
import com.ravikisan.platform.compose.ui.screens.auth.WelcomeScreen
import com.ravikisan.platform.compose.ui.screens.practice.PracticeHubScreen
import com.ravikisan.platform.compose.ui.screens.practice.PracticeQuizScreen
import com.ravikisan.platform.compose.ui.screens.profile.NotificationsScreen
import com.ravikisan.platform.compose.ui.screens.profile.ProfileScreen
import com.ravikisan.platform.compose.ui.screens.search.SearchScreen
import com.ravikisan.platform.compose.ui.screens.social.CommunityScreen
import com.ravikisan.platform.compose.ui.screens.study.StudyUnitScreen
import com.ravikisan.platform.compose.ui.screens.study.SyllabusScreen

/**
 * Typed route names for the app shell. Every destination from the migration
 * plan §5 priority map is registered here as a stub from day 1; feature
 * workers (3: auth, 4: study/practice/ai/social/profile) replace the stubs
 * via Integration queue batches wired by Agent 1.
 */
object Routes {
    const val HOME = "home"
    const val SETTINGS = "settings"
    const val AUTH = "auth"
    const val AUTH_LOGIN = "auth/login"
    const val AUTH_SIGNUP = "auth/signup"
    const val LEARN = "learn"
    const val STUDY_UNIT = "study/{unitId}"
    const val SEARCH = "search"
    const val PRACTICE = "practice"
    const val QUIZ = "quiz/{quizId}"
    const val AI_TUTOR = "ai-tutor"
    const val COMMUNITY = "community"
    const val PROFILE = "profile"
    const val NOTIFICATIONS = "notifications"

    /** Helper for navigating to a concrete study unit. */
    fun studyUnit(unitId: String) = "study/$unitId"

    /** Helper for navigating to a concrete quiz. */
    fun quiz(quizId: String) = "quiz/$quizId"
}

/** App links handled by the shell (see AndroidManifest.xml intent filters). */
object DeepLinks {
    const val CUSTOM = "rn://app"
    const val WEB_ROOT = "https://harindrasah.com.np"
}

private data class TopDestination(val route: String, val label: String, val icon: androidx.compose.ui.graphics.vector.ImageVector)

private val topDestinations = listOf(
    TopDestination(Routes.HOME, "Home", Icons.Filled.Home),
    TopDestination(Routes.SETTINGS, "Settings", Icons.Filled.Settings),
)

@Composable
fun RnNavHost() {
    val navController = rememberNavController()
    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = backStackEntry?.destination

    Scaffold(
        bottomBar = {
            NavigationBar {
                topDestinations.forEach { dest ->
                    val selected = currentDestination?.hierarchy?.any { it.route == dest.route } == true
                    NavigationBarItem(
                        selected = selected,
                        onClick = {
                            navController.navigate(dest.route) {
                                popUpTo(navController.graph.startDestinationId) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                        icon = { Icon(dest.icon, contentDescription = dest.label) },
                        label = { Text(dest.label) },
                    )
                }
            }
        },
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Routes.HOME,
            modifier = Modifier.padding(innerPadding),
        ) {
            composable(
                route = Routes.HOME,
                deepLinks = listOf(
                    navDeepLink { uriPattern = DeepLinks.CUSTOM },
                    navDeepLink { uriPattern = DeepLinks.WEB_ROOT },
                    navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/*" },
                ),
            ) { HomeScreen() }
            composable(Routes.SETTINGS) { SettingsScreen() }

            composable(Routes.AUTH) {
                WelcomeScreen(
                    onLogin = { navController.navigate(Routes.AUTH_LOGIN) },
                    onSignup = { navController.navigate(Routes.AUTH_SIGNUP) },
                )
            }
            composable(Routes.AUTH_LOGIN) {
                LoginScreen(
                    onSignedIn = {
                        navController.navigate(Routes.HOME) {
                            popUpTo(Routes.AUTH) { inclusive = true }
                            launchSingleTop = true
                        }
                    },
                    onSignup = { navController.navigate(Routes.AUTH_SIGNUP) },
                )
            }
            composable(Routes.AUTH_SIGNUP) {
                SignupScreen(
                    onSignedUp = {
                        navController.navigate(Routes.HOME) {
                            popUpTo(Routes.AUTH) { inclusive = true }
                            launchSingleTop = true
                        }
                    },
                    onLogin = { navController.popBackStack() },
                )
            }
            composable(Routes.LEARN) {
                SyllabusScreen(onOpenUnit = { unitId ->
                    navController.navigate(Routes.studyUnit(unitId))
                })
            }
            composable(
                route = Routes.STUDY_UNIT,
                arguments = listOf(navArgument("unitId") { type = NavType.StringType }),
            ) { entry ->
                val unitId = entry.arguments?.getString("unitId").orEmpty()
                StudyUnitScreen(unitId = unitId)
            }
            composable(Routes.SEARCH) {
                SearchScreen(onOpenUnit = { unitId ->
                    navController.navigate(Routes.studyUnit(unitId))
                })
            }
            composable(Routes.PRACTICE) { PracticeHubScreen() }
            composable(
                route = Routes.QUIZ,
                arguments = listOf(navArgument("quizId") { type = NavType.StringType }),
            ) { entry ->
                val quizId = entry.arguments?.getString("quizId").orEmpty()
                PracticeQuizScreen(
                    setId = quizId,
                    onExit = { navController.popBackStack() },
                )
            }
            composable(Routes.AI_TUTOR) { VeerChatScreen() }
            composable(Routes.COMMUNITY) { CommunityScreen() }
            composable(Routes.PROFILE) {
                ProfileScreen(onOpenNotifications = { navController.navigate(Routes.NOTIFICATIONS) })
            }
            composable(Routes.NOTIFICATIONS) {
                NotificationsScreen(onBack = { navController.popBackStack() })
            }
        }
    }
}
