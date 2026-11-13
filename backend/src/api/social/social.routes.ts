import { Router } from "express";
import communityRouter from "./community.controller.js";
import communityFeedRouter from "./community-feed.controller.js";
import leaderboardRouter from "./leaderboard.controller.js";
import chatHistoryRouter from "./chat-history.controller.js";

const router = Router();

// Feed and public profiles mount first so `/feed` and `/people` are never
// read as a study-space id by the older thread router.
router.use("/community", communityFeedRouter);
router.use("/community", communityRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/chat-history", chatHistoryRouter);

export const socialRoutes = router;
export default router;
