import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";

/**
 * IMAGE HISTORY — every picture and figure a student draws is saved to their
 * account (owner request 2026-10-04: "enable saving of image for every user …
 * hardcode its history saving").
 *
 * Storage: the `image_history` table (migration 007_image_history.sql). Server
 * draws (/api/ai/image and /api/ai/figure) save THEMSELVES through
 * saveImageHistoryRow — saving is hardcoded on the server, no client opt-in,
 * no client trust. Browser-drawn puter.js results arrive through POST /.
 * Every read and delete is scoped to req.user.id — no user can touch another
 * account's history.
 *
 * Degrades gracefully exactly like /api/chat-history: when the table has not
 * been migrated yet the API answers empty / skips saves instead of erroring,
 * and a failed history save NEVER costs the student their drawing.
 */
const router = Router();

const partsSchema = z.array(
  z.object({
    name: z.string().trim().min(1).max(120),
    detail: z.string().trim().max(400).default(""),
  }),
);

export const imageHistorySaveSchema = z
  .object({
    kind: z.enum(["figure", "picture"]),
    prompt: z.string().trim().min(1).max(500),
    url: z.string().trim().url().max(2048).optional(),
    svg: z.string().min(1).max(120_000).optional(),
    caption: z.string().trim().max(200).optional(),
    archetype: z.string().trim().max(40).optional(),
    engine: z.string().trim().max(60).optional(),
    parts: partsSchema.max(60).optional(),
  })
  .refine((item) => item.kind === "picture" ? !!item.url : !!item.svg, {
    message: "a picture needs a url and a figure needs its svg source",
  });

export type ImageHistorySave = z.infer<typeof imageHistorySaveSchema>;

function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

/**
 * Save one drawn item against a user — used by the draw endpoints themselves
 * (hardcoded history saving) and by POST /. Best-effort by contract: resolves
 * false on any failure instead of throwing, so a dead history store can never
 * take the drawing down with it.
 */
export async function saveImageHistoryRow(
  userId: string,
  item: ImageHistorySave,
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.from("image_history").insert({
      user_id: userId,
      kind: item.kind,
      prompt: item.prompt,
      url: item.url ?? null,
      svg: item.svg ?? null,
      caption: item.caption ?? null,
      archetype: item.archetype ?? null,
      engine: item.engine ?? null,
      parts: item.parts && item.parts.length > 0 ? item.parts : null,
    });
    if (error) {
      if (!isMissingTable(error)) {
        console.warn("[image-history] save failed:", error.message);
      }
      return false;
    }
    return true;
  } catch (err) {
    console.warn(
      "[image-history] save threw:",
      err instanceof Error ? err.message : err,
    );
    return false;
  }
}

/** GET /api/ai/image-history?limit=60 — the user's saved draws, newest first. */
router.get("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const limitRaw = Number(req.query.limit);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(Math.trunc(limitRaw), 1), 200)
    : 60;

  const { data, error } = await supabaseAdmin
    .from("image_history")
    .select("id, kind, prompt, url, svg, caption, archetype, engine, parts, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    if (isMissingTable(error)) {
      res.json({ items: [], migrated: false });
      return;
    }
    console.warn("[image-history] load failed:", error.message);
    res.status(500).json({ error: "Failed to load image history" });
    return;
  }

  const items = (data ?? []).map((row) => ({
    id: String(row.id),
    kind: row.kind === "figure" ? "figure" : "picture",
    prompt: String(row.prompt ?? ""),
    url: typeof row.url === "string" ? row.url : null,
    svg: typeof row.svg === "string" ? row.svg : null,
    caption: typeof row.caption === "string" ? row.caption : null,
    archetype: typeof row.archetype === "string" ? row.archetype : null,
    engine: typeof row.engine === "string" ? row.engine : null,
    parts: Array.isArray(row.parts) ? row.parts : null,
    createdAt: String(row.created_at ?? ""),
  }));

  res.json({ items, migrated: true });
});

/** POST /api/ai/image-history — save one browser-drawn (puter.js) result. */
router.post("/", requireAuth, async (req: Request, res: Response) => {
  const parsed = imageHistorySaveSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid image history payload" });
    return;
  }

  const user = (req as Request & { user: { id: string } }).user;
  const saved = await saveImageHistoryRow(user.id, parsed.data);
  res.json({ saved, migrated: true });
});

/** DELETE /api/ai/image-history?id=<uuid> — clear one item, or the whole history. */
router.delete("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const id = typeof req.query.id === "string" ? req.query.id.trim() : null;

  let query = supabaseAdmin.from("image_history").delete().eq("user_id", user.id);
  if (id) query = query.eq("id", id);

  const { error } = await query;

  if (error) {
    if (isMissingTable(error)) {
      res.json({ cleared: true, migrated: false });
      return;
    }
    console.warn("[image-history] clear failed:", error.message);
    res.status(500).json({ error: "Failed to clear image history" });
    return;
  }

  res.json({ cleared: true, migrated: true });
});

export default router;
