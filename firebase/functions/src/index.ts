import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret, defineString } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { processApprovals } from "./jobs/processApprovals";
import { processExpirations } from "./jobs/processExpirations";
import { sendReminders } from "./jobs/sendReminders";
import { runDailyCreditsReset } from "./jobs/resetCredits";

const supabaseUrl = defineSecret("SUPABASE_URL");
const supabaseServiceRoleKey = defineSecret("SUPABASE_SERVICE_ROLE_KEY");
const accessBotRunKey = defineString("ACCESS_BOT_RUN_KEY", { default: "" });

async function runAccessBotCycle(label: string) {
  const approvals = await processApprovals();
  const expirations = await processExpirations();
  const reminders = await sendReminders();
  logger.info(`[${label}] access-bot cycle`, { approvals, expirations, reminders });
  return { approvals, expirations, reminders };
}

/**
 * Primary scheduler — every minute checks pending → approved, approved → expired,
 * and sends reminder / guidance pushes.
 */
export const accessBotTick = onSchedule(
  {
    schedule: "every 1 minutes",
    timeZone: "Asia/Kathmandu",
    secrets: [supabaseUrl, supabaseServiceRoleKey],
    retryCount: 1,
  },
  async () => {
    await runAccessBotCycle("schedule");
  },
);

/**
 * Manual / health trigger. When ACCESS_BOT_RUN_KEY is set, require
 * header `x-access-bot-key` to match.
 */
export const accessBotRunNow = onRequest(
  {
    secrets: [supabaseUrl, supabaseServiceRoleKey],
    cors: false,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("POST only");
      return;
    }
    const expected = accessBotRunKey.value();
    if (expected && req.get("x-access-bot-key") !== expected) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    try {
      const result = await runAccessBotCycle("manual");
      res.json({ ok: true, ...result });
    } catch (err) {
      logger.error("accessBotRunNow failed", err);
      res.status(500).json({
        ok: false,
        error: err instanceof Error ? err.message : "unknown",
      });
    }
  },
);

/**
 * Daily CONTENT spark pool refill at 00:00 Asia/Kathmandu.
 * Replaces node-cron inside the Render web process (which sleeps on free tier).
 * Lazy ensureDailyCredits on the API remains the safety net.
 */
export const creditsDailyReset = onSchedule(
  {
    schedule: "0 0 * * *",
    timeZone: "Asia/Kathmandu",
    secrets: [supabaseUrl, supabaseServiceRoleKey],
    retryCount: 1,
  },
  async () => {
    const reset = await runDailyCreditsReset();
    logger.info("[creditsDailyReset] done", { reset });
  },
);
