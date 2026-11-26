# Mobile API — auth & FCM contract (native Android client)

**Owner:** Agent 2 (backend `/api/mobile/*`) · **Status:** contract doc — the
endpoints below already exist on the website API; the native client consumes
them as-is. Nothing here changes an existing `/api/*` route (additive rule).

## Base

| Environment | Base URL |
|---|---|
| Production | `https://harindrasah.com.np` |
| Emulator → local dev | `http://10.0.2.2:3000` (`npm run dev:backend`) |

## Client identification headers

The official Android app sends:

| Header | Value | Notes |
|---|---|---|
| `X-Rn-Client` | `android-native` | Marks the request as coming from the native app. |
| `X-Rn-Signing-Cert` | SHA-256 cert fingerprint (64 hex, uppercase, no colons) | **Only checked when `X-Rn-Client` is present.** A non-matching fingerprint is rejected with `403 {"error": "Unofficial Android client"}` (repackaged-APK guard). |

Browsers, curl and unofficial builds that omit `X-Rn-Client` are unaffected.
Both headers are already allowed through CORS preflight. Never send them from
a web or WebView context.

## Sessions

Auth is cookie-first: `POST /login | /signup | /refresh` set the HttpOnly
`sb-access-token` session cookie. The API also accepts the same token as
`Authorization: Bearer <token>` — the native client may use either, but must
persist the cookie (or the bearer token) across process restarts itself.

| Method & path | Auth | Purpose |
|---|---|---|
| `POST /api/auth/login` | none | Email/password sign-in, or Firebase `idToken` sign-in. Sets the session cookie. |
| `POST /api/auth/signup` | none | Email/password signup (or Firebase `idToken`). May return a pending-access status until the owner approves. |
| `POST /api/auth/refresh` | session | Rotate/renew the session. |
| `POST /api/auth/logout` | session | Clear the session. |
| `GET /api/auth/me` | session | Current profile (plan, role, access status). |
| `GET /api/auth/account-status` | none/session | Signup/access status polling. |

## Access requests & FCM tokens

| Method & path | Auth | Purpose |
|---|---|---|
| `POST /api/access-requests/fcm` | session cookie **or** `statusToken` body field | Save the device FCM token on the user's open access request. Body: `{ "fcmToken": string (8–4096 chars), "deepLink"?: string, "statusToken"?: string }`. Success → `200 {"ok": true, "requestId": …, "status": …}`. Errors: `400` invalid payload, `401` no session/status token, `500` save failure. |
| `DELETE /api/access-requests/fcm` | session | Remove the device's FCM token (logout / token reset). |
| `GET /api/access-requests/me` | session | Current access request state (status, deep link). |

### Native FCM flow (Phase 3)

1. Obtain the FCM token from Firebase messaging on the device.
2. After login (or during signup with a `statusToken`), `POST
   /api/access-requests/fcm` with the token.
3. On logout, `DELETE /api/access-requests/fcm`.

`google-services.json` is still absent locally for both apps; FCM stays
disabled until the owner generates it (see STATUS §2).

## Firebase sign-in notes

- When Firebase auth is enabled server-side, `POST /api/auth/login` requires
  `idToken` (error `FIREBASE_CLIENT_AUTH` if missing, `FIREBASE_ADMIN_NOT_CONFIGURED`
  if the server lacks Admin credentials, `FIREBASE_TOKEN_REJECTED` on a bad token).
- The native app should use the Firebase client SDK to obtain the id token and
  exchange it here — never embed Firebase secrets in the app.

## What the native app must NOT do

- No new auth routes on `/api/mobile/*` — session issuance stays centralised.
- No bypassing tier gates (`requireTier`) by calling mobile routes: mobile
  endpoints are read-only, public-data or tier-gated through the same
  middleware as their web counterparts.
