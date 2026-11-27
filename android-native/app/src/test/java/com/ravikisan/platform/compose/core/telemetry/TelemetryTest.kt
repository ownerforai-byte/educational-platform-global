package com.ravikisan.platform.compose.core.telemetry

import org.junit.Test

class TelemetryTest {

    private val telemetry: Telemetry = NoOpTelemetry

    @Test
    fun noOpTelemetry_acceptsAllCallsWithoutThrowing() {
        telemetry.recordNonFatal(IllegalStateException("boom"), "test")
        telemetry.log("message")
        telemetry.setUserId("user-1")
        telemetry.setUserId(null)
        telemetry.logEvent("event")
        telemetry.logEvent("event", mapOf("key" to "value"))
    }
}
