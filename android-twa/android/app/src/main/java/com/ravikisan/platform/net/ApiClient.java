package com.ravikisan.platform.net;

import android.content.Context;

import com.ravikisan.platform.BuildConfig;
import com.ravikisan.platform.data.AppDatabase;
import com.ravikisan.platform.data.CacheEntry;
import com.ravikisan.platform.session.SessionManager;

import org.json.JSONObject;

import java.io.BufferedReader;
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

    private final SessionManager session;
    private final AppDatabase db;

    public ApiClient(Context context) {
        session = new SessionManager(context);
        db = AppDatabase.get(context);
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
                        .put(new CacheEntry(cacheKey, live.toString(), System.currentTimeMillis()));
                cb.onResult(live, null);
                return;
            }
        } catch (Exception e) {
            String cached = db.cache().get(cacheKey);
            if (cached != null) {
                try {
                    cb.onResult(new JSONObject(cached), e);
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

    private JSONObject request(String method, String path, JSONObject body, boolean auth) throws Exception {
        URL url = new URL(BuildConfig.API_BASE + path);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(20_000);
        conn.setReadTimeout(20_000);
        conn.setRequestMethod(method);
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("Content-Type", "application/json");
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
            try (OutputStream os = conn.getOutputStream()) {
                os.write(bytes);
            }
        }
        int code = conn.getResponseCode();
        BufferedReader reader = new BufferedReader(new InputStreamReader(
                code >= 400 ? conn.getErrorStream() : conn.getInputStream(), StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) sb.append(line);
        reader.close();
        if (code >= 400) {
            String raw = sb.toString();
            String message = raw;
            try {
                JSONObject err = new JSONObject(raw);
                if (err.has("error")) message = err.getString("error");
                else if (err.has("message")) message = err.getString("message");
            } catch (Exception ignored) {
                /* use raw body */
            }
            throw new HttpException(code, message);
        }
        String text = sb.toString().trim();
        if (text.isEmpty()) return new JSONObject();
        return new JSONObject(text);
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