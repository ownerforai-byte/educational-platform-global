package com.ravikisan.platform.compose.navigation

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Forum
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.NavType
import androidx.navigation.navArgument
import androidx.navigation.navDeepLink
import com.ravikisan.platform.compose.ui.components.placeholder.ComingToNative
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
import com.ravikisan.platform.compose.ui.screens.journal.JournalScreen
import com.ravikisan.platform.compose.ui.screens.studyplan.GoalsScreen
import com.ravikisan.platform.compose.ui.screens.studyplan.OnboardingScreen
import com.ravikisan.platform.compose.ui.screens.studyplan.ScheduleScreen
import com.ravikisan.platform.compose.ui.screens.wave2.AnnouncementsScreen
import com.ravikisan.platform.compose.ui.screens.wave2.ChangelogScreen
import com.ravikisan.platform.compose.ui.screens.wave2.ExamCountdownScreen
import com.ravikisan.platform.compose.ui.screens.wave2.FeedbackScreen
import com.ravikisan.platform.compose.ui.screens.wave2.KnowledgeHubScreen
import com.ravikisan.platform.compose.ui.screens.wave2.KnowledgeTopicScreen
import com.ravikisan.platform.compose.ui.screens.wave2.LabDetailScreen
import com.ravikisan.platform.compose.ui.screens.wave2.LabHubScreen
import com.ravikisan.platform.compose.ui.screens.wave2.LevelsScreen
import com.ravikisan.platform.compose.ui.screens.wave2.NoticeScreen
import com.ravikisan.platform.compose.ui.screens.wave2.PeriodicTableScreen
import com.ravikisan.platform.compose.ui.screens.wave2.ReferralsScreen
import com.ravikisan.platform.compose.ui.screens.wave2.SiteIndexScreen
import com.ravikisan.platform.compose.ui.screens.wave2.StatusScreen

/**
 * Typed route names for the app shell. Every destination from the migration
 * plan §5 priority map is registered here.
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

    // ── Parity-campaign routes (parity plan §2) ─────────────────────────────
    // Day-1 stubs for every remaining website section, so the parity ledger
    // starts honest and Worker 4 fills screens without waiting (B0 task 2).
    const val DASHBOARD = "dashboard"
    const val ONBOARDING = "onboarding"
    const val PLANNER = "planner"
    const val SRS = "srs"
    const val MOCK_EXAMS = "mock-exams"
    const val ANALYTICS = "analytics"
    const val STREAKS = "streaks"
    const val MY_NOTES = "my-notes"
    const val DOWNLOADS = "downloads"
    const val BILLING = "billing"
    const val REFERRALS = "referrals"
    const val SITE_INDEX = "site-index"
    const val LEVELS = "levels"
    const val EXAMS = "exams"
    const val REVISION = "revision"
    const val LEADERBOARD = "leaderboard"
    const val GOALS = "goals"
    const val SCHEDULE = "schedule"
    const val CERTIFICATES = "certificates"
    const val ANNOUNCEMENTS = "announcements"
    const val FEEDBACK = "feedback"
    const val CHANGELOG = "changelog"
    const val STATUS = "status"
    const val CLASS_HUB = "class-hub/{slug}"
    const val CLASS_THEORY = "class-hub/{slug}/theory"
    const val SUBJECTS = "subjects"
    const val PYQS = "pyqs"
    const val OFFICIAL_SYLLABUS = "syllabus"
    const val PRACTICAL = "practical"
    const val LEGEND = "legend"
    const val NOTES_ARCHIVE = "notes"
    const val PROFILE_EDIT = "profile/edit"
    const val USERS = "users"
    const val PROGRESS = "progress"
    const val BOOKMARKS = "bookmarks"
    const val REPORT_CARD = "report-card"
    const val CREDITS = "credits"
    const val ACHIEVEMENTS = "achievements"
    const val NOTICE = "notice"
    const val JOURNAL = "journal"
    const val LAB = "lab"
    const val LAB_TOPIC = "lab/{id}"
    const val AD_P_TABLE = "ad-p-table"
    const val PERIODIC_TABLE = "periodic-table"
    const val FORMULAS = "formulas"
    const val THEOREMS = "theorems"
    const val DERIVATIONS = "derivations"
    const val GRAPHS = "graphs"
    const val SCIENCE_GRAPH_BANK = "science-graph-bank"
    const val MINDMAP = "mindmap/{scope}"
    const val RESOURCES = "resources"
    const val RESOURCES_TOPIC = "resources/{slug}"
    const val CHAT_MODE = "chat/{mode}"
    const val AI_TOOLS = "ai"
    const val AI_MATH = "ai/math"
    const val AI_DEEP_DIVE = "ai/deep-dive"
    const val AI_DIAGRAMS = "ai/diagrams"
    const val AI_TUTOR_CONSOLE = "ai/tutor"
    const val AI_SEARCH = "ai/search"
    const val AI_WORKSPACE = "ai/workspace"
    const val AI_SUBJECTS = "ai/subjects"
    const val AI_HISTORY = "ai/history"
    const val AI_QUIZ = "ai-quiz"
    const val AI_QUIZ_HISTORY = "ai-quiz/history"
    const val PRACTICE_HISTORY = "practice/history"
    const val QUIZ_BANK = "quiz-bank"
    const val EXAM_COUNTDOWN = "exam-countdown"
    const val EXAM_TRACK = "exam/{track}"
    const val KNOWLEDGE = "knowledge"
    const val KNOWLEDGE_TOPIC = "knowledge/{topic}"
    const val LESSONS = "lessons"
    const val LOKSEWA = "loksewa"
    const val LOKSEWA_TOPIC = "loksewa/{topic}"
    const val WORLD_KNOWLEDGE = "world-knowledge"
    const val WORLD_KNOWLEDGE_TOPIC = "world-knowledge/{topic}"
    const val PDFS = "pdfs"

    /** Helper for navigating to a concrete study unit. */
    fun studyUnit(unitId: String) = "study/$unitId"

    /** Helper for navigating to a concrete quiz. */
    fun quiz(quizId: String) = "quiz/$quizId"
}

