import { Router } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

function normalizeClassSlug(raw: string): string {
  const lower = (raw || "").toLowerCase().trim();
  if (lower === "11" || lower === "grade-11" || lower === "grade11" || lower === "class-11") {
    return "class-11";
  }
  if (lower === "12" || lower === "grade-12" || lower === "grade12" || lower === "class-12") {
    return "class-12";
  }
  return lower;
}

// GET /api/classes - List all active classes
router.get("/", async (_req, res) => {
  try {
    const { data: classes, error } = await supabaseAdmin
      .from("classes")
      .select("*")
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Fetch subjects for each class
    const { data: subjects } = await supabaseAdmin
      .from("subjects")
      .select("id, class_id, slug, name")
      .eq("is_active", true);

    const enriched = (classes || []).map((c: any) => ({
      ...c,
      subjects: (subjects || []).filter((s: any) => s.class_id === c.id),
      subjectCount: (subjects || []).filter((s: any) => s.class_id === c.id).length,
    }));

    return res.json({ classes: enriched, total: enriched.length });
  } catch (err: any) {
    console.error("Failed to list classes:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// GET /api/classes/:slug - Retrieve single class and its subjects
router.get("/:slug", async (req, res) => {
  try {
    const slug = normalizeClassSlug(req.params.slug);

    const { data: cls, error: classError } = await supabaseAdmin
      .from("classes")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (classError || !cls) {
      return res.status(404).json({ error: `Class '${req.params.slug}' not found` });
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
