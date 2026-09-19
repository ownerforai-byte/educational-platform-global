import Link from "next/link";
import type { ReactNode } from "react";
import {
  FlaskConical,
  Trophy,
  Brain,
  Target,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: FlaskConical,
    title: "96+ 3D Virtual Labs",
    desc: "Interactive physics, chemistry & biology simulations with live solvers.",
  },
  {
    icon: Trophy,
    title: "Theorems & Derivations",
    desc: "Step-by-step rigorous proofs in official NEB syllabus order.",
  },
  {
    icon: Brain,
    title: "AI Tutor — Professor Mode",
    desc: "Syllabus-grounded answers with LaTeX math and CEE insights.",
  },
  {
    icon: Target,
    title: "PYQs & Exam Countdown",
    desc: "Authentic NEB past questions and board exam tracking.",
  },
];

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* ── Brand panel (desktop) ─────────────────────────────────── */}
      <aside className="relative hidden overflow-hidden border-r border-border/60 bg-gradient-to-br from-primary/10 via-background to-background lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/15 blur-[110px]" />

        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25">
              R
            </span>
            <span className="text-lg font-bold tracking-tight">Ravikisan&apos;s Platform</span>
          </Link>

          <div className="mt-16 max-w-md space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              NEB Class 11 &amp; 12 · CEE Ready
            </span>
            <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight">
              One account for your{" "}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                entire NEB journey
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sign in to sync progress, save bookmarks, manage credits and pick up
              right where you left off — across notes, labs and practice.
            </p>
          </div>
        </div>

        <div className="relative mt-12 grid max-w-md gap-3">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3.5 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur-sm"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="relative mt-12 text-[11px] text-muted-foreground/70">
          Aligned with official NEB / CDC Nepal curriculum standards.
        </p>
      </aside>

      {/* ── Form panel ────────────────────────────────────────────── */}
      <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:px-8">
        {/* Mobile brand row */}
        <Link
          href="/"
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:text-primary lg:hidden"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-[10px] font-extrabold text-primary-foreground">
            R
          </span>
          Ravikisan
        </Link>

        <Link
          href="/home"
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div className="w-full max-w-md">
          {/* Desktop back link above card */}
          <Link
            href="/home"
            className="mb-6 hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>

          <div className="mb-8 text-center lg:text-left">
            <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25 lg:mx-0">
              R
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
