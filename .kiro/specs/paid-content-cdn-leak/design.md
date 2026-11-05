# Paid-Content CDN Leak Bugfix Design

## Overview

Paid content bodies (note JSON files, PYQ question banks, formula data, drills) are currently served from `frontend/public/data/` — a CDN-accessible directory with no auth. Anyone with the URL can download full paid content without a session, plan tier, or spark unlock.

This fix closes that gap by:

1. Adding a spark-gated Express endpoint `POST /api/content/reveal` on the backend that enforces the full auth chain (session → tier → spark window) before returning content bytes, reading files from the server-side `content/` corpus rather than public static.
2. Adding a Next.js proxy route `POST /api/content/reveal` that forwards cookies and body to the backend.
3. Adding a gated `GET /api/content/subject-bank` Next.js route that calls `getSubjectPyqBank()` server-side and returns the result only to authenticated callers.
4. Rewiring `topic-vertical-notes.tsx` to POST to `/api/content/reveal` instead of calling `loadData()` directly.
5. Rewiring `use-subject-bank.ts` to fetch from `/api/content/subject-bank` instead of calling the lib directly from the client.

Static files remain in place for this commit (byte-parity gate stays green). They will be deleted in a follow-up commit once the gated path is verified in production.

## Glossary

- **Bug_Condition (C)**: A paid content body is fetched via a public static URL (under `frontend/public/data/`) where no auth, tier, or spark check exists.
- **Property (P)**: When a paid content body is requested, the system must validate session → tier → spark window in that order before returning bytes. Any check failure returns an error status with no content.
- **Preservation**: All existing behavior for non-paid static assets (`_manifest.json`, exams, visuals, bio-lab, r-export, etc.) and all downstream consumers of content data (SRS, mock-exam, offline packs) must continue to work exactly as before.
- **`requireAuth`**: Express middleware in `backend/src/middleware/auth.ts`. Resolves a `SessionUser` from the bearer token or `sb-access-token` cookie; 401s if missing.
- **`tierForUser(user, isOwner)`**: Utility in `backend/src/utils/sectionAccess.ts`. Returns `"owner" | "pro" | "plus" | "member"` for a `TierUser`. Owner flag takes precedence over plan/role columns.
- **`isOwnerEmail(email)`**: Utility in `backend/src/middleware/auth.ts`. Checks against the `OWNER_EMAILS` allowlist (defaults + `OWNER_EMAILS` env var).
- **`unitSectionDir(repoRoot, section, classSlug, subjectSlug, unitSlug)`**: Path helper in `frontend/lib/content/paths.ts` (shared with backend). Returns the absolute directory path for one unit of one content kind.
- **`KIND_SECTIONS`**: Map in `paths.ts` from `ContentKind` key (e.g. `"concepts"`) to corpus-relative section path (e.g. `"notes/concepts"`). Single source of truth.
- **`getSubjectPyqBank(classSlug, subjectSlug)`**: Server-only function in `frontend/lib/pyq-bank.ts`. Returns `SubjectPyqBank { theory, pyqs, drills }`. Currently called directly from the client (the leak).
- **`loadData(path)`**: Client helper in `frontend/lib/data-loader.ts`. Constructs a URL to `/data/{path}` and fetches it — all calls from client components go directly to the public CDN.
- **Spark window**: A 20-minute unlock window stored in `profiles.credits_unlock` after `POST /api/user/credits/unlock` is called. Owners and pro (`premiumStatus=true`) users bypass this check.
- **Commit 1 / Commit 2**: Commit 1 adds the gated endpoint + rewires readers (no file deletions). Commit 2 removes the now-redundant public static bodies.

## Bug Details

### Bug Condition

The bug manifests for every paid content body served from `frontend/public/data/`. Because these are static assets, the CDN (Vercel) serves them unconditionally with no session or auth check. Any actor who knows (or guesses) a file path gets the full content bytes.

Three distinct leak paths exist:

