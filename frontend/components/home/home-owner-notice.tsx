import Link from "next/link";
import { PenLine, ShieldCheck, ArrowRight } from "lucide-react";

/**
 * Owner's notice, verbatim. Kept as a literal so JSX never re-wraps it.
 */
const OWNER_NOTICE =
  "This is the page of Ravikisan, made by him for easy access. If you want to explore then sign in and clear your thoughts' --Ravikisan";

/**
 * Notice from the owner — shown on the public home page (never gated).
 *
 * The quoted line is the owner's own wording and is rendered verbatim.
 * Below it: a short intro identifying Ravikisan as the platform's owner, and
 * an internal link to the login page (no external destinations).
 */
export function HomeOwnerNotice() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-4">
      {/* Section heading — matches the home page's existing divider style */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border/70" />
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <PenLine className="h-3.5 w-3.5 text-primary" />
          Notice
        </span>
        <div className="h-px flex-1 bg-border/70" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Owner's notice — verbatim */}
        <figure className="relative rounded-3xl border border-border/70 bg-gradient-to-b from-primary/[0.06] via-card to-card p-6 shadow-sm sm:p-7">
          <blockquote className="text-sm leading-relaxed text-foreground sm:text-[15px]">
            {OWNER_NOTICE}
          </blockquote>

          <figcaption className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-extrabold">
              R
            </span>
            --Ravikisan
          </figcaption>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/50 pt-4">
            <Link
              href="/login"
              className="inline-flex h-10 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
            >
              Sign in to explore
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Login works after administrative approval only
            </span>
          </div>
        </figure>

        {/* Short owner intro */}
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-base font-extrabold text-primary">
              R
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-tight text-foreground">
                Ravikisan
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Owner &amp; Creator
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Ravikisan is the owner of this platform. He built and maintains it
            so NEB Class 11 &amp; 12 students in Nepal get one reliable place
            for notes, 3D labs, derivations, PYQs and an AI tutor — free to
            read, and open to everyone.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sign in with your Google account to open the full academic
            directory, keep your progress, and clear your thoughts with the AI
            tutor whenever you are stuck.
          </p>
        </div>
      </div>
    </section>
  );
}
