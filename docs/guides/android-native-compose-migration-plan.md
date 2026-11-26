# Android native migration plan — Kotlin + Jetpack Compose

**Status:** Phase 1 complete (~5–8%).  
**👉 Agents (owner assigns 1–5):** [`android-native-AGENTS.md`](android-native-AGENTS.md) **← one document, your section only.**  
**Done log & §7 CONTINUE:** [`android-native-STATUS.md`](android-native-STATUS.md).  
**Target outcome:** **Build** a **complete native client** (Kotlin + Compose + APIs) while **keeping every existing product running** — website, backend, and the current Play Store app.  
**Delivery model:** **Parallel tracks** — **create** the native app; **do not remove, replace, or gut** the legacy Android shell until an explicit, approved store promotion (see §1.1).  
**Legacy codebase (untouched in place):** `android-twa/android` — Java + XML + `WebHostFragment` (continues to build, ship, and receive critical fixes).  
**Native codebase (exists):** `android-native/` — Kotlin + Compose (`com.ravikisan.platform.compose`).  
**Companion systems:** `frontend/` (Next.js, 300+ routes), `backend/` (Express `/api/*`), `packages/shared` (`@rn/shared`), **Firebase** (same project as web + current APK)

---

## 0. Multi-agent execution — 4 workers + Supervisor (Agent 5)

> **All agent instructions (who you are, paths, tasks) are in ONE file:**  
> **[`android-native-AGENTS.md`](android-native-AGENTS.md)** — owner says *“You are Agent N”* → read **only** that section.  
> This plan §0 is summary only; **do not** use split docs (they redirect to AGENTS.md).

### 0.0 Roles (pick one)

| Role | Who | Builds product code? | Waits on others? |
|------|-----|----------------------|------------------|
| **Worker 1** | Platform / nav / CI | Yes | **Never** — stub all routes early |
| **Worker 2** | Backend `/api/mobile/*` | Yes | **Never** — additive only |
| **Worker 3** | Network / Room / auth | Yes | **Never** |
| **Worker 4** | All student UI (study + practice + AI + social) | Yes | **Never** — **local fakes only** |
| **Supervisor 5** | Oversees 1–4 | **No feature code** | N/A — watches all |

**No-wait rule (workers):** If you need another worker’s output, use **`featureLocal/fakes/`** in your package, **`@Preview`**, or **`src/test/resources/fixtures/`** under your owned tree. Log an **INTEGRATION REQUEST** in your checkpoint; **keep implementing the next task** in your backlog. **Stopping to wait is a violation** unless Supervisor says STOP.

**Supervisor rule:** You **do not** implement screens, endpoints, or repos. You: read §4 + all checkpoints, update [`android-native-integration-queue.md`](android-native-integration-queue.md), write **CONTINUE** orders in STATUS **§7**, run `assembleDebug` / `test:affected` when merging guidance, resolve path disputes.

### 0.1 Mandatory session report (every interval — workers + supervisor)

At **start** and **end** of every session (or every **~90 minutes** on long runs), output a **Session checkpoint** in chat and append to STATUS (**Workers → §4**; **Supervisor → §4 summary + §7 directives**).

```text
═══════════════════════════════════════════════════════════════
SESSION CHECKPOINT — android-native migration
═══════════════════════════════════════════════════════════════
Role:           [Worker 1|2|3|4 | Supervisor 5]
Supervised by:  Agent 5 (Supervisor) — [N/A if you are Supervisor]
Date / session: YYYY-MM-DD

── AIM (restate — include that Supervisor guides workers) ───────
[3–6 sentences: parallel native app; legacy untouched; my role;
 I do / do not wait on other workers per §0.0.]

── SUPERVISOR DIRECTIVE (workers only) ─────────────────────────
• Last §7 instruction to me: [quote or "none yet — continue backlog"]
• My integration requests pending: [none | listed]

── COMPLETED THIS INTERVAL ─────────────────────────────────────
1. [...]

── VERIFIED ───────────────────────────────────────────────────
• [gradlew / vitest commands + BUILD SUCCESSFUL / test counts]

── CONTINUOUS NEXT (workers: never empty) ─────────────────────
• Next task I start immediately: [...]
• Backlog item after that: [...]

── INTEGRATION REQUEST (if any) ─────────────────────────────────
[Copy INTEGRATION REQUEST block for Supervisor queue]

── SUPERVISOR ONLY: WORKER STATUS ─────────────────────────────
• W1: [CONTINUE / blocked / …]
• W2: [...]
• W3: [...]
• W4: [...]
• Integration batch for W1: [...]

── FILES TOUCHED ───────────────────────────────────────────────
• path → [IMPORTANT CORE FILE] | [CONTENT FILE]
═══════════════════════════════════════════════════════════════
```

**Workers:** `npm run classify -- <paths>`; native `assembleDebug` each session.  
**Supervisor:** verify workers’ builds when issuing integration batches; **do not** edit worker-owned Kotlin except queue-driven **W1** nav merges you assign explicitly to Worker 1 in §7.

### 0.2 Four workers — parallel, zero blocking

| Worker | Field | ~% left | Start | Owns |
|:------:|-------|---------|:-----:|------|
| **1** | Platform, navigation, release | ~20% | **Now** | Gradle, manifest, theme, **`RnNavHost` + stub routes for ALL features day 1**, CI, README/Firebase docs |
| **2** | Backend mobile API | ~10% | **Now** | `backend/src/api/mobile/**`, contract tests, `docs/api/mobile-*` |
| **3** | Networking, data, auth | ~25% | **Now** | `core/**`, `data/**`, auth UI, FCM, SSE okhttp helper in `core/stream/` |
| **4** | **Product experience (all UI)** | ~45% | **Now** | Study, search, reader, practice, quiz, AI chat, social, profile, labs decision — **each package has its own fakes** |

