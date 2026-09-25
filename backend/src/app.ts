import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./api/auth";
import chatHistoryRoutes from "./api/chat-history";
import aiRoutes from "./api/ai";
import aiGuestRoutes from "./api/ai-guest";
import aiGenerateRoutes from "./api/ai-generate";
import aiEnhanceRoutes from "./api/ai-enhance";
import chatHistoryRoutes from "./api/chat-history";
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
import ownerRoutes from "./api/owner";
import userRoutes from "./api/user";
import biologyRoutes from "./api/biology";
import periodicTableRoutes from "./api/periodic-table";
import lessonsRoutes from "./api/lessons";
import { rateLimit } from "./middleware/rateLimit";
import { isOriginAllowed } from "./middleware/cors";
import { isProduction } from "./config/env";

export function createApp(): express.Express {
  const app = express();

  app.set("trust proxy", 1);
  // Configure helmet to allow iframe embedding in preview
  app.use(helmet({ frameguard: false, contentSecurityPolicy: false }));
  app.use(
    cors({
      origin(origin, cb) {
        if (!origin || isOriginAllowed(origin)) return cb(null, true);
        return cb(null, false);
      },
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(morgan("combined"));
  app.use(rateLimit);
  // 15mb: base64 storage uploads (~10MB decoded) must survive the JSON body parser.
  app.use(express.json({ limit: "15mb" }));
  app.use(cookieParser());

  // Serve static assets from public directory
  const publicPaths = [
    path.join(process.cwd(), "public"),
    path.join(process.cwd(), "..", "public"),
  ];
  for (const p of publicPaths) {
    app.use(express.static(p));
  }

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      // Render injects the deployed revision — lets the live smoke test confirm
      // it is checking the release that triggered it (not the previous one).
      commit: process.env.RENDER_GIT_COMMIT ?? null,
    });
  });

  // Debug: log all registered routes (suppressed in production)
  if (!isProduction) {
  app._router.stack.forEach((layer: any) => {
    if (layer.route) {
      const methods = layer.route.methods ? Object.keys(layer.route.methods).join(", ") : "use";
      console.log(`  ${methods.padEnd(7)} ${layer.route.path}`);
    } else if (layer.name === "router") {
      console.log(`  [Router] ${layer.regexp}`);
    } else {
      console.log(`  [Middleware] type=${layer.name || "unknown"}`);
    }
  });
  }

  app.use("/api/ai", aiRoutes);
  app.use("/api/ai/guest", aiGuestRoutes);
  app.use("/api/ai/generate-questions", aiGenerateRoutes);
  app.use("/api/ai/enhance", aiEnhanceRoutes);
  app.use("/api/chat-history", chatHistoryRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/chat-history", chatHistoryRoutes);
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
  app.use("/api/owner", ownerRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/biology", biologyRoutes);
  app.use("/api/periodic-table", periodicTableRoutes);
  app.use("/api/lessons", lessonsRoutes);

  // Debug after API routes (suppressed in production)
  if (!isProduction) {
  console.log("\n=== AFTER API REGISTRATION ===");
  app._router.stack.forEach((layer: any) => {
    if (layer.route) {
      const methods = layer.route.methods ? Object.keys(layer.route.methods).join(", ") : "use";
      console.log(`  ${methods.padEnd(7)} ${layer.route.path}`);
    } else if (layer.name === "router") {
      console.log(`  [Router] ${layer.regexp}`);
    } else {
      console.log(`  [Middleware] type=${layer.name || "unknown"}`);
    }
  });
  console.log("=== END ===\n");
  }

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ error: "Internal server error" });
  });

  return app;
}
