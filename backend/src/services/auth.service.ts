import { ensureDailyCredits } from "../utils/credits.js";
import { getProfileAccessRow } from "../db/repositories/user.repository.js";

/** Refresh the daily content spark pool after sign-in / session bootstrap. */
export async function syncSessionCredits(
  userId: string,
  email?: string | null,
  role?: string | null,
  premiumStatus?: boolean | null,
) {
  return ensureDailyCredits(userId, email, role, premiumStatus);
}

export async function loadAccessFlags(userId: string) {
  return getProfileAccessRow(userId);
}
