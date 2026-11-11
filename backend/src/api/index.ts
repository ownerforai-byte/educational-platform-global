import { Router } from "express";
import authRoutes from "./auth/index.js";
import aiRoutes, { quizHistoryRouter } from "./ai/index.js";
import contentRoutes from "./content/index.js";
import practiceRoutes from "./practice/index.js";
import userRoutes from "./user/index.js";
import socialRoutes from "./social/index.js";
import adminRoutes from "./admin/index.js";
import platformRoutes from "./platform/index.js";
import r1Routes from "./r1/index.js";

const apiRouter = Router();

// Mount all 9 domain routers
apiRouter.use("/auth", authRoutes);
apiRouter.use("/ai", aiRoutes);
apiRouter.use("/ai-quiz-history", quizHistoryRouter);
apiRouter.use("/r1", r1Routes);
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
  r1Routes,
};

export default apiRouter;
