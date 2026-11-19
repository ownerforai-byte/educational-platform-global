import { logger } from "firebase-functions";

/** Legacy shape kept for any stale callers / deploy scripts. */
export interface ApprovalSummary {
  scanned: number;
  approved: number;
  skipped: number;
  errors: number;
  notified: number;
  notifyErrors: number;
}

/**
 * Auto-approval removed (2026-11-19). New accounts stay PENDING until the
 * owner console sets `access_status` to ACTIVE (same dual-write as the API).
 */
export async function approvePendingProfiles(): Promise<ApprovalSummary> {
  const summary: ApprovalSummary = {
    scanned: 0,
    approved: 0,
    skipped: 0,
    errors: 0,
    notified: 0,
    notifyErrors: 0,
  };
  logger.info("approvePendingProfiles: disabled (manual owner approval only)");
  return summary;
}