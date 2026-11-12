# Runbook: Google OAuth

## Symptoms

"Access blocked" or CSRF / cold-start message on Continue with Google.

## Checks

1. Canonical callback URL registered in Google + Supabase (see `frontend/lib/supabase/oauth-config.ts`).
2. Backend awake (`POST /api/auth/oauth/csrf`).
3. Facebook is **not** supported — do not debug Meta apps for login.

## Verify

Happy path lands on tier welcome after `/auth/callback`.
