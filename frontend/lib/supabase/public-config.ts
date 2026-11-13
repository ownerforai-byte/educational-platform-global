/**
 * The app's PUBLIC Supabase project configuration.
 *
 * The anon key is deliberately public: Supabase anon keys are designed to be
 * shipped to the browser, carry `role: "anon"` and are protected by Row Level
 * Security — this exact value is already inlined in the production JS bundle.
 * It is NOT a service_role / secret key, and no privileged access is granted.
 *
 * These are FALLBACKS only. `NEXT_PUBLIC_SUPABASE_URL` /
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY` always take precedence, so rotating the key
 * in the deployment env needs no code change. The fallback exists because a
 * preview build or a local checkout without env vars used to throw
 * "Social sign-in is not configured for this app." and disable Google login
 * even though the project itself was healthy.
 */

import { getPublicEnv } from "@/lib/env";

const FALLBACK_SUPABASE_URL = "https://lqzjcwbkpeiqslqhxxmu.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxempjd2JrcGVpcXNscWh4eG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwOTQyOTksImV4cCI6MjEwNzY3MDI5OX0.qJtJK8-3yawbSwELAQxV4mF9p1uu1slXeDTNHTsdHlI";

export const PUBLIC_SUPABASE_URL =
  getPublicEnv().NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, "") ||
  FALLBACK_SUPABASE_URL;

export const PUBLIC_SUPABASE_ANON_KEY =
  getPublicEnv().NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || FALLBACK_SUPABASE_ANON_KEY;
