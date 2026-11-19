"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  APPROVED_ROUTE,
  DENIED_ROUTE,
  WAITING_ROUTE,
  readStatusToken,
} from "../pending-signup-identity";
import { useLiveApprovalRoute } from "../use-live-approval-route";
import { VerifyingStatus } from "./verifying-status";

type Mode = "login" | "signup";

/**
 * Created accounts never sit on login/signup while still PENDING.
 *   PENDING  → /welcome/pending
 *   DENIED   → login opens denied screen; signup stays (new account after denial)
 *   ACTIVE   → signup opens sign-in; login stays (sign in → tier home)
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
  // Visitors without a device signup token must never sit behind a live
  // account-status poll — a cold backend or 5xx on /account-status used to
  // leave login/signup on "Checking your account status" forever while email,
  // Google, and password flows stayed unreachable.
  const hasSignupToken = Boolean(readStatusToken());
  const live = useLiveApprovalRoute();

  if (!hasSignupToken) {
    return <>{children}</>;
  }

  useEffect(() => {
    if (!live) return;
    if (mode === "login") {
      if (live === WAITING_ROUTE) router.replace(WAITING_ROUTE);
      if (live === DENIED_ROUTE) router.replace(DENIED_ROUTE);
      return;
    }
    // Signup: account already exists on this device — never show Create Account again.
    if (live === WAITING_ROUTE) router.replace(WAITING_ROUTE);
    if (live === APPROVED_ROUTE) router.replace("/login");
  }, [live, mode, router]);

  if (!live) {
    return (
      <div className="flex justify-center py-6">
        <VerifyingStatus compact label="Checking your account status" />
      </div>
    );
  }

  if (mode === "login") {
    if (live === WAITING_ROUTE) {
      return (
        <div className="flex justify-center py-6">
          <VerifyingStatus compact label="Opening your account status" />
        </div>
      );
    }
    if (live === DENIED_ROUTE) {
      return (
        <div className="flex justify-center py-6">
          <VerifyingStatus compact label="Opening denied screen" />
        </div>
      );
    }
    return <>{children}</>;
  }

  // signup + device token
  if (live === WAITING_ROUTE) {
    return (
      <div className="flex justify-center py-6">
        <VerifyingStatus compact label="Opening your account status" />
      </div>
    );
  }
  if (live === APPROVED_ROUTE) {
    return (
      <div className="flex justify-center py-6">
        <VerifyingStatus compact label="Opening sign in" />
      </div>
    );
  }
  if (live === DENIED_ROUTE) {
    return <>{children}</>;
  }

  return <>{children}</>;
}