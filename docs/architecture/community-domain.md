# Community domain

## Product split

Keep both URL trees. Share identity, R2, and quota — not UI or post tables.

### A. Community Feed — `/ai/community/*`

| Page | `CommunityBoard` view |
|---|---|
| `/ai/community` | `feed` — heading, search, filters, posts, **New post** link. **No composer.** |
| `/ai/community/new` | `new` — composer only |
| `/ai/community/posts/[id]` | `post` |
| `/ai/community/posts/[id]/edit` | `edit` |
| `/ai/community/me` | `mine` |
| `/ai/community/people/[id]` | `person` |
| `/ai/community/unavailable` | `unavailable` |

Client: `frontend/features/community/community-board.tsx`, `frontend/lib/api/community-feed.ts`.  
API: `backend/src/api/social/community-feed.controller.ts` mounted at `/api/community`.

Capabilities: public posts, categories, likes, comments, ≤4 attachments (png/jpeg/pdf/office/txt, 3 MB), share URL, optional Study Assistant comment.

### B. Community Spaces — `/community/*`

Syllabus-derived spaces (`<classSlug>-<subjectSlug>` from `frontend/lib/community.ts`).  
UI: `frontend/components/study/community-*-view.tsx`.  
API: `backend/src/api/social/community.controller.ts` (`/:spaceId/threads`, `/threads/:id`, replies, upvote toggle).

Authors are **masked** (no uid/email in JSON). This is a study-discussion board, not a social profile.

## Composer (P0)

Default feed:

- **Show:** Community heading, search, category chips, post list, New post, My posts.
- **Hide:** title, body, files, publish.

**New post** is a link to `/ai/community/new` (existing route). Do not keep a hidden mounted form on the feed. Cancel on the new/edit route returns to the feed (or post) after unsaved-change confirm.

## Attachments

`POST /api/community/feed/:postId/attachments`  
`GET  /api/community/feed/attachments/:id/file`  
`DELETE /api/community/feed/attachments/:id`

Upload is JSON `{ filename, contentType, dataBase64 }` (no multer). Server infers MIME from extension when the browser sends empty/`octet-stream`. Magic bytes must match. R2 key: `community/{postId}/{attachmentId}/{safeName}`.

## Bot

Canonical id `rn-study-assistant` (`packages/shared/src/constants/community-bot.ts`). Comments use that `author_id`. Overlay in `resolveFeedAuthor`. Generation: `generateCommunityAssistantReply` + `community_feed_ai_replies`. Today the post **author** must approve; one-click for other authorized users is P2.

## UID notes

Feed `author_id` is text (migration **021**). Spaces `user_id` is still UUID until **024** — see `migration-plan.md`.
