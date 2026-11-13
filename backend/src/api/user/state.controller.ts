import { Router, Request, Response } from "express";
import { requireAuth, type AuthedRequest } from "../../middleware/auth";
import { supabaseAdmin } from "../../db/supabase";
import { serverError } from "../../middleware/error-handler";

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

/** Postgres unique-violation (23505) — how a lost insert race surfaces. */
function isUniqueViolation(err: unknown): boolean {
  const e = err as { code?: string; message?: string } | null;
  return e?.code === "23505" || /duplicate key value/i.test(e?.message ?? "");
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
    const updatedAt = new Date().toISOString();

    if (baseVersion !== undefined) {
      // Atomic optimistic concurrency: the write only lands if the stored
      // version is STILL baseVersion. A check-then-upsert here would be a
      // TOCTOU race — two devices sending the same baseVersion would both
      // pass the read, both upsert, and the second would silently clobber
      // the first. The conditional update makes them mutually exclusive:
      // exactly one matches a row; the loser sees zero rows and gets 409.
      const version = baseVersion + 1;
      const { data: updated, error } = await supabaseAdmin
        .from(TABLE)
        .update({ payload: body.payload, version, updated_at: updatedAt })
        .eq("user_id", user.id)
        .eq("namespace", namespace)
        .eq("version", baseVersion)
        .select("version, updated_at");
      if (error) throw error;
      if (updated && updated.length > 0) {
        res.json({ ok: true, namespace, version, updatedAt });
        return;
      }

      // No row matched: either this is the first write (version 0 = absent)
      // or the row moved on. First writes race on the (user_id, namespace)
      // primary key — the losing insert fails with 23505 and is reported
      // as the same 409 conflict instead of a 500.
      let current = await readRow(user.id, namespace);
      if (!current && baseVersion === 0) {
        const { error: insertError } = await supabaseAdmin.from(TABLE).insert({
          user_id: user.id,
          namespace,
          payload: body.payload,
          version,
          updated_at: updatedAt,
        });
        if (!insertError) {
          res.json({ ok: true, namespace, version, updatedAt });
          return;
        }
        if (!isUniqueViolation(insertError)) throw insertError;
        // A concurrent first write won between our read and our insert —
        // re-read so the 409 reports the row that actually exists now,
        // not the absence we saw before.
        current = await readRow(user.id, namespace);
      }

      res.status(409).json({
        error: "version_conflict",
        current: {
          payload: current?.payload ?? null,
          version: current?.version ?? 0,
          updatedAt: current?.updated_at ?? null,
        },
      });
      return;
    }

    // No baseVersion: explicit last-write-wins overwrite.
    const current = await readRow(user.id, namespace);
    const version = (current?.version ?? 0) + 1;
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
