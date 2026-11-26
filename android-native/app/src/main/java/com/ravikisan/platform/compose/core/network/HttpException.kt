package com.ravikisan.platform.compose.core.network

import java.io.IOException

/** Thrown for non-2xx API responses so callers can branch on [status]. */
class HttpException(val status: Int, message: String) : IOException(message) {

    val isAuthError: Boolean
        get() = status == 401 || status == 403

    companion object {
        /** Truncate server error bodies before display (legacy rule). */
        fun truncate(message: String, max: Int = 300): String =
            if (message.length <= max) message else message.take(max) + "…"
    }
}
