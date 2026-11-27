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
import com.ravikisan.platform.compose.data.db.FieldCipher
import com.ravikisan.platform.compose.data.repository.CommunityRepository
import com.ravikisan.platform.compose.data.repository.PracticeRepository
import com.ravikisan.platform.compose.data.repository.PersonalStoreRepository
import com.ravikisan.platform.compose.data.repository.RecentUnitsStore
import com.ravikisan.platform.compose.data.repository.RoomStudyCache
import com.ravikisan.platform.compose.data.repository.StudyCache
import com.ravikisan.platform.compose.data.repository.SyllabusRepository
import com.ravikisan.platform.compose.data.repository.Wave2Repository
import com.ravikisan.platform.compose.ui.screens.srs.local.PendingBindingCardSource
import com.ravikisan.platform.compose.ui.screens.srs.local.SrsCardSource
import com.ravikisan.platform.compose.ui.screens.studyplan.local.JourneySource
import com.ravikisan.platform.compose.ui.screens.studyplan.local.PendingBindingJourneySource
import com.ravikisan.platform.compose.data.fcm.FcmRegistrar
import com.ravikisan.platform.compose.ui.screens.ai.ChatEventStream
import com.ravikisan.platform.compose.ui.screens.ai.SseChatStream
import com.ravikisan.platform.compose.data.repository.SearchIndexSource
import com.ravikisan.platform.compose.data.repository.SyllabusSearchIndexSource
import com.ravikisan.platform.compose.ui.screens.downloads.local.PendingBindingUnitPackSource
import com.ravikisan.platform.compose.ui.screens.downloads.local.UnitPackSource
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
            .addMigrations(AppDatabase.MIGRATION_1_2)
            .build()

    @Provides
    @Singleton
    fun provideStudyCache(database: AppDatabase): StudyCache =
        RoomStudyCache(database.cache())

    @Provides
    @Singleton
    fun provideFieldCipher(): FieldCipher = FieldCipher()

    @Provides
    @Singleton
    fun providePersonalStoreRepository(
        database: AppDatabase,
        cipher: FieldCipher,
    ): PersonalStoreRepository = PersonalStoreRepository(database.personalStore(), cipher)

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

    /** Veer chat: real SSE transport over `POST /api/ai` (auth-gated). */
    @Provides
    @Singleton
    fun provideChatEventStream(
        sseClient: SseClient,
        session: SessionStore,
        json: Json,
    ): ChatEventStream = SseChatStream(sseClient, session, json)

    @Provides
    @Singleton
    fun provideFcmRegistrar(
        @ApplicationContext context: Context,
        api: RnApi,
        session: SessionStore,
    ): FcmRegistrar = FcmRegistrar(context, api, session)

    @Provides
    @Singleton
    fun provideRecentUnitsStore(
        @ApplicationContext context: Context,
        json: Json,
    ): RecentUnitsStore = RecentUnitsStore(context, json)

    @Provides
    @Singleton
    fun provideWave2Repository(api: RnApi, cache: StudyCache, json: Json): Wave2Repository =
        Wave2Repository(api, cache, json)

    /**
     * Unit-pack source for the downloads screen. The subject-bank and
     * formula-unit endpoint families have no mobile routes yet, so production
     * binds the honest empty source — the screen shows the website's
     * "not indexed for this unit yet" state instead of inventing content.
     */
    @Provides
    @Singleton
    fun provideUnitPackSource(): UnitPackSource = PendingBindingUnitPackSource()

    @Provides
    @Singleton
    fun provideJourneySource(): JourneySource = PendingBindingJourneySource()

    @Provides
    @Singleton
    fun provideSrsCardSource(): SrsCardSource = PendingBindingCardSource()
}
