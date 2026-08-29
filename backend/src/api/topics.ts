import { Router } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: topic, error: topicError } = await supabaseAdmin
      .from("topics")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (topicError || !topic) {
      return res.status(404).json({ error: "Not found" });
    }

    const { data: resources, error: resourcesError } = await supabaseAdmin
      .from("resources")
      .select("*")
      .eq("topic_id", topic.id)
      .eq("is_published", true)
      .order("type", { ascending: true });

    if (resourcesError) {
      return res.status(500).json({ error: resourcesError.message });
    }

    return res.json({ topic, resources: resources ?? [] });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
