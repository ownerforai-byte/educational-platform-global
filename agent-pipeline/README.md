# Agent Pipeline

A locked, rule-gated, fallback-aware pipeline across your agents.

## Roles and assignments
| Role         | Primary  | Fallback  |
|--------------|----------|-----------|
| planner      | Claude Code | Bigpickle |
| implementer  | Kilocode | Cline     |
| generator    | Mistral  | Codestral |
| verifier     | Agnes    | (none)    |

## Setup
```bash
chmod +x router.sh lib/*.sh
```

Then edit `lib/agents.sh`:
- The `ROLE_CHAIN` entries map `name:binary`. `claude`, `kilo`, `cline` are
  real installed CLI commands. `bigpickle`, `mistral`, `codestral`, `agnes`
  are placeholders — replace with the actual command that launches each on
  your machine (write a thin wrapper script if they're API-only).
- The `run_agent()` function has one `case` block per agent — edit the
  actual command-line flags to match each tool's real syntax.

## Run it
```bash
./router.sh "Add a dark mode toggle to the settings page"
```

## What it guarantees
- **Only one agent runs at a time** — `lib/lock.sh` uses `flock`; every
  role acquires the same lock before doing anything and releases it right
  after. Others simply wait.
- **Availability fallback** — if the primary agent's CLI isn't installed
  or isn't on PATH, the fallback for that role is used automatically. If
  neither is available, that role is skipped and logged, not blocked.
- **Scope gating** — before any agent acts, its own `rules/<role>.md` is
  checked against the task (YES/NO). Out-of-scope work is skipped, not
  forced through.
- **Full audit trail** — every decision (activated / skipped / failed /
  done) is appended to `logs/router.log`, with each agent's raw output in
  its own timestamped log file.

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
