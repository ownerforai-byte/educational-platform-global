import { Router, Request, Response } from "express";
import { serverError } from "../middleware/errors";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth, type AuthedRequest } from "../middleware/auth";

const router = Router();

/**
 * ── Progress / journey model ────────────────────────────────────────────────
 *
 * Two shapes live behind the one `/api/progress` route:
 *
 *  1. JOURNEY (the default, added 2026-10-04): the syllabus-path payload
 *     `{ classSlug, subjectSlug, unitSlug, topicSlug, status? }`, stored in
 *     `public.user_journey` (migration 006). This is what "My Progress" reads:
 *     one row per topic the student has actually touched, keyed by the same
 *     path as `frontend/lib/syllabus.ts` so it can represent all 696 official
 *     syllabus topics — not just the 66 seeded rows in `topics`.
 *
 *  2. LEGACY: `{ topicId | topic_id, completed }`, stored in
 *     `public.user_progress` (FK to `topics.id`). Kept for older clients and
 *     the chapter-progress summary in `api/chapters.ts`.
 *
 * Journey state machine:
 *   no row                   → not started
 *   status 'started'         → in progress (a topic view; never downgrades a
 *                              completed topic)
 *   status 'completed'       → completed (`completed_at` stamped once)
 *   status 'not_completed'   → explicit un-complete from the UI: clears
 *                              `completed_at` and returns it to in progress
 */

// ── schemas ────────────────────────────────────────────────────────────────

// Accept both camelCase (topicId) and snake_case (topic_id) for compatibility
// with the original Next.js client; normalize to topic_id downstream.
const legacySchema = z
  .object({
    topicId: z.string().uuid().optional(),
    topic_id: z.string().uuid().optional(),
    completed: z.boolean(),
  })
  .strict()
  .refine((v) => v.topicId !== undefined || v.topic_id !== undefined, {
    message: "topicId is required",
  });

/**
 * Syllabus slugs are URL segments — ASCII (`class-11-notes`, `kinematics`) or
 * Devanagari, mirroring the alphabet `slugifySyllabusTopic` produces
 * (`[a-z0-9\u0900-\u097f]`, e.g. `पाठ-१-वीर-पुर्खा-कविता`).
 */
const syllabusSlug = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9\p{L}\p{N}][\p{L}\p{N}\p{M}_-]*$/u, "must be a slug");

const journeySchema = z
  .object({
    classSlug: syllabusSlug,
    subjectSlug: syllabusSlug,
    unitSlug: syllabusSlug,
    topicSlug: syllabusSlug,
    /**
     * - `"started"`      passive: the topic was opened (auto-tracked view).
     *                    Never downgrades a completed topic.
     * - `"completed"`    explicit: the student says "I'm done with this".
     * - `"not_completed"` explicit: the student un-checks it — clears
     *                    `completed_at` and returns it to in progress.
     */
    status: z.enum(["started", "completed", "not_completed"]).optional(),
  })
  .strict();

const progressSchema = z.union([legacySchema, journeySchema]);

/** Columns every journey read returns (snake_case from PostgREST). */
const JOURNEY_COLUMNS =
  "id, class_slug, subject_slug, unit_slug, topic_slug, status, started_at, last_viewed_at, view_count, completed_at, updated_at";

function mapJourneyRow(row: any) {
  return {
    id: row.id,
    classSlug: row.class_slug,
    subjectSlug: row.subject_slug,
    unitSlug: row.unit_slug,
    topicSlug: row.topic_slug,
    status: row.status as "started" | "completed",
    startedAt: row.started_at,
    lastViewedAt: row.last_viewed_at,
    viewCount: row.view_count ?? 1,
    completedAt: row.completed_at ?? null,
    updatedAt: row.updated_at,
  };
}

// ── GET /api/progress — the student's journey, newest activity first ───────

