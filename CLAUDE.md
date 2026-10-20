# CLAUDE.md — read before any edit

Every agent working in this repository must read, in order:

1. **`CORE_FILES.md`** — **CRITICAL**: registry of isolated main architecture & routing files vs content files. **DO NOT READ ALL FILES.** Ignore content files unless explicitly asked.
2. **`BRANCHES.md`** — branch map (48 area branches), reserved worktree
   branches, and which `npm run check` applies to which area.
   Required before creating, checking out, merging, or deleting any branch,
   and before editing files.
3. `AGENTS.md` — agentic workflow rules (secrets hygiene, acceptance gates, post-task file marking).
4. `project-conductor.md` — roles, task labels, quality gates,
   branch workflow (§7).
5. `AGENT_RULES.md` — mandatory rules (syllabus order, safety, security, targeted reading).

## Hard rules

- **HARDCODED BOUNDARY — NEVER READ ALL FILES:** Over 95% of repository files (>8,000 files) are content payloads (`content/ravikishan/**`). Read only `CORE_FILES.md` and the 1 or 2 specific files directly tied to your goal.
- **WHAT TO AVOID:** Never scan content directories or read unrequested content notes. Never guess routing. Never perform unrequested refactors.
- **WHAT TO DO:** Do only what is asked. Determine the route/parent link in `frontend/lib/navigation.ts`, place the file, connect the route, and verify.
- **FILE CLASSIFICATION MANDATE:** Every agent MUST end their task by classifying all touched files as either `[IMPORTANT CORE FILE]` or `[CONTENT FILE]`.
- `main` is the only deployable branch; never force-push; never push all
  branches at once (each branch push costs a Vercel preview build).
- Reserved branches with other sessions' uncommitted work — do not touch:
  `agents/*`, `claude/*`, `worktree/*`.
- One area per branch (see `BRANCHES.md` for the area→branch map); merge back
  to `main` often; delete only after `git branch --merged main` confirms.
- Checks: `npm run check` (scoped to what you changed) before each commit;
  `npm run check:all` (full gate) before pushing `main`.
- No secrets in git — verify with `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN="`.
