import Link from "next/link";
import { ArrowRight, GraduationCap, LogIn, ShieldAlert } from "lucide-react";

/**
 * Owner request 2026-11-08: the SECOND of the two approval-status screens.
 * A visitor who has NOT created an account but clicks "Already created an
 * account? Check your approval status" must land here — never on the
 * "Your account is on its way" screen reserved for pending signups.
 */
export const NO_ACCOUNT_MESSAGE =
  "There is no record of your active account -- so create one to get access";

export function NoAccountCard() {
  return (
    <div className="space-y-5" data-testid="no-account-card">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-background shadow-sm">
          <ShieldAlert className="h-5 w-5 text-amber-500" />
        </span>
        <h2 className="text-base font-extrabold tracking-tight text-foreground">
          No active account found
        </h2>
        <p
          data-testid="no-account-message"
          className="max-w-sm text-sm font-semibold leading-relaxed text-foreground"
        >
          {NO_ACCOUNT_MESSAGE}
        </p>
      </div>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        After signing, the account is approved by the system verification and administrative approval.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/signup"
          className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
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
