/**
 * Owner approval gate (signup → PENDING until ACTIVE in owner console).
 * Disabled by default for now: flip with ACCESS_APPROVAL_REQUIRED=true to restore
 * the waiting screen + access-request bot without removing any approval code.
 */
export function isAccessApprovalRequired(): boolean {
  const raw = process.env.ACCESS_APPROVAL_REQUIRED?.trim().toLowerCase();
  if (raw === "true" || raw === "1" || raw === "yes") return true;
  if (raw === "false" || raw === "0" || raw === "no") return false;
  return false;
}

export function memberSignupAccessStatus(): "PENDING" | "ACTIVE" {
  return isAccessApprovalRequired() ? "PENDING" : "ACTIVE";
}