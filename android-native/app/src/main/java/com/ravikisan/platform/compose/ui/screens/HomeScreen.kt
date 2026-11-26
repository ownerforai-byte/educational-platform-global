package com.ravikisan.platform.compose.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * Phase 1 placeholder. Replaced by the P0 home bundle (plan §5) once the
 * Phase 2 data layer lands.
 */
@Composable
fun HomeScreen() {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("Ravikisan", style = MaterialTheme.typography.headlineMedium)
        Text(
            "Native shell scaffolded — Phase 2 (API & data layer) next.",
            style = MaterialTheme.typography.bodyMedium,
        )
    }
}
