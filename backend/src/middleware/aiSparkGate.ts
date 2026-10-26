import { Request, Response, NextFunction } from "express";
import { consumeUserSlot, rollbackUserSlot } from "../utils/guestQuota";
import {
  AI_SPARK_LIMITS,
  aiSparkIsMetered,
  aiSparkTierFor,
} from "../utils/aiSpark";
import type { AuthedRequest } from "./auth";

/**
 * Veer AI spark gate — one AI spark per successful request for signed-in
 * users. Content sparks (profiles.credits) are never touched here.
 *
 * Guests must use authOrGuestQuota / guest routes before this runs; when
 * req.user is absent this middleware is a no-op.
 */
export function requireAiSpark(): (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> {
  return async (req, res, next) => {
    const user = (req as AuthedRequest).user;
    if (!user) {
      next();
      return;
    }

    const tier = aiSparkTierFor(user);
    if (!aiSparkIsMetered(tier)) {
      next();
      return;
    }

    const limit = AI_SPARK_LIMITS[tier];
    const slot = await consumeUserSlot(user.id, limit);
    if (slot.status === "limited") {
      res.status(402).json({
        error: "Daily AI sparks used",
        remaining: 0,
        limit,
        message: `You've used all ${limit} AI sparks for today — they reset at 12:00 AM UTC. Content sparks are separate and only unlock notes.`,
      });
      return;
    }
    if (slot.status === "unavailable") {
      res.status(503).json({
        error: "Veer is temporarily unavailable. Please try again in a moment.",
      });
      return;
    }

    res.on("finish", () => {
      if (res.statusCode >= 400) {
        rollbackUserSlot(user.id).catch(() => {});
      }
    });

    next();
  };
}

/** Run AI spark metering only when the session is signed in. */
export function aiSparkGateIfAuthed(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if ((req as AuthedRequest).user) {
    void requireAiSpark()(req, res, next);
    return;
  }
  next();
}
