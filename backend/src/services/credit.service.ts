/**
 * Business rules for the CONTENT spark pool (`profiles.credits`).
 * Low-level CAS writes live in `utils/credits.ts` today; repositories are
 * ready for a future in-place migration of those helpers.
 */
export {
  DAILY_CREDIT_POOL,
  AI_MESSAGE_COST,
  todayUtc,
  updateMatchedRows,
  ensureDailyCredits,
  spendCredits,
  refundCredits,
} from "../utils/credits.js";

export { readProfileCredits, readCreditsBalance } from "../db/repositories/credit.repository.js";
