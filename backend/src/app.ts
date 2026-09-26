import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./api/auth";
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
import { securityHeaders, LEGACY_STATIC_PAGE_CSP } from "./middleware/securityHeaders";
import { errorHandler, notFoundHandler } from "./middleware/errors";
import { logRegisteredRoutes } from "./utils/routeDebug";

export function createApp(): express.Express {
  const app = express();

  app.set("trust proxy", 1);
  app.use(securityHeaders);
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
    app.use(
      express.static(p, {
        setHeaders(res) {
          // public/index.html loads the Tailwind CDN plus an inline boot script,
          // so it needs a wider policy than the strict one every API response
          // carries. Scoped to static files only.
          res.setHeader("Content-Security-Policy", LEGACY_STATIC_PAGE_CSP);
        },
      }),
    );
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

  // Route-table dump: opt-in only (ROUTE_DEBUG=true) and never in production.
  logRegisteredRoutes(app, "BEFORE API REGISTRATION");

  app.use("/api/ai", aiRoutes);
  app.use("/api/ai/guest", aiGuestRoutes);
  app.use("/api/ai/generate-questions", aiGenerateRoutes);
  app.use("/api/ai/enhance", aiEnhanceRoutes);
  app.use("/api/chat-history", chatHistoryRoutes);
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
  app.use("/api/owner", ownerRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/biology", biologyRoutes);
  app.use("/api/periodic-table", periodicTableRoutes);
  app.use("/api/lessons", lessonsRoutes);

  logRegisteredRoutes(app, "AFTER API REGISTRATION");

  app.use(notFoundHandler);
  // Terminal handler: internal detail goes to the server log under a
  // correlation id; the client gets a generic message plus that id.
  app.use(errorHandler);

  return app;
}
