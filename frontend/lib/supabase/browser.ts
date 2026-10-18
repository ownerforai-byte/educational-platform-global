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

/**
 * Check the public Auth settings before redirecting, so a disabled social
 * provider becomes a useful in-app error instead of Supabase's raw 400 page.
 */
export async function isOAuthProviderEnabled(provider: OAuthProvider): Promise<boolean> {
  const { url, anonKey } = getPublicConfig();
  const response = await fetch(`${url}/auth/v1/settings`, {
    headers: { apikey: anonKey },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Could not verify ${provider} sign-in settings. Please try again.`);
  }
  const settings = (await response.json()) as {
    external?: Record<string, boolean | undefined>;
  };
  return settings.external?.[provider] === true;
}
