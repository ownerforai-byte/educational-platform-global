import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/supabase";
import { extractToken, hasFullAccess, isOwnerEmail, type AuthedRequest } from "./auth";
import { ensureDailyCredits, spendCredits, refundCredits, isCoinGateEnabled } from "../utils/credits";

// ── Feature cost table ─────────────────────────────────────────────────────
// BILL-EVERYONE (corrected 2026-10-04): every AI chat message costs 1 credit
// from the user's daily pool (hardcoded 4 at 12:00 AM — see utils/credits.ts;
// no env/refresh override, PRO/premium runs unlimited). Owner emails follow
// the profile toggle (ON → billed, OFF → free); students always pay.
// Everything else stays public (cost 0, no premium gate).
const PREMIUM_FEATURES = {
  lab: { cost: 0, requiresPremium: false },
  aiChat: { cost: 1, requiresPremium: false },
  bookmarks: { cost: 0, requiresPremium: false },
  progress: { cost: 0, requiresPremium: false },
  premiumLab: { cost: 0, requiresPremium: false },
};

export type FeatureKey = keyof typeof PREMIUM_FEATURES;

interface ResolvedCreditUser {
  userId: string;
  email: string | undefined;
  role: string | null;
  premiumStatus: boolean;
}

/**
 * Resolve the authenticated user and profile flags, reusing `req.user` when
 * `requireAuth` has already run on this request so we do not hit Supabase Auth
 * and `profiles` a second time.
 */
async function resolveCreditUser(req: Request): Promise<ResolvedCreditUser | null> {
  const existing = (req as Partial<AuthedRequest>).user;
  if (existing?.id) {
    return {
      userId: existing.id,
      email: existing.email || undefined,
      role: existing.role ? existing.role.toUpperCase() : null,
      premiumStatus: existing.premiumStatus === true,
    };
  }

  const token = extractToken(req);
  if (!token) return null;

  const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);
  if (authError || !authData.user) return null;

  const userId = authData.user.id;
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role, premium_status")
    .eq("id", userId)
    .maybeSingle();

  return {
    userId,
    email: authData.user.email,
    role: (profile?.role as string | undefined)?.toUpperCase() ?? null,
    premiumStatus: profile?.premium_status ?? false,
  };
}

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
      const resolved = await resolveCreditUser(req);
      if (!resolved) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { userId, email, role, premiumStatus } = resolved;

      // BILL-EVERYONE (corrected 2026-10-04): PRO is unlimited; owners are
      // free only while their toggle is OFF; students/customers always pay.
      if (premiumStatus === true) {
        next();
        return;
      }
      const gateOn = await isCoinGateEnabled();
      if (isOwnerEmail(email) && !gateOn) {
        next();
        return;
      }

      const featureConfig = PREMIUM_FEATURES[feature];
      const actualCost = cost > 0 ? cost : (featureConfig?.cost ?? 0);

      // Free feature, no premium gate → nothing to bill or check. Skip the
      // extra queries (this middleware guards bookmarks/progress/etc too).
      if (actualCost === 0 && !featureConfig?.requiresPremium) {
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
      const ensured = await ensureDailyCredits(userId, email, role, premiumStatus);
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
    const resolved = await resolveCreditUser(req);
    if (!resolved) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { role, premiumStatus } = resolved;

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
