import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { approvePendingProfiles } from "./jobs/approvePendingProfiles";

const accessBotRunKey = defineString("ACCESS_BOT_RUN_KEY", { default: "" });

/**
 * Firebase approval bot — every minute promotes Firestore `profiles` docs
 * PENDING → ACTIVE exactly 300 s after their `created_at`. Idempotent: never
 * touches docs already ACTIVE/REJECTED.
 *
 * Supabase is storage-only for the platform; access/credits automation on
 * Supabase Postgres is not deployed from this bundle (see legacy-supabase-jobs/).
 *
 * Deploy (from `firebase/`):
 *   firebase deploy --only functions:approvalBotTick,functions:approvalBotRunNow
 * After removing legacy exports, delete stale remote functions once:
 *   firebase functions:delete accessBotTick accessBotRunNow creditsDailyReset
 * See `firebase/functions/README.md`.
 */
export const approvalBotTick = onSchedule(
  {
    schedule: "every 1 minutes",
    timeZone: "Asia/Kathmandu",
    retryCount: 1,
  },
  async () => {
    const summary = await approvePendingProfiles();
    logger.info("[approvalBotTick] cycle", summary);
  },
);

/**
 * Manual / health trigger for the Firebase approval bot. When
 * ACCESS_BOT_RUN_KEY is set, require header `x-access-bot-key` to match.
 */
export const approvalBotRunNow = onRequest(
  { cors: false },
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
      const summary = await approvePendingProfiles();
      res.json({ ok: true, ...summary });
    } catch (err) {
      logger.error("approvalBotRunNow failed", err);
      res.status(500).json({
        ok: false,
        error: err instanceof Error ? err.message : "unknown",
      });
    }
  },
);