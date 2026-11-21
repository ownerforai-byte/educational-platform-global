import { apiFetch } from "@/lib/api-client";
import {
  defaultMemberHomePath,
  isAccessApprovalRequired,
} from "@/lib/core/access-approval";
import {
  APPROVED_ROUTE,
  NORMAL_ROUTE,
  DENIED_ROUTE,
  WAITING_ROUTE,
  type AccessOutcome,
  clearPendingSignup,
  readAccessOutcome,
  readStatusToken,
  rememberAccessOutcome,
} from "./pending-signup-identity";

/**
 * Map a live access_status to one of the four welcome screens.
 * Never invents PENDING/ACTIVE/REJECTED from local cookies alone.
 * REJECTED access_status opens the Denied screen.
 */
export function routeForLiveAccess(status: AccessOutcome): string {
  if (status === "REJECTED") return DENIED_ROUTE;
  if (!isAccessApprovalRequired()) {
    return defaultMemberHomePath();
  }
  if (status === "ACTIVE") return APPROVED_ROUTE;
  return WAITING_ROUTE;
}

/**
 * Ask the API which welcome screen this browser should see.
 *
 *   - no status token → NORMAL (and wipe any stale outcome cookies)
 *   - live PENDING    → WAITING
 *   - live ACTIVE     → APPROVED
 *   - live REJECTED   → DENIED
 *   - token dead/gone → clear local identity → NORMAL
 *
 * Throws only on transient network/server failures so callers can keep
 * showing the checking state and retry.
 */
/**
 * Best-effort route when live account-status cannot be reached after retries.
 * Token present → waiting screen (signup still in flight); otherwise normal.
 */
export function resolveLiveApprovalRouteFallback(): string {
  if (!readStatusToken()) return NORMAL_ROUTE;
  const outcome = readAccessOutcome();
  if (outcome === "REJECTED") return DENIED_ROUTE;
  if (!isAccessApprovalRequired()) return defaultMemberHomePath();
  if (outcome === "ACTIVE") return APPROVED_ROUTE;
  return WAITING_ROUTE;
}

export async function resolveLiveApprovalRoute(): Promise<string> {
  const token = readStatusToken();
  if (!token) {
    // Outcome cookies left after deleted accounts must not open approved/pending.
    if (readAccessOutcome()) clearPendingSignup();
    return NORMAL_ROUTE;
  }

  try {
    const res = await apiFetch<{
      accessStatus: AccessOutcome;
      fullName?: string | null;
    }>(`/api/auth/account-status?token=${encodeURIComponent(token)}`);
    rememberAccessOutcome(res.accessStatus);
    return routeForLiveAccess(res.accessStatus);
  } catch (err) {
    const status = (err as { status?: number }).status;
    if (status === 401 || status === 404) {
      clearPendingSignup();
      return NORMAL_ROUTE;
    }
    throw err;
  }
}