/**
 * Parity registry — THE machine-readable map from website sections to native
 * destinations. Parsed by scripts/ci/native-parity-check.mjs (parity plan
 * Appendix A); owned by Agent 1 (parity plan §0.2).
 *
 * Three disjoint lists:
 *  • [live]        web href → already-real native route (explicit composable).
 *  • [stubs]       web href → day-1 placeholder route; Worker 4 promotes by
 *                  moving the entry to [live] + writing the real screen.
 *  • [exceptions]  documented web-only pages (parity plan §1: owner console,
 *                  blog authoring, marketing/legal edge pages).
 * A website section in NONE of the three fails `native-parity-check`.
 */
object WebParity {
    data class Stub(val web: String, val route: String, val title: String)

    /** Website sections already native-live (verified by the parity script). */
    val live: Map<String, String> = mapOf(
        "/home" to Routes.HOME,
        "/community" to Routes.COMMUNITY,
        "/ask" to Routes.AI_TUTOR,
        "/chat" to Routes.AI_TUTOR, // same Veer chat surface
        "/ai/community" to Routes.COMMUNITY,
        "/search" to Routes.SEARCH,
        "/practice" to Routes.PRACTICE,
        "/profile" to Routes.PROFILE,
        "/settings" to Routes.SETTINGS,
        "/notifications" to Routes.NOTIFICATIONS,
        "/syllabus/additions" to Routes.LEARN, // plan §2: "Syllabus by Year → learn (already live)"
        // Wave 1 — device-local goals and the matching website journal placeholder
        "/onboarding" to Routes.ONBOARDING,
        "/goals" to Routes.GOALS,
        "/schedule" to Routes.SCHEDULE,
        "/journal" to Routes.JOURNAL,
        // Wave 2 — Labs & interactives (6)
        "/lab" to Routes.LAB,
        "/lab/3d" to Routes.LAB_TOPIC,
        "/lab/bio-3d-organelles" to Routes.LAB_TOPIC,
        "/lab/theory" to Routes.LAB_TOPIC,
        "/ad-p-table" to Routes.AD_P_TABLE,
        "/periodic-table" to Routes.PERIODIC_TABLE,
        // Wave 2 — General-knowledge banks (8)
        "/loksewa" to Routes.LOKSEWA,
        "/loksewa/geography-of-nepal" to Routes.LOKSEWA_TOPIC,
        "/loksewa/history" to Routes.LOKSEWA_TOPIC,
        "/loksewa/environment" to Routes.LOKSEWA_TOPIC,
        "/world-knowledge" to Routes.WORLD_KNOWLEDGE,
        "/world-knowledge/general-knowledge" to Routes.WORLD_KNOWLEDGE_TOPIC,
        "/world-knowledge/current-affairs" to Routes.WORLD_KNOWLEDGE_TOPIC,
        "/world-knowledge/global-topics" to Routes.WORLD_KNOWLEDGE_TOPIC,
        // Wave 2 — News & thin surfaces (9)
        "/announcements" to Routes.ANNOUNCEMENTS,
        "/changelog" to Routes.CHANGELOG,
        "/notice" to Routes.NOTICE,
        "/exam-countdown" to Routes.EXAM_COUNTDOWN,
        "/referrals" to Routes.REFERRALS,
        "/site-index" to Routes.SITE_INDEX,
        "/levels" to Routes.LEVELS,
        "/feedback" to Routes.FEEDBACK,
        "/status" to Routes.STATUS,
    )

