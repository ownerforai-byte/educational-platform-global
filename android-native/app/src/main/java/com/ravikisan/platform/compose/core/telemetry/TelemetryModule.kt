package com.ravikisan.platform.compose.core.telemetry

import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class TelemetryModule {

    @Binds
    @Singleton
    abstract fun bindTelemetry(impl: CrashlyticsTelemetry): Telemetry
}
