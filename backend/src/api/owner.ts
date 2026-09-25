import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth, isOwnerEmail, type AuthedRequest } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";

/**
 * Owner-only router — mounted at /api/owner.
 *
 * Every route requires BOTH:
 *   1. A valid authenticated session (requireAuth).
 *   2. The session email to be on the backend OWNER_EMAILS allowlist.
 * Role alone is NOT enough: a profile with role "OWNER" whose email is not
 * allowlisted is rejected here. This is the strictest gate in the platform.
 */
const router = Router();

// ── Gate ────────────────────────────────────────────────────────────────────

function ownerGate(req: Request, res: Response): AuthedRequest | null {
  const user = (req as AuthedRequest).user;
  if (!user || !isOwnerEmail(user.email)) {
    res.status(403).json({ error: "Forbidden — owner emails only" });
    return null;
  }
  return req as AuthedRequest;
}

// ── Schemas ─────────────────────────────────────────────────────────────────

const creditAdjustSchema = z.object({
  amount: z.number().int().min(-999999).max(999999),
  reason: z.string().max(200).optional(),
});

const roleUpdateSchema = z.object({
  role: z.enum(["STUDENT", "TEACHER", "ADMIN", "OWNER"]),
});

const premiumUpdateSchema = z.object({
  premiumStatus: z.boolean(),
});

const settingsSchema = z.object({
  settings: z
    .array(
      z.object({
        key: z.string().min(1).max(100),
        value: z.unknown(),
      })
    )
    .min(1)
    .max(100),
});

// ── Overview ────────────────────────────────────────────────────────────────

/**
 * GET /api/owner/overview
 * Everything the console landing page needs in one round-trip.
 */
