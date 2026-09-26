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
