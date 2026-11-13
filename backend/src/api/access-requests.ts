import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { verifyStatusToken } from "../utils/statusToken";
import {
  getUserFromRequest,
  requireAuth,
  type AuthedRequest,
} from "../middleware/auth";
import {
  ensureAccessRequest,
  saveFcmTokenForUser,
} from "../services/access-requests";

const router = Router();

const fcmBodySchema = z.object({
  fcmToken: z.string().min(8).max(4096),
  /** Optional signed pending-signup token when the user has no session yet. */
  statusToken: z.string().min(8).max(2048).optional(),
  deepLink: z.string().min(1).max(200).optional(),
});

async function resolveUserId(
  req: Request,
  statusToken?: string,
): Promise<string | null> {
  const sessionUser = await getUserFromRequest(req);
  if (sessionUser?.id) return sessionUser.id;
  if (statusToken) return verifyStatusToken(statusToken);
  return null;
}

/**
 * POST /api/access-requests/fcm
 * Saves the browser/device FCM token onto the user's open access request.
 * Auth: either a normal session cookie OR a pending-signup statusToken.
 */
router.post("/fcm", async (req: Request, res: Response) => {
  const parsed = fcmBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid FCM payload" });
    return;
  }

  const userId = await resolveUserId(req, parsed.data.statusToken);
  if (!userId) {
    res.status(401).json({ error: "Sign in or provide a valid status token" });
    return;
  }

  const row = await saveFcmTokenForUser(userId, parsed.data.fcmToken);
  if (!row) {
    res.status(500).json({ error: "Could not save FCM token" });
    return;
  }

  if (parsed.data.deepLink && parsed.data.deepLink !== row.deep_link) {
    await ensureAccessRequest(userId, {
      fcmToken: parsed.data.fcmToken,
      deepLink: parsed.data.deepLink,
    });
  }

  res.json({
    ok: true,
    requestId: row.id,
    status: row.status,
  });
});

/**
 * POST /api/access-requests
 * Explicitly open (or reuse) a timed access request — used from /welcome.
 */
router.post("/", async (req: Request, res: Response) => {
  const schema = z.object({
    statusToken: z.string().min(8).max(2048).optional(),
    fcmToken: z.string().min(8).max(4096).optional(),
    deepLink: z.string().min(1).max(200).optional(),
  });
  const parsed = schema.safeParse(req.body ?? {});
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const userId = await resolveUserId(req, parsed.data.statusToken);
  if (!userId) {
    res.status(401).json({ error: "Sign in or provide a valid status token" });
    return;
  }

  const row = await ensureAccessRequest(userId, {
    fcmToken: parsed.data.fcmToken,
    deepLink: parsed.data.deepLink,
  });
  if (!row) {
    res.status(500).json({ error: "Could not create access request" });
    return;
  }

  res.json({
    ok: true,
    requestId: row.id,
    status: row.status,
  });
});

/** Authenticated convenience: read latest request for the signed-in user. */
router.get("/me", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as AuthedRequest).user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const row = await ensureAccessRequest(userId);
  res.json({ ok: true, request: row });
});

export default router;
