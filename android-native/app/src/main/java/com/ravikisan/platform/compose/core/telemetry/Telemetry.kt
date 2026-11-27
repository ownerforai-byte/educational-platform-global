package com.ravikisan.platform.compose.core.telemetry

import android.content.Context
import android.os.Bundle
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.crashlytics.FirebaseCrashlytics
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject

/**
 * App-level telemetry facade (crash reporting + analytics events).
 *
 * Implementations must never throw: a misconfigured or missing Firebase setup
 * (e.g. no google-services.json) must not crash the app.
 */
interface Telemetry {
    fun recordNonFatal(throwable: Throwable, context: String)
    fun log(message: String)
    fun setUserId(id: String?)
    fun logEvent(name: String, params: Map<String, String> = emptyMap())
}

/** Firebase Crashlytics + Analytics backed implementation. Every SDK call is guarded. */
class CrashlyticsTelemetry @Inject constructor(
    @ApplicationContext private val appContext: Context,
) : Telemetry {

    override fun recordNonFatal(throwable: Throwable, context: String) {
        runCatching {
            val crashlytics = FirebaseCrashlytics.getInstance()
            crashlytics.setCustomKey("error_context", context)
            crashlytics.recordException(throwable)
        }
    }

    override fun log(message: String) {
        runCatching { FirebaseCrashlytics.getInstance().log(message) }
    }

    override fun setUserId(id: String?) {
        runCatching {
            FirebaseCrashlytics.getInstance().setUserId(id.orEmpty())
            FirebaseAnalytics.getInstance(appContext).setUserId(id)
        }
    }

    override fun logEvent(name: String, params: Map<String, String>) {
        runCatching {
            val bundle = Bundle().apply {
                params.forEach { (key, value) -> putString(key, value) }
            }
            FirebaseAnalytics.getInstance(appContext).logEvent(name, bundle)
        }
    }
}

/** No-op implementation for unit tests and previews. */
object NoOpTelemetry : Telemetry {
    override fun recordNonFatal(throwable: Throwable, context: String) = Unit
    override fun log(message: String) = Unit
    override fun setUserId(id: String?) = Unit
    override fun logEvent(name: String, params: Map<String, String>) = Unit
}