    /** Remaining website sections — honest "Coming to native" placeholders. */
    val stubs: List<Stub> = listOf(
        // P2 personal & progress
        Stub("/dashboard", Routes.DASHBOARD, "Dashboard"),
        Stub("/my-notes", Routes.MY_NOTES, "My Notes"),
        Stub("/streaks", Routes.STREAKS, "Streaks and Badges"),
        Stub("/leaderboard", Routes.LEADERBOARD, "Leaderboard"),
        Stub("/certificates", Routes.CERTIFICATES, "Certificates"),
        Stub("/progress", Routes.PROGRESS, "My Progress"),
        Stub("/bookmarks", Routes.BOOKMARKS, "Saved Bookmarks"),
        Stub("/report-card", Routes.REPORT_CARD, "Report Card"),
        Stub("/achievements", Routes.ACHIEVEMENTS, "Achievements"),
        // P3 study tools
        Stub("/planner", Routes.PLANNER, "Weekly Planner"),
        Stub("/srs", Routes.SRS, "Spaced Repetition"),
        Stub("/mock-exams", Routes.MOCK_EXAMS, "Mock Exams"),
        Stub("/analytics", Routes.ANALYTICS, "Analytics"),
        Stub("/mindmap", Routes.MINDMAP, "Visual Mindmaps"),
        // P1 content surfaces
        Stub("/class-11-notes", Routes.CLASS_HUB, "Class Hub"),
        Stub("/class-12-notes", Routes.CLASS_HUB, "Class Hub"),
        Stub("/class-11-notes/physics", Routes.CLASS_HUB, "Physics (Class 11)"),
        Stub("/class-11-notes/physics/theory", Routes.CLASS_THEORY, "Physics Theory (11)"),
        Stub("/class-11-notes/chemistry", Routes.CLASS_HUB, "Chemistry (Class 11)"),
        Stub("/class-11-notes/chemistry/theory", Routes.CLASS_THEORY, "Chemistry Theory (11)"),
        Stub("/class-11-notes/biology", Routes.CLASS_HUB, "Biology (Class 11)"),
        Stub("/class-11-notes/biology/theory", Routes.CLASS_THEORY, "Biology Theory (11)"),
        Stub("/class-11-notes/mathematics", Routes.CLASS_HUB, "Mathematics (Class 11)"),
        Stub("/class-11-notes/mathematics/theory", Routes.CLASS_THEORY, "Mathematics Theory (11)"),
        Stub("/class-11-notes/english", Routes.CLASS_HUB, "English (Class 11)"),
        Stub("/class-11-notes/english/theory", Routes.CLASS_THEORY, "English Theory (11)"),
        Stub("/class-11-notes/nepali", Routes.CLASS_HUB, "Nepali (Class 11)"),
        Stub("/class-11-notes/nepali/theory", Routes.CLASS_THEORY, "Nepali Theory (11)"),
        Stub("/class-12-notes/physics", Routes.CLASS_HUB, "Physics (Class 12)"),
        Stub("/class-12-notes/physics/theory", Routes.CLASS_THEORY, "Physics Theory (12)"),
        Stub("/class-12-notes/chemistry", Routes.CLASS_HUB, "Chemistry (Class 12)"),
        Stub("/class-12-notes/chemistry/theory", Routes.CLASS_THEORY, "Chemistry Theory (12)"),
        Stub("/class-12-notes/biology", Routes.CLASS_HUB, "Biology (Class 12)"),
        Stub("/class-12-notes/biology/theory", Routes.CLASS_THEORY, "Biology Theory (12)"),
        Stub("/class-12-notes/mathematics", Routes.CLASS_HUB, "Mathematics (Class 12)"),
        Stub("/class-12-notes/mathematics/theory", Routes.CLASS_THEORY, "Mathematics Theory (12)"),
        Stub("/class-12-notes/english", Routes.CLASS_HUB, "English (Class 12)"),
        Stub("/class-12-notes/english/theory", Routes.CLASS_THEORY, "English Theory (12)"),
        Stub("/class-12-notes/nepali", Routes.CLASS_HUB, "Nepali (Class 12)"),
        Stub("/class-12-notes/nepali/theory", Routes.CLASS_THEORY, "Nepali Theory (12)"),
        Stub("/subjects", Routes.SUBJECTS, "Subjects"),
        Stub("/pyqs", Routes.PYQS, "Past Year Questions"),
        Stub("/syllabus", Routes.OFFICIAL_SYLLABUS, "Official Syllabus"),
        Stub("/practical", Routes.PRACTICAL, "Practical Manuals"),
        Stub("/legend", Routes.LEGEND, "Concept Legends"),
        Stub("/notes", Routes.NOTES_ARCHIVE, "Notes Archive"),
        Stub("/exams", Routes.EXAMS, "Exam Hub"),
        Stub("/revision", Routes.REVISION, "Quick Revision"),
        // Stem & reference
        Stub("/formulas", Routes.FORMULAS, "Formula Sheets"),
        Stub("/theorems", Routes.THEOREMS, "Theorems & Proofs"),
        Stub("/derivations", Routes.DERIVATIONS, "Formula Derivations"),
        Stub("/graphs", Routes.GRAPHS, "Science Graph Bank"),
        Stub("/science-graph-bank", Routes.SCIENCE_GRAPH_BANK, "Graph Bank (Legacy)"),
        Stub("/resources", Routes.RESOURCES, "Resource Vault"),
        Stub("/resources/physics-xi", Routes.RESOURCES_TOPIC, "Physics XI Academic"),
        Stub("/resources/mathematics-xi", Routes.RESOURCES_TOPIC, "Mathematics XI Solutions"),
        // AI & practice tools
        Stub("/chat/nepali", Routes.CHAT_MODE, "Nepali Assistant"),
        Stub("/chat/grammar", Routes.CHAT_MODE, "Grammar Console"),
        Stub("/ai", Routes.AI_TOOLS, "AI Tools"),
        Stub("/ai/math", Routes.AI_MATH, "Veer Math Solver"),
        Stub("/ai/deep-dive", Routes.AI_DEEP_DIVE, "Deep Concept Studio"),
        Stub("/ai/diagrams", Routes.AI_DIAGRAMS, "Diagram Hub"),
        Stub("/ai/tutor", Routes.AI_TUTOR_CONSOLE, "Veer Tutor Console"),
        Stub("/ai/search", Routes.AI_SEARCH, "Veer Curriculum Search"),
        Stub("/ai/workspace", Routes.AI_WORKSPACE, "AI Workspace"),
        Stub("/ai/subjects", Routes.AI_SUBJECTS, "Subject Classrooms"),
        Stub("/ai/history", Routes.AI_HISTORY, "AI History"),
        Stub("/ai-quiz", Routes.AI_QUIZ, "Adaptive Veer Quiz"),
        Stub("/ai-quiz/history", Routes.AI_QUIZ_HISTORY, "Quiz History"),
        Stub("/practice/history", Routes.PRACTICE_HISTORY, "Practice History"),
        Stub("/quiz", Routes.QUIZ_BANK, "Practice Quiz Bank"),
        Stub("/exams/neb", Routes.EXAM_TRACK, "NEB Board Exam"),
        Stub("/exams/cee", Routes.EXAM_TRACK, "CEE Medical Entrance"),
        Stub("/exams/ioe", Routes.EXAM_TRACK, "IOE Engineering Entrance"),
        // Extended resources
        Stub("/knowledge", Routes.KNOWLEDGE, "Knowledge Hub"),
        Stub("/knowledge/pro", Routes.KNOWLEDGE_TOPIC, "Pro Knowledge Hub"),
        Stub("/knowledge/numerical-physics", Routes.KNOWLEDGE_TOPIC, "Numerical Physics"),
        Stub("/knowledge/numerical-chemistry", Routes.KNOWLEDGE_TOPIC, "Numerical Chemistry"),
        Stub("/knowledge/biology-diagrams", Routes.KNOWLEDGE_TOPIC, "Biology Diagrams"),
        Stub("/knowledge/grammar", Routes.KNOWLEDGE_TOPIC, "English Grammar Hub"),
        Stub("/knowledge/writing", Routes.KNOWLEDGE_TOPIC, "English Writing Hub"),
        Stub("/knowledge/byakaran", Routes.KNOWLEDGE_TOPIC, "Nepali Byakaran"),
        Stub("/knowledge/analytical-geometry", Routes.KNOWLEDGE_TOPIC, "Analytical Geometry"),
        Stub("/lessons", Routes.LESSONS, "Lessons Library"),
        Stub("/pdfs", Routes.PDFS, "PDF Library"),
        // P5 account & community
        Stub("/profile/edit", Routes.PROFILE_EDIT, "Edit Profile"),
        Stub("/users", Routes.USERS, "Find Students"),
        Stub("/downloads", Routes.DOWNLOADS, "Offline Study"),
        Stub("/billing", Routes.BILLING, "Billing"),
        Stub("/credits", Routes.CREDITS, "Credits"),
    )