**Worker 1 day-1 requirement:** Register **placeholder destinations** (Study, Practice, AI, Community, Profile, Auth) in `Routes` + `RnNavHost` so Worker 4 can hook real composables later **without waiting**.

**Worker 4 fake rule:** Each folder `ui/screens/<feature>/local/` may contain `Fake*Repository.kt` and sample JSON — **forbidden** to import another worker’s unfinished `core` types until Supervisor marks queue item **Resolved**.

Detailed paths: **[`android-native-AGENT-SPLIT.md`](android-native-AGENT-SPLIT.md)**.

### 0.3 Worker 1 — Platform, navigation & release

| # | Task |
|---|------|
| 1 | CI `android-native-assemble` |
| 2 | Brand theme tokens |
| 3 | **Stub routes** for every feature area (empty composables OK) |
| 4 | Deep links + intent filters |
| 5 | Process integration queue items (manifest permissions, Gradle deps) |
| 6 | Firebase / Play runbook in `android-native/README.md` |

### 0.4 Worker 2 — Backend & API contracts

| # | Task |
|---|------|
| 1 | Mount `/api/mobile` |
| 2 | Home / syllabus / note-summary contracts |
| 3 | Pagination for feeds |
| 4 | Vitest per route |
| 5 | Document endpoints in `docs/api/` (Worker 4 may read; not required to wait) |

### 0.5 Worker 3 — Networking, data & authentication

| # | Task |
|---|------|
| 1 | OkHttp + Retrofit + native client headers |
| 2 | Room + WorkManager |
| 3 | Auth screens |
| 4 | FCM registration |
| 5 | Shared `core/contract/` (optional merge; Worker 4 keeps local fakes until Supervisor says swap) |
| 6 | `core/stream/SseClient.kt` for Worker 4 AI (interface stable early) |

### 0.6 Worker 4 — Product experience (all student UI)

| # | Task |
|---|------|
| 1 | Syllabus → unit lists |
| 2 | Note reader + math spike |
| 3 | Search UI |
| 4 | Offline UX (local state first) |
| 5 | Practice + quiz |
| 6 | Veer chat UI + SSE (use `SseClient` when ready, else fake stream) |
| 7 | Community, profile, notifications |
| 8 | `android-native-labs-decision.md` + labs/mindmaps |

**Work continuously** down this list; skip only what is **actively** integrating per §7, not what is “waiting on Worker 3.”

### 0.7 Supervisor 5 — watch, guide, integrate (no feature code)

| # | Task |
|---|------|
| 1 | Read all worker checkpoints each session |
| 2 | Maintain `android-native-integration-queue.md` |
| 3 | Append STATUS **§7** with per-worker **CONTINUE** + priorities |
| 4 | Assign Worker 1 integration batches (routes, Gradle, manifest) |
| 5 | Flag boundary violations (wrong paths, legacy edits) |
| 6 | Track plan §6 phase %; call for Phase 8 review when gates met |
| 7 | **Never** idle waiting on workers — if quiet, audit backlog vs AGENT-SPLIT checklists |

**Supervisor may edit:** `android-native-STATUS.md` (§4/§5/§7), `android-native-integration-queue.md`, plan/AGENT-SPLIT **wording only** for coordination (not worker Kotlin).

### 0.8 Program complete

Plan §6 **Phase 8** promotion — Supervisor confirms all four worker checklists + integration queue **Resolved** before owner approves production switch.

---

## 1. Executive summary

| Dimension | Today | Target |
|-----------|--------|--------|
| Language | Java | **Kotlin** |
| UI | XML + Material + **WebView (≈95% of product)** | **Jetpack Compose** |
| Navigation | Fragment swaps loading web paths | **Navigation Compose** + typed destinations |
| Data | Cookies + `HttpURLConnection` + partial Room cache | **Repository layer** + OkHttp/Ktor + Room/DataStore |
| Auth | WebView `/login` → cookie mirroring | **Native auth** (email/password API + Google Sign-In SDK) |
| Content | Live site at `harindrasah.com.np` | **JSON APIs** (+ local cache); HTML only eliminated |

**Scope honesty:** The website has **~307 App Router pages** and rich web-only surfaces (3D labs, SVG mindmaps, KaTeX-heavy readers). A “Facebook/Instagram/Gemini-style” app is achievable for **core student journeys** (auth, home, syllabus, notes, practice, AI tutor, profile, notifications) in phased delivery. Some **operator/owner/admin** and **edge marketing** routes may remain web-only or ship later. Labs/mindmaps need an explicit **native vs retained-WebView** decision in Phase 7.

**Estimated shape:** Multi-quarter program (not a single sprint). **Production Play users stay on the legacy app** until native passes gates; native ships on **internal/closed tracks** (or a side-by-side `applicationId` for dev) first. Optional **single-listing promotion** reuses existing Play assets (signing, policies, Firebase) — no second store onboarding.

---

## 1.1 Parallel delivery mandate (non-negotiable)

This program **adds** a native Android product path. It does **not** authorize breaking or deleting what already works.

