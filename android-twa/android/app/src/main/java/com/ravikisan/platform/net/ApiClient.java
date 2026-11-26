package com.ravikisan.platform.net;

import android.content.Context;

import com.ravikisan.platform.BuildConfig;
import com.ravikisan.platform.data.AppDatabase;
import com.ravikisan.platform.data.CacheEntry;
import com.ravikisan.platform.security.AppSignatureGuard;
import com.ravikisan.platform.security.AuthSessionInvalidator;
import com.ravikisan.platform.security.FieldCipher;
import com.ravikisan.platform.security.SecurityContract;
import com.ravikisan.platform.session.SessionManager;
import com.ravikisan.platform.web.WebSessionCookies;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ApiClient {
    private static final ExecutorService IO = Executors.newCachedThreadPool();
    private static final String CACHE_ME = "profile_me";
    private static final String CACHE_FEED = "community_feed";
    private static final int MAX_RESPONSE_CHARS = 2 * 1024 * 1024;
    private static final String USER_AGENT =
            "RavikisanAndroid/" + BuildConfig.VERSION_NAME + " (" + SecurityContract.PACKAGE_ID
                    + "; b" + BuildConfig.VERSION_CODE + ")";

    private final Context appContext;
    private final SessionManager session;
    private final AppDatabase db;
    private final FieldCipher cipher;

    public ApiClient(Context context) {
        appContext = context.getApplicationContext();
        session = new SessionManager(appContext);
        db = AppDatabase.get(appContext);
        try {
            cipher = new FieldCipher();
        } catch (Exception e) {
            throw new IllegalStateException("Offline encryption unavailable", e);
        }
    }

    public SessionManager session() {
        return session;
    }

    public void loginWithIdToken(String idToken, Callback<JSONObject> cb) {
        IO.execute(() -> completeLogin(idToken, cb));
    }

    /** Supabase email/password path when Firebase client is unavailable. */
    public void loginWithPassword(String email, String password, Callback<JSONObject> cb) {
        IO.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("email", email);
                body.put("password", password);
                completeLogin(request("POST", "/api/auth/login", body, false), cb);
            } catch (Exception e) {
                cb.onResult(null, e);
            }
        });
    }

    private void completeLogin(String idToken, Callback<JSONObject> cb) {
        try {
            JSONObject body = new JSONObject();
            body.put("idToken", idToken);
            JSONObject res = request("POST", "/api/auth/login", body, false);
            persistSessionIfPresent(res);
            cb.onResult(res, null);
        } catch (Exception e) {
            cb.onResult(null, e);
        }
    }

    private void completeLogin(JSONObject res, Callback<JSONObject> cb) {
        try {
            persistSessionIfPresent(res);
            cb.onResult(res, null);
        } catch (Exception e) {
            cb.onResult(null, e);
        }
    }

    private void persistSessionIfPresent(JSONObject res) throws Exception {
        if (res.has("accessToken") && res.has("user")) {
            session.saveSession(
                    res.getString("accessToken"),
                    res.getJSONObject("user").toString());
            WebSessionCookies.syncFromNativeSession(appContext);
        }
    }

    public void registerFcmToken(String fcmToken) throws Exception {
        JSONObject body = new JSONObject();
        body.put("fcmToken", fcmToken);
        body.put("deepLink", "/home/member");
        request("POST", "/api/access-requests/fcm", body, true);
    }

    public void revokeFcmToken() throws Exception {
        request("DELETE", "/api/access-requests/fcm", null, true);
    }

    public void logout(Runnable done) {
        IO.execute(() -> {
            try {
                revokeFcmToken();
                request("POST", "/api/auth/logout", null, true);
            } catch (Exception ignored) {
                /* local sign-out still proceeds */
            } finally {
                session.clear();
                db.cache().clearAll();
                WebSessionCookies.clear(appContext);
                if (done != null) done.run();
            }
        });
    }

    public void refreshMe(Callback<JSONObject> cb) {
        IO.execute(() -> fetchCachedOrLive(CACHE_ME, "/api/auth/me", cb));
    }

    public void refreshFeed(Callback<JSONObject> cb) {
        IO.execute(() -> fetchCachedOrLive(CACHE_FEED, "/api/community/feed?limit=20", cb));
    }

    private void fetchCachedOrLive(String cacheKey, String path, Callback<JSONObject> cb) {
        try {
            JSONObject live = request("GET", path, null, true);
            if (live != null) {
                db.cache()
                        .put(new CacheEntry(cacheKey, seal(live.toString()), System.currentTimeMillis()));
                cb.onResult(live, null);
                return;
            }
        } catch (Exception e) {
            if (e instanceof HttpException && (((HttpException) e).status == 401
                    || ((HttpException) e).status == 403)) {
                cb.onResult(null, e);
                return;
            }
            String cached = db.cache().get(cacheKey);
            if (cached != null) {
                try {
                    cb.onResult(new JSONObject(openSealed(cached)), e);
                    return;
                } catch (Exception ignored) {
                    /* fall through */
                }
            }
            cb.onResult(null, e);
            return;
        }
        cb.onResult(null, new Exception("empty response"));
    }

    /** Debug/local builds omit attestation headers so API calls work before Play signing. */
    private void applyOfficialNativeAttestation(HttpURLConnection conn) {
        if (BuildConfig.DEBUG) {
            return;
        }
        if (!AppSignatureGuard.isOfficialBuild(appContext)) {
            return;
        }
        String signingCert = AppSignatureGuard.getPrimarySigningCertSha256Hex(appContext);
        if (signingCert == null) {
            return;
        }
        conn.setRequestProperty("X-Rn-Client", SecurityContract.CLIENT_HEADER);
        conn.setRequestProperty(SecurityContract.HEADER_SIGNING_CERT, signingCert);
    }

    private JSONObject request(String method, String path, JSONObject body, boolean auth) throws Exception {
        URL url = new URL(BuildConfig.API_BASE + path);
        if (!SecurityContract.API_HOST.equals(url.getHost())) {
            throw new IOException("API host not allowed");
        }
        if (!"https".equalsIgnoreCase(url.getProtocol())) {
            throw new IOException("TLS required");
        }
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(20_000);
        conn.setReadTimeout(20_000);
        conn.setInstanceFollowRedirects(false);
        conn.setRequestMethod(method);
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("User-Agent", USER_AGENT);
        applyOfficialNativeAttestation(conn);
        if (auth) {
            String token = session.getAccessToken();
            if (token != null) {
                conn.setRequestProperty("Authorization", "Bearer " + token);
            }
        }
        if ("DELETE".equals(method)) {
            conn.setDoOutput(false);
        }
        if (body != null && ("POST".equals(method) || "PUT".equals(method) || "PATCH".equals(method))) {
            conn.setDoOutput(true);
            byte[] bytes = body.toString().getBytes(StandardCharsets.UTF_8);
            if (bytes.length > 512_000) {
                throw new IOException("Request body too large");
            }
            try (OutputStream os = conn.getOutputStream()) {
                os.write(bytes);
            }
        }
        int code = conn.getResponseCode();
        if (code == 301 || code == 302 || code == 307 || code == 308) {
            String location = conn.getHeaderField("Location");
            conn.disconnect();
            if (location == null) {
                throw new HttpException(code, "Untrusted redirect");
            }
            String nextPath;
            if (location.startsWith(BuildConfig.API_BASE)) {
                nextPath = location.substring(BuildConfig.API_BASE.length());
            } else if (location.startsWith("/")) {
                nextPath = location;
            } else {
                throw new HttpException(code, "Untrusted redirect");
            }
            if (!nextPath.startsWith("/api/")) {
                throw new HttpException(code, "Untrusted redirect");
            }
            return request(method, nextPath, body, auth);
        }
        String text = readBody(code >= 400 ? conn.getErrorStream() : conn.getInputStream());
        conn.disconnect();
        if (code == 401 || code == 403) {
            if (auth && !path.startsWith("/api/auth/login")) {
                AuthSessionInvalidator.invalidate(appContext);
            }
            throw new HttpException(code, sanitizeErrorMessage(text));
        }
        if (code >= 400) {
            throw new HttpException(code, sanitizeErrorMessage(text));
        }
        if (text.isEmpty()) return new JSONObject();
        return new JSONObject(text);
    }

    private static String readBody(InputStream stream) throws IOException {
        if (stream == null) return "";
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8))) {
            StringBuilder sb = new StringBuilder();
            char[] buf = new char[4096];
            int read;
            while ((read = reader.read(buf)) != -1) {
                if (sb.length() + read > MAX_RESPONSE_CHARS) {
                    throw new IOException("Response too large");
                }
                sb.append(buf, 0, read);
            }
            return sb.toString().trim();
        }
    }

    private static String sanitizeErrorMessage(String raw) {
        if (raw == null || raw.isEmpty()) return "Request failed";
        if (raw.length() > 500) {
            return "Request failed";
        }
        try {
            JSONObject err = new JSONObject(raw);
            if (err.has("error")) return err.getString("error");
            if (err.has("message")) return err.getString("message");
        } catch (Exception ignored) {
            /* plain text */
        }
        return raw;
    }

    private String seal(String json) throws Exception {
        return cipher.encrypt(json);
    }

    private String openSealed(String stored) throws Exception {
        if (BuildConfig.DEBUG) {
            try {
                return cipher.decrypt(stored);
            } catch (Exception notEncrypted) {
                new JSONObject(stored);
                return stored;
            }
        }
        return cipher.decrypt(stored);
    }

    public interface Callback<T> {
        void onResult(T value, Exception error);
    }

    public static class HttpException extends Exception {
        public final int status;

        HttpException(int status, String body) {
            super("HTTP " + status + ": " + body);
            this.status = status;
        }
    }
}