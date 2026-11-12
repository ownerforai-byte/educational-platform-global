# scripts/

Purpose-grouped tooling for CI, builds, audits, and deploys.

| Folder | Purpose | Key entrypoints |
|--------|---------|-----------------|
| `ci/` | Gates & affected test runners | `scoped-check.mjs`, `test-affected.mjs`, `lint-ratchet.mjs`, `ai-regression.mjs`, `check-smoke-env.mjs` |
| `build/` | Content/corpus/classify helpers | `build-content-corpus.mjs`, `classify-files.mjs`, `content-health-check.mjs`, `build-affected.mjs`, `content-ledger-live.mjs` |
| `audit/` | Repo health ratchets | `dead-end-ratchet.mjs`, `audit-empty-scopes.mjs`, `mobile-responsive-check.mjs` |
| `deploy/` | Worktrees & Vercel prune | `worktree-flow.mjs`, `prune-vercel-deployments.mjs` |
| `enrichment/` | Mindmap / enrichment pipeline | unchanged |
| `tokenkit/` | Token/graph helpers | unchanged |

Root (keep here — invoked directly):

- `graphify.mjs`, `graphify-mcp.mjs`, `agent-brief.mjs`

Baselines (`lint-ratchet-baseline.json`, `dead-end-baseline.json`, `empty-scopes-baseline.json`, …) stay at `scripts/` root so paths remain `scripts/<name>-baseline.json`.

Prefer `npm run check` / other root `package.json` scripts over calling paths by hand.