| Asset | Rule during native build |
|-------|---------------------------|
| **Website** (`frontend/`, Vercel) | **No breaking changes.** Ship web as today. Native-only API fields are **additive**. |
| **Backend** (`backend/`) | **No breaking changes** to `/api/auth`, `/api/content`, etc. New routes under `/api/mobile/*` or `/api/v2/*` optional. |
| **Legacy Android** (`android-twa/android`) | **Keep building and releasable.** No mass deletion of Java/WebView code for “cleanup.” Critical fixes and Play policy updates land here until promotion. |
| **New native Android** (to create) | **Greenfield Kotlin/Compose app** in a **separate tree/module**, own `settings.gradle` entry or sibling project. |
| **PWA** | Unchanged; not removed for native sake. |
| **Content corpus** | Unchanged; native reads via API, never forks `content/**` in the APK as source of truth. |

**Explicit prohibitions until a written “promotion” decision:**

- Do **not** delete `WebHostFragment`, `LoginActivity`, or legacy `MainActivity` to “make room” for Compose.
- Do **not** convert legacy `:app` in-place into Compose-only (no ripping Java out of the shipping module).
- Do **not** change `com.ravikisan.platform` **production** track to native-only without staged testing and rollback AAB.
- Do **not** remove `frontend/lib/native-android.ts` or web behaviors until **both** apps no longer need them (legacy may need them indefinitely).

**Allowed parallel work:**

- Two APKs on a developer phone (different `applicationId` for native **dev** — e.g. `com.ravikisan.platform.compose` — while legacy keeps `com.ravikisan.platform`).
- Shared **Firebase project**, **upload keystore**, `key.properties`, privacy URLs, and Play Console **same app listing** when promoting.
- Copy patterns from legacy **security** (`SECURITY.md`, `X-Rn-Client`, cert headers) into native `core/` — read-only reference, not a merge into legacy.

**Promotion (future, optional):** When native meets Phase 8 DoD, upload native AAB to **internal → closed → production** with **higher `versionCode`**, same listing, same `applicationId` if desired; **archive** legacy module in repo (`android-twa/android-legacy/`) but only after rollback was proven. **Default plan: create native; keep legacy until promotion — not replace-by-default.**

```text
                    ┌─────────────────────────────────┐
  Production ──────►│ Legacy APK (Java + WebView)     │◄── Play default users
  (today)         │ android-twa/android             │
                    └─────────────────────────────────┘
                                      │
                    same Firebase,    │  parallel repo work
                    same API,         ▼
                    same keystore   ┌─────────────────────────────────┐
  Internal/closed ─►│ Native APK (Kotlin + Compose)  │◄── testers only
  (new)             │ android-native/ (new)          │    until promotion
                    └─────────────────────────────────┘
```

---

## 1.2 Tooling — Firebase CLI and what’s already available

**Use official CLIs and repo tooling instead of hand-rolling** Play/Firebase setup. Play Console and Firebase are **already configured** for `com.ravikisan.platform`; native work **reuses** that project and only adds config where needed (e.g. second Android app in Firebase for side-by-side `applicationId`, or reuse the same Android app entry when using one package).

### Firebase CLI (`firebase`)

| Task | Command / action |
|------|------------------|
| Login & project | `firebase login` · `firebase use <project-id>` (same project as `firebase/functions` and web) |
| List Android apps | `firebase apps:list ANDROID` |
| Download `google-services.json` | `firebase apps:sdkconfig ANDROID <appId>` → native module `app/google-services.json` (gitignored; copy from legacy path per `android-twa/README.md`) |
| App Distribution (native betas) | `firebase appdistribution:distribute app-release.apk --app <firebase-app-id> --groups testers` |
| Crashlytics (recommended native) | Enable in Firebase console; add Gradle plugin in **native** project only |
| Remote Config / FCM | Console + existing `RnPushMessagingService` behavior as **reference**; reimplement in Kotlin native module |
| Functions / API | Backend already on Cloud Functions — native hits `https://harindrasah.com.np/api` (no change) |

Install: `npm i -g firebase-tools` or use `npx firebase-tools`. Do **not** commit secrets; only commit **example** paths in docs.

### Android / Gradle (legacy + native)

| Task | Where |
|------|--------|
| Legacy debug APK | `cd android-twa/android && gradlew.bat assembleDebug` |
| Native debug APK | `cd android-native && gradlew.bat assembleDebug` (once scaffolded) |
| Release AAB | `bundleRelease` per module; **same** `key.properties` / upload keystore as legacy |
| JDK 17 | `JAVA_HOME` → Android Studio `jbr` |

### Repo scripts (do not break)

| Tool | Use |
|------|-----|
| `npm run check` / `test:affected` | Backend + frontend when APIs change for mobile |
| `npm run classify` | Classify touched paths |
| `graphify query` | Find API/auth wiring before new mobile endpoints |
| `bubblewrap` / `android-twa/npm run init` | **Legacy TWA/shell only** — not used for native Compose scaffold |

### CI & release (optional parallel)

| Tool | Use |
|------|-----|
| **GitHub Actions** (existing workflows) | Add **separate** job `android-native-assemble` — must not block legacy Android job |
| **Play Console** | **Internal testing** track for native AAB; **production** stays legacy until promotion |
| **gh** | PRs for `area/android-native` branch; no force-push `main` |

### Supabase / backend dev

| Tool | Use |
|------|-----|
| `npm run dev:backend` | Local API for native emulator (`10.0.2.2:3000` or tunneled URL) |
| Backend Vitest | `npx vitest run tests/auth-flow.test.ts` before native auth ships |

