# Cookie & Session Policy — Ravikisan's Platform

**Last updated:** 14 October 2026
**Website:** https://ravikisan.vercel.app
**Contact:** ravikisan1814@gmail.com

## What we use

We use **functionally essential** cookies only, to keep you signed in and to
protect your account. We do **not** use advertising cookies or third-party
analytics trackers.

## Cookies set

| Cookie | Purpose | Type | Lifetime |
|---|---|---|---|
| `sb-access-token` | Short-lived session token (keeps you logged in) | Essential (httpOnly, Secure in production, SameSite=Lax) | ~1 hour, refreshed automatically |
| `sb-refresh-token` | Long-lived token so you stay signed in after the access token expires | Essential (httpOnly, Secure, SameSite=Lax) | 30 days, rotated on each refresh |

- Both are **`httpOnly`**, so they cannot be read by page scripts (reduces
  cross-site scripting risk).
- In **production**, both are flagged **`Secure`**, so they only travel over HTTPS.
- `SameSite=Lax` limits how cookies are sent in cross-site requests (reduces
  CSRF risk).

## Browser / PWA local storage

If you install the App as a PWA or use it in a browser, we may also use the
device's **local storage** for non-sensitive, non-essential items such as UI
preferences (e.g. theme) to improve the experience. This does not contain your
password or personal data.

## Controlling / removing cookies

- We do not set tracking cookies that you can opt out of.
- If you block the two session cookies above, you will **not be able to stay
  signed in**, and authenticated features (progress, bookmarks, AI history)
  will be unavailable.
- To log out and clear session cookies, use the app's **Sign out** action, which
  clears both cookies.

## Data protection

Session cookies are protected in transit (HTTPS) and at rest on our host
(Supabase). We never read or log full passwords; sessions are token-based.

## Changes

We may update this policy; material changes are reflected with a new
"Last updated" date.

**Contact:** ravikisan1814@gmail.com
