import { Router } from "express";
import adminRouter from "./admin.controller.js";
import ownerRouter from "./owner.controller.js";
import controllerRouter from "./controller.controller.js";
import configRouter from "./config.controller.js";

const router = Router();

router.use("/admin", adminRouter);
router.use("/owner", ownerRouter);
router.use("/controller", controllerRouter);
router.use("/config", configRouter);

export const adminRoutes = router;
export default router;
