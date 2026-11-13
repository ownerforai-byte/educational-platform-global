import { isOwnerEmail } from "../middleware/auth.js";
import { upsertProfileFields } from "../db/repositories/user.repository.js";

/**
 * Ensure a `profiles` row exists for a Firebase (or any) auth uid on first login.
 * Supabase's `handle_new_user` trigger is deprecated when `USE_FIREBASE_AUTH=true`.
 */
export async function ensureAuthProfile(
  userId: string,
  options: {
    email?: string | null;
    fullName?: string | null;
    /** First-time signup path — applies pending/owner tier defaults. */
    isSignup?: boolean;
  } = {},
): Promise<void> {
  const owner = isOwnerEmail(options.email);
  const fields: Record<string, unknown> = {
    id: userId,
    full_name: options.fullName?.trim() || null,
  };

  if (options.isSignup) {
    Object.assign(
      fields,
      owner
        ? {
            access_status: "ACTIVE",
            role: "owner",
            plan: "pro",
            premium_status: true,
          }
        : {
            access_status: "PENDING",
            role: "member",
            plan: "member",
            premium_status: false,
          },
    );
  }

  const { error } = await upsertProfileFields(userId, fields);
  if (error) {
    const msg = error.message.toLowerCase();
    if (!msg.includes("duplicate") && !msg.includes("unique")) {
      console.error("[auth] ensureAuthProfile failed:", error.message);
    }
  }
}
