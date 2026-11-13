import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import contentRevealRoutes from "./api/content-reveal";
import authRoutes from "./api/auth";
import aiRoutes from "./api/ai";
import aiGuestRoutes from "./api/ai-guest";
import aiImageRoutes from "./api/ai-image";
import aiImageHistoryRoutes from "./api/ai-image-history";
import aiImageSearchRoutes from "./api/ai-image-search";
import aiImageFactsRoutes from "./api/ai-image-facts";
import aiFigureRoutes from "./api/ai-figure";
import aiGenerateRoutes from "./api/ai-generate";
import aiEvaluateRoutes from "./api/ai-evaluate";
import aiEnhanceRoutes from "./api/ai-enhance";
import aiMathRoutes from "./api/ai-math";
import aiDeepDiveRoutes from "./api/ai-deep-dive";
import aiPlatformGuideRoutes from "./api/ai-platform-guide";
import periodicUnlockRoutes from "./api/periodic-unlock";
import aiHistoryRoutes from "./api/ai-history";
import aiQuizHistoryRoutes from "./api/ai-quiz-history";
import leaderboardRoutes from "./api/leaderboard";
import communityRoutes from "./api/community";
import practiceHistoryRoutes from "./api/practice-history";
import chatHistoryRoutes from "./api/chat-history";
import bookmarksRoutes from "./api/bookmarks";
import chaptersRoutes from "./api/chapters";
import classesRoutes from "./api/classes";
import configRoutes from "./api/config";
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
import userStateRoutes from "./api/user-state";
import accessRequestsRoutes from "./api/access-requests";
import biologyRoutes from "./api/biology";
import periodicTableRoutes from "./api/periodic-table";
import lessonsRoutes from "./api/lessons";
import { rateLimit } from "./middleware/rateLimit";
import { isOriginAllowed } from "./middleware/cors";
import { securityHeaders, LEGACY_STATIC_PAGE_CSP } from "./middleware/securityHeaders";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { requestLogger } from "./middleware/request-logger";
import { logRegisteredRoutes } from "./utils/routeDebug";
import { hasAnyLlmKey } from "./ai/config";
import { describeFreeLlmPresence } from "./ai/free-llm-providers";
import {
  JSON_BODY_LIMIT,
  STATIC_PUBLIC_DIRS,
  TRUST_PROXY_HOPS,
} from "./config/server";