router.get("/overview", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const [
      usersRes,
      premiumUsersRes,
      pendingReqRes,
      grantsRes,
      spendsRes,
      levelsRes,
      classesRes,
      subjectsRes,
      chaptersRes,
      topicsRes,
      resourcesRes,
      recentTxRes,
      recentUsersRes,
    ] = await Promise.all([
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }).eq("premium_status", true),
      supabaseAdmin.from("premium_requests").select("id", { count: "exact", head: true }).eq("status", "PENDING"),
      supabaseAdmin.from("credit_transactions").select("amount", { count: "exact", head: true }).eq("type", "GRANT"),
      supabaseAdmin.from("credit_transactions").select("amount", { count: "exact", head: true }).eq("type", "SPEND"),
      supabaseAdmin.from("education_levels").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("classes").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("subjects").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("chapters").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("topics").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("resources").select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("credit_transactions")
        .select("id, user_id, actor_id, amount, type, reason, created_at")
        .order("created_at", { ascending: false })
        .limit(12),
      supabaseAdmin
        .from("profiles")
        .select("id, full_name, email, role, credits, premium_status, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

    // Resolve emails for actor_ids on recent transactions.
    const actorIds = Array.from(
      new Set((recentTxRes.data ?? []).map((t: any) => t.actor_id).filter(Boolean))
    ) as string[];
    const actorMap = new Map<string, string>();
    if (actorIds.length > 0) {
      const { data: actors } = await supabaseAdmin
        .from("profiles")
        .select("id, email")
        .in("id", actorIds);
      for (const a of actors ?? []) actorMap.set(a.id, a.email);
    }

    res.json({
      stats: {
        totalUsers: usersRes.count ?? 0,
        premiumUsers: premiumUsersRes.count ?? 0,
        pendingPremiumRequests: pendingReqRes.count ?? 0,
        totalCreditsGranted: grantsRes.count ?? 0,
        totalCreditsSpent: spendsRes.count ?? 0,
        content: {
          levels: levelsRes.count ?? 0,
          classes: classesRes.count ?? 0,
          subjects: subjectsRes.count ?? 0,
          chapters: chaptersRes.count ?? 0,
          topics: topicsRes.count ?? 0,
          resources: resourcesRes.count ?? 0,
        },
      },
      recentTransactions: (recentTxRes.data ?? []).map((t: any) => ({
        ...t,
        actorEmail: actorMap.get(t.actor_id) ?? null,
      })),
      recentUsers: recentUsersRes.data ?? [],
    });
  } catch (err: any) {
    console.error("[owner] overview failed:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Users ───────────────────────────────────────────────────────────────────

/**
 * GET /api/owner/users?q=<search>
 * Full user list with credits, roles, premium state and pending request counts.
 */
router.get("/users", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    let query = supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, role, credits, credits_limit, premium_status, premium_approved_at, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (q) {
      // Escape % and _ so callers can't inject wildcards.
      const safe = q.replace(/[%_\\]/g, "\\$&");
      query = query.or(`email.ilike.%${safe}%,full_name.ilike.%${safe}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("[owner] users failed:", error.message);
      res.status(500).json({ error: "Failed to fetch users" });
      return;
    }

    res.json(data ?? []);
  } catch (err: any) {
    console.error("[owner] users error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/owner/users/:id
 * Deep detail: profile + credit history + premium request history.
 */
router.get("/users/:id", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle();

    if (error || !profile) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const [txRes, reqRes] = await Promise.all([
      supabaseAdmin
        .from("credit_transactions")
        .select("*")
        .eq("user_id", req.params.id)
        .order("created_at", { ascending: false })
        .limit(50),
      supabaseAdmin
        .from("premium_requests")
        .select("*")
        .eq("user_id", req.params.id)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    res.json({
      profile,
      creditHistory: txRes.data ?? [],
      premiumRequests: reqRes.data ?? [],
    });
  } catch (err: any) {
    console.error("[owner] user detail error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** PATCH /api/owner/users/:id/credits — adjust credits (signed amount). */
router.patch("/users/:id/credits", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = creditAdjustSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }
  const { amount, reason } = parsed.data;

  try {
    const { data: target } = await supabaseAdmin
      .from("profiles")
      .select("id, credits")
      .eq("id", req.params.id)
      .maybeSingle();

    if (!target) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const newCredits = Math.max(0, (target.credits ?? 0) + amount);

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", req.params.id);

    if (updateError) {
      console.error("[owner] credits update failed:", updateError.message);
      res.status(500).json({ error: "Failed to update credits" });
      return;
    }

    await supabaseAdmin.from("credit_transactions").insert({
      user_id: req.params.id,
      actor_id: owner.user.id,
      amount,
      type: amount >= 0 ? "GRANT" : "ADJUST",
      reason: reason ?? `Owner adjustment by ${owner.user.email}`,
    });

    res.json({ success: true, userId: req.params.id, newCredits });
  } catch (err: any) {
    console.error("[owner] credits error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** PATCH /api/owner/users/:id/role — set platform role. */
router.patch("/users/:id/role", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = roleUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid role" });
    return;
  }

  try {
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ role: parsed.data.role })
      .eq("id", req.params.id);

    if (error) {
      console.error("[owner] role update failed:", error.message);
      res.status(500).json({ error: "Failed to update role" });
      return;
    }

    res.json({ success: true, userId: req.params.id, newRole: parsed.data.role });
  } catch (err: any) {
    console.error("[owner] role error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** PATCH /api/owner/users/:id/premium — grant or revoke premium directly. */
router.patch("/users/:id/premium", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = premiumUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  try {
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        premium_status: parsed.data.premiumStatus,
        premium_approved_at: parsed.data.premiumStatus ? new Date().toISOString() : null,
      })
      .eq("id", req.params.id);

    if (error) {
      console.error("[owner] premium update failed:", error.message);
      res.status(500).json({ error: "Failed to update premium status" });
      return;
    }

    res.json({ success: true, userId: req.params.id, premiumStatus: parsed.data.premiumStatus });
  } catch (err: any) {
    console.error("[owner] premium error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * DELETE /api/owner/users/:id
 * Permanently remove a user from Supabase Auth and delete their profile row.
 * Owners cannot delete themselves.
 */
router.delete("/users/:id", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  if (req.params.id === owner.user.id) {
    res.status(400).json({ error: "You cannot delete your own account" });
    return;
  }

  try {
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(req.params.id);
    if (authError) {
      console.error("[owner] auth delete failed:", authError.message);
      res.status(500).json({ error: "Failed to delete user account" });
      return;
    }

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", req.params.id);
    if (profileError) {
      console.error("[owner] profile delete failed:", profileError.message);
    }

    res.json({ success: true, userId: req.params.id });
  } catch (err: any) {
    console.error("[owner] delete error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Premium requests ────────────────────────────────────────────────────────

/** GET /api/owner/premium-requests — every request with user details. */
router.get("/premium-requests", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const { data, error } = await supabaseAdmin
      .from("premium_requests")
      .select(
        `id, user_id, status, message, reviewed_by, reviewed_at, created_at,
         profiles (id, full_name, email, role, credits)`
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[owner] premium-requests failed:", error.message);
      res.status(500).json({ error: "Failed to fetch premium requests" });
      return;
    }

    res.json(data ?? []);
  } catch (err: any) {
    console.error("[owner] premium-requests error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/premium-requests/:id/approve", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const { data: requestData } = await supabaseAdmin
      .from("premium_requests")
      .select("user_id, status")
      .eq("id", req.params.id)
      .maybeSingle();

    if (!requestData || requestData.status !== "PENDING") {
      res.status(404).json({ error: "Premium request not found or already processed" });
      return;
    }

    const { error: approveError } = await supabaseAdmin
      .from("premium_requests")
      .update({
        status: "APPROVED",
        reviewed_by: owner.user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", req.params.id);

    if (approveError) {
      console.error("[owner] approve failed:", approveError.message);
      res.status(500).json({ error: "Failed to approve premium request" });
      return;
    }

    const CREDIT_BONUS = 500;
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", requestData.user_id)
      .maybeSingle();

    const newCredits = (profile?.credits ?? 0) + CREDIT_BONUS;

    await supabaseAdmin
      .from("profiles")
      .update({
        premium_status: true,
        premium_approved_at: new Date().toISOString(),
        credits: newCredits,
      })
      .eq("id", requestData.user_id);

    await supabaseAdmin.from("credit_transactions").insert({
      user_id: requestData.user_id,
      actor_id: owner.user.id,
      amount: CREDIT_BONUS,
      type: "GRANT",
      reason: "Premium approval bonus",
      reference_id: req.params.id,
    });

    res.json({ success: true, userId: requestData.user_id, creditsGranted: CREDIT_BONUS });
  } catch (err: any) {
    console.error("[owner] approve error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/premium-requests/:id/reject", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const { error } = await supabaseAdmin
      .from("premium_requests")
      .update({
        status: "REJECTED",
        reviewed_by: owner.user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", req.params.id)
      .eq("status", "PENDING");

    if (error) {
      console.error("[owner] reject failed:", error.message);
      res.status(500).json({ error: "Failed to reject premium request" });
      return;
    }

    res.json({ success: true, requestId: req.params.id });
  } catch (err: any) {
    console.error("[owner] reject error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Platform settings ───────────────────────────────────────────────────────

/** GET /api/owner/settings — all platform settings rows. */
router.get("/settings", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("key, value, description, updated_by")
      .order("key", { ascending: true });

    if (error) {
      console.error("[owner] settings GET failed:", error.message);
      res.status(500).json({ error: "Failed to load settings" });
      return;
    }

    res.json({ settings: data ?? [] });
  } catch (err: any) {
    console.error("[owner] settings error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** PATCH /api/owner/settings — upsert one or many settings. */
router.patch("/settings", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = settingsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  try {
    const rows = parsed.data.settings.map((s) => ({
      key: s.key.trim(),
      value: s.value,
      updated_by: owner.user.id,
    }));

    const { data, error } = await supabaseAdmin
      .from("settings")
      .upsert(rows, { onConflict: "key" })
      .select("key, value");

    if (error) {
      console.error("[owner] settings PATCH failed:", error.message);
      res.status(500).json({ error: "Failed to update settings" });
      return;
    }

    res.json({ settings: data ?? [] });
  } catch (err: any) {
    console.error("[owner] settings patch error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Activity / audit ────────────────────────────────────────────────────────

/**
 * GET /api/owner/activity
 * Recent credit transactions across the platform — the owner's audit trail of
 * every admin/owner credit action and spend.
 */
router.get("/activity", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const { data, error } = await supabaseAdmin
      .from("credit_transactions")
      .select("id, user_id, actor_id, amount, type, reason, reference_id, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("[owner] activity failed:", error.message);
      res.status(500).json({ error: "Failed to fetch activity" });
      return;
    }

    const userIds = Array.from(
      new Set((data ?? []).flatMap((t: any) => [t.user_id, t.actor_id]).filter(Boolean))
    ) as string[];
    const emailMap = new Map<string, string>();
    if (userIds.length > 0) {
      const { data: profiles } = await supabaseAdmin
        .from("profiles")
        .select("id, email")
        .in("id", userIds);
      for (const p of profiles ?? []) emailMap.set(p.id, p.email);
    }

    res.json(
      (data ?? []).map((t: any) => ({
        ...t,
        userEmail: emailMap.get(t.user_id) ?? null,
        actorEmail: emailMap.get(t.actor_id) ?? null,
      }))
    );
  } catch (err: any) {
    console.error("[owner] activity error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
