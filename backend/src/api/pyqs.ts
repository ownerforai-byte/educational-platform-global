import { Router, Request, Response } from "express";
import { serverError } from "../middleware/errors";
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