    /**
     * Documented web-only pages beyond the section-level exceptions (the
     * whole "public" and "owner" nav sections, and ownerOnly items, are
     * exceptions by plan §1). Each entry needs a one-line justification.
     */
    val exceptions: Set<String> = setOf(
        // Owner-tier tool (minLevel "owner") — Diagram Studio stays web-only.
        exception("/mind-studio"),
    )

    private fun exception(href: String) = href
}

/** App links handled by the shell (see AndroidManifest.xml intent filters). */
object DeepLinks {
    const val CUSTOM = "rn://app"
    const val WEB_ROOT = "https://harindrasah.com.np"
}

/**
 * One-shot navigation channel for intents that arrive while the app is
 * running or cold-starting: [MainActivity] parses FCM payload extras
 * (`navigateTo`, `roomId`) and posts the destination route here; the shell
 * consumes it exactly once after the NavHost is up.
 */
object PendingRoute {
    val route = kotlinx.coroutines.flow.MutableStateFlow<String?>(null)

    fun post(target: String) {
        route.value = target
    }

    fun consume() {
        route.value = null
    }
}

private data class TopDestination(val route: String, val label: String, val icon: androidx.compose.ui.graphics.vector.ImageVector)

/** Core tabs: Home, Learn (Syllabus), Practice, Veer AI, Community, Profile. */
private val topDestinations = listOf(
    TopDestination(Routes.HOME, "Home", Icons.Filled.Home),
    TopDestination(Routes.LEARN, "Learn", Icons.Filled.MenuBook),
    TopDestination(Routes.PRACTICE, "Practice", Icons.Filled.Quiz),
    TopDestination(Routes.AI_TUTOR, "Veer", Icons.Filled.AutoAwesome),
    TopDestination(Routes.COMMUNITY, "Community", Icons.Filled.Forum),
    TopDestination(Routes.PROFILE, "Profile", Icons.Filled.Person),
)

