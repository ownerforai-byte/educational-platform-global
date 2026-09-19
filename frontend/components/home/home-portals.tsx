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
} from "lucide-react";

interface PortalLink {
  label: string;
  href: string;
}

interface Portal {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  chipClass: string;
  links: PortalLink[];
}

const PORTALS: Portal[] = [
  {
    title: "Curriculum & Notes",
    desc: "Class 11 & 12 notes, syllabus, mindmaps and chapter libraries for all 6 subjects.",
    href: "/levels",
    icon: GraduationCap,
    iconClass: "text-sky-400 bg-sky-500/10 border-sky-500/25",
    chipClass: "hover:border-sky-500/40",
    links: [
      { label: "Class 11 Notes", href: "/class-11-notes" },
      { label: "Class 12 Notes", href: "/class-12-notes" },
      { label: "Syllabus Explorer", href: "/syllabus" },
    ],
  },
  {
    title: "3D Virtual Labs",
    desc: "96+ interactive 3D simulations, experiment suites and computational solvers.",
    href: "/lab",
    icon: FlaskConical,
    iconClass: "text-violet-400 bg-violet-500/10 border-violet-500/25",
    chipClass: "hover:border-violet-500/40",
    links: [
      { label: "Physics Labs", href: "/lab/physics" },
      { label: "Chemistry Labs", href: "/lab/chemistry" },
      { label: "Biology Labs", href: "/lab/biology" },
    ],
  },
  {
    title: "Theorems & Proofs",
    desc: "Step-by-step rigorous proofs in syllabus order for Physics, Chemistry, Biology & Math.",
    href: "/theorems",
    icon: Trophy,
    iconClass: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    chipClass: "hover:border-amber-500/40",
    links: [
      { label: "Class 11 Proofs", href: "/theorems/class-11-notes" },
      { label: "Class 12 Proofs", href: "/theorems/class-12-notes" },
      { label: "Practical Manuals", href: "/practical" },
    ],
  },
  {
    title: "Derivations Vault",
    desc: "Verified formula derivations with full steps for board-exam readiness.",
    href: "/derivations",
    icon: Zap,
    iconClass: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    chipClass: "hover:border-rose-500/40",
    links: [
      { label: "Class 11 Derivations", href: "/derivations/class-11-notes" },
      { label: "Class 12 Derivations", href: "/derivations/class-12-notes" },
      { label: "Numerical Guides", href: "/knowledge/numerical-physics" },
      { label: "Biology Diagrams", href: "/knowledge/biology-diagrams" },
      { label: "English Grammar", href: "/knowledge/grammar" },
    ],
  },
  {
    title: "Assessment & PYQs",
    desc: "AI quiz engine, past board questions and the NEB exam countdown.",
    href: "/quiz",
    icon: Target,
    iconClass: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    chipClass: "hover:border-blue-500/40",
    links: [
      { label: "AI Quiz Maker", href: "/ai-quiz" },
      { label: "Exam Countdown", href: "/exam-countdown" },
      { label: "My Progress", href: "/progress" },
    ],
  },
  {
    title: "Knowledge Hub",
    desc: "Numerical mastery, diagram atlas, grammar, writing and Nepali byakaran.",
    href: "/knowledge",
    icon: BookOpen,
    iconClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    chipClass: "hover:border-emerald-500/40",
    links: [
      { label: "Numerical Chemistry", href: "/knowledge/numerical-chemistry" },
      { label: "English Writing", href: "/knowledge/writing" },
      { label: "नेपाली व्याकरण", href: "/knowledge/byakaran" },
      { label: "English Grammar", href: "/knowledge/grammar" },
    ],
  },
  {
    title: "AI Study Assistant",
    desc: "Your study assistant — curriculum-aligned tutor for concepts, numericals and study plans.",
    href: "/chat",
    icon: Brain,
    iconClass: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/25",
    chipClass: "hover:border-fuchsia-500/40",
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
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Atom className="h-3.5 w-3.5 text-primary" />
          Everything on the platform, one hop away
        </span>
        <div className="h-px flex-1 bg-border/70" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PORTALS.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.href}
              className={`group relative flex flex-col rounded-3xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 ${portal.chipClass}`}
            >
              {/* Stretched link: whole card is clickable, chips row sits above it */}
              <Link
                href={portal.href}
                className="after:absolute after:inset-0 after:z-0 after:rounded-3xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${portal.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>

                <h3 className="mt-4 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {portal.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {portal.desc}
                </p>
              </Link>

              <div className="relative z-10 mt-4 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                {portal.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-border/50 bg-muted/40 px-2 py-1 text-[11px] font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
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
