# Agent Pipeline

A locked, rule-gated, fallback-aware pipeline across your agents.

## Roles and assignments (division of labor)
| Role        | Agent   | Binary/route            | Does                                            | Commits/pushes |
|-------------|---------|-------------------------|-------------------------------------------------|----------------|
| **overseer**| **Cline (lead)** | —              | observes, interrupts, rewrites prompts, audits, commits, pushes | ✅ **only** |
| planner     | claude  | omniroute               | decomposes task into steps, file triage          | ❌ |
| implementer | kilocode (kilo) | `kilo run --auto` | writes/edits full files, mirrors sample shape    | ❌ |
| generator   | mistral | omniroute codestral     | fast boilerplate / single snippets, raw blocks   | ❌ |
| verifier    | agnes   | `agnes text chat`       | PASS/FAIL structure+content on FULL inlined file | ❌ |

## Standing rules (user mandate — codified in `rules/overseer.md`)
- The Overseer (Cline) watches every agent's terminal/logs in real time.
- On any drift, the Overseer INTERRUPTS the agent, writes the corrected
  prompt into its task, and restarts it — not the other way round.
- Every artifact is audited against real repo code before it counts.
- **Auto-approve is enabled at all times.** The Overseer commits + pushes
  at the end of each clean unit without asking permission. No force-push,
  one commit per concern, conventional messages.

## Setup
```bash
chmod +x router.sh lib/*.sh
```

Then edit `lib/agents.sh` — the `ROLE_CHAIN` entries map `name:binary`
(`claude`, `kilo`, `cline`, `agnes`, `omniroute` are real). `bigpickle`,
`codestral`, `vibe` are fallbacks. Edit `run_agent()` per tool's real syntax.

## Run it — including via ANY agent binary
```bash
./router.sh "Add a dark mode toggle to the settings page"

# OR the same, prompted into any agent — the FULL pipeline still activates:
agent-pipeline/bin/kilo   "generate the biology question set"
agent-pipeline/bin/agnes  "verify the chemistry set against the spec"
agent-pipeline/bin/claude "plan the Lab build-out"
```

Whichever front-door you type the prompt into, `bin/entry.sh` routes it to
`router.sh` and ALL roles run per their rules (see `TASKS.md` for the map).

## What it guarantees
- **Only one agent runs at a time** — `lib/lock.sh` uses `flock` (with a
  Windows-safe mkdir fallback); every role acquires the same lock.
- **Availability fallback** — if the primary agent's CLI isn't on PATH,
  the role's fallback is used; if none, the role is skipped + logged.
- **Scope gating** — before acting, each agent's `rules/<role>.md` is
  checked against the task (YES/NO). Out-of-scope work is skipped.
- **Full audit trail** — every decision is appended to `logs/router.log`,
  with each agent's raw output in its own timestamped log file.
- **Overseer final gate** — nothing reaches git until the Overseer
  structurally audits it (typecheck/build/log) and drives the commit.

## Wiring it to auto-fire
This script is manual-trigger by design (you call it with a task string).
To make it fire automatically on changes:
- **On file save:** `entr` or `inotifywait` watching your repo, calling
  `./router.sh "changes detected in $file"` on change.
- **On commit:** put the call in `.git/hooks/post-commit`.
- **On a schedule:** a cron entry calling it with a task pulled from a
  queue file or issue tracker.

## Extending it
- Add a role: add an entry to `ROLE_CHAIN` in `lib/agents.sh`, a case in
  `run_agent()`, a `rules/<newrole>.md` file, and add it to the `ROLES`
  array in `router.sh`.
- Add a retry loop after verifier FAIL: feed its log back into the
  implementer's task string and loop N times before giving up (same
  pattern as the earlier test-fix-retry script).
