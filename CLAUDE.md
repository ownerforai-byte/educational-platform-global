# CLAUDE.md — read before any edit

Every agent working in this repository must read, in order:

1. **`BRANCHES.md`** — branch map (48 area branches), reserved worktree
   branches, and which `npm run check` applies to which area.
   Required before creating, checking out, merging, or deleting any branch,
   and before editing files.
2. `AGENTS.md` — agentic workflow rules (secrets hygiene, acceptance gates).
3. `project-conductor.md` — roles, task labels, quality gates,
   branch workflow (§7).
4. `AGENT_RULES.md` — mandatory rules (syllabus order, safety, security).

## Hard rules

- `main` is the only deployable branch; never force-push; never push all
  branches at once (each branch push costs a Vercel preview build).
- Reserved branches with other sessions' uncommitted work — do not touch:
  `agents/*`, `claude/*`, `worktree/*`.
- One area per branch (see `BRANCHES.md` for the area→branch map); merge back
  to `main` often; delete only after `git branch --merged main` confirms.
- Checks: `npm run check` (scoped to what you changed) before each commit;
  `npm run check:all` (full gate) before pushing `main`.
- No secrets in git — verify with `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN="`.
