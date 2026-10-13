import { Router, Request, Response } from "express";
import { serverError } from "../middleware/errors";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { requireR1Access } from "../middleware/r1Access";

const router = Router();

// ── R1 habits + daily check-ins ─────────────────────────────────────────────

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

const habitCreateSchema = z
  .object({
    name: z.string().trim().min(1).max(80),
    color: z.string().trim().max(20).optional().nullable(),
  })
  .strict();

const habitUpdateSchema = z
  .object({
    name: z.string().trim().min(1).max(80).optional(),
    color: z.string().trim().max(20).optional().nullable(),
    archived: z.boolean().optional(),
  })
  .strict();

const checkinSchema = z
  .object({
    date: isoDate,
    done: z.boolean(),
  })
  .strict();

const HABIT_COLUMNS = "id, name, color, archived, created_at";

function mapHabitRow(row: any, checkins: string[] = []) {
  return {
    id: row.id,
    name: row.name,
    color: row.color ?? null,
    archived: row.archived ?? false,
    checkins,
    createdAt: row.created_at,
  };
}

// ── GET /api/r1/habits?from=YYYY-MM-DD&to=YYYY-MM-DD ───────────────────────
// Habits with their check-in dates in the window (default: last 60 days).

router.get("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;

    const to =
      typeof req.query.to === "string" && isoDate.safeParse(req.query.to).success
        ? req.query.to
        : new Date().toISOString().slice(0, 10);
    const from =
      typeof req.query.from === "string" && isoDate.safeParse(req.query.from).success
        ? req.query.from
        : new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const [habitsRes, checkinsRes] = await Promise.all([
      supabaseAdmin
        .from("r1_habits")
        .select(HABIT_COLUMNS)
        .eq("user_id", user.id)
        .order("created_at", { ascending: true }),
      supabaseAdmin
        .from("r1_habit_checkins")
        .select("habit_id, checkin_date")
        .eq("user_id", user.id)
        .gte("checkin_date", from)
        .lte("checkin_date", to)
        .order("checkin_date", { ascending: true }),
    ]);

    if (habitsRes.error) {
      serverError(res, habitsRes.error);
      return;
    }
    if (checkinsRes.error) {
      serverError(res, checkinsRes.error);
      return;
    }

    const byHabit = new Map<string, string[]>();
    for (const c of checkinsRes.data ?? []) {
      const list = byHabit.get(c.habit_id) ?? [];
      list.push(c.checkin_date);
      byHabit.set(c.habit_id, list);
    }

    res.json((habitsRes.data ?? []).map((h: any) => mapHabitRow(h, byHabit.get(h.id) ?? [])));
  } catch (err) {
    serverError(res, err);
  }
});

// ── POST /api/r1/habits ─────────────────────────────────────────────────────

router.post("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  const parsed = habitCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  try {
    const user = (req as AuthedRequest).user;
    const { data, error } = await supabaseAdmin
      .from("r1_habits")
      .insert([
        {
          user_id: user.id,
          name: parsed.data.name,
          color: parsed.data.color ?? null,
        },
      ])
      .select(HABIT_COLUMNS)
      .single();

    if (error) {
      serverError(res, error);
      return;
    }
    res.status(201).json(mapHabitRow(data));
  } catch (err) {
    serverError(res, err);
  }
});

// ── PATCH /api/r1/habits/:id (own rows only) ────────────────────────────────

router.patch("/:id", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  const parsed = habitUpdateSchema.safeParse(req.body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  try {
    const user = (req as AuthedRequest).user;
    const v = parsed.data;
    const updates: Record<string, unknown> = {};
    if (v.name !== undefined) updates.name = v.name;
    if (v.color !== undefined) updates.color = v.color;
    if (v.archived !== undefined) updates.archived = v.archived;

    const { data, error } = await supabaseAdmin
      .from("r1_habits")
      .update(updates)
      .eq("id", req.params.id)
      .eq("user_id", user.id)
      .select(HABIT_COLUMNS)
      .maybeSingle();

    if (error) {
      serverError(res, error);
      return;
    }
    if (!data) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(mapHabitRow(data));
  } catch (err) {
    serverError(res, err);
  }
});

// ── DELETE /api/r1/habits/:id (own rows only; check-ins cascade) ────────────

router.delete("/:id", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const { data, error } = await supabaseAdmin
      .from("r1_habits")
      .delete()
      .eq("id", req.params.id)
      .eq("user_id", user.id)
      .select("id")
      .maybeSingle();

    if (error) {
      serverError(res, error);
      return;
    }
    if (!data) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ deleted: true, id: data.id });
  } catch (err) {
    serverError(res, err);
  }
});

// ── POST /api/r1/habits/:id/checkins — toggle one day (own rows only) ──────

router.post(
  "/:id/checkins",
  requireAuth,
  requireR1Access,
  async (req: Request, res: Response) => {
    const parsed = checkinSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }
    try {
      const user = (req as AuthedRequest).user;
      const { date, done } = parsed.data;

      // The habit must belong to the caller before any check-in touches it.
      const habit = await supabaseAdmin
        .from("r1_habits")
        .select("id")
        .eq("id", req.params.id)
        .eq("user_id", user.id)
        .maybeSingle();
      if (habit.error) {
        serverError(res, habit.error);
        return;
      }
      if (!habit.data) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      if (done) {
        const { error } = await supabaseAdmin
          .from("r1_habit_checkins")
          .upsert(
            [{ user_id: user.id, habit_id: req.params.id, checkin_date: date }],
            { onConflict: "habit_id,checkin_date" }
          );
        if (error) {
          serverError(res, error);
          return;
        }
      } else {
        const { error } = await supabaseAdmin
          .from("r1_habit_checkins")
          .delete()
          .eq("habit_id", req.params.id)
          .eq("user_id", user.id)
          .eq("checkin_date", date);
        if (error) {
          serverError(res, error);
          return;
        }
      }

      res.json({ habitId: req.params.id, date, done });
    } catch (err) {
      serverError(res, err);
    }
  }
);

export default router;
