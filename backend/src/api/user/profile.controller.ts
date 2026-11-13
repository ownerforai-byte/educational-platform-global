import { Router, Request, Response } from "express";
import supportRequests from "../platform/support.controller";
import { z } from "zod";
import { requireAuth, isOwnerEmail, type AuthedRequest } from "../../middleware/auth";
import { normalizeRole } from "../../auth/types";
import {
  findPendingPremiumRequest,
  getProfileById,
  insertPremiumRequest,
  listPremiumRequests,
  updateProfileFields,
} from "../../db/repositories/user.repository.js";
import { listCreditTransactions } from "../../db/repositories/credit.repository.js";
import { canUnlockModule } from "../../utils/sectionAccess";
import {
  ensureDailyCredits,
  spendCredits,
  DAILY_CREDIT_POOL,
} from "../../services/credit.service.js";

/**
 * Persist the spark-unlock window for `moduleKey` into `profiles.credits_unlock`
 * (a JSONB column: `{ [moduleKey]: expiresAtEpoch }`).
 */
async function persistUnlockWindow(
  userId: string,
  moduleKey: string | undefined,
  expiresAt: number,
): Promise<void> {
  if (!moduleKey) return;
  try {
    const { data: current } = await getProfileById(userId, "credits_unlock");
    const existing =
      current?.credits_unlock && typeof current.credits_unlock === "object"
        ? (current.credits_unlock as Record<string, unknown>)
        : {};
    await updateProfileFields(userId, {
      credits_unlock: { ...existing, [moduleKey]: expiresAt },
    });
  } catch (err: unknown) {
    const e = err as Error;
    console.warn("[unlock] failed to persist spark window for", userId, e?.message ?? e);
  }
}

const router = Router();
router.use("/support-requests", supportRequests);

const premiumRequestSchema = z.object({
  message: z.string().max(500).optional(),
});

router.get("/me", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;

  try {
    const ensured = await ensureDailyCredits(user.id, user.email, user.role);

    const { data: profile, error } = await getProfileById(
      user.id,
      "id, full_name, role, credits, credits_limit, premium_status, premium_approved_at",
    );

    if (error) {
      console.error("Failed to fetch profile:", error.message);
      res.status(500).json({ error: "Failed to fetch profile" });
      return;
    }

    const { data: pendingRequests, error: pendingError } = await listPremiumRequests(user.id, 5);

    if (pendingError) {
      console.error("Failed to fetch pending requests:", pendingError.message);
    }

    res.json({
      id: user.id,
      email: user.email,
      fullName: (profile?.full_name as string | null) ?? null,
      role: normalizeRole(profile?.role as string | null) ?? user.role,
      plan: user.plan ?? (profile?.premium_status === true ? "pro" : "member"),
      credits: ensured.unlimited
        ? ((profile?.credits as number | undefined) ?? 0)
        : ((profile?.credits as number | undefined) ?? ensured.credits),
      dailyPool: ensured.unlimited ? null : DAILY_CREDIT_POOL,
      creditsLimit: (profile?.credits_limit as number | undefined) ?? 100,
      premiumStatus: (profile?.premium_status as boolean | undefined) ?? false,
      premiumApprovedAt: (profile?.premium_approved_at as string | null) ?? null,
      pendingRequests: pendingRequests ?? [],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/credits/request", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const parsed = premiumRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  try {
    const { data: existing } = await findPendingPremiumRequest(user.id);

    if (existing) {
      res.status(400).json({ error: "You already have a pending premium request" });
      return;
    }

    const { data: profile } = await getProfileById(user.id, "premium_status");

    if (profile?.premium_status) {
      res.status(400).json({ error: "You are already a premium member" });
      return;
    }

    const { data, error } = await insertPremiumRequest({
      user_id: user.id,
      message: parsed.data.message ?? null,
      status: "PENDING",
    });

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

const UNLOCK_COSTS: Record<"lab3d" | "visuals" | "theory" | "reference" | "imagehub", number> = {
  lab3d: 0,
  visuals: 0,
  theory: 1,
  reference: 1,
  imagehub: 0,
};

const UNLOCK_WINDOW_SECONDS = 1200;

const unlockSchema = z.object({
  category: z.enum(["lab3d", "visuals", "theory", "reference", "imagehub"]),
  moduleKey: z.string().min(1).max(200).optional(),
});

router.post("/credits/unlock", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const parsed = unlockSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Unknown content category" });
    return;
  }

  const { category, moduleKey } = parsed.data;
  const cost = UNLOCK_COSTS[category] ?? 0;

  if (!(await canUnlockModule(user, isOwnerEmail(user.email), moduleKey))) {
    res.status(403).json({ error: "This section is not available on your plan." });
    return;
  }

  const expiresAt = Math.floor(Date.now() / 1000) + UNLOCK_WINDOW_SECONDS;

  if (cost === 0) {
    const { data: freeProfile } = await getProfileById(user.id, "role, credits, premium_status");
    if (category === "imagehub" && !isOwnerEmail(user.email)) {
      res.status(403).json({
        error: "The Diagram Hub is reserved for owner accounts.",
      });
      return;
    }
    void persistUnlockWindow(user.id, moduleKey, expiresAt);
    res.json({ credits: (freeProfile?.credits as number | undefined) ?? 0, expiresAt, cost: 0 });
    return;
  }

  try {
    const { data: profile, error: profileError } = await getProfileById(
      user.id,
      "role, credits, premium_status",
    );

    if (profileError) {
      console.error("Unlock: profile lookup failed:", profileError.message);
      res.status(500).json({ error: "Failed to load profile" });
      return;
    }

    const role = normalizeRole(profile?.role as string | null);
    const premiumStatus = (profile?.premium_status as boolean | undefined) ?? false;
    const owner = isOwnerEmail(user.email);

    if (category === "imagehub") {
      if (!owner) {
        res.status(403).json({
          error: "The Diagram Hub is reserved for owner accounts.",
        });
        return;
      }
      void persistUnlockWindow(user.id, moduleKey, expiresAt);
      res.json({ credits: (profile?.credits as number | undefined) ?? 0, expiresAt, cost: 0 });
      return;
    }

    if (premiumStatus) {
      void persistUnlockWindow(user.id, moduleKey, expiresAt);
      res.json({ credits: (profile?.credits as number | undefined) ?? 0, expiresAt, cost: 0 });
      return;
    }

    const ensured = await ensureDailyCredits(user.id, user.email, role, premiumStatus);

    if (ensured.unlimited) {
      void persistUnlockWindow(user.id, moduleKey, expiresAt);
      res.json({ credits: (profile?.credits as number | undefined) ?? 0, expiresAt, cost: 0 });
      return;
    }

    if (ensured.credits < cost) {
      res.status(402).json({
        error: "Insufficient credits",
        required: cost,
        current: ensured.credits,
        message: "You need more content sparks to unlock this note.",
      });
      return;
    }

    const reason = `Content spark: unlocked ${category}${moduleKey ? ` (${moduleKey})` : ""} for 20-min window`;
    const remaining = await spendCredits(user.id, cost, reason);

    if (remaining === null) {
      console.error("Unlock: atomic credit spend failed for", user.id);
      res.status(500).json({ error: "Failed to deduct credits" });
      return;
    }

    void persistUnlockWindow(user.id, moduleKey, expiresAt);
    res.json({ credits: remaining, expiresAt, cost });
  } catch (err: any) {
    console.error("Unlock error:", err?.message ?? err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/credits/transactions", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;

  try {
    const { data, error } = await listCreditTransactions(user.id, 50);

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