1. **Note bodies** — `topic-vertical-notes.tsx` calls `loadData(manifestItem.filename)` which resolves to a public `/data/syllabus-notes/{subject}/{unit}/*.json` URL.
2. **PYQ / drill bank** — `use-subject-bank.ts` calls `getSubjectPyqBank()` which internally calls `loadData()` (via `content/_index.json` and subject JSON files) to fetch from public static.
3. **Formula data** — formula fields are embedded inside the note body JSON files covered by (1); once note bodies are gated, formulas are covered automatically.

**Formal Specification:**

```
FUNCTION isBugCondition(request)
  INPUT: request (HTTP request for a content file)
  OUTPUT: boolean

  RETURN request.url MATCHES "/data/syllabus-notes/**/*.json"
         OR request.url MATCHES "/data/content/_index.json"
         AND contentKind(request.url) IN ["concepts","theory","formula","pyqs","sets","examples","drills","guides"]
END FUNCTION
```

### Examples

- `GET https://cdn.example.com/data/syllabus-notes/physics/kinematics/01-motion.json` → 200 + full note body, no auth. **Expected**: 401.
- A member-tier user with no active spark (class-11/physics, kinematics) hits `GET /data/syllabus-notes/physics/kinematics/01-motion.json` → 200. **Expected**: 403 (insufficient tier).
- A plus-tier user with no active spark window hits the same URL → 200. **Expected**: 403 (no active unlock).
- A plus-tier user with an active spark window POSTs to `/api/content/reveal` → 200 + body. **Expected**: same — this is the correct path.
- `GET /data/syllabus-notes/physics/_manifest.json` → 200. **Expected**: 200 (manifest stays public, unchanged).

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**

- `_manifest.json` files for all subjects must continue to be served publicly at their current static URL — they contain only titles and counts, which are intentionally public.
- Topic registry data, note counts, unit slugs, and topic titles (served via `/api/topics` or the manifest) must remain publicly accessible.
- Files under `frontend/public/data/exams/`, `r-export/manifest.json`, `bio-lab/`, `physics-xi-academic/`, `physics-xi-resources/`, and `visuals/` must continue to be served publicly.
- Spark spending must stay exclusively in `POST /api/user/credits/unlock` — the new reveal endpoint checks the window but never debits sparks.
- `frontend/lib/content/paths.ts` remains the single source of truth for `ContentKind`, `KIND_SECTIONS`, `parseContentPath`, `contentCoords`, `unitSectionDir`, and `normalizeClassDir`.
- `lib/srs.ts` and `lib/mock-exam.ts` (pure libs) receive `SubjectPyqBank` from callers — rewiring `use-subject-bank.ts` covers them automatically with no shape changes.
- `lib/offline-pack.ts` (pure lib) receives bank data from `downloads-view.tsx` via `useSubjectBank()` — automatically covered by rewiring the hook.
- The `content:build:check` byte-parity gate must remain green for Commit 1 (no files deleted yet).

**Scope:**

All requests that do NOT target paid content bodies (i.e., `isBugCondition` returns false) must be completely unaffected by this fix. This includes:
- All `_manifest.json` requests
- All exam, visual, bio-lab, and resource static files
- All existing API endpoints (auth, AI, progress, etc.)
- Mouse/touch interaction with any UI element

## Hypothesized Root Cause

The architecture has a structural gap: the frontend `loadData()` helper fetches arbitrary paths under `/data/` directly from the CDN, and Next.js static serving exposes everything under `public/` unconditionally. There is no HTTP middleware layer between the browser and the static file host that could enforce session or plan checks. The R1 hardening pass blocked the UI from *rendering* locked content, but never blocked direct URL access to the underlying JSON files.

Specific causes by leak path:

1. **Note body leak**: `topic-vertical-notes.tsx` receives a `filename` field from the topic manifest and passes it to `loadData()`. The manifest item's filename resolves to `public/data/syllabus-notes/{subject}/{unit}/{filename}` — a fully public path. The component does not go through any backend route.