**Phase 0 action:** Document Firebase `project-id`, Firebase Android `appId`(s), and confirm `google-services.json` can be generated via CLI for the **native** module without rotating legacy’s file.

---

## 2. The three core native shifts (definition of done)

### 2.1 Replace the WebView (routing & lifecycle)

**Done when:**

- No `WebHostFragment` / `LoginActivity` web login in the default user path.
- Single-activity (or single-task) **Compose** host owns back stack, process death, deep links (`rn://app`, `https://harindrasah.com.np/...`), and configuration changes.
- App lifecycle (foreground/background) coordinates **token refresh**, **FCM**, and **sync** without relying on `onPageFinished`.
- `__RN_NATIVE_ANDROID__` / `window.RnNative` become **optional legacy** during transition, then removed.

**Interim allowed:** Feature-flagged `WebView` composable for **explicit** fallback routes only (documented list), with a burn-down checklist.

### 2.2 Build native screens (Compose UI)

**Done when:**

- Bottom navigation, app bars, lists, forms, chat, and readers use **Compose Material 3** aligned with product design (not system stock icons).
- State hoisted in **ViewModels** (`androidx.lifecycle`); UI is declarative and testable (`ComposeTestRule`).
- Accessibility, font scaling, and Nepali/English content follow Android guidelines.
- Web-specific assets (sidebar layout, PWA install prompts) are **not** shown in the native shell.

### 2.3 Connect via APIs (not rendered pages)

**Done when:**

- Each native screen loads **DTOs** from `/api/*` (and any new `/api/mobile/*` or expanded `/api/v2/*` bundles).
- Types align with `frontend/types/api.ts` and/or `@rn/shared` (single contract source).
- Gated content uses the same **spark/tier/auth** rules as the web (`requireAuth`, `requireTier`, content reveal endpoints)—not public CDN HTML scraping.
- Streaming AI uses the same SSE contract as `frontend/lib/api/ai.ts`, adapted for OkHttp/Ktor on Android.

---

## 3. Current state assessment

### 3.1 Android shell (`android-twa/android`) — **exists**

| Area | What exists | Native-compose relevance |
|------|-------------|-------------------------|
| **Language** | 34 × `.java`, **0 Kotlin** | **Leave legacy as-is**; new Kotlin app in `android-native/` |
| **UI shell** | `MainActivity`, bottom nav, XML layouts | Replace with Compose `Scaffold` + `NavigationBar` |
| **Product UI** | `WebHostFragment` (all main tabs) | **Remove** after parity screens ship |
| **Login** | `LoginActivity` + WebView `/login` | Replace with Compose + `/api/auth/*` |
| **Settings** | `SettingsFragment` (native XML) | Port to Compose first (quick win) |
| **Session** | `SessionManager`, `WebSessionCookies`, encrypted prefs | Keep patterns; drop cookie/WebView dependency |
| **API client** | `ApiClient` (`HttpURLConnection`), profile/feed cache | Replace with OkHttp + structured interceptors |
| **Offline** | Room (`AppDatabase`, `CacheDao`), `ContentSyncWorker` | Expand schema per screen contracts |
| **Push** | FCM, `RnPushMessagingService`, `FcmRegistrar` | Wire to Compose navigation |
| **Security** | Signing cert headers, `enforceNativeAndroidClient`, R8, `FLAG_SECURE` | Preserve; re-bind in Kotlin networking layer |
| **Placeholders** | `ContentFragment` (unused placeholder) | Delete or repurpose as dev-only |

**Versioning (baseline):** `applicationId` `com.ravikisan.platform`, `versionCode` 17, `minSdk` 30, `targetSdk` 36.

### 3.2 Website (`frontend/`) — **exists (not what we ship in APK)**

| Area | Scale | Migration implication |
|------|--------|------------------------|
| Routes | **~307** `page.tsx` files | **Prioritize** ~15–25 student-facing routes; defer owner/admin/marketing |
| API clients | `frontend/lib/api/*` (22 modules) | **Mirror** call patterns in Kotlin repositories |
| Types | `frontend/types/api.ts` (580+ lines) | Export/share contracts (OpenAPI or `@rn/shared` Kotlin generation) |
| Syllabus SSOT | `frontend/lib/core/syllabus.ts` | Backend or bundled manifest API for native lists |
| Native hints | `frontend/lib/native-android.ts` | Retire after WebView removal |
| Labs / mindmaps | WebGL, SVG, feature components | Hardest native work; see Phase 7 |
| PWA | `public/manifest.json`, service worker | **Out of scope** for native app (Play updates APK) |

### 3.3 Backend (`backend/`) — **partially ready**

| Domain | Mount (examples) | Mobile readiness |
|--------|-------------------|------------------|
| Auth | `/api/auth/*` | **Ready** for native login/refresh/me (cookie **or** token; standardize for mobile) |
| User | profile, progress, state, bookmarks, levels | **Mostly ready**; may need pagination/shape tweaks |
| Content | subjects, chapters, topics, lessons, r-notes, ravikishan-notes, reveal | **Ready** for hierarchy; note payloads may be large—add mobile summaries |
| Practice | exams, tests, pyqs, history | **Ready** with integration tests as reference |
| AI | chat, stream, quiz, math, image, … | **Ready**; SSE streaming needs Android client design |
| Social | community, feed, chat-history, leaderboard | **Ready** for feed-native UX |
| Platform | search, health, storage | **Ready** |
| v2 | `/api/v2/health`, `/meta`, `/ai/status` | **Use** for app bootstrap & capability probe |
| Native gate | `enforceNativeAndroidClient` + cert headers | **Required** for official APK calls |