@Composable
fun RnNavHost() {
    val navController = rememberNavController()
    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = backStackEntry?.destination

    // FCM deep links (RnFirebaseMessagingService puts `navigateTo`/`roomId`
    // extras on the launch intent): navigate once, exactly.
    val pendingRoute by PendingRoute.route.collectAsState()
    LaunchedEffect(pendingRoute) {
        pendingRoute?.let { target ->
            navController.navigate(target) { launchSingleTop = true }
            PendingRoute.consume()
        }
    }

    val onTopLevelTab = topDestinations.any { dest ->
        currentDestination?.hierarchy?.any { it.route == dest.route } == true
    }

    Scaffold(
        bottomBar = {
            if (onTopLevelTab) {
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
            ) {
                HomeScreen(
                    onOpenSearch = { navController.navigate(Routes.SEARCH) },
                    onOpenUnit = { unitId -> navController.navigate(Routes.studyUnit(unitId)) },
                    onOpenLearn = { navController.navigate(Routes.LEARN) },
                    onOpenPractice = { navController.navigate(Routes.PRACTICE) },
                    onOpenAiTutor = { navController.navigate(Routes.AI_TUTOR) },
                    onOpenCommunity = { navController.navigate(Routes.COMMUNITY) },
                    onOpenAuth = { navController.navigate(Routes.AUTH) },
                )
            }
            composable(Routes.SETTINGS) {
                SettingsScreen(
                    onOpenAuth = { navController.navigate(Routes.AUTH) },
                    onOpenLogin = { navController.navigate(Routes.AUTH_LOGIN) },
                    onOpenNotifications = { navController.navigate(Routes.NOTIFICATIONS) },
                )
            }

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
            composable(Routes.PRACTICE) {
                PracticeHubScreen(
                    onStartQuiz = { quizId -> navController.navigate(Routes.quiz(quizId)) },
                )
            }
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
                ProfileScreen(
                    onOpenNotifications = { navController.navigate(Routes.NOTIFICATIONS) },
                    onOpenAuth = { navController.navigate(Routes.AUTH) },
                )
            }
            composable(Routes.NOTIFICATIONS) {
                NotificationsScreen(
                    onBack = { navController.popBackStack() },
                    onOpenAuth = { navController.navigate(Routes.AUTH) },
                )
            }
            composable(
                route = Routes.ONBOARDING,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/onboarding" }),
            ) {
                OnboardingScreen(onSaved = { navController.navigate(Routes.HOME) { launchSingleTop = true } })
            }
            composable(
                route = Routes.GOALS,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/goals" }),
            ) {
                GoalsScreen(onOpenOnboarding = { navController.navigate(Routes.ONBOARDING) })
            }
            composable(
                route = Routes.SCHEDULE,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/schedule" }),
            ) {
                ScheduleScreen(
                    onOpenGoals = { navController.navigate(Routes.GOALS) },
                    onOpenPlanner = { navController.navigate(Routes.PLANNER) },
                )
            }
            composable(
                route = Routes.JOURNAL,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/journal" }),
            ) {
                JournalScreen(onBackToStudyDesk = { navController.navigate(Routes.HOME) { launchSingleTop = true } })
            }

            // ── Wave 2: Labs, GK banks & thin surfaces ──────────────────────
            composable(
                route = Routes.LAB,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/lab" }),
            ) {
                LabHubScreen(onOpenLab = { id -> navController.navigate("lab/$id") })
            }
            composable(
                route = Routes.LAB_TOPIC,
                arguments = listOf(navArgument("id") { type = NavType.StringType }),
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/lab/{id}" }),
            ) { entry ->
                LabDetailScreen(labId = entry.arguments?.getString("id").orEmpty())
            }
            composable(
                route = Routes.AD_P_TABLE,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/ad-p-table" }),
            ) { PeriodicTableScreen(isAdvanced = true) }
            composable(
                route = Routes.PERIODIC_TABLE,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/periodic-table" }),
            ) { PeriodicTableScreen(isAdvanced = false) }

            composable(
                route = Routes.LOKSEWA,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/loksewa" }),
            ) {
                KnowledgeHubScreen(
                    kind = "loksewa",
                    title = "Loksewa GK",
                    subtitle = "Prepare for Loksewa with curated materials and practice sets.",
                    onOpenTopic = { slug -> navController.navigate("loksewa/$slug") },
                )
            }
            composable(
                route = Routes.LOKSEWA_TOPIC,
                arguments = listOf(navArgument("topic") { type = NavType.StringType }),
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/loksewa/{topic}" }),
            ) { entry ->
                KnowledgeTopicScreen(
                    kind = "loksewa",
                    slug = entry.arguments?.getString("topic").orEmpty(),
                )
            }
            composable(
                route = Routes.WORLD_KNOWLEDGE,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/world-knowledge" }),
            ) {
                KnowledgeHubScreen(
                    kind = "world-knowledge",
                    title = "World Knowledge",
                    subtitle = "Explore general knowledge, current affairs, and global topics.",
                    onOpenTopic = { slug -> navController.navigate("world-knowledge/$slug") },
                )
            }
            composable(
                route = Routes.WORLD_KNOWLEDGE_TOPIC,
                arguments = listOf(navArgument("topic") { type = NavType.StringType }),
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/world-knowledge/{topic}" }),
            ) { entry ->
                KnowledgeTopicScreen(
                    kind = "world-knowledge",
                    slug = entry.arguments?.getString("topic").orEmpty(),
                )
            }

            composable(
                route = Routes.ANNOUNCEMENTS,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/announcements" }),
            ) { AnnouncementsScreen() }
            composable(
                route = Routes.CHANGELOG,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/changelog" }),
            ) { ChangelogScreen() }
            composable(
                route = Routes.NOTICE,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/notice" }),
            ) { NoticeScreen() }
            composable(
                route = Routes.EXAM_COUNTDOWN,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/exam-countdown" }),
            ) { ExamCountdownScreen() }
            composable(
                route = Routes.REFERRALS,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/referrals" }),
            ) { ReferralsScreen() }
            composable(
                route = Routes.SITE_INDEX,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/site-index" }),
            ) {
                SiteIndexScreen(onNavigatePath = { href ->
                    val route = WebParity.live[href]
                    if (route != null) navController.navigate(route)
                })
            }
            composable(
                route = Routes.LEVELS,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/levels" }),
            ) { LevelsScreen() }
            composable(
                route = Routes.FEEDBACK,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/feedback" }),
            ) { FeedbackScreen() }
            composable(
                route = Routes.STATUS,
                deepLinks = listOf(navDeepLink { uriPattern = "${DeepLinks.WEB_ROOT}/status" }),
            ) { StatusScreen() }

            // ── Parity stubs (Agent 1, parity plan B0) ──────────────────────
            // One destination per remaining website section, registered from
            // the WebParity registry so native-parity-check.mjs can verify the
            // ledger. Worker 4 promotes a stub by writing the real screen and
            // moving its WebSection entry to WebParity.live + an explicit
            // composable above; Worker 1 then wires deep links for it.
            WebParity.stubs.forEach { stub ->
                val argNames = Regex("\\{(\\w+)\\}").findAll(stub.route).map { it.groupValues[1] }.toList()
                composable(
                    route = stub.route,
                    arguments = argNames.map { name -> navArgument(name) { type = NavType.StringType } },
                ) {
                    // RQ-11: the ONE plan-mandated placeholder (parity plan §0.6) —
                    // replaces the older StubScreen (deleted); centered like the
                    // pre-parity stubs so the honest card doesn't hug the top edge.
                    Surface(modifier = Modifier.fillMaxSize()) {
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .padding(24.dp),
                            contentAlignment = Alignment.Center,
                        ) {
                            ComingToNative(sectionTitle = stub.title)
                        }
                    }
                }
            }
        }
    }
}
