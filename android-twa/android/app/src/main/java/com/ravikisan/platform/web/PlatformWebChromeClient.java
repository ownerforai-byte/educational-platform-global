package com.ravikisan.platform.web;

import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;

/** window.open / target=_blank stays in the same WebView (no external browser). */
public class PlatformWebChromeClient extends WebChromeClient {
    private final PlatformWebViewClient viewClient;

    public PlatformWebChromeClient(@NonNull PlatformWebViewClient viewClient) {
        this.viewClient = viewClient;
    }

    @Override
    public boolean onCreateWindow(
            WebView view, boolean isDialog, boolean isUserGesture, android.os.Message resultMsg) {
        WebView.HitTestResult result = view.getHitTestResult();
        String data = result != null ? result.getExtra() : null;
        if (data != null) {
            view.loadUrl(data);
            return false;
        }
        WebView child = new WebView(view.getContext());
        child.setWebViewClient(
                new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView v, String url) {
                        view.loadUrl(url);
                        return true;
                    }
                });
        WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
        transport.setWebView(child);
        resultMsg.sendToTarget();
        return true;
    }
}