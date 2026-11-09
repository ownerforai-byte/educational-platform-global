"use client";

/**
 * AI Tools Directory — redesigned to match the reference screenshot.
 *
 * Every unlocked tool is a full clickable card.
 * Locked tools show as greyed-out muted cards (no lock icon, no Plans link).
 * Category filter pill strip at top. 2-column grid below.
 */

import Link from "next/link";
import { useState } from "react";
import {
  Atom,
  BookOpen,
  Brain,
  Calculator,
  ChevronRight,
  Dna,
  FlaskConical,
  History,
  Languages,
  Lightbulb,
  MessageCircle,
  Search,
  Shapes,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { ACCESS_LABELS, hasLevel, type AccessLevel } from "@/lib/access-level";

// ─── Types ─────────────────────────────────────────────────────────────────
type ToolCategory = "All" | "Learning" | "Language" | "Math & Science" | "Visual Learning" | "Study Tools";

type Tool = {
  href: string;
  title: string;
  category: Exclude<ToolCategory, "All">;
  description: string;
  minLevel: AccessLevel;
  icon: LucideIcon;
  /** Tailwind bg+text for the icon square */
  iconBg: string;
  badge?: "Popular" | "New";
};

type SubjectClassroom = { slug: string; title: string; description: string };

// ─── Category chip colours ─────────────────────────────────────────────────
const CHIP: Record<Exclude<ToolCategory, "All">, string> = {
  "Learning":        "bg-blue-100  text-blue-700  dark:bg-blue-900/40  dark:text-blue-300",
  "Language":        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "Math & Science":  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Visual Learning": "bg-rose-100  text-rose-700  dark:bg-rose-900/40  dark:text-rose-300",
  "Study Tools":     "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
};

// ─── Tool registry ─────────────────────────────────────────────────────────
const CORE_TOOLS: Tool[] = [
  {
    href: "/chat",
    title: "Veer Study Assistant",
    category: "Learning",
    description: "Ask NEB study questions and get curriculum-aligned answers instantly.",
    minLevel: "member",
    icon: MessageCircle,
    iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    badge: "Popular",
  },
  {
    href: "/ask",
    title: "Quick Answer",
    category: "Learning",
    description: "One focused question — direct tutor answer, no back-and-forth.",
    minLevel: "member",
    icon: Sparkles,
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    badge: "Popular",
  },
  {
    href: "/ai/math",
    title: "Math & Derivation Solver",
    category: "Math & Science",
    description: "Step-by-step numericals, derivations and formula proofs.",
    minLevel: "plus",
    icon: Calculator,
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    badge: "Popular",
  },
  {
    href: "/ai-quiz",
    title: "Adaptive Quiz Generator",
    category: "Learning",
    description: "Syllabus-grounded quizzes at any difficulty, auto-evaluated.",
    minLevel: "plus",
    icon: Brain,
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    badge: "Popular",
  },
  {
    href: "/chat/nepali",
    title: "Nepali Language Tutor",
    category: "Language",
    description: "Vyakaran, rachana and sahitya — taught in Nepali.",
    minLevel: "member",
    icon: Languages,
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    badge: "Popular",
  },
  {
    href: "/chat/grammar",
    title: "English Grammar Console",
    category: "Language",
    description: "Grammar rules, writing skill and language development.",
    minLevel: "member",
    icon: BookOpen,
    iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  {
    href: "/ai/deep-dive",
    title: "Deep Concept Studio",
    category: "Math & Science",
    description: "Unpack hard topics from first principles — exam-focused depth.",
    minLevel: "plus",
    icon: Lightbulb,
    iconBg: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    href: "/ai/tutor",
    title: "Tutor Console",
    category: "Learning",
    description: "Multi-subject tutor with saved conversation history.",
    minLevel: "plus",
    icon: Sparkles,
    iconBg: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400",
  },
  {
    href: "/ai/diagrams",
    title: "Diagram & Figure Studio",
    category: "Visual Learning",
    description: "Generate clear labelled academic diagrams on demand.",
    minLevel: "plus",
    icon: Shapes,
    iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    href: "/ai/subjects",
    title: "Subject Classrooms",
    category: "Learning",
    description: "Dedicated classroom per subject — each with its own chat history.",
    minLevel: "plus",
    icon: Users,
    iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    badge: "New",
  },
  {
    href: "/search",
    title: "Curriculum Search",
    category: "Study Tools",
    description: "Find notes, labs, diagrams and past questions in one search.",
    minLevel: "plus",
    icon: Search,
    iconBg: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  },
  {
    href: "/ai/workspace",
    title: "AI Workspace",
    category: "Study Tools",
    description: "Tutor chat, quiz and search together in one workspace.",
    minLevel: "plus",
    icon: Target,
    iconBg: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  },
  {
    href: "/ai/history",
    title: "Conversation History",
    category: "Study Tools",
    description: "Search and revisit every saved Veer conversation.",
    minLevel: "plus",
    icon: History,
    iconBg: "bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-300",
  },
  {
    href: "/ai-quiz/history",
    title: "Quiz History",
    category: "Study Tools",
    description: "Review your quiz attempts, answers and AI feedback.",
    minLevel: "plus",
    icon: History,
    iconBg: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
  {
    href: "/mind-studio",
    title: "Image Hub",
    category: "Visual Learning",
    description: "Generate academic figures and images from a written prompt.",
    minLevel: "owner",
    icon: Shapes,
    iconBg: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
];

function buildTools(subjects: SubjectClassroom[]): Tool[] {
  const classrooms: Tool[] = subjects.map((sub): Tool => {
    const isLang = sub.slug === "nepali" || sub.slug === "english";
    const icon = sub.slug === "physics" ? Atom
      : sub.slug === "chemistry" ? FlaskConical
      : sub.slug === "biology" ? Dna
      : isLang ? Languages
      : Calculator;
    return {
      href: `/ai/subjects/${sub.slug}`,
      title: sub.title,
      category: isLang ? "Language" : "Math & Science",
      description: sub.description,
      minLevel: "plus",
      icon,
      iconBg: "bg-primary/10 text-primary",
    };
  });
  return [...CORE_TOOLS, ...classrooms];
}

// ─── Filter tabs ───────────────────────────────────────────────────────────
const TABS: ToolCategory[] = [
  "All", "Learning", "Language", "Math & Science", "Visual Learning", "Study Tools",
];

// ─── Single tool card ──────────────────────────────────────────────────────
function ToolCard({ tool, available }: { tool: Tool; available: boolean }) {
  const Icon = tool.icon;
  const chipClass = CHIP[tool.category];

  const inner = (
    <>
      {/* Row 1: icon + badge */}
      <div className="flex items-start justify-between gap-1.5">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tool.iconBg}`}>
          <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
        </span>
        {tool.badge && (
          <span className="mt-0.5 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-extrabold leading-tight text-white shadow-sm">
            {tool.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-2.5 text-[13px] font-bold leading-snug text-foreground">
        {tool.title}
      </h3>

      {/* Category chip */}
      <span className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${chipClass}`}>
        {tool.category}
      </span>

      {/* Description */}
      <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
        {tool.description}
      </p>

      {/* Footer: access gate + arrow */}
      <div className="mt-auto flex items-center justify-between pt-2.5">
        {available ? (
          <ChevronRight className="h-4 w-4 text-primary" aria-hidden="true" />
        ) : (
          <span className="text-[9px] font-semibold text-muted-foreground/50">
            {ACCESS_LABELS[tool.minLevel]}+
          </span>
        )}
      </div>
    </>
  );

  const base = "flex min-h-[176px] flex-col rounded-3xl border p-3.5 transition-all";

  return available ? (
    <Link
      href={tool.href}
      className={`${base} border-border/60 bg-card hover:border-primary/40 hover:shadow-sm`}
    >
      {inner}
    </Link>
  ) : (
    <div
      aria-disabled="true"
      className={`${base} cursor-not-allowed border-border/30 bg-muted/25 opacity-55 grayscale`}
    >
      {inner}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export function AiToolsDirectory({ subjects }: { subjects: SubjectClassroom[] }) {
  const { user, isLoading } = useSession();
  const [active, setActive] = useState<ToolCategory>("All");
  const all = buildTools(subjects);
  const visible = active === "All" ? all : all.filter((t) => t.category === active);

  return (
    <section aria-label="AI tools directory" className="space-y-5">

      {/* Category filter pills */}
      <div
        className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="group"
        aria-label="Filter by category"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={active === tab}
            onClick={() => setActive(tab)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-[11px] font-semibold transition-all ${
              active === tab
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Section heading */}
      <h2 className="text-[15px] font-extrabold text-foreground">
        {active === "All" ? "All Tools" : active}
        <span className="ml-2 text-[11px] font-normal text-muted-foreground">
          ({visible.length})
        </span>
      </h2>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {visible.map((tool) => (
          <ToolCard
            key={tool.href}
            tool={tool}
            available={!isLoading && hasLevel(user, tool.minLevel)}
          />
        ))}
      </div>
    </section>
  );
}
