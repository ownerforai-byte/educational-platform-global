import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth, hasFullAccess, type AuthedRequest } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";
import { ensureDailyCredits } from "../utils/credits";

const router = Router();

const premiumRequestSchema = z.object({
  message: z.string().max(500).optional(),
});

/**
 * GET /api/user/me
 * Get current user's profile including credits and premium status.
 */
router.get("/me", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;

  try {
    // Lazy midnight reset: a fetch after 12:00 AM surfaces today's pool.
    const ensured = await ensureDailyCredits(user.id, user.email, user.role);

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, role, credits, credits_limit, premium_status, premium_approved_at")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Failed to fetch profile:", error.message);
      res.status(500).json({ error: "Failed to fetch profile" });
      return;
    }

    const { data: pendingRequests, error: pendingError } = await supabaseAdmin
      .from("premium_requests")
      .select("id, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (pendingError) {
      console.error("Failed to fetch pending requests:", pendingError.message);
    }

    res.json({
      id: user.id,
      email: user.email,
      fullName: profile?.full_name ?? null,
      role: profile?.role ?? user.role,
      credits: ensured.unlimited ? profile?.credits ?? 0 : (profile?.credits ?? ensured.credits),
      dailyPool: ensured.unlimited ? null : 8,
      creditsLimit: profile?.credits_limit ?? 100,
      premiumStatus: profile?.premium_status ?? false,
      premiumApprovedAt: profile?.premium_approved_at ?? null,
      pendingRequests: pendingRequests ?? [],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/user/credits/request
 * Submit a premium request.
 */
router.post("/credits/request", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const parsed = premiumRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  try {
    // Check if user already has a pending request
    const { data: existing } = await supabaseAdmin
      .from("premium_requests")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "PENDING")
      .single();

    if (existing) {
      res.status(400).json({ error: "You already have a pending premium request" });
      return;
    }

    // Check if user is already premium
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("premium_status")
      .eq("id", user.id)
      .single();

    if (profile?.premium_status) {
      res.status(400).json({ error: "You are already a premium member" });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from("premium_requests")
      .insert({
        user_id: user.id,
        message: parsed.data.message ?? null,
        status: "PENDING",
      })
      .select("id, status")
      .single();

    if (error) {
      console.error("Failed to create premium request:", error.message);
      res.status(500).json({ error: "Failed to submit premium request" });
      return;
    }

    res.status(201).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Token value allocation matrix (authoritative — mirrors the client) ───────
const UNLOCK_COSTS: Record<"lab3d" | "visuals" | "theory" | "reference", number> = {
  lab3d: 5,
  visuals: 2,
  theory: 1,
  reference: 1,
};

const UNLOCK_WINDOW_SECONDS = 7200;

const unlockSchema = z.object({
  category: z.enum(["lab3d", "visuals", "theory", "reference"]),
  moduleKey: z.string().min(1).max(200).optional(),
});

/**
 * POST /api/user/credits/unlock
 * Deduct the category's coin cost and return the 2-hour window expiration.
 *
 * 401 — unauthenticated
 * 402 — insufficient credits
 * 400 — unknown category
 * 200 — { credits, expiresAt }
 */
router.post("/credits/unlock", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const parsed = unlockSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Unknown content category" });
    return;
  }

  const { category, moduleKey } = parsed.data;
  const cost = UNLOCK_COSTS[category];
  const expiresAt = Math.floor(Date.now() / 1000) + UNLOCK_WINDOW_SECONDS;

  try {
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role, credits, premium_status")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Unlock: profile lookup failed:", profileError.message);
      res.status(500).json({ error: "Failed to load profile" });
      return;
    }

    const role = (profile?.role as string | undefined)?.toUpperCase() ?? null;
    const premiumStatus = profile?.premium_status ?? false;
    const privileged = hasFullAccess(role, premiumStatus);

    // OWNER/ADMIN skip all checks — window still applies for UI consistency.
    if (privileged) {
      res.json({ credits: profile?.credits ?? 0, expiresAt, cost: 0 });
      return;
    }

    const credits = profile?.credits ?? 0;

    if (credits < cost) {
      res.status(402).json({
        error: "Insufficient credits",
        required: cost,
        current: credits,
        message: "You need more coins to unlock this content.",
      });
      return;
    }

    const newCredits = credits - cost;

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", user.id);

    if (updateError) {
      console.error("Unlock: credit update failed:", updateError.message);
      res.status(500).json({ error: "Failed to deduct credits" });
      return;
    }

    await supabaseAdmin.from("credit_transactions").insert({
      user_id: user.id,
      amount: -cost,
      type: "SPEND",
      reason: `Unlocked ${category}${moduleKey ? ` (${moduleKey})` : ""} for 2h window`,
    });

    res.json({ credits: newCredits, expiresAt, cost });
  } catch (err: any) {
    console.error("Unlock error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/user/credits/transactions
 * Get current user's credit transaction history.
 */
router.get("/credits/transactions", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;

  try {
    const { data, error } = await supabaseAdmin
      .from("credit_transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Failed to fetch transactions:", error.message);
      res.status(500).json({ error: "Failed to fetch transactions" });
      return;
    }

    res.json(data ?? []);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
