import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/supabase";
import { extractToken, hasFullAccess } from "./auth";

// ── Feature cost table ─────────────────────────────────────────────────────
// As of 2026-09-10 all features are public (cost 0, no premium gate).
// Bump values here to re-enable per-feature gating.
const PREMIUM_FEATURES = {
  lab: { cost: 0, requiresPremium: false },
  aiChat: { cost: 0, requiresPremium: false },
  bookmarks: { cost: 0, requiresPremium: false },
  progress: { cost: 0, requiresPremium: false },
  premiumLab: { cost: 0, requiresPremium: false },
};

export type FeatureKey = keyof typeof PREMIUM_FEATURES;

/**
 * Express middleware: authenticate + check credits/premium for a feature.
 * Always pair with `requireAuth` first (so req.user is present) OR this
 * middleware performs its own lightweight auth.
 *
 * 401 — unauthenticated
 * 402 — insufficient credits / premium required
 * 200 — pass
 */
export function requireCredit(
  feature: FeatureKey,
  cost: number = 0,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req, res, next) => {
    try {
      // ── Resolve the authenticated user ──
      const token = extractToken(req);
      if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);
      if (authError || !authData.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const userId = authData.user.id;

      // Load role + profile in one pass
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("role, credits, credits_limit, premium_status")
        .eq("id", userId)
        .maybeSingle();

      const role = (profile?.role as string | undefined)?.toUpperCase() ?? null;
      const premiumStatus = profile?.premium_status ?? false;

      // OWNER/ADMIN → skip all checks
      if (hasFullAccess(role, premiumStatus)) {
        next();
        return;
      }

      // Load credits (defaults to 0 when profile missing)
      const credits = profile?.credits ?? 0;
      const featureConfig = PREMIUM_FEATURES[feature];
      const actualCost = cost > 0 ? cost : (featureConfig?.cost ?? 0);

      if (credits < actualCost) {
        res.status(402).json({
          error: "Insufficient credits",
          required: actualCost,
          current: credits,
          message: "You need more credits to access this feature. Contact the owner to add credits.",
        });
        return;
      }

      // Deduct credits
      if (actualCost > 0) {
        await supabaseAdmin
          .from("profiles")
          .update({ credits: credits - actualCost })
          .eq("id", userId);

        await supabaseAdmin.from("credit_transactions").insert({
          user_id: userId,
          amount: -actualCost,
          type: "SPEND",
          reason: `Used for ${feature} feature`,
        });
      }

      next();
    } catch (err) {
      console.error("Credit check error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

/**
 * Express middleware: require premium access (or privileged role).
 * 401 — unauthenticated
 * 402 — not premium / not privileged
 * 200 — pass
 */
export async function requirePremium(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !authData.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = authData.user.id;
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("role, premium_status")
      .eq("id", userId)
      .maybeSingle();

    const role = (profile?.role as string | undefined)?.toUpperCase() ?? null;
    const premiumStatus = profile?.premium_status ?? false;

    if (!hasFullAccess(role, premiumStatus)) {
      res.status(402).json({
        error: "Premium required",
        message: "This feature requires premium access. Please contact the owner to upgrade.",
      });
      return;
    }

    next();
  } catch (err) {
    console.error("Premium check error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
