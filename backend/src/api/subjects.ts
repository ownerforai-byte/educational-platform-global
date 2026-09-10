import { Router } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

function normalizeClassSlug(raw?: string): string | null {
  if (!raw) return null;
  const lower = raw.toLowerCase().trim();
  if (lower === "11" || lower === "grade-11" || lower === "grade11" || lower === "class-11") {
    return "class-11";
  }
  if (lower === "12" || lower === "grade-12" || lower === "grade12" || lower === "class-12") {
    return "class-12";
  }
  return lower;
}

// GET /api/subjects - List all active subjects with optional class filter
router.get("/", async (req, res) => {
  try {
    const classFilter = normalizeClassSlug((req.query.class || req.query.class_slug) as string);
    const classIdFilter = req.query.class_id as string;

    let targetClassId = classIdFilter;
    if (!targetClassId && classFilter) {
      const { data: cls } = await supabaseAdmin
        .from("classes")
        .select("id")
        .eq("slug", classFilter)
        .single();
      if (cls) {
        targetClassId = cls.id;
      }
    }

    let query = supabaseAdmin
      .from("subjects")
      .select("*")
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (targetClassId) {
      query = query.eq("class_id", targetClassId);
    }

    const { data: subjects, error } = await query;
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Get class info and chapter counts
    const { data: classes } = await supabaseAdmin.from("classes").select("id, slug, name");
    const classMap = new Map((classes || []).map((c: any) => [c.id, c]));

    const enriched = (subjects || []).map((s: any) => ({
      ...s,
      classInfo: classMap.get(s.class_id) || null,
    }));

    return res.json({ subjects: enriched, total: enriched.length });
  } catch (err: any) {
    console.error("Failed to list subjects:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// GET /api/subjects/:slug - Get specific subject with its chapters
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const classFilter = normalizeClassSlug((req.query.class || req.query.class_slug) as string);
    const classIdFilter = req.query.class_id as string;

    let targetClassId = classIdFilter;
    if (!targetClassId && classFilter) {
      const { data: cls } = await supabaseAdmin
        .from("classes")
        .select("id")
        .eq("slug", classFilter)
        .single();
      if (cls) {
        targetClassId = cls.id;
      }
    }

    let query = supabaseAdmin
      .from("subjects")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (targetClassId) {
      query = query.eq("class_id", targetClassId);
    }

    const { data: subjects, error: subjectError } = await query;

    if (subjectError) {
      return res.status(500).json({ error: subjectError.message });
    }

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ error: `Subject '${slug}' not found` });
    }

    // Select the matched subject (prioritizing the filtered class if applicable)
    const subject = subjects[0];

    const { data: chapters, error: chaptersError } = await supabaseAdmin
      .from("chapters")
      .select("*")
      .eq("subject_id", subject.id)
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (chaptersError) {
      return res.status(500).json({ error: chaptersError.message });
    }

    return res.json({
      subject,
      allSubjects: subjects,
      chapters: chapters ?? [],
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
