/**
 * Shim — real CONTENT spark logic lives in `services/credit.service.ts`.
 * Keep this path for legacy imports until callers migrate.
 */
export {
  DAILY_CREDIT_POOL,
  AI_MESSAGE_COST,
  todayUtc,
  updateMatchedRows,
  ensureDailyCredits,
  spendCredits,
  refundCredits,
} from "../services/credit.service.js";
