import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./api/auth";
import aiRoutes from "./api/ai";
import aiGuestRoutes from "./api/ai-guest";
import aiGenerateRoutes from "./api/ai-generate";
import bookmarksRoutes from "./api/bookmarks";
import chaptersRoutes from "./api/chapters";
import classesRoutes from "./api/classes";
import controllerRoutes from "./api/controller";
import examsRoutes from "./api/exams";
import levelsRoutes from "./api/levels";
import progressRoutes from "./api/progress";
import pyqsRoutes from "./api/pyqs";
import rNotesRoutes from "./api/r-notes";
import ravikishanRoutes from "./api/ravikishan-notes";
import resourceRoutes from "./api/resources";
import searchRoutes from "./api/search";
import subjectsRoutes from "./api/subjects";
import testsRoutes from "./api/tests";
import topicsRoutes from "./api/topics";
import storageRoutes from "./api/storage";
import adminRoutes from "./api/admin";
import userRoutes from "./api/user";
import biologyRoutes from "./api/biology";
import { rateLimit } from "./middleware/rateLimit";
import { getAllowedOrigins } from "./middleware/cors";

export function createApp(): express.Express {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      // Reflect only allow-listed origins (FRONTEND_URL may be comma-separated).
      // No wildcard — authenticated traffic uses credentials.
      origin(origin, cb) {
        if (!origin || getAllowedOrigins().includes(origin)) return cb(null, true);
        return cb(null, false);
      },
      credentials: true,
    }),
  );
  app.use(morgan("combined"));
  app.use(rateLimit);
  // 15mb: base64 storage uploads (~10MB decoded) must survive the JSON body parser.
  app.use(express.json({ limit: "15mb" }));
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/ai", aiRoutes);
  app.use("/api/ai/guest", aiGuestRoutes);
  app.use("/api/ai/generate-questions", aiGenerateRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/bookmarks", bookmarksRoutes);
  app.use("/api/chapters", chaptersRoutes);
  app.use("/api/classes", classesRoutes);
  app.use("/api/controller", controllerRoutes);
  app.use("/api/exams", examsRoutes);
  app.use("/api/levels", levelsRoutes);
  app.use("/api/progress", progressRoutes);
  app.use("/api/pyqs", pyqsRoutes);
  app.use("/api/r-notes", rNotesRoutes);
  app.use("/api/ravikishan-notes", ravikishanRoutes);
  app.use("/api/resources", resourceRoutes);
  app.use("/api/search", searchRoutes);
  app.use("/api/subjects", subjectsRoutes);
  app.use("/api/tests", testsRoutes);
  app.use("/api/topics", topicsRoutes);
  app.use("/api/storage", storageRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/biology", biologyRoutes);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ error: "Internal server error" });
  });

  return app;
}
