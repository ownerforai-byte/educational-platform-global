# Digital Asset Links (mandatory layout)

**Canonical file:** `/.well-known/assetlinks.json` at the **monorepo repository root** only.

- Do **not** add `frontend/public/.well-known/` or any other duplicate copy (CI fails if a duplicate exists).
- Production serves this file via `frontend/app/.well-known/assetlinks.json/route.ts`, which reads the repo-root JSON at build and runtime with `Content-Type: application/json`.
- CI validates **only** `.well-known/assetlinks.json` on this path.
- Fingerprints must be **32 SHA-256 octets as uppercase hex pairs with colons** (Play Console / `keytool -printcert` format), not unbroken hex.
- The assetlinks route is **force-dynamic** so Vercel does not serve a stale prerender to Google’s verifier.

**Hosts:** Google verifies the host declared in the Android app / Play Console. Both `https://harindrasah.com.np` and `https://www.harindrasah.com.np` must return **200** on `/.well-known/assetlinks.json` (no redirect).

- `frontend/proxy.ts` skips apex→www redirect for `/.well-known/*` so apex can serve App Links.
- In **Vercel → Domains**, assign apex and www to Production but **do not** use the dashboard “redirect apex to www” option (it 308s asset links before the app runs). Canonical site traffic is redirected in `proxy.ts` instead.