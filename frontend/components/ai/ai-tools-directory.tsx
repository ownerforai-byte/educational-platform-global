"use client";

/**
 * AI Tools Directory — redesigned layout (2026-11).
 *
 * Layout matches the reference:
 *   - Category filter pill strip at the top
 *   - 2-column card grid (each card has: icon, "Popular/New" badge, title,
 *     category chip, description, user count placeholder)
 *   - Locked tools show "Unavailable on your plan" inline — NO link to /plans
 *     (plans live in the footer only).
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
  Lock,
  MessageCircle,
  Search,
  Shapes,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { ACCESS_LABELS, hasLevel, type AccessLevel } from "@/lib/access-level";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToolCategory = "All" | "Learning" | "Language" | "Math & Science" | "Visual Learning" | "Study Tools";

type Tool = {
  href: string;
  /** Main feature name — shown as card title */
  title: string;
  /** Short category chip label */
  category: Exclude<ToolCategory, "All">;
  description: string;
  minLevel: AccessLevel;
  icon: LucideIcon;
  /** Tailwind classes for the icon background + text */
  iconStyle: string;
  /** Optional badge: "Popular" | "New" */
  badge?: "Popular" | "New";
};

type SubjectClassroom = { slug: string; title: string; description: string };

// ─── Category colors (chip) ───────────────────────────────────────────────────
const CATEGORY_CHIP: Record<Exclude<ToolCategory, "All">, string> = {
  "Learning":        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Language":        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "Math & Science":  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Visual Learning": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "Study Tools":     "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
};

