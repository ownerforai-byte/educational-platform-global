package com.ravikisan.platform.security;

import android.net.Uri;

/**
 * Mirrors web path hygiene: only in-app https paths on harindrasah.com.np or rn://app.
 */
public final class SecureDeepLink {
    private static final int MAX_LEN = 512;

    private SecureDeepLink() {}

    public static String sanitizePath(String raw) {
        if (raw == null) return "/home/member";
        String path = raw.trim();
        if (path.isEmpty()) return "/home/member";
        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        if (path.length() > MAX_LEN) {
            path = path.substring(0, MAX_LEN);
        }
        if (path.contains("..") || path.contains("\\") || path.contains("//")
                || path.contains("\n") || path.contains("\r")) {
            return "/home/member";
        }
        if (!path.matches("^/[A-Za-z0-9_\\-./?=&%]*$")) {
            return "/home/member";
        }
        return path;
    }

    public static String fromUri(Uri data) {
        if (data == null) return null;
        String scheme = data.getScheme();
        if ("rn".equals(scheme) && "app".equals(data.getHost())) {
            return sanitizePath(data.getPath());
        }
        if ("https".equals(scheme) && "harindrasah.com.np".equals(data.getHost())) {
            String path = data.getPath();
            if (path == null || path.isEmpty()) return "/";
            return sanitizePath(path);
        }
        return null;
    }
}