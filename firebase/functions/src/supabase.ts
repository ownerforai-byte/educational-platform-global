import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type AccessRequestStatus = "pending" | "approved" | "expired";

export interface UserAccessRequest {
  id: string;
  user_id: string;
  status: AccessRequestStatus;
  requested_at: string;
  approved_at: string | null;
  expires_at: string | null;
  fcm_token: string | null;
  deep_link: string;
  reminder_sent_at: string | null;
  guidance_sent_at: string | null;
  last_error: string | null;
}

let client: SupabaseClient | null = null;

/** Service-role Supabase client — never ship this key to the browser. */
export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
