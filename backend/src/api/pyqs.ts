import { Router, Request, Response } from "express";
import { serverError } from "../middleware/errors";
import { requireAuth, requireTier } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

// Tier-scoped like the section it serves: the Past Papers bank opens at the
// plus rung (section registry `practice-pyq`, plan.md §8 P4).
router.get("/", requireAuth, requireTier("plus"), async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("resources")
      .select("id, title, type, topic_id, metadata, created_at")
      .eq("is_published", true)
      .eq("type", "QUIZ")
      .order("created_at", { ascending: false });

    if (error) {
      serverError(res, error);
      return;
    }

    res.json(data ?? []);
  } catch (err: any) {
    console.error(err);
    serverError(res, err);
  }
});

export default router;
