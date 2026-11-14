# Testing plan — Profile, Community, R2, bot

Do not call a feature done because a button rendered. Assert status codes, persisted rows, and file bytes.

## Automated (this repo)

| Layer | Command | Scope |
|---|---|---|
| Affected | `npm run check` from repo root | Files you touched |
| Feed API | `cd backend && npx vitest run tests/integration/community-feed.test.ts` | Posts, likes, comments, attachments |
| R2 router | `cd backend && npx vitest run tests/integration/storage-r2.test.ts` | `/api/storage/upload` |
| Profile storage | `cd backend && npx vitest run tests/integration/profile-storage.test.ts` | Quota / media |
| Bot constants | `cd backend && npx vitest run tests/unit/community-bot.test.ts` | Bot id |
| Feed composer UI | `cd frontend && npx vitest run tests/features/community-board-composer.test.tsx` | Hidden on feed; present on `/new` |
| Spaces UI | `frontend/tests/components/study/community-views.test.tsx` | Threads list/composer for **spaces** (not the feed) |

Full gate before pushing `main`: `npm run check:all`.

## Community Feed

- [ ] Feed loads; composer **absent** (no Title/Body/Publish form).
- [ ] New post link is `/ai/community/new`.
- [ ] New route shows composer; Cancel with dirty form confirms; Cancel with empty form goes back.
- [ ] Publish creates a post; duplicate submit blocked while `Publishing…`.
- [ ] PNG, JPEG, PDF, and a `.docx` (or octet-stream + `.pdf`) upload; GET file returns the same bytes (R2 when configured, base64 when not).
- [ ] Missing R2 key → 404, not 500.
- [ ] Platform `POST /api/storage/upload` with R2 off → 503, not 500.
- [ ] Like, comment, share path, delete (author).
- [ ] Guest can list feed; guest POST is 401.

## Community Spaces + UID

- [ ] After 024: Firebase UID can insert thread/reply/upvote.
- [ ] Before 024: API returns `migrated: false` / no 500 on `22P02`.
- [ ] Unmapped legacy UUID authors still list as masked “Student”.
- [ ] `/community/*` URLs unchanged.

## Profile

- [ ] Avatar/cover persist via raw binary; JSON upload is 415.
- [ ] Public profile, follow/unfollow, privacy, stats.
- [ ] Quota includes community attachments; abandoned temps do not delete `community/` keys.

## Bot

- [x] Same id `rn-study-assistant` (no second bot).
- [x] Badge on comments + profile; not a human “verified” control.
- [x] One-click reply publishes a real comment; refresh keeps it; comment count updates.
- [x] Repeat click does not duplicate (`community_feed_ai_replies`).
- [x] Unauthorized invoke 401.
- [x] One-click for non-authors (any approved session).

## Global buttons

- [ ] New post not competing with Publish on the feed (Publish is gone there).
- [ ] No overlay blocking Like/Comment.
- [ ] Desktop + a narrow viewport; keyboard focus on composer fields.

## Manual R2

Requires `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` on the API (Render). Frontend never holds those secrets.

1. Publish a post with image + PDF.
2. Confirm objects under `community/{postId}/` in the bucket.
3. Download from the attachment row.
4. Delete attachment; object and quota row go away.
5. Profile photo round-trip.

## Honest labels for the report

Use: completed and tested · implemented not fully tested · partial · blocked on config · not implemented.
