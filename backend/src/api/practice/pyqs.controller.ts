import { Router, Request, Response } from "express";
import { serverError } from "../../middleware/error-handler";
import { requireAuth, requireTier } from "../../middleware/auth";
import { supabaseAdmin } from "../../db/supabase";
import { CONTENT_CACHE_TTL_MS, contentCache } from "../../lib/cache.js";
import { sendSuccess } from "../../lib/response.js";

const router = Router();

// Tier-scoped like the section it serves: the Past Papers bank opens at the
// plus rung (section registry `practice-pyq`, plan.md §8 P4).
// Auth-gated → never set public CDN Cache-Control.
router.get("/", requireAuth, requireTier("plus"), async (_req: Request, res: Response) => {
  try {
    const data = await contentCache.getOrLoad(
      "pyqs:published-quiz",
      CONTENT_CACHE_TTL_MS,
      async () => {
        const { data: rows, error } = await supabaseAdmin
          .from("resources")
          .select("id, title, type, topic_id, metadata, created_at")
          .eq("is_published", true)
          .eq("type", "QUIZ")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return rows ?? [];
      },
    );

    res.setHeader("Cache-Control", "private, no-store");
    sendSuccess(res, data);
  } catch (err: any) {
    console.error(err);
    serverError(res, err);
  }
});

export default router;
