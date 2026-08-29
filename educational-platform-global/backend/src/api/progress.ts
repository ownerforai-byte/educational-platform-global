import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth, type AuthedRequest } from "../middleware/auth";

const router = Router();

// Accept both camelCase (topicId) and snake_case (topic_id) for compatibility
// with the original Next.js client; normalize to topic_id downstream.
const progressSchema = z
  .object({
    topicId: z.string().uuid().optional(),
    topic_id: z.string().uuid().optional(),
    completed: z.boolean(),
  })
  .strict()
  .refine((v) => v.topicId !== undefined || v.topic_id !== undefined, {
    message: "topicId is required",
  });

router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;

    const { data, error } = await supabaseAdmin
      .from("user_progress")
      .select("id, topic_id, completed, completed_at, updated_at, topics(slug, title, chapter(slug, title, subject(slug, name, class(slug, name))))")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    const progress = (data ?? []).map((row: any) => ({
      id: row.id,
      topicId: row.topic_id,
      completed: row.completed,
      completedAt: row.completed_at,
      updatedAt: row.updated_at,
      topic: row.topics ? {
        slug: row.topics.slug,
        title: row.topics.title,
        chapter: row.topics.chapter ? {
          slug: row.topics.chapter.slug,
          title: row.topics.chapter.title,
          subject: row.topics.chapter.subject ? {
            slug: row.topics.chapter.subject.slug,
            name: row.topics.chapter.subject.name,
            class: row.topics.chapter.subject.class ? {
              slug: row.topics.chapter.subject.class.slug,
              name: row.topics.chapter.subject.class.name,
            } : null,
          } : null,
        } : null,
      } : null,
    }));

    res.json(progress);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;

    const parsed = progressSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    const topicId = parsed.data.topicId ?? parsed.data.topic_id;
    const isCompleted = parsed.data.completed === true;

    const { data, error } = await supabaseAdmin
      .from("user_progress")
      .upsert(
        {
          user_id: user.id,
          topic_id: topicId,
          completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        },
        { onConflict: "user_id,topic_id" }
      )
      .select("id, topic_id, completed, completed_at, updated_at")
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
