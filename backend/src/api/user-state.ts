import { Router, Request, Response } from "express";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";
import { serverError } from "../middleware/errors";

/**
 * /api/user-state/:namespace — the account-backed home for personal stores.
 *
 * Identity is ALWAYS the session user. A client can never supply a user_id,
 * because the service-role key bypasses RLS: every read, write and delete is
 * explicitly scoped to `(req as AuthedRequest).user.id`.
 *
 * Payloads are opaque JSON documents. The server validates namespace shape,
 * JSON type and size, then hands them back unchanged. Optimistic concurrency
 * is enforced with `version`: PUT with a stale `baseVersion` gets 409 so the
 * client can merge instead of silently overwriting another device's work.
 */
const router = Router();

const TABLE = "user_state";
const NAMESPACE_RE = /^[a-z0-9_-]{1,64}$/;
const MAX_BYTES = 256 * 1024;

interface StateRow {
  payload: unknown;
  version: number;
  updated_at: string;
}

function validNamespace(value: unknown): value is string {
  return typeof value === "string" && NAMESPACE_RE.test(value);
}

function validPayload(value: unknown): boolean {
  if (value === null || typeof value !== "object") return false;
  // Arrays are legitimate for list-shaped stores (notes, flashcards, queues).
  try {
    return Buffer.byteLength(JSON.stringify(value), "utf8") <= MAX_BYTES;
  } catch {
    return false;
  }
}

async function readRow(userId: string, namespace: string): Promise<StateRow | null> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("payload, version, updated_at")
    .eq("user_id", userId)
    .eq("namespace", namespace)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as StateRow | null;
}

router.get("/:namespace", requireAuth, async (req: Request, res: Response) => {
  try {
    const { namespace } = req.params;
    if (!validNamespace(namespace)) {
      res.status(400).json({ error: "Invalid namespace" });
      return;
    }
    const user = (req as AuthedRequest).user;
    const row = await readRow(user.id, namespace);
    res.json({
      namespace,
      payload: row?.payload ?? null,
      version: row?.version ?? 0,
      updatedAt: row?.updated_at ?? null,
    });
  } catch (err) {
    serverError(res, err);
  }
});

router.put("/:namespace", requireAuth, async (req: Request, res: Response) => {
  try {
    const { namespace } = req.params;
    if (!validNamespace(namespace)) {
      res.status(400).json({ error: "Invalid namespace" });
      return;
    }
    const body = req.body && typeof req.body === "object" ? req.body : {};
    if (!validPayload(body.payload)) {
      res.status(400).json({ error: "payload must be a JSON object or array of at most 256 KB" });
      return;
    }
    const baseVersion = body.baseVersion;
    if (
      baseVersion !== undefined &&
      (!Number.isInteger(baseVersion) || baseVersion < 0)
    ) {
      res.status(400).json({ error: "baseVersion must be a non-negative integer" });
      return;
    }

    const user = (req as AuthedRequest).user;
    const current = await readRow(user.id, namespace);
    const currentVersion = current?.version ?? 0;
    if (baseVersion !== undefined && baseVersion !== currentVersion) {
      res.status(409).json({
        error: "version_conflict",
        current: {
          payload: current?.payload ?? null,
          version: currentVersion,
          updatedAt: current?.updated_at ?? null,
        },
      });
      return;
    }

    const version = currentVersion + 1;
    const updatedAt = new Date().toISOString();
    // No client-supplied id, user_id, version or timestamps reach the upsert.
    const { error } = await supabaseAdmin.from(TABLE).upsert(
      {
        user_id: user.id,
        namespace,
        payload: body.payload,
        version,
        updated_at: updatedAt,
      },
      { onConflict: "user_id,namespace" },
    );
    if (error) throw error;
    res.json({ ok: true, namespace, version, updatedAt });
  } catch (err) {
    serverError(res, err);
  }
});

router.delete("/:namespace", requireAuth, async (req: Request, res: Response) => {
  try {
    const { namespace } = req.params;
    if (!validNamespace(namespace)) {
      res.status(400).json({ error: "Invalid namespace" });
      return;
    }
    const user = (req as AuthedRequest).user;
    const { error } = await supabaseAdmin
      .from(TABLE)
      .delete()
      .eq("user_id", user.id)
      .eq("namespace", namespace);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    serverError(res, err);
  }
});

export default router;
