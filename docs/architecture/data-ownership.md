# Data ownership matrix

Authoritative store per field after Firebase Auth + R2. Stale copies must not shadow the owner.

## Stores

| Store | Role | Not used for |
|---|---|---|
| **Firebase Auth** | Login identity (`uid`, email, providers) | Profile bio, posts, files |
| **Supabase Postgres** | Relational source of truth | New binary blobs |
| **Cloudflare R2** | All new binaries (images, PDF, office, txt) | Structured rows |
| **Firestore** | FCM tokens, notification logs, access-session mirrors | Files, community posts |
| **Browser localStorage** | Offline notes/SRS queues until `/api/user-state` flush | Canonical profile or feed |

## Field ownership

| Field | Authority | Replicas | Sync rule |
|---|---|---|---|
| Account uid | Firebase Auth | `profiles.id` (text) | First login `ensureAuthProfile` / `ensureProfile`. Never mint a second user row. |
| Email | Firebase Auth | `profiles.email` if present | Auth wins; do not let a stale profile email change login. |
| `full_name`, `username`, `bio`, visibility, avatar/cover paths | Postgres `profiles` | Firestore profile doc (legacy) | Hub PATCH is canonical. Firestore is not a write-through cache for new edits. |
| `role`, `plan`, `access_status` | Postgres `profiles` | Session cookie claims | Re-read profile on gated routes. |
| Follows | `profile_follows` | — | Unique `(follower_id, following_id)` both text UIDs. |
| Feed post / comment / like | `community_feed_*` | — | `author_id` / `user_id` = Firebase UID or bot id. |
| Spaces thread / reply / upvote | `community_threads*` | — | Same UID **after migration 024**. Until then writes 500/`22P02`. |
| Attachment bytes | R2 object | `community_feed_attachments.storage_path`; legacy `data_base64` | Prefer R2. Read path: R2 then base64. Never return either column to JSON. |
| Profile avatar/cover bytes | R2 `profiles/{uid}/…` | `profiles.avatar_path` / `cover_path` | Raw binary upload only (415 on JSON base64). |
| Quota | `storage_objects` + `profiles.storage_*_bytes` | — | Reserve → upload → commit; release on failure. |
| Curriculum PDFs (editors) | R2 via `/api/storage/upload` | — | plus+ only. |
| Bot identity | Code constants + `profiles` row `rn-study-assistant` | `@rn/shared/constants` | Server-controlled. Users cannot self-verify as bot. |

## Cross-store writes

1. Define the owner (table above).
2. Write owner first. Replicas are best-effort.
3. **Never report HTTP 2xx if the owner write failed.**
4. R2 PUT + DB insert: on DB failure, delete the R2 object and `releaseStoragePath`.
5. Partial profile image: reserve new key, upload, update path columns, then release old key (`replaceReservedPath`).

## Identity rules

- Person keys are **text Firebase UIDs** (typically 28 chars) **or** the bot id `rn-study-assistant`.
- Row keys for posts, comments, attachments, threads remain **UUIDs**.
- `isUserId` (feed) accepts UUID **or** `[A-Za-z0-9_-]{8,128}` so people routes work for both eras.
- Do not FK community rows to `auth.users` after the Firebase cutover (021 dropped feed FKs; 024 drops space FKs).

## Binary policy

- New files: R2. Postgres holds metadata + optional legacy `data_base64` for rows written when R2 was off.
- Do not add Base64 columns. Do not send new profile images as JSON.
- Missing R2 object: **404**, not 500.
- R2 unset: **503** on platform upload and profile images; feed attachments may still persist `data_base64` so local tests work.
