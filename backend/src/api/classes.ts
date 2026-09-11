import { Router } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: cls, error: classError } = await supabaseAdmin
      .from("classes")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (classError || !cls) {
      return res.status(404).json({ error: "Not found" });
    }

    const { data: subjects, error: subjectsError } = await supabaseAdmin
      .from("subjects")
      .select("*")
      .eq("class_id", cls.id)
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (subjectsError) {
      return res.status(500).json({ error: subjectsError.message });
    }

    return res.json({ class: cls, subjects: subjects ?? [] });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