**Gaps (likely net-new work):**

- **Mobile aggregation endpoints** (e.g. `GET /api/mobile/home`) to avoid 6+ round-trips on cold start.
- **Stable pagination/cursor** contracts for notes list and community feed (match Instagram-style lists).
- **Topic/note body** format optimized for native rendering (structured blocks, not raw HTML/markdown-only) where the web currently stitches in the server component layer.
- **OpenAPI or shared package** versioned alongside `public-schemas.ts` (`backend/src/api/contracts/`).
- **OAuth mobile**: Google Sign-In token exchange if not already first-class on `/api/auth`.

### 3.4 What must be **built** (net-new)

1. Kotlin Android app structure (modules, Compose, Navigation, Hilt/Koin DI).
2. Full **screen map** and designs for prioritized routes.
3. **Design system** in Compose (colors, typography, spacing—today web uses Tailwind/shadcn).
4. **Markdown/KaTeX/math** rendering on Android (Compose `AndroidView` + MathJax, or custom block renderer).
5. **AI streaming UI** (chat bubbles, cancellation, spark/credit errors).
6. **Image loading** (Coil), **offline** policy per entity.
7. **Expanded Room** entities matching API DTOs (not just `profile_me` / `community_feed`).
8. **Instrumentation + UI tests** per critical flow.
9. **Feature flags** in backend or remote config for WebView fallback during rollout.

---

## 4. Target native architecture

```text
┌─────────────────────────────────────────────────────────────┐
│  :app (single-activity)                                      │
│  MainActivity → setContent { RnApp() }                       │
├─────────────────────────────────────────────────────────────┤
│  ui/          Compose screens, theme, components             │
│  navigation/  NavHost, typed routes, deep link parser        │
│  presentation/ ViewModels, UiState, events                   │
├─────────────────────────────────────────────────────────────┤
│  domain/      Use cases (optional thin layer)                │
│  data/        Repositories                                   │
│               ├── remote/  ApiService (Retrofit or Ktor)     │
│               ├── local/   Room + DataStore                  │
│               └── sync/    WorkManager                       │
├─────────────────────────────────────────────────────────────┤
│  core/        Auth, network, security, fcm, analytics        │
└─────────────────────────────────────────────────────────────┘
         │ HTTPS + X-Rn-Client + cert headers
         ▼
   https://harindrasah.com.np/api/...
```

**Recommended stack (defaults for planning):**

| Concern | Choice | Rationale |
|---------|--------|-----------|
| DI | **Hilt** | Standard with ViewModel + WorkManager |
| HTTP | **OkHttp** + **Retrofit** (or Ktor client) | Interceptors for auth, native client headers, logging |
| JSON | **kotlinx.serialization** or Moshi | Match backend Zod/TS shapes |
| Async | **Coroutines** + **Flow** | UI collects `StateFlow` |
| Navigation | **Navigation Compose** | Deep links, type-safe routes |
| Images | **Coil** | CDN thumbnails, avatars |
| DB | **Room** (Kotlin) | Encrypt sensitive columns (reuse `FieldCipher` concept) |
| Auth storage | **Encrypted DataStore** or EncryptedSharedPreferences | Same security posture as today |
| Testing | JUnit5, Turbine, MockWebServer, Compose UI Test | Parity with backend Vitest fixtures |

**Module layout (mandatory parallel layout):**

| Module | Path | Role |
|--------|------|------|
| **Legacy (frozen architecture)** | `android-twa/android/` | Current Play production app; **no Compose takeover** |
| **Native (new)** | `android-native/` (recommended) | Kotlin + Compose + Hilt; **all new feature work** |
| **Shared docs** | `docs/guides/`, `android-twa/SECURITY.md` | Security headers, Play URLs — copy contracts, don’t fork behavior |

Optional later: `android-native/core-network`, `feature-*` when file count grows. **Do not** collapse into a single `:app` until promotion (§1.1).

**`applicationId` strategy:**

| Stage | Legacy | Native (dev/beta) |
|-------|--------|-------------------|
| Parallel dev | `com.ravikisan.platform` | `com.ravikisan.platform.compose` (install both) **or** same id only on separate tracks without overlap |
| Store promotion | Archived / tag-only builds | `com.ravikisan.platform` + monotonic `versionCode` on existing listing |

**Contract sharing:**

- Short term: hand-maintained Kotlin data classes from `frontend/types/api.ts`.
- Medium term: generate from `backend/src/api/contracts/public-schemas.ts` + Zod → OpenAPI → Kotlin.
- Long term: publish **`@rn/shared`** JVM artifact or OpenAPI spec in CI.

---

## 5. Screen prioritization (route parity map)

Migrate in **user-value order**, not sitemap order. Tie each screen to **existing API modules**.

