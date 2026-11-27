"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  APPROVED_ROUTE,
  NORMAL_ROUTE,
} from "@/features/auth/pending-signup-identity";
import { useLiveApprovalRoute } from "@/features/auth/use-live-approval-route";
import { isAccessApprovalRequired } from "@/lib/core/access-approval";

/**
 * Guest welcome primary CTA — href follows live approval status.
 *   - no live signup → /signup
 *   - approved → /login (plan home is after sign-in)
 *   - otherwise → the confirmed welcome screen
 */
export function WelcomeGoButton() {
  const liveRoute = useLiveApprovalRoute();
  const approvalRequired = isAccessApprovalRequired();
  const href = !approvalRequired
    ? "/signup"
    : !liveRoute || liveRoute === NORMAL_ROUTE
      ? "/signup"
      : liveRoute === APPROVED_ROUTE
        ? "/login"
        : liveRoute;
  const label =
    href === "/signup"
      ? "Go — create account"
      : href === "/login"
        ? "Go — sign in to your plan"
        : "Go — check account status";
  const pending = Boolean(
    approvalRequired &&
      liveRoute &&
      liveRoute !== NORMAL_ROUTE &&
      liveRoute !== APPROVED_ROUTE,
  );

  return (
    <Link
      href={href}
      aria-label={label}
      data-testid="welcome-go"
      data-pending={pending ? "true" : "false"}
      className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90"
    >
      Go
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
