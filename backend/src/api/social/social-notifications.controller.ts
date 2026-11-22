import { Router } from "express";
import { requireAuth, type AuthedRequest } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { serverError } from "../../middleware/error-handler.js";
import { supabaseAdmin } from "../../db/supabase.js";
import { profileMediaPublicUrl } from "../../services/profile-media-url.js";
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
  "/notifications/summary",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const probe = await listSocialNotifications(user.id, {
      cursor: 0,
      limit: 1,
      unreadOnly: false,
    });
    if (probe.missingTable) {
      res.setHeader("Cache-Control", "no-store");
      res.json({ unreadCount: 0, migrated: false });
      return;
    }
    if (probe.error) {
      serverError(res, probe.error, "social-notifications");
      return;
    }
    const unreadCount = await countUnreadSocialNotifications(user.id);
    res.setHeader("Cache-Control", "no-store");
    res.json({ unreadCount, migrated: true });
  }),
);

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

    // Join actor identities and post titles so the client can render
    // "Nandu liked your post '…'" instead of a bare "liked your post".
    const actorIds = [...new Set(page.map((row) => row.actor_id).filter(Boolean))] as string[];
    const postIds = [...new Set(page.map((row) => row.post_id).filter(Boolean))] as string[];
    const actors = new Map<string, { fullName: string; username: string | null; avatarUrl: string | null }>();
    if (actorIds.length > 0) {
      const { data: actorRows } = await supabaseAdmin
        .from("profiles")
        .select("id, full_name, username, avatar_path")
        .in("id", actorIds);
      for (const row of (actorRows ?? []) as Array<{ id: string; full_name: string | null; username: string | null; avatar_path: string | null }>) {
        actors.set(row.id, {
          fullName: (row.full_name ?? "").trim() || "Student",
          username: row.username ?? null,
          avatarUrl: profileMediaPublicUrl(row.avatar_path),
        });
      }
    }
    const postTitles = new Map<string, string>();
    if (postIds.length > 0) {
      const { data: postRows } = await supabaseAdmin
        .from("community_feed_posts")
        .select("id, title")
        .in("id", postIds);
      for (const row of (postRows ?? []) as Array<{ id: string; title: string }>) {
        postTitles.set(row.id, row.title);
      }
    }

    res.setHeader("Cache-Control", "no-store");
    res.json({
      items: page.map((row) => ({
        id: row.id,
        actorId: row.actor_id,
        actor: row.actor_id ? actors.get(row.actor_id) ?? null : null,
        kind: row.kind,
        postId: row.post_id,
        postTitle: row.post_id ? postTitles.get(row.post_id) ?? null : null,
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
