import { Router, Request, Response } from "express";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { hasR1Access } from "../middleware/r1Access";

const router = Router();

/**
 * GET /api/r1/access
 * Frontend R1 gate: does this session email hold R1 (owner or granted)?
 * Cheap and cacheable — drives the role-aware root redirect and nav visibility.
 */
router.get("/access", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const r1 = await hasR1Access(user.email);
    res.json({ r1 });
  } catch (err) {
    console.error("[r1] access check failed:", err instanceof Error ? err.message : err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
