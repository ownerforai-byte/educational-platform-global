import { Router } from "express";
import { supabaseAdmin } from "../../db/supabase.js";
import { requireAuth, type AuthedRequest } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { serverError } from "../../middleware/error-handler.js";

const router = Router();

function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return msg.includes("does not exist") || msg.includes("could not find the table");
}

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
    let query = supabaseAdmin
      .from("social_notifications")
      .select("id, actor_id, kind, post_id, comment_id, read_at, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(cursor, cursor + limit);

    if (unreadOnly) query = query.is("read_at", null);

    const { data, error } = await query;
    if (error) {
      if (isMissingTable(error)) {
        res.setHeader("Cache-Control", "no-store");
        res.json({ items: [], nextCursor: null, unreadCount: 0, migrated: false });
        return;
      }
      serverError(res, error, "social-notifications");
      return;
    }
    const rows = data ?? [];
    const hasMore = rows.length > limit;
    const page = hasMore ? rows.slice(0, limit) : rows;

    const { count: unreadCount } = await supabaseAdmin
      .from("social_notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .is("read_at", null);

    res.setHeader("Cache-Control", "no-store");
    res.json({
      items: page.map((row) => ({
        id: row.id as string,
        actorId: (row.actor_id as string | null) ?? null,
        kind: row.kind as string,
        postId: (row.post_id as string | null) ?? null,
        commentId: (row.comment_id as string | null) ?? null,
        readAt: (row.read_at as string | null) ?? null,
        createdAt: row.created_at as string,
      })),
      nextCursor: hasMore ? cursor + limit : null,
      unreadCount: typeof unreadCount === "number" ? unreadCount : 0,
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
    const now = new Date().toISOString();

    let query = supabaseAdmin
      .from("social_notifications")
      .update({ read_at: now })
      .eq("user_id", user.id)
      .is("read_at", null);

    if (!all && ids.length > 0) query = query.in("id", ids.slice(0, 100));

    const { error } = await query;
    if (error) {
      if (isMissingTable(error)) {
        res.json({ ok: true, migrated: false });
        return;
      }
      serverError(res, error, "social-notifications");
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, migrated: true });
  }),
);

export const socialNotificationsRouter = router;
export default router;