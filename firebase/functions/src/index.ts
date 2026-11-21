import { onSchedule } from "firebase-functions/v2/scheduler";
import { defineString } from "firebase-functions/params";
import { logger } from "firebase-functions";

const communityBotApiBase = defineString("COMMUNITY_BOT_API_BASE", { default: "" });
const communityBotCronKey = defineString("COMMUNITY_BOT_CRON_KEY", { default: "" });

async function postCommunityBotCron(path: "daily-public" | "profile-discovery"): Promise<void> {
  const base = communityBotApiBase.value().replace(/\/+$/, "");
  const key = communityBotCronKey.value();
  if (!base || !key) {
    logger.warn("[communityBotCron] skipped — set COMMUNITY_BOT_API_BASE and COMMUNITY_BOT_CRON_KEY");
    return;
  }
  const url = `${base}/api/community/cron/${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "x-community-bot-cron-key": key },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`community bot cron ${path} failed: ${res.status} ${text.slice(0, 200)}`);
  }
  logger.info(`[communityBotCron] ${path}`, { status: res.status });
}

/**
 * Account access is owner-approved only (no scheduled PENDING → ACTIVE bot).
 * After deploy, delete stale remote functions once if they still exist:
 *   firebase functions:delete approvalBotTick approvalBotRunNow
 * See `firebase/functions/README.md`.
 */

/** Once daily (07:00 Asia/Kathmandu) — one nature post; prior bot posts are purged server-side. */
export const communityBotDailyPost = onSchedule(
  {
    schedule: "0 7 * * *",
    timeZone: "Asia/Kathmandu",
    retryCount: 1,
  },
  async () => {
    await postCommunityBotCron("daily-public");
  },
);