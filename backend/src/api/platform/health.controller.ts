import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    // Same fallback chain as /health in src/app.ts (COMMIT_SHA → K_REVISION)
    // so every platform reports its revision.
    commit: process.env.COMMIT_SHA ?? process.env.K_REVISION ?? null,
  });
});

export default router;
