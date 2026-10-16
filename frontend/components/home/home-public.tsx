import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BellRing,
  Brain,
  CheckCircle2,
  FlaskConical,
  Gem,
  GraduationCap,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HomeOwnerNotice } from "./home-owner-notice";

/**
 * HOME FOR PUBLIC (NON-PAID, SIGNED-OUT) VISITORS
 * (owner request 2026-10-16: "design a home for public (non paid users) also,
 * with a message of login works after administrative approval and system
 * verification only for users").
 *
 * Until now a signed-out visitor landing on /home saw only the Spark lock on
 * the member rails — a locked box and nothing else. This is their home
 * instead: what the platform is, the standing access message word for word,
 * the three steps of the approval flow, and every destination that is genuinely
 * open without an account.
 *
 * Presentational only — the signed-in / signed-out branch lives in
 * `home-audience.tsx`. Free-to-everyone links mirror the route policy in
 * features/credits/constants.ts (labs, sims, periodic table, graphs, mindmaps
 * carry no category; chat, quiz and the notice board are on PUBLIC_PATHS), so
 * nothing here promises something the coin gate then locks.
 */

/** The mandated access message — kept verbatim (owner wording, 2026-10-16). */
export const ACCESS_NOTICE =
  "Login works after administrative approval and system verification only for users.";

const ACCESS_STEPS = [
  {
    title: "Sign in with Google",
    body: "One tap with your Google account — no forms, no passwords to remember.",
  },
  {
    title: "Administrative approval",
    body: "Every request is reviewed by the owner before the account is opened.",
  },
  {
    title: "System verification",
    body: "The account is checked by the system end-to-end, then unlocked for you.",
  },
] as const;

const OPEN_FOR_EVERYONE = [
  {
    href: "/chat",
    icon: Sparkles,
    title: "Veer — ask anything",
    body: "The AI tutor, open to every visitor: one free question a day without an account.",
  },
  {
    href: "/lab",
    icon: FlaskConical,
    title: "3D Virtual Labs",
    body: "Interactive 3D simulations across Physics, Chemistry and Biology.",
  },
  {
    href: "/periodic-table",
    icon: Atom,
    title: "Periodic Table (118 elements)",
    body: "The interactive all-blocks table with trends, constants and block explorers.",
  },
  {
    href: "/graphs",
    icon: Network,
    title: "Science Graph Bank",
    body: "Verified syllabus graphs, ready to read and revise from.",
  },
  {
    href: "/mindmap",
    icon: Brain,
    title: "Topic Mindmaps",
    body: "Every unit laid out as a map so the whole chapter fits in one view.",
  },
  {
    href: "/quiz",
    icon: GraduationCap,
    title: "Free guest quiz",
    body: "Test yourself instantly — the guest pool needs no account.",
  },
  {
    href: "/notice",
    icon: BellRing,
    title: "Notice Board",
    body: "How accounts, sparks, history and answers work here — the permanent record.",
  },
  {
    href: "/pro-plan",
    icon: Gem,
    title: "The PRO plan",
    body: "What PRO removes (the daily caps) and who it is for — plainly explained.",
  },
] as const;

export function HomePublic() {
  return (
    <div
      data-testid="public-home"
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-8"
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl border border-border/70 bg-gradient-to-b from-primary/[0.07] via-card to-card p-6 shadow-sm sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-lg font-extrabold text-primary shadow-inner">
            R
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Ravikisan&apos;s Platform
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              NEB Class 11 &amp; 12 — one place for the whole curriculum
            </p>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          Notes aligned to the NEB / CDC curriculum, interactive 3D science
          labs, step-by-step theorem proofs and derivations, PYQ banks, and
          Veer — the AI tutor that answers from the platform&apos;s own
          material. Reading the labs, visuals and tools below is free for
          everyone; the full library opens with an approved account.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
          >
            Request access — sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/notice"
            className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border/70 bg-card px-5 text-sm font-bold text-foreground transition-all hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
          >
            <BellRing className="h-4 w-4 text-primary" />
            Read the notice board
          </Link>
        </div>
      </section>

      {/* ── The access message (mandated copy, verbatim) ─────────────────── */}
      <section
        aria-label="How access works"
        className="mt-6 rounded-3xl border border-primary/30 bg-primary/[0.05] p-6 shadow-sm sm:p-7"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-foreground">
              How access works
            </h2>
            <p className="mt-1.5 text-sm font-semibold leading-relaxed text-foreground sm:text-[15px]">
              {ACCESS_NOTICE}
            </p>
          </div>
        </div>

        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {ACCESS_STEPS.map((step, idx) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border/70 bg-card p-4"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-extrabold text-primary">
                  {idx + 1}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                  {step.title}
                </span>
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          Until both checks clear the account stays closed — and nothing you
          have written is ever lost.
        </p>
      </section>

      {/* ── Open to everyone, right now ──────────────────────────────────── */}
      <section className="mt-8">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border/70" />
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Open to everyone — no account needed
          </span>
          <div className="h-px flex-1 bg-border/70" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OPEN_FOR_EVERYONE.map((entry) => {
            const Icon = entry.icon;
            return (
              <Link
                key={entry.href}
                href={entry.href}
                className="group rounded-3xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <p className="mt-3 text-sm font-extrabold tracking-tight text-foreground">
                  {entry.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {entry.body}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                  Open
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          Spark-locked note sections open after sign-in plus approval; the labs,
          visuals, mindmaps and tools above stay free for every visitor.
        </p>
      </section>

      {/* ── The owner's notice (verbatim quote + sign-in) ────────────────── */}
      <div className="mt-8">
        <HomeOwnerNotice />
      </div>
    </div>
  );
}
