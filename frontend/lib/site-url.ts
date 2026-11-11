/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ONE canonical public origin — owner request 2026-11-11: "make
 * ravikisan.vercel.app everywhere in working state; i am saving it but it
 * automatically is changing itself".
 *
 * WHY THE HOST KEPT DRIFTING: several surfaces each resolved the deployment
 * host their own way — OAuth used `window.location.origin`, the AI prompt and
 * sitemap used a raw `NEXT_PUBLIC_SITE_URL`, the resources viewer and the 3D
 * viewer share link used whatever origin the tab was opened on. So a preview
 * deployment, a pruned preview URL or a missing env var changed the host on
 * EVERY surface independently, and the pruned-preview variant 404'd (Vercel
 * DEPLOYMENT_NOT_FOUND). Nothing was "saved wrong" anywhere specific — the
 * host simply had no single owner.
 *
 * This module is that single owner. It resolves ONE origin:
 *   1. a real HTTPS custom domain / stable alias from `NEXT_PUBLIC_SITE_URL`
 *   2. otherwise the canonical production alias
 * Local dev never leaks into a production URL, and an ephemeral
 * `*.vercel.app` preview host is never accepted (previews get pruned).
 *
 * Runtime consumers MUST read `CANONICAL_SITE_URL` / `publicOrigin()` from
 * here instead of `window.location.origin` or a raw env read, so the host
 * cannot drift again. `lib/supabase/oauth-config.ts` re-exports these values
 * because the OAuth dashboards need the exact same strings.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/** The one stable production alias. */
export const PRODUCTION_ALIAS = "ravikisan.vercel.app";

/**
 * Only a real HTTPS deployment URL may override the canonical origin.
 *
 * 2026-11-11: a Vercel PREVIEW deployment URL was set as
 * `NEXT_PUBLIC_SITE_URL`, so it was inlined into the production bundle and
 * became the Google OAuth `redirectTo`. That preview was later pruned by
 * `scripts/prune-vercel-deployments.mjs`, so every Google sign-in landed on
 * Vercel's `DEPLOYMENT_NOT_FOUND` page ("page is removed or not exists").
 * Preview and branch `*.vercel.app` hosts are ephemeral by definition, so they
 * can never be an OAuth target: only the stable alias or a custom domain can.
 */
function configuredCanonicalOrigin(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (!raw) return null;
  try {
    const url = new URL(raw);
    // .env.example uses http://localhost:5173 for local dev — that must never
    // become the production OAuth target. Local is handled by publicOrigin().
    if (url.protocol !== "https:") return null;
    if (url.hostname.endsWith(".vercel.app") && url.hostname !== PRODUCTION_ALIAS) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

/** One production origin. Override with an HTTPS NEXT_PUBLIC_SITE_URL. */
export const CANONICAL_SITE_URL =
  configuredCanonicalOrigin() ?? `https://${PRODUCTION_ALIAS}`;

/** True for a loopback host, where the tab's own origin is the correct one. */
export function isLocalOrigin(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
}

/**
 * The origin to put in an absolute link: the current tab origin on localhost
 * (so a share/preview link is reachable), the canonical origin everywhere
 * else. Safe to call during SSR — it just returns the canonical origin.
 */
export function publicOrigin(): string {
  if (typeof window === "undefined") return CANONICAL_SITE_URL;
  return isLocalOrigin(window.location.hostname)
    ? window.location.origin
    : CANONICAL_SITE_URL;
}

/** Absolute URL for `path` on that same origin. */
export function publicUrl(path = "/"): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${publicOrigin()}${suffix}`;
}
