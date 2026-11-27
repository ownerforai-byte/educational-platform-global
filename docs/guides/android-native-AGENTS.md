# android-native — ONE AGENT DOCUMENT (read only your number)

**The owner will tell you: “You are Agent 1” (or 2, 3, 4, 5).**  
**Open this file → jump to [YOUR section](#agent-1-worker--platform-navigation--release) → do ONLY that work.**

| Agent | You are | You build features? |
|:-----:|---------|:-----------------:|
| **1** | Worker — Platform, navigation, CI | Yes |
| **2** | Worker — Backend `/api/mobile/*` | Yes |
| **3** | Worker — Network, Room, auth | Yes |
| **4** | Worker — All student UI | Yes |
| **5** | **Supervisor** — guides 1–4 | **No** |

**Full migration plan (background):** [`android-native-compose-migration-plan.md`](android-native-compose-migration-plan.md)  
**Live done-log & supervisor orders:** [`android-native-STATUS.md`](android-native-STATUS.md) (Workers → §4 · Supervisor → §7)

---

## Every agent — say this at session start

```text
I am Agent [1|2|3|4|5].
I read docs/guides/android-native-AGENTS.md for my role only.
I am guided by Supervisor Agent 5. I do not wait on other workers.
```

**Workers 1–4:** Read [Shared rules](#shared-rules-all-agents) once, then **only your Agent section**. Report **EDITS** (files you changed) — Agent 5 reads your code, not chat alone.  
**Agent 5:** Read [Shared rules](#shared-rules-all-agents) + [Agent 5](#agent-5-supervisor--guide-only--see-all-worker-edits-not-logs-alone). Run **git diff**, **open every worker file**, write STATUS **§8**, then **§7**.

---

## Shared rules (all agents)

### Aim (never forget)

Build **Kotlin + Compose** app in `android-native/` (`com.ravikisan.platform.compose`).  
**Do not break:** website, backend, legacy Play app (`android-twa/android`).

### Hard boundaries (stop if you violate)

1. No edits to `android-twa/android/**` except owner-approved critical fixes.  
2. No breaking changes to existing `/api/*` (Worker 2: **additive** `/api/mobile/*` only).  
3. No `frontend/**` unless owner asks.  
4. No secrets in git (`google-services.json`, `key.properties`, keystores).  
5. Dev id: `com.ravikisan.platform.compose` — not production `com.ravikisan.platform`.

### No-wait rule (Workers 1–4 only)

- **Never stop** because another agent is behind.  
- Use **local fakes** in your owned folders + `@Preview`.  
- Need nav / Gradle / manifest? → **Integration request** in checkpoint → **Agent 5** → queue → **Agent 1** wires it. **Keep coding** the next task.

### Environment (do not re-discover)

| Fact | Value |
|------|--------|
| Native build | `cd android-native && JAVA_HOME="C:/Users/ASUS/.bubblewrap/jdk-17" ./gradlew assembleDebug` |
| Legacy sanity | `cd android-twa/android && JAVA_HOME="C:/Users/ASUS/.bubblewrap/jdk-17" ./gradlew.bat assembleDebug` |
| JDK | `C:/Users/ASUS/.bubblewrap/jdk-17` |
| API | `https://harindrasah.com.np` |
| Phase 1 | ✅ Scaffold done (~5–8%); see STATUS §4 |

### Session checkpoint (end of every session)

Copy, fill, post in chat. **Supervisor reviews your EDITS (files + diffs), not prose alone.**

**Workers:** append **STATUS §4** including the **EDITS** block below.  
**Supervisor:** append **STATUS §8** (edit review) + **§7** (CONTINUE) — see [Agent 5](#agent-5-supervisor--guide-only).

```text
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent [N]
═══════════════════════════════════════════════════════════════
I am Agent [N]. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
For each file you changed, one line: path | +lines -lines | what you did
  example: android-native/.../Foo.kt | +120 -0 | added syllabus list VM
  [...]

GIT (if available — paste output):
  git diff --stat
  [or: first commit / uncommitted list]

COMPLETED (behavior, not log fluff):
1. [...]

VERIFIED: [command] → [BUILD SUCCESSFUL / tests]

CONTINUE NEXT:
• [...]

INTEGRATION REQUEST (if needed):
• [...]
═══════════════════════════════════════════════════════════════
```

Workers: `npm run classify -- <paths>` on every path in **EDITS**.

### Program progress (reference)

| Phase | What | Status |
|-------|------|--------|
| 1 | `android-native/` scaffold | ✅ Done |
| 2–7 | Network, auth, UI features | ⬜ Workers |
| 8 | Promote native on Play | ⬜ Owner approval |

---

## Agent 1 (Worker) — Platform, navigation & release

### Know who you are

You are **Agent 1**. You own the **app shell**: Gradle, manifest, theme, navigation, CI, Home/Settings shell screens.  
You **do not** build auth logic, APIs, note reader, quiz, or chat.  
You **are guided by Agent 5**. Read STATUS **§7** for CONTINUE orders.

### Do ONLY this work

| # | Task |
|---|------|
| 1 | CI job: `android-native-assemble` on PR |
| 2 | Replace placeholder theme with real brand tokens |
| 3 | **`RnNavHost` + `Routes`:** stub **all** destinations (Auth, Learn, StudyUnit, Search, Practice, Quiz, AiTutor, Community, Profile, Notifications) — empty screens OK **day 1** |
| 4 | Deep links: `rn://app`, `https://harindrasah.com.np/*` |
| 5 | Firebase / Play notes in `android-native/README.md` |
| 6 | Process **Integration queue** (§ below) — permissions, Gradle deps from Workers 3–4 |

### You may write ONLY these paths

```text
android-native/settings.gradle.kts
android-native/build.gradle.kts
android-native/gradle.properties
android-native/gradle/wrapper/**
android-native/gradlew*
android-native/app/build.gradle.kts
android-native/app/proguard-rules.pro
android-native/app/src/main/AndroidManifest.xml
android-native/app/src/main/res/**
android-native/app/.../RnApp.kt
android-native/app/.../MainActivity.kt
android-native/app/.../navigation/**
android-native/app/.../ui/theme/**
android-native/app/.../ui/screens/HomeScreen.kt
android-native/app/.../ui/screens/SettingsScreen.kt
android-native/README.md
.github/workflows/*android-native*
docs/guides/android-native-play-checklist.md
```

### You must NOT touch

`core/**`, `data/**`, `ui/screens/auth|study|practice|ai|social|profile/**` (except Home/Settings), `backend/**`, `android-twa/**`, `frontend/**`.

### End session

`./gradlew assembleDebug` → checkpoint with **EDITS** block → STATUS §4.

---

## Agent 2 (Worker) — Backend & API contracts

### Know who you are

You are **Agent 2**. You own **additive** mobile APIs under `/api/mobile/*`.  
You **do not** touch the Android app or the website.  
You **are guided by Agent 5**. Workers never wait on you — you still ship contracts steadily.

### Do ONLY this work

| # | Task |
|---|------|
| 1 | Create `backend/src/api/mobile/` and mount on `/api/mobile` |
| 2 | `GET /api/mobile/home` (or document deferral in `docs/api/`) |
| 3 | Contract docs for syllabus, notes, feeds (reuse existing routes where possible) |
| 4 | Pagination pattern for community-style lists |
| 5 | Vitest: `npm run test:affected -- backend/...` green |

### You may write ONLY these paths

```text
backend/src/api/mobile/**
backend/src/api/index.ts          # add mount line only
backend/tests/integration/mobile*.test.ts
backend/tests/fixtures/mobile/**
docs/api/mobile-openapi.yaml
docs/api/mobile-*.md
backend/src/api/contracts/public-schemas.ts   # additive schemas only
```

### You must NOT touch

`android-native/**`, `frontend/**`, `android-twa/**`, existing API response shapes.

### End session

Vitest for your routes → checkpoint with **EDITS** → STATUS §4.

---

## Agent 3 (Worker) — Networking, data & authentication

### Know who you are

You are **Agent 3**. You own **client infrastructure**: OkHttp, Retrofit, Room, sync, **auth screens**, FCM, **SseClient** for AI.  
You **do not** build syllabus, quiz, or community UI (Agent 4).  
You **do not** edit `RnNavHost` — request route via Integration queue → Agent 1.  
You **are guided by Agent 5**.

### Do ONLY this work

| # | Task |
|---|------|
| 1 | OkHttp: `User-Agent`, `X-Rn-Client`, signing cert (see `android-twa/SECURITY.md`) |
| 2 | Retrofit + serialization |
| 3 | Room + WorkManager sync |
| 4 | `ui/screens/auth/*` login / signup / welcome |
| 5 | FCM → `POST /api/access-requests/fcm` |
| 6 | `core/stream/SseClient.kt` + fake for tests |
| 7 | Optional: `core/contract/` DTOs (Agent 4 keeps local fakes until Supervisor says swap) |

### You may write ONLY these paths

```text
android-native/app/.../core/**
android-native/app/.../data/**
android-native/app/.../di/**
android-native/app/.../ui/screens/auth/**
android-native/app/src/test/**/core/**
android-native/app/src/test/**/data/**
```

### You must NOT touch

`navigation/**`, `ui/screens/study|practice|ai|social|profile/**`, `backend/**` (Agent 2), `app/build.gradle.kts` / manifest — **Integration request** to Agent 5.

### End session

`./gradlew assembleDebug` → checkpoint with **EDITS** → STATUS §4.

---

## Agent 4 (Worker) — Product experience (all student UI)

### Know who you are

You are **Agent 4**. You own **all feature UI**: study, search, reader, practice, quiz, Veer chat, community, profile, notifications, labs/mindmaps decision.  
You **never wait** for Agent 2 or 3 — use **`local/Fake*.kt`** in each feature folder.  
You **do not** edit `RnNavHost`, `core/**`, or `backend/**`.  
You **are guided by Agent 5**. Stub routes already exist from Agent 1.

### Do ONLY this work (continuous — top to bottom)

| # | Task |
|---|------|
| 1 | Syllabus: class → subject → unit lists |
| 2 | Note reader v1 (math later) |
| 3 | Search UI |
| 4 | Offline UX (local state first) |
| 5 | Practice + quiz |
| 6 | AI chat UI (fake SSE until `SseClient` integrated) |
| 7 | Community, profile, notifications |
| 8 | `docs/guides/android-native-labs-decision.md` + labs/mindmaps |

### Required pattern — local fakes (no waiting)

```text
ui/screens/<feature>/local/Fake*.kt
ui/screens/<feature>/local/fixtures/*.json
```

### You may write ONLY these paths

```text
android-native/app/.../ui/screens/study/**
android-native/app/.../ui/screens/search/**
android-native/app/.../ui/screens/practice/**
android-native/app/.../ui/screens/ai/**
android-native/app/.../ui/screens/social/**
android-native/app/.../ui/screens/profile/**
android-native/app/.../ui/components/reader/**
android-native/app/.../ui/components/syllabus/**
android-native/app/.../ui/components/chat/**
android-native/app/src/test/**/study/**
android-native/app/src/test/**/practice/**
android-native/app/src/test/**/ai/**
docs/guides/android-native-labs-decision.md
```

### You must NOT touch

`navigation/**`, `core/**`, `data/**`, `auth/**`, `theme/**` (Agent 1), `backend/**`, `SettingsScreen.kt` structure — coordinate via Supervisor if wiring settings.

### End session

`./gradlew assembleDebug` → checkpoint with **EDITS** → STATUS §4.

---

## Agent 5 (Supervisor) — guide only (see all worker **edits**, not logs alone)

### Know who you are

You are **Agent 5 — Supervisor**. You **do not write feature code**. You **inspect what Workers 1–4 actually changed in the repo** (files, diffs, builds), then guide them via **§7 CONTINUE**.  
**Logs and checkpoints are hints only** — your job is to **read their edits** and confirm ownership / quality / boundaries.

**Primary question each session:** *What did each worker ship in code this interval?*

### Work review protocol (mandatory every session)

Do this **before** writing §7. Do **not** rely on worker prose without opening files.

| Step | Action |
|------|--------|
| 1 | `git status` + `git diff --stat` (repo root) — see all uncommitted / recent worker changes |
| 2 | Per agent, collect paths from **§4 EDITS** + diff; map unknown paths with [path → agent](#path--agent-map-for-supervisor) |
| 3 | **Open and read** each changed file (or `git diff <path>`) — note what was really implemented |
| 4 | Run builds if edits touched that tree: native `assembleDebug`; `test:affected` if Agent 2 changed backend |
| 5 | Record review in **STATUS §8** — one subsection per agent: files, verdict, violations |
| 6 | Then write **§7 CONTINUE** from **code reality**, not from worker claims |
| 7 | Update integration queue; assign wiring batches to Agent 1 |

**If git is unavailable:** demand **EDITS** list in §4; use Read tool / IDE on every listed path.

### Path → agent map (for supervisor)

| Path pattern | Owner |
|--------------|:-----:|
| `android-native/**/navigation/**`, `**/ui/theme/**`, `HomeScreen.kt`, `SettingsScreen.kt`, `MainActivity.kt`, `RnApp.kt`, `android-native/*.gradle*`, `AndroidManifest.xml`, `android-native/app/src/main/res/**`, `.github/workflows/*android-native*` | **1** |
| `backend/src/api/mobile/**`, `docs/api/mobile*` | **2** |
| `android-native/**/core/**`, `**/data/**`, `**/ui/screens/auth/**` | **3** |
| `android-native/**/ui/screens/study|search|practice|ai|social|profile/**`, `**/components/reader|syllabus|chat/**`, `android-native-labs-decision.md` | **4** |
| `docs/guides/android-native-STATUS.md` §8, §7 | **5** |

**Violation:** file outside agent’s column → §8 **REVERT** or owner escalation; worker **CONTINUE** on allowed paths only.

### §8 review template (paste into STATUS — Agent 5 only)

```text
### YYYY-MM-DD — Supervisor edit review

**Repo:** git diff --stat: [paste]

#### Agent 1 — [OK | FIX | VIOLATION]
- `path` — [what you saw in the file, 1–2 sentences]
- Build: [...]

#### Agent 2 — [...]
#### Agent 3 — [...]
#### Agent 4 — [...]

**Cross-cutting:** [integration queue updates, conflicts]
**§7 CONTINUE issued below.**
```

### Do ONLY this work

| # | Task |
|---|------|
| 1 | **Review all worker edits** (§8 protocol) — main duty |
| 2 | Read §4 **EDITS** blocks; reconcile with git |
| 3 | Update **Integration queue** (§ below) |
| 4 | **§7 CONTINUE** for Agents 1–4 based on **reviewed code** |
| 5 | “Blocked waiting” → local fake + CONTINUE (after checking they didn’t already code a workaround) |
| 6 | `assembleDebug` / `test:affected` when edits warrant it |
| 7 | Phase gates in migration plan §6 |

### You may write ONLY these paths

```text
docs/guides/android-native-STATUS.md     # §7 + §8 only (Supervisor)
docs/guides/android-native-AGENTS.md     # integration queue section + supervisor notes only
```

### You must NOT write

`android-native/app/src/**`, `backend/**`, `frontend/**`, `android-twa/**` (review only; report violations).

### End session

Complete **§8 edit review** → **§7 CONTINUE** → checkpoint listing **files you read** (not just “reviewed logs”).

---

## Integration queue (Agent 5 maintains — workers request in checkpoint)

Workers **do not edit this table**. Paste requests in checkpoint; Supervisor moves them here.

### Open requests

| ID | From | Type | Detail | Status |
|----|------|------|--------|--------|
| RQ-11 | Agent 5 (§8 B0 review) | route | `RnNavHost.kt` stub loop renders `StubScreen`; plan §0.6 mandates the single `ComingToNative` component (currently dead code). W1: switch stub loop to `ComingToNative(stub.title)`, delete `navigation/StubScreen.kt`. | ✅ done (owner-directed session, see STATUS §7) |
| RQ-12 | Agent 5 (§8 B0 review) | dto-merge | B0 task 0 straddle relocation: W3 moves `SyllabusSearchIndexSource` + `SearchIndexSource` from `ui/screens/search/SearchViewModel.kt` → `data/repository/`; W1 then updates the `AppModule` provider import. Behavior must be byte-identical. | ✅ done (owner-directed session, see STATUS §7) |

### Request template (workers copy to checkpoint)

```text
INTEGRATION REQUEST — Agent [N]
Need: [route | gradle-dep | manifest-permission | dto-merge]
Detail: [...]
Files ready: [...]
```

### Current Supervisor batch (assign Agent 1)

| Action | Assigned to Agent 1 |
|--------|---------------------|
| Stub routes for all feature areas | ✅ done (session 2) |
| Theme tokens | ✅ done (session 2) |
| RQ-1: gradle deps for W3 stack | ✅ done — build green |
| RQ-2: wire Syllabus + StudyUnit + auth routes | ✅ done |
| RQ-3: wire Search + Practice routes | ✅ done (session 4) |
| RQ-4: wire quiz/ai-tutor/community/profile/notifications routes | ✅ done — **zero stubs remain** |
| testDebugUnitTest in CI | ✅ done |

### Resolved (newest first)

| ID | Resolution |
|----|------------|
| RQ-4 | Agent 1 final session: all 5 remaining routes wired (quiz→PracticeQuizScreen, ai-tutor→VeerChatScreen, community, profile+notifications); zero StubScreen usages remain |
| RQ-3 | Agent 1 session 4: SearchScreen + PracticeHubScreen wired |
| RQ-2 | Agent 1 session 3: `learn`→`SyllabusScreen`, `study/{unitId}`→`StudyUnitScreen` (+ auth screens); verified by assembleDebug |
| RQ-1 | Agent 1 session 3: okhttp/retrofit/room/work/serialization deps; verified by assembleDebug → BUILD SUCCESSFUL |

---

## Supervisor CONTINUE (FINAL — program closeout; details in STATUS §7 session 5)

**All agent task lists complete.** Remaining:

| Agent | Final item |
|:-----:|-----------|
| **4** | FIX `SearchEngine` ranking (kind-aware score — unit title must outrank exact topic match); 1 failing test pins it. |
| **3+4** | **SWAP ORDER ISSUED:** replace fake data sources with `SyllabusRepository`/`RnApi` — study first, then search, then practice/community. Fakes stay for unit tests. |
| **Owner** | `google-services.json` · device testing · theme sign-off · Phase 8 promotion approval. |

**Owner:** Tell each session **“You are Agent N.”** They open **this file** and work **only** that section.

---

*Consolidates: agent split, multi-agent §0, integration queue. Other docs point here for roles.*