package com.ravikisan.platform.compose.core.network

import com.ravikisan.platform.compose.core.SecurityContract
import okhttp3.Interceptor
import okhttp3.Response

/**
 * Redirect guard: the OkHttp client is built with `followRedirects(false)`; this
 * interceptor follows **only same-origin** redirects (per [RedirectPolicy]), up to
 * [SecurityContract.MAX_REDIRECTS] hops. Any cross-origin redirect is rejected —
 * mirrors legacy `ApiClient` (no redirect follows except same-origin api paths).
 */
class RedirectGuardInterceptor : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        var request = chain.request()
        var response = chain.proceed(request)
        var hops = 0
        while (response.isRedirect) {
            val location = response.header("Location")
            response.close()
            if (RedirectPolicy.decide(location) != RedirectPolicy.Decision.FOLLOW) {
                throw HttpException(302, "Untrusted redirect")
            }
            if (++hops > SecurityContract.MAX_REDIRECTS) {
                throw HttpException(302, "Too many redirects")
            }
            request = request.newBuilder()
                .url(RedirectPolicy.resolve(location!!))
                .build()
            response = chain.proceed(request)
        }
        return response
    }

    private val Response.isRedirect: Boolean
        get() = code == 301 || code == 302 || code == 307 || code == 308
}
