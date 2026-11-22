import { vi } from "vitest";

/** Approval-queue suites assume owner gate on (prod default is off). */
export function stubAccessApprovalRequired(): void {
  vi.stubEnv("ACCESS_APPROVAL_REQUIRED", "true");
}

export function restoreAccessApprovalEnv(): void {
  vi.unstubAllEnvs();
}