| Priority | Native screen | Web path (representative) | API / data sources |
|----------|---------------|---------------------------|-------------------|
| P0 | Splash / bootstrap | — | `/api/v2/health`, `/api/v2/meta`, auth me |
| P0 | Login / signup / welcome gates | `/login`, `/signup`, `/welcome/*` | `/api/auth/*` |
| P0 | Home (member/plus/pro variants) | `/home/member`, etc. | New mobile home bundle + progress, study-goals state |
| P1 | Syllabus browser | `/syllabus`, class hubs | syllabus manifest API or bundled index + `/api/classes`, subjects |
| P1 | Subject / unit list | `/class-11-notes/[subject]` | navigation registry data via API |
| P1 | Topic / note reader | unit/topic routes | `/api/ravikishan-notes`, `/api/r-notes`, reveal/spark gates |
| P1 | Search | `/search` | `/api/search` (platform) |
| P2 | Practice hub + quiz | `/practice`, `/quiz/*` | practice routes |
| P2 | AI tutor (Veer) | `/ai/tutor`, `/chat` | `/api/ai`, SSE stream |
| P2 | Profile + settings | `/profile`, settings | `/api/profile`, user routes |
| P2 | Notifications | `/notifications` | social notifications API + FCM deep link |
| P3 | Community feed | `/ai/community` | community-feed, social |
| P3 | Mindmaps | `/mindmap`, topic maps | Likely **Phase 7** (custom Canvas or temporary WebView) |
| P3 | 3D labs | `/lab/3d` | Likely **WebView last resort** or simplified native viewers |
| P4 | Owner/admin, blog, legal | many | Web-only or Custom Tabs **out of app** |

**Access tiers:** Mirror `frontend/lib/core/access-level.ts` and plan gates in ViewModels before fetching paid content.

---

## 6. Phased milestones

### Phase 0 — Discovery & governance (1–2 weeks)

**Goals:** Lock scope, owners, and success metrics.

**Activities:**

- Approve screen list (Section 5) and **explicit WebView allowlist** (if any).
- UX: Compose design system (Figma → theme tokens).
- Define **Definition of Done** per phase (Section 8).
- Branch strategy: dedicated area branch per `BRANCHES.md` (`area/android-native`).
- CI: add Kotlin compile + unit tests to scoped check.

**Verification:**

- Signed-off screen inventory and API gap list.
- No code migration yet beyond planning artifacts.

---

### Phase 1 — Kotlin foundation & parallel project (2–3 weeks)

**Goals:** **New** native project builds; **legacy APK unchanged** and still default for Play production.

**Activities:**

- **Scaffold `android-native/`** (empty Compose app, own `settings.gradle` or composite build at repo root).
- Firebase CLI: `firebase apps:sdkconfig` → `android-native/app/google-services.json` (same or sibling Android app in console).
- Kotlin + Compose BOM, Hilt, theme, empty `NavHost` — **no edits** to legacy `MainActivity` required.
- Port **Settings** UX to Compose in **native** module only (reference legacy `SettingsFragment` behavior).
- CI job: assemble **both** `android-twa/android` and `android-native` on PR.
- **Do not** add Kotlin plugin to legacy module unless a one-line critical fix demands it (default: **no**).

**Verification:**

- Legacy: `android-twa/android` `assembleDebug` **bit-identical policy** — still ships.
- Native: `android-native` `assembleDebug` installs beside legacy (if using `.compose` applicationId).
- ProGuard/Crashlytics configured in **native** only.

---

### Phase 2 — API & data layer (3–4 weeks)

**Goals:** Structured networking replaces ad-hoc `HttpURLConnection`.

**Activities:**

- Implement `AuthInterceptor`, `NativeClientInterceptor` (`X-Rn-Client`, signing cert, `User-Agent`).
- Retrofit interfaces mirroring `frontend/lib/api/auth.ts`, `profile.ts`, `content.ts`, `search.ts`.
- Token/session: align with backend (Bearer vs cookie); document in ADR.
- Room schema v2: entities for user, syllabus index, cached note summaries.
- WorkManager: sync jobs per repository.
- Backend tasks (parallel): mobile home endpoint, OpenAPI stub, pagination for feed.

**Verification:**

- MockWebServer tests for auth refresh, 401 invalidation (match `AuthSessionInvalidator` behavior).
- Contract tests against `backend/tests/integration` fixtures where possible.

---

### Phase 3 — Native auth & onboarding (2–3 weeks)

**Goals:** Remove WebView login from default path.

**Activities:**

- Compose login/signup/forgot flows.
- Google Sign-In SDK → backend OAuth exchange (if required).
- Welcome/pending/rejected states (`/welcome/*` logic) as native screens.
- Migrate `SessionManager` to Kotlin; remove `WebSessionCookies` from happy path.
- FCM registration after successful auth (existing `FcmRegistrar` logic).

**Verification:**

- `auth-flow.test.ts` behaviors replicated in Android integration tests.
- Sign-out wipes Room + encrypted store (SECURITY.md checklist).

---

### Phase 4 — Navigation shell & WebView sidelining (2–3 weeks)

**Goals:** Compose owns bottom nav and back stack; WebView not used for main tabs.

**Activities:**

- Replace `MainActivity` bottom nav with Compose; branded icons.
- Deep link parser sharing rules with `SecureDeepLink`.
- Feature flag: `use_native_shell` default **true** for internal testers.
- WebView confined to **allowlist** (empty by default).

**Verification:**

- Maestro or Compose tests: Home → Learn → Search → Profile → back.
- Deep link from FCM opens correct destination.

---

### Phase 5 — Core study experience (6–10 weeks)

**Goals:** Native syllabus → unit → topic → note reader.

**Activities:**

- Syllabus and class/subject lists (LazyColumn, pull-to-refresh).
- Note reader: block model (headings, bullets, math, figures).
- Offline: download unit pack (equivalent to `offline-pack.ts` policy).
- Spark/tier errors as native dialogs (match web gates).
- Search results native screen.

**Backend follow-ups:**

