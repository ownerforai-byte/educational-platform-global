import { Router, Request, Response } from "express";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { aiSparkTierFor } from "../utils/aiSpark";

const router = Router();

/**
 * Plus accounts may open the Pro periodic table (filters, blocks, CEE)
 * with the shared password. The password lives only in
 * PERIODIC_TABLE_PRO_PASSWORD and is never sent to the browser except
 * as the value the student types.
 */
router.post("/", requireAuth, (req: Request, res: Response) => {
  const expected = process.env.PERIODIC_TABLE_PRO_PASSWORD?.trim();
  if (!expected) {
    res.status(503).json({
      error: "Unlock is not configured",
      message: "The Pro periodic table password is not set on the server.",
    });
    return;
  }

  const user = (req as AuthedRequest).user;
  const tier = aiSparkTierFor(user);
  if (tier !== "plus") {
    res.status(403).json({
      error: "Plus only",
      message: "This password is for Plus accounts. Pro already includes the table.",
    });
    return;
  }

  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (password !== expected) {
    res.status(401).json({ error: "Incorrect password", message: "That password is not correct." });
    return;
  }

  res.json({ ok: true });
});

export default router;