// ─── Core tools ───────────────────────────────────────────────────────────────
const CORE_TOOLS: Tool[] = [
  {
    href: "/chat",
    title: "Veer Study Assistant",
    category: "Learning",
    description: "Ask NEB study questions and get curriculum-aligned explanations.",
    minLevel: "member",
    icon: MessageCircle,
    iconStyle: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    badge: "Popular",
  },
  {
    href: "/ask",
    title: "Quick Answer",
    category: "Learning",
    description: "Ask a focused study question and get a direct tutor response instantly.",
    minLevel: "member",
    icon: Sparkles,
    iconStyle: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    badge: "Popular",
  },
  {
    href: "/chat/nepali",
    title: "Nepali Language Tutor",
    category: "Language",
    description: "Study Nepali grammar, literature and writing with a dedicated tutor.",
    minLevel: "member",
    icon: Languages,
    iconStyle: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    badge: "Popular",
  },
  {
    href: "/chat/grammar",
    title: "English Grammar Console",
    category: "Language",
    description: "Explore English grammar, usage and writing through guided chat.",
    minLevel: "member",
    icon: BookOpen,
    iconStyle: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  {
    href: "/ai/tutor",
    title: "Tutor Console",
    category: "Learning",
    description: "Work through questions with subject modes and saved conversations.",
    minLevel: "plus",
    icon: Sparkles,
    iconStyle: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400",
  },
  {
    href: "/ai-quiz",
    title: "Adaptive Quiz Generator",
    category: "Learning",
    description: "Generate syllabus-based practice quizzes at your chosen difficulty.",
    minLevel: "plus",
    icon: Brain,
    iconStyle: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    badge: "Popular",
  },
  {
    href: "/ai/math",
    title: "Math & Derivation Solver",
    category: "Math & Science",
    description: "Get step-by-step help with mathematics and science numericals.",
    minLevel: "plus",
    icon: Calculator,
    iconStyle: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    badge: "Popular",
  },
  {
    href: "/ai/deep-dive",
    title: "Deep Concept Studio",
    category: "Math & Science",
    description: "Unpack difficult concepts from first principles with exam-focused depth.",
    minLevel: "plus",
    icon: Lightbulb,
    iconStyle: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    href: "/ai/diagrams",
    title: "Diagram & Figure Studio",
    category: "Visual Learning",
    description: "Create clear academic figures and labelled study diagrams on demand.",
    minLevel: "plus",
    icon: Shapes,
    iconStyle: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    href: "/mind-studio",
    title: "Image Hub",
    category: "Visual Learning",
    description: "Generate academic figures and images from a written prompt.",
    minLevel: "owner",
    icon: Shapes,
    iconStyle: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    href: "/ai/subjects",
    title: "Subject Classrooms",
    category: "Learning",
    description: "Six dedicated classrooms, each with its own conversation history.",
    minLevel: "plus",
    icon: BookOpen,
    iconStyle: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    badge: "New",
  },
  {
    href: "/search",
    title: "Curriculum Search",
    category: "Study Tools",
    description: "Find relevant notes, labs, diagrams and past questions in one search.",
    minLevel: "plus",
    icon: Search,
    iconStyle: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  },
  {
    href: "/ai/workspace",
    title: "AI Workspace",
    category: "Study Tools",
    description: "Bring tutor chat, quiz practice and curriculum search into one workspace.",
    minLevel: "plus",
    icon: Target,
    iconStyle: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    href: "/ai/history",
    title: "Conversation History",
    category: "Study Tools",
    description: "Search and revisit your saved Veer conversations any time.",
    minLevel: "plus",
    icon: History,
    iconStyle: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  },
  {
    href: "/ai-quiz/history",
    title: "Quiz History",
    category: "Study Tools",
    description: "Review completed quizzes, your answers and Veer's feedback.",
    minLevel: "plus",
    icon: History,
    iconStyle: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
];

function createTools(subjects: SubjectClassroom[]): Tool[] {
  const classrooms: Tool[] = subjects.map((subject) => {
    const isLanguage = subject.slug === "nepali" || subject.slug === "english";
    const icon = subject.slug === "physics" ? Atom
      : subject.slug === "chemistry" ? FlaskConical
      : subject.slug === "biology" ? Dna
      : isLanguage ? Languages
      : Calculator;
    return {
      href: `/ai/subjects/${subject.slug}`,
      title: subject.title,
      category: isLanguage ? "Language" : "Math & Science",
      description: subject.description,
      minLevel: "plus" as AccessLevel,
      icon,
      iconStyle: "bg-primary/10 text-primary",
    };
  });
  return [...CORE_TOOLS, ...classrooms];
}

// ─── Component ────────────────────────────────────────────────────────────────

const FILTER_TABS: ToolCategory[] = [
  "All", "Learning", "Language", "Math & Science", "Visual Learning", "Study Tools",
];

export function AiToolsDirectory({ subjects }: { subjects: SubjectClassroom[] }) {
  const { user, isLoading } = useSession();
  const [active, setActive] = useState<ToolCategory>("All");
  const all = createTools(subjects);
  const visible = active === "All" ? all : all.filter((t) => t.category === active);

  return (
    <section aria-label="AI tools directory" className="space-y-5">

      {/* ── Category filter pills ─────────────────────────────────────────── */}
      <div
        className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="group"
        aria-label="Filter by category"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={active === tab}
            onClick={() => setActive(tab)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
              active === tab
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tools heading ─────────────────────────────────────────────────── */}
      <h2 className="text-sm font-bold text-foreground">
        {active === "All" ? "All Tools" : active}
        <span className="ml-2 text-[11px] font-normal text-muted-foreground">({visible.length})</span>
      </h2>

      {/* ── 2-column card grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {visible.map((tool) => {
          const Icon = tool.icon;
          const available = !isLoading && hasLevel(user, tool.minLevel);
          const chipClass = CATEGORY_CHIP[tool.category];

          const cardContent = (
            <>
              {/* Icon + badge row */}
              <div className="flex items-start justify-between gap-2">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tool.iconStyle}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {tool.badge && (
                  <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-sm">
                    {tool.badge}
                  </span>
                )}
                {!available && !tool.badge && (
                  <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 mt-1" aria-hidden="true" />
                )}
              </div>

              {/* Title */}
              <h3 className="mt-3 text-sm font-bold leading-snug text-foreground">
                {tool.title}
              </h3>

              {/* Category chip */}
              <span className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${chipClass}`}>
                {tool.category}
              </span>

              {/* Description */}
              <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                {tool.description}
              </p>

              {/* Footer row */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/60">
                  {available ? "Open →" : (
                    <span className="text-muted-foreground/50 text-[9px]">
                      {ACCESS_LABELS[tool.minLevel]} plan
                    </span>
                  )}
                </span>
                {available && (
                  <ChevronRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                )}
              </div>
            </>
          );

          const base = "flex min-h-[168px] flex-col rounded-3xl border p-3.5 transition-all";

          return available ? (
            <Link
              key={tool.href}
              href={tool.href}
              className={`${base} border-border/70 bg-card hover:border-primary/40 hover:shadow-sm`}
            >
              {cardContent}
            </Link>
          ) : (
            <div
              key={tool.href}
              aria-disabled="true"
              className={`${base} cursor-not-allowed border-border/40 bg-muted/30 opacity-70 grayscale`}
            >
              {cardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
