import { Request, Response, NextFunction } from "express";
import { isOwnerEmail, type AuthedRequest } from "./auth";
import { isR1GrantedEmail } from "../utils/r1Grants";
import { normalizeRole } from "../auth/types";

/**
 * R1 access gate (owner + owner-granted emails only).
 * Pairs with `requireAuth` so `req.user` exists. Owner allowlist always wins;
 * everyone else needs an active `r1_grants` row for their email.
 */
export async function requireR1Access(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user = (req as AuthedRequest).user;
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (isOwnerEmail(user.email) || (await isR1GrantedEmail(user.email))) {
      next();
      return;
    }
    res.status(403).json({ error: "Forbidden — R1 access required" });
  } catch (err) {
    console.error("[r1-access] gate error:", err instanceof Error ? err.message : err);
    res.status(403).json({ error: "Forbidden — R1 access required" });
  }
}

/** Whether this session email may enter R1 (owner allowlist or active grant). */
export async function hasR1Access(email?: string | null): Promise<boolean> {
  if (!email) return false;
  return isOwnerEmail(email) || (await isR1GrantedEmail(email));
}

/**
 * Journal access gate (owner policy 2026-10-23: the study journal is open to
 * Plus and Pro rungs). R1-granted accounts keep their journal, owner emails
 * always pass, and any session whose tier is at least `plus` qualifies.
 * Pairs with `requireAuth`.
 */
export async function requireJournalAccess(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user = (req as AuthedRequest).user;
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (isOwnerEmail(user.email) || (await isR1GrantedEmail(user.email))) {
      next();
      return;
    }
    const tier =
      normalizeRole(user.role) ??
      (user.plan === "pro" || user.plan === "plus" ? user.plan : null);
    if (tier === "plus" || tier === "pro" || tier === "owner") {
      next();
      return;
    }
    res.status(403).json({ error: "Forbidden — Plus or Pro access required" });
  } catch (err) {
    console.error("[journal-access] gate error:", err instanceof Error ? err.message : err);
    res.status(403).json({ error: "Forbidden — Plus or Pro access required" });
  }
}
