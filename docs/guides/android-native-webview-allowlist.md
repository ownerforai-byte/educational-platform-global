# android-native — WebView allowlist

Phase 0 leftover from the migration plan (§2.1): any `WebView` usage in the
native app must be an **explicit, documented fallback**, never a default path.

## Current allowlist: EMPTY

The native app (`android-native/`) ships **zero WebView composables**. Every
student journey — auth, syllabus, notes, search, practice, AI tutor — is native
Compose over `/api/*`. There is nothing to allowlist yet.

## Rules for adding an entry

1. **Explicit route only.** A WebView may render exactly one named fallback
   route, listed in the table below with its justification. No generic
   "open URL in app" surface.
2. **Same-origin constraint.** The WebView may only load
   `https://harindrasah.com.np` origins, enforced in code (mirror
   `core/network/RedirectPolicy.kt` same-origin logic) — never arbitrary
   third-party URLs.
3. **Network config already applies.** `network_security_config.xml` (SPKI
   pins, cleartext disabled) and `usesCleartextTraffic=false` cover WebView
   traffic too; do not weaken them for a fallback.
4. **No cookies crossing the boundary.** Native auth uses bearer tokens via
   `data/session/SessionManager` (EncryptedSharedPreferences). A fallback
   WebView must NOT share or mirror session cookies with the native session
   (legacy `WebSessionCookies` pattern is retired by plan §3.2).
5. **Debugging off in release.** `WebView.setWebContentsDebuggingEnabled(false)`
   on release builds (legacy SECURITY.md rule carries over).
6. **Burn-down.** Every entry needs a removal trigger (the native screen that
   replaces it) and an owner. Entries only go down, per plan §2.1.

## Allowlist table

| Route | Justification | Replaced by | Owner | Status |
|-------|---------------|-------------|-------|--------|
| — | *(empty — no WebView in the native app)* | — | — | — |

## Related decisions pending

- **Labs / mindmaps** (plan Phase 7): 3D labs and SVG mindmaps are the only
  candidates for a retained-WebView fallback. Decision tracked in
  `docs/guides/android-native-labs-decision.md` (Agent 4). If that decision
  lands on "retained WebView", the route(s) get added here under the rules
  above — not before.
