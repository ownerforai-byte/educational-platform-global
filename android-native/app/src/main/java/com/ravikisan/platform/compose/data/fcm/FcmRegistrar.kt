package com.ravikisan.platform.compose.data.fcm

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.content.ContextCompat
import com.google.firebase.messaging.FirebaseMessaging
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.api.AuthRepository
import com.ravikisan.platform.compose.data.session.SessionStore
import com.ravikisan.platform.compose.core.contract.FcmRegistrationRequest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * FCM registration → `POST /api/access-requests/fcm` (auth required).
 * Mirrors legacy `FcmRegistrar`: silent best-effort on app open, retried next open.
 *
 * The Firebase SDK is only initialized when `google-services.json` exists (build-time
 * plugin is conditional); without it [token] fails and we no-op.
 */
class FcmRegistrar(
    private val context: Context,
    private val api: RnApi,
    private val session: SessionStore,
) {

    /** Request POST_NOTIFICATIONS on Android 13+ (call from an Activity context). */
    fun requestPermissionIfNeeded(activity: android.app.Activity) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) ==
            PackageManager.PERMISSION_GRANTED
        ) {
            return
        }
        androidx.core.app.ActivityCompat.requestPermissions(
            activity,
            arrayOf(Manifest.permission.POST_NOTIFICATIONS),
            REQUEST_CODE,
        )
    }

    /** Register the current FCM token for the signed-in user (fire-and-forget). */
    fun registerForSignedInUser(scope: CoroutineScope = CoroutineScope(Dispatchers.IO)) {
        if (!session.isSignedIn) return
        FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
            val token = task.result
            if (!FcmTokenPolicy.isValid(token)) return@addOnCompleteListener
            scope.launch {
                runCatching { api.registerFcmToken(FcmRegistrationRequest(token)) }
                    .onFailure { /* retry on next app open (legacy rule) */ }
            }
        }
    }

    /** Sign-out: best-effort server-side deregistration, then local session wipe. */
    suspend fun unregisterAndSignOut(authRepository: AuthRepository) {
        runCatching { api.unregisterFcmToken() }
        authRepository.signOut()
    }

    private companion object {
        const val REQUEST_CODE = 9102
    }
}
