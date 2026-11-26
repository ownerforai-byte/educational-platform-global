package com.ravikisan.platform.compose.core.stream

import com.ravikisan.platform.compose.core.network.HttpException
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import java.io.BufferedReader
import java.io.InputStreamReader

/**
 * Minimal SSE client for the Veer AI chat stream (Agent 6 phase, transport owned here).
 *
 * Implementations must emit [SseParser.Event]s as they arrive and complete the flow
 * when the server closes the stream. Auth errors (401/403) surface as [HttpException].
 */
interface SseClient {
    /** Open a streaming request. [body] is sent as JSON when non-null (POST), else GET. */
    fun stream(url: String, authToken: String?, body: String?): Flow<SseParser.Event>
}

/** OkHttp-backed implementation. Long-lived: connect/read timeouts are relaxed for streams. */
class OkHttpSseClient(
    private val baseHttpClient: OkHttpClient,
    private val baseUrl: String,
) : SseClient {

    override fun stream(url: String, authToken: String?, body: String?): Flow<SseParser.Event> =
        callbackFlow {
            val fullUrl = if (url.startsWith("http")) url else baseUrl.trimEnd('/') + "/" + url.trimStart('/')
            val request = Request.Builder()
                .url(fullUrl)
                .header("Accept", "text/event-stream")
                .apply {
                    if (authToken != null) header("Authorization", "Bearer $authToken")
                    if (body != null) {
                        post(body.toRequestBody("application/json; charset=utf-8".toMediaType()))
                    }
                }
                .build()

            val client = baseHttpClient.newBuilder()
                .readTimeout(0, java.util.concurrent.TimeUnit.MILLISECONDS) // stream stays open
                .build()

            val call = client.newCall(request)
            call.enqueue(object : okhttp3.Callback {
                override fun onFailure(call: okhttp3.Call, e: java.io.IOException) {
                    trySend(SseParser.Event(event = "error", data = e.message))
                    close()
                }

                override fun onResponse(call: okhttp3.Call, response: Response) {
                    response.use { resp ->
                        if (!resp.isSuccessful) {
                            trySend(
                                SseParser.Event(
                                    event = "error",
                                    data = "HTTP ${resp.code}",
                                ),
                            )
                            close(HttpException(resp.code, "SSE request failed: HTTP ${resp.code}"))
                            return
                        }
                        val source = resp.body?.byteStream() ?: run { close(); return }
                        BufferedReader(InputStreamReader(source, Charsets.UTF_8)).useLines { lines ->
                            val state = SseParser.MutableState()
                            for (line in lines) {
                                SseParser.feed(state, line)?.let { trySend(it) }
                            }
                        }
                        close()
                    }
                }
            })
            awaitClose { call.cancel() }
        }
}

/**
 * Deterministic fake for tests and Agent 4 UI fakes — replays a scripted list of
 * events (optionally with an error) instead of touching the network.
 */
class FakeSseClient(
    private val scripted: List<SseParser.Event> = emptyList(),
    private val error: String? = null,
) : SseClient {

    val lastUrl: MutableRef<String?> = MutableRef(null)
    val lastAuthToken: MutableRef<String?> = MutableRef(null)
    val lastBody: MutableRef<String?> = MutableRef(null)

    override fun stream(url: String, authToken: String?, body: String?): Flow<SseParser.Event> =
        kotlinx.coroutines.flow.flow {
            lastUrl.value = url
            lastAuthToken.value = authToken
            lastBody.value = body
            scripted.forEach { emit(it) }
            if (error != null) {
                emit(SseParser.Event(event = "error", data = error))
                throw HttpException(500, error)
            }
        }

    class MutableRef<T>(var value: T? = null)
}
