import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
import { serverError } from "../middleware/errors";

/**
 * Per-user practice attempt log for the textbook solution corpus
 * (`content/practice/solutions/**`, e.g. the Sukunda X1 62-exercise layer).
 *
 * Storage model (see migration 012_practice_attempts.sql):
 *   - questions themselves live in git as JSON files (gated content pipeline);
 *   - this table records what each authenticated student DID with them:
 *     one row per submitted/self-graded attempt, scoped to the user by RLS.
 *
 * Complements `user_journey` (topic-level started/completed) at the finer
 * question grain. If the table has not been migrated yet, the router degrades
 * gracefully (empty reads / skipped writes) instead of erroring — same
 * contract as /api/ai-quiz-history.
 */

const router = Router();

const topicSlug = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9\u0900-\u097f][A-Za-z0-9\u0900-\u097f_-]*$/);

const insertSchema = z.object({
  classSlug: z.string().trim().max(64).optional(),
  subjectSlug: z.string().trim().max(64).optional(),
  topicSlug: topicSlug,
  questionLabel: z.string().trim().min(1).max(48).default("Q1"),
  // The source-file key or book exercise id, e.g. "ex-1-1" — context only.
  source: z.string().trim().max(200).optional(),
  // The student's answer payload (text, option index, jsonb whatever the UI
  // sends). Kept so a later "review" view can re-render what they wrote.
  answer: z.unknown().optional(),
  // null/absent = ungraded; true/false = the client compared an expected
  // answer. Grading stays client-side for now; the row just records it.
  correct: z.boolean().optional(),
  timeMs: z.number().int().min(0).max(3_600_000).optional(),
  note: z.string().trim().max(500).optional(),
});

const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional(),
  topicSlug: topicSlug.optional(),
});

const summaryQuerySchema = z.object({
  topicSlug: topicSlug.optional(),
  // Cap how many raw attempts are fetched for the client-side rollups.
  limit: z.coerce.number().int().min(1).max(5000).optional(),
});

function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache") ||
    msg.includes("relation")
  );
}

/** POST /api/practice-history — record one attempt. */
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = insertSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid payload", issues: parsed.error.issues });
      return;
    }

    const user = (req as AuthedRequest).user;
    const d = parsed.data;
    const now = new Date().toISOString();

    const { data: row, error } = await supabaseAdmin
      .from("practice_attempts")
      .insert({
        user_id: user.id,
        class_slug: d.classSlug ?? "class-11",
        subject_slug: d.subjectSlug ?? "mathematics",
        topic_slug: d.topicSlug,
        question_label: d.questionLabel,
        source: d.source ?? null,
        answer: d.answer ?? null,
        correct: d.correct ?? null,
        time_ms: d.timeMs ?? null,
        note: d.note ?? null,
        attempted_at: now,
      })
      .select("id, attempted_at, correct, time_ms")
      .single();

    if (error) {
      if (isMissingTable(error)) {
        // Not migrated yet: accept but do not persist, so the client UI can
        // ship before the migration runs (same contract as quiz history).
        res.json({ saved: false, migrated: false });
        return;
      }
      serverError(res, error);
      return;
    }

    res.json({
      saved: true,
      migrated: true,
      id: row.id,
      attemptedAt: row.attempted_at,
      correct: row.correct,
      timeMs: row.time_ms,
    });
  }),
);

/** GET /api/practice-history — the user's attempts, newest first. */
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as AuthedRequest).user;
    const q = listQuerySchema.parse(req.query);
    const limit = q.limit ?? 100;

    let query = supabaseAdmin
      .from("practice_attempts")
      .select(
        "id, class_slug, subject_slug, topic_slug, question_label, source, correct, time_ms, note, attempted_at"
      )
      .eq("user_id", user.id)
      .order("attempted_at", { ascending: false })
      .limit(limit);

    if (q.topicSlug) query = query.eq("topic_slug", q.topicSlug);

    const { data, error } = await query;
    if (error) {
      if (isMissingTable(error)) {
        res.json({ rows: [], migrated: false });
        return;
      }
      serverError(res, error);
      return;
    }

    res.json({
      migrated: true,
      rows: (data ?? []).map((r) => ({
        id: r.id,
        classSlug: r.class_slug,
        subjectSlug: r.subject_slug,
        topicSlug: r.topic_slug,
        questionLabel: r.question_label,
        source: r.source,
        correct: r.correct,
        timeMs: r.time_ms,
        note: r.note,
        attemptedAt: r.attempted_at,
      })),
    });
  }),
);

/**
 * GET /api/practice-history/summary — latest state per question + per-topic
 * mastery rollups. PostgREST can't group-by with aggregates, so the rollup
 * is computed in this handler over a capped fetch (default 2000 attempts);
 * bump the cap or add a DB RPC later if a student's history outgrows it.
 */
router.get(
  "/summary",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as AuthedRequest).user;
    const q = summaryQuerySchema.parse(req.query);

    let query = supabaseAdmin
      .from("practice_attempts")
      .select(
        "topic_slug, question_label, correct, time_ms, attempted_at"
      )
      .eq("user_id", user.id)
      .order("attempted_at", { ascending: false })
      .limit(q.limit ?? 2000);

    if (q.topicSlug) query = query.eq("topic_slug", q.topicSlug);

    const { data, error } = await query;
    if (error) {
      if (isMissingTable(error)) {
        res.json({ migrated: false, perQuestion: {}, perTopic: {} });
        return;
      }
      serverError(res, error);
      return;
    }

    const rows = (data ?? []) as Array<{
      topic_slug: string;
      question_label: string;
      correct: boolean | null;
      time_ms: number | null;
      attempted_at: string;
    }>;

    // Latest row per (topic, question) — the list is already newest-first, so
    // first-seen wins.
    const perQuestion = new Map<string, (typeof rows)[number]>();
    const perTopic = new Map<
      string,
      { attempts: number; graded: number; correct: number; lastAttemptedAt: string }
    >();

    for (const r of rows) {
      const key = `${r.topic_slug}|${r.question_label}`;
      if (!perQuestion.has(key)) perQuestion.set(key, r);

      let t = perTopic.get(r.topic_slug);
      if (!t) {
        t = { attempts: 0, graded: 0, correct: 0, lastAttemptedAt: r.attempted_at };
        perTopic.set(r.topic_slug, t);
      }
      t.attempts += 1;
      if (r.correct !== null) {
        t.graded += 1;
        if (r.correct) t.correct += 1;
      }
    }

    res.json({
      migrated: true,
      // topic → { questionLabel → latest state }
      perQuestion: Object.fromEntries(
        [...perQuestion.entries()].map(([k, v]) => [k, {
          correct: v.correct,
          timeMs: v.time_ms,
          attemptedAt: v.attempted_at,
        }]),
      ),
      perTopic: Object.fromEntries(
        [...perTopic.entries()].map(([topic, t]) => [topic, {
          attempts: t.attempts,
          graded: t.graded,
          correct: t.correct,
          accuracyPct: t.graded > 0 ? Math.round((t.correct / t.graded) * 100) : null,
          lastAttemptedAt: t.lastAttemptedAt,
        }]),
      ),
    });
  }),
);

export default router;
