import { Router, Request, Response } from "express";
import { z } from "zod";
import { normalizeRole } from "../auth/types";
import { supabaseAdmin } from "../db/supabase";
import {
  isR2StorageActive,
  r2Upload,
  looksLikeSupabaseStorageLimit,
  supabaseStorageHealth,
} from "../storage/r2";

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

  if (!profile || !["plus", "pro", "owner"].includes(normalizeRole(profile.role) ?? "")) {
    res.status(403).json({ error: "Forbidden" });
    return null;
  }

  return { user, profile };
}

/**
 * Storage health: report Supabase usage so we can see "about to run out"
 * BEFORE an upload fails. Read-only, returns sizes only. R2 overflow state
 * is included so the dashboard can say "ready to catch overflow" or
 * "not configured yet".
 */
router.get("/health", async (req: Request, res: Response) => {
  const auth = await requireUser(req, res);
  if (!auth) return;

  const supabase = await supabaseStorageHealth();
  res.json({
    primary: { provider: "supabase", ...supabase },
    overflow: { provider: "r2", configured: isR2StorageActive() },
  });
});

// No multer/busboy available (no new deps), so uploads arrive as base64 JSON.
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB decoded cap (mirrors original multipart limit)
const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
] as const;
const PATH_REGEX = /^[A-Za-z0-9/._-]+$/;
const BUCKET_REGEX = /^[A-Za-z0-9._-]{1,100}$/;

const uploadSchema = z
  .object({
    bucket: z.string().regex(BUCKET_REGEX).optional(),
    path: z.string().min(1).max(1024),
    contentType: z.string().min(1),
    dataBase64: z.string().min(1),
  })
  .strict();

router.post("/upload", async (req: Request, res: Response) => {
  const auth = await requireTeacher(req, res);
  if (!auth) return;

  const parsed = uploadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const { bucket: bucketParam, path, contentType } = parsed.data;
  const bucket =
    (bucketParam ?? process.env.SUPABASE_STORAGE_BUCKET) || "resources";

  // Reject path traversal before anything else touches storage.
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
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, buffer, { contentType, upsert: false });

    if (error || !data) {
      console.error("storage upload failed:", error?.message);

      // Overflow (owner 2026-10-24): Supabase is primary; only when its
      // upload fails on a storage-limit/quota error does the same file go to
      // Cloudflare R2. R2 is never used before Supabase has actually run out
      // of room, and nothing is seeded there ahead of time.
      if (isR2StorageActive() && looksLikeSupabaseStorageLimit(error)) {
        try {
          const { url } = await r2Upload(path, buffer, contentType);
          console.info(
            `[storage] Supabase at quota - overflowed to R2 "${path}"`,
          );
          res.status(201).json({
            path,
            publicUrl: url,
            storedIn: "r2",
          });
          return;
        } catch (r2Err) {
          console.error(
            "[storage] R2 overflow failed:",
            r2Err instanceof Error ? r2Err.message : r2Err,
          );
        }
      }

      res.status(500).json({ error: "Upload failed" });
      return;
    }

    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(data.path);

    res.status(201).json({ path: data.path, publicUrl: urlData.publicUrl });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export const storageRoutes = router;
export default router;
