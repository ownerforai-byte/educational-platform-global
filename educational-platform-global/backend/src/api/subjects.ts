import { Router } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: subjects, error: subjectError } = await supabaseAdmin
      .from("subjects")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (subjectError) {
      return res.status(500).json({ error: subjectError.message });
    }

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    // Return first matching subject with its chapters
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
