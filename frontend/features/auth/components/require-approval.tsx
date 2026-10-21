"use client";

/**
 * RequireApproval — the global login + owner-approval wall ("the auth system").
 *
 * Owner request (2026-10-17): "apply the auth system lost in last few commits
 * like waiting for approval after creating account, lock for everything (also
 * the periodic table in header)". The recent public-home pass opened the whole
 * library to signed-out visitors; this gate restores the rule that EVERY route
 * in the (app) shell — home, notes, labs, the periodic table, chat, profile,
 * everything — requires a signed-in, APPROVED account.
 *
 * Model (mirrors backend/src/api/auth.ts):
 *   - The backend issues a session ONLY to an APPROVED (ACTIVE) account, so a
 *     present `user` already means "approved + verified + signed in".
 *   - A PENDING account never receives a session: signing in answers
 *     PENDING_APPROVAL and the login form routes to /welcome — the live
 *     "awaiting approval" screen. REJECTED accounts are refused a session too.
 *
 * So the wall needs only two visible states:
 *   approved + signed in → render the route.
 *   signed out           → the lock screen (sign in / create account / check
 *                          approval status) carrying the mandated notice.
 *
 * Public read-through routes (the notice board) stay open to every visitor, and
 * the auth pages themselves (login / signup / welcome / reset — all outside the
 * (app) shell) are never wrapped by this gate. Everything else in the shell is
 * locked — including the periodic table reached from the header.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  GraduationCap,
  Lock,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { NOTICE_COPY } from "@/features/credits/constants";
import { ACCESS_NOTICE } from "./access-notice";

/**
 * Routes inside the shell that stay reachable WITHOUT an approved account.
 * Owner decision (2026-10-17): "only auth + notice pages public" — so the
 * notice board is the single open page; home, the periodic table, labs, chat,
 * profile and the rest all require an approved login.
 */
const PUBLIC_PATHS = ["/notice"] as const;

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function RequireApproval({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const { user, isLoading } = useSession();

  // The notice board is a read-through page — open to every visitor.
  if (isPublicPath(pathname)) return <>{children}</>;

  // Session still resolving: render neither the lock nor the content, so a
  // signed-in member never sees the lock flash on first paint.
  if (isLoading) return <ApprovalPending />;

  // Signed in — and because the backend only grants sessions to APPROVED
  // accounts, this is exactly the "approved + verified" state.
  if (user) return <>{children}</>;

  return <ApprovalLock />;
}

/** First-paint state while the session resolves (no flash of lock or content). */
function ApprovalPending() {
  return (
    <div
      data-testid="approval-pending"
      className="flex min-h-[50vh] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Verifying your access…
        </p>
      </div>
    </div>
  );
}

/** The lock shown to every visitor without an approved account. */
function ApprovalLock() {
  return (
    <div
      data-testid="approval-lock"
      className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-10 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-inner">
        <Lock className="h-8 w-8 text-primary" />
      </div>

      <h1 className="mt-5 text-xl font-extrabold tracking-tight sm:text-2xl">
        Sign in to continue
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        This area is open to approved accounts only. Create an account, wait for
        administrative and system approval, then sign in to open the whole
        library — notes, labs, the periodic table and more.
      </p>

      {/* Mandated clearance notice — verbatim (owner wording; do not edit). */}
      <div className="mt-5 w-full rounded-2xl border border-primary/30 bg-primary/[0.05] p-4">
        <p className="flex items-start gap-2 text-left text-xs font-semibold leading-relaxed text-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{NOTICE_COPY}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/login"
          className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          <LogIn className="h-4 w-4" />
          Sign in
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/signup"
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border/70 bg-card px-5 text-sm font-bold text-foreground transition-all hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          <GraduationCap className="h-4 w-4 text-primary" />
          Create account
        </Link>
      </div>

      <Link
        href="/welcome"
        className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
      >
        <Clock3 className="h-3.5 w-3.5" />
        Already created an account? Check your approval status
      </Link>

      {/* Mandated access message — verbatim (owner wording). */}
      <p
        data-testid="approval-access-notice"
        className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        {ACCESS_NOTICE}
      </p>
    </div>
  );
}
