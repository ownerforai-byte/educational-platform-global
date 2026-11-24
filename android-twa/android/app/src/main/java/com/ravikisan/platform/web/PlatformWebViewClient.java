package com.ravikisan.platform.web;

import android.content.Intent;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.ravikisan.platform.BuildConfig;
import com.ravikisan.platform.R;
import com.ravikisan.platform.security.SecureDeepLink;
import com.ravikisan.platform.security.SecurityContract;

/**
 * Keeps harindrasah.com.np (and auth hosts) inside the WebView — never Chrome Custom Tabs.
 */
public class PlatformWebViewClient extends WebViewClient {
    private final Fragment host;

    public PlatformWebViewClient(@NonNull Fragment host) {
        this.host = host;
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        Uri uri = request != null ? request.getUrl() : null;
        return routeUri(view, uri);
    }

    @Override
    @SuppressWarnings("deprecation")
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        return routeUri(view, url != null ? Uri.parse(url) : null);
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
        if (host instanceof WebHostFragment) {
            ((WebHostFragment) host).onPlatformPageFinished(view);
        }
    }

    private boolean routeUri(WebView view, Uri uri) {
        if (uri == null) return true;
        String scheme = uri.getScheme();
        if ("rn".equals(scheme) && "app".equals(uri.getHost())) {
            String path = SecureDeepLink.sanitizePath(uri.getPath());
            view.loadUrl(BuildConfig.API_BASE + path);
            return true;
        }
        if (AllowedWebOrigin.isAllowed(uri)) {
            return false;
        }
        if ("mailto".equalsIgnoreCase(scheme) || "tel".equalsIgnoreCase(scheme)) {
            Intent i = new Intent(Intent.ACTION_VIEW, uri);
            host.startActivity(Intent.createChooser(i, host.getString(R.string.settings_contact_support)));
            return true;
        }
        if ("https".equalsIgnoreCase(scheme)) {
            String host = uri.getHost() != null ? uri.getHost() : "";
            if (host.equalsIgnoreCase(SecurityContract.API_HOST)
                    || host.endsWith("." + SecurityContract.API_HOST)) {
                return false;
            }
        }
        return true;
    }
}