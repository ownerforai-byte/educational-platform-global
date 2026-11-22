import {
  getProfileById,
  updateProfileFields,
  upsertProfileFields,
} from "../db/repositories/user.repository.js";
import { readProfileDoc } from "../storage/firebase-store.js";
import { isOwnerEmail } from "../middleware/auth.js";

/**
 * Ensure a `profiles` doc exists for a Firebase (or any) auth uid on first
 * login. Supabase's `handle_new_user` trigger is deprecated when
 * `USE_FIREBASE_AUTH=true`.
 *
 * Firestore `profiles` (doc id = uid) is the contract store for access fields.
 * New signups default to member ACTIVE — the approval gate is retired (owner
 * decision); only a legacy REJECTED state carries over.
 */
export async function ensureAuthProfile(
  userId: string,
  options: {
    email?: string | null;
    fullName?: string | null;
    /** First-time signup path — applies the member/owner tier defaults. */
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
    // Contract fields on create: the approval bot discovered PENDING docs by
    // `access_status` aged by `created_at`, so both must exist. The approval
    // gate is retired (owner decision): a new account is ACTIVE. A decisive
    // legacy REJECTED state carries over instead of being reset.
    fields.access_status = carriedStatus === "REJECTED" ? "REJECTED" : "ACTIVE";
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
            access_status: "ACTIVE",
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

/**
 * When owner approval is off, every non-owner session uses the member baseline
 * (ACTIVE + member plan). Owner upgrades tiers later from the console.
 */
export async function alignNonOwnerToMemberBaseline(
  userId: string,
  email?: string | null,
): Promise<void> {
  if (isOwnerEmail(email)) return;
  if (userId === "rn-study-assistant") return;
  const { error } = await updateProfileFields(userId, {
    access_status: "ACTIVE",
    role: "member",
    plan: "member",
    premium_status: false,
  });
  if (error) {
    console.error("[auth] alignNonOwnerToMemberBaseline failed:", error.message);
  }
}
