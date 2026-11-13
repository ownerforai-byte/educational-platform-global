import { Router, Request, Response } from "express";
import { z } from "zod";
import {
  requireAuth,
  isOwnerEmail,
  isOwnerAccount,
  type AuthedRequest,
} from "../../middleware/auth";
import { supabaseAdmin } from "../../db/supabase";
import { invalidateSectionTierCache } from "../../utils/sectionTiers";
import { authEmailsById, invalidateAuthEmailsCache } from "../../utils/authEmails";
import { aiSparkLimitFor, aiSparkTierFor } from "../../utils/aiSpark";
import { sendApprovalEmail } from "../../utils/mailer";
import { cancelOpenAccessRequests } from "../../services/access-requests";

/**
 * Owner-only router — mounted at /api/owner.
 *
 * Every route requires BOTH:
 *   1. A valid authenticated session (requireAuth).
 *   2. An owner account: root email (sahrocky81@gmail.com) OR a live
 *      `role: "owner"` grant assigned from the console.
 *
 * Member/Plus/Pro access is live (`access_status`). The configured operator account can
 * assign owner to another Gmail; that address then works as owner. The root
 * email itself cannot be re-tiered, revoked, or deleted.
 */
const router = Router();

// ── Gate ────────────────────────────────────────────────────────────────────

function ownerGate(req: Request, res: Response): AuthedRequest | null {
  const user = (req as AuthedRequest).user;
  if (!isOwnerAccount(user)) {
    res.status(403).json({ error: "Forbidden — owner accounts only" });
    return null;
  }
  return req as AuthedRequest;
}

async function resolveTargetEmail(userId: string): Promise<string | null> {
  const emails = await authEmailsById();
  return emails.get(userId) ?? null;
}

/** Configured operator account is fixed — assigned owners cannot replace or strip it. */
function refuseRootOwnerEmailTarget(res: Response, email: string | null): boolean {
  if (email && isOwnerEmail(email)) {
    res.status(403).json({
      error: "The configured operator account cannot be re-tiered, revoked, or deleted",
    });
    return true;
  }
  return false;
}

// ── Schemas ─────────────────────────────────────────────────────────────────

const creditAdjustSchema = z.object({
  amount: z.number().int().min(-999999).max(999999),
  reason: z.string().max(200).optional(),
});

/** Tiers the console may grant — including assigning owner to another email. */
const roleUpdateSchema = z.object({
  role: z.enum(["member", "plus", "pro", "owner"]),
});

type GrantTier = z.infer<typeof roleUpdateSchema>["role"];

/**
 * One authoritative tier grant. The role IS the access rung, so granting it
 * writes role + plan + premium_status together — the three inputs the spark
 * resolver folds into one effective tier can never diverge again. plan is
 * written too because the resolver reads it before the Member base: a leftover
 * plus_20/pro plan row would silently override a Member/Plus grant.
 */
const TIER_GRANT: Record<GrantTier, { role: GrantTier; plan: string; premium_status: boolean }> = {
  member: { role: "member", plan: "member", premium_status: false },
  plus: { role: "plus", plan: "plus", premium_status: false },
  pro: { role: "pro", plan: "pro", premium_status: true },
  owner: { role: "owner", plan: "pro", premium_status: true },
};

/** Tier granted with an approval (owner included — assign another operator). */
const approvableRoleSchema = z.enum(["member", "plus", "pro", "owner"]);

const accessStatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "ACTIVE", "REJECTED"]),
  /** Granted AT THE SAME TIME as access — never a second pass (owner 2026-11-07). */
  role: approvableRoleSchema.optional(),
});

const bulkAccessStatusSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1).max(100),
  status: z.enum(["ACTIVE", "REJECTED"]),
  /** Granted to every approved account in the same call. */
  role: approvableRoleSchema.optional(),
});

type ApprovableTier = z.infer<typeof approvableRoleSchema>;

