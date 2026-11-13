import Link from "next/link";
import { ArrowRight, Clock3, GraduationCap, LogIn, PenLine } from "lucide-react";
import { APPROVAL_DISPATCH_ROUTE } from "@/features/auth/pending-signup-identity";
import { ACCESS_NOTICE } from "./access-notice";

/**
 * Guest-facing inspiring note for people who land on the sign-in flow
 * without an account (designer 2026-11-13).
 *
 * One composition: brand first, a short handwritten-feeling note, then the
 * three actions — create account, sign in, check approval status.
 */

export const GUEST_SIGNIN_NOTE =
  "You are one quiet decision away from a study desk that keeps pace with NEB Class 11 & 12 — notes in syllabus order, labs when you are ready, and Veer when a chapter refuses to click. Come in when you are ready. Clear your thoughts. Begin.";

export const GUEST_SIGNIN_NOTE_TITLE = "A note before you begin";

type GuestSignInNoteProps = {
  /** Full standalone page vs. the in-shell approval wall. */
  variant?: "page" | "embedded";
};

export function GuestSignInNote({ variant = "page" }: GuestSignInNoteProps) {
  const isPage = variant === "page";

  return (
    <div
      data-testid="guest-signin-note"
      className={
        isPage
          ? "relative min-h-screen overflow-hidden bg-background text-foreground"
          : "relative mx-auto w-full max-w-xl overflow-hidden px-4 py-10 text-foreground"
      }
    >
      {/* Atmosphere — soft brand wash + paper grain, not a flat fill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,hsl(var(--primary)_/_0.14),transparent_55%),radial-gradient(ellipse_at_90%_80%,hsl(var(--primary)_/_0.08),transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:repeating-linear-gradient(0deg,currentColor_0_1px,transparent_1px_12px),repeating-linear-gradient(90deg,currentColor_0_1px,transparent_1px_12px)]"
      />

      {isPage ? (
        <header className="relative border-b border-border/50 bg-background/60 backdrop-blur-sm">
          <div className="mx-auto flex min-h-16 max-w-3xl items-center px-5 sm:px-6">
            <Link
              href="/"
              aria-label="Ravikisan's Platform home"
              className="group flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-extrabold text-primary-foreground shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-[1.04]"
              >
                R
              </span>
              <span className="text-base font-bold tracking-tight sm:text-lg">
                Ravikisan&apos;s Platform
              </span>
            </Link>
          </div>
        </header>
      ) : null}

      <main
        className={
          isPage
            ? "relative mx-auto flex max-w-3xl flex-col px-5 py-12 sm:px-6 sm:py-16"
            : "relative flex flex-col items-center text-center"
        }
      >
        {/* Brand — hero-level on the first viewport */}
        <div
          className={`animate-fade-in ${isPage ? "text-left" : "flex flex-col items-center"}`}
        >
          {!isPage ? (
            <Link
              href="/"
              aria-label="Ravikisan's Platform home"
              className="mb-6 flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-md shadow-primary/20"
              >
                R
              </span>
              <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                Ravikisan&apos;s Platform
              </span>
            </Link>
          ) : (
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Ravikisan&apos;s Platform
            </p>
          )}

          <p
            className={`mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground ${isPage ? "" : "justify-center"}`}
          >
            <PenLine className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {GUEST_SIGNIN_NOTE_TITLE}
          </p>

          <h1
            className={`mt-3 font-extrabold leading-[1.12] tracking-tight ${
              isPage
                ? "max-w-xl text-3xl sm:text-4xl md:text-[2.75rem]"
                : "max-w-md text-2xl sm:text-3xl"
            }`}
          >
            Your desk is waiting.
            <span className="mt-1 block bg-gradient-to-r from-primary via-sky-600 to-emerald-600 bg-clip-text text-transparent">
              Sign in when you are ready.
            </span>
          </h1>
        </div>

        {/* The note — one job, no card grid */}
        <figure
          data-testid="guest-signin-note-body"
          className={`animate-pop-in relative mt-8 border-y border-border/70 bg-gradient-to-b from-primary/[0.05] via-transparent to-transparent py-7 ${
            isPage ? "max-w-xl text-left" : "max-w-md text-center"
          }`}
          style={{ animationDelay: "80ms" }}
        >
          <blockquote
            className={`text-[15px] leading-relaxed text-foreground/90 sm:text-base ${
              isPage ? "" : "mx-auto"
            }`}
          >
            {GUEST_SIGNIN_NOTE}
          </blockquote>
          <figcaption
            className={`mt-5 flex items-center gap-2 text-xs font-bold text-primary ${
              isPage ? "" : "justify-center"
            }`}
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-[11px] font-extrabold"
            >
              R
            </span>
            — Ravikisan
          </figcaption>
        </figure>

        {/* CTA group */}
        <div
          className={`animate-fade-in mt-9 flex flex-wrap gap-3 ${
            isPage ? "items-center" : "items-center justify-center"
          }`}
          style={{ animationDelay: "160ms" }}
        >
          <Link
            href="/signup"
            data-testid="guest-note-create"
            className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Create account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/login"
            data-testid="guest-note-signin"
            className="inline-flex h-12 items-center gap-2 rounded-2xl border-2 border-border/80 bg-background/70 px-5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </Link>
          <Link
            href={APPROVAL_DISPATCH_ROUTE}
            data-testid="guest-note-approval"
            className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border/70 bg-muted/30 px-5 text-sm font-semibold text-foreground transition hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
            Check approval status
          </Link>
        </div>

        <Link
          href={APPROVAL_DISPATCH_ROUTE}
          data-testid="approval-status-link"
          className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:underline ${
            isPage ? "" : "justify-center"
          }`}
        >
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          Already created an account? Check your approval status
        </Link>

        <p
          className={`mt-6 inline-flex items-start gap-1.5 text-[11px] font-medium leading-relaxed text-muted-foreground ${
            isPage ? "max-w-md" : "max-w-sm justify-center text-center"
          }`}
        >
          {ACCESS_NOTICE}
        </p>
      </main>

      {isPage ? (
        <footer className="relative border-t border-border/50 bg-background/60 backdrop-blur-sm">
          <div className="mx-auto flex max-w-3xl px-5 py-5 text-xs text-muted-foreground sm:px-6">
            <span suppressHydrationWarning>
              © {new Date().getFullYear()} Ravikisan&apos;s Platform · NEB Class 11 &amp; 12
            </span>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
