package com.ravikisan.platform.compose.data

import com.ravikisan.platform.compose.core.contract.FcmRegistrationRequest
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.fcm.FcmTokenPolicy
import kotlinx.serialization.json.Json
import okhttp3.Interceptor
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import java.util.concurrent.atomic.AtomicReference

/**
 * Contract tests for the FCM registration path against the backend schema in
 * `backend/src/api/access-requests.ts`:
 *
 *   POST /api/access-requests/fcm   { fcmToken: string(min 8, max 4096) }  (requireAuth)
 *   DELETE /api/access-requests/fcm                                        (requireAuth)
 *
 * Strategy (pure JVM, no new deps): Retrofit over an OkHttp client whose
 * interceptor records the outgoing request and short-circuits with a synthetic
 * 200 — so we pin exactly what the client would put on the wire.
 */
class FcmApiContractTest {

    private val recorded = AtomicReference<Request?>(null)

    private fun apiWithRecorder(): RnApi {
        val client = OkHttpClient.Builder()
            .addInterceptor(
                Interceptor { chain ->
                    recorded.set(chain.request())
                    Response.Builder()
                        .code(200)
                        .message("OK")
                        .protocol(okhttp3.Protocol.HTTP_1_1)
                        .request(chain.request())
                        .body("""{"ok":true}""".toResponseBody("application/json".toMediaType()))
                        .build()
                },
            )
            .build()
        return Retrofit.Builder()
            .baseUrl("https://harindrasah.com.np/")
            .client(client)
            .addConverterFactory(
                Json { ignoreUnknownKeys = true }
                    .asConverterFactory("application/json; charset=utf-8".toMediaType()),
            )
            .build()
            .create(RnApi::class.java)
    }

    @Test
    fun `register posts to the documented path with the documented body`() = kotlinx.coroutines.runBlocking {
        val api = apiWithRecorder()
        api.registerFcmToken(FcmRegistrationRequest(fcmToken = "fcm-token-123456"))

        val request = recorded.get()
        assertEquals("POST", request!!.method)
        assertEquals("https://harindrasah.com.np/api/access-requests/fcm", request.url.toString())
        val body = request.body!!.asRequestBodyText()
        assertEquals("""{"fcmToken":"fcm-token-123456"}""", body)
    }

    @Test
    fun `unregister deletes the documented path`() = kotlinx.coroutines.runBlocking {
        val api = apiWithRecorder()
        api.unregisterFcmToken()

        val request = recorded.get()
        assertEquals("DELETE", request!!.method)
        assertEquals("https://harindrasah.com.np/api/access-requests/fcm", request.url.toString())
    }

    @Test
    fun `request body is json with the exact fcmToken field name`() = kotlinx.coroutines.runBlocking {
        val api = apiWithRecorder()
        api.registerFcmToken(FcmRegistrationRequest(fcmToken = "abcdefgh"))
        val body = recorded.get()!!.body!!.asRequestBodyText()
        assertTrue(body.contains("\"fcmToken\""))
        assertFalse(body.contains("fcm_token"))
        assertFalse(body.contains("token"))
    }

    @Test
    fun `client-side token bounds mirror the backend schema`() {
        // min 8
        assertFalse(FcmTokenPolicy.isValid("1234567"))
        assertTrue(FcmTokenPolicy.isValid("12345678"))
        // max 4096
        assertTrue(FcmTokenPolicy.isValid("x".repeat(4096)))
        assertFalse(FcmTokenPolicy.isValid("x".repeat(4097)))
        // null / blank
        assertFalse(FcmTokenPolicy.isValid(null))
        assertFalse(FcmTokenPolicy.isValid("   "))
    }

    private fun okhttp3.RequestBody.asRequestBodyText(): String =
        okio.Buffer().also { writeTo(it) }.readUtf8()
}
