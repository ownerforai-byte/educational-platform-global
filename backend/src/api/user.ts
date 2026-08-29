import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";

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
      credits: profile?.credits ?? 0,
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
