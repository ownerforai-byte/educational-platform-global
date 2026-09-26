"use client";

/**
 * DirectoryCard — the single opening for the whole academic portal directory.
 *
 * Rules enforced here:
 *   - The card is entirely hidden behind a blur/security wrapper until the
 *     user passes Gmail (Google account) sign-in — guests see a locked shell
 *     and any click raises the AdminApprovalModal notice.
 *   - Once authenticated, the full directory opens and every entry is routed
 *     through the coin matrix (lab 5 / visuals 2 / theory 1 / reference 1)
 *     with a 2-hour window per module.
 *   - AI Chat is the one entry that stays free and public: it is the platform's
 *     only surface allowed to link externally, and only when the vault lacks
 *     the answer.
 *   - Every link is internal. No external hrefs leave this card.
 *
 * The home page baseline (hero, intro, nav) is untouched — this component
 * replaces only the directory section's inner content.
 */

import { useState } from "react";
import Link from "next/link";
import {
  Atom,
  ListTree,
  GraduationCap,
  FlaskConical,
  Trophy,
  Zap,
  Target,
  BookOpen,
  Brain,
  ArrowUpRight,
  Lock,
  Coins,
  Loader2,
  Timer,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { TOKEN_MATRIX, type ContentCategory } from "./constants";
import { useCredit } from "./credit-provider";

interface PortalLink {
  label: string;
  href: string;
  category: ContentCategory | null;
}

interface Portal {
  title: string;
  badge: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  gradientClass: string;
  chipClass: string;
  /** null → free/public entry (AI Chat only). */
  category: ContentCategory | null;
  links: PortalLink[];
}

/**
 * The unified directory. `category: null` on AI Study Assistant keeps the
 * tutor public — external links there are allowed only when the platform
 * vault cannot answer (handled inside the chat surface itself).
 */
const OWNER_COIN_FLOOR = 999999;

const DIRECTORY: Portal[] = [
  {
    title: "Everything Index",
    badge: "ALL PAGES · ONE HEAD PAGE",
    desc: "Every page on the platform in one list — a short opening, the name, and its link printed directly below.",
    href: "/site-index",
    icon: ListTree,
    iconClass: "text-sky-500 bg-sky-500/10 border-sky-500/25",
    gradientClass: "from-sky-500/[0.08] via-card to-card",
    chipClass: "hover:border-sky-500/50 hover:shadow-sky-500/10",
    category: "reference",
    links: [
      { label: "All 3D Labs", href: "/lab/3d", category: "lab3d" },
      { label: "Graph Bank", href: "/graphs", category: "visuals" },
      { label: "Pro Knowledge", href: "/knowledge/pro", category: "theory" },
      { label: "Derivations", href: "/derivations", category: "theory" },
    ],
  },
  {
    title: "Curriculum & Notes",
    badge: "NEB CURRICULUM",
    desc: "Class 11 & 12 notes, syllabus, mindmaps and chapter libraries for all 6 subjects in board sequence.",
    href: "/levels",
    icon: GraduationCap,
    iconClass: "text-sky-500 bg-sky-500/10 border-sky-500/25",
    gradientClass: "from-sky-500/[0.08] via-card to-card",
    chipClass: "hover:border-sky-500/50 hover:shadow-sky-500/10",
    category: "theory",
    links: [
      { label: "Class 11 Notes", href: "/class-11-notes", category: "theory" },
      { label: "Class 12 Notes", href: "/class-12-notes", category: "theory" },
      { label: "Syllabus Explorer", href: "/syllabus", category: "theory" },
    ],
  },
  {
    title: "3D Virtual Labs",
    badge: "INTERACTIVE 3D",
    desc: "96+ interactive 3D simulations, molecular structures, and computational physics solvers.",
    href: "/lab",
    icon: FlaskConical,
    iconClass: "text-violet-500 bg-violet-500/10 border-violet-500/25",
    gradientClass: "from-violet-500/[0.08] via-card to-card",
    chipClass: "hover:border-violet-500/50 hover:shadow-violet-500/10",
    category: "lab3d",
    links: [
      { label: "Cell Organelles 3D", href: "/lab/bio-3d-organelles", category: "lab3d" },
      { label: "Physics 3D Suite", href: "/lab/ph-3d-mechanics-i", category: "lab3d" },
      { label: "Science Graph Bank", href: "/graphs", category: "visuals" },
      { label: "Periodic Table & CEE", href: "/periodic-table", category: "lab3d" },
    ],
  },
  {
    title: "Theorems & Proofs",
    badge: "RIGOR & PROOFS",
    desc: "Step-by-step rigorous proofs in syllabus order for Physics, Chemistry, Biology & Mathematics.",
    href: "/theorems",
    icon: Trophy,
    iconClass: "text-amber-500 bg-amber-500/10 border-amber-500/25",
    gradientClass: "from-amber-500/[0.08] via-card to-card",
    chipClass: "hover:border-amber-500/50 hover:shadow-amber-500/10",
    category: "theory",
    links: [
      { label: "Class 11 Proofs", href: "/theorems/class-11-notes", category: "theory" },
      { label: "Class 12 Proofs", href: "/theorems/class-12-notes", category: "theory" },
      { label: "Theorems Directory", href: "/theorems", category: "theory" },
    ],
  },
  {
    title: "Derivations Vault",
    badge: "BOARD EXAM STEPS",
    desc: "Verified formula derivations with numbered steps and KaTeX equations for board-exam readiness.",
    href: "/derivations",
    icon: Zap,
    iconClass: "text-rose-500 bg-rose-500/10 border-rose-500/25",
    gradientClass: "from-rose-500/[0.08] via-card to-card",
    chipClass: "hover:border-rose-500/50 hover:shadow-rose-500/10",
    category: "theory",
    links: [
      { label: "Class 11 Derivations", href: "/derivations/class-11-notes", category: "theory" },
      { label: "Class 12 Derivations", href: "/derivations/class-12-notes", category: "theory" },
      { label: "All Subjects", href: "/derivations", category: "theory" },
    ],
  },
  {
    title: "Assessment & PYQs",
    badge: "EXAM READINESS",
    desc: "AI quiz engine, past NEB board questions, and real-time exam countdown timer.",
    href: "/quiz",
    icon: Target,
    iconClass: "text-blue-500 bg-blue-500/10 border-blue-500/25",
    gradientClass: "from-blue-500/[0.08] via-card to-card",
    chipClass: "hover:border-blue-500/50 hover:shadow-blue-500/10",
    category: "reference",
    links: [
      { label: "AI Quiz Maker", href: "/ai-quiz", category: "reference" },
      { label: "Exam Countdown", href: "/exam-countdown", category: "reference" },
      { label: "My Progress", href: "/progress", category: "reference" },
    ],
  },
  {
    title: "Knowledge Hub",
    badge: "MASTERY GUIDES",
    desc: "Numerical mastery, diagram atlas, grammar, writing essays and Nepali byakaran.",
    href: "/knowledge",
    icon: BookOpen,
    iconClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25",
    gradientClass: "from-emerald-500/[0.08] via-card to-card",
    chipClass: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
    category: "theory",
    links: [
      { label: "Numerical Physics", href: "/knowledge/numerical-physics", category: "theory" },
      { label: "Numerical Chemistry", href: "/knowledge/numerical-chemistry", category: "theory" },
      { label: "English Writing", href: "/knowledge/writing", category: "theory" },
      { label: "नेपाली व्याकरण", href: "/knowledge/byakaran", category: "theory" },
    ],
  },
  {
    title: "AI Study Assistant",
    badge: "24/7 AI TUTOR · FREE",
    desc: "Curriculum-aligned intelligent tutor for instant concept explanations, numerical solutions and study plans.",
    href: "/chat",
    icon: Brain,
    iconClass: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/25",
    gradientClass: "from-fuchsia-500/[0.08] via-card to-card",
    chipClass: "hover:border-fuchsia-500/50 hover:shadow-fuchsia-500/10",
    category: null,
    links: [
      { label: "Open Chat", href: "/chat", category: null },
      { label: "Credits & Plan", href: "/credits", category: null },
      { label: "Bookmarks", href: "/bookmarks", category: "reference" },
    ],
  },
];

/** Live countdown pill for a module whose window is open. */
function WindowPill({ moduleKey }: { moduleKey: string }) {
  const { isUnlocked, remainingClock } = useCredit();
  if (!isUnlocked(moduleKey)) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
      <Timer className="h-3 w-3" />
      {remainingClock(moduleKey)}
    </span>
  );
}