/**
 * ONE write per access decision. Approving used to write access_status alone,
 * leaving the account on the Member base until a reviewer found it again in
 * the Approved list and set the tier — two passes over the same person, and
 * the usual way an account ended up on the wrong rung. The tier now lands in
 * the same update, using the identical role + plan + premium grant, so status
 * and tier can never disagree.
 */
function accessDecisionPayload(
  status: "PENDING" | "ACTIVE" | "REJECTED",
  role?: ApprovableTier,
): Record<string, unknown> {
  if (status !== "ACTIVE" || !role) return { access_status: status };
  const grant = TIER_GRANT[role];
  return {
    access_status: status,
    role: grant.role,
    plan: grant.plan,
    premium_status: grant.premium_status,
    premium_approved_at: grant.premium_status ? new Date().toISOString() : null,
  };
}

const bulkTierUpdateSchema = z.object({
  userIds: z
    .array(z.string().uuid())
    .min(1)
    .max(100)
    .refine((ids) => new Set(ids).size === ids.length, "User IDs must be unique"),
  role: z.enum(["member", "plus", "pro", "owner"]),
});

/** Payload when wiping live access back to “awaiting owner approval”. */
const REVOKE_PAYLOAD = {
  access_status: "REJECTED",
  role: "member",
  plan: "member",
  premium_status: false,
  premium_approved_at: null,
} as const;

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
        "id, full_name, role, plan, credits, credits_limit, premium_status, premium_approved_at, access_status, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error("[owner] users failed:", error.message);
      res.status(500).json({ error: "Failed to fetch users" });
      return;
    }

    const emails = await authEmailsById();
    let rows = (data ?? []).map((p: Record<string, unknown>) => {
      const email = emails.get(String(p.id)) ?? "";
      const plan = (p.plan as string | null) ?? null;
      // Live rung + spark limit — same resolver Veer uses (not a hardcoded UI map).
      const effectiveTier = aiSparkTierFor({
        email,
        role: p.role as string | null,
        plan,
        premiumStatus: p.premium_status as boolean | null,
      });
      return {
        ...p,
        email,
        plan,
        effectiveTier,
        sparkLimit: aiSparkLimitFor(effectiveTier),
      };
    });

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
 * POST /api/owner/users/revoke-all
 * Live wipe: REJECT every ACTIVE (and demote every non-owner-email) profile
 * except sahrocky81@gmail.com. Pending signups stay pending.
 */
