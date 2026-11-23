# Production app requirements

Minimum surfaces every client (web PWA, Android APK, Play Console) must expose or link.  
**Machine-readable source:** `GET /api/v2/meta` → `requirements` (from `backend/src/lib/app-requirements.ts`).

## Legal & privacy (public, never gated)

| Requirement | URL |
|-------------|-----|
| Privacy policy | `https://harindrasah.com.np/legal/privacy` |
| Terms of service | `https://harindrasah.com.np/legal/terms` |
| Cookie policy | `https://harindrasah.com.np/legal/cookies` |
| Purchases / refunds | `https://harindrasah.com.np/legal/purchases` |
| Account & data deletion | `https://harindrasah.com.np/legal/delete-account` |
| Data safety summary | `https://harindrasah.com.np/legal/data-safety` |

Footer on the web app links all of these. Android **Settings** opens the same URLs in the system browser.

## Support & security contact

| Requirement | Value |
|-------------|--------|
| Support email | `sahrocky81@gmail.com` |
| Security contact (RFC 9116) | `https://harindrasah.com.np/.well-known/security.txt` |

## Health & versioning

| Requirement | Endpoint |
|-------------|----------|
| Liveness | `GET /health`, `GET /api/v2/health` |
| AI availability probe | `GET /api/ai/status`, `GET /api/v2/ai/status` |
| API + app metadata | `GET /api/v2/meta` |
| OpenAPI snapshot | `docs/api/openapi.yaml` (`npm run openapi:check` in CI) |

## Android (Play)

| Requirement | Location |
|-------------|----------|
| Package ID | `com.ravikisan.platform` |
| Digital Asset Links | repo-root `.well-known/assetlinks.json` + Next route |
| Publishing checklist | `play-store/publishing-checklist.md` |
| In-app settings (legal, support, sign-out) | `android-twa/.../SettingsFragment.java` |

## Web PWA

| Requirement | Location |
|-------------|----------|
| Web manifest | `frontend/public/manifest.json` |
| Service worker | `frontend/public/sw.js` |
| Global error / not-found | `frontend/app/error.tsx`, `app/not-found.tsx` |
| Robots / sitemap | `frontend/app/robots.ts`, `sitemap.ts` |

## Verification

```bash
npm run openapi:check
cd backend && npx vitest run tests/contract/public-api.contract.test.ts
```

After deploy, confirm legal URLs return **200** without login and `/.well-known/security.txt` is reachable.