package com.ravikisan.platform.compose.ui.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * Compose port of legacy SettingsFragment (Phase 1 quick win, plan §3.1).
 * Rows are static for now; actions wire to /api/v2/meta legal URLs in Phase 2.
 */
@Composable
fun SettingsScreen() {
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
        SettingsSection("Account")
        SettingsRow("Sign in", "Native auth lands in Phase 3")
        SettingsRow("Notifications", "FCM registration lands in Phase 3")
        HorizontalDivider()
        SettingsSection("About")
        SettingsRow("Privacy policy", "harindrasah.com.np/privacy")
        SettingsRow("Terms", "harindrasah.com.np/terms")
        SettingsRow("Version", "0.1.0 (native compose)")
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
private fun SettingsRow(title: String, subtitle: String) {
    ListItem(
        headlineContent = { Text(title) },
        supportingContent = { Text(subtitle) },
    )
}
