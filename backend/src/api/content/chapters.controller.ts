import { Router } from "express";
import { serverError } from "../../middleware/error-handler";
import { supabaseAdmin } from "../../db/supabase";
import { getUserFromRequest } from "../../middleware/auth";
import {
  CONTENT_CACHE_TTL_MS,
  CONTENT_CDN_CACHE_CONTROL,
  contentCache,
} from "../../lib/cache.js";
import { sendError, sendSuccess } from "../../lib/response.js";

const router = Router();

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const base = await contentCache.getOrLoad(
      `chapters:${slug}`,
      CONTENT_CACHE_TTL_MS,
      async () => {
        const { data: chapter, error: chapterError } = await supabaseAdmin
          .from("chapters")
          .select("*")
          .eq("slug", slug)
          .eq("is_active", true)
          .single();

        if (chapterError || !chapter) return null;

        const { data: topics, error: topicsError } = await supabaseAdmin
          .from("topics")
          .select("*")
          .eq("chapter_id", chapter.id)
          .eq("is_active", true)
          .order("order", { ascending: true });

        if (topicsError) throw topicsError;

        return {
          chapter,
          topics: topics ?? [],
          topicIds: (topics ?? []).map((t) => t.id as string),
        };
      },
    );

    if (!base) {
      return sendError(res, "Not found", 404);
    }

    let completed = 0;
    let cacheControl = CONTENT_CDN_CACHE_CONTROL;
    try {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ") || req.cookies?.["sb-access-token"]) {
        cacheControl = "private, no-store";
        const user = await getUserFromRequest(req);
        if (user && base.topicIds.length > 0) {
          const { count } = await supabaseAdmin
            .from("user_progress")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .in("topic_id", base.topicIds)
            .eq("completed", true);
          completed = count ?? 0;
        }
      }
    } catch {
      // ignore
    }

    res.setHeader("Cache-Control", cacheControl);
    return sendSuccess(res, {
      chapter: base.chapter,
      topics: base.topics,
      progress: { completed, total: base.topicIds.length },
    });
  } catch (err: any) {
    console.error(err);
    return serverError(res, err);
  }
});

export default router;
