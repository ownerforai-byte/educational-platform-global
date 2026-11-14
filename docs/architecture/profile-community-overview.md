# Profile + Community architecture

Living map of the two identity/content domains. Inspected against the tree on 2026-11-14. Pair with `CORE_FILES.md`; do not bulk-read `content/`.

## Existing architecture

```
Browser (Next.js App Router, Vercel)
  frontend/features/profile/**
  frontend/features/community/community-board.tsx   ← Community Feed UI
  frontend/components/study/community-*-view.tsx    ← Community Spaces UI
        │
        │  POST/GET /api/*  (Next rewrite → Express)
        ▼
Express (Render, 0.0.0.0:$PORT)
  backend/src/api/user/profile-hub.controller.ts
  backend/src/api/social/community-feed.controller.ts
  backend/src/api/social/community.controller.ts
        │
        ├─ Supabase Postgres     (profiles, posts, comments, likes, threads)
        ├─ Firebase Auth         (session UID = profiles.id)
        ├─ Firestore             (FCM / notification logs only)
        └─ Cloudflare R2         (all new binaries)
```

Two Community surfaces are **intentionally different products**, not duplicates:

| Surface | Routes | Backend | Purpose |
|---|---|---|---|
| **Community Feed** | `/ai/community/*` | `/api/community/feed*` | Public posts, attachments, likes, comments, bot replies |
| **Community Spaces** | `/community/*` | `/api/community/:spaceId/threads*` | Subject-oriented threads, replies, upvotes; authors masked |

Shared identity is Firebase UID on `profiles.id`. Shared storage is R2 + `storage_objects` quota. Do not merge the UIs.

## Problems discovered (this audit)

### P0 — Critical

1. **Feed composer always mounted.** `CommunityBoard` `view="feed"` rendered `<Composer>` under the toolbar, so Title / Body / Files / Publish were visible on every visit. Dedicated route `/ai/community/new` already exists.
2. **R2 download 500s.** `r2Download` documented “null when the key is missing” but `GetObject` throws `NoSuchKey`, which community-feed and profile media turned into Internal Server Error.
3. **Platform upload 500 when R2 is off.** `POST /api/storage/upload` caught “R2 is not configured” as 500. Callers saw a generic server error instead of 503.
4. **Browser MIME vs allow-list.** `uploadAttachment` sent `file.type || application/octet-stream`. Empty types (common for `.doc` / some PDFs) failed the exact-mime check.
5. **Community Spaces still UUID-typed.** Migration 014: `community_threads.user_id` / replies / upvotes are `uuid references auth.users`. After Firebase Auth, inserts of 28-char UIDs 500 with `22P02`. Feed tables were converted in **021**; spaces were not.

### P1 — Foundation

- Dual Community backends share no repository layer; quota + identity helpers are the shared services.
- `data_base64` remains a **read/write fallback** when R2 is inactive (tests + local without keys). New production binaries must go to R2.
- Profile images already stream raw bytes to R2; community attachments still JSON-base64 over the wire then R2/base64 on disk.

### P2 — Functional completion

- Bot identity exists (`rn-study-assistant`) with a “Bot” chip, not a server-issued verified tick.
- Answer-with-Veer still requires **post-author approval** (`approveAssistantReply`) — not one-click for every eligible viewer.
- Global action placement is informal (inline buttons in `community-board.tsx`).

### P3 — Experience

- `CommunityBoard` is a single large module (feed, composer, post, comments).
- Feed search is in-memory over `SCAN_LIMIT` (300) rows.

## Target architecture

```
PROFILE DOMAIN                    COMMUNITY DOMAIN
identity, privacy, stats          posts / spaces / bot
avatar/cover (R2)                 attachments (R2)
follows                           likes, comments, upvotes
        \                        /
         SHARED: auth, UID, R2, quota, rate limits
```

Rules:

- One user system: Firebase UID everywhere (`profiles.id`).
- Bytes in R2; metadata in Postgres. Never new Base64 columns.
- Feed composer lives only on `/ai/community/new` and `/ai/community/posts/:id/edit`.
- Spaces keep masked authors; Feed keeps public identity + follow.

## Frontend component structure

**Today (canonical):**

