package com.ravikisan.platform.compose.ui.screens

import android.app.Activity
import android.content.Intent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.ravikisan.platform.compose.BuildConfig

/**
 * Settings — fully wired (Phase 1 placeholders removed):
 * - Account: signed-in status from the real session store; Sign in → `auth`
 *   (Firebase-backed email/password flows); Sign out deregisters FCM first.
 * - Notifications: POST_NOTIFICATIONS permission + FCM registration via
 *   [com.ravikisan.platform.compose.data.fcm.FcmRegistrar], plus the feed at
 *   `notifications`.
 * - About: legal URLs and the real [BuildConfig.VERSION_NAME].
 */
@Composable
fun SettingsScreen(
    onOpenAuth: () -> Unit = {},
    onOpenLogin: () -> Unit = {},
    onOpenNotifications: () -> Unit = {},
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    val context = LocalContext.current

    // Refresh on entry AND on every resume — returning from the auth flow
    // pops back here without recreating the screen.
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_RESUME) viewModel.refresh()
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    LaunchedEffect(Unit) { viewModel.refresh() }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState()),
    ) {
        Text(
            "Settings",
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.padding(16.dp),
        )

        val user = state.user
        SettingsSection("Account")
        if (user != null) {
            SettingsRow(
                title = user.fullName ?: "Signed in",
                subtitle = listOfNotNull(user.email, user.tier?.let { "Tier: $it" }).joinToString(" · "),
                leading = { Icon(Icons.Filled.Person, contentDescription = null) },
            )
            SettingsRow(
                title = "Sign out",
                subtitle = if (state.signingOut) "Signing out…" else (state.message ?: "Deregisters notifications on this device"),
                leading = { Icon(Icons.AutoMirrored.Filled.Logout, contentDescription = null) },
                onClick = viewModel::signOut,
            )
        } else {
            SettingsRow(
                title = "Sign in",
                subtitle = "Email/Password, Google or phone",
                leading = { Icon(Icons.Filled.Person, contentDescription = null) },
                onClick = onOpenLogin,
            )
            SettingsRow(
                title = "Create an account",
                subtitle = "Sync progress across devices",
                onClick = onOpenAuth,
            )
        }
        HorizontalDivider()

        SettingsSection("Notifications")
        SettingsRow(
            title = "Enable push notifications",
            subtitle = "Ask permission and register this device",
            leading = { Icon(Icons.Filled.Notifications, contentDescription = null) },
            onClick = { (context as? Activity)?.let(viewModel::enableNotifications) },
        )
        SettingsRow(
            title = "Notification feed",
            subtitle = "Your likes, replies and mentions",
            onClick = onOpenNotifications,
            showChevron = true,
        )
        HorizontalDivider()

        SettingsSection("About")
        SettingsRow(
            title = "Privacy policy",
            subtitle = "harindrasah.com.np/privacy",
            onClick = { openUrl(context, "https://harindrasah.com.np/privacy") },
        )
        SettingsRow(
            title = "Terms",
            subtitle = "harindrasah.com.np/terms",
            onClick = { openUrl(context, "https://harindrasah.com.np/terms") },
        )
        SettingsRow("Version", "${BuildConfig.VERSION_NAME} (native compose)")
    }
}

private fun openUrl(context: android.content.Context, url: String) {
    runCatching {
        context.startActivity(Intent(Intent.ACTION_VIEW, android.net.Uri.parse(url)))
    }
}

@Composable
private fun SettingsSection(title: String) {
    Text(
        title,
        style = MaterialTheme.typography.labelLarge,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier.padding(start = 16.dp, top = 8.dp, bottom = 4.dp),
    )
}

@Composable
private fun SettingsRow(
    title: String,
    subtitle: String,
    leading: (@Composable () -> Unit)? = null,
    onClick: (() -> Unit)? = null,
    showChevron: Boolean = false,
) {
    ListItem(
        headlineContent = { Text(title) },
        supportingContent = { Text(subtitle) },
        leadingContent = leading,
        trailingContent = if (showChevron) {
            { Icon(Icons.Filled.ChevronRight, contentDescription = null) }
        } else {
            null
        },
        modifier = if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier,
    )
}
