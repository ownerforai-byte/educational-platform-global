# Ravikisan's Platform — NEB Study Vault

> Curriculum-aligned, exam-grade study infrastructure for **NEB Class 11 & 12** students in Nepal.
> Free, open-source, and built to work on a phone with a slow connection.

**Live:** [ravikisan.vercel.app](https://ravikisan.vercel.app) · **API:** [rn01.onrender.com](https://rn01.onrender.com)

---

## What it is

A full-stack study platform covering Physics, Chemistry, Biology, Mathematics, English and Nepali for Nepalese +2 students. Core features:

- **Veer AI tutor** — syllabus-grounded answers via Agnes (primary) + 10 free-tier LLM fallbacks so one provider outage never takes the tutor down
- **Content vault** — ~1,000 concept notes, formula sheets, PYQ banks, mindmaps, 3D labs and formula derivations locked behind a spark-gated endpoint (CDN leak closed)
- **Plan-based access** — each plan opens a different set of sections, applied consistently across the app
- **PWA** — offline-capable, installable on Android (Play Store) and iOS (Add to Home Screen)
- **Visual mindmaps** — interactive SVG branch trees per syllabus unit with KaTeX derivations

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 · React 19 · TypeScript · Tailwind CSS · shadcn/ui |
| Backend | Express 4 · TypeScript ESM · Supabase (PostgreSQL) |
| AI | Agnes (primary) · 10 free OpenAI-compatible fallbacks (LLM7, OVHcloud, OpenRouter …) |
| Deploy | Vercel (frontend) · Render (backend) |
| CI | GitHub Actions — CI, E2E smoke, Lighthouse, URL hygiene, keep-alive |

---

## Repository layout

```
/
├── frontend/          Next.js 16 app (Vercel)
│   ├── app/           App Router pages (150+ routes)
│   ├── features/      Domain modules (auth, lab, ai, practice, …)
│   ├── lib/           core/ · state/ · streams/ · + Phase 5 shims
│   ├── types/         Shared type hub (api, lab, content)
│   ├── components/    UI + shims into features/
│   └── tests/         Vitest (+ fixtures/)
├── backend/           Express API (Render)
│   ├── src/api/       Domain-grouped routers
│   ├── src/ai/        Agnes + free-tier provider chain, prompts
│   ├── src/middleware/ Auth, rate limits, spark gates
│   └── tests/         unit/ · integration/ · fixtures/
├── content/           Authored JSON corpus (notes, PYQs, formulas …)
├── content-tools/     generators/ · enhancers/ · validators/ · migrators/ · fixers/
├── scripts/           ci/ · build/ · audit/ · deploy/ (+ enrichment, tokenkit)
├── packages/shared/   Cross-app types & constants (@rn/shared)
├── infra/             Optional Dockerfiles + compose
├── docs/              architecture/ · guides/ · api/ · adr/ · runbooks/
├── plan-pro-architecture.md  Restructuring plan (Phases 0–12)
├── CORE_FILES.md      Agent route/architecture registry
├── AGENTS.md          Agent workflow guide
├── BRANCHES.md        48-branch area map
├── SOURCES.md         Content rights ledger
├── SECURITY.md        Security policy & disclosure process
└── CONTENT_LICENSE.md Code = MIT · Content = CC BY-NC 4.0
```

---

## Quick start

```bash
# Prerequisites: Node 24+, npm 11+

npm install

# --- Frontend (http://localhost:5173) ---
cd frontend
cp .env.example .env.local          # fill in NEXT_PUBLIC_* vars
npm run dev                          # Next.js dev server

# --- Backend (http://localhost:3000) ---
cd ../backend
cp .env.example .env                 # fill in SUPABASE_* + AGNES_API_KEY
npm run dev                          # tsx watch

# --- Content pipeline ---
cd ..
npm run content:build                # rebuild public/data JSON
npm run content:build:check          # byte-parity gate (CI uses this)
```

---

## Environment variables

### Frontend — `frontend/.env.local`

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (RLS-safe) |
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (used for ISR, OG images) |

### Backend — `backend/.env`

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only — never expose to frontend |
| `AGNES_API_KEY` | Primary LLM provider (Agnes / apihub) |
| `PORT` | Server port (default 3000) |
| `FRONTEND_URL` | Allowed CORS origin |

Optional free-tier fallbacks (any subset works): `LLM7_API_KEY`, `OVH_AI_API_KEY`, `OPENROUTER_API_KEY`, `MISTRAL_API_KEY`, `DEEPSEEK_API_KEY`, `SAMBANOVA_API_KEY`, `HF_TOKEN`.

Set `FREE_LLM_DISABLED=1` to disable the fallback pool entirely.

Full variable list: `.env.example` (root) and `backend/.env.example`.

---

## Tests

```bash
# Frontend
cd frontend && npx vitest run             # full suite
npx vitest run tests/lib tests/features  # targeted

# Backend
cd backend && npx vitest run             # full suite
npx vitest run tests/auth-flow.test.ts   # one file

# Scoped gate (run from repo root after any change)
npm run check          # only the areas you changed
npm run check:all      # full gate — required before pushing main
```

---

## Deployment

| Service | Branch trigger | Build command | Start |
|---|---|---|---|
| Vercel (frontend) | push to `main` | `cd frontend && npm run build` | Next.js server |
| Render (backend) | push to `main` | `cd backend && npm run build` | `node dist/index.js` |

The backend refuses to start in production without `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Set them in the Render service environment dashboard.

A GitHub Actions keep-alive job pings `/health` every 10 minutes to keep the Render free-tier instance warm (`.github/workflows/keep-alive.yml`).

---

## Content rights

Platform-authored notes and materials are released under **CC BY-NC 4.0**.
Code is **MIT**. See `CONTENT_LICENSE.md`.

The `backend/kb/` corpus was derived from third-party textbooks — rights status is under review. See `SOURCES.md` for the full ledger and `SECURITY.md` for the takedown process.

---

## Agent & contributor workflow

This repo uses a 48-branch area workflow with scoped CI checks.

1. Read `AGENTS.md` for the golden rules and orientation guide
2. Read `BRANCHES.md` for the branch map and check gates
3. `npm run check` before every commit; `npm run check:all` before pushing `main`
4. Never push to `main` with failing checks; never force-push

See `docs/architecture/OVERVIEW.md` for the full system design.

---

## Security

Report vulnerabilities privately — see `SECURITY.md`.
Do not open public issues for security bugs.
