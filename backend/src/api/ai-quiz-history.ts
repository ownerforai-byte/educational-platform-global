import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";

/**
 * Per-user AI quiz history.
 * One row per completed quiz the student finished on /ai-quiz, persisted in
 * Supabase (`quiz_history`). All queries are scoped to the authenticated user.
 *
 * If the table has not been migrated yet, the router degrades gracefully
 * (empty lists / skip saves) instead of erroring.
 */

const router = Router();

const insertSchema = z.object({
  title: z.string().trim().min(1).max(120).default("Quiz"),
  classSlug: z.string().trim().max(64).optional(),
  subjectSlug: z.string().trim().max(64).optional(),
  topic: z.string().trim().max(200).optional(),
  difficulty: z.enum(["easy", "intermediate", "hard"]).optional(),
  questions: z
    .array(
      z.object({
        prompt: z.string().max(4000),
        options: z.array(z.string().max(1000)).min(2).max(6),
        correctIndex: z.number().int().min(0),
        difficulty: z.enum(["easy", "intermediate", "hard"]),
        subject: z.string().max(200),
        topic: z.string().max(400),
        explanation: z.string().max(10000),
        optionAnalysis: z
          .object({
            A: z.string().max(600),
            B: z.string().max(600),
            C: z.string().max(600),
            D: z.string().max(600),
          })
          .optional(),
      })
    )
    .min(1)
    .max(40),
  answered: z.number().int().min(0).max(1000).default(0),
  correct: z.number().int().min(0).max(1000).default(0),
  scorePct: z.number().int().min(0).max(100).optional(),
  _req: z.literal("quiz-history").optional(),
});

function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

/** GET /api/ai-quiz-history — the user's completed quizzes, newest first. */
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;
    const limitRaw = Number(req.query.limit);
    const limit =
      Number.isFinite(limitRaw)
        ? Math.min(Math.max(Math.trunc(limitRaw), 1), 200)
        : 60;

    const { data, error } = await supabaseAdmin
      .from("quiz_history")
      .select(
        "id, title, class_slug, subject_slug, topic, difficulty, answered, correct, score_pct, created_at"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      if (isMissingTable(error)) {
        res.json({ rows: [], migrated: false });
        return;
      }
      res.status(500).json({ error: "Failed to load quiz history" });
      return;
    }

    const rows: typeof data = data ?? [];
    res.json({
      rows: rows.map((r) => {
        const rawPct = (r.score_pct as unknown as number | null) ?? null;
        const answerCount = r.answered as unknown as number;
        const correctCount = r.correct as unknown as number;
        const scorePct: number | null =
          rawPct !== null
            ? rawPct
            : answerCount > 0
              ? Math.round((correctCount / answerCount) * 100)
              : null;
        return {
          id: r.id,
          title: r.title,
          classSlug: r.class_slug,
          subjectSlug: r.subject_slug,
          topic: r.topic,
          difficulty: (r.difficulty as unknown as "easy" | "intermediate" | "hard" | null) ?? null,
          answered: answerCount,
          correct: correctCount,
          scorePct,
          createdat: r.created_at,
        };
      }),
      migrated: true,
    });
  })
);

/** GET /api/ai-quiz-history/:id — one completed quiz, full payload. */
router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;
    const id = req.params.id;

    const { data, error } = await supabaseAdmin
      .from("quiz_history")
      .select("id, title, class_slug, subject_slug, topic, difficulty, questions, answered, correct, score_pct, created_at")
      .eq("user_id", user.id)
      .eq("id", id)
      .single();

    if (error) {
      if (isMissingTable(error)) {
        res.status(404).json({ error: "Quiz not found" });
        return;
      }
      if (error.code === "PGRST116") {
        res.status(404).json({ error: "Quiz not found" });
        return;
      }
      res.status(500).json({ error: "Failed to load quiz" });
      return;
    }

    const rawPct = (data.score_pct as unknown as number | null) ?? null;
    const answerCount = data.answered as unknown as number;
    const correctCount = data.correct as unknown as number;
    const computedPct: number | null =
      rawPct !== null
        ? rawPct
        : answerCount > 0
          ? Math.round((correctCount / answerCount) * 100)
          : null;
    res.json({
      id: data.id,
      title: data.title,
      classSlug: data.class_slug,
      subjectSlug: data.subject_slug,
      topic: data.topic,
      difficulty: (data.difficulty as unknown as "easy" | "intermediate" | "hard" | null) ?? null,
      questions: data.questions,
      answered: data.answered as unknown as number,
      correct: data.correct as unknown as number,
      scorePct: computedPct,
      createdat: data.created_at,
      migrated: true,
    });
  })
);

/** POST /api/ai-quiz-history — save one completed quiz. */
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = insertSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid quiz history payload" });
      return;
    }

    const user = (req as Request & { user: { id: string } }).user;
    const questions = parsed.data.questions;

    const row = {
      user_id: user.id,
      title: parsed.data.title,
      class_slug: parsed.data.classSlug,
      subject_slug: parsed.data.subjectSlug,
      topic: parsed.data.topic,
      difficulty: parsed.data.difficulty,
      questions: questions.map((q) => ({
        prompt: q.prompt,
        options: q.options,
        correctIndex: q.correctIndex,
        difficulty: q.difficulty,
        subject: q.subject,
        topic: q.topic,
        explanation: q.explanation,
        optionAnalysis:
          q.optionAnalysis && Object.keys(q.optionAnalysis).length > 0
            ? q.optionAnalysis
            : null,
      })),
      answered: parsed.data.answered,
      correct: parsed.data.correct,
      score_pct: parsed.data.scorePct,
    };

    const { error: insertError } = await supabaseAdmin.from("quiz_history").insert(row);

    if (insertError) {
      if (isMissingTable(insertError)) {
        res.json({ saved: false, migrated: false });
        return;
      }
      res.status(500).json({ error: "Failed to save quiz history" });
      return;
    }

    res.json({ saved: true, migrated: true });
  })
);

/** DELETE /api/ai-quiz-history/:id — delete one saved quiz. */
router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;
    const id = req.params.id;

    const { error } = await supabaseAdmin
      .from("quiz_history")
      .delete()
      .eq("user_id", user.id)
      .eq("id", id);

    if (error) {
      if (isMissingTable(error)) {
        res.json({ deleted: true, migrated: false });
        return;
      }
      res.status(500).json({ error: "Failed to delete quiz history" });
      return;
    }

    res.json({ deleted: true, migrated: true });
  })
);

/** DELETE /api/ai-quiz-history — clear all saved quizzes for the user. */
router.delete(
  "/",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;

    const { error } = await supabaseAdmin
      .from("quiz_history")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      if (isMissingTable(error)) {
        res.json({ cleared: true, migrated: false });
        return;
      }
      res.status(500).json({ error: "Failed to clear quiz history" });
      return;
    }

    res.json({ cleared: true, migrated: true });
  })
);

export default router;
