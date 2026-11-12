# Runbook: Backend deploy (Render)

## Symptoms

Service fails `tsc` or crashes on boot; cold start timeouts on OAuth CSRF.

## Checks

1. Render build logs — missing modules under `backend/src/ai/` etc.
2. Env: `PORT`, Supabase keys, AI keys, `OWNER_EMAILS` if overriding.
3. Health endpoint / `GET` basic auth routes.

## Fix

- Bind `0.0.0.0:$PORT`.
- Do not rely on local disk across deploys.

## Verify

Backend suite green; login CSRF recovers after one retry on cold start.
