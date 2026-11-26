# Mobile API — syllabus, notes & feed reuse map (mobile-v1)

**Owner:** Agent 2 (backend `/api/mobile/*`) · **Status:** live contract
**Rule:** `/api/mobile/*` is **additive only**. The native Android client
(`android-native/`) reuses the existing website API wherever the response
shape already works — we do **not** duplicate curriculum payloads.

## What the native app should call

### Syllabus (class → subject → unit/topic)

**`GET /api/mobile/syllabus`** (mobile-v1, live) — the native syllabus screen's
one-call tree: every active class with its active subjects nested
(id/slug/name only, ordered, CDN-cached, served from the same tables + shared
content cache as the website). Chapters and topics are NOT in this payload —
the app fetches a subtree per subject from the existing routes below:

| Step | Route | Notes |
|---|---|---|
| Classes | `GET /api/classes` | Top level of the syllabus tree |
| Subjects | `GET /api/subjects` | Filter by class id |
| Chapters / topics | `GET /api/chapters`, `GET /api/topics` | Per subject |
| Lessons | `GET /api/lessons` | Topic detail |

### Notes

| Need | Route | Notes |
|---|---|---|
| Note lists | `GET /api/r-notes` (+ `GET /api/ravikishan-notes`) | Existing payloads unchanged |
| Gated reveals | `POST /api/content` (reveal controller) | Same spark/tier rules as web |

### Feeds / community-style lists

Existing community endpoints stay authoritative. **Any new mobile list
endpoint** (or any mobile endpoint that paginates) MUST use the shared
cursor-pagination convention implemented in
`backend/src/api/mobile/pagination.ts`:

```text
Request:  ?limit=20&cursor=<opaque base64url>
Response: { "items": [...], "nextCursor": "<opaque>" | null }
```

- `limit` is clamped server-side to **50** (over-asks are clamped, not rejected).
- `cursor` is opaque to clients; echo `nextCursor` back verbatim.
- `nextCursor: null` means end of list.
- Reference implementation + pinned tests:
  `GET /api/mobile/demo/page`,
  `backend/tests/integration/mobile-pagination.test.ts`.

### Live mobile-v1 list endpoints (session 3)

| Endpoint | Data source | Pagination |
|---|---|---|
| `GET /api/mobile/units?subject=` | `chapters`/`topics` tables (shared content cache) | single subject per call — no pagination needed |
| `GET /api/mobile/notes?subject=&chapter=` | r-notes manifest (same file as `/api/r-notes`) | cursor, anchor = list index |
| `GET /api/mobile/practice` | `content/practice/exams/*.json` (same as `/api/tests`) | cursor, anchor = list index |
| `GET /api/mobile/community?category=` | `community_feed_posts` (public only) | keyset cursor on `created_at` DESC |

### Bootstrap

| Need | Route | Notes |
|---|---|---|
| Feature flags + route links | `GET /api/mobile/home` | Cheap, cacheable, no DB |
| Store/legal links | `GET /api/mobile/requirements` | Mirrors `/api/v2/meta` requirements |

## Auth & FCM

See [`mobile-auth-fcm.md`](mobile-auth-fcm.md) — the native client consumes
the existing `/api/auth/*` and `/api/access-requests/fcm` routes as-is
(documented, unchanged).

## OpenAPI

`docs/api/mobile-openapi.yaml` — the full `/api/mobile` surface. Existing
`/api/*` routes remain documented in `docs/api/openapi.yaml`.

## Deferral note

`GET /api/mobile/home` currently returns static feature flags and links. A
personalized home feed (per-student cards) is **deferred** until the native
auth layer (Agent 3, Phase 3) ships; it will then be added under
`/api/mobile/*` as a new additive route — never by reshaping an existing one.
