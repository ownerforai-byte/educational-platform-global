"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  FlaskConical,
  Trophy,
  Zap,
  Target,
  BookOpen,
  Brain,
  ArrowUpRight,
  Atom,
  ListTree,
} from "lucide-react";

interface PortalLink {
  label: string;
  href: string;
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
  links: PortalLink[];
}

const PORTALS: Portal[] = [
  {
    title: "Everything Index",
    badge: "ALL PAGES · ONE HEAD PAGE",
    desc: "Every page on the platform in one list — a short opening, the name, and its link printed directly below.",
    href: "/index",
    icon: ListTree,
    iconClass: "text-sky-500 bg-sky-500/10 border-sky-500/25",
    gradientClass: "from-sky-500/[0.08] via-card to-card",
    chipClass: "hover:border-sky-500/50 hover:shadow-sky-500/10",
    links: [
      { label: "All 3D Labs", href: "/lab/3d" },
      { label: "Graph Bank", href: "/graphs" },
      { label: "Pro Knowledge", href: "/knowledge/pro" },
      { label: "Derivations", href: "/derivations" },
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
    links: [
      { label: "Class 11 Notes", href: "/class-11-notes" },
      { label: "Class 12 Notes", href: "/class-12-notes" },
      { label: "Syllabus Explorer", href: "/syllabus" },
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
    links: [
      { label: "Cell Organelles 3D", href: "/lab/bio-3d-organelles" },
      { label: "Physics 3D Suite", href: "/lab/ph-3d-mechanics-i" },
      { label: "Science Graph Bank", href: "/graphs" },
      { label: "Periodic Table & CEE", href: "/periodic-table" },
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
    links: [
      { label: "Class 11 Proofs", href: "/theorems/class-11-notes" },
      { label: "Class 12 Proofs", href: "/theorems/class-12-notes" },
      { label: "Theorems Directory", href: "/theorems" },
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
    links: [
      { label: "Class 11 Derivations", href: "/derivations/class-11-notes" },
      { label: "Class 12 Derivations", href: "/derivations/class-12-notes" },
      { label: "All Subjects Derivations", href: "/derivations" },
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
    links: [
      { label: "AI Quiz Maker", href: "/ai-quiz" },
      { label: "Exam Countdown", href: "/exam-countdown" },
      { label: "My Progress", href: "/progress" },
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
    links: [
      { label: "Numerical Physics", href: "/knowledge/numerical-physics" },
      { label: "Numerical Chemistry", href: "/knowledge/numerical-chemistry" },
      { label: "English Writing", href: "/knowledge/writing" },
      { label: "नेपाली व्याकरण", href: "/knowledge/byakaran" },
    ],
  },
  {
    title: "AI Study Assistant",
    badge: "24/7 AI TUTOR",
    desc: "Curriculum-aligned intelligent tutor for instant concept explanations, numerical solutions and study plans.",
    href: "/chat",
    icon: Brain,
    iconClass: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/25",
    gradientClass: "from-fuchsia-500/[0.08] via-card to-card",
    chipClass: "hover:border-fuchsia-500/50 hover:shadow-fuchsia-500/10",
    links: [
      { label: "Open Chat", href: "/chat" },
      { label: "Credits & Plan", href: "/credits" },
      { label: "Bookmarks", href: "/bookmarks" },
    ],
  },
];

export function HomePortals() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border/70" />
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <Atom className="h-3.5 w-3.5 text-primary" />
          Unified Academic Portals Directory
        </span>
        <div className="h-px flex-1 bg-border/70" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PORTALS.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.href}
              className={`group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b ${portal.gradientClass} p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${portal.chipClass}`}
            >
              {/* Stretched link: whole card is clickable, chips row sits above it */}
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

                <Link
                  href={portal.href}
                  className="after:absolute after:inset-0 after:z-0 after:rounded-3xl block mt-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {portal.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {portal.desc}
                  </p>
                </Link>
              </div>

              <div className="relative z-10 mt-5 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                {portal.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-border/60 bg-card/80 px-2.5 py-1 text-[11px] font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
