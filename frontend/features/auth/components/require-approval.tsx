"use client";

/**
 * RequireApproval — the global login + approval wall ("the auth system").
 * Approval is bot-driven: new accounts are PENDING and flipped to ACTIVE
 * automatically ~5 minutes after creation — there is no manual owner step.
 *
 * Owner request (2026-10-17): restore the auth system and approval flow for
 * every route in the (app) shell, including the periodic table in the header.
 * The recent public-home pass opened the whole library to signed-out visitors;
 * this gate restores the rule that EVERY route
 * in the (app) shell — home, notes, labs, the periodic table, chat, profile,
 * everything — requires a signed-in, APPROVED account.
 *
 * Model (mirrors backend/src/api/auth.ts):
 *   - The backend issues a session ONLY to an APPROVED (ACTIVE) account, so a
 *     present `user` already means "approved + verified + signed in".
 *   - A PENDING account never receives a session: signing in answers
 *     PENDING_APPROVAL and the login form routes to /welcome — the live
 *     waiting screen (bot approval is automatic, ~5 minutes). REJECTED
 *     accounts are refused a session too.
 *
 * So the wall needs only two visible states:
 *   approved + signed in → render the route.
 *   signed out           → the access screen (sign in / create account / check
 *                          approval status) carrying the mandated notice.
 *
 * Public read-through routes (the notice board and the plans page) stay open
 * to every visitor, and
 * the auth pages themselves (login / signup / welcome / reset — all outside the
 * (app) shell) are never wrapped by this gate. Everything else in the shell is
 * gated — including the periodic table reached from the header.
 */

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import { GuestSignInNote } from "./guest-signin-note";
import { VerifyingStatus } from "./verifying-status";

/**
 * Routes inside the shell that stay reachable WITHOUT an approved account.
 * Owner decision (2026-10-17): "only auth + notice pages public" — so the
 * notice board is the single open page; home, the periodic table, labs, chat,
 * profile and the rest all require an approved login.
 * Owner request (2026-10-23): "/plans is visible for all users" — the tier
 * ladder joins the open list (plan.md §5: the plans page is a guest page).
 * Owner request (2026-11-12): guest → welcome → Go → signup → pending
 * /welcome → after approval + sign-in → member. /home stays open as a light
 * guest surface; tier homes stay behind this wall.
 */
const PUBLIC_PATHS = ["/home", "/plans", "/onboarding", "/ai/community"] as const;

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function RequireApproval({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const { user, isLoading } = useSession();

  // The notice board is a read-through page — open to every visitor.
  if (isPublicPath(pathname)) return <>{children}</>;

  // Session still resolving: render neither the gate nor the content, so a
  // signed-in member never sees an access-screen flash on first paint.
  if (isLoading) return <ApprovalPending />;

  // Signed in — and because the backend only grants sessions to APPROVED
  // accounts, this is exactly the "approved + verified" state.
  if (user) return <>{children}</>;

  return <ApprovalLock />;
}

/** First-paint state while the session resolves (no flash of gate or content). */
function ApprovalPending() {
  return (
    <div
      data-testid="approval-pending"
      className="flex min-h-[50vh] items-center justify-center"
    >
      <VerifyingStatus label="Verifying your access" />
    </div>
  );
}

/** Inspiring guest note shown to visitors without an approved account. */
function ApprovalLock() {
  return (
    <div data-testid="approval-lock">
      <GuestSignInNote variant="embedded" />
    </div>
  );
}
