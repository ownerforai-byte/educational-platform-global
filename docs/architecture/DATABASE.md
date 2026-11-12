# Database overview

Supabase PostgreSQL is the system of record. Schema lives with the Supabase project (not a large in-repo migration tree).

## Core tables (behavioral)

| Table | Purpose |
|-------|---------|
| `profiles` | Role/tier, credits, premium flags, spark unlock windows (`credits_unlock`) |
| `premium_requests` | Upgrade / approval queue |
| `progress` | Per-user topic journey |
| `ai_quiz_history` | Quiz attempts |
| `chat_history` | Saved Veer threads (when persisted) |
| Support / enterprise request tables | Contact inbox routing (see platform support controllers) |

## Auth

Supabase Auth issues identities; the Express API validates tokens and sets application cookies. Owner powers are email-allowlist based, not a separate DB role table.

## Ops notes

- Free Render + free Postgres plan limits apply when used; prefer managed Supabase for durable data.
- Never commit service-role keys; use ignored `.env` / Render env groups.
