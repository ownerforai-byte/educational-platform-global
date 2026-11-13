import Link from "next/link";
import { ArrowRight, GraduationCap, LogIn, PenLine } from "lucide-react";
import { GUEST_SIGNIN_NOTE } from "./guest-signin-note";

/**
 * Owner request 2026-11-08: the SECOND of the two approval-status screens.
 * A visitor who has NOT created an account but clicks "Already created an
 * account? Check your approval status" must land here — never on the
 * "Your account is on its way" screen reserved for pending signups.
 *
 * Designer 2026-11-13: frame the empty-status result as an inspiring note
 * that still motivates create / sign-in, with a live approval re-check.
 */
export const NO_ACCOUNT_MESSAGE =
  "There is no record of your active account -- so create one to get access";

export function NoAccountCard() {
  return (
    <div className="space-y-5" data-testid="no-account-card">
      <div className="border-y border-border/70 bg-gradient-to-b from-primary/[0.05] via-transparent to-transparent py-5 text-center">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          <PenLine className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          A note for you
        </p>
        <h2 className="mt-3 text-base font-extrabold tracking-tight text-foreground">
          No active account found
        </h2>
        <p
          data-testid="no-account-message"
          className="mx-auto mt-2 max-w-sm text-sm font-semibold leading-relaxed text-foreground"
        >
          {NO_ACCOUNT_MESSAGE}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {GUEST_SIGNIN_NOTE}
        </p>
      </div>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        After signing, the account is approved by the system verification and administrative approval.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/signup"
          className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          <GraduationCap className="h-4 w-4" />
          Create account
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/login"
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border/70 bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          <LogIn className="h-4 w-4" />
          Sign in
        </Link>
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        After signing, the account is approved by the system verification and administrative approval.
      </p>
    </div>
  );
}
