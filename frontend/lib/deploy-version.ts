/**
 * Deployment version — shown in the footer as the platform's version badge.
 *
 * Scheme (owner request 2026-10-01): versioning STARTS at 0.0001 — "the first
 * version" — with the first deployment after commit 9482d580, and every
 * deployment after that increases it by exactly 0.0001 (0.0002, 0.0003, …).
 *
 * DO NOT EDIT BY HAND: the value below is regenerated from the git commit
 * count by `scripts/bump-deploy-version.mjs`, which runs automatically on
 * `npm run build` (Vercel + CI) and `npm run dev` via the package.json
 * prebuild/predev hooks. The value is deterministic per commit, so the
 * checked-in copy and a fresh build always agree.
 */
export const DEPLOY_VERSION = "0.0001";
