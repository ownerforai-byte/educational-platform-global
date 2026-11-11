import { Router } from "express";
import pyqsRouter from "./pyqs.controller.js";
import examsRouter from "./exams.controller.js";
import testsRouter from "./tests.controller.js";
import historyRouter from "./history.controller.js";

const router = Router();

router.use("/pyqs", pyqsRouter);
router.use("/exams", examsRouter);
router.use("/tests", testsRouter);
router.use("/practice-history", historyRouter);

export const practiceRoutes = router;
export default router;
