package com.ravikisan.platform.compose.ui.theme

import androidx.compose.ui.graphics.Color

/*
 * Real brand tokens — mirrored from the website design system
 * (frontend/app/globals.css, "Modern Neb" light + "Deep Slate" dark themes).
 * HSL values converted to hex 1:1; keep both sides in sync when the web
 * palette changes.
 */

// ── Light (Modern Neb) ──────────────────────────────────────────────────────
val RnPrimary = Color(0xFF0B64F4)          // --primary: 217 91% 50%
val RnOnPrimary = Color(0xFFFFFFFF)        // --primary-foreground: 0 0% 100%
val RnBackground = Color(0xFFF8FAFC)       // --background: 210 40% 98%
val RnOnBackground = Color(0xFF020A1C)     // --foreground: 222.2 84% 6%
val RnSurface = Color(0xFFFFFFFF)          // --card: 0 0% 100%
val RnOnSurface = Color(0xFF020A1C)        // --card-foreground
val RnSurfaceVariant = Color(0xFFE7ECF3)   // --muted: 214 32% 93%
val RnOnSurfaceVariant = Color(0xFF566376) // --muted-foreground: 215 16% 40%
val RnOutline = Color(0xFFD9DFE8)          // --border: 214 24% 88%
val RnSecondary = Color(0xFF047895)        // --accent-cyan: 192 95% 30%
val RnError = Color(0xFFD90D2F)            // --accent-rose: 350 89% 45%

// Subject accents (light) — for chips/badges once feature UI lands.
val RnSubjectPhysics = Color(0xFF986206)    // --subject-physics: 38 92% 31%
val RnSubjectChemistry = Color(0xFF047895)  // --subject-chemistry: 192 95% 30%
val RnSubjectBiology = Color(0xFF0B7F54)    // --subject-biology: 158 84% 27%
val RnSubjectMaths = Color(0xFF732DEB)      // --subject-mathematics: 262 83% 55%
val RnSubjectEnglish = Color(0xFF0B64F4)    // --subject-english: 217 91% 50%
val RnSubjectNepali = Color(0xFFB84F05)     // --subject-nepali: 25 95% 37%

// ── Dark (Deep Slate) ───────────────────────────────────────────────────────
val RnPrimaryDark = Color(0xFF3C83F6)       // .dark --primary: 217 91% 60%
val RnOnPrimaryDark = Color(0xFF0F172A)     // .dark --primary-foreground
val RnBackgroundDark = Color(0xFF0E1525)    // .dark --background: 222 47% 10%
val RnOnBackgroundDark = Color(0xFFF8FAFC)  // .dark --foreground: 210 40% 98%
val RnSurfaceDark = Color(0xFF1A2333)       // .dark --card: 217 33% 15%
val RnOnSurfaceDark = Color(0xFFF8FAFC)     // .dark --card-foreground
val RnSurfaceVariantDark = Color(0xFF27303F)  // .dark --muted: 217 24% 20%
val RnOnSurfaceVariantDark = Color(0xFF9DABBE) // .dark --muted-foreground: 215 20% 68%
val RnOutlineDark = Color(0xFF313A49)       // .dark --border: 217 20% 24%
val RnSecondaryDark = Color(0xFF049578)     // .dark --accent-cyan: 192 95% 58%
val RnErrorDark = Color(0xFFF6657D)         // .dark --accent-rose: 350 89% 68%
