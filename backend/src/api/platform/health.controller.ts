import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    commit: process.env.RENDER_GIT_COMMIT ?? null,
  });
});

export default router;
