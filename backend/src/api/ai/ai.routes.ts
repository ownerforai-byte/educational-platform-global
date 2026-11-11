import { Router } from "express";
import chatRouter from "./chat.controller.js";
import deepDiveRouter from "./deep-dive.controller.js";
import enhanceRouter from "./enhance.controller.js";
import evaluateRouter from "./evaluate.controller.js";
import figureRouter from "./figure.controller.js";
import generateRouter from "./generate.controller.js";
import guestRouter from "./guest.controller.js";
import historyRouter from "./history.controller.js";
import imageRouter from "./image.controller.js";
import imageFactsRouter from "./image-facts.controller.js";
import imageHistoryRouter from "./image-history.controller.js";
import imageSearchRouter from "./image-search.controller.js";
import mathRouter from "./math.controller.js";
import platformGuideRouter from "./platform-guide.controller.js";
import quizHistoryRouter from "./quiz-history.controller.js";

const router = Router();

// Sub-routes mounted before default chat router
router.use("/history-search", historyRouter);
router.use("/image-history", imageHistoryRouter);
router.use("/image-search", imageSearchRouter);
router.use("/image-facts", imageFactsRouter);
router.use("/image", imageRouter);
router.use("/figure", figureRouter);
router.use("/guest", guestRouter);
router.use("/generate-questions", generateRouter);
router.use("/evaluate-answers", evaluateRouter);
router.use("/enhance", enhanceRouter);
router.use("/solve-math", mathRouter);
router.use("/deep-dive", deepDiveRouter);
router.use("/platform-guide", platformGuideRouter);
router.use("/", chatRouter);

export { quizHistoryRouter };
export const aiRoutes = router;
export default router;
