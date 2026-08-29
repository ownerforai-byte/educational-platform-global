import { Router } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("education_levels")
      .select("*")
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data ?? []);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: level, error: levelError } = await supabaseAdmin
      .from("education_levels")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (levelError || !level) {
      return res.status(404).json({ error: "Not found" });
    }

    const { data: classes, error: classesError } = await supabaseAdmin
      .from("classes")
      .select("*")
      .eq("education_level_id", level.id)
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (classesError) {
      return res.status(500).json({ error: classesError.message });
    }

    return res.json({ level, classes: classes ?? [] });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
