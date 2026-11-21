import { getPublicEnv } from "@/lib/env";
import { TIER_HOME_PATHS } from "@/lib/core/access-level";

/**
 * Matches backend ACCESS_APPROVAL_REQUIRED (default off). When false, welcome
 * / pending flows stay in the repo but route to member home instead.
 */
export function isAccessApprovalRequired(): boolean {
  const raw = getPublicEnv().NEXT_PUBLIC_ACCESS_APPROVAL_REQUIRED?.trim().toLowerCase();
  if (raw === "true" || raw === "1" || raw === "yes") return true;
  if (raw === "false" || raw === "0" || raw === "no") return false;
  return false;
}

/** Default post-auth landing when owner approval queue is disabled. */
export function defaultMemberHomePath(): string {
  return TIER_HOME_PATHS.member;
}