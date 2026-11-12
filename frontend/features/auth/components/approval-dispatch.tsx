"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "./auth-shell";
import { VerifyingStatus } from "./verifying-status";
import { deviceApprovalRoute } from "../pending-signup-identity";
import { usePendingSignup } from "../use-pending-signup";

/**
 * `/welcome` dispatcher — not one of the four content screens.
 * After hydration, sends this device to normal / pending / approved / rejected.
 */
export function ApprovalDispatch() {
  const router = useRouter();
  const hydrated = usePendingSignup() !== null;

  useEffect(() => {
    if (!hydrated) return;
    router.replace(deviceApprovalRoute());
  }, [hydrated, router]);

  return (
    <AuthShell
      title="Checking your account"
      subtitle="Opening the right status screen for this device."
    >
      <div className="flex justify-center py-4" data-testid="approval-dispatch">
        <VerifyingStatus compact label="Checking your account status" />
      </div>
    </AuthShell>
  );
}
