import { Request, Response, NextFunction } from "express";
import { isOwnerEmail, type AuthedRequest } from "./auth";
import { isR1GrantedEmail } from "../utils/r1Grants";

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
