package com.ravikisan.platform.compose.core.network

import com.ravikisan.platform.compose.core.SecurityContract
import okhttp3.Interceptor
import okhttp3.MediaType
import okhttp3.Response
import okhttp3.ResponseBody
import okio.Buffer
import okio.BufferedSource
import okio.ForwardingSource
import okio.IOException
import okio.Source
import okio.buffer

/**
 * Caps response bodies at [SecurityContract.MAX_RESPONSE_BYTES] (2 MB):
 * - rejects early when `Content-Length` already exceeds the cap;
 * - otherwise wraps the source and throws once the streamed size passes the cap
 *   (mirrors legacy `MAX_RESPONSE_CHARS` read loop).
 */
class ResponseCapInterceptor : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val response = chain.proceed(chain.request())
        val length = response.body?.contentLength() ?: -1L
        if (length > SecurityContract.MAX_RESPONSE_BYTES) {
            response.close()
            throw IOException("Response body too large: $length bytes")
        }
        val body = response.body ?: return response
        val capped = object : ResponseBody() {
            override fun contentType(): MediaType? = body.contentType()
            override fun contentLength(): Long = length
            override fun source(): BufferedSource = body.source().peekAndCap()
        }
        return response.newBuilder().body(capped).build()
    }

    private fun BufferedSource.peekAndCap(): BufferedSource {
        val upstream = this
        var seen = 0L
        val limited: Source = object : ForwardingSource(upstream) {
            override fun read(sink: Buffer, byteCount: Long): Long {
                val read = super.read(sink, byteCount)
                if (read > 0) {
                    seen += read
                    if (seen > SecurityContract.MAX_RESPONSE_BYTES) {
                        throw IOException("Response body too large while streaming")
                    }
                }
                return read
            }
        }
        return limited.buffer()
    }
}
