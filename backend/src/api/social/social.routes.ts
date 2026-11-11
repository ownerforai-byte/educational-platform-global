import { Router } from "express";
import communityRouter from "./community.controller.js";
import leaderboardRouter from "./leaderboard.controller.js";
import chatHistoryRouter from "./chat-history.controller.js";

const router = Router();

router.use("/community", communityRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/chat-history", chatHistoryRouter);

export const socialRoutes = router;
export default router;
