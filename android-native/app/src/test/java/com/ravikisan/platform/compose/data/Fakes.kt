package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.LoginRequest
import com.ravikisan.platform.compose.core.contract.MeResponse
import com.ravikisan.platform.compose.core.contract.MobileSyllabusResponse
import com.ravikisan.platform.compose.core.contract.SignupRequest
import com.ravikisan.platform.compose.core.contract.UserDto
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.session.SessionStore
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.ResponseBody.Companion.toResponseBody
import retrofit2.Response

/** In-memory [SessionStore] fake recording mutations for assertions. */
class FakeSessionStore : SessionStore {
    var storedToken: String? = null
    var storedUser: UserDto? = null
    var clearedCount = 0
    var setTokenCount = 0

    override fun getAccessToken(): String? = storedToken
    override fun setAccessToken(token: String) {
        this.storedToken = token
        setTokenCount++
    }

    override fun getUser(): UserDto? = storedUser
    override fun setUser(user: UserDto) {
        this.storedUser = user
    }

    override val isSignedIn: Boolean
        get() = storedToken != null

    override fun clear() {
        storedToken = null
        storedUser = null
        clearedCount++
    }
}

/**
 * Scriptable [RnApi] fake — records requests, replays queued [Response]s or throws.
 */
class FakeRnApi : RnApi {

    val loginBodies = mutableListOf<LoginRequest>()
    val signupBodies = mutableListOf<SignupRequest>()
    var meCalls = 0

    var loginResponse: Response<com.ravikisan.platform.compose.core.contract.AuthResponse>? = null
    var loginError: Throwable? = null
    var signupResponse: Response<com.ravikisan.platform.compose.core.contract.AuthResponse>? = null
    var meResponse: Response<MeResponse>? = null
    var mobileSyllabusResponse: Response<MobileSyllabusResponse>? = null
    var mobileSyllabusError: Throwable? = null
    var mobileUnitsResponse: Response<com.ravikisan.platform.compose.core.contract.MobileUnitsResponse>? = null
    var mobileUnitsError: Throwable? = null
    var mobileNotesResponse: Response<com.ravikisan.platform.compose.core.contract.MobileNotesResponse>? = null
    var mobileNotesError: Throwable? = null
    var rNoteResponse: Response<com.ravikisan.platform.compose.core.contract.RNoteResponse>? = null
    var rNoteError: Throwable? = null
    var lastUnitsSubject: String? = null
    var lastNotesQuery: String? = null
    var fcmResponses = ArrayDeque<Response<Unit>>()

    override suspend fun login(body: LoginRequest): Response<com.ravikisan.platform.compose.core.contract.AuthResponse> {
        loginBodies += body
        loginError?.let { throw it }
        return loginResponse ?: Response.success(
            com.ravikisan.platform.compose.core.contract.AuthResponse(accessToken = "tok"),
        )
    }

    override suspend fun signup(body: SignupRequest): Response<com.ravikisan.platform.compose.core.contract.AuthResponse> {
        signupBodies += body
        return signupResponse ?: Response.success(
            com.ravikisan.platform.compose.core.contract.AuthResponse(accessToken = "tok"),
        )
    }

    override suspend fun me(): Response<MeResponse> {
        meCalls++
        return meResponse ?: Response.success(MeResponse())
    }

    override suspend fun mobileSyllabus(): Response<MobileSyllabusResponse> {
        mobileSyllabusError?.let { throw it }
        return mobileSyllabusResponse ?: Response.success(MobileSyllabusResponse())
    }

    override suspend fun mobileUnits(subjectSlug: String): Response<com.ravikisan.platform.compose.core.contract.MobileUnitsResponse> {
        lastUnitsSubject = subjectSlug
        mobileUnitsError?.let { throw it }
        return mobileUnitsResponse ?: Response.success(
            com.ravikisan.platform.compose.core.contract.MobileUnitsResponse(),
        )
    }

    override suspend fun mobileNotes(
        subject: String?,
        chapter: String?,
        limit: Int?,
        cursor: String?,
    ): Response<com.ravikisan.platform.compose.core.contract.MobileNotesResponse> {
        lastNotesQuery = "subject=$subject chapter=$chapter cursor=$cursor"
        mobileNotesError?.let { throw it }
        return mobileNotesResponse ?: Response.success(
            com.ravikisan.platform.compose.core.contract.MobileNotesResponse(),
        )
    }

    override suspend fun rNote(id: String): Response<com.ravikisan.platform.compose.core.contract.RNoteResponse> {
        rNoteError?.let { throw it }
        return rNoteResponse ?: Response.success(
            com.ravikisan.platform.compose.core.contract.RNoteResponse(),
        )
    }

    override suspend fun registerFcmToken(body: com.ravikisan.platform.compose.core.contract.FcmRegistrationRequest): Response<Unit> {
        return fcmResponses.removeFirstOrNull() ?: Response.success(Unit)
    }

    override suspend fun unregisterFcmToken(): Response<Unit> = Response.success(Unit)

    // ── Session-3 swap surface (practice + community) ──

    var mobilePracticeResponse: Response<com.ravikisan.platform.compose.core.contract.MobilePracticeResponse>? = null
    var mobilePracticeError: Throwable? = null
    var practiceExamError: Throwable? = null
    var practiceExamResponses = ArrayDeque<Response<com.ravikisan.platform.compose.core.contract.ExamDto>>()
    var mobileCommunityResponse: Response<com.ravikisan.platform.compose.core.contract.MobileCommunityResponse>? = null
    var mobileCommunityError: Throwable? = null
    var lastPracticeCursor: String? = null
    var lastExamSlug: String? = null
    var lastCommunityQuery: String? = null

    override suspend fun mobilePractice(
        limit: Int?,
        cursor: String?,
    ): Response<com.ravikisan.platform.compose.core.contract.MobilePracticeResponse> {
        lastPracticeCursor = cursor
        mobilePracticeError?.let { throw it }
        return mobilePracticeResponse ?: Response.success(
            com.ravikisan.platform.compose.core.contract.MobilePracticeResponse(),
        )
    }

    override suspend fun practiceExam(slug: String): Response<com.ravikisan.platform.compose.core.contract.ExamDto> {
        lastExamSlug = slug
        practiceExamError?.let { throw it }
        return practiceExamResponses.removeFirstOrNull()
            ?: Response.error(404, "{}".toResponseBody("application/json".toMediaType()))
    }

    override suspend fun mobileCommunity(
        category: String?,
        limit: Int?,
        cursor: String?,
    ): Response<com.ravikisan.platform.compose.core.contract.MobileCommunityResponse> {
        lastCommunityQuery = "category=$category cursor=$cursor"
        mobileCommunityError?.let { throw it }
        return mobileCommunityResponse ?: Response.success(
            com.ravikisan.platform.compose.core.contract.MobileCommunityResponse(),
        )
    }

    companion object {
        @Suppress("UNCHECKED_CAST")
        fun <T> error(code: Int, json: String): Response<T> {
            val body = json.toResponseBody("application/json".toMediaType())
            return Response.error<T>(code, body) as Response<T>
        }
    }
}
