package com.ravikisan.platform.compose.data.api

import com.ravikisan.platform.compose.core.contract.AuthResponse
import com.ravikisan.platform.compose.core.contract.ExamDto
import com.ravikisan.platform.compose.core.contract.FcmRegistrationRequest
import com.ravikisan.platform.compose.core.contract.LoginRequest
import com.ravikisan.platform.compose.core.contract.MeResponse
import com.ravikisan.platform.compose.core.contract.MarkNotificationsReadRequest
import com.ravikisan.platform.compose.core.contract.MobileCommunityResponse
import com.ravikisan.platform.compose.core.contract.MobileHomeResponse
import com.ravikisan.platform.compose.core.contract.MobileNotesResponse
import com.ravikisan.platform.compose.core.contract.SocialNotificationsResponse
import com.ravikisan.platform.compose.core.contract.MobilePracticeResponse
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.core.contract.MobileUnitsResponse
import com.ravikisan.platform.compose.core.contract.RNoteResponse
import com.ravikisan.platform.compose.core.contract.SignupRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PATCH
import retrofit2.http.Path
import retrofit2.http.Query

/** Retrofit surface over the backend auth + mobile content contracts. */
interface RnApi {

    @POST("api/auth/login")
    suspend fun login(@Body body: LoginRequest): Response<AuthResponse>

    @POST("api/auth/signup")
    suspend fun signup(@Body body: SignupRequest): Response<AuthResponse>

    @GET("api/auth/me")
    suspend fun me(): Response<MeResponse>

    /** `GET /api/mobile/syllabus` — class → subject tree (mobile-v1, CDN-cached). */
    @GET("api/mobile/syllabus")
    suspend fun mobileSyllabus(): Response<MobileSyllabusResponse>

    /** `GET /api/mobile/units?subject=<slug>` — one subject's units in NEB order. */
    @GET("api/mobile/units")
    suspend fun mobileUnits(@Query("subject") subjectSlug: String): Response<MobileUnitsResponse>

    /**
     * `GET /api/mobile/units?subject=<slug>&class=<classSlug>` — class-scoped
     * variant of [mobileUnits] for subject slugs that exist in BOTH class
     * tracks (mathematics, english, nepali). The backend scopes the subject
     * row by class (additive Wave 1 batch B fix, response shape unchanged);
     * it accepts either `class-11` (class dir) or `class-11-notes` (track
     * slug). Default body keeps the shared JVM `Fakes.kt` compiling without
     * an edit; production goes through the Retrofit proxy.
     */
    @GET("api/mobile/units")
    suspend fun mobileUnitsScoped(
        @Query("subject") subjectSlug: String,
        @Query("class") classSlug: String,
    ): Response<MobileUnitsResponse> {
        throw UnsupportedOperationException("Retrofit proxy must implement mobileUnitsScoped")
    }

    /**
     * `GET /api/mobile/notes` — cursor-paginated r-notes catalog, filterable by
     * subject/chapter name. Echo `nextCursor` back verbatim; `null` = end of list.
     */
    @GET("api/mobile/notes")
    suspend fun mobileNotes(
        @Query("subject") subject: String? = null,
        @Query("chapter") chapter: String? = null,
        @Query("limit") limit: Int? = null,
        @Query("cursor") cursor: String? = null,
    ): Response<MobileNotesResponse>

    /** `GET /api/r-notes/:id` — full note content (HTML blocks, `<h1>` = section). */
    @GET("api/r-notes/{id}")
    suspend fun rNote(@Path("id") id: String): Response<RNoteResponse>

    /** `GET /api/mobile/practice` — exam catalog, cursor-paginated (mobile-v1). */
    @GET("api/mobile/practice")
    suspend fun mobilePractice(
        @Query("limit") limit: Int? = null,
        @Query("cursor") cursor: String? = null,
    ): Response<MobilePracticeResponse>

    /** `GET /api/practice/exams/:slug` — full exam with questions (existing route, reused). */
    @GET("api/practice/exams/{slug}")
    suspend fun practiceExam(@Path("slug") slug: String): Response<ExamDto>

    /** `GET /api/mobile/community` — public feed, cursor-paginated (mobile-v1, read-only). */
    @GET("api/mobile/community")
    suspend fun mobileCommunity(
        @Query("category") category: String? = null,
        @Query("limit") limit: Int? = null,
        @Query("cursor") cursor: String? = null,
    ): Response<MobileCommunityResponse>

    /** `GET /api/mobile/home` — cold-start bootstrap: live features + backing routes. */
    @GET("api/mobile/home")
    suspend fun mobileHome(): Response<MobileHomeResponse>

    /** `GET /api/notifications` — social notification feed (auth required). */
    @GET("api/notifications")
    suspend fun notifications(
        @Query("cursor") cursor: Long? = null,
        @Query("unread") unread: String? = null,
    ): Response<SocialNotificationsResponse>

    /** `PATCH /api/notifications/read` — mark all (or a list) as read. */
    @PATCH("api/notifications/read")
    suspend fun markNotificationsRead(@Body body: MarkNotificationsReadRequest): Response<Unit>

    @POST("api/access-requests/fcm")
    suspend fun registerFcmToken(@Body body: FcmRegistrationRequest): Response<Unit>

    @DELETE("api/access-requests/fcm")
    suspend fun unregisterFcmToken(): Response<Unit>

    // ── Wave 2: thin surfaces ───────────────────────────────────────────────

