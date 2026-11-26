package com.ravikisan.platform.compose.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

/*
 * Color schemes mirror the website's "Modern Neb" (light) and
 * "Deep Slate" (dark) themes — see Color.kt for the token source map.
 */

private val LightColors = lightColorScheme(
    primary = RnPrimary,
    onPrimary = RnOnPrimary,
    primaryContainer = RnPrimary.copy(alpha = 0.14f),
    onPrimaryContainer = RnPrimary,
    secondary = RnSecondary,
    onSecondary = RnOnPrimary,
    background = RnBackground,
    onBackground = RnOnBackground,
    surface = RnSurface,
    onSurface = RnOnSurface,
    surfaceVariant = RnSurfaceVariant,
    onSurfaceVariant = RnOnSurfaceVariant,
    outline = RnOutline,
    outlineVariant = RnOutline,
    error = RnError,
)

private val DarkColors = darkColorScheme(
    primary = RnPrimaryDark,
    onPrimary = RnOnPrimaryDark,
    primaryContainer = RnPrimaryDark.copy(alpha = 0.20f),
    onPrimaryContainer = RnOnBackgroundDark,
    secondary = RnSecondaryDark,
    onSecondary = RnOnBackgroundDark,
    background = RnBackgroundDark,
    onBackground = RnOnBackgroundDark,
    surface = RnSurfaceDark,
    onSurface = RnOnSurfaceDark,
    surfaceVariant = RnSurfaceVariantDark,
    onSurfaceVariant = RnOnSurfaceVariantDark,
    outline = RnOutlineDark,
    outlineVariant = RnOutlineDark,
    error = RnErrorDark,
)

@Composable
fun RnTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColors else LightColors,
        content = content,
    )
}
