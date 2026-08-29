import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/supabase";

// Features that require premium or sufficient credits
const PREMIUM_FEATURES = {
  lab: { cost: 10, requiresPremium: false },
  aiChat: { cost: 5, requiresPremium: false },
  bookmarks: { cost: 0, requiresPremium: false },
  progress: { cost: 0, requiresPremium: false },
  premiumLab: { cost: 0, requiresPremium: true },
};

export type FeatureKey = keyof typeof PREMIUM_FEATURES;

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

export async function requireCredit(
  feature: FeatureKey,
  cost: number = 0
): Promise<(req: Request, res: Response, next: NextFunction) => Promise<void>> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = await getUserFromRequest(req);

      if (!userData) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // Owner/Admin always has access
      if (userData.role === "OWNER" || userData.role === "ADMIN") {
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
      if (profile.premium_status) {
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
    if (userData.role === "OWNER" || userData.role === "ADMIN") {
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

    if (!profile.premium_status) {
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
