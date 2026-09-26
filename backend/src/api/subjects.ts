import { Router } from "express";
import { serverError } from "../middleware/errors";
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
      return serverError(res, subjectError);
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
      return serverError(res, chaptersError);
    }

    return res.json({
      subject,
      allSubjects: subjects,
      chapters: chapters ?? [],
    });
  } catch (err: any) {
    console.error(err);
    return serverError(res, err);
  }
});

export default router;
