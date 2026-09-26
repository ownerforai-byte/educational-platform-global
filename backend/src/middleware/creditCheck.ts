import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/supabase";
import { extractToken, hasFullAccess } from "./auth";
import { ensureDailyCredits, spendCredits, refundCredits } from "../utils/credits";

// ── Feature cost table ─────────────────────────────────────────────────────
// As of 2026-09-10 all features are public (cost 0, no premium gate).
// Bump values here to re-enable per-feature gating.
// Owner policy 2026-09-26: every AI chat message costs 1 credit from the
// user's daily pool (reset to 8 at 12:00 AM — see utils/credits.ts).
// Everything else stays public (cost 0, no premium gate).
const PREMIUM_FEATURES = {
  lab: { cost: 0, requiresPremium: false },
  aiChat: { cost: 1, requiresPremium: false },
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
      const featureConfig = PREMIUM_FEATURES[feature];
      const actualCost = cost > 0 ? cost : (featureConfig?.cost ?? 0);

      // Free feature, no premium gate → nothing to bill or check. Skip the
      // extra queries (this middleware guards bookmarks/progress/etc too).
      if (actualCost === 0 && !featureConfig?.requiresPremium) {
        next();
        return;
      }

      // Load role + premium in one pass
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("role, premium_status")
        .eq("id", userId)
        .maybeSingle();

      const role = (profile?.role as string | undefined)?.toUpperCase() ?? null;
      const premiumStatus = profile?.premium_status ?? false;

      // OWNER/ADMIN → skip all checks
      if (hasFullAccess(role, premiumStatus)) {
        next();
        return;
      }

      if (featureConfig?.requiresPremium && !premiumStatus) {
        res.status(402).json({
          error: "Premium required",
          message: "This feature requires premium access. Please contact the owner to upgrade.",
        });
        return;
      }

      // Fresh daily pool first (lazy midnight reset), then an ATOMIC spend —
      // the old read-then-write deduction lost concurrent updates and could
      // spend a balance the user no longer had.
      const ensured = await ensureDailyCredits(userId, authData.user.email, role, premiumStatus);
      if (ensured.unlimited) {
        next();
        return;
      }
      if (ensured.credits < actualCost) {
        res.status(402).json({
          error: "Insufficient credits",
          required: actualCost,
          current: ensured.credits,
          message: "You've used all of today's credits. The pool resets at 12:00 AM — or contact the owner to add credits.",
        });
        return;
      }

      const remaining = await spendCredits(userId, actualCost, `Used for ${feature} feature`);
      if (remaining === null) {
        res.status(402).json({
          error: "Insufficient credits",
          required: actualCost,
          current: ensured.credits,
          message: "You've used all of today's credits. The pool resets at 12:00 AM — or contact the owner to add credits.",
        });
        return;
      }

      // Charged upfront — but if the feature then fails server-side, the
      // student never received it: refund automatically on any 5xx.
      res.on("finish", () => {
        if (res.statusCode >= 500) {
          refundCredits(userId, actualCost, `Refund: ${feature} failed (HTTP ${res.statusCode})`).catch(
            () => {},
          );
        }
      });

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