export function DirectoryCard() {
  const { user, isLoading } = useAuth();
  const { requestAccess, openModule, isUnlocked, costOf, coins, error } =
    useCredit();
  const [workingKey, setWorkingKey] = useState<string | null>(null);

  const authenticated = !isLoading && user !== null;
  const loading = isLoading;

  /** Gated navigation: intercept → notice, or charge coins → open window. */
  const handleOpen = async (href: string, category: ContentCategory | null) => {
    // Free + public entries (AI chat, credits wallet) navigate directly.
    if (category === null) {
      window.location.assign(href);
      return;
    }

    // Unauthenticated → notice modal, no navigation.
    if (!user) {
      requestAccess();
      return;
    }

    const moduleKey = href;
    if (isUnlocked(moduleKey)) {
      window.location.assign(href);
      return;
    }

    setWorkingKey(moduleKey);
    try {
      const ok = await openModule(moduleKey, category);
      if (ok) window.location.assign(href);
    } finally {
      setWorkingKey(null);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-4">
      {/* Section heading — structurally identical to the home baseline */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border/70" />
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <Atom className="h-3.5 w-3.5 text-primary" />
          Unified Academic Portals Directory
        </span>
        <div className="h-px flex-1 bg-border/70" />
      </div>

      {/* Coin balance strip — only for signed-in users */}
      {authenticated && (
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1 text-[11px] font-bold text-muted-foreground">
            <Coins className="h-3.5 w-3.5 text-amber-500" />
            Balance:{" "}
            <span className="text-foreground">
              {coins >= OWNER_COIN_FLOOR ? "∞" : coins}
            </span>
            <span className="font-medium">
              · Lab {costOf("lab3d")} · Visual {costOf("visuals")} · Notes{" "}
              {costOf("theory")}
            </span>
          </span>
        </div>
      )}

      {/* ── BLUR / SECURITY WRAPPER ───────────────────────────────────── */}
      <div className="relative mt-6">
        <div
          aria-hidden={authenticated ? undefined : "true"}
          className={
            authenticated
              ? undefined
              : "pointer-events-none select-none blur-[6px] opacity-40"
          }
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIRECTORY.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.href}
                  className={`group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b ${portal.gradientClass} p-6 shadow-sm transition-all duration-300 ${portal.chipClass}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${portal.iconClass} shadow-sm`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-background/80 border border-border/60 px-2.5 py-0.5 text-[9.5px] font-extrabold tracking-wider text-muted-foreground uppercase">
                        {portal.badge}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <h3 className="text-base font-extrabold text-foreground tracking-tight">
                        {portal.title}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {portal.desc}
                    </p>

                    {portal.category && (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        <Coins className="h-3 w-3" />
                        {TOKEN_MATRIX[portal.category].cost} coins · 2h
                      </span>
                    )}
                    {!portal.category && (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                        Free · Public
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 mt-5 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                    {portal.links.map((link) => (
                      <button
                        key={link.href + link.label}
                        type="button"
                        onClick={() =>
                          handleOpen(link.href, link.category)
                        }
                        className="rounded-lg border border-border/60 bg-card/80 px-2.5 py-1 text-[11px] font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {link.label}
                      </button>
                    ))}
                    <WindowPill moduleKey={portal.href} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── LOCKED SHELL for guests ───────────────────────────────────── */}
        {!loading && !authenticated && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-3xl bg-background/60 p-6 text-center backdrop-blur-[3px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <div className="max-w-md">
              <p className="text-base font-extrabold tracking-tight text-foreground">
                Academic Directory is locked
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Sign in with your Google account to open the full directory of
                labs, visuals, notes and reference material — every entry works
                on coins.
              </p>
            </div>
            <button
              type="button"
              onClick={requestAccess}
              data-gate="auth"
              data-gate-title="Sign in to open the directory"
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
            >
              <Lock className="h-4 w-4" />
              Unlock Directory
            </button>
            {error && (
              <p className="max-w-sm rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive">
                {error}
              </p>
            )}
          </div>
        )}

        {/* Loading skeleton to avoid a lock-flash on first paint */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-background/60 backdrop-blur-[3px]">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>

      {/* AI Chat stays a free, public shortcut outside the blur wrapper */}
      <div className="mt-6 flex justify-center">
        <Link
          href="/chat"
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-fuchsia-500/40 bg-fuchsia-500/10 px-5 text-sm font-bold text-fuchsia-500 transition-colors hover:bg-fuchsia-500/20 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <Brain className="h-4 w-4" />
          Open AI Tutor — free, no coins
        </Link>
      </div>
    </section>
  );
}
