package com.ravikisan.platform.compose

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.ravikisan.platform.compose.navigation.PendingRoute
import com.ravikisan.platform.compose.navigation.RnNavHost
import com.ravikisan.platform.compose.navigation.Routes
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
        handleIntent(intent)
        setContent {
            RnTheme {
                RnNavHost()
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        handleIntent(intent)
    }

    /**
     * FCM tap-through deep links: [RnFirebaseMessagingService] puts
     * `navigateTo` (+ `roomId` for chat messages) on the launch intent. The
     * target route is posted to [PendingRoute]; the shell navigates once the
     * NavHost is up. Realtime chat rooms live in the Community surface until
     * a dedicated chat-room route lands — `roomId` is reserved for it.
     */
    private fun handleIntent(intent: Intent?) {
        val navigateTo = intent?.getStringExtra(EXTRA_NAVIGATE_TO) ?: return
        val roomId = intent.getStringExtra(EXTRA_ROOM_ID)
        val target = when (navigateTo) {
            "chat" -> Routes.COMMUNITY
            "notifications" -> Routes.NOTIFICATIONS
            else -> return
        }
        PendingRoute.post(target)
    }

    companion object {
        /** Owner-controlled kill switch for the screenshot block. */
        const val ALLOW_SCREEN_CAPTURE: Boolean = false

        /** Extra keys written by [RnFirebaseMessagingService] (keep in sync). */
        const val EXTRA_NAVIGATE_TO: String = "navigateTo"
        const val EXTRA_ROOM_ID: String = "roomId"
    }
}
