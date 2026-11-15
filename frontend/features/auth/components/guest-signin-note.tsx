"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  GraduationCap,
  Leaf,
  LogIn,
  Sprout,
  TreePine,
} from "lucide-react";
import {
  APPROVAL_DISPATCH_ROUTE,
  hasPendingSignup,
} from "@/features/auth/pending-signup-identity";
import {
  PLATFORM_DISPLAY_NAME,
  PLATFORM_TAGLINE,
} from "@/lib/core/platform-brand";
import { ACCESS_NOTICE } from "./access-notice";

/**
 * Guest-facing entry for people who land on the sign-in flow without an
 * account — calm nature atmosphere, neutral branding, create + sign in CTAs.
 */

/** Short motivational line — reused on the no-account card, not the main hero. */
export const GUEST_SIGNIN_NOTE =
  "Notes in syllabus order, labs when you are ready, and Veer when a chapter refuses to click. Come in when you are ready. Clear your thoughts. Begin.";

/** Legacy export for tests that assert the old “note” copy is gone from the hero. */
export const GUEST_SIGNIN_NOTE_TITLE = "A note before you begin";

type GuestSignInNoteProps = {
  /** Full standalone page vs. the in-shell approval wall. */
  variant?: "page" | "embedded";
};

function BrandMark({ size = "md" }: { size?: "md" | "lg" }) {
  const box =
    size === "lg"
      ? "h-12 w-12 rounded-2xl text-lg"
      : "h-10 w-10 rounded-2xl text-base";
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-600 font-extrabold text-white shadow-md shadow-emerald-600/25 ${box}`}
    >
      <Leaf className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} />
    </span>
  );
}

export function GuestSignInNote({ variant = "page" }: GuestSignInNoteProps) {
  const isPage = variant === "page";
  const [showApprovalStatus, setShowApprovalStatus] = useState(false);

  useEffect(() => {
    setShowApprovalStatus(hasPendingSignup());
  }, []);

  return (
    <div
      data-testid="guest-signin-note"
      className={
        isPage
          ? "relative min-h-screen overflow-hidden bg-background text-foreground"
          : "relative mx-auto w-full max-w-xl overflow-hidden px-4 py-10 text-foreground"
      }
    >
      {/* Nature atmosphere — emerald wash, soft horizon, paper grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,hsl(152_60%_42%_/_0.22),transparent_50%),radial-gradient(ellipse_at_85%_20%,hsl(174_55%_38%_/_0.16),transparent_45%),radial-gradient(ellipse_at_50%_100%,hsl(142_40%_30%_/_0.12),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(0deg,currentColor_0_1px,transparent_1px_14px)]"
      />
      {isPage ? (
        <>
          <TreePine
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[18%] left-[6%] h-28 w-28 text-emerald-700/10 sm:h-36 sm:w-36"
          />
          <Sprout
            aria-hidden="true"
            className="pointer-events-none absolute right-[8%] top-[22%] h-16 w-16 text-teal-600/15 sm:h-20 sm:w-20"
          />
        </>
      ) : null}

      {isPage ? (
        <header className="relative border-b border-border/50 bg-background/60 backdrop-blur-sm">
          <div className="mx-auto flex min-h-16 max-w-3xl items-center px-5 sm:px-6">
            <Link
              href="/"
              aria-label={`${PLATFORM_DISPLAY_NAME} home`}
              className="group flex items-center gap-3"
            >
              <BrandMark />
              <span className="text-base font-bold tracking-tight sm:text-lg">
                {PLATFORM_DISPLAY_NAME}
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
        <div
          className={`animate-fade-in ${isPage ? "text-left" : "flex flex-col items-center"}`}
        >
          {!isPage ? (
            <Link
              href="/"
              aria-label={`${PLATFORM_DISPLAY_NAME} home`}
              className="mb-6 flex items-center gap-3"
            >
              <BrandMark size="lg" />
              <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                {PLATFORM_DISPLAY_NAME}
              </span>
            </Link>
          ) : (
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              {PLATFORM_TAGLINE}
            </p>
          )}

          <h1
            className={`mt-4 font-extrabold leading-[1.12] tracking-tight ${
              isPage
                ? "max-w-xl text-3xl sm:text-4xl md:text-[2.75rem]"
                : "max-w-md text-2xl sm:text-3xl"
            }`}
          >
            Study like the world is quiet.
            <span className="mt-1 block bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
              Your NEB desk is here.
            </span>
          </h1>

          <p
            className={`mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground sm:text-base ${
              isPage ? "" : "text-center"
            }`}
          >
            Syllabus-ordered notes, interactive labs, past papers, and Veer — ready
            when you are. Create an account or sign in to open your study space.
          </p>
        </div>

        <div
          className={`animate-fade-in mt-10 flex flex-wrap gap-3 ${
            isPage ? "items-center" : "items-center justify-center"
          }`}
          style={{ animationDelay: "120ms" }}
        >
          <Link
            href="/signup"
            data-testid="guest-note-create"
            className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 text-sm font-bold text-white shadow-md shadow-emerald-600/25 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Create account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/login"
            data-testid="guest-note-signin"
            className="inline-flex h-12 items-center gap-2 rounded-2xl border-2 border-emerald-600/30 bg-background/80 px-5 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:border-emerald-600 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:text-emerald-300"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </Link>
          {showApprovalStatus ? (
            <Link
              href={APPROVAL_DISPATCH_ROUTE}
              data-testid="guest-note-approval"
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border/70 bg-muted/30 px-5 text-sm font-semibold text-foreground transition hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
              Check approval status
            </Link>
          ) : null}
        </div>

        {showApprovalStatus ? (
          <Link
            href={APPROVAL_DISPATCH_ROUTE}
            data-testid="approval-status-link"
            className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 transition hover:underline dark:text-emerald-400 ${
              isPage ? "" : "justify-center"
            }`}
          >
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            Already created an account? Check your approval status
          </Link>
        ) : null}

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
              © {new Date().getFullYear()} {PLATFORM_DISPLAY_NAME} · {PLATFORM_TAGLINE}
            </span>
          </div>
        </footer>
      ) : null}
    </div>
  );
}