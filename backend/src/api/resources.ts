import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

async function requireUser(req: Request, res: Response) {
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

  return data.user;
}

async function requireTeacher(req: Request, res: Response) {
  const user = await requireUser(req, res);
  if (!user) return null;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["TEACHER", "ADMIN", "OWNER"].includes(profile.role)) {
    res.status(403).json({ error: "Forbidden" });
    return null;
  }

  return { user, profile };
}

router.get("/", async (_req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin
    .from("resources")
    .select("*")
    .eq("is_published", true)
    .order("type", { ascending: true })
    .limit(50);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data ?? []);
});

router.post("/", async (req: Request, res: Response) => {
  const auth = await requireTeacher(req, res);
  if (!auth) return;

  const { topic_id, type, title, content, media_url, metadata } = req.body;

  if (!topic_id || !type || !title) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const { data, error } = await supabaseAdmin
    .from("resources")
    .insert({
      topic_id,
      type,
      title,
      content: content ?? {},
      media_url: media_url ?? null,
      metadata: metadata ?? {},
      created_by: auth.user.id,
      is_published: false,
    })
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json(data);
});

router.get("/resource", async (_req: Request, res: Response) => {
  res.json({
    message: "Resource API test response",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("resources")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json(data);
});

// Strict field allowlist for PATCH. Service-role key makes RLS inert, so this
// route-level check is the only guard against mass-assignment
// (created_by / role / id must never be client-settable).
const BASE_PATCH_FIELDS = [
  "title",
  "description",
  "url",
  "type",
  "media_url",
  "topic_id",
  "metadata",
] as const;
const ADMIN_ONLY_PATCH_FIELDS = ["is_published"] as const;
const FORBIDDEN_PATCH_FIELDS = [
  "id",
  "created_by",
  "owner",
  "user_id",
  "role",
] as const;

function isValidJsonMetadata(value: unknown): boolean {
  return (
    value === null ||
    (typeof value === "object" && !Array.isArray(value) && !Buffer.isBuffer(value))
  );
}

function buildResourcePatch(
  body: Record<string, unknown>,
  isAdmin: boolean
): { updates: Record<string, unknown>; rejected: string[] } {
  const allowed = new Set<string>(BASE_PATCH_FIELDS);
  if (isAdmin) {
    for (const f of ADMIN_ONLY_PATCH_FIELDS) allowed.add(f);
  }

  const rejected: string[] = [];
  for (const key of Object.keys(body)) {
    if (FORBIDDEN_PATCH_FIELDS.includes(key as never) || !allowed.has(key)) {
      rejected.push(key);
      continue;
    }
    if (key === "metadata" && !isValidJsonMetadata(body[key])) {
      rejected.push(key);
    }
  }
  if (rejected.length > 0) {
    return { updates: {}, rejected };
  }

  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }
  return { updates, rejected };
}

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const auth = await requireTeacher(req, res);
  if (!auth) return;

  const body =
    req.body && typeof req.body === "object" && !Array.isArray(req.body)
      ? (req.body as Record<string, unknown>)
      : {};

  const role = String(auth.profile.role ?? "").toUpperCase();
  const isAdmin = role === "ADMIN" || role === "OWNER";

  const { updates, rejected } = buildResourcePatch(body, isAdmin);
  if (rejected.length > 0) {
    res.status(400).json({
      error: `Unknown or forbidden fields: ${rejected.join(", ")}`,
      fields: rejected,
    });
    return;
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No valid fields to update" });
    return;
  }

  const { data, error } = await supabaseAdmin
    .from("resources")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("resources PATCH failed:", error.message);
    res.status(500).json({ error: "Update failed" });
    return;
  }

  res.json(data);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const auth = await requireTeacher(req, res);
  if (!auth) return;

  // Fetch row first: with the service-role key RLS is inert, so ownership
  // must be enforced here explicitly.
  const { data: row } = await supabaseAdmin
    .from("resources")
    .select("id, created_by")
    .eq("id", id)
    .maybeSingle();

  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const role = String(auth.profile.role ?? "").toUpperCase();
  const isPrivileged = role === "ADMIN" || role === "OWNER";
  const isOwner = row.created_by === auth.user.id;

  if (!isPrivileged && !isOwner) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const { error } = await supabaseAdmin
    .from("resources")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("resources DELETE failed:", error.message);
    res.status(500).json({ error: "Delete failed" });
    return;
  }

  res.json({ success: true });
});

router.post("/:id/link", async (req: Request, res: Response) => {
  const auth = await requireTeacher(req, res);
  if (!auth) return;

  const { resource_id, referenced_id, reference_type, attribution } = req.body;

  if (!resource_id || !referenced_id || !reference_type) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const { data, error } = await supabaseAdmin
    .from("resource_references")
    .insert({
      resource_id,
      referenced_id,
      reference_type,
      attribution: attribution ?? null,
    })
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json(data);
});

export default router;
