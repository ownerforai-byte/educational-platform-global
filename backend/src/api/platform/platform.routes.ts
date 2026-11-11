import { Router } from "express";
import searchRouter from "./search.controller.js";
import storageRouter from "./storage.controller.js";
import supportRouter from "./support.controller.js";
import healthRouter from "./health.controller.js";

const router = Router();

router.use("/search", searchRouter);
router.use("/storage", storageRouter);
router.use("/support-requests", supportRouter);
router.use("/health", healthRouter);

export const platformRoutes = router;
export default router;
