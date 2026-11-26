import { Router, Request } from "express";
import { supabaseAdmin } from "../../db/supabase";
import {
  CONTENT_CACHE_TTL_MS,
  CONTENT_CDN_CACHE_CONTROL,
  contentCache,
} from "../../lib/cache.js";
import { serverError } from "../../middleware/error-handler";
import { sendError } from "../../lib/response.js";
import { mobileUnitsResponseSchema } from "../contracts/public-schemas.js";

/**
 * GET /api/mobile/units?subject=<slug> — the units of one subject for the
 * native syllabus drill-down (class → subject → unit → topic reader).
 *
 * REUSE (docs/api/mobile-syllabus-notes.md): the rows come from the same
 * `chapters` / `topics` tables the website content routes serve, through the
 * shared content cache. The mobile shape is compact (id/slug/title/order +
 * a topicCount badge) and scoped to a single subject so the app pulls one
 * subtree at a time instead of the whole curriculum.
 *
 * ADDITIVE: no existing /api/* response shape is touched.
 */
const router = Router();

router.get("/", async (req: Request, res) => {
  const subjectSlug = typeof req.query.subject === "string" ? req.query.subject.trim() : "";
  if (!subjectSlug) {
    return sendError(res, "subject query parameter is required", 400);
  }

  try {
    const payload = await contentCache.getOrLoad(
      `mobile-units:v1:${subjectSlug}`,
      CONTENT_CACHE_TTL_MS,
      async () => {
        const { data: subjectRows, error: subjectError } = await supabaseAdmin
          .from("subjects")
          .select("id, slug, name")
          .eq("slug", subjectSlug)
          .eq("is_active", true)
          .limit(1);

        if (subjectError) throw subjectError;
        const subject = subjectRows?.[0];
        if (!subject) return null;

        const { data: chapters, error: chaptersError } = await supabaseAdmin
          .from("chapters")
          .select("id, slug, title")
          .eq("subject_id", subject.id)
          .eq("is_active", true)
          .order("order", { ascending: true });

        if (chaptersError) throw chaptersError;

        const { data: topics, error: topicsError } = await supabaseAdmin
          .from("topics")
          .select("id, chapter_id")
          .eq("is_active", true);

        if (topicsError) throw topicsError;

        const counts = new Map<string, number>();
        for (const topic of topics ?? []) {
          counts.set(topic.chapter_id, (counts.get(topic.chapter_id) ?? 0) + 1);
        }

        const units = (chapters ?? []).map((chapter, index) => ({
          id: chapter.id,
          slug: chapter.slug,
          title: chapter.title,
          order: index + 1,
          topicCount: counts.get(chapter.id) ?? 0,
        }));

        return {
          subject: { id: subject.id, slug: subject.slug, name: subject.name },
          units,
        };
      },
    );

    if (!payload) {
      return sendError(res, "Subject not found", 404);
    }

    res.setHeader("Cache-Control", CONTENT_CDN_CACHE_CONTROL);
    const body = { ok: true as const, data: payload };
    mobileUnitsResponseSchema.parse(body);
    return res.json(body);
  } catch (err) {
    return serverError(res, err);
  }
});

export default router;
