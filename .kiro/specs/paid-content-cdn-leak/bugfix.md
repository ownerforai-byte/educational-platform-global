# Bugfix Requirements Document

## Introduction

Paid content bodies — note JSON files, PYQ question banks, formula sheet data, and drills — are served as publicly accessible static files under `frontend/public/data/`. The R1 hardening pass only prevented the UI from rendering locked content; it did not prevent direct HTTP retrieval. Any unauthenticated actor can `curl` the CDN URL and download full paid content without a session, tier, or spark unlock. This fix closes that gap by routing all paid content bodies through a server-side endpoint that enforces the full auth chain (session → tier → spark unlock window) before returning bytes.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a note body JSON is requested directly via its public CDN URL (e.g. `GET /data/syllabus-notes/{subject}/{unit}/*.json`) THEN the system returns the full paid content without any authentication or authorization check

1.2 WHEN a PYQ question-bank file is requested via its public CDN URL (resolved through `content/_index.json`) THEN the system returns the full paid question set without checking session, tier, or spark unlock state

1.3 WHEN formula sheet data is requested via its public CDN URL (from the `formulas` fields in note JSON files) THEN the system returns the full paid formula content without any auth check

1.4 WHEN drill content files are requested via their public CDN URLs (resolved through `pyq-bank.ts`) THEN the system returns the full paid drill set with no gating

1.5 WHEN a user's tier is below the required threshold (plus for notes/formulas, pro for PYQs/drills) THEN the system still serves the raw content bytes because the file is publicly accessible regardless of tier

1.6 WHEN a user has not spent a spark to unlock the relevant module THEN the system still serves the raw content bytes because no spark check exists at the static-file layer

### Expected Behavior (Correct)

2.1 WHEN a note body is requested AND the requester has no valid session THEN the system SHALL return 401 and SHALL NOT return any content bytes

2.2 WHEN a note body is requested AND the requester's tier is below plus THEN the system SHALL return 403 and SHALL NOT return any content bytes, and SHALL NOT spend a spark

2.3 WHEN a PYQ or drill body is requested AND the requester's tier is below pro THEN the system SHALL return 403 and SHALL NOT return any content bytes, and SHALL NOT spend a spark

2.4 WHEN a note, PYQ, formula, or drill body is requested AND the requester has a valid session and sufficient tier BUT has no active spark unlock window for the module THEN the system SHALL return 403 and SHALL NOT return any content bytes, and SHALL NOT spend a spark

2.5 WHEN a note, PYQ, formula, or drill body is requested AND the requester has a valid session, sufficient tier, AND an active spark unlock window THEN the system SHALL return 200 with the full content body

2.6 WHEN the auth chain is evaluated THEN the system SHALL check tier BEFORE checking the spark unlock window so that a below-tier request is rejected without consuming a spark

2.7 WHEN content is served through the gated endpoint THEN the system SHALL read content from the server-side corpus directory, NOT from public static files

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a `_manifest.json` file is requested for any subject THEN the system SHALL CONTINUE TO serve it publicly with no auth gate (titles and counts remain public)

3.2 WHEN topic registry data, note counts, unit slugs, or topic titles are requested THEN the system SHALL CONTINUE TO be publicly accessible without authentication

3.3 WHEN files under `frontend/public/data/exams/`, `r-export/manifest.json`, `bio-lab/`, `physics-xi-academic/`, `physics-xi-resources/`, or `visuals/` are requested THEN the system SHALL CONTINUE TO be served publicly without any auth gate

3.4 WHEN a user with an active spark unlock window requests content THEN the system SHALL CONTINUE TO serve content without deducting an additional spark (spark spending remains exclusively in `POST /api/user/credits/unlock`)

3.5 WHEN `frontend/lib/content/paths.ts` is referenced for content tree knowledge THEN the system SHALL CONTINUE TO treat it as the single source of truth for `ContentKind`, `parseContentPath`, and `contentCoords`

3.6 WHEN the `content:build:check` gate is run THEN the system SHALL CONTINUE TO pass byte-parity checks (no note body files are removed until a follow-up commit explicitly handles that step)

3.7 WHEN SRS cards are built via `lib/srs.ts` or mock papers via `lib/mock-exam.ts` THEN the system SHALL CONTINUE TO receive data in the same shape as today, sourced through the rewired `use-subject-bank.ts`

3.8 WHEN offline packs are built via `lib/offline-pack.ts` THEN the system SHALL CONTINUE TO receive bank data in the same shape, sourced through the gated bank fetch in `downloads-view.tsx`
