import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

async function requireAdmin(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  const token = authHeader.slice(7);
  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (!profile || !["ADMIN", "OWNER"].includes(profile.role)) {
    res.status(403).json({ error: "Forbidden" });
    return null;
  }

  return { user: data.user, profile };
}

router.get("/health", async (req: Request, res: Response) => {
  const auth = await requireAdmin(req, res);
  if (!auth) return;

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get("/content-stats", async (req: Request, res: Response) => {
  const auth = await requireAdmin(req, res);
  if (!auth) return;

  try {
    const [
      levelsResult,
      classesResult,
      subjectsResult,
      chaptersResult,
      topicsResult,
      resourcesResult,
      usersResult,
    ] = await Promise.all([
      supabaseAdmin.from("education_levels").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("classes").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("subjects").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("chapters").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("topics").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("resources").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
    ]);

    res.json({
      levels: levelsResult.count ?? 0,
      classes: classesResult.count ?? 0,
      subjects: subjectsResult.count ?? 0,
      chapters: chaptersResult.count ?? 0,
      topics: topicsResult.count ?? 0,
      resources: resourcesResult.count ?? 0,
      users: usersResult.count ?? 0,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

router.get("/settings", async (req: Request, res: Response) => {
  const auth = await requireAdmin(req, res);
  if (!auth) return;

  try {
    // Original Next.js contract: GET returned { settings: [{key,value,description}] }.
    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("key, value, description")
      .order("key", { ascending: true });

    if (error) {
      console.error("settings GET failed:", error.message);
      res.status(500).json({ error: "Failed to load settings" });
      return;
    }

    const settings = (data ?? []).map((row: any) => ({
      key: row.key,
      value: row.value,
      description: row.description ?? null,
    }));

    // Flat map kept for consumers that expect the previous flat shape.
    const map = settings.reduce(
      (acc: Record<string, any>, s: any) => {
        acc[s.key] = s.value;
        return acc;
      },
      {} as Record<string, any>
    );

    res.json({ settings, map });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Settings PATCH (ADMIN/OWNER only).
// Body: {key, value} or {settings: [{key, value}]}.
// Upserts into the settings table with updated_by set to the caller's user id
// (service-role key makes RLS inert; this route gate is the only guard).
router.patch("/settings", async (req: Request, res: Response) => {
  const auth = await requireAdmin(req, res);
  if (!auth) return;

  try {
    const body =
      req.body && typeof req.body === "object" && !Array.isArray(req.body)
        ? (req.body as Record<string, unknown>)
        : {};

    const rawEntries: unknown[] = Array.isArray(body.settings)
      ? body.settings
      : [{ key: body.key, value: body.value }];

    if (rawEntries.length === 0 || rawEntries.length > 100) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    const rows: Array<{ key: string; value: unknown }> = [];
    for (const entry of rawEntries) {
      if (!entry || typeof entry !== "object") {
        res.status(400).json({ error: "Invalid payload" });
        return;
      }
      const { key, value } = entry as Record<string, unknown>;

      if (typeof key !== "string" || key.trim().length === 0 || key.length > 100) {
        res.status(400).json({ error: "Invalid setting key" });
        return;
      }
      if (
        typeof value === "string"
          ? value.length > 5000
          : value === undefined ||
            (typeof value === "object" && value !== null &&
              Buffer.byteLength(JSON.stringify(value), "utf8") > 5000)
      ) {
        res.status(400).json({ error: `Invalid value for key "${key}"` });
        return;
      }

      rows.push({ key: key.trim(), value });
    }

    const { data, error } = await supabaseAdmin
      .from("settings")
      .upsert(
        rows.map((r) => ({ ...r, updated_by: auth.user.id })),
        { onConflict: "key" }
      )
      .select("key, value");

    if (error) {
      console.error("settings PATCH failed:", error.message);
      res.status(500).json({ error: "Failed to update settings" });
      return;
    }

    const updated = (data ?? []).map((row: any) => ({
      key: row.key,
      value: row.value,
    }));
    res.json({ settings: updated });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
