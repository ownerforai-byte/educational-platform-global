/*
 * android-native — Ravikisan Platform native client (Kotlin + Jetpack Compose).
 *
 * Parallel-delivery mandate (docs/guides/android-native-compose-migration-plan.md §1.1):
 * this project is NEW. It must never modify or replace android-twa/android.
 */

pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "RavikisanNative"
include(":app")
