"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  LogIn,
  ShieldAlert,
} from "lucide-react";
import { LoggedInRedirect } from "@/app/login/logged-in-redirect";
import { AuthShell } from "./auth-shell";
import { NoAccountCard } from "./no-account-card";
import { VerifyingStatus } from "./verifying-status";
import {
  APPROVED_ROUTE,
  NORMAL_ROUTE,
  REJECTED_ROUTE,
  WAITING_ROUTE,
  deviceApprovalRoute,
} from "../pending-signup-identity";
import { usePendingSignup } from "../use-pending-signup";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Four HARDCODED device screens (owner 2026-11-12).
 * ═══════════════════════════════════════════════════════════════════════════
 *   NORMAL   /welcome/no-account → device never created an account
 *   WAITING  /welcome/pending    → PENDING (token on device)
 *   APPROVED /welcome/approved   → ACTIVE outcome on device
 *   REJECTED /welcome/rejected   → REJECTED outcome on device
 *
 * `/welcome` is a dispatcher only. Visiting the wrong URL is corrected.
 * ═══════════════════════════════════════════════════════════════════════════
 */

function CheckingScreen() {
  return (
    <AuthShell
      title="Checking your account"
      subtitle="Hold on while we look up your signup record on this device."
    >
      <div className="flex justify-center py-4">
        <VerifyingStatus compact label="Checking your account status" />
      </div>
    </AuthShell>
  );
}

/** Redirect this device to its hardcoded screen when the URL does not match. */
function useDeviceScreenGate(expectedRoute: string) {
  const router = useRouter();
  const hydrated = usePendingSignup() !== null;

  useEffect(() => {
    if (!hydrated) return;
    const target = deviceApprovalRoute();
    if (target !== expectedRoute) router.replace(target);
  }, [hydrated, expectedRoute, router]);

  return hydrated;
}

/** /welcome/pending — WAITING (PENDING) only. */
export function WelcomeApprovalScreen({ waiting }: { waiting: ReactNode }) {
  const ready = useDeviceScreenGate(WAITING_ROUTE);
  if (!ready) return <CheckingScreen />;
  if (deviceApprovalRoute() !== WAITING_ROUTE) return <CheckingScreen />;

  return (
    <AuthShell
      title="Your account is on its way"
      subtitle="Account created on this device — track live approval here. Sign in after administrative and system approval."
    >
      <LoggedInRedirect />
      {waiting}
    </AuthShell>
  );
}

/** /welcome/no-account — NORMAL (no signup on this device). */
export function NoAccountScreen() {
  const ready = useDeviceScreenGate(NORMAL_ROUTE);
  if (!ready) return <CheckingScreen />;
  if (deviceApprovalRoute() !== NORMAL_ROUTE) return <CheckingScreen />;

  return (
    <AuthShell
      title="No active account found"
      subtitle="This device has no signup record waiting for approval."
    >
      <LoggedInRedirect />
      <NoAccountCard />
    </AuthShell>
  );
}

/** /welcome/approved — APPROVED (ACTIVE on this device). */
export function ApprovedScreen() {
  const ready = useDeviceScreenGate(APPROVED_ROUTE);
  if (!ready) return <CheckingScreen />;
  if (deviceApprovalRoute() !== APPROVED_ROUTE) return <CheckingScreen />;

  return (
    <AuthShell
      title="Access granted"
      subtitle="This device's account was approved. Sign in to open the library."
    >
      <LoggedInRedirect />
      <div className="space-y-5" data-testid="approved-account-card">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-background shadow-sm">
            <BadgeCheck className="h-5 w-5 text-emerald-500" />
          </span>
          <h2 className="text-base font-extrabold tracking-tight text-foreground">
            Your account is approved
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Administrative and system approval is complete for the account created
            on this device. Sign in to continue.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/login"
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
          >
            <LogIn className="h-4 w-4" />
            Sign in now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

/** /welcome/rejected — REJECTED on this device. */
export function RejectedScreen() {
  const ready = useDeviceScreenGate(REJECTED_ROUTE);
  if (!ready) return <CheckingScreen />;
  if (deviceApprovalRoute() !== REJECTED_ROUTE) return <CheckingScreen />;

  return (
    <AuthShell
      title="Account not approved"
      subtitle="This device's account was not granted access."
    >
      <div className="space-y-5" data-testid="rejected-account-card">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/[0.06] p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-background shadow-sm">
            <ShieldAlert className="h-5 w-5 text-destructive" />
          </span>
          <h2 className="text-base font-extrabold tracking-tight text-foreground">
            Access was not approved
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            The account created on this device was rejected. You can keep browsing
            as a guest, or create a new account later. Leave a message to
            sahrocky81@gmail.com if you believe this is a mistake.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
          >
            Continue to the app
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border/70 bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/60"
          >
            <GraduationCap className="h-4 w-4" />
            Create a new account
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
