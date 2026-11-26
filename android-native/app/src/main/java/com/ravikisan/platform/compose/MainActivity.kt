package com.ravikisan.platform.compose

import android.os.Build
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.ravikisan.platform.compose.navigation.RnNavHost
import com.ravikisan.platform.compose.ui.theme.RnTheme
import dagger.hilt.android.AndroidEntryPoint

/**
 * Single-activity Compose host (plan §2.1). Owns the back stack, deep links and
 * configuration changes — no WebView on the default user path.
 *
 * Security hardening (owner directive: "no one after installation can steal
 * any data from it"):
 * - [FLAG_SECURE] blocks screenshots, screen recording, and non-secure
 *   displays for the WHOLE app — nothing on screen can be captured by other
 *   apps, and the Recents switcher shows a blank card instead of a content
 *   thumbnail. Trade-off (owner-approved default): the student also cannot
 *   screenshot their own notes; flip [ALLOW_SCREEN_CAPTURE] to lift it.
 * - [setRecentsScreenshotEnabled] = false (API 31+) stops the system from
 *   caching a task screenshot for the Recents UI at all.
 * - Data at rest is already protected: `allowBackup=false`, data-extraction
 *   rules exclude cloud backup AND device transfer, the session lives in
 *   EncryptedSharedPreferences, and the Room cache holds only public
 *   curriculum payloads (no tokens, no PII).
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (!ALLOW_SCREEN_CAPTURE) {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_SECURE,
                WindowManager.LayoutParams.FLAG_SECURE,
            )
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            setRecentsScreenshotEnabled(false)
        }
        enableEdgeToEdge()
        setContent {
            RnTheme {
                RnNavHost()
            }
        }
    }

    companion object {
        /** Owner-controlled kill switch for the screenshot block. */
        const val ALLOW_SCREEN_CAPTURE: Boolean = false
    }
}
