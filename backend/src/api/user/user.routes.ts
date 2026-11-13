import { Router } from "express";
import profileRouter from "./profile.controller.js";
import profileHubRouter from "./profile-hub.controller.js";
import stateRouter from "./state.controller.js";
import progressRouter from "./progress.controller.js";
import bookmarksRouter from "./bookmarks.controller.js";
import levelsRouter from "./levels.controller.js";

const router = Router();

router.use("/user", profileRouter);
router.use("/profile", profileHubRouter);
router.use("/users", profileHubRouter);
router.use("/user-state", stateRouter);
router.use("/progress", progressRouter);
router.use("/bookmarks", bookmarksRouter);
router.use("/levels", levelsRouter);

export const userRoutes = router;
export default router;
