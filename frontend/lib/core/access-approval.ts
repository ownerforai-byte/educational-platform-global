import { getPublicEnv } from "@/lib/env";
import { tierHomePathFor, tierWelcomePathFor } from "@/lib/core/access-level";
import type { AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";

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
  return tierHomePathFor({ role: "member", plan: "member" } as AiSparkUserLike);
}

/**
 * After sign-in/sign-up: skip welcome interstitials when approval is off and
 * open the tier study home (/home/member for new accounts).
 */
export function postAuthLandingPath(user?: AiSparkUserLike | null): string {
  if (!isAccessApprovalRequired()) {
    return user ? tierHomePathFor(user) : defaultMemberHomePath();
  }
  return tierWelcomePathFor(user);
}