"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePendingSignup } from "@/features/auth/use-pending-signup";
import {
  deviceApprovalRoute,
  NORMAL_ROUTE,
} from "@/features/auth/pending-signup-identity";

/**
 * Guest welcome primary CTA.
 *
 * HARDCODED device routing (owner 2026-11-12):
 *   - no signup on device → /signup
 *   - otherwise → this device's approval screen (waiting / approved / rejected)
 */
export function WelcomeGoButton() {
  const pending = usePendingSignup();
  const href =
    pending === null
      ? "/signup"
      : deviceApprovalRoute() === NORMAL_ROUTE
        ? "/signup"
        : deviceApprovalRoute();
  const label =
    href === "/signup" ? "Go — create account" : "Go — check approval status";

  return (
    <Link
      href={href}
      aria-label={label}
      data-testid="welcome-go"
      data-pending={pending === true ? "true" : "false"}
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
