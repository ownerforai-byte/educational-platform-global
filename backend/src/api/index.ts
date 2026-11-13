import { Router } from "express";
import authRoutes from "./auth/index.js";
import aiRoutes, { quizHistoryRouter } from "./ai/index.js";
import contentRoutes from "./content/index.js";
import practiceRoutes from "./practice/index.js";
import userRoutes from "./user/index.js";
import socialRoutes from "./social/index.js";
import adminRoutes from "./admin/index.js";
import platformRoutes from "./platform/index.js";
import accessRequestsRoutes from "./access-requests.js";
import periodicUnlockRouter from "./content/periodic-unlock.controller.js";
import revealRouter from "./content/reveal.controller.js";
import stateRouter from "./user/state.controller.js";

/**
 * Single composed /api router. More-specific mounts are registered before
 * catch-all domain groups so Express precedence matches the former flat
 * app.ts table (history-search before /ai, unlock before /periodic-table, etc.).
 */
const apiRouter = Router();

// Explicit precedence mounts (must win over nested domain catch-alls).
apiRouter.use("/ai-quiz-history", quizHistoryRouter);
apiRouter.use("/user-state", stateRouter);
apiRouter.use("/content", revealRouter);
apiRouter.use("/access-requests", accessRequestsRoutes);
apiRouter.use("/periodic-table/unlock", periodicUnlockRouter);

apiRouter.use("/auth", authRoutes);
apiRouter.use("/ai", aiRoutes);
apiRouter.use("/", socialRoutes);
apiRouter.use("/", practiceRoutes);
apiRouter.use("/", adminRoutes);
apiRouter.use("/", platformRoutes);
apiRouter.use("/", userRoutes);
apiRouter.use("/", contentRoutes);

export {
  authRoutes,
  aiRoutes,
  contentRoutes,
  practiceRoutes,
  userRoutes,
  socialRoutes,
  adminRoutes,
  platformRoutes,
};

export default apiRouter;
