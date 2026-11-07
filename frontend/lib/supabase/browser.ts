import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type OAuthProvider = "facebook" | "google";

let browserClient: SupabaseClient | null = null;

function getPublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) {
    throw new Error("Social sign-in is not configured for this app.");
  }
  return { url: url.replace(/\/+$/, ""), anonKey };
}

export function getSupabaseBrowserClient(): SupabaseClient {
  if (!browserClient) {
    const { url, anonKey } = getPublicConfig();
    browserClient = createClient(url, anonKey, {
      auth: {
        flowType: "pkce",
        persistSession: true,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return browserClient;
}

let cachedProviders: Record<string, boolean> | null = null;
let lastSettingsFetch = 0;
const SETTINGS_CACHE_TTL_MS = 60_000;

const SETTINGS_TIMEOUT_MS = 4_000;

/**
 * Advisory check of the public Auth settings for GOOGLE. Supabase is the
 * authority on whether a provider works; this only turns an explicitly
 * disabled Google provider into a friendly in-app message. It must never
 * block a working one:
 *   · GoTrue versions differ — some omit a provider key entirely. Treating a
 *     missing key as "disabled" blocked Google even with `google: true` live.
 *   · A slow/CSP-blocked settings request must not stall the click.
 *
 * Facebook is deliberately NOT touched: it is intentionally disabled in this
 * app (SHOW_FACEBOOK = false, Meta code-exchange credentials are broken), and
 * its strict `=== true` check is preserved so nothing here can re-enable it.
 * Cached for 60 seconds, fail-open on any error or timeout.
 */
export async function isOAuthProviderEnabled(provider: OAuthProvider): Promise<boolean> {
  const now = Date.now();
  if (cachedProviders && now - lastSettingsFetch < SETTINGS_CACHE_TTL_MS) {
    return cachedProviders[provider] === true;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SETTINGS_TIMEOUT_MS);
  try {
    const { url, anonKey } = getPublicConfig();
    const response = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: anonKey },
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return true;
    const settings = (await response.json()) as {
      external?: Record<string, boolean | undefined>;
    };
    const external = settings.external ?? {};
    // Only an explicit `false` disables Google; a missing key across GoTrue
    // versions must not stop a healthy provider. Facebook keeps its original
    // strict check — it is intentionally left disabled, do not "fix" it.
    cachedProviders = {
      facebook: external.facebook === true,
      google: external.google !== false,
    };
    lastSettingsFetch = now;
    return cachedProviders[provider] === true;
  } catch {
    return true;
  } finally {
    clearTimeout(timer);
  }
}
