# Mobile API — PYQs & formula sheets (mobile-v1)

**Owner:** Agent 2 (backend `/api/mobile/*`) · **Status:** live contract
**Batch:** parity plan P1 — content surfaces (`docs/guides/android-native-parity-plan.md` §0.4 #1–2)
**Rule:** additive only. These endpoints REUSE the website's generated content
manifest (`frontend/public/data/content/manifest.json`, built from `content/`)
— no duplicated curriculum data, no new authoring surface.

## Access tier (mirrors the website exactly)

The website registers both sections at `minLevel: "plus"`
(`frontend/lib/core/navigation.ts`). Both mobile routes therefore sit behind
`requireAuth` + `requireTier("plus")` — the same pair the existing
`GET /api/practice/pyqs` route uses. Unauthenticated calls get the standard
401 envelope; below-plus accounts get 403. Auth-gated responses are never
publicly CDN-cached (`Cache-Control: private, no-store`).

## Endpoints

### `GET /api/mobile/pyqs?class=&subject=&year=&limit=&cursor=`

Cursor-paginated catalog of the Past Year Questions bank
(`content/practice/questions/**` in the shared manifest — the same entries the
website's PYQ browser aggregates by year).

| Param | Meaning |
|---|---|
| `class` | class dir filter: `class-11` / `class-12` |
| `subject` | subject slug filter (e.g. `physics`) |
| `year` | NEB year parsed from the file name (e.g. `2023`) |
| `limit` / `cursor` | shared mobile pagination (`limit` clamped to 50) |

```json
{
  "ok": true,
  "data": {
    "items": [
      {
        "id": "practice/questions/class-11/physics/heat-and-temperature/01-neb-2023.json",
        "class": "class-11",
        "subject": "physics",
        "unit": "heat-and-temperature",
        "year": 2023,
        "title": "NEB 2023 — Thermodynamics",
        "questionCount": 12
      }
    ],
    "nextCursor": "eyJhbmNob3IiOiIyMCJ9"
  }
}
```

- `unit` is `null` for paper-level files that span units (the manifest stores
  them directly under `{class}/{subject}/`).
- `year` is `null` when the file name carries no 4-digit year.
- Rows are sorted by `id` (path) — deterministic, so the index-anchor cursor
  is stable between deploys.

### `GET /api/mobile/pyqs/file?path=practice/questions/…`

One PYQ entry's question lines — the detail payload for the native viewer.

```json
{
  "ok": true,
  "data": {
    "path": "practice/questions/class-11/physics/heat-and-temperature/01-neb-2023.json",
    "title": "NEB 2023 — Thermodynamics",
    "questions": ["Q1. State the first law of thermodynamics. [2]", "…"]
  }
}
```

`path` must start with `practice/questions/`, end with `.json`, and contain no
traversal — anything else is `400 BAD_PATH`.

### `GET /api/mobile/formulas?class=&subject=&unit=&limit=&cursor=`

Cursor-paginated catalog of the formula-sheet corpus
(`content/formulas/**` — one sheet per syllabus unit, as on `/formulas`).

```json
{
  "ok": true,
  "data": {
    "items": [
      {
        "id": "formulas/class-11/physics/heat-and-temperature/01-key-equations.json",
        "class": "class-11",
        "subject": "physics",
        "unit": "heat-and-temperature",
        "title": "Key Equations — Thermodynamics",
        "formulaCount": 9
      }
    ],
    "nextCursor": null
  }
}
```

### `GET /api/mobile/formulas/file?path=formulas/…`

One sheet's formula lines (same shape as the PYQ file endpoint, with
`formulas: string[]` instead of `questions`). Same path validation against
`formulas/`.

## Pagination convention

Unchanged from `docs/api/mobile-syllabus-notes.md`: `?limit=&cursor=`,
`limit` clamped to 50, cursor opaque (base64url `{anchor}` = next list index),
`nextCursor: null` ends the list. Reference implementation:
`backend/src/api/mobile/pagination.ts`.

## Contracts & tests

| Artifact | Path |
|---|---|
| Zod schemas | `backend/src/api/contracts/public-schemas.ts` (`mobilePyq*`, `mobileFormula*`) |
| Shared manifest reader | `backend/src/api/mobile/manifest.ts` |
| Routes | `backend/src/api/mobile/pyqs.ts`, `backend/src/api/mobile/formulas.ts` |
| Integration tests | `backend/tests/integration/mobile-pyqs.test.ts`, `mobile-formulas.test.ts` (fixture manifest under `tests/fixtures/mobile/manifest/`) |

## Bootstrap

`GET /api/mobile/home` now advertises `features.pyqs` / `features.formulas`
with `links` to these endpoints, so the native client can feature-detect
without hardcoding.
