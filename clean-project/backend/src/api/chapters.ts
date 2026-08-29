import { Router } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: chapter, error: chapterError } = await supabaseAdmin
      .from("chapters")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (chapterError || !chapter) {
      return res.status(404).json({ error: "Not found" });
    }

    const { data: topics, error: topicsError } = await supabaseAdmin
      .from("topics")
      .select("*")
      .eq("chapter_id", chapter.id)
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (topicsError) {
      return res.status(500).json({ error: topicsError.message });
    }

    const topicIds = (topics ?? []).map((t) => t.id);
    let completed = 0;
    try {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7);
        const {
          data: { user },
        } = await supabaseAdmin.auth.getUser(token);
        if (user && topicIds.length > 0) {
          const { count } = await supabaseAdmin
            .from("user_progress")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .in("topic_id", topicIds)
            .eq("completed", true);
          completed = count ?? 0;
        }
      }
    } catch {
      // ignore
    }

    return res.json({
      chapter,
      topics: topics ?? [],
      progress: { completed, total: topicIds.length },
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
