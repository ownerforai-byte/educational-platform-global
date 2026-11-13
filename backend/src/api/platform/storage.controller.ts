import { Router, Request, Response } from "express";
import { z } from "zod";
import { normalizeRole } from "../../auth/types";
import { isApprovedAccount, loadProfileAccess } from "../../middleware/auth";
import { supabaseAdmin } from "../../db/supabase";
import { routeBinaryUpload, storageTiersHealth } from "../../storage/router";

const router = Router();

async function requireUser(req: Request, res: Response) {
  res.set("Cache-Control", "private, no-store");
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

// Upload gate: the plus rung and up (legacy values normalize to owner first).
async function requireContentEditor(req: Request, res: Response) {
  const user = await requireUser(req, res);
  if (!user) return null;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role, access_status")
    .eq("id", user.id)
    .maybeSingle();

  if (!isApprovedAccount({ email: user.email, role: profile?.role }, profile?.access_status)) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  if (!profile || !["plus", "pro", "owner"].includes(normalizeRole(profile.role) ?? "")) {
    res.status(403).json({ error: "Forbidden" });
    return null;
  }

  return { user, profile };
}

/**
 * Three-tier storage health (Supabase / Firebase / R2).
 */
router.get("/health", async (req: Request, res: Response) => {
  const auth = await requireUser(req, res);
  if (!auth) return;

  const profileAccess = await loadProfileAccess(auth.id);
  if (!isApprovedAccount({ email: auth.email, role: profileAccess.role }, profileAccess.accessStatus)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const tiers = await storageTiersHealth();
  res.json(tiers);
});

// No multer/busboy available (no new deps), so uploads arrive as base64 JSON.
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB decoded cap
const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
] as const;
const PATH_REGEX = /^[A-Za-z0-9/._-]+$/;

const uploadSchema = z
  .object({
    /** Deprecated — binaries no longer use Supabase Storage buckets. */
    bucket: z.string().optional(),
    path: z.string().min(1).max(1024),
    contentType: z.string().min(1),
    dataBase64: z.string().min(1),
  })
  .strict();

router.post("/upload", async (req: Request, res: Response) => {
  const auth = await requireContentEditor(req, res);
  if (!auth) return;

  const parsed = uploadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const { path, contentType } = parsed.data;

  if (path.includes("..")) {
    res.status(400).json({ error: "Invalid path" });
    return;
  }
  if (!PATH_REGEX.test(path)) {
    res.status(400).json({ error: "Invalid path" });
    return;
  }

  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(contentType)) {
    res.status(400).json({ error: "Unsupported content type" });
    return;
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(parsed.data.dataBase64, "base64");
  } catch {
    res.status(400).json({ error: "Invalid base64 payload" });
    return;
  }
  if (
    buffer.length === 0 ||
    !/^[A-Za-z0-9+/\s]+={0,2}$/.test(parsed.data.dataBase64.trim())
  ) {
    res.status(400).json({ error: "Invalid base64 payload" });
    return;
  }
  if (buffer.length > MAX_BYTES) {
    res.status(413).json({ error: "File exceeds the 10MB limit" });
    return;
  }

  try {
    const routed = await routeBinaryUpload({ path, contentType, buffer });
    res.status(201).json({
      path: routed.path,
      publicUrl: routed.publicUrl,
      storedIn: routed.storedIn,
      tier: routed.tier,
    });
  } catch (err: unknown) {
    console.error(
      "[storage] tiered upload failed:",
      err instanceof Error ? err.message : err,
    );
    res.status(500).json({ error: "Upload failed" });
  }
});

export const storageRoutes = router;
export default router;
