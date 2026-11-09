"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LoggedInRedirect } from "@/app/login/logged-in-redirect";
import { AuthShell } from "./auth-shell";
import { NoAccountCard } from "./no-account-card";
import { VerifyingStatus } from "./verifying-status";
import {
  NO_ACCOUNT_ROUTE,
  WAITING_APPROVAL_ROUTE,
} from "../pending-signup-identity";
import { usePendingSignup } from "../use-pending-signup";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Owner request 2026-11-08 — TWO approval-status screens, decided by the
 * HARDCODED pending-signup identity (features/auth/pending-signup-identity.ts).
 * ═══════════════════════════════════════════════════════════════════════════
 *   /welcome             → ONLY a browser that CREATED an account and is
 *                          waiting for approval ("Your account is on its way")
 *   /welcome/no-account  → a browser with NO account record
 *
 * The identity is mirrored in localStorage + sessionStorage + a 7-day cookie,
 * so a refresh, a new tab or a cleared store cannot remove it. Both screens
 * read the SAME hardcoded identifier and converge on the correct page — a
 * direct visit to either URL is corrected, with a neutral "checking" state
 * shown in the meantime so nobody sees the wrong headline on first paint.
 * ═══════════════════════════════════════════════════════════════════════════
 */

function CheckingScreen() {
  return (
    <AuthShell
      title="Checking your account"
      subtitle="Hold on while we look up your signup record."
    >
      <div className="flex justify-center py-4">
        <VerifyingStatus compact label="Checking your account status" />
      </div>
    </AuthShell>
  );
}

/** /welcome — the waiting-for-approval screen. Pending signups ONLY. */
export function WelcomeApprovalScreen({ waiting }: { waiting: ReactNode }) {
  const router = useRouter();
  const hasAccount = usePendingSignup();

  useEffect(() => {
    if (hasAccount === false) router.replace(NO_ACCOUNT_ROUTE);
  }, [hasAccount, router]);

  // Never render "Your account is on its way" before the identity is resolved.
  if (hasAccount !== true) return <CheckingScreen />;

  return (
    <AuthShell
      title="Your account is on its way"
      subtitle="Account created — track your access status here. You'll be able to sign in after administrative and system approval."
    >
      <LoggedInRedirect />
      {waiting}
    </AuthShell>
  );
}

/** /welcome/no-account — the second screen, for visitors with no account. */
export function NoAccountScreen() {
  const router = useRouter();
  const hasAccount = usePendingSignup();

  useEffect(() => {
    if (hasAccount === true) router.replace(WAITING_APPROVAL_ROUTE);
  }, [hasAccount, router]);

  // A pending signup never sees "no account": bounce it to the waiting page.
  if (hasAccount !== false) return <CheckingScreen />;

  return (
    <AuthShell
      title="No active account found"
      subtitle="Check the status of an account that has already been created."
    >
      <LoggedInRedirect />
      <NoAccountCard />
    </AuthShell>
  );
}
