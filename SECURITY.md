# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| `main` (production) | ✅ Yes |
| All other branches | ❌ No — work in progress |

## Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Email **[sahrocky81@gmail.com]** (the address published in the Privacy
Policy and the legal pages) with:
- A description of the vulnerability
- Steps to reproduce it
- The potential impact
- Your name / handle (optional)

We will acknowledge your report within 48 hours and aim to release a fix
within 14 days for critical issues.

## Content takedown requests

A public, rights-holder-facing version of this process is at
`/legal/takedown` (implemented in `frontend/app/legal/takedown/page.tsx`).
`SOURCES.md` is the source ledger; this section is the operative process.

**Intake.** Rights holders, publishers, authors, or their authorised agents
email **sahrocky81@gmail.com** with the subject `Content takedown request`.
A complete request includes: the exact page URL(s), a description of the
original work and the part to review, contact details, evidence of ownership
or authority, and a good-faith statement. There is no in-app submission form
and no automated removal.

**Triage.** We aim to acknowledge a complete request within five working days.
While it is under review we may restrict access to the specific item rather
than leave disputed material live.

**Investigation.** Check `SOURCES.md` for the recorded status of the source,
then search the content pipeline (`content/`, `frontend/public/data/` and
`backend/kb/`) for every place the material appears, including derived
indexes and generated payloads. Confirm whether the item is platform-authored,
official syllabus metadata, or third-party derived text.

**Outcome.** If the right to use the material cannot be confirmed, remove it
or replace it with platform-authored material, rebuild any generated payload,
and record the outcome and date in `SOURCES.md`. Reply to the requester with
the result. If more detail is needed to identify the work, ask for it rather
than closing the request.

**Standing review.** The OCR-derived textbook corpus in `backend/kb/books/`
and the NEB past-year question banks are already marked ⚠️ under review in
`SOURCES.md`. A rights holder may file a request without first identifying a
specific page; we do not claim ownership of third-party source text.

## Known historical incidents

### Credentials in git history (resolved)

Two credentials were accidentally committed in unreachable editor-checkpoint
commits and have been **rotated**:

- Vercel deploy token — rotated 2026-09
- Supabase personal access token — rotated 2026-09

One legacy third-party AI-runtime access token (a provider the platform no
longer integrates) from old scratch scripts sits in history at
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
