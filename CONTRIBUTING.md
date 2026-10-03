# Contributing

**Ravikishan's Platform** is an open study platform for NEB Class 11 & 12 (Nepali +2)
students: a free, offline-capable PWA with an AI tutor ("Veer") grounded in the real
syllabus + ingested textbooks, live web cross-checks, streamed answers, and AI-drawn
figures — across Physics, Chemistry, Biology, Mathematics, English and Nepali.

This repository is maintained by an agentic workflow. Read **`AGENTS.md`** and
**`BRANCHES.md`** before any edit — they are the authoritative spec for what is
allowed and where each file's work belongs.

## Getting started

Prerequisites: **Node 22+** (monorepo: `backend` workspace via npm workspaces).
Optional, only if ingesting books: **poppler** (`pdftotext`) and `unzip`.

```bash
git clone https://github.com/ownerforai-byte/educational-platform-global.git
cd educational-platform-global
npm install                 # installs the backend workspace

# configuration
cp .env.example backend/.env             # AI keys (AGNES_API_KEY, …) + Supabase admin key
cp frontend/.env.example frontend/.env   # Supabase + NEXT_PUBLIC_API_URL
```

Run both halves:

```bash
npm run dev:backend         # Express API (tsx watch, backend/src/index.ts)
cd frontend && npm run dev  # Next.js 15 App Router (frontend)
```

## The gates (run these before any push to main)

```bash
npm run check:all          # the full acceptance gate (all areas)
npm run check              # scoped: only the areas you touched
npm test                   # vitest suites in backend (security-policy, auth-flow,
                           # hardening, AI pipeline, truncation, image-gen, …)
npx tsc --noEmit -p backend/tsconfig.json
cd frontend && npx tsc --noEmit
```

Pushing `main` triggers the production deploy (Vercel frontend + Render backend).
**Never push main with failing checks.**

## Branch model (short version)

- `main` is the **only deployable branch**; 48 area branches (`content/physics`,
  `feature/ai-chat`, `backend/auth-api`, …) stage work per area, then merge back.
- One area per branch; merge back often; never force-push; never push all
  branches (each costs a Vercel preview build).
- Full map and sync policy: **`BRANCHES.md`**. Task classification, acceptance
  criteria and model routing for agent work: **`project-conductor.md`**.

## Area guides

| Area | Where the work lives |
|---|---|
| Notes & data (1,200+ JSON topics) | `content/ravikishan/**` — validated by Zod schemas, built with `npm run content:build` (check: `content:build:check`), health: `content:doctor` |
| Topic registry (single source of truth for topic → place → route) | `frontend/lib/topic-registry.ts`, emitted via `npm run registry:build` / `registry:check` |
| AI pipeline (chat chain, streaming, figures) | `backend/src/ai/**` — provider chain (Agnes → OpenRouter → internal), live SSE streaming, truncation repair, figure generation (`image-gen.ts`, Agnes image models + browser-side puter.js fallback). All of it is unit-tested (`backend/tests/ai/**`, `backend/tests/*image*.test.ts`) |
| Content UI / chat surfaces | `frontend/components/**`, `frontend/app/**` |
| Security posture | generic error bodies only (`x-error-id` + internal correlation), every route scopes data by `req.user.id` (no IDOR), production CORS allowlist, auth rate limits |

## Content pipeline

Curriculum content flows `scrape → transform → load` for NEB Class 11/12 and is
verified against a coverage snapshot. Book ingestion (PDF/MD/DOCX → JSON records)
lives in `backend/scripts/ingest-books.ts` and feeds the tutor's
`[CURRICULUM SOURCE]` context.

## Secrets hygiene (non-negotiable)

- Never commit a generated secret. Before committing:
  `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'`
  must come back clean, and `git log -S "<key-value>" -- <file>` for anything
  that was ever staged.

## Reporting & proposing

- **Bugs**: open an issue with the exact repro (URL/route, subject, class, the
  failing command and its output).
- **Content**: follow the `content/*` branch area for the subject you're touching;
  run `npm run content:build` and the schema check before merging.
- **Code**: open the relevant `feature/*` branch, keep it to one area, pass the
  gates above, and merge back to `main`.

Thanks for keeping the platform moving — every test and every merged branch
makes the tutor better for the students using it.
