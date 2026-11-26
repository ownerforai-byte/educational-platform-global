import { Router, Request } from "express";
import { supabaseAdmin } from "../../db/supabase";
import { isMissingTable } from "../../db/repositories/base.repository.js";
import { serverError } from "../../middleware/error-handler";
import { mobileCommunityResponseSchema } from "../contracts/public-schemas.js";
import { cursorPage, parseCursorPagination } from "./pagination.js";

/**
 * GET /api/mobile/community?category=&limit=&cursor= — the public community
 * feed for the native app, cursor-paginated with the shared /api/mobile
 * convention (see ./pagination.ts).
 *
 * READ-ONLY and COMPACT: guests may read (same policy as the web feed),
 * publishing/moderation stay on the existing /api/feed routes so the
 * authorisation rules are enforced in exactly one place. Rows carry no
 * author profile enrichment, no emails and no storage URLs — the app joins
 * author display info via the existing profile endpoints.
 *
 * Keyset pagination: rows are ordered by created_at DESC (id DESC as the
 * tie-break); the cursor anchors on the last row's created_at, and each page
 * fetches limit + 1 rows to detect the next page. The cursor stays opaque to
 * clients.
 *
 * ADDITIVE: no existing /api/* response shape is touched.
 */
const router = Router();

const COLUMNS = "id, author_id, title, body, category, kind, created_at, updated_at";

router.get("/", async (req: Request, res) => {
  try {
    const { limit, cursor } = parseCursorPagination(req);

    let query = supabaseAdmin
      .from("community_feed_posts")
      .select(COLUMNS)
      .eq("visibility", "public");

    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    if (category) {
      query = query.eq("category", category);
    }
    if (cursor) {
      query = query.lt("created_at", cursor.anchor);
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(limit + 1);

    if (error) {
      if (isMissingTable(error)) {
        res.status(503).json({
          ok: false,
          error: "Community feed is unavailable until migration 018 is applied.",
        });
        return;
      }
      throw error;
    }

    const rows = data ?? [];
    const hasMore = rows.length > limit;
    const page = hasMore ? rows.slice(0, limit) : rows;

    const items = page.map((row) => ({
      id: row.id,
      authorId: row.author_id,
      title: row.title,
      body: row.body,
      category: row.category,
      kind: row.kind ?? "discussion",
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    const nextAnchor = hasMore ? page[page.length - 1].created_at : null;

    res.setHeader("Cache-Control", "private, no-store");
    const body = { ok: true as const, data: cursorPage(items, nextAnchor) };
    mobileCommunityResponseSchema.parse(body);
    return res.json(body);
  } catch (err) {
    return serverError(res, err);
  }
});

export default router;
