import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { checkStartupEnv } from "./config/env";
import { HOST, PORT } from "./config/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

// Fail fast: a production deploy missing its critical configuration must not
// boot and serve empty data from a mock store (see config/env.ts).
if (!checkStartupEnv()) {
  process.exit(1);
}

const { createApp } = await import("./app");
const { startCreditsResetJob, stopCreditsResetJob } = await import("./jobs/creditsResetJob");

const app = createApp();

// Daily platform-credit pool: refill every logged user to 8 credits at
// 12:00 AM (lazy per-user reset in utils/credits.ts is the safety net).
startCreditsResetJob();

const server = app.listen(PORT, HOST, () => {
  console.log(`Backend server running on http://${HOST}:${PORT}`);
});

let isShuttingDown = false;
function gracefulShutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`[Lifecycle] Received ${signal}. Draining connections and shutting down gracefully...`);

  try {
    stopCreditsResetJob();
  } catch (err) {
    console.error("[Lifecycle] Error stopping credits job:", err);
  }

  server.close((err) => {
    if (err) {
      console.error("[Lifecycle] Error during server close:", err);
      process.exit(1);
    }
    console.log("[Lifecycle] HTTP server closed gracefully.");
    process.exit(0);
  });

  // Force close if connections take longer than 10 seconds to drain
  setTimeout(() => {
    console.error("[Lifecycle] Forced shutdown due to timeout (in-flight requests didn't finish).");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason: unknown) => {
  console.error("[Lifecycle] Unhandled Rejection at promise:", reason);
});

process.on("uncaughtException", (error: Error) => {
  console.error("[Lifecycle] Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});
