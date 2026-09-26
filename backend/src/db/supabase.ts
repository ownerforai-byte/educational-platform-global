import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createMockSupabaseClient } from "./mock-db";
import { isProductionEnv } from "../config/env";

function createSupabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    // The in-memory mock store is a development convenience only. In
    // production a missing credential must be a loud failure — silently
    // serving every request from an empty mock store looks like "the app is
    // up but has no data", which is far harder to diagnose than a crash.
    if (isProductionEnv()) {
      throw new Error(
        "FATAL: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in production " +
          "(refusing to fall back to the in-memory mock store).",
      );
    }
    console.warn("[Supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing - using in-memory mock store");
    return createMockSupabaseClient() as SupabaseClient;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

let cached: SupabaseClient | null = null;

export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!cached) {
      cached = createSupabaseAdmin();
    }
    const value = Reflect.get(cached as object, prop);
    return typeof value === "function" ? value.bind(cached) : value;
  },
});

/**
 * Fresh, throwaway client for AUTH calls only (sign-in, sign-up, refresh).
 *
 * Once `signInWithPassword`/`signUp`/`refreshSession` succeeds on a client,
 * supabase-js attaches the resulting USER JWT to that client's subsequent
 * PostgREST requests instead of the service-role key. Running those calls on
 * the long-lived `supabaseAdmin` therefore downgraded every later data write
 * to the signed-in user's RLS rights — and `profiles` UPDATE is gated by
 * `is_owner() OR is_admin()`, so PostgREST answered 200 with ZERO rows and no
 * error. Daily credit resets then "succeeded" in the logs while the DB stayed
 * at 0 (the 2026-09-26 "402 despite reset 0 -> 8" incident).
 *
 * Each auth call gets its own client, used only for that auth call, so the
 * shared data client can never adopt a user session.
 */
export function createAuthClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    // Dev fallback (in-memory mock store) — no real sessions to leak.
    return supabaseAdmin;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
