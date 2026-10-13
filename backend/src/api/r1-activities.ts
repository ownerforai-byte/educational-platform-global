import { Router, Request, Response } from "express";
import { serverError } from "../middleware/errors";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { requireR1Access } from "../middleware/r1Access";

const router = Router();

// ── R1 daily activity log ───────────────────────────────────────────────────

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");
const clockTime = z.string().regex(/^\d{2}:\d{2}$/, "must be HH:MM");

const activityCreateSchema = z
  .object({
    activityDate: isoDate,
    startTime: clockTime.optional().nullable(),
    endTime: clockTime.optional().nullable(),
    category: z.string().trim().min(1).max(40).optional(),
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().max(5000).optional().nullable(),
    minutes: z.number().int().min(0).max(24 * 60).optional().nullable(),
  })
  .strict();

const activityUpdateSchema = activityCreateSchema.partial().strict();

const ACTIVITY_COLUMNS =
  "id, activity_date, start_time, end_time, category, title, description, minutes, created_at, updated_at";

function mapActivityRow(row: any) {
  return {
    id: row.id,
    activityDate: row.activity_date,
    startTime: row.start_time ?? null,
    endTime: row.end_time ?? null,
    category: row.category ?? "general",
    title: row.title,
    description: row.description ?? null,
    minutes: row.minutes ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ── GET /api/r1/activities?from=YYYY-MM-DD&to=YYYY-MM-DD ────────────────────

router.get("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;

    let query = supabaseAdmin
      .from("r1_activities")
      .select(ACTIVITY_COLUMNS)
      .eq("user_id", user.id)
      .order("activity_date", { ascending: false })
      .order("start_time", { ascending: true });

    const { from, to } = req.query;
    if (typeof from === "string" && isoDate.safeParse(from).success) {
      query = query.gte("activity_date", from);
    }
    if (typeof to === "string" && isoDate.safeParse(to).success) {
      query = query.lte("activity_date", to);
    }

    const { data, error } = await query;
    if (error) {
      serverError(res, error);
      return;
    }
    res.json((data ?? []).map(mapActivityRow));
  } catch (err) {
    serverError(res, err);
  }
});

// ── POST /api/r1/activities ─────────────────────────────────────────────────

router.post("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  const parsed = activityCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  try {
    const user = (req as AuthedRequest).user;
    const v = parsed.data;

    const { data, error } = await supabaseAdmin
      .from("r1_activities")
      .insert([
        {
          user_id: user.id,
          activity_date: v.activityDate,
          start_time: v.startTime ?? null,
          end_time: v.endTime ?? null,
          category: v.category ?? "general",
          title: v.title,
          description: v.description ?? null,
          minutes: v.minutes ?? null,
        },
      ])
      .select(ACTIVITY_COLUMNS)
      .single();

    if (error) {
      serverError(res, error);
      return;
    }
    res.status(201).json(mapActivityRow(data));
  } catch (err) {
    serverError(res, err);
  }
});

// ── PATCH /api/r1/activities/:id (own rows only) ────────────────────────────

router.patch("/:id", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  const parsed = activityUpdateSchema.safeParse(req.body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  try {
    const user = (req as AuthedRequest).user;
    const v = parsed.data;
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (v.activityDate !== undefined) updates.activity_date = v.activityDate;
    if (v.startTime !== undefined) updates.start_time = v.startTime;
    if (v.endTime !== undefined) updates.end_time = v.endTime;
    if (v.category !== undefined) updates.category = v.category;
    if (v.title !== undefined) updates.title = v.title;
    if (v.description !== undefined) updates.description = v.description;
    if (v.minutes !== undefined) updates.minutes = v.minutes;

    const { data, error } = await supabaseAdmin
      .from("r1_activities")
      .update(updates)
      .eq("id", req.params.id)
      .eq("user_id", user.id)
      .select(ACTIVITY_COLUMNS)
      .maybeSingle();

    if (error) {
      serverError(res, error);
      return;
    }
    if (!data) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(mapActivityRow(data));
  } catch (err) {
    serverError(res, err);
  }
});

// ── DELETE /api/r1/activities/:id (own rows only) ───────────────────────────

router.delete("/:id", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const { data, error } = await supabaseAdmin
      .from("r1_activities")
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

export default router;
