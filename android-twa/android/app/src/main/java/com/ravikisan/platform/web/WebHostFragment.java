package com.ravikisan.platform.web;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.firebase.messaging.FirebaseMessaging;
import com.ravikisan.platform.BuildConfig;
import com.ravikisan.platform.R;
import com.ravikisan.platform.security.SecureDeepLink;
import com.ravikisan.platform.session.SessionManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Full study site inside the APK (replaces JSON placeholder tabs).
 */
public class WebHostFragment extends Fragment {
    /** Login shell: web session cookie appeared — mirror into native SessionManager. */
    public interface WebAuthListener {
        void onWebAuthMaybeReady();
    }

    private static final String ARG_PATH = "startPath";
    private WebView webView;
    private String currentPath = "/home/member";
    private WebAuthListener webAuthListener;

    public void setWebAuthListener(@Nullable WebAuthListener listener) {
        webAuthListener = listener;
    }

    public static WebHostFragment newInstance(String startPath) {
        WebHostFragment f = new WebHostFragment();
        Bundle b = new Bundle();
        b.putString(ARG_PATH, SecureDeepLink.sanitizePath(startPath));
        f.setArguments(b);
        return f;
    }

    @Nullable
    @Override
    public View onCreateView(
            @NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_web_host, container, false);
    }

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        webView = view.findViewById(R.id.web_host);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setSupportMultipleWindows(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setUserAgentString(
                settings.getUserAgentString()
                        + " RavikisanAndroid/"
                        + BuildConfig.VERSION_NAME
                        + " ("
                        + com.ravikisan.platform.security.SecurityContract.PACKAGE_ID
                        + ")");

        webView.addJavascriptInterface(new NativeJsBridge(requireContext()), "RnNative");
        PlatformWebViewClient viewClient = new PlatformWebViewClient(this);
        webView.setWebViewClient(viewClient);
        webView.setWebChromeClient(new PlatformWebChromeClient(viewClient));

        Bundle args = getArguments();
        if (args != null) {
            currentPath = args.getString(ARG_PATH, currentPath);
        }
        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            loadPath(currentPath);
        }
    }

    public void loadPath(String path) {
        if (webView == null) return;
        currentPath = SecureDeepLink.sanitizePath(path);
        WebSessionCookies.syncFromNativeSession(requireContext());
        String url = BuildConfig.API_BASE + currentPath;
        Map<String, String> headers = authHeaders();
        if (headers.isEmpty()) {
            webView.loadUrl(url);
        } else {
            webView.loadUrl(url, headers);
        }
    }

    private Map<String, String> authHeaders() {
        Map<String, String> headers = new HashMap<>();
        String token = new SessionManager(requireContext()).getAccessToken();
        if (token != null && !token.isEmpty()) {
            headers.put("Authorization", "Bearer " + token);
        }
        return headers;
    }

    public String getCurrentPath() {
        return currentPath;
    }

    public boolean canGoBack() {
        return webView != null && webView.canGoBack();
    }

    public boolean goBack() {
        if (webView == null || !webView.canGoBack()) return false;
        webView.goBack();
        return true;
    }

    @Override
    public void onResume() {
        super.onResume();
        WebSessionCookies.syncFromNativeSession(requireContext());
        if (webView != null) {
            webView.onResume();
        }
    }

    @Override
    public void onPause() {
        if (webView != null) {
            webView.onPause();
        }
        super.onPause();
    }

    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        if (webView != null) {
            webView.saveState(outState);
        }
    }

    @Override
    public void onDestroyView() {
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        super.onDestroyView();
    }

    private void injectNativeBootstrap(WebView view) {
        String js =
                "(function(){"
                        + "window.__RN_NATIVE_ANDROID__=true;"
                        + "document.documentElement.classList.add('rn-native-android');"
                        + "window.__RN_ANDROID_VERSION__='"
                        + BuildConfig.VERSION_NAME.replace("'", "")
                        + "';"
                        + "})();";
        view.evaluateJavascript(js, null);
    }

    private void pushNativeFcmToken(WebView view) {
        FirebaseMessaging.getInstance()
                .getToken()
                .addOnCompleteListener(task -> {
                    if (!isAdded() || !task.isSuccessful() || task.getResult() == null) return;
                    String token = task.getResult().replace("\\", "\\\\").replace("'", "\\'");
                    String js =
                            "if(window.__RN_ON_NATIVE_FCM_TOKEN__)window.__RN_ON_NATIVE_FCM_TOKEN__('"
                                    + token
                                    + "');";
                    view.evaluateJavascript(js, null);
                });
    }

    /** Called from PlatformWebViewClient after each finished load. */
    void onPlatformPageFinished(WebView view) {
        if (!isAdded() || webView != view) return;
        injectNativeBootstrap(view);
        pushNativeFcmToken(view);
        if (webAuthListener != null) {
            webAuthListener.onWebAuthMaybeReady();
        }
    }
}