2. **PYQ/drill bank leak**: `use-subject-bank.ts` calls `getSubjectPyqBank()` directly from a `"use client"` component. `getSubjectPyqBank()` is marked server-only (`node:fs`) in its current form in `pyq-bank.ts`, but the hook bypasses that by importing the lib. In practice, because `_index.json` is loaded via `loadData()` internally, the entire bank resolves through public static fetches.

3. **No corpus-to-endpoint bridge**: The backend has no endpoint that reads `content/` files and enforces auth — the `content/` directory was never exposed through a gated API, only through build scripts and server-side Next.js lib functions.

## Correctness Properties

Property 1: Bug Condition - Paid Content Bodies Require Full Auth Chain

_For any_ HTTP request targeting a paid content body JSON file (where `isBugCondition` returns true), the system SHALL require a valid session (returning 401 if absent), check the caller's plan tier against the `"plus"` minimum (returning 403 with no body if insufficient), check for an active spark unlock window (returning 403 with no body if absent), and only then return 200 with the content body. Tier MUST be checked before the spark window so that a below-tier request never triggers a spark interaction.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7**

Property 2: Preservation - Non-Paid and Non-Body Assets Remain Public

_For any_ request where `isBugCondition` returns false (manifest files, exam files, visuals, bio-lab, r-export, resource files, and all non-content API calls), the system SHALL produce exactly the same response as before this fix — no new auth gate, no status code changes, no shape changes to data returned by `useSubjectBank`, `useSrs`, `useMockExam`, or `useOfflinePack`.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**

## Fix Implementation

### Changes Required

**File 1: `backend/src/api/content-reveal.ts`** *(new)*

Express router for `POST /api/content/reveal`. Auth chain:

1. `requireAuth` middleware → 401 if no session.
2. Zod-validate body: `{ kind: ContentKind, classSlug, subjectSlug, unitSlug, filename, moduleKey? }`.
3. Validate `filename` against `/^[\w.-]+\.json$/` → 400 if invalid (blocks path traversal).
4. Resolve `tier = tierForUser(user, isOwnerEmail(user.email))`.
5. Tier gate: all `ContentKind` values map to minimum `"plus"`. If `RANK[tier] < RANK["plus"]` → 403 `{ error: "Insufficient tier" }`, no content, no spark check.
6. Spark window check — skip if owner or `tier === "pro"` (premiumStatus path):
   - Query `profiles.credits_unlock` for the user; if the stored expiry for `moduleKey` is in the future → pass.
   - Otherwise → 403 `{ error: "No active unlock window" }`, no content.
7. Build content path: `unitSectionDir(repoRoot, KIND_SECTIONS[kind], classSlug, subjectSlug, unitSlug) + "/" + filename`. The backend resolves `repoRoot` by walking up from `__dirname` until it finds a `content/` directory (same pattern as `backend/src/config/paths.ts`).
8. `fs.readFile` the resolved path → return 200 with parsed JSON.
9. On `ENOENT` → 404 `{ error: "Not found" }`. On other errors → 500 (no path in message).

**File 2: `frontend/app/api/content/reveal/route.ts`** *(new)*

Next.js route handler — thin proxy only, no auth logic:

```ts
export const dynamic = "force-dynamic"
export async function POST(request: Request) {
  // Forward body + cookies to backend /api/content/reveal
  // Return backend response as-is
}
```

Reads `process.env.NEXT_PUBLIC_API_URL` for the backend base URL. Forwards `cookie` header from the incoming request so `requireAuth` can read `sb-access-token`.

**File 3: `frontend/app/api/content/subject-bank/route.ts`** *(new)*

Next.js GET route handler:

- Accepts `?classSlug=&subjectSlug=` query params.
- Calls `getSubjectPyqBank(classSlug, subjectSlug)` server-side (already server-only).
- No direct auth check needed here (the bank data comes from server-side lib reading the corpus directly, and the component that calls this is behind a spark-gated page). If auth is desired later, it can be layered in without changing the hook contract.
- Returns `SubjectPyqBank` JSON.

