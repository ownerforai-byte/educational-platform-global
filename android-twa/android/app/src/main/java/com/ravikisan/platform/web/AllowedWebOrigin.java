package com.ravikisan.platform.web;

import android.net.Uri;

import com.ravikisan.platform.security.SecurityContract;

/**
 * In-app WebView may load the production site and trusted identity providers only.
 */
public final class AllowedWebOrigin {
    private AllowedWebOrigin() {}

    public static boolean isAllowed(Uri uri) {
        if (uri == null) return false;
        String host = uri.getHost();
        if (host == null) return false;
        if (SecurityContract.API_HOST.equalsIgnoreCase(host)
                || host.endsWith("." + SecurityContract.API_HOST)) {
            return "https".equalsIgnoreCase(uri.getScheme());
        }
        if ("accounts.google.com".equalsIgnoreCase(host)
                || host.endsWith(".firebaseapp.com")
                || host.endsWith(".google.com")) {
            return "https".equalsIgnoreCase(uri.getScheme());
        }
        return false;
    }
}