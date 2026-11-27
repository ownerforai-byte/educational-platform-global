package com.ravikisan.platform.compose.ui.components.placeholder

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.ravikisan.platform.compose.ui.theme.RnTheme

/**
 * The ONE honest placeholder used by every "Coming to native" stub route
 * (parity plan §0.6 — built once, used by all stubs; Worker 1 renders it for
 * sections whose screen has not shipped yet).
 *
 * Parity rule it implements: until a section ships, the app shows an honest
 * placeholder — never a silent gap, never a web page pretending to be the app.
 */
@Composable
fun ComingToNative(sectionTitle: String, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant,
        ),
    ) {
        Column(
            modifier = Modifier.padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            Text(
                text = sectionTitle,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.onSurface,
            )
            Text(
                text = "Coming to native",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Text(
                text = "This section is being ported from the website — tracked in the native parity plan. Nothing is missing by accident.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

@Preview(name = "Coming to native — light")
@Composable
private fun ComingToNativeLightPreview() {
    RnTheme(darkTheme = false) {
        ComingToNative("Past Year Questions")
    }
}

@Preview(name = "Coming to native — dark")
@Composable
private fun ComingToNativeDarkPreview() {
    RnTheme(darkTheme = true) {
        ComingToNative("Past Year Questions")
    }
}