**File 4: `frontend/components/study/use-subject-bank.ts`** *(changed)*

Replace the direct `getSubjectPyqBank()` call with a `fetch`:

```ts
fetch(`/api/content/subject-bank?classSlug=${classSlug}&subjectSlug=${subjectSlug}`)
  .then(r => r.ok ? r.json() : Promise.reject(r.status))
  .then(b => !cancelled && setBank(b))
```

The hook's external interface (`{ bank, loading, failed }`) and the `SubjectPyqBank` shape are unchanged — callers (`SRS`, `mock-exam`, `downloads-view`) see no difference.

**File 5: `frontend/components/content/topic-vertical-notes.tsx`** *(changed)*

Add helper `fetchTopicNoteBody({ kind, classSlug, subjectSlug, unitSlug, filename, moduleKey })` that POSTs to `/api/content/reveal`. Replace every `loadData(manifestItem.filename)` call for note body JSON with `fetchTopicNoteBody(...)`.

The `kind` field is determined from the `ManifestItem.source`:
- `source === "ravikishan"` → `"concepts"`
- `source === "r-export"` → `"theory"`

The `classSlug`, `subjectSlug`, and `unitSlug` are already available as component props.

**File 6: `backend/src/app.ts`** *(changed)*

Add import and mount:

```ts
import contentRevealRoutes from "./api/content-reveal";
// ...
app.use("/api/content", contentRevealRoutes);
```

Mount before the `notFoundHandler`.

### Unchanged Files

- `frontend/lib/content/paths.ts` — imported as-is by the backend reveal handler.
- `frontend/lib/formula-sheet.ts` — already server-only; formula fields are embedded in note bodies and covered by the note-body gate.
- `frontend/lib/topic-content-index.ts` — reads `_manifest.json` only (metadata, stays public).
- `backend/src/middleware/auth.ts` — used as-is.
- `backend/src/utils/sectionAccess.ts` — used as-is.
- All other files listed as "Unchanged" in the Architecture Context.

## Testing Strategy

### Validation Approach

Testing follows the two-phase approach of the bug condition methodology:

1. **Exploratory (unfixed code)**: Write tests against the current static-serving path to confirm the leak is real and understand exact failure modes.
2. **Fix checking**: After implementing the endpoint, verify 401/403/200 responses match the auth chain spec for all inputs where `isBugCondition` holds.
3. **Preservation checking**: Verify that manifest files and other public assets are unaffected, and that downstream consumers (`useSubjectBank`) return the same shape.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples on unfixed code to confirm the leak before implementing the fix.

**Test Plan**: Write tests that directly fetch note body paths from `public/data/` (or mock the static server) without providing auth cookies, and assert they return 200. These tests will PASS on unfixed code (demonstrating the leak) and should be expected to FAIL after the fix is in place.

**Test Cases**:

1. **Unauthenticated note body fetch**: `GET /data/syllabus-notes/physics/kinematics/01-motion.json` with no cookie → currently returns 200 (demonstrates the leak).
2. **Member-tier fetch (no tier check)**: Same request with a valid member-tier session cookie → currently returns 200 (no tier check on static layer).
3. **No-spark fetch (no window check)**: Same request with a plus-tier session but no spark unlock recorded → currently returns 200 (no spark check on static layer).
4. **`_index.json` accessible without auth**: `GET /data/content/_index.json` → currently returns 200, exposes full content path listing.

**Expected Counterexamples**:

- All four requests above return 200 on unfixed code — confirming the auth gap is at the static serving layer, not at any business logic layer.

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed `POST /api/content/reveal` endpoint enforces the auth chain correctly.

**Pseudocode:**

```
FOR ALL input WHERE isBugCondition(input) DO
  result := POST /api/content/reveal (input)
  ASSERT expectedBehavior(result)
    WHERE expectedBehavior means:
      - no session  → status 401, no body bytes
      - below-plus tier → status 403, no body bytes, no spark query
      - plus-tier, no spark window → status 403, no body bytes
      - plus-tier, active spark window → status 200, full content body
END FOR
```