export function createApp(): express.Express {
  const app = express();

  app.set("trust proxy", TRUST_PROXY_HOPS);
  app.use(securityHeaders);
  app.use(
    cors({
      origin(origin, cb) {
        if (!origin || isOriginAllowed(origin)) return cb(null, true);
        return cb(null, false);
      },
      credentials: true,
      // The OAuth callback POSTs X-CSRF-Token. When a deployment calls the
      // backend directly (instead of the same-origin Next.js proxy), the CORS
      // preflight must allow that header or the exchange is blocked.
      allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
    }),
  );
  app.use(morgan("combined"));
  app.use(requestLogger);
  // gzip/deflate JSON responses (perf pass 2026-10-27): the curriculum
  // endpoints return large JSON bodies; compression shrinks them several-fold
  // on the wire for students on slow Nepali mobile networks. The middleware
  // skips responses that are already compressed or have no Accept-Encoding.
  app.use(compression());
  app.use(rateLimit);
  // Body limit rationale lives in config/server.ts (JSON_BODY_LIMIT).
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  app.use(cookieParser());

  // Serve static assets from public directory
  for (const p of STATIC_PUBLIC_DIRS) {
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

  // Lightweight AI *configuration* probe for the chat status dot: a boolean
  // only, no key material. Registered before /api/ai so it stays public. A
  // keyless free-tier link (LLM7.io / OVHcloud) counts as configured too.
  // CodeRabbit: this only proves a key/provider is wired up — it does NOT
  // prove the provider is reachable right now. `configured` is the honest
  // name; `online` is kept so older clients keep rendering instead of going
  // dark. The dot's label says "configured", not "online".
  app.get("/api/ai/status", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const configured = hasAnyLlmKey() || describeFreeLlmPresence().live.length > 0;
    res.json({ configured, online: configured });
  });

  // Route-table dump: opt-in only (ROUTE_DEBUG=true) and never in production.
  logRegisteredRoutes(app, "BEFORE API REGISTRATION");

  // Registered BEFORE /api/ai so the more specific path wins: this is the
  // history-search interface (search your own saved conversations), which is
  // free for signed-in students and blocked for guests.
  app.use("/api/ai/history-search", aiHistoryRoutes);
  // Registered BEFORE /api/ai so the more specific paths win: the Image Hub's
  // drawing endpoints — open to every signed-in student (owner request
  // 2026-10-04) — and its per-user saved-history API.
  app.use("/api/ai/image-history", aiImageHistoryRoutes);
  // The details interface's two reads: Google image results (key-gated, on
  // the ai-image tier because it burns the free CSE quota) and the Veer facts
  // card (authenticated AI — unlimited by policy, like every other LLM route).
  app.use("/api/ai/image-search", aiImageSearchRoutes);
  app.use("/api/ai/image-facts", aiImageFactsRoutes);
  app.use("/api/ai/image", aiImageRoutes);
  // The vector academic-figure writer (every labelled part hoverable) shares
  // the same every-user boundary.
  app.use("/api/ai/figure", aiFigureRoutes);
  app.use("/api/ai/guest", aiGuestRoutes);
  app.use("/api/ai/generate-questions", aiGenerateRoutes);
  // AI grading of learner answers (writing formats) — same gates as the
  // generator, registered before the /api/ai catch-all so the path wins.
  app.use("/api/ai/evaluate-answers", aiEvaluateRoutes);
  app.use("/api/ai/enhance", aiEnhanceRoutes);
  app.use("/api/ai/solve-math", aiMathRoutes);
  app.use("/api/ai/deep-dive", aiDeepDiveRoutes);
  app.use("/api/ai/platform-guide", aiPlatformGuideRoutes);
  app.use("/api/periodic-table/unlock", periodicUnlockRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api/ai-quiz-history", aiQuizHistoryRoutes);
  // XP leaderboard — ranking derived from scored sets on every read (no stored
  // XP column, so the rule can be corrected without a backfill).
  app.use("/api/leaderboard", leaderboardRoutes);
  // Peer discussions per study space (threads, replies, upvotes) — authors
  // masked server-side like the leaderboard; degrades to migrated:false
  // until 014_community_threads.sql is applied.
  app.use("/api/community", communityRoutes);
  // Per-question practice attempt log for the textbook solution corpus
  // (content/practice/solutions/**) — complements /api/progress at the
  // question grain. Registered before /api/ai so the specific path wins.
  app.use("/api/practice-history", practiceHistoryRoutes);
  app.use("/api/chat-history", chatHistoryRoutes);
  // Public runtime flags (coin gate on/off) — no auth: every AI surface needs
  // the owner's current gate state before it locks a composer on 0 credits.
  app.use("/api/config", configRoutes);
  app.use("/api/auth", authRoutes);
  // Timed access bot (Firebase Functions + FCM): create/request + device token.
  app.use("/api/access-requests", accessRequestsRoutes);
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
  // Account-backed personal state (notes, SRS, goals …). Registered before
  // any /api/user catch-all so /api/user-state/<namespace> always wins.
  app.use("/api/user-state", userStateRoutes);
  app.use("/api/biology", biologyRoutes);
  app.use("/api/periodic-table", periodicTableRoutes);
  app.use("/api/lessons", lessonsRoutes);

  // Spark-gated content body endpoint — must be mounted BEFORE notFoundHandler.
  app.use("/api/content", contentRevealRoutes);

  logRegisteredRoutes(app, "AFTER API REGISTRATION");

  app.use(notFoundHandler);
  // Terminal handler: internal detail goes to the server log under a
  // correlation id; the client gets a generic message plus that id.
  app.use(errorHandler);

  return app;
}
