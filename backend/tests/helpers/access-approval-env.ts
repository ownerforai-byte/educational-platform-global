import { vi } from "vitest";

/**
 * The approval gate is retired (owner decision): every signup is ACTIVE on
 * the member plan and no environment flag changes that. These helpers remain
 * as no-ops so the suites that used to stub the gate keep running; their
 * gate-on assertions have been updated to the retired-gate reality.
 */
export function stubAccessApprovalRequired(): void {
  vi.stubEnv("ACCESS_APPROVAL_REQUIRED", "false");
}

export function restoreAccessApprovalEnv(): void {
  vi.unstubAllEnvs();
}
