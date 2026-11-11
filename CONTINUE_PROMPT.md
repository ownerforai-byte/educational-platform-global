# Continuation Prompt — Google OAuth "Access blocked" fix

## Status (already done & pushed to `main`)
- Commit `104574d8` on `origin/main` fixes the Google "Continue with Google → access
  is blocked" bug.
- Added `frontend/lib/supabase/oauth-config.ts` exporting the exact URLs the
  provider dashboards need:
  - `SUPABASE_AUTH_CALLBACK_URL` = `https://<supabase-project>.supabase.co/auth/v1/callback`
  - `APP_OAUTH_CALLBACK_URL`     = `<CANONICAL_SITE_URL>/auth/callback` (default
    `https://ravikisan.vercel.app/auth/callback`)
- `social-auth-buttons.tsx` now calls `oauthCallbackUrl()` for `redirectTo`
  (was `window.location.origin` → different callback per host → blocked).
- `app/auth/callback/page.tsx` detects a blocked OAuth client and shows an
  actionable dashboard-config message instead of an opaque error.
- Regression tests: `frontend/tests/lib/oauth-config.test.ts`.
- `npm run check:all` passes (frontend typecheck + Vitest + lab-manifest gate).

## What still needs manual action (cannot be done in code)
The CODE is correct, but Google/Supabase still reject sign-in until the provider
dashboards list the right redirect URIs. Do this in the next session:

1. **Google Cloud Console** → APIs & Services → Credentials → the OAuth 2.0 Client ID
   used by Supabase → **Authorized redirect URIs** must contain EXACTLY:
   `https://lqzjcwbkpeiqslqhxxmu.supabase.co/auth/v1/callback`
   (the current Supabase project is `lqzjcwbkpeiqslqhxxmu`; the legacy
   `tsvbksfegvdjwczzfdcx` must be removed — that mismatch is the root cause).

2. **Supabase** (project `lqzjcwbkpeiqslqhxxmu`) → Authentication → URL Configuration:
   - Site URL: `https://ravikisan.vercel.app`
   - Redirect URLs: add `https://ravikisan.vercel.app/auth/callback`
   - Confirm Google is enabled under Authentication → Providers.

3. Verify end-to-end: open the login page on the deployed URL, click "Continue with
   Google", complete the Google consent, and confirm the callback lands on the
   welcome page. If it still blocks, read the exact error string — the callback
   page now prints the precise dashboard value to fix.

## Next-session prompt to paste
```
Continue the educational-platform-global repo (main is current, commit 104574d8).
The Google OAuth "access blocked" code fix is pushed. Now finish the manual
provider-side configuration: verify the Supabase project is lqzjcwbkpeiqslqhxxmu,
register https://lqzjcwbkpeiqslqhxxmu.supabase.co/auth/v1/callback in the Google
Cloud OAuth client's Authorized redirect URIs (and remove the legacy
tsvbksfegvdjwczzfdcx entry), and confirm https://ravikisan.vercel.app/auth/callback
is in Supabase Redirect URLs + Site URL. Then run `npm run check:all` and do a live
Google sign-in test on the deployed URL, reporting the exact result.
```
