# Global action placement

Buttons do not need the same pixel position on every page. They must exist when relevant, work, and not overlap or duplicate.

## Action classes

| Class | Meaning | Examples |
|---|---|---|
| **Primary** | Main job of this surface (one per action area) | New post, Publish, Save profile |
| **Contextual** | Tied to one person/post/file | Follow, Answer with Veer, Edit profile, Download |
| **Secondary** | Supporting, grouped | Like, Comment, Share |
| **Destructive** | Confirm first; overflow menu when possible | Delete post/comment, Remove file, Unfollow |
| **Navigation** | Wayfinding with active state | Community, Profile, My posts |

## Placement matrix (Feed + Profile)

| Action | Preferred location | Visible when |
|---|---|---|
| New post | Feed header | Signed-in / authorized; links to `/ai/community/new` |
| Publish | Composer footer on `/new` or `/edit` | Composer open; loading disables resubmit |
| Cancel | Composer footer | Composer open; confirm if dirty |
| Follow / Following | Author header | Viewer ≠ author |
| Like, Comment, Share | Post action bar | Post readable |
| Answer with Veer | Question post + comment column | Eligible, permitted, bot up, no duplicate answer |
| Edit / Delete post | Post overflow | Author or moderator |
| Download | Attachment row | File exists |
| Remove attachment | Attachment controls | Owner / moderator |
| Edit profile | Own header | Owner |
| Save profile | Edit form | Dirty + valid |
| Followers / Following | Profile stats | Publicly allowed |
| Report | Overflow | Authenticated, not self |
| Moderation | Mod tools | pro/owner |

## Conflict rules

1. No fixed/FAB covering post text, attachments, or the app tab bar.
2. One primary control per cluster (Feed: New post; Composer: Publish).
3. Icon-only controls need accessible names; ~44×44 CSS px touch targets.
4. Loading prevents duplicate POSTs; failed requests re-enable unless the action is gone.
5. Menus and modals must close/cancel; no invisible overlay eating clicks.
6. Mobile: labels can collapse to icons + overflow; no horizontal action scroll.

## Registry (lightweight)

Do **not** add a global button framework. Document each major action as:

`name → placement → visibility → authz → API → loading → success → failure`

Current Feed wiring:

| Name | API / route |
|---|---|
| New post | `GET /ai/community/new` |
| Publish | `POST /api/community/feed` then `POST …/attachments` |
| Like | `POST /api/community/feed/:id/like` |
| Comment | `POST /api/community/feed/:id/comments` |
| Delete post | `DELETE /api/community/feed/:id` |
| Answer with Veer | `POST /api/community/feed/:id/ai-assistant/reply` (one-click, 409 if posted) |
| Follow | profile follow endpoints |
| Save profile | `PATCH /api/profile/me` |
