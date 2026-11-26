package com.ravikisan.platform.compose.data.api

import com.ravikisan.platform.compose.core.contract.AuthResponse
import com.ravikisan.platform.compose.core.contract.ExamDto
import com.ravikisan.platform.compose.core.contract.FcmRegistrationRequest
import com.ravikisan.platform.compose.core.contract.LoginRequest
import com.ravikisan.platform.compose.core.contract.MeResponse
import com.ravikisan.platform.compose.core.contract.MobileCommunityResponse
import com.ravikisan.platform.compose.core.contract.MobileNotesResponse
import com.ravikisan.platform.compose.core.contract.MobilePracticeResponse
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.core.contract.MobileUnitsResponse
import com.ravikisan.platform.compose.core.contract.RNoteResponse
import com.ravikisan.platform.compose.core.contract.SignupRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
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

    @POST("api/access-requests/fcm")
    suspend fun registerFcmToken(@Body body: FcmRegistrationRequest): Response<Unit>

    @DELETE("api/access-requests/fcm")
    suspend fun unregisterFcmToken(): Response<Unit>
}
