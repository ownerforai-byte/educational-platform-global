package com.ravikisan.platform.compose.navigation

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.ravikisan.platform.compose.ui.theme.RnTheme

/*
 * Day-1 stub destinations owned by the app shell (Agent 1).
 *
 * Feature screens live in their owners' folders (Agent 3: auth,
 * Agent 4: study/search/practice/ai/social/profile). Until those land,
 * each route renders this placeholder so navigation, deep links and the
 * back stack are testable end-to-end. Swapping a stub for a real screen
 * is a one-line change in RnNavHost.kt.
 */
@Composable
fun StubScreen(title: String, modifier: Modifier = Modifier) {
    Surface(modifier = modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.headlineSmall,
                color = MaterialTheme.colorScheme.onBackground,
            )
            Text(
                text = "Coming in an upcoming phase — see docs/guides/android-native-STATUS.md",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

@Preview(name = "Stub — light", showBackground = true)
@Composable
private fun StubScreenLightPreview() {
    RnTheme(darkTheme = false) {
        StubScreen("Learn")
    }
}

@Preview(name = "Stub — dark", showBackground = true)
@Composable
private fun StubScreenDarkPreview() {
    RnTheme(darkTheme = true) {
        StubScreen("Learn")
    }
}