- Feed: `frontend/features/community/community-board.tsx` + `community-feed.tsx` (shell), `post-composer.tsx` (only on `/new` and edit), `bot-answer-button.tsx`, `bot-identity-badge.tsx`, `post-author-header.tsx`, `community-ui.ts`
- Spaces: `frontend/components/study/community-view.tsx`, `community-space-view.tsx`, `community-thread-view.tsx`
- Profile: `frontend/app/(app)/profile/page.tsx`, `frontend/features/profile/**`, `frontend/lib/api/profile.ts`

**Incremental extract (do not invent a second composer):** CommunityHeader, CommunityToolbar, PostComposer (route-only), PostCard, PostActionBar, CommentSection, BotAnswerButton, BotIdentityBadge.

## Backend service structure

| Concern | Module |
|---|---|
| Feed CRUD + attachments + AI reply | `backend/src/api/social/community-feed.controller.ts` |
| Spaces threads / replies / upvotes | `backend/src/api/social/community.controller.ts` |
| Profile hub, media, stats | `backend/src/api/user/profile-hub.controller.ts` |
| R2 client | `backend/src/storage/r2.ts` |
| Platform teacher upload | `backend/src/api/platform/storage.controller.ts` |
| Quota | `backend/src/services/profile-storage.ts` |
| Bot identity | `backend/src/lib/community-bot.ts` + `@rn/shared/constants` |

## Database relationships (logical)

```
profiles.id  (text, Firebase UID)
    ├── community_feed_posts.author_id
    │       ├── community_feed_comments.author_id
    │       ├── community_feed_likes.user_id
    │       └── community_feed_attachments.post_id → R2 key in storage_path
    ├── community_threads.user_id     (must be text after 024)
    │       ├── community_replies.user_id
    │       └── community_upvotes.user_id
    ├── profile_follows
    └── storage_objects.owner_id
```

Post/comment/attachment **row ids** stay UUID. **Person ids** are Firebase UID (or the system bot id `rn-study-assistant`).

## API responsibilities

- Guests **read** the public feed; approved sessions **write**.
- Attachment JSON never includes `storage_path`, `data_base64`, emails, or raw R2 URLs. Files stream through `GET /api/community/feed/attachments/:id/file`.
- Profile media: binary PUT to `/api/profile/me/avatar|cover`; GET `/api/profile/media?path=`.
- Teacher/editor corpus files: `POST /api/storage/upload` (plus+), R2 only.

## AuthZ flow

1. Firebase ID token → Express session (`middleware/auth.ts`).
2. `profiles.id` must equal `user.id` (Firebase UID).
3. Feed moderate: `role` pro or owner. Spaces: author-only writes (names masked).
4. Bot badge is **server identity** (`COMMUNITY_BOT_ID`), never a user flag.

## File-storage flow

```
Client File
  → JSON { filename, contentType, dataBase64 }   (feed attachments today)
  → magic-byte check, 3 MB, max 4 files
  → if R2 active: PUT community/{postId}/{attachmentId}/{name}
                 + storage_objects quota row
    else: data_base64 column (legacy / tests)
  → GET file: R2 then base64 fallback; missing object → 404 (not 500)
```

Profile images skip JSON; they are raw `image/*` bodies, Sharp → WebP, then R2 `profiles/{uid}/…`.

## AI bot workflow

1. Signed-in viewer POSTs `/feed/:postId/ai-assistant/reply` (empty JSON or `{ approve: true }`).
2. `generateCommunityAssistantReply` grounds on curriculum.
3. Comment inserted as `author_id = rn-study-assistant`; ledger row in `community_feed_ai_replies`.
4. UI overlays canonical name + `/avatars/community-bot.svg` and a **Verified AI** badge (not a human tick).
5. Repeat POST is 409; per-account generation is rate-limited.

## Global button placement

See `global-action-placement.md`. Feed primary action is **New post** → `/ai/community/new`. Composer is not a feed widget.

## Migration and rollback

See `migration-plan.md`. Apply **024** before expecting Spaces writes from Firebase UIDs. Rollback of 024 is type-narrowing and is **not** safe if any non-UUID `user_id` exists.

## Priority and dependencies

```
P0 composer hide ──┐
P0 R2 404/503  ────┼── P1 Spaces UID (024) ── P2 bot one-click
P0 MIME infer  ────┘         │
                             └── P2 action registry
                                    └── P3 split CommunityBoard
```
