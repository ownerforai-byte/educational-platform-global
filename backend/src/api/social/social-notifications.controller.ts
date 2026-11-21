import { Router } from "express";
import { requireAuth, type AuthedRequest } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { serverError } from "../../middleware/error-handler.js";
import {
  countUnreadSocialNotifications,
  listSocialNotifications,
  markSocialNotificationsRead,
} from "../../db/repositories/social-notification.repository.js";

const router = Router();

function queryOne(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return undefined;
}

router.get(
  "/notifications",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const cursorRaw = queryOne(req.query.cursor);
    const unreadOnly = queryOne(req.query.unread) === "1";
    let cursor = 0;
    if (cursorRaw && /^\d+$/.test(cursorRaw)) cursor = Number(cursorRaw);

    const limit = 30;
    const listed = await listSocialNotifications(user.id, { cursor, limit, unreadOnly });
    if (listed.error) {
      if (listed.missingTable) {
        res.setHeader("Cache-Control", "no-store");
        res.json({ items: [], nextCursor: null, unreadCount: 0, migrated: false });
        return;
      }
      serverError(res, listed.error, "social-notifications");
      return;
    }
    const rows = listed.rows;
    const hasMore = rows.length > limit;
    const page = hasMore ? rows.slice(0, limit) : rows;
    const unreadCount = await countUnreadSocialNotifications(user.id);

    res.setHeader("Cache-Control", "no-store");
    res.json({
      items: page.map((row) => ({
        id: row.id,
        actorId: row.actor_id,
        kind: row.kind,
        postId: row.post_id,
        commentId: row.comment_id,
        readAt: row.read_at,
        createdAt: row.created_at,
      })),
      nextCursor: hasMore ? cursor + limit : null,
      unreadCount,
      migrated: true,
    });
  }),
);

router.patch(
  "/notifications/read",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const all = req.body?.all === true;
    const ids = Array.isArray(req.body?.ids) ? (req.body.ids as string[]) : [];
    const result = await markSocialNotificationsRead(user.id, { all, ids });
    if (result.error) {
      if (result.missingTable) {
        res.json({ ok: true, migrated: false });
        return;
      }
      serverError(res, result.error, "social-notifications");
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, migrated: true });
  }),
);

export const socialNotificationsRouter = router;
export default router;
