"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NORMAL_ROUTE } from "@/features/auth/pending-signup-identity";
import { useLiveApprovalRoute } from "@/features/auth/use-live-approval-route";

/**
 * Guest welcome primary CTA — href follows live approval status.
 *   - no live signup → /signup
 *   - otherwise → the confirmed welcome screen
 */
export function WelcomeGoButton() {
  const liveRoute = useLiveApprovalRoute();
  const href =
    !liveRoute || liveRoute === NORMAL_ROUTE ? "/signup" : liveRoute;
  const label =
    href === "/signup" ? "Go — create account" : "Go — check approval status";
  const pending = Boolean(liveRoute && liveRoute !== NORMAL_ROUTE);

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
