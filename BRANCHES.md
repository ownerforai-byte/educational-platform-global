# BRANCHES.md — Branch Map & Workflow (read before any edit)

> **Rule:** Any coding agent MUST read this file before creating, checking out,
> merging, or deleting a branch, and before editing any file (to know which
> area branch the change belongs to). Referenced by `AGENTS.md`,
> `AGENT_RULES.md`, and `project-conductor.md`.

---

## 1. Ground rules

1. **`main` is the only deployable branch.** Pushing `main` triggers the
   Vercel production deploy (frontend) and Render deploy (backend). Never
   push to `main` with failing checks.
2. **One area per branch.** Work on files that belong to your branch's area.
   Cross-area changes are allowed only when the user explicitly asks.
3. **Merge back to `main` often.** Branches drift; a stale branch that never
   merges is a fork. After your change passes checks: `git checkout main`,
   `git merge <your-branch>`, push when the user asks.
4. **Delete a branch only after it is merged** — verify with
   `git branch --merged main`. Never `-D` a branch that has unmerged commits.
5. **Never force-push** any branch. Never push all branches to origin:
   each pushed branch triggers a Vercel preview build (costs build minutes).
   Push only `main` (and the single branch the user asked you to push).
6. **Reserved branches — do not touch:** `agents/*`, `claude/*`, `worktree/*`
   are checked out in live agent worktrees and hold uncommitted work
   (see §4). Do not check out, delete, or modify them.
7. **Check before you edit** (see §5): `npm run check` scopes itself to the
   areas you changed; `npm run check:all` is the full gate before any push.

---

## 2. The 48 area branches (all start at `main`)

### content/* — data & notes (10)
| Branch | Scope |
|---|---|
| `content/physics` | `content/ravikishan/class-11-notes/physics/**` |
| `content/chemistry` | `content/ravikishan/class-11-notes/chemistry/**` |
| `content/biology` | `content/ravikishan/class-11-notes/biology/**` |
| `content/english` | `content/ravikishan/class-11-notes/english/**` |
| `content/mathematics` | `content/ravikishan/class-11-notes/mathematics/**` |
| `content/nepali` | `content/ravikishan/class-11-notes/nepali/**` |
| `content/class-11` | `content/ravikishan/class-11/**` |
| `content/class-12` | Class 12 content when it lands |
| `content/r-export` | `content/r-export/**` |
| `content/exams-lessons` | `content/exams/**`, `content/lessons/**` |

### feature/* — frontend routes & UI (22)
`feature/home` · `feature/ai-chat` · `feature/ai-quiz` · `feature/notes` ·
`feature/quiz` · `feature/lab` · `feature/credits` · `feature/progress` ·
`feature/bookmarks` · `feature/search` · `feature/admin-owner` ·
`feature/auth` · `feature/visuals-mindmap` · `feature/derivations-theorems` ·
`feature/syllabus-levels` · `feature/loksewa` · `feature/resources` ·
`feature/world-knowledge` · `feature/periodic-table` ·
`feature/lessons-subjects` · `feature/exam-countdown` · `feature/pwa-offline`

Scope: the matching route under `frontend/app/(app)/**` or
`frontend/app/**`, its components, and feature folders
(`frontend/features/**`). UI + tests only — no backend changes on these.

### backend/* — API areas (6)
| Branch | Scope |
|---|---|
| `backend/ai-api` | `backend/src/api/ai*.ts`, `backend/src/ai/**` |
| `backend/auth-api` | `backend/src/api/auth.ts`, middleware, session |
| `backend/notes-api` | `ravikishan-notes.ts`, `r-notes.ts`, chapters/topics/subjects |
| `backend/progress-api` | `progress.ts`, `bookmarks.ts`, `chat-history.ts`, `user.ts` |
| `backend/admin-api` | `admin.ts`, `owner.ts`, `storage.ts` |
| `backend/search-api` | `search.ts`, `resources.ts` |

### test/* — test suites (4)
`test/frontend-unit` · `test/backend-unit` · `test/content-validate` ·
`test/smoke` — for test-only work (adding/repairing suites, fixtures).

### ci/* — builds & deploys (4)
`ci/build-check` · `ci/lint-typecheck` · `ci/deploy-vercel` ·
`ci/deploy-render` — for pipeline/config work only.

### other (2)
`chore/tooling` (scripts, lint/format config) · `docs/agents-guides`
(`*.md`, agent instruction files).

---

## 3. Which check runs for which area

| Area you touched | `npm run check` runs |
|---|---|
| `content/**` | JSON validation of all 1240 content files (~1–3 s) |
| `frontend/**` | `tsc --noEmit` + 3 content/note test files (~30–60 s) |
| `backend/**` | `tsc --noEmit` + backend vitest suite (~30–60 s) |
| nothing in those three | exits 0 with "nothing to check" |
| before pushing `main` | `npm run check:all` — full gate (all three) |

`npm run check:content` runs the deeper content health scan
(BOM repair + `_index.json` completeness) — see `scripts/content-health-check.mjs`.

## 4. Reserved worktree branches (do not touch)

| Branch | Worktree | Uncommitted files |
|---|---|---|
| `agents/greeting-response` | `rn.worktrees/greeting-response` | 39 |
| `claude/biology-notes-content-a50317` | `.claude/worktrees/…` | 403 |
| `claude/eloquent-chandrasekhar-a7839c` | `.claude/worktrees/…` | 13 |
| `worktree/roo-ifbdm` | `~/.roo/worktrees/rn-ifbdm` | 0 |

These belong to other live sessions. Their work exists **only** in those
directories — removing the worktree or force-deleting the branch destroys it.

## 5. Standard workflow per change

```bash
git checkout <area-branch>        # e.g. content/physics
# ... edit files within that area ...
npm run check                     # scoped: only your area's checks
git add <files you touched>       # never `git add -A` across areas
git commit -m "<type>: <why>"     # type from project-conductor.md §3
git checkout main && git merge <area-branch>
npm run check:all                 # full gate before pushing main
# push only when the user asks
```
