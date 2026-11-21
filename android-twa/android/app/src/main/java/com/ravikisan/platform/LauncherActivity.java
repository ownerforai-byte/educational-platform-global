/*
 * Copyright 2020 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.ravikisan.platform;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.Manifest;
import android.content.pm.PackageManager;
import android.webkit.CookieManager;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.ContextCompat;

import com.google.firebase.messaging.FirebaseMessaging;

/**
 * Full-screen shell. All platform navigation stays in this WebView — external
 * browsers (Chrome) are not opened for normal study / community / sign-in flows.
 */
public class LauncherActivity extends androidx.activity.ComponentActivity {

    private static final String SITE_HOST = "harindrasah.com.np";
    private static final String USER_AGENT_SUFFIX = " RavikisanApp/1.0.8";

    private WebView webView;
    private ValueCallback<Uri[]> fileCallback;

    private final ActivityResultLauncher<Intent> fileChooser =
            registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
                if (fileCallback == null) return;
                Uri[] uris = result.getResultCode() == Activity.RESULT_OK
                        ? WebChromeClient.FileChooserParams.parseResult(result.getResultCode(), result.getData())
                        : null;
                fileCallback.onReceiveValue(uris);
                fileCallback = null;
            });

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportMultipleWindows(false);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            settings.setAllowFileAccessFromFileURLs(false);
            settings.setAllowUniversalAccessFromFileURLs(false);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER);
        }
        String defaultUa = settings.getUserAgentString();
        if (defaultUa != null && !defaultUa.contains("RavikisanApp")) {
            settings.setUserAgentString(defaultUa + USER_AGENT_SUFFIX);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);
        }

        CookieManager cookies = CookieManager.getInstance();
        cookies.setAcceptCookie(true);
        cookies.setAcceptThirdPartyCookies(webView, true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (uri == null) return true;
                String scheme = uri.getScheme();
                if (scheme != null && (scheme.equals("mailto") || scheme.equals("tel"))) {
                    Intent external = new Intent(Intent.ACTION_VIEW, uri);
                    startActivity(external);
                    return true;
                }
                if (staysInApp(uri)) return false;
                Toast.makeText(
                        LauncherActivity.this,
                        "This link is only available inside Ravikisan.",
                        Toast.LENGTH_SHORT
                ).show();
                return true;
            }
        });
        requestPostNotificationsPermission();
        bridgeNativeFcmToken();

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(
                    WebView view,
                    ValueCallback<Uri[]> callback,
                    FileChooserParams params) {
                if (fileCallback != null) fileCallback.onReceiveValue(null);
                fileCallback = callback;
                fileChooser.launch(params.createIntent());
                return true;
            }
        });

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView != null && webView.canGoBack()) {
                    webView.goBack();
                    return;
                }
                setEnabled(false);
                getOnBackPressedDispatcher().onBackPressed();
            }
        });

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
            return;
        }
        webView.loadUrl(launchUrl());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        if (webView == null) return;
        Uri data = intent.getData();
        if (data != null && staysInApp(data)) webView.loadUrl(data.toString());
    }

    @Override
    protected void onResume() {
        super.onResume();
        bridgeNativeFcmToken();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (webView != null) webView.saveState(outState);
    }

    private String launchUrl() {
        Uri data = getIntent() == null ? null : getIntent().getData();
        if (data != null && staysInApp(data)) return data.toString();
        return getString(R.string.launchUrl);
    }

    private void requestPostNotificationsPermission() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return;
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                == PackageManager.PERMISSION_GRANTED) {
            return;
        }
        requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 7101);
    }

  private void bridgeNativeFcmToken() {
        try {
            FirebaseMessaging.getInstance().getToken()
                    .addOnCompleteListener(task -> {
                        if (!task.isSuccessful() || webView == null) return;
                        String token = task.getResult();
                        if (token == null || token.isEmpty()) return;
                        String escaped = token.replace("\\", "\\\\").replace("'", "\\'");
                        webView.post(() -> webView.evaluateJavascript(
                                "window.__RN_ON_NATIVE_FCM_TOKEN__ && window.__RN_ON_NATIVE_FCM_TOKEN__('"
                                        + escaped
                                        + "')",
                                null));
                    });
        } catch (Throwable ignored) {
            // Firebase not configured locally — ship google-services.json for release builds.
        }
    }

    private static boolean staysInApp(Uri uri) {
        if (uri == null) return false;
        String scheme = uri.getScheme();
        if (scheme == null || !(scheme.equals("https") || scheme.equals("http"))) return false;
        String host = uri.getHost();
        if (host == null) return false;
        String normalized = host.toLowerCase();
        return normalized.equals(SITE_HOST) || normalized.endsWith("." + SITE_HOST)
                || normalized.equals("accounts.google.com")
                || normalized.endsWith(".google.com")
                || normalized.endsWith(".googleapis.com")
                || normalized.endsWith(".gstatic.com")
                || normalized.endsWith(".firebaseapp.com")
                || normalized.endsWith(".web.app");
    }
}
