import java.util.Properties

/*
 * android-native :app — Kotlin + Jetpack Compose single-activity host.
 *
 * Dev applicationId is com.ravikisan.platform.compose so it installs side-by-side
 * with the legacy Play app (com.ravikisan.platform). At Phase 8 promotion the
 * production applicationId switches to com.ravikisan.platform with a monotonic
 * versionCode on the existing Play listing.
 */

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
    id("org.jetbrains.kotlin.plugin.serialization")
    id("com.google.devtools.ksp")
    id("com.google.dagger.hilt.android")
    // Applied only when a real google-services.json is present (same pattern as legacy).
    // Generate via: firebase apps:sdkconfig ANDROID <appId> > app/google-services.json
}

val googleServicesJson = file("google-services.json")
if (googleServicesJson.exists()) {
    apply(plugin = "com.google.gms.google-services")
} else {
    logger.warn("app/google-services.json missing — FCM/config disabled until generated via Firebase CLI.")
}

android {
    namespace = "com.ravikisan.platform.compose"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.ravikisan.platform"
        minSdk = 30
        targetSdk = 36
        versionCode = 20
        versionName = "2.0.0"
        buildConfigField("String", "API_BASE", "\"https://harindrasah.com.np\"")
        resourceConfigurations += listOf("en", "ne")
    }

    val keyPropsFile = rootProject.file("key.properties")
    if (keyPropsFile.exists()) {
        val kp = Properties().apply { keyPropsFile.inputStream().use { load(it) } }
        signingConfigs {
            create("release") {
                storeFile = rootProject.file(kp.getProperty("storeFile"))
                storePassword = kp.getProperty("storePassword")
                keyAlias = kp.getProperty("keyAlias")
                keyPassword = kp.getProperty("keyPassword")
            }
        }
    } else {
        logger.warn("key.properties missing — release bundle will be unsigned until configured.")
    }

    buildTypes {
        debug {
            val localProps = Properties().apply {
                val f = rootProject.file("local.properties")
                if (f.exists()) f.inputStream().use { load(it) }
            }
            val fpnvTestToken = localProps.getProperty("FPNV_TEST_TOKEN")
                ?: System.getenv("FPNV_TEST_TOKEN")
                ?: ""
            buildConfigField("String", "FPNV_TEST_TOKEN", "\"$fpnvTestToken\"")
        }
        release {
            buildConfigField("String", "FPNV_TEST_TOKEN", "\"\"")
            signingConfigs.findByName("release")?.let { signingConfig = it }
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    packaging {
        resources.excludes += "/META-INF/{AL2.0,LGPL2.1}"
    }
}

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2025.01.00")
    implementation(composeBom)

    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")

    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.8.5")

    // DI (plan §4 stack default)
    implementation("com.google.dagger:hilt-android:2.55")
    ksp("com.google.dagger:hilt-android-compiler:2.55")
    implementation("androidx.hilt:hilt-navigation-compose:1.2.0")

    // Agent 3 data layer (integration batch A — Supervisor §7 / STATUS §8)
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-kotlinx-serialization:2.11.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.3")
    implementation("androidx.room:room-runtime:2.7.1")
    implementation("androidx.room:room-ktx:2.7.1")
    ksp("androidx.room:room-compiler:2.7.1")
    implementation("androidx.work:work-runtime-ktx:2.10.0")
    implementation("androidx.hilt:hilt-work:1.2.0")
    ksp("androidx.hilt:hilt-compiler:1.2.0")
    implementation("androidx.security:security-crypto:1.1.0-alpha06")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.7")
    implementation(platform("com.google.firebase:firebase-bom:33.7.0"))
    implementation("com.google.firebase:firebase-messaging")
    implementation("com.google.firebase:firebase-auth")
    implementation("com.google.firebase:firebase-firestore")
    // NOTE (Agent 5 security review): BOM 35.2.0 + firebase-pnv from a later
    // session were REVERTED. firebase-pnv is not a published Google artifact
    // (supply-chain risk); BOM 35.2.0 pulls firebase-auth 25.0.0 compiled with
    // Kotlin 2.4 metadata, incompatible with this project's Kotlin 2.1.0.
    // firebase-perf removed too — unused telemetry SDK; re-add with the perf
    // plugin when performance monitoring is actually wired.
    implementation("com.google.android.gms:play-services-auth:21.3.0")

    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    testImplementation("junit:junit:4.13.2")
    androidTestImplementation(composeBom)
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}
