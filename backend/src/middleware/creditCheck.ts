import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/supabase";

// Features that require premium or sufficient credits
// NOTE: As of 2026-09-10, premium features have been made public.
// All features are now accessible to all users without credit checks.
const PREMIUM_FEATURES = {
  lab: { cost: 0, requiresPremium: false },
  aiChat: { cost: 0, requiresPremium: false },
  bookmarks: { cost: 0, requiresPremium: false },
  progress: { cost: 0, requiresPremium: false },
  premiumLab: { cost: 0, requiresPremium: false },
};

export type FeatureKey = keyof typeof PREMIUM_FEATURES;

/**
 * Returns true when the user has unrestricted access to all features.
 *
 * A user qualifies when ANY of the following is true:
 *  - Role is OWNER or ADMIN (privileged roles).
 *  - `premiumStatus` is true (verified / approved by the owner).
 */
export function hasFullAccess(
  role: string | null | undefined,
  premiumStatus?: boolean | null,
): boolean {
  if (role === "OWNER" || role === "ADMIN") return true;
  return premiumStatus === true;
}

async function getUserFromRequest(req: Request): Promise<{ id: string; email: string; role?: string } | null> {
  // Try Bearer token first
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (!error && data.user) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      return { id: data.user.id, email: data.user.email ?? "", role: profile?.role };
    }
  }

  // Try cookie
  const token = req.cookies?.["sb-access-token"];
  if (token) {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (!error && data.user) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      return { id: data.user.id, email: data.user.email ?? "", role: profile?.role };
    }
  }

  return null;
}

export function requireCredit(
  feature: FeatureKey,
  cost: number = 0
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = await getUserFromRequest(req);

      if (!userData) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // Owner/Admin always has access
      if (hasFullAccess(userData.role)) {
        return next();
      }

      // Get user's credits
      const { data: profile, error } = await supabaseAdmin
        .from("profiles")
        .select("credits, premium_status")
        .eq("id", userData.id)
        .single();

      if (error || !profile) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // Premium users have unlimited access
      if (hasFullAccess(userData.role, profile.premium_status)) {
        return next();
      }

      // Check credits for the feature
      const featureConfig = PREMIUM_FEATURES[feature];
      const actualCost = cost > 0 ? cost : (featureConfig?.cost ?? 0);

      if (profile.credits < actualCost) {
        res.status(402).json({
          error: "Insufficient credits",
          required: actualCost,
          current: profile.credits,
          message: "You need more credits to access this feature. Contact the owner to add credits.",
        });
        return;
      }

      // Deduct credits if needed
      if (actualCost > 0) {
        await supabaseAdmin
          .from("profiles")
          .update({ credits: profile.credits - actualCost })
          .eq("id", userData.id);

        await supabaseAdmin.from("credit_transactions").insert({
          user_id: userData.id,
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

export async function requirePremium(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userData = await getUserFromRequest(req);

    if (!userData) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Owner/Admin always has access
    if (hasFullAccess(userData.role)) {
      return next();
    }

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("premium_status")
      .eq("id", userData.id)
      .single();

    if (error || !profile) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!hasFullAccess(userData.role, profile.premium_status)) {
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
