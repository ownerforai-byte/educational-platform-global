# Contributing

Thanks for helping improve **Ravikisan's Platform** (NEB study vault).

## Before you code

1. Read [`AGENTS.md`](AGENTS.md) and [`CORE_FILES.md`](CORE_FILES.md) — do not bulk-read `content/**`.
2. One feature area per branch; see [`BRANCHES.md`](BRANCHES.md). `main` is production.
3. Never commit secrets. Run `git grep` for keys before push (see `AGENT_RULES.md`).

## Local setup

[`docs/guides/ONBOARDING.md`](docs/guides/ONBOARDING.md) — install, env files, `npm run dev`.

## Checks

```bash
npm run check          # scoped to your changes
npm run check:all      # full gate before pushing main
```

## Production app requirements

Store listing, legal URLs, and API metadata are documented in [`docs/guides/APP_REQUIREMENTS.md`](docs/guides/APP_REQUIREMENTS.md).  
Android checklist: [`play-store/publishing-checklist.md`](play-store/publishing-checklist.md).

## File classification

Mark touched files as **[IMPORTANT CORE FILE]** or **[CONTENT FILE]** in PR/commit notes (see `AGENTS.md`).