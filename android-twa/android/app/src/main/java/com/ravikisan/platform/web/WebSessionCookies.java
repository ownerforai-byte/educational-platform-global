package com.ravikisan.platform.web;

import android.content.Context;
import android.webkit.CookieManager;

import com.ravikisan.platform.security.SecurityContract;
import com.ravikisan.platform.session.SessionManager;

/**
 * Mirrors API login cookies so the in-app WebView shares the native session.
 */
public final class WebSessionCookies {
    private static final String ACCESS_COOKIE = "sb-access-token";

    private WebSessionCookies() {}

    public static void syncFromNativeSession(Context context) {
        SessionManager session = new SessionManager(context);
        String token = session.getAccessToken();
        CookieManager cm = CookieManager.getInstance();
        cm.setAcceptCookie(true);
        String base = "https://" + SecurityContract.API_HOST;
        String domain = "Domain=" + SecurityContract.API_HOST;
        if (token != null && !token.isEmpty()) {
            String cookie =
                    ACCESS_COOKIE + "=" + token + "; Path=/; " + domain + "; Secure; SameSite=Lax";
            cm.setCookie(base, cookie);
            cm.setCookie("https://www." + SecurityContract.API_HOST, cookie);
        } else {
            cm.setCookie(base, ACCESS_COOKIE + "=; Path=/; Max-Age=0");
        }
        cm.flush();
    }

    /**
     * After web sign-in inside the WebView, copy {@code sb-access-token} into encrypted native storage
     * so WorkManager / offline cache use the same account as the website.
     */
    public static boolean ingestWebSession(Context context) {
        String token = readAccessTokenFromCookies();
        if (token == null || token.isEmpty()) {
            return false;
        }
        SessionManager session = new SessionManager(context);
        String existing = session.getAccessToken();
        if (token.equals(existing)) {
            return session.isSignedIn();
        }
        String userJson = session.getUserJson();
        if (userJson == null || userJson.isEmpty()) {
            userJson = "{}";
        }
        session.saveSession(token, userJson);
        return true;
    }

    private static String readAccessTokenFromCookies() {
        CookieManager cm = CookieManager.getInstance();
        String raw =
                cm.getCookie("https://" + SecurityContract.API_HOST);
        if (raw == null) {
            raw = cm.getCookie("https://www." + SecurityContract.API_HOST);
        }
        if (raw == null) return null;
        for (String part : raw.split(";")) {
            String trimmed = part.trim();
            if (trimmed.startsWith(ACCESS_COOKIE + "=")) {
                String value = trimmed.substring(ACCESS_COOKIE.length() + 1);
                return value.isEmpty() ? null : value;
            }
        }
        return null;
    }

    public static void clear(Context context) {
        CookieManager cm = CookieManager.getInstance();
        cm.removeAllCookies(null);
        cm.flush();
    }
}