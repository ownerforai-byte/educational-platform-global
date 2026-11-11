import { PUBLIC_SUPABASE_URL } from "./public-config";
import {
  CANONICAL_SITE_URL,
  PRODUCTION_ALIAS,
  publicOrigin,
} from "@/lib/site-url";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GOOGLE OAUTH WIRING — owner request 2026-11-08: "continue with google is not
 * working ... saying access is blocked --- wire it to the right place"
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * WHY GOOGLE SAYS "Access blocked": Google rejects an OAuth request whose
 * redirect URI is not registered on the OAuth client ("Access blocked: This
 * app's request is invalid" / redirect_uri_mismatch). With Supabase the URI
 * Google sees is NOT the app page — it is
 *     https://<supabase-project>.supabase.co/auth/v1/callback
 * The Supabase project was migrated (lqzjcwbkpeiqslqhxxmu is the current one,
 * tsvbksfegvdjwczzfdcx the legacy one), so a Google OAuth client still carrying
 * the old callback URL blocks every sign-in. Supabase must ALSO list the final
 * app callback in Authentication → URL Configuration → Redirect URLs.
 *
 * The other half of the bug was in our own code: `redirectTo` was built from
 * `window.location.origin`, so a preview URL, a www/apex difference or a custom
 * host produced a DIFFERENT callback each time. Only one origin can be
 * whitelisted, so those requests were rejected too. `oauthCallbackUrl()` now
 * resolves ONE canonical destination for production and keeps the current
 * origin only for local development.
 *
 * These two exported URLs are the exact values to paste into the dashboards:
 *   SUPABASE_AUTH_CALLBACK_URL → Google Cloud Console, Authorized redirect URIs
 *   CANONICAL_SITE_URL/auth/callback → Supabase, Redirect URLs (+ Site URL)
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * The canonical origin now lives in `lib/site-url.ts` so every surface (OAuth,
 * AI prompt, sitemap, share links) resolves the SAME host instead of each
 * keeping its own copy that could drift. Re-exported here because the Google /
 * Supabase dashboards need these exact strings next to the OAuth wiring.
 */
export { CANONICAL_SITE_URL, PRODUCTION_ALIAS };

/** Register THIS exact URL in Google Cloud Console → Authorized redirect URIs. */
export const SUPABASE_AUTH_CALLBACK_URL = `${PUBLIC_SUPABASE_URL}/auth/v1/callback`;

/** Register THIS exact URL in Supabase → Authentication → Redirect URLs. */
export const APP_OAUTH_CALLBACK_URL = `${CANONICAL_SITE_URL}/auth/callback`;

/**
 * The single redirectTo passed to signInWithOAuth. Local dev stays on its own
 * origin so the callback is reachable; every deployed host uses the ONE
 * canonical, whitelisted callback instead of whatever URL the student opened.
 */
export function oauthCallbackUrl(): string {
  return `${publicOrigin()}/auth/callback`;
}

/** True when Google/Supabase refused the app itself, not when a user cancels. */
export function isOAuthAccessBlocked(error: unknown): boolean {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : ((error as { message?: string } | null)?.message ?? "");
  const code = (error as { code?: string } | null)?.code ?? "";
  return (
    code === "validation_failed" ||
    /redirect[_ ]?uri|access blocked|blocked|invalid_client|invalid request|not allowed from this origin|provider.*not.*enabled/i.test(
      raw,
    )
  );
}

/** Actionable message for the owner instead of an opaque "blocked" string. */
export function oauthAccessBlockedMessage(label = "Google"): string {
  return `${label} sign-in was blocked by the provider. Register ${SUPABASE_AUTH_CALLBACK_URL} as an Authorized redirect URI in Google Cloud Console, and allow ${APP_OAUTH_CALLBACK_URL} in Supabase → Authentication → URL Configuration. You can sign in with email and password meanwhile.`;
}
