# Digital Asset Links (mandatory layout)

**Canonical file:** `/.well-known/assetlinks.json` at the **monorepo repository root** only.

- Do **not** add `frontend/public/.well-known/` or any other duplicate copy (CI fails if a duplicate exists).
- Production serves this file via `frontend/app/.well-known/assetlinks.json/route.ts`, which reads the repo-root JSON at build and runtime with `Content-Type: application/json`.
- CI validates **only** `.well-known/assetlinks.json` on this path.
- Fingerprints must be **32 SHA-256 octets as uppercase hex pairs with colons** (Play Console / `keytool -printcert` format), not unbroken hex.
- **Credential sharing (Play):** one statement with **both** `delegate_permission/common.handle_all_urls` and `delegate_permission/common.get_login_creds`, all fingerprints in one `target` (match Play’s generated JSON byte-for-byte).
- The assetlinks route is **force-dynamic** so Vercel does not serve a stale prerender to Google’s verifier.

**Canonical host:** `https://harindrasah.com.np` only (no `www` hostname in app config, env, or Firebase authorized domains).

- Production must return **200** on `https://harindrasah.com.np/.well-known/assetlinks.json` (no redirect on that URL).
- TWA / Play Console domain must be **`harindrasah.com.np`**.
- Legacy `www` DNS, if any, should **308/301 to apex at the registrar or CDN** before you detach the `www` record from Vercel.