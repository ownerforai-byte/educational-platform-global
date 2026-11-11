import { Router } from "express";
import r1Router from "./r1.controller.js";
import activitiesRouter from "./activities.controller.js";
import habitsRouter from "./habits.controller.js";
import journalRouter from "./journal.controller.js";
import plansRouter from "./plans.controller.js";

const router = Router();

router.use("/", r1Router);
router.use("/activities", activitiesRouter);
router.use("/habits", habitsRouter);
router.use("/journal", journalRouter);
router.use("/plans", plansRouter);

export const r1Routes = router;
export default router;
