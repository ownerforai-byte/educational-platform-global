# Contributing

> Agents and humans alike: read **[`BRANCHES.md`](BRANCHES.md)** first — it maps
> every area of this codebase to its branch and defines the checks.

## Branch model

- `main` is the only deployable branch (pushing it triggers the Vercel
  production deploy).
- 48 area branches exist for parallel work: `content/*` (subjects),
  `feature/*` (frontend routes), `backend/*` (API areas), `test/*`, `ci/*`,
  `chore/tooling`, `docs/agents-guides`. All start at `main`.
- One area per branch: keep your change inside your branch's area (see the
  map in `BRANCHES.md` §2). Cross-area changes need justification in the PR.
- Reserved branches — other sessions' live worktrees, never touch:
  `agents/*`, `claude/*`, `worktree/*` (`BRANCHES.md` §4).
- Merge back to `main` often; delete a branch only after
  `git branch --merged main` confirms it. Never force-push; never push all
  branches at once (each branch push costs a Vercel preview build).

## Checks

| When | Command |
|---|---|
| Before every commit | `npm run check` — runs only the areas you touched |
| Before pushing `main` | `npm run check:all` — full gate (content JSON + frontend tsc/tests + backend tsc/tests) |

## Commits & PRs

- Use task labels from `project-conductor.md` §3: `feature:`, `bugfix:`,
  `scrape:`, `transform:`, `load:`, `setup:`, `config:`, `docs:`, `test:`.
- Fill in the PR template (area branch + check results).
- No secrets in git — verify with
  `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'`.
- Read order for agents: `CLAUDE.md` / `AGENTS.md` → `BRANCHES.md` →
  `project-conductor.md` → `AGENT_RULES.md`.