router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;

    const { data, error } = await supabaseAdmin
      .from("user_journey")
      .select(JOURNEY_COLUMNS)
      .eq("user_id", user.id)
      .order("last_viewed_at", { ascending: false });

    if (error) {
      serverError(res, error);
      return;
    }

    // Row-per-topic, scoped to the session user only (no IDOR: the eq filter
    // above is the owner check, and RLS own-row policies back it up).
    res.json((data ?? []).map(mapJourneyRow));
  } catch (err: any) {
    console.error(err);
    serverError(res, err);
  }
});

// ── POST /api/progress — record a journey event (or a legacy toggle) ───────

router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const parsed = progressSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    if ("classSlug" in parsed.data) {
      await recordJourney(req, res, parsed.data);
      return;
    }

    await recordLegacyProgress(req, res, parsed.data);
  } catch (err: any) {
    console.error(err);
    serverError(res, err);
  }
});

/** Journey branch: insert on first touch, otherwise bump activity in place. */
async function recordJourney(
  req: Request,
  res: Response,
  data: z.infer<typeof journeySchema>,
): Promise<void> {
  const user = (req as AuthedRequest).user;
  const requested = data.status ?? "started";
  // An explicit un-complete is the one thing allowed to clear `completed_at`;
  // a passive view never is.
  const explicitUncomplete = requested === "not_completed";
  const now = new Date().toISOString();

  const { data: existing, error: readError } = await supabaseAdmin
    .from("user_journey")
    .select("id, status, completed_at, view_count")
    .eq("user_id", user.id)
    .eq("class_slug", data.classSlug)
    .eq("subject_slug", data.subjectSlug)
    .eq("unit_slug", data.unitSlug)
    .eq("topic_slug", data.topicSlug)
    .maybeSingle();

  if (readError) {
    serverError(res, readError);
    return;
  }

  if (!existing) {
    // No row yet: a view or an explicit un-complete both start the journey,
    // only an explicit "completed" may arrive already completed.
    const status = requested === "completed" ? "completed" : "started";
    const { data: created, error: insertError } = await supabaseAdmin
      .from("user_journey")
      .insert({
        user_id: user.id,
        class_slug: data.classSlug,
        subject_slug: data.subjectSlug,
        unit_slug: data.unitSlug,
        topic_slug: data.topicSlug,
        status,
        started_at: now,
        last_viewed_at: now,
        view_count: 1,
        completed_at: status === "completed" ? now : null,
        updated_at: now,
      })
      .select(JOURNEY_COLUMNS)
      .single();

    if (insertError) {
      serverError(res, insertError);
      return;
    }

    res.json(mapJourneyRow(created));
    return;
  }

  // Resolve the state machine:
  //   not_completed → always back to started (explicit intent, may downgrade)
  //   completed     → completed
  //   started       → stays completed if it already was (a passive view must
  //                   never undo the student's own "I'm done")
  const status: "started" | "completed" = explicitUncomplete
    ? "started"
    : requested === "completed" || existing.status === "completed"
      ? "completed"
      : "started";

  const { data: updated, error: updateError } = await supabaseAdmin
    .from("user_journey")
    .update({
      status,
      last_viewed_at: now,
      view_count: (existing.view_count ?? 1) + 1,
      completed_at: status === "completed" ? (existing.completed_at ?? now) : null,
      updated_at: now,
    })
    .eq("id", existing.id)
    .select(JOURNEY_COLUMNS)
    .single();

  if (updateError) {
    serverError(res, updateError);
    return;
  }

  res.json(mapJourneyRow(updated));
}

/** Legacy branch: exact previous behaviour of POST /api/progress. */
async function recordLegacyProgress(
  req: Request,
  res: Response,
  data: z.infer<typeof legacySchema>,
): Promise<void> {
  const user = (req as AuthedRequest).user;
  const topicId = data.topicId ?? data.topic_id;
  const isCompleted = data.completed === true;

  const { data: row, error } = await supabaseAdmin
    .from("user_progress")
    .upsert(
      {
        user_id: user.id,
        topic_id: topicId,
        completed: isCompleted,
        completed_at: isCompleted ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,topic_id" },
    )
    .select("id, topic_id, completed, completed_at, updated_at")
    .single();

  if (error) {
    serverError(res, error);
    return;
  }

  res.json(row);
}

export default router;
