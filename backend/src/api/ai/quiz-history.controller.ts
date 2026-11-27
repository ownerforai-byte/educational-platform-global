import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../../db/supabase";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../middleware/asyncHandler";
import {
  claimQuizAttempt,
  quizResponseSchema,
  type QuizAttemptFormat,
  type QuizQuestionSnapshot,
} from "./quiz-attempt.service";

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
  // Quiz format of the set (plan.md §11) — absent → `mcq` for old clients.
  format: z
    .enum(["mcq", "true-false", "fill-blank", "short-answer", "long-answer"])
    .optional(),
  questions: z
    .array(
      z.object({
        prompt: z.string().max(4000),
        // Writing formats legitimately carry zero options; MCQ sets keep 2-6.
        options: z.array(z.string().max(1000)).max(6).default([]),
        // -1 marks free-text items graded by the AI evaluator.
        correctIndex: z.number().int().min(-1).default(0),
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
        // Per-item format (the set-level `format` is the fallback).
        format: z
          .enum(["mcq", "true-false", "fill-blank", "short-answer", "long-answer"])
          .optional(),
        // Writing-format fields (fill-blank / short-answer / long-answer).
        acceptedAnswers: z.array(z.string().max(500)).max(6).optional(),
        modelAnswer: z.string().max(20000).optional(),
        rubric: z.array(z.string().max(600)).max(10).optional(),
        maxScore: z.number().int().min(1).max(10).optional(),
      })
    )
    .min(1)
    .max(40),
  answered: z.number().int().min(0).max(1000).default(0),
  correct: z.number().int().min(0).max(1000).default(0),
  scorePct: z.number().int().min(0).max(100).optional(),
  attemptId: z.string().uuid().optional(),
  responses: z.array(quizResponseSchema).max(40).optional(),
  _req: z.literal("quiz-history").optional(),
}).superRefine((value, ctx) => {
  if (value.correct > value.answered) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["correct"],
      message: "correct cannot exceed answered",
    });
  }
  if (value.attemptId && !value.responses) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["responses"],
      message: "responses are required for an issued attempt",
    });
  }
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
        "id, title, class_slug, subject_slug, topic, difficulty, format, answered, correct, score_pct, created_at"
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
          format: (r.format as unknown as QuizAttemptFormat | null) ?? null,
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
      .select("id, title, class_slug, subject_slug, topic, difficulty, format, questions, answered, correct, score_pct, created_at")
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
      format: (data.format as unknown as QuizAttemptFormat | null) ?? null,
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
    const claimed = parsed.data.attemptId
      ? await claimQuizAttempt({
          attemptId: parsed.data.attemptId,
          userId: user.id,
          questions: parsed.data.questions,
          responses: parsed.data.responses ?? [],
        })
      : null;
    const questions: QuizQuestionSnapshot[] = claimed?.questions ?? parsed.data.questions;
    const attempt = claimed?.attempt;
    const grade = claimed?.grade;
    const answered = grade?.answered ?? parsed.data.answered;
    const correct = grade?.correct ?? parsed.data.correct;
    const scorePct = grade ? grade.scorePct : parsed.data.scorePct ?? null;
    const format =
      attempt?.format ?? parsed.data.format ?? questions[0]?.format ?? "mcq";

    const row = {
      user_id: user.id,
      title: attempt?.title ?? parsed.data.title,
      class_slug: attempt?.class_slug ?? parsed.data.classSlug ?? null,
      subject_slug: attempt?.subject_slug ?? parsed.data.subjectSlug ?? null,
      topic: attempt?.topic ?? parsed.data.topic ?? null,
      difficulty: attempt?.difficulty ?? parsed.data.difficulty ?? null,
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
        format: q.format ?? format,
        ...(q.acceptedAnswers ? { acceptedAnswers: q.acceptedAnswers } : {}),
        ...(q.modelAnswer ? { modelAnswer: q.modelAnswer } : {}),
        ...(q.rubric ? { rubric: q.rubric } : {}),
        ...(q.maxScore ? { maxScore: q.maxScore } : {}),
      })),
      answered,
      correct,
      score_pct: scorePct,
      attempt_id: attempt?.id ?? null,
      question_count: attempt?.question_count ?? questions.length,
      format,
      responses: parsed.data.responses ?? null,
      verification_status: grade?.verified ? "verified" : "unverified",
      verification_reason: grade?.verified
        ? null
        : grade?.reason ?? (attempt ? "attempt-unverified" : "client-unverified"),
      verified_at: grade?.verified ? new Date().toISOString() : null,
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

    res.json({ saved: true, migrated: true, verified: grade?.verified === true });
  })
);

/** DELETE /api/ai-quiz-history/:id — delete one saved quiz. */
router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;
    const id = req.params.id;

    const { data, error } = await supabaseAdmin
      .from("quiz_history")
      .delete()
      .eq("user_id", user.id)
      .eq("id", id)
      .select("id");

    if (error) {
      if (isMissingTable(error)) {
        res.json({ deleted: true, migrated: false });
        return;
      }
      res.status(500).json({ error: "Failed to delete quiz history" });
      return;
    }

    if (!data || data.length === 0) {
      res.status(404).json({ error: "Not found" });
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

    const { data, error } = await supabaseAdmin
      .from("quiz_history")
      .delete()
      .eq("user_id", user.id)
      .select("id");

    if (error) {
      if (isMissingTable(error)) {
        res.json({ cleared: true, migrated: false });
        return;
      }
      res.status(500).json({ error: "Failed to clear quiz history" });
      return;
    }

    if (!data || data.length === 0) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json({ cleared: true, migrated: true });
  })
);

export default router;
