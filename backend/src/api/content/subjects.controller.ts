import { Router } from "express";
import { serverError } from "../../middleware/error-handler";
import { supabaseAdmin } from "../../db/supabase";
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
    const payload = await contentCache.getOrLoad(
      `subjects:${slug}`,
      CONTENT_CACHE_TTL_MS,
      async () => {
        const { data: subjects, error: subjectError } = await supabaseAdmin
          .from("subjects")
          .select("*")
          .eq("slug", slug)
          .eq("is_active", true)
          .order("order", { ascending: true });

        if (subjectError) throw subjectError;
        if (!subjects || subjects.length === 0) return null;

        const subject = subjects[0];
        const { data: chapters, error: chaptersError } = await supabaseAdmin
          .from("chapters")
          .select("*")
          .eq("subject_id", subject.id)
          .eq("is_active", true)
          .order("order", { ascending: true });

        if (chaptersError) throw chaptersError;

        return {
          subject,
          allSubjects: subjects,
          chapters: chapters ?? [],
        };
      },
    );

    if (!payload) {
      return sendError(res, "Not found", 404);
    }

    res.setHeader("Cache-Control", CONTENT_CDN_CACHE_CONTROL);
    return sendSuccess(res, payload);
  } catch (err: any) {
    console.error(err);
    return serverError(res, err);
  }
});

export default router;