    @GET("api/mobile/announcements")
    suspend fun mobileAnnouncements(): Response<com.ravikisan.platform.compose.core.contract.AnnouncementsResponse>

    @GET("api/mobile/changelog")
    suspend fun mobileChangelog(): Response<com.ravikisan.platform.compose.core.contract.ChangelogResponse>

    @GET("api/mobile/notice")
    suspend fun mobileNotice(): Response<com.ravikisan.platform.compose.core.contract.NoticeResponse>

    @GET("api/mobile/exam-countdown")
    suspend fun mobileExamCountdown(): Response<com.ravikisan.platform.compose.core.contract.ExamCountdownResponse>

    @GET("api/mobile/feedback")
    suspend fun mobileFeedback(): Response<com.ravikisan.platform.compose.core.contract.FeedbackResponse>

    @GET("api/mobile/status")
    suspend fun mobileStatus(): Response<com.ravikisan.platform.compose.core.contract.PlatformStatusResponse>

    @GET("api/mobile/referrals")
    suspend fun mobileReferrals(): Response<com.ravikisan.platform.compose.core.contract.ReferralsResponse>

    @GET("api/mobile/site-index")
    suspend fun mobileSiteIndex(): Response<com.ravikisan.platform.compose.core.contract.SiteIndexResponse>

    @GET("api/mobile/levels")
    suspend fun mobileLevels(): Response<com.ravikisan.platform.compose.core.contract.LevelsResponse>

    // ── Wave 2: knowledge / GK banks ────────────────────────────────────────

    @GET("api/mobile/loksewa")
    suspend fun mobileLoksewa(): Response<com.ravikisan.platform.compose.core.contract.KnowledgeHubResponse>

    @GET("api/mobile/loksewa/{slug}")
    suspend fun mobileLoksewaTopic(@Path("slug") slug: String): Response<com.ravikisan.platform.compose.core.contract.KnowledgeSectionResponse>

    @GET("api/mobile/world-knowledge")
    suspend fun mobileWorldKnowledge(): Response<com.ravikisan.platform.compose.core.contract.KnowledgeHubResponse>

    @GET("api/mobile/world-knowledge/{slug}")
    suspend fun mobileWorldKnowledgeTopic(@Path("slug") slug: String): Response<com.ravikisan.platform.compose.core.contract.KnowledgeSectionResponse>

    // ── Wave 1 bank seams (SRS cards, offline packs, mock written section) ──
    //
    // Auth-gated endpoint families (`requireAuth` + `requireTier("plus")` on
    // the backend, mirroring the website's /pyqs and /formulas gates). The
    // shared OkHttp stack has NO auth interceptor yet (owned by the parent),
    // so these methods take the Bearer header explicitly; callers read the
    // session token from `SessionStore`.
    //
    // Default bodies exist only so the shared JVM test `Fakes.kt` (which
    // predates this wave) keeps compiling without an edit; production always
    // goes through the Retrofit proxy, which never sees these bodies.

    /** `GET /api/mobile/pyqs?class=&subject=&limit=&cursor=` — PYQ catalog rows. */
    @GET("api/mobile/pyqs")
    suspend fun mobilePyqs(
        @Query("class") classDir: String? = null,
        @Query("subject") subject: String? = null,
        @Query("limit") limit: Int? = null,
        @Query("cursor") cursor: String? = null,
        @Header("Authorization") authorization: String? = null,
    ): Response<com.ravikisan.platform.compose.core.contract.MobilePyqsResponse> {
        throw UnsupportedOperationException("Fake must override mobilePyqs")
    }

    /** `GET /api/mobile/pyqs/file?path=` — one PYQ file's question lines. */
    @GET("api/mobile/pyqs/file")
    suspend fun mobilePyqFile(
        @Query("path") path: String,
        @Header("Authorization") authorization: String? = null,
    ): Response<com.ravikisan.platform.compose.core.contract.MobilePyqFileResponse> {
        throw UnsupportedOperationException("Fake must override mobilePyqFile")
    }

    /** `GET /api/mobile/formulas?class=&subject=&unit=` — formula-sheet catalog rows. */
    @GET("api/mobile/formulas")
    suspend fun mobileFormulas(
        @Query("class") classDir: String? = null,
        @Query("subject") subject: String? = null,
        @Query("unit") unit: String? = null,
        @Query("limit") limit: Int? = null,
        @Query("cursor") cursor: String? = null,
        @Header("Authorization") authorization: String? = null,
    ): Response<com.ravikisan.platform.compose.core.contract.MobileFormulasResponse> {
        throw UnsupportedOperationException("Fake must override mobileFormulas")
    }

    /** `GET /api/mobile/formulas/file?path=` — one formula sheet's lines. */
    @GET("api/mobile/formulas/file")
    suspend fun mobileFormulaFile(
        @Query("path") path: String,
        @Header("Authorization") authorization: String? = null,
    ): Response<com.ravikisan.platform.compose.core.contract.MobileFormulaFileResponse> {
        throw UnsupportedOperationException("Fake must override mobileFormulaFile")
    }

    /** `GET /api/progress` — the signed-in student's journey rows (auth-gated). */
    @GET("api/progress")
    suspend fun progress(
        @Header("Authorization") authorization: String? = null,
    ): Response<com.ravikisan.platform.compose.core.contract.JourneyRowsResponse> {
        throw UnsupportedOperationException("Fake must override progress")
    }
}
