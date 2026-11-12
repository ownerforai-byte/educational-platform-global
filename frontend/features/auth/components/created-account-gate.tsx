"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  APPROVED_ROUTE,
  DENIED_ROUTE,
  WAITING_ROUTE,
} from "../pending-signup-identity";
import { useLiveApprovalRoute } from "../use-live-approval-route";
import { VerifyingStatus } from "./verifying-status";

type Mode = "login" | "signup";

/**
 * Created accounts never sit on login/signup while still PENDING.
 *   PENDING  → /welcome/pending
 *   DENIED   → login opens denied screen; signup stays (new account after denial)
 *   ACTIVE   → login stays (sign in); signup goes to /welcome/approved
 *   none     → stay on the form
 */
export function CreatedAccountGate({
  mode,
  children,
}: {
  mode: Mode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const live = useLiveApprovalRoute();

  useEffect(() => {
    if (!live) return;
    if (live === WAITING_ROUTE) {
      router.replace(WAITING_ROUTE);
      return;
    }
    if (mode === "login" && live === DENIED_ROUTE) {
      router.replace(DENIED_ROUTE);
      return;
    }
    if (mode === "signup" && live === APPROVED_ROUTE) {
      router.replace(APPROVED_ROUTE);
    }
  }, [live, mode, router]);

  if (!live) {
    return (
      <div className="flex justify-center py-6">
        <VerifyingStatus compact label="Checking your account status" />
      </div>
    );
  }

  if (live === WAITING_ROUTE) {
    return (
      <div className="flex justify-center py-6">
        <VerifyingStatus compact label="Opening your account status" />
      </div>
    );
  }

  if (mode === "login" && live === DENIED_ROUTE) {
    return (
      <div className="flex justify-center py-6">
        <VerifyingStatus compact label="Opening denied screen" />
      </div>
    );
  }

  if (mode === "signup" && live === APPROVED_ROUTE) {
    return (
      <div className="flex justify-center py-6">
        <VerifyingStatus compact label="Opening approved screen" />
      </div>
    );
  }

  return <>{children}</>;
}
