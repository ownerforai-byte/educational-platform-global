/**
 * Deployment version — shown in the footer as the platform's version badge.
 *
 * Scheme (owner request 2026-10-01): versioning STARTS at 0.0001 — "the first
 * version" — with commit e4ef69fa, and every deployment after that increases
 * by exactly 0.0001 (0.0002, 0.0003, …). The next build (efb00b6c) displayed
 * 0.0001 too while the counter was falling back, so the anchor keeps the
 * visible sequence consecutive.
 *
 * DO NOT EDIT BY HAND: the value below is regenerated from the git commit
 * count by `scripts/bump-deploy-version.mjs`, which runs automatically on
 * `npm run build` (Vercel + CI) and `npm run dev` via the package.json
 * prebuild/predev hooks. The value is deterministic per commit, so the
 * checked-in copy and a fresh build always agree.
 */
export const DEPLOY_VERSION = "0.0020";
