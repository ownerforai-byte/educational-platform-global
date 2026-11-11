import { DAILY_CREDIT_POOL } from "../../utils/credits.js";

/** Default starter balance for a newly approved student profile. */
export const DEFAULT_STARTER_CREDITS = DAILY_CREDIT_POOL;

export const DEV_CREDIT_GRANTS = [
  {
    user_id: "00000000-0000-4000-8000-000000000002",
    amount: 4,
    type: "GRANT" as const,
    reason: "Dev seed — plus tier bonus",
  },
] as const;