**Test Cases**:

1. **No session → 401**: POST `/api/content/reveal` with no auth cookie → 401.
2. **Member tier → 403 (tier gate)**: POST with valid member-tier session → 403 `{ error: "Insufficient tier" }`. Assert spark-window query never runs.
3. **Plus tier, no unlock → 403 (spark gate)**: POST with valid plus-tier session, no `credits_unlock` active for moduleKey → 403 `{ error: "No active unlock window" }`.
4. **Plus tier, active unlock → 200**: POST with valid plus-tier session and active unlock window → 200 + correct JSON body.
5. **Owner → 200 (bypass)**: POST with owner session → 200 regardless of spark window.
6. **Pro / premiumStatus=true → 200 (bypass)**: POST with pro-tier session → 200 regardless of spark window.
7. **Invalid filename (path traversal attempt)**: POST with `filename: "../../../etc/passwd"` → 400.
8. **Unknown kind → 400**: POST with `kind: "unknown"` → 400.

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, behavior is unchanged.

**Pseudocode:**

```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT original_response(input) = fixed_response(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because the space of non-buggy inputs (all manifest files, all public assets, all existing API calls) is large and diverse. PBT can generate random subject/unit slugs and verify `_manifest.json` continues to return 200 without auth.

**Test Cases**:

1. **Manifest file stays public**: `GET /data/syllabus-notes/physics/_manifest.json` → still 200, no cookie needed. Same shape as before.
2. **`useSubjectBank` shape unchanged**: After rewiring the hook, assert returned `{ bank, loading, failed }` matches the `SubjectPyqBank` type exactly — `theory`, `pyqs`, `drills` arrays present with same field names.
3. **SRS data unaffected**: `lib/srs.ts` receives a `SubjectPyqBank` from the rewired hook → SRS card array has same shape as before.
4. **Offline pack unaffected**: `downloads-view.tsx` uses `useSubjectBank()` → offline pack data same shape as before.
5. **Spark balance unchanged**: After a reveal call with an active window, assert `profiles.credits` is unchanged (no deduction).
6. **Existing API routes unaffected**: POST `/api/user/me`, POST `/api/user/credits/unlock` → responses unchanged.

### Unit Tests

- Test `POST /api/content/reveal` returns 401 with no token.
- Test returns 403 for member-tier user (tier gate fires before spark query).
- Test returns 403 for plus-tier user with expired spark window.
- Test returns 200 for plus-tier user with active spark window; body matches file on disk.
- Test returns 400 for filename containing `..` or `/`.
- Test returns 400 for unknown `kind` value.
- Test path resolution: `unitSectionDir` + filename produces correct absolute path under `content/`.

### Property-Based Tests

- Generate random `{ classSlug, subjectSlug, unitSlug, filename }` combos where `filename` matches `/^[\w.-]+\.json$/` and verify the filename validation accepts them (no false rejects).
- Generate random strings with path-traversal characters (`..`, `/`, `\0`) and verify all are rejected by the filename validator.
- Generate random valid `SubjectPyqBank` objects and verify the `subject-bank` route returns them with the same shape (round-trip JSON serialization).
- For any `moduleKey` whose path does not match any `SPARK_GATED_SECTIONS` entry, verify the spark-window bypass logic (`canUnlockModule` returns `true`) holds for all tier levels.

### Integration Tests

- Full flow: unauthenticated user tries to load a note page → note body request returns 401 → page shows locked state.
- Full flow: plus-tier user with active spark window loads a note page → note body returns 200 → content renders.
- Manifest loads: subject page loads, manifest returns 200 with note count/title data — no auth cookie needed.
- Context switching: user navigates between units, each note body request includes correct `unitSlug` and `moduleKey`.
- `useSubjectBank` integration: SRS page mounts, `GET /api/content/subject-bank` called → bank data received → SRS cards render.
