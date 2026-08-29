import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";

const router = Router();

// Validation schemas
const creditAdjustSchema = z.object({
  amount: z.number().int().min(-9999).max(9999),
  reason: z.string().max(200).optional(),
});

const updateUserRoleSchema = z.object({
  role: z.enum(["STUDENT", "TEACHER", "ADMIN", "OWNER"]),
});

/**
 * GET /api/admin/users
 * List all users with their credits, roles, and premium status.
 * OWNER/ADMIN only.
 */
router.get("/users", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const role = user.role?.toUpperCase();

  if (role !== "ADMIN" && role !== "OWNER") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select(`
        id,
        full_name,
        email,
        role,
        credits,
        credits_limit,
        premium_status,
        premium_approved_at,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch users:", error.message);
      res.status(500).json({ error: "Failed to fetch users" });
      return;
    }

    // Enrich with pending premium request counts
    const enriched = await Promise.all(
      (data ?? []).map(async (p: any) => {
        const { count } = await supabaseAdmin
          .from("premium_requests")
          .select("id", { count: "exact", head: true })
          .eq("user_id", p.id)
          .eq("status", "PENDING");

        return {
          ...p,
          pendingPremiumRequests: count ?? 0,
        };
      })
    );

    res.json(enriched);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/admin/users/:id
 * Get detailed user info including credit history.
 */
router.get("/users/:id", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const role = user.role?.toUpperCase();

  if (role !== "ADMIN" && role !== "OWNER") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const { id } = req.params;

  try {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !profile) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { data: transactions, error: txError } = await supabaseAdmin
      .from("credit_transactions")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (txError) {
      console.error("Failed to fetch transactions:", txError.message);
    }

    const { count: pendingRequests } = await supabaseAdmin
      .from("premium_requests")
      .select("id", { count: "exact", head: true })
      .eq("user_id", id)
      .eq("status", "PENDING");

    res.json({
      ...profile,
      creditHistory: transactions ?? [],
      pendingPremiumRequests: pendingRequests ?? 0,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PATCH /api/admin/users/:id/credits
 * Adjust user credits (grant/spend). OWNER/ADMIN only.
 */
router.patch("/users/:id/credits", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const role = user.role?.toUpperCase();

  if (role !== "ADMIN" && role !== "OWNER") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const { id } = req.params;
  const parsed = creditAdjustSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    return;
  }

  const { amount, reason } = parsed.data;

  try {
    // Verify user exists
    const { data: targetProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, credits")
      .eq("id", id)
      .single();

    if (!targetProfile) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const newCredits = Math.max(0, (targetProfile.credits ?? 0) + amount);

    // Update credits
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", id);

    if (updateError) {
      console.error("Failed to update credits:", updateError.message);
      res.status(500).json({ error: "Failed to update credits" });
      return;
    }

    // Log transaction
    const { error: txError } = await supabaseAdmin
      .from("credit_transactions")
      .insert({
        user_id: id,
        actor_id: user.id,
        amount,
        type: amount >= 0 ? "GRANT" : "ADJUST",
        reason: reason ?? `Admin adjustment by ${user.email}`,
      });

    if (txError) {
      console.error("Failed to log transaction:", txError.message);
    }

    res.json({
      success: true,
      userId: id,
      newCredits,
      transactionLogged: !!txError,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PATCH /api/admin/users/:id/role
 * Update user role. OWNER only.
 */
router.patch("/users/:id/role", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const role = user.role?.toUpperCase();

  if (role !== "OWNER") {
    res.status(403).json({ error: "Only owners can change roles" });
    return;
  }

  const { id } = req.params;
  const parsed = updateUserRoleSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid role" });
    return;
  }

  try {
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ role: parsed.data.role })
      .eq("id", id);

    if (error) {
      console.error("Failed to update role:", error.message);
      res.status(500).json({ error: "Failed to update role" });
      return;
    }

    res.json({ success: true, userId: id, newRole: parsed.data.role });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/admin/premium-requests
 * List all premium requests with user details.
 */
router.get("/premium-requests", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const role = user.role?.toUpperCase();

  if (role !== "ADMIN" && role !== "OWNER") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("premium_requests")
      .select(`
        id,
        user_id,
        status,
        message,
        reviewed_by,
        reviewed_at,
        created_at,
        profiles!inner (
          id,
          full_name,
          email,
          role,
          credits
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch premium requests:", error.message);
      res.status(500).json({ error: "Failed to fetch premium requests" });
      return;
    }

    res.json(data ?? []);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/admin/premium-requests/:id/approve
 * Approve a premium request and grant credits.
 */
router.post("/premium-requests/:id/approve", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const role = user.role?.toUpperCase();

  if (role !== "OWNER") {
    res.status(403).json({ error: "Only owners can approve premium requests" });
    return;
  }

  const { id } = req.params;

  try {
    // Get the request
    const { data: requestData, error: reqError } = await supabaseAdmin
      .from("premium_requests")
      .select("user_id, status")
      .eq("id", id)
      .single();

    if (reqError || !requestData || requestData.status !== "PENDING") {
      res.status(404).json({ error: "Premium request not found or already processed" });
      return;
    }

    const { user_id: targetUserId } = requestData;

    // Approve the request
    const { error: approveError } = await supabaseAdmin
      .from("premium_requests")
      .update({
        status: "APPROVED",
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (approveError) {
      console.error("Failed to approve:", approveError.message);
      res.status(500).json({ error: "Failed to approve premium request" });
      return;
    }

    // Grant premium status to user
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        premium_status: true,
        premium_approved_at: new Date().toISOString(),
      })
      .eq("id", targetUserId);

    if (profileError) {
      console.error("Failed to update profile:", profileError.message);
    }

    // Grant 500 credits as premium bonus
    const CREDIT_BONUS = 500;
    const { data: currentProfile } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", targetUserId)
      .single();

    const newCredits = (currentProfile?.credits ?? 0) + CREDIT_BONUS;

    await supabaseAdmin
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", targetUserId);

    await supabaseAdmin
      .from("credit_transactions")
      .insert({
        user_id: targetUserId,
        actor_id: user.id,
        amount: CREDIT_BONUS,
        type: "GRANT",
        reason: "Premium approval bonus",
        reference_id: id,
      });

    res.json({
      success: true,
      userId: targetUserId,
      creditsGranted: CREDIT_BONUS,
      newTotalCredits: newCredits,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/admin/premium-requests/:id/reject
 * Reject a premium request.
 */
router.post("/premium-requests/:id/reject", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const role = user.role?.toUpperCase();

  if (role !== "OWNER") {
    res.status(403).json({ error: "Only owners can reject premium requests" });
    return;
  }

  const { id } = req.params;

  try {
    const { error } = await supabaseAdmin
      .from("premium_requests")
      .update({
        status: "REJECTED",
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "PENDING");

    if (error) {
      console.error("Failed to reject:", error.message);
      res.status(500).json({ error: "Failed to reject premium request" });
      return;
    }

    res.json({ success: true, requestId: id });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/admin/stats
 * Admin dashboard statistics.
 */
router.get("/stats", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const role = user.role?.toUpperCase();

  if (role !== "ADMIN" && role !== "OWNER") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  try {
    const [
      totalUsers,
      premiumUsers,
      pendingRequests,
      totalCreditsGranted,
      totalCreditsSpent,
    ] = await Promise.all([
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }).eq("premium_status", true),
      supabaseAdmin.from("premium_requests").select("id", { count: "exact", head: true }).eq("status", "PENDING"),
      supabaseAdmin.from("credit_transactions").select("amount", { count: "exact", head: true }).eq("type", "GRANT"),
      supabaseAdmin.from("credit_transactions").select("amount", { count: "exact", head: true }).eq("type", "SPEND"),
    ]);

    res.json({
      totalUsers: totalUsers.count ?? 0,
      premiumUsers: premiumUsers.count ?? 0,
      pendingPremiumRequests: pendingRequests.count ?? 0,
      totalCreditsGranted: totalCreditsGranted.count ?? 0,
      totalCreditsSpent: totalCreditsSpent.count ?? 0,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
