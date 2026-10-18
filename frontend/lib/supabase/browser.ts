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

/**
 * Check the public Auth settings before redirecting, so a disabled social
 * provider becomes a useful in-app error instead of Supabase's raw 400 page.
 * Cached for 60 seconds with graceful fail-open on network hiccups.
 */
export async function isOAuthProviderEnabled(provider: OAuthProvider): Promise<boolean> {
  const now = Date.now();
  if (cachedProviders && now - lastSettingsFetch < SETTINGS_CACHE_TTL_MS) {
    return cachedProviders[provider] === true;
  }

  try {
    const { url, anonKey } = getPublicConfig();
    const response = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: anonKey },
      cache: "no-store",
    });
    if (!response.ok) {
      // If the settings probe fails due to a network or rate limit hiccup,
      // fail open (true) so the user's action still attempts OAuth.
      return true;
    }
    const settings = (await response.json()) as {
      external?: Record<string, boolean | undefined>;
    };
    cachedProviders = {
      facebook: settings.external?.facebook === true,
      google: settings.external?.google === true,
    };
    lastSettingsFetch = now;
    return cachedProviders[provider] === true;
  } catch {
    // If the check network times out or fails, fail open
    return true;
  }
}
