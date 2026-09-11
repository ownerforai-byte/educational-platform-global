import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("resources")
      .select("id, title, type, topic_id, metadata, created_at")
      .eq("is_published", true)
      .eq("type", "QUIZ")
      .order("created_at", { ascending: false });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data ?? []);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
