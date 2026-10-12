import { supabaseAdmin } from "../db/supabase";
import { OWNER_EMAILS } from "../middleware/auth";

/**
 * OWNER INDEPENDENCE (owner policy 2026-10-12: "make all owner emails
 * independent (means no one email can remove other email or change their
 * position ----hardcode it)").
 *
 * Every owner-allowlisted account is untouchable by EVERY caller — including
 * another owner. The protection is HARDCODED against the OWNER_EMAILS
 * allowlist in middleware/auth.ts (mirrored on the frontend in lib/owner.ts):
 * no request body, role grant or settings toggle can route around it.
 *
 * Two independent signals make a target protected:
 *   1. its auth email is on the hardcoded allowlist, or
 *   2. its profile role is "OWNER" (so an owner demoted in the DB before this
 *      guard existed still cannot be finished off by a second owner).
 *
 * Guarded operations: DELETE (remove), role change (reposition), access
 * status change (suspend/reject = removal of access). Credit grants and
 * premium flags are deliberately NOT guarded — they change nothing about
 * standing.
 */

export interface OwnerTargetGuard {
  protectedTarget: boolean;
  reason?: string;
}

const PROTECTED_REASON =
  "Owner accounts are independent — no owner can remove, demote or suspend another owner.";

export async function isProtectedOwnerTarget(
  userId: string,
): Promise<OwnerTargetGuard> {
  try {
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(
      userId,
    );
    const email = authUser?.user?.email?.trim().toLowerCase();
    if (email && OWNER_EMAILS.has(email)) {
      return { protectedTarget: true, reason: PROTECTED_REASON };
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();
    if ((profile?.role ?? "").toUpperCase() === "OWNER") {
      return { protectedTarget: true, reason: PROTECTED_REASON };
    }
  } catch (err) {
    // Fail CLOSED: if the guard cannot verify the target, treat it as
    // protected — a blocked admin action is recoverable, a deleted owner is not.
    console.error(
      "[owner-guard] could not verify target, failing closed:",
      err instanceof Error ? err.message : err,
    );
    return {
      protectedTarget: true,
      reason:
        "Owner protection could not be verified — refusing the destructive action.",
    };
  }

  return { protectedTarget: false };
}
