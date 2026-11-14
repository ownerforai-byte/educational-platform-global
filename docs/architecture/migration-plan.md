# Migration plan — UUID vs Firebase UID

## What changed

Supabase Auth UUIDs were the original `profiles.id` and every `user_id` / `author_id`. Login is now **Firebase Auth**. Firebase UIDs are opaque strings (usually 28 chars), not RFC-4122 UUIDs. Inserting them into `uuid` columns raises Postgres `22P02` and surfaces as **Internal Server Error**.

## Current schema (inspected)

| Area | Migration | Person-key type | FK to `auth.users` |
|---|---|---|---|
| `profiles.id` | **020** | `text` (Firebase UID) | Dropped |
| `profile_follows.*` | **020** | `text` | Dropped |
| `storage_objects.owner_id` | **020** | `text` | Dropped |
| `community_feed_posts.author_id` | **021** | `text` | Dropped |
| `community_feed_likes.user_id` | **021** | `text` | Dropped |
| `community_feed_comments.author_id` | **021** | `text` | Dropped |
| `community_threads.user_id` | **014 only** | **`uuid`** | **Yes** |
| `community_replies.user_id` | **014 only** | **`uuid`** | **Yes** |
| `community_upvotes.user_id` | **014 only** | **`uuid`** | **Yes** |

Feed people routes already accept `isUserId` = UUID **or** `[A-Za-z0-9_-]{8,128}`. Post/comment/attachment **ids** stay UUID (`isUuid`).

System bot id `rn-study-assistant` is text and only valid after `profiles.id` is text (020).

## Mapping strategy (do not guess)

1. **Reliable map:** `profiles.id` already rewritten to Firebase UID **and** a verified email/provider match exists.
2. **Unmapped:** legacy space rows whose `user_id` is a Supabase UUID with no surviving profile. **Keep the rows.** Mask author as “Student”. Do not delete threads, replies, or upvotes.
3. **No silent rewrite** of `user_id` without that map. 021 deleted feed rows whose `author_id` was not in `profiles` after a root-only cleanup — Spaces **must not** repeat a destructive sweep.

## Migration 024 (idempotent)

File: `backend/src/db/migrations/024_firebase_auth_community_spaces.sql`

- Drop `user_id` FKs to `auth.users` on threads, replies, upvotes.
- If `udt_name = uuid`, `alter column … type text using user_id::text`.
- Leave existing UUID **strings** in place (they still match leftover `profiles.id` values that were uuid-shaped).
- New writes store Firebase UIDs.
- Apply: `cd backend && node scripts/migrate.mjs`
- Check: `node scripts/migrate.mjs --check`

API: `community.controller` treats `22P02` / uuid syntax errors like a missing table (`migrated: false`) so production does not 500 while 024 is pending.

## Rollback

Safer than down-migration: leave columns as `text`. Casting back to `uuid` **fails** if any Firebase UID was written. Restore from backup only.

## 020 follow-up (review, do not auto-run)

`020_firebase_auth_profiles.sql` contains:

```sql
alter column following_id type text using follower_id::text;
```

If that statement ran as written, `following_id` may have been copied from `follower_id`. Audit `profile_follows` before any rewrite. Do not “fix” live rows without a backup.

## Application order

```
020 profiles text
021 feed author_id text
023 community_feed_ai_replies (independent)
024 spaces user_id text     ← required for Firebase UID thread writes
```

## Tests after 024

- Create a space thread while authenticated with a Firebase UID (not a UUID).
- Reply and toggle upvote.
- Legacy UUID `user_id` rows still list; author mask still works.
- Feed attach/download still uses UUID **attachment** ids.

## R2 (not a UID migration)

No data rewrite. New binaries go to R2; `data_base64` remains readable. Do not null legacy columns in the same change as 024.
