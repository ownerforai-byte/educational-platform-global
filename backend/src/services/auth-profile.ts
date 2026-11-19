import { isOwnerEmail } from "../middleware/auth.js";
import {
  getProfileById,
  updateProfileFields,
  upsertProfileFields,
} from "../db/repositories/user.repository.js";
import { readProfileDoc } from "../storage/firebase-store.js";

/** Must match `APPROVAL_DELAY_MS` in firebase/functions approval bot (300 s). */
export const APPROVAL_DELAY_MS = 300_000;

function createdAtMillis(value: unknown): number | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const ms = Date.parse(value.trim());
  return Number.isFinite(ms) ? ms : null;
}

/**
 * When the Firebase scheduler is down or a profile never landed in Firestore,
 * promote PENDING → ACTIVE once `created_at` is at least 5 minutes old — same
 * rule as `approvePendingProfiles`. Idempotent; never touches REJECTED.
 */
export async function promoteDuePendingProfile(userId: string): Promise<boolean> {
  const { data } = await getProfileById(userId, "access_status, created_at");
  if (!data) return false;
  const status = typeof data.access_status === "string" ? data.access_status : null;
  if (status === "ACTIVE" || status === "REJECTED") return false;
  const createdMs = createdAtMillis(data.created_at);
  if (createdMs === null) return false;
  if (Date.now() - createdMs < APPROVAL_DELAY_MS) return false;

  const { error } = await updateProfileFields(userId, { access_status: "ACTIVE" });
  if (error) {
    console.error("[auth] promoteDuePendingProfile failed:", error.message);
    return false;
  }
  return true;
}

/**
 * Ensure a `profiles` doc exists for a Firebase (or any) auth uid on first
 * login. Supabase's `handle_new_user` trigger is deprecated when
 * `USE_FIREBASE_AUTH=true`.
 *
 * Firestore `profiles` (doc id = uid) is the contract store shared with the
 * auto-approval Cloud Function (firebase/functions): new signups are created
 * with `access_status: "PENDING"` and `created_at = now`, and the bot flips
 * them to "ACTIVE" 300s after `created_at`.
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
  const fullName = options.fullName?.trim() || null;
  const email = options.email?.trim() || null;

  // Doc presence decides whether this is a contract "create"; the legacy
  // Supabase row carries over state for not-yet-migrated accounts.
  const [doc, legacy] = await Promise.all([
    readProfileDoc(userId).catch(() => null),
    getProfileById(userId, "access_status, created_at").catch(() => ({ data: null, error: null })),
  ]);
  const creating = !doc;
  const legacyRow = legacy.data ?? null;
  const carriedStatus = typeof legacyRow?.access_status === "string" ? legacyRow.access_status : null;
  const carriedCreatedAt =
    typeof legacyRow?.created_at === "string" && legacyRow.created_at ? legacyRow.created_at : null;
  const knownCreatedAt =
    (typeof doc?.created_at === "string" && doc.created_at ? doc.created_at : null) ??
    carriedCreatedAt;

  const fields: Record<string, unknown> = { id: userId };
  // Never clobber an existing display name/email with null on later logins.
  if (fullName || creating) fields.full_name = fullName;
  if (email || creating) fields.email = email;

  if (creating) {
    // Contract fields on create: the approval bot discovers PENDING docs by
    // `access_status` aged by `created_at`, so both must exist. Decisive
    // legacy states (ACTIVE/REJECTED) carry over instead of being reset.
    fields.access_status = owner
      ? "ACTIVE"
      : carriedStatus === "ACTIVE" || carriedStatus === "REJECTED"
        ? carriedStatus
        : "PENDING";
    fields.created_at = knownCreatedAt ?? new Date().toISOString();
    fields.role = owner ? "owner" : "member";
    fields.plan = owner ? "pro" : "member";
    fields.premium_status = owner ? true : false;
  }

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
    // Stamp created_at only when never known — never restart the bot clock.
    if (!knownCreatedAt) fields.created_at = new Date().toISOString();
  }

  const { error } = await upsertProfileFields(userId, fields);
  if (error) {
    const msg = error.message.toLowerCase();
    if (!msg.includes("duplicate") && !msg.includes("unique")) {
      console.error("[auth] ensureAuthProfile failed:", error.message);
    }
  }
}
