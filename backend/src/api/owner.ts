import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth, isOwnerEmail, type AuthedRequest } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";
import { authEmailsById } from "../utils/authEmails";

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

const accessStatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "ACTIVE", "REJECTED"]),
});

const bulkCreditsSchema = z.object({
  grants: z
    .array(
      z.object({
        email: z.string().trim().toLowerCase().email().max(255),
        amount: z.number().int().min(-999999).max(999999),
      })
    )
    .min(1)
    .max(500),
  reason: z.string().max(200).optional(),
});

const everyoneCreditsSchema = z.object({
  amount: z.number().int().min(-999999).max(999999),
  reason: z.string().max(200).optional(),
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
 * Full user list with Gmails, credits, roles, premium state and access status.
 *
 * Emails come from GoTrue (auth.users) via authEmailsById() — `profiles`
 * has no email column, and selecting one made this route 500 outright
 * (found 2026-09-26). Search filters the merged rows.
 */
router.get("/users", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select(
        "id, full_name, role, credits, credits_limit, premium_status, premium_approved_at, access_status, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error("[owner] users failed:", error.message);
      res.status(500).json({ error: "Failed to fetch users" });
      return;
    }

    const emails = await authEmailsById();
    let rows = (data ?? []).map((p: Record<string, unknown>) => ({
      ...p,
      email: emails.get(String(p.id)) ?? "",
    }));

    if (q) {
      const needle = q.toLowerCase();
      rows = rows.filter(
        (r: { email?: string; full_name?: string | null }) =>
          (r.email ?? "").includes(needle) ||
          (r.full_name ?? "").toLowerCase().includes(needle),
      );
    }

    res.json(rows);
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

    // Merge the Gmail (resolved from GoTrue — profiles stores no email).
    const emails = await authEmailsById();
    const email = emails.get(String(profile.id)) ?? "";

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
      profile: { ...profile, email },
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

/** PATCH /api/owner/users/:id/status — grant or remove platform access.
 *
 * ACTIVE  → the account may sign in (approval granted)
 * PENDING → created but not yet approved (login blocked)
 * REJECTED→ explicitly refused (login blocked, status screen reports it)
 */
router.patch("/users/:id/status", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = accessStatusUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid access status" });
    return;
  }

  try {
    const { data: target } = await supabaseAdmin
      .from("profiles")
      .select("id, access_status")
      .eq("id", req.params.id)
      .maybeSingle();

    if (!target) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ access_status: parsed.data.status })
      .eq("id", req.params.id);

    if (error) {
      console.error("[owner] access status update failed:", error.message);
      res.status(500).json({ error: "Failed to update access status" });
      return;
    }

    console.info(
      `[owner] access ${target.access_status ?? "?"} -> ${parsed.data.status} for ${req.params.id} by ${owner.user.email}`,
    );
    res.json({ success: true, userId: req.params.id, status: parsed.data.status });
  } catch (err: any) {
    console.error("[owner] access status error:", err?.message ?? err);
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
 * POST /api/owner/credits/bulk
 * Divide credits across individual Gmails in one call — the body carries
 * explicit per-email amounts: { grants: [{ email, amount }, …], reason? }.
 * Emails are resolved case-insensitively; unknown emails are reported back
 * (never silently dropped), and known ones are updated atomically-enough
 * (profile update + audit row per user).
 */
router.post("/credits/bulk", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = bulkCreditsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }
  const { grants, reason } = parsed.data;

  try {
    const emails = Array.from(new Set(grants.map((g) => g.email)));
    const { data: profiles, error } = await supabaseAdmin
      .from("profiles")
      .select("id, email, credits")
      .in("email", emails);
    if (error) {
      console.error("[owner] bulk resolve failed:", error.message);
      res.status(500).json({ error: "Failed to resolve emails" });
      return;
    }

    const byEmail = new Map((profiles ?? []).map((p) => [p.email.toLowerCase(), p]));
    const notFound: string[] = [];
    const applied: Array<{ email: string; userId: string; newCredits: number }> = [];

    // Collapse duplicate emails (last write wins) so one profile is updated once.
    const byUser = new Map<string, { email: string; delta: number }>();
    for (const g of grants) {
      const p = byEmail.get(g.email);
      if (!p) {
        if (!notFound.includes(g.email)) notFound.push(g.email);
        continue;
      }
      const prev = byUser.get(p.id);
      byUser.set(p.id, { email: p.email, delta: (prev?.delta ?? 0) + g.amount });
    }

    for (const [userId, { email, delta }] of byUser) {
      const current = byEmail.get(email.toLowerCase())?.credits ?? 0;
      const newCredits = Math.max(0, current + delta);
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({ credits: newCredits })
        .eq("id", userId);
      if (updateError) {
        console.error("[owner] bulk update failed:", updateError.message);
        continue;
      }
      await supabaseAdmin.from("credit_transactions").insert({
        user_id: userId,
        actor_id: owner.user.id,
        amount: delta,
        type: delta >= 0 ? "GRANT" : "ADJUST",
        reason: reason ?? `Owner bulk division by ${owner.user.email}`,
      });
      applied.push({ email, userId, newCredits });
    }

    res.json({ applied, notFound, requested: grants.length });
  } catch (err: any) {
    console.error("[owner] bulk credits error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/owner/credits/everyone — grant the same amount to every profile.
 */
router.post("/credits/everyone", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = everyoneCreditsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }
  const { amount, reason } = parsed.data;

  try {
    const { data: profiles, error } = await supabaseAdmin
      .from("profiles")
      .select("id, credits");
    if (error) {
      console.error("[owner] everyone resolve failed:", error.message);
      res.status(500).json({ error: "Failed to list users" });
      return;
    }

    let applied = 0;
    for (const p of profiles ?? []) {
      const newCredits = Math.max(0, (p.credits ?? 0) + amount);
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({ credits: newCredits })
        .eq("id", p.id);
      if (updateError) continue;
      await supabaseAdmin.from("credit_transactions").insert({
        user_id: p.id,
        actor_id: owner.user.id,
        amount,
        type: amount >= 0 ? "GRANT" : "ADJUST",
        reason: reason ?? `Owner grant to everyone by ${owner.user.email}`,
      });
      applied++;
    }

    res.json({ applied, total: (profiles ?? []).length, amount });
  } catch (err: any) {
    console.error("[owner] everyone credits error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/owner/users/:id/chats?session=&limit=
 * Tracking: read any user's AI chat history (grouped sessions + messages).
 * Owner-gated like every other route here.
 */
router.get("/users/:id/chats", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const session = typeof req.query.session === "string" ? req.query.session.slice(0, 64) : null;
    const limitRaw = Number(req.query.limit);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.trunc(limitRaw), 1), 500) : 200;

    const { data: sessionsRaw, error: sessionsError } = await supabaseAdmin
      .from("chat_messages")
      .select("session, role, content, created_at")
      .eq("user_id", req.params.id)
      .order("created_at", { ascending: false })
      .limit(500);

    if (sessionsError) {
      const msg = (sessionsError.message ?? "").toLowerCase();
      if (msg.includes("could not find the table") || msg.includes("does not exist") || msg.includes("schema cache")) {
        res.json({ sessions: [], messages: [], migrated: false });
        return;
      }
      console.error("[owner] chats failed:", sessionsError.message);
      res.status(500).json({ error: "Failed to fetch chat history" });
      return;
    }

    const sessions = new Map<string, { session: string; messages: number; lastMessageAt: string; preview: string }>();
    for (const row of sessionsRaw ?? []) {
      const s = row.session || "default";
      const entry = sessions.get(s) ?? { session: s, messages: 0, lastMessageAt: row.created_at, preview: "" };
      entry.messages += 1;
      if (!entry.preview && row.role === "user") entry.preview = row.content.slice(0, 120);
      sessions.set(s, entry);
    }

    let messages: unknown[] = [];
    if (session) {
      const { data } = await supabaseAdmin
        .from("chat_messages")
        .select("id, session, role, content, created_at")
        .eq("user_id", req.params.id)
        .eq("session", session)
        .order("created_at", { ascending: false })
        .limit(limit);
      messages = (data ?? []).slice().reverse();
    }

    res.json({
      sessions: Array.from(sessions.values()),
      messages,
      migrated: true,
    });
  } catch (err: any) {
    console.error("[owner] chats error:", err?.message ?? err);
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
      .select("id, user_id, status, message, reviewed_by, reviewed_at, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[owner] premium-requests failed:", error.message);
      res.status(500).json({ error: "Failed to fetch premium requests" });
      return;
    }

    const rows = data ?? [];
    if (rows.length === 0) {
      res.json([]);
      return;
    }

    // `premium_requests.user_id` FKs to auth.users (not profiles), so a
    // PostgREST profiles(...) embed is impossible — and profiles has no email
    // column either. Resolve both server-side like GET /users does.
    const userIds = [...new Set(rows.map((r) => r.user_id).filter(Boolean))];
    const [{ data: profileRows }, emails] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("id, full_name, role, credits")
        .in("id", userIds),
      authEmailsById(),
    ]);

    const byId = new Map((profileRows ?? []).map((p) => [p.id, p]));
    const shaped = rows.map((r) => ({
      ...r,
      profiles: (() => {
        const p = byId.get(r.user_id);
        return p
          ? { ...p, email: emails.get(r.user_id) ?? null }
          : null;
      })(),
    }));

    res.json(shaped);
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
      .select("key, value, updated_by")
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
