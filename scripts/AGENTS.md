# Scripts guide — run the tool, don't read it

Scoped to `scripts/**`. Almost everything here is already wrapped by a root
`npm run` script. Prefer the wrapper: it passes the right flags and paths.
Open a script's source only when you are changing that script.

## Verification

| Command | Use |
|---|---|
| `npm run check` | Scoped gate for the areas you changed — default before reporting done |
| `npm run check:all` | Full gate; required before pushing `main` |
| `npm run test:affected -- <paths>` | Just the suites impacted by those files |
| `npm run test:affected:list` | Print the selection without running it |
| `npm run build:affected` | Build only the workspaces your change touches |
| `npm run classify -- <paths>` | Label files `[IMPORTANT CORE FILE]` / `[CONTENT FILE]` for the final report |
| `npm run check:core` | Core-file guard used by the gates |

## Orientation (cheaper than reading source)

| Command | Use |
|---|---|
| `npm run brief -- <task keywords>` | Candidate edit points (file + symbol + line), the scoped guide, and covering tests — before you read anything |
| `npm run impact -- <file>` | Blast radius: every file that depends on it and the tests that exercise it |
| `npm run graphify:query -- "<question>"` | Find the symbols/modules for a task |
| `npm run graphify:update` | Rebuild the knowledge graph if it looks stale |
| `npm run graphify:gods` | Architectural hubs |
| `npm run tokenkit:pack` / `:cost` | Context packing and token-cost reporting |
| `npm run registry:check`, `npm run ledger:check` | Registry and content-ledger consistency |

## Content

| Command | Use |
|---|---|
| `npm run check:content` | Health check + strict schema gate |
| `npm run content:doctor` | Diagnose corpus problems |
| `npm run content:build` / `:check` | Rebuild / verify derived mindmaps |
| `npm run audit:scopes`, `:mindmap`, `:visuals` | Coverage audits |
| `npm run mobile:check` | Mobile layout checks |

## Do not run

The root of this directory also holds many **one-off historical generators and
fix-ups** (`add-*.py`, `add-*.cjs`, `fix-*.py`, `bio-pack-*.cjs`,
`generate-*-docs.mjs`, `agent_test.py`). They were written for a single past
content operation: they are not idempotent, are not part of any gate, and can
overwrite curated payloads. Treat them as read-only history. If a task seems to
need one, ask before executing it.

Adding a script: write it here, expose it through a root `npm run` wrapper, and
give it a `--check`/dry-run mode if it mutates anything.
