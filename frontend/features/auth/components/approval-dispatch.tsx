"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "./auth-shell";
import { VerifyingStatus } from "./verifying-status";
import { useLiveApprovalRoute } from "../use-live-approval-route";

/**
 * `/welcome` dispatcher — opens the screen that live account-status returns.
 */
export function ApprovalDispatch() {
  const router = useRouter();
  const liveRoute = useLiveApprovalRoute();

  useEffect(() => {
    if (!liveRoute) return;
    router.replace(liveRoute);
  }, [liveRoute, router]);

  return (
    <AuthShell
      title="Checking your account"
      subtitle="Confirming live approval status with the server."
    >
      <div className="flex justify-center py-4" data-testid="approval-dispatch">
        <VerifyingStatus compact label="Checking your account status" />
      </div>
    </AuthShell>
  );
}
