# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| `main` (production) | ✅ Yes |
| All other branches | ❌ No — work in progress |

## Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Email **[security contact email — fill in]** with:
- A description of the vulnerability
- Steps to reproduce it
- The potential impact
- Your name / handle (optional)

We will acknowledge your report within 48 hours and aim to release a fix
within 14 days for critical issues.

## Content takedown requests

See `SOURCES.md` for the takedown / contact process for copyright concerns.

## Known historical incidents

### Credentials in git history (resolved)

Two credentials were accidentally committed in unreachable editor-checkpoint
commits and have been **rotated**:

- Vercel deploy token — rotated 2026-09
- Supabase personal access token — rotated 2026-09

One **Puter** access token from old scratch scripts sits in history at
`4d73f538^`. It cannot be revoked via the API and expires 2026-12-04, or it
can be permanently removed by rewriting history with `git filter-repo`.
Treat it as expired/non-functional.

### Local paths in ingest report (resolved)

`backend/kb/books/_ingest-report.json` contained local Windows file paths
(`C:\Users\ASUS\Downloads\...`). The file has been removed from the
repository. The local paths exposed no credentials.

## Security practices

- All secrets go in environment variables only — never in source, comments,
  or `NEXT_PUBLIC_*` names.
- Supabase `service_role_key` is server-side only; the anon key is used
  only where RLS is enforced.
- Rate limits: 5/min for login/signup/refresh, 3/hour for password reset,
  60/min for general API.
- Security headers: `X-Content-Type-Options`, `X-Frame-Options: DENY`,
  `Strict-Transport-Security` (production), strict `Content-Security-Policy`.
- CORS allows only the `FRONTEND_URL` allowlist in production.
- See `AGENTS.md` for the agent security rules.
