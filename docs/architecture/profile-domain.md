# Profile domain

Profile is the **only** personal identity system. Community must not create a second user record.

## Responsibilities

Identity, edit, avatar/cover, privacy/visibility, completeness, scholar/progress surfaces, public profile, follows, stats, account settings, storage quota UI.

## Canonical files

| Layer | Path |
|---|---|
| App routes | `frontend/app/(app)/profile/**` |
| Feature UI | `frontend/features/profile/**` |
| Client API | `frontend/lib/api/profile.ts` |
| Hub API | `backend/src/api/user/profile-hub.controller.ts` |
| Rows | `backend/src/db/repositories/user.repository.ts` |
| Images | `backend/src/services/profile-image.ts` |
| Quota | `backend/src/services/profile-storage.ts` |

## Identity

`profiles.id` = Firebase UID (migration **020**, text). Session `user.id` must match. Public URLs prefer `username`, fall back to id (`profilePath`).

The community bot is a **system profile** (`rn-study-assistant`), not a human Firebase account.

## Images

- `PUT` raw `image/jpeg|png|webp` (or `octet-stream`) — JSON base64 is **415**.
- Sharp compresses to WebP; R2 path `profiles/{uid}/avatar|cover-…`.
- Public read: `R2_PUBLIC_BASE_URL` redirect, else authenticated stream `GET /api/profile/media?path=`.
- If R2 is unset: **503**, not a silent local file (Render disk is ephemeral).

## Privacy and stats

Visibility on the profile row. Stats (posts, comments, likes, files, followers) are counted from community + follow tables in the hub — do not scan `content/`. Follows live in `profile_follows` with text UIDs.

## Shared with Community

`PostAuthorHeader` and follow buttons reuse profile paths and `/api/profile` follow endpoints. Attachment downloads stay on the community file route even when shown on a profile activity list.

## Out of scope for Profile

Feed compose, space threads, bot answers, curriculum notes. Those belong to Community or the syllabus pipeline.
