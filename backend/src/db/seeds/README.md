# Backend dev seeds

Optional fixtures for local Supabase (not run automatically).

## Users (`users.seed.ts`)

Create matching rows in `auth.users` and `public.profiles` for each entry in `DEV_SEED_USERS`. IDs in the seed file are placeholders — replace with real UUIDs from your project.

## Credits (`credits.seed.ts`)

After profiles exist, you can insert ledger rows from `DEV_CREDIT_GRANTS` into `credit_transactions` and set `profiles.credits` to `DEFAULT_STARTER_CREDITS` (or higher for plus/pro demos).

## Safety

Never run seeds against production. Seeds are documentation + copy-paste helpers only.
