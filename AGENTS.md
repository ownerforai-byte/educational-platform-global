# AGENTS.md — agentic workflow spec (read before every edit)

> 🛑 **HARDCODED AGENT DIRECTIVE: NEVER FLUCTUATE — KNOW WHAT TO DO & WHAT TO AVOID**
>
> ❌ **WHAT TO AVOID (STRICTLY PROHIBITED):**
> 1. **DO NOT READ ALL FILES OR SCAN CONTENT DIRS.** Over 8,800 files exist in this repo; >95% are repetitive notes/data in `content/ravikishan/**`. Mass-reading exhausts context, wastes credits, and causes decision fatigue/loops.
> 2. **DO NOT SEARCH OR EXPLORE ARBITRARY CONTENT FILES** unless the user explicitly gave you a specific topic JSON file name to inspect or fix.
> 3. **DO NOT GUESS ARCHITECTURE.** The entire platform architecture and routing are already mapped in `CORE_FILES.md`.
>
> 🎯 **WHAT TO DO (YOUR EXACT 3-STEP MISSION):**
> 1. **Targeted Reading Only:** Open ONLY `CORE_FILES.md` and the 1 or 2 files directly relevant to your task (e.g. `frontend/lib/navigation.ts` for routes, `frontend/lib/syllabus.ts` for curriculum topics).
> 2. **Execute & Link:** Create or modify the target file and connect its link/route to its intended parent in `navigation.ts` or `site-index.ts`.
> 3. **Mandatory Post-Task Classification:** Every agent MUST output the file classification for all touched files:
>    - `[IMPORTANT CORE FILE]` (architecture, router, schema, config)
>    - `[CONTENT FILE]` (notes, problem sets, mindmap JSON, rail slides)
>    If a new core architecture file was added, register it in `CORE_FILES.md`.

This repository uses an agentic workflow. Every coding agent must read
`CORE_FILES.md` and `project-conductor.md` before making any edit or commit.

Rule 0 — **where the workflow lives & core files isolation**:
This file points at `CORE_FILES.md` and `project-conductor.md`. The canonical spec is there: role
assignment, task classification, acceptance criteria, file map, and the isolated list of main architecture/routing files. Keep `project-conductor.md` and `CORE_FILES.md` in sync before changing the workflow.

Rule 0b — **branches**:
Read `BRANCHES.md` before creating, checking out, merging, or deleting any
branch, and before editing files (it maps every area to its branch: 48 area
branches like `content/physics`, `feature/ai-chat`, `backend/auth-api`).
`main` is the only deployable branch; merge area branches back often; never
push all branches (each one costs a Vercel preview build).

Rule 1 — **read before edit (TARGETED READING ONLY)**
Before making any change, read `CORE_FILES.md`, `project-conductor.md`, `BRANCHES.md`, and ONLY the
target file(s) and its direct routing link. DO NOT read unrelated files or scan content folders.
Reference the task-block type (`feature:`, `bugfix:`, `scrape:`, `transform:`,
`load:`, `setup:`, `config:`, `docs:`, `test:`) and pick the model accordingly:
Qwen 3.8/3.7 for core logic, GLM 5.3 for CRUD, MiniMax 2.6 Pro for UI, Solar
Mini for tests, Solar Pro for review.

Rule 1b — **mandatory post-task file classification**:
After completing your task, you must explicitly mark and output the classification of any touched or created files:
- **[IMPORTANT CORE FILE]**: Architecture, routing, schema, navigation, global configuration.
- **[CONTENT FILE]**: Syllabus JSON, notes, practice questions, mindmaps, rail slides.
If an important core file was created or renamed, update `CORE_FILES.md`.

Rule 2 — **secrets hygiene**
Never commit a generated secret. Before any commit:
`git log -S "<key-value>" -- <file>` and
`git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'`
must be clean.

Rule 3 — **acceptance gates**
- Scope checks with `npm run check` (only the areas you touched); run
  `npm run check:all` (the full gate) before pushing `main`. See `BRANCHES.md` §3.
- All committed backend files pass `npx tsc --noEmit` in the backend workspace.
- All committed frontend files pass `npx next build` (Turbopack) with exit 0.
- `npm test` (or vitest suite) passes: security-policy (14), auth-flow (21),
  hardening (27).
- No IDOR: every route scopes data by `req.user.id` (or equivalent owner check).
- Generic error bodies only (`x-error-id` + internal log correlation).
- Production rate limits: auth 5/min window, 3/hour reset; default 60/min.
- CORS: strict allowlist in production (no wildcards).
- Content pipeline: `scrape → transform → load` for NEB Class 11/12, verified
  against a coverage snapshot.
- `project-conductor.md` labels + acceptance criteria present in new task tags.

Overriding guidance: if the user says "do not change the workflow file" or "I
requested X", the explicit user request wins. Otherwise this file is the
authoritative plan for the agentic workflow run.
