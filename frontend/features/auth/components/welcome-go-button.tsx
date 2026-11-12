"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePendingSignup } from "@/features/auth/use-pending-signup";
import { WAITING_APPROVAL_ROUTE } from "@/features/auth/pending-signup-identity";

/**
 * Guest welcome primary CTA — for everyone except owner Gmail direct login.
 *
 * Flow (owner 2026-11-12):
 *   Owner (sahrocky81@gmail.com) → Sign in on welcome (direct, no pending)
 *   Everyone else:
 *     guest → welcome → Go →
 *       new browser      → /signup (account creation)
 *       known pending id → /welcome (created successfully / awaiting approval)
 *     after approval + Sign in → member welcome → Go → member home
 */
export function WelcomeGoButton() {
  const pending = usePendingSignup();
  // While hydrating, send new visitors to signup (safe default). After
  // hydration a known pending identity flips Go onto the status screen.
  const href = pending === true ? WAITING_APPROVAL_ROUTE : "/signup";
  const label =
    pending === true ? "Go — check approval status" : "Go — create account";

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