- Note payload **mobile view** (smaller initial payload, lazy load figures).
- CDN URLs for images with auth headers if needed.

**Verification:**

- Golden tests for note renderer on sample fixtures from `backend/tests/fixtures`.
- Offline read after airplane mode test.

---

### Phase 6 — Practice & AI (6–8 weeks)

**Goals:** Native practice flows and Veer chat.

**Activities:**

- Practice subject picker, quiz UI, OMR-like interactions if applicable.
- AI chat: streaming SSE, credit/spark errors, history (`chat-history` API).
- Optional: math input screen (`/ai/math`).

**Verification:**

- Stream cancellation, background/foreground resume.
- Load test on slow network (Nepal 3G profile).

---

### Phase 7 — Social, profile depth, hard surfaces (6–12 weeks)

**Goals:** Community, leaderboard, achievements; decide labs/mindmaps.

**Activities:**

- Feed (paging), post detail, notifications inbox.
- Profile sub-screens (progress, badges) where APIs exist.
- **Mindmaps:** Option A native Canvas/SVG parser; Option B **last WebView** module; Option C static image export from server.
- **3D labs:** Option A WebView sandbox; Option B native GL/Sceneform only for top N labs.

**Exit criteria for “complete native”:**

- Documented exception list ≤ agreed cap (e.g. ≤3 WebView screens) **or** zero WebView.

---

### Phase 8 — Native promotion & legacy freeze (2–4 weeks) — **only after explicit approval**

**Goals:** Make **native** the default Play artifact; **freeze** legacy — do **not** mass-delete repo history on day one.

**Activities:**

- Upload native AAB to **production** (or full open testing) with rollback AAB kept.
- **Freeze** `android-twa/android`: security/targetSdk-only fixes; no new features.
- **Archive** legacy tree to `android-twa/android-legacy/` (move, optional) or keep with `README-LEGACY.md` banner — **no requirement to delete** Java sources.
- Native app: remove **internal** WebView fallbacks if any; native APK has no `android.webkit` on core paths (lint rule).
- Optional frontend PR: trim `__RN_NATIVE_ANDROID__` only when **no** production users on legacy (or keep for legacy branch builds).
- Play data safety / store listing: update “what’s new”; same privacy URLs.

**Verification:**

- Production crash rate ≤ legacy baseline for 7 days **or** rollback.
- Penetration checklist from `android-twa/SECURITY.md` on **native** APK.
- Legacy module still **compiles** from `main` for emergency hotfix if rollback needs it.

---

### Phase 9 — Play release & rollout (ongoing)

**Goals:** Production track with staged rollout.

**Activities:**

- Internal → closed → open testing.
- VersionCode monotonic; release notes.
- Crash reporting (Firebase Crashlytics recommended).
- Monitor API errors by `User-Agent: RavikisanAndroid/...`.

**Verification:**

- `bundleRelease` signed; pre-launch report clean.
- Rollback plan documented.

---

## 7. Gradual rollout — two apps, not one broken app

```text
Phase 1–7:  Play PRODUCTION  → Legacy APK (android-twa/android)  [unchanged users]
            Play INTERNAL    → Native APK (android-native)      [testers]
Phase 8:    Optional PROMOTION → Native becomes production; legacy frozen/archived
            WebView exists only inside legacy builds (not deleted from git day one)
```

| Mechanism | Purpose |
|-----------|---------|
| **Separate Gradle projects** | Legacy keeps shipping while native matures |
| Firebase App Distribution / Play internal track | Native betas without touching production |
| Remote config / `BuildConfig` | Native-only feature flags |
| `applicationId` `.compose` (dev) | Side-by-side install vs legacy |
| Route-level analytics | Native vs legacy crash/session compare before promotion |
| Native internal WebView allowlist (if any) | Burn down inside **native** only; legacy unchanged |

---

## 8. Definition of Done (per release)

- [ ] No WebView on paths marked **native-complete** in the screen inventory.
- [ ] Screen works offline per documented policy.
- [ ] Tier/spark gates enforced before showing gated JSON.
- [ ] TalkBack labels on primary actions.
- [ ] Unit tests for ViewModels; at least one UI test per P0/P1 screen.
- [ ] Legacy `android-twa/android` still `assembleRelease` green on same PR (unless legacy-only freeze phase).
- [ ] Backend change paired with contract version bump if DTOs change.
- [ ] `npm run classify` / agent report lists touched files.

---

## 9. Key technical risks & mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **307 web routes** → scope explosion | Never ship | Strict P0–P4 list; defer admin/marketing |
| **Note rendering** (math, figures) | Reader parity gap | Block-based API; MathView; server-side pre-render for figures |
| **3D labs / mindmaps** | Blocks “100% native” | Phase 7 options; cap WebView exceptions with sunset date |
| **Auth cookie vs token** | Session bugs on mobile | ADR + single refresh path; mirror `auth-flow.test.ts` |
| **Large JSON notes** | OOM, slow lists | Pagination, summaries, on-demand figure fetch |
| **AI SSE** | Broken chat on rotate | ViewModel + `SharingStarted.WhileSubscribed`; OkHttp call lifecycle |
| **Spark/CDN gates** | Content leak or 403 loops | Reuse `reveal` + auth middleware; no direct CDN bypass |
| **Dual codebase drift** | Web ships feature, app lags | Mobile home bundle; feature flags; shared OpenAPI |
| **Kotlin migration + release** | Regression | **Parallel projects**; legacy untouched until promotion |
| **Accidental legacy deletion** | Production outage | §1.1 prohibitions; code review checklist |
| **Play signing / cert pinning** | API 403 unofficial client | Keep `AppSignatureGuard` + backend allowlist in sync |
| **FLAG_SECURE** | UX complaints | Product decision per screen (disable on reader if needed) |