router.post("/users/revoke-all", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, role, access_status, premium_status")
      .limit(5000);

    if (error) {
      console.error("[owner] revoke-all list failed:", error.message);
      res.status(500).json({ error: "Failed to list profiles" });
      return;
    }

    const emails = await authEmailsById();
    const applied: string[] = [];
    const skipped: Array<{ userId: string; reason: string }> = [];

    for (const row of data ?? []) {
      const userId = String(row.id);
      const email = emails.get(userId) ?? null;
      if (email && isOwnerEmail(email)) {
        skipped.push({ userId, reason: "Owner email — kept" });
        // Ensure the owner row stays ACTIVE + owner rung in the live DB.
        await supabaseAdmin
          .from("profiles")
          .update({
            access_status: "ACTIVE",
            role: "owner",
            plan: "pro",
            premium_status: true,
          })
          .eq("id", userId);
        continue;
      }

      const access = (row.access_status as string | null) ?? "PENDING";
      const role = typeof row.role === "string" ? row.role.toLowerCase() : "member";
      const needsRevoke =
        access === "ACTIVE" ||
        role === "owner" ||
        role === "plus" ||
        role === "pro" ||
        row.premium_status === true;

      if (!needsRevoke) {
        skipped.push({ userId, reason: "Already pending/rejected member" });
        continue;
      }

      const { error: updErr } = await supabaseAdmin
        .from("profiles")
        .update(REVOKE_PAYLOAD)
        .eq("id", userId);

      if (updErr) {
        skipped.push({ userId, reason: "Update failed" });
        continue;
      }
      applied.push(userId);
    }

    console.info(
      `[owner] revoke-all by ${owner.user.email}: revoked ${applied.length}, skipped ${skipped.length}`,
    );

    res.json({
      success: true,
      revoked: applied.length,
      applied,
      skipped,
    });
  } catch (err: any) {
    console.error("[owner] revoke-all error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/owner/users/bulk-status
 * Approve or revoke access for up to 100 accounts in one call.
 */
router.post("/users/bulk-status", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = bulkAccessStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const { userIds, status, role } = parsed.data;
  const decision = accessDecisionPayload(status, role);
  const applied: string[] = [];
  const skipped: Array<{ userId: string; reason: string }> = [];

  try {
    const emails = await authEmailsById();
    for (const userId of userIds) {
      const email = emails.get(userId) ?? null;
      if (email && isOwnerEmail(email)) {
        skipped.push({ userId, reason: "Owner email protected" });
        continue;
      }

      const { data: target } = await supabaseAdmin
        .from("profiles")
        .select("id, access_status")
        .eq("id", userId)
        .maybeSingle();

      if (!target) {
        skipped.push({ userId, reason: "User not found" });
        continue;
      }

      const { error } = await supabaseAdmin
        .from("profiles")
        .update(decision)
        .eq("id", userId);

      if (error) {
        skipped.push({ userId, reason: "Update failed" });
        continue;
      }

      applied.push(userId);

      if (status === "ACTIVE" && target.access_status !== "ACTIVE") {
        void cancelOpenAccessRequests(userId);
        void (async () => {
          try {
            const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(userId);
            const email = authUser?.user?.email;
            if (!email) return;
            const meta = authUser?.user?.user_metadata as { full_name?: string } | undefined;
            await sendApprovalEmail(email, meta?.full_name ?? null);
          } catch {
            /* fire-and-forget */
          }
        })();
      }
    }

    res.json({
      success: true,
      status,
      role: status === "ACTIVE" ? (role ?? null) : null,
      applied,
      skipped,
      requested: userIds.length,
    });
  } catch (err: any) {
    console.error("[owner] bulk access error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/owner/users/bulk-tier
 * Apply one non-owner access tier to up to 100 accounts. Owner targets are
 * verified individually and skipped, even if the caller submits their IDs.
 */
router.post("/users/bulk-tier", requireAuth, async (req: Request, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = bulkTierUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const { userIds, role } = parsed.data;
  const grant = TIER_GRANT[role];
  const approvedAt = grant.premium_status ? new Date().toISOString() : null;
  const applied: string[] = [];
  const skipped: Array<{ userId: string; reason: string }> = [];

  try {
    const emails = await authEmailsById();
    for (const userId of userIds) {
      const email = emails.get(userId) ?? null;
      if (email && isOwnerEmail(email)) {
        skipped.push({ userId, reason: "Owner email protected" });
        continue;
      }

      const { data, error } = await supabaseAdmin
        .from("profiles")
        .update({
          ...grant,
          premium_approved_at: approvedAt,
        })
        .eq("id", userId)
        .select("id")
        .maybeSingle();

      if (error) {
        skipped.push({ userId, reason: "Update failed" });
        continue;
      }
      if (!data) {
        skipped.push({ userId, reason: "User not found" });
        continue;
      }

      applied.push(userId);
    }

    res.json({ success: true, role, applied, skipped, requested: userIds.length });
  } catch (err: any) {
    console.error("[owner] bulk tier update error:", err?.message ?? err);
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

    const effectiveTier = aiSparkTierFor({
      email,
      role: profile.role,
      plan: profile.plan,
      premiumStatus: profile.premium_status,
    });
    res.json({
      profile: {
        ...profile,
        email,
        plan: profile.plan ?? null,
        effectiveTier,
        sparkLimit: aiSparkLimitFor(effectiveTier),
      },
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
router.patch("/users/:id/status", requireAuth, async (req: Request<{ id: string }>, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = accessStatusUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid access status" });
    return;
  }

  const { status, role } = parsed.data;

  try {
    const targetEmail = await resolveTargetEmail(req.params.id);
    if (refuseRootOwnerEmailTarget(res, targetEmail)) return;

    const { data: target } = await supabaseAdmin
      .from("profiles")
      .select("id, access_status")
      .eq("id", req.params.id)
      .maybeSingle();

    if (!target) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Approval + tier in one write (see accessDecisionPayload).
    const { error } = await supabaseAdmin
      .from("profiles")
      .update(accessDecisionPayload(status, role))
      .eq("id", req.params.id);

    if (error) {
      console.error("[owner] access status update failed:", error.message);
      res.status(500).json({ error: "Failed to update access status" });
      return;
    }

    console.info(
      `[owner] access ${target.access_status ?? "?"} -> ${status}${
        status === "ACTIVE" && role ? ` at ${role}` : ""
      } for ${req.params.id} by ${owner.user.email}`,
    );

    // Auto-approval email (owner policy 2026-09-28): the moment an account
    // becomes ACTIVE the user is told they can sign in. Fire-and-forget —
    // email must never slow down or fail the approval itself.
    if (status === "ACTIVE" && target.access_status !== "ACTIVE") {
      void cancelOpenAccessRequests(req.params.id);
      void (async () => {
        try {
          const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(
            req.params.id,
          );
          const email = authUser?.user?.email;
          if (!email) return;
          const meta = authUser?.user?.user_metadata as
            | { full_name?: string }
            | undefined;
          const result = await sendApprovalEmail(email, meta?.full_name ?? null);
          if (result.sent) {
            console.info(`[owner] approval email sent to ${email}`);
          } else {
            console.warn(
              `[owner] approval email not sent (${
                result.skipped ? "no mail provider configured" : result.error
              })`,
            );
          }
        } catch (err) {
          console.warn(
            "[owner] approval email failed:",
            err instanceof Error ? err.message : err,
          );
        }
      })();
    }

    res.json({
      success: true,
      userId: req.params.id,
      status,
      effectiveTier: status === "ACTIVE" && role ? role : undefined,
    });
  } catch (err: any) {
    console.error("[owner] access status error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** PATCH /api/owner/users/:id/role — grant an access tier (role + plan + premium together). */
router.patch("/users/:id/role", requireAuth, async (req: Request<{ id: string }>, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  const parsed = roleUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid role" });
    return;
  }

  try {
    const targetEmail = await resolveTargetEmail(req.params.id);
    if (refuseRootOwnerEmailTarget(res, targetEmail)) return;

    const grant = TIER_GRANT[parsed.data.role];
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        ...grant,
        premium_approved_at: grant.premium_status ? new Date().toISOString() : null,
      })
      .eq("id", req.params.id);

    if (error) {
      console.error("[owner] tier grant failed:", error.message);
      res.status(500).json({ error: "Failed to update tier" });
      return;
    }

    const effectiveTier = aiSparkTierFor({
      email: targetEmail,
      role: grant.role,
      plan: grant.plan,
      premiumStatus: grant.premium_status,
    });
    res.json({
      success: true,
      userId: req.params.id,
      newRole: grant.role,
      plan: grant.plan,
      effectiveTier,
      sparkLimit: aiSparkLimitFor(effectiveTier),
    });
  } catch (err: any) {
    console.error("[owner] tier grant error:", err?.message ?? err);
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
router.delete("/users/:id", requireAuth, async (req: Request<{ id: string }>, res: Response) => {
  const owner = ownerGate(req, res);
  if (!owner) return;

  if (req.params.id === owner.user.id) {
    res.status(400).json({ error: "You cannot delete your own account" });
    return;
  }

  try {
    const targetEmail = await resolveTargetEmail(req.params.id);
    if (refuseRootOwnerEmailTarget(res, targetEmail)) return;

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

    invalidateAuthEmailsCache();
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

    // Approval is a Pro grant: write role + plan + premium together so the
    // directory's effective tier matches.
    const tierFields = { role: "pro", plan: "pro" };

    await supabaseAdmin
      .from("profiles")
      .update({
        ...tierFields,
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

    // Section minimums are published on /api/config with a short cache — drop
    // it so a save takes effect on the next read.
    if (rows.some((r) => r.key.startsWith("section_min_tier."))) {
      invalidateSectionTierCache();
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
