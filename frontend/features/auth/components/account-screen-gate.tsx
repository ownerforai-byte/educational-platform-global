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
  DENIED_ROUTE,
  NORMAL_ROUTE,
  WAITING_ROUTE,
  clearPendingSignup,
} from "../pending-signup-identity";
import { useLiveApprovalRoute } from "../use-live-approval-route";

/**
 * Four welcome screens — shown only after live account-status confirms them.
 * Visiting the wrong URL is corrected from the API, not from local cookies.
 */

function CheckingScreen() {
  return (
    <AuthShell
      title="Checking your account"
      subtitle="Confirming account status."
    >
      <div className="flex justify-center py-4">
        <VerifyingStatus compact label="Checking your account status" />
      </div>
    </AuthShell>
  );
}

/** Redirect when live status says this URL is the wrong screen. */
function useLiveScreenGate(expectedRoute: string) {
  const router = useRouter();
  const liveRoute = useLiveApprovalRoute();

  useEffect(() => {
    if (!liveRoute) return;
    if (liveRoute !== expectedRoute) router.replace(liveRoute);
  }, [liveRoute, expectedRoute, router]);

  return liveRoute;
}

/** /welcome/pending — only when live access_status is PENDING. */
export function WelcomeApprovalScreen({ waiting }: { waiting: ReactNode }) {
  const liveRoute = useLiveScreenGate(WAITING_ROUTE);
  if (!liveRoute || liveRoute !== WAITING_ROUTE) return <CheckingScreen />;

  return (
    <AuthShell
      title="Your account is on its way"
      subtitle="After signing, the account is approved by the system verification and administrative approval."
    >
      <LoggedInRedirect />
      {waiting}
    </AuthShell>
  );
}

/** /welcome/no-account — only when live status finds no signup. */
export function NoAccountScreen() {
  const liveRoute = useLiveScreenGate(NORMAL_ROUTE);
  if (!liveRoute || liveRoute !== NORMAL_ROUTE) return <CheckingScreen />;

  return (
    <AuthShell
      title="No active account found"
      subtitle="No account is linked to this browser yet."
    >
      <LoggedInRedirect />
      <NoAccountCard />
    </AuthShell>
  );
}

/** /welcome/approved — only when live access_status is ACTIVE. */
export function ApprovedScreen() {
  const liveRoute = useLiveScreenGate(APPROVED_ROUTE);
  if (!liveRoute || liveRoute !== APPROVED_ROUTE) return <CheckingScreen />;

  return (
    <AuthShell
      title="Access granted"
      subtitle="Sign in to open the library."
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
            Sign in to continue.
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

/** /welcome/denied — only when live access_status is REJECTED (denied). */
export function DeniedScreen() {
  const liveRoute = useLiveScreenGate(DENIED_ROUTE);
  if (!liveRoute || liveRoute !== DENIED_ROUTE) return <CheckingScreen />;

  return (
    <AuthShell
      title="Access denied"
      subtitle="Live status for this signup is denied."
    >
      <div className="space-y-5" data-testid="denied-account-card">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/[0.06] p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-background shadow-sm">
            <ShieldAlert className="h-5 w-5 text-destructive" />
          </span>
          <h2 className="text-base font-extrabold tracking-tight text-foreground">
            Access was denied
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            This account was denied. You can keep browsing as a guest, or create
            a new account now. Leave a message to sahrocky81@gmail.com if you
            believe this is a mistake.
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
            onClick={() => clearPendingSignup()}
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

/** @deprecated Use DeniedScreen */
export const RejectedScreen = DeniedScreen;