---

## 10. Dependencies & prerequisites

| Dependency | Owner | Notes |
|------------|-------|-------|
| JDK 17, Android Studio latest | Dev | Already documented in `android-twa/README.md` |
| **Firebase CLI** (`firebase-tools`) | Dev | §1.2 — sdkconfig, App Distribution, Crashlytics |
| `google-services.json` | Dev | FCM; gitignored; CLI-generated per Android app id |
| Upload keystore / `key.properties` | Release | **Reuse** Play upload key; native module reads same `key.properties` |
| Firebase project (Auth + FCM) | Infra | **Same project** as web + legacy APK — no new console unless `.compose` app |
| Play Console app listing | Release | **Reuse** listing, policies, Data safety — native uses **internal track** first |
| Supabase-backed API availability | Backend | Mock store in tests |
| Design tokens / Compose theme | Design (R.) | Match brand, not default Material |
| Legal URLs in `/api/v2/meta` | Compliance | Settings / Play |
| Branch `area/android-native` (suggested) | Eng | Per `BRANCHES.md` |

**Backend team gates before Phase 5:**

- Mobile note/summary contract signed off.
- Auth token strategy documented.

---

## 11. Testing & verification matrix

| Layer | Tooling | What to prove |
|-------|---------|---------------|
| **Contract** | OpenAPI diff, Zod tests | DTO stability |
| **Backend** | `npm run test:affected -- backend/...` | Endpoints used by Android |
| **Unit (Android)** | JUnit, MockWebServer, Turbine | Repositories, ViewModels |
| **UI (Android)** | Compose Test, Espresso (if hybrid) | P0 navigation |
| **E2E** | Maestro flows (recommended) | Login → open note → quiz |
| **Security** | Manual + lint | No cleartext; cert header; backup false |
| **Performance** | Macrobenchmark (optional) | Cold start < target |
| **Accessibility** | Accessibility Scanner | WCAG-aligned |

**Pre-implementation checklist (before Phase 1 coding):**

1. Screen inventory signed (Section 5).  
2. API gap spreadsheet (each screen → endpoints → gap Y/N).  
3. Auth ADR (cookie vs Bearer).  
4. WebView allowlist policy (default: empty).  
5. Note renderer spike (1 topic JSON end-to-end on device).  
6. Firebase CLI: confirm `google-services.json` for native module without breaking legacy.  
7. Written sign-off on §1.1 (parallel delivery — **no replace** of legacy until Phase 8 promotion).

---

## 12. Frontend & backend coordination (no WebView era)

When WebView is removed, the Next.js app remains the **web product**; Android does **not** load it for core flows.

| Change | Repo area |
|--------|-----------|
| Remove or gate `isAndroidNativeShell()` UX hacks | `frontend/lib/native-android.ts`, footer promos |
| Keep API backward compatible | `backend/src/api/*` |
| Add mobile bundles | `backend/src/api/mobile/*` (new) or extend `v2` |
| Document client headers | `backend/src/lib/native-android-security.ts` |

---

## 13. Success metrics

- **WebView usage:** % sessions with zero WebView loads → target 100% by Phase 8.
- **Cold start:** time to interactive home (native) < agreed SLA.
- **Crash-free users:** ≥ 99.5% on production track.
- **API error rate:** stable vs web for same endpoints.
- **Student tasks:** complete “open note + take quiz + ask AI” without leaving app.

---

## 14. Document maintenance

| Field | Value |
|-------|-------|
| **Path** | `docs/guides/android-native-compose-migration-plan.md` |
| **Related** | `android-twa/NATIVE_MIGRATION.md`, `android-twa/README.md`, `android-twa/SECURITY.md`, `CORE_FILES.md` § mobile, Firebase project via `firebase/functions` |
| **Next action** | **Worker 1–4** or **Supervisor 5** (plan **§0**); W1 stub routes day 1; W4 local fakes; no waiting |

---

## Appendix A — Inventory reference (quick)

**Android (existing):** `SplashActivity`, `LoginActivity`, `MainActivity`, `WebHostFragment`, `SettingsFragment`, `ApiClient`, Room, WorkManager, FCM, security package, `NativeJsBridge`.

**Backend routers (existing):** `auth`, `ai`, `content`, `practice`, `user`, `social`, `admin`, `platform`, `v2`, `access-requests`.

**Frontend API mirrors:** `frontend/lib/api/{auth,profile,content,ai,community,...}.ts`.

**Web scale:** ~307 pages — **not** 1:1 migration target.

---

## Appendix B — Suggested timeline (indicative)

| Phase | Duration (indicative) | Cumulative |
|-------|----------------------|------------|
| 0 | 2 weeks | 2 w |
| 1 | 3 weeks | 5 w |
| 2 | 4 weeks | 9 w |
| 3 | 3 weeks | 12 w |
| 4 | 3 weeks | 15 w |
| 5 | 10 weeks | 25 w |
| 6 | 8 weeks | 33 w |
| 7 | 12 weeks | 45 w |
| 8 | 4 weeks | 49 w |
| 9 | rolling | — |

Adjust after Phase 0 API gap review and design velocity.

---

*End of plan — implementation intentionally deferred until stakeholders approve Phase 0.*