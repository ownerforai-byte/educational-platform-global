package com.ravikisan.platform.compose.di

import android.content.Context
import com.ravikisan.platform.compose.BuildConfig
import com.ravikisan.platform.compose.core.SecurityContract
import com.ravikisan.platform.compose.core.network.AttestationInterceptor
import com.ravikisan.platform.compose.core.network.RedirectGuardInterceptor
import com.ravikisan.platform.compose.core.network.ResponseCapInterceptor
import com.ravikisan.platform.compose.core.stream.OkHttpSseClient
import com.ravikisan.platform.compose.core.stream.SseClient
import com.ravikisan.platform.compose.data.api.AuthRepository
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.db.AppDatabase
import com.ravikisan.platform.compose.data.repository.CommunityRepository
import com.ravikisan.platform.compose.data.repository.PracticeRepository
import com.ravikisan.platform.compose.data.repository.RoomStudyCache
import com.ravikisan.platform.compose.data.repository.StudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.ui.screens.search.SearchIndexSource
import com.ravikisan.platform.compose.ui.screens.search.SyllabusSearchIndexSource
import com.ravikisan.platform.compose.data.session.SessionManager
import com.ravikisan.platform.compose.data.session.SessionStore
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

/**
 * Client-infrastructure wiring (Agent 3). Singletons only — no UI scoping.
 */
@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideJson(): Json = Json {
        ignoreUnknownKeys = true
        explicitNulls = false
    }

    @Provides
    @Singleton
    fun provideOkHttpClient(@ApplicationContext context: Context): OkHttpClient {
        val builder = OkHttpClient.Builder()
            .connectTimeout(20, TimeUnit.SECONDS)
            .readTimeout(20, TimeUnit.SECONDS)
            .writeTimeout(20, TimeUnit.SECONDS)
            .followRedirects(false) // RedirectGuardInterceptor decides which redirects are safe
            .followSslRedirects(false)
            .addInterceptor(AttestationInterceptor(context, BuildConfig.VERSION_NAME))
            .addInterceptor(RedirectGuardInterceptor())
            .addInterceptor(ResponseCapInterceptor())

        if (BuildConfig.DEBUG) {
            builder.addInterceptor(HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BASIC
            })
        }
        return builder.build()
    }

    @Provides
    @Singleton
    fun provideRetrofit(client: OkHttpClient, json: Json): Retrofit = Retrofit.Builder()
        .baseUrl(SecurityContract.API_ORIGIN + "/")
        .client(client)
        .addConverterFactory(json.asConverterFactory("application/json; charset=utf-8".toMediaType()))
        .build()

    @Provides
    @Singleton
    fun provideRnApi(retrofit: Retrofit): RnApi = retrofit.create(RnApi::class.java)

    @Provides
    @Singleton
    fun provideSessionManager(@ApplicationContext context: Context): SessionManager =
        SessionManager(context)

    @Provides
    @Singleton
    fun provideSessionStore(sessionManager: SessionManager): SessionStore = sessionManager

    @Provides
    @Singleton
    fun provideAuthRepository(api: RnApi, session: SessionManager): AuthRepository =
        AuthRepository(api, session)

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase =
        androidx.room.Room.databaseBuilder(context, AppDatabase::class.java, AppDatabase.NAME)
            .fallbackToDestructiveMigration()
            .build()

    @Provides
    @Singleton
    fun provideStudyCache(database: AppDatabase): StudyCache =
        RoomStudyCache(database.cache())

    @Provides
    @Singleton
    fun provideSyllabusRepository(api: RnApi, cache: StudyCache): SyllabusRepository =
        SyllabusRepository(api, cache)

    @Provides
    @Singleton
    fun providePracticeRepository(api: RnApi, cache: StudyCache): PracticeRepository =
        PracticeRepository(api, cache)

    @Provides
    @Singleton
    fun provideCommunityRepository(api: RnApi, cache: StudyCache): CommunityRepository =
        CommunityRepository(api, cache)

    @Provides
    @Singleton
    fun provideSearchIndexSource(repository: SyllabusRepository): SearchIndexSource =
        SyllabusSearchIndexSource(repository)

    @Provides
    @Singleton
    fun provideSseClient(client: OkHttpClient): SseClient =
        OkHttpSseClient(client, SecurityContract.API_ORIGIN)
}
