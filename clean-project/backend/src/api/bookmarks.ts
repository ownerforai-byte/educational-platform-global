import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth, type AuthedRequest } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const folder = typeof req.query.folder === "string" ? req.query.folder : undefined;

    let query = supabaseAdmin
      .from("bookmarks")
      .select("id, resource_id, folder, notes, created_at, resources(title, type, topic_id)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (folder) {
      query = query.eq("folder", folder);
    }

    const { data, error } = await query;

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data ?? []);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const body = req.body && typeof req.body === "object" ? req.body : {};

    // Strict allowlist: service-role key means RLS is inert, so never let
    // client-supplied keys (user_id, id, timestamps, ...) reach the insert.
    // Only resource_id, folder, notes are accepted.

    const resource_id =
      typeof body.resource_id === "string" ? body.resource_id.trim() : "";
    if (!resource_id) {
      res.status(400).json({ error: "resource_id is required" });
      return;
    }

    const values: Record<string, string | null> = { resource_id };
    for (const field of ["folder", "notes"] as const) {
      const raw = body[field];
      if (raw === undefined || raw === null) {
        values[field] = null;
      } else if (typeof raw === "string") {
        values[field] = raw.slice(0, field === "folder" ? 100 : 2000);
      } else {
        res
          .status(400)
          .json({ error: `Invalid ${field}: must be a string` });
        return;
      }
    }

    // Idempotent duplicate handling like the original: ignoreDuplicates means
    // an existing (user_id, resource_id) row is left untouched (its folder /
    // notes are NOT overwritten) and PostgREST returns no row for it.
    const { data, error } = await supabaseAdmin
      .from("bookmarks")
      .upsert(
        {
          user_id: user.id,
          ...values,
        },
        { onConflict: "user_id,resource_id", ignoreDuplicates: true }
      )
      .select("id, resource_id, folder, notes, created_at");

    if (error) {
      console.error("bookmarks upsert failed:", error.message);
      res.status(500).json({ error: "Bookmark failed" });
      return;
    }

    const row = Array.isArray(data) ? data[0] : data;
    if (!row) {
      // Conflict with an existing bookmark: treat as success without mutating.
      res.status(200).json({ ok: true });
      return;
    }

    res.status(201).json(row);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from("bookmarks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
