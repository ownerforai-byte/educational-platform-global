"use client";

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
  type LucideIcon,
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  ACCESS_LABELS,
  hasLevel,
  type AccessLevel,
} from "@/lib/access-level";

type ToolCategory =
  | "Learning"
  | "Language"
  | "Math & Science"
  | "Visual Learning"
  | "Study Tools";

type SubjectClassroom = {
  slug: string;
  title: string;
  description: string;
};

type Tool = {
  href: string;
  title: string;
  type: string;
  category: ToolCategory;
  description: string;
  minLevel: AccessLevel;
  icon: LucideIcon;
  iconStyle: string;
};

const CATEGORIES: Array<"All" | ToolCategory> = [
  "All",
  "Learning",
  "Language",
  "Math & Science",
  "Visual Learning",
  "Study Tools",
];

const CORE_TOOLS: Tool[] = [
  {
    href: "/chat",
    title: "Veer Study Assistant",
    type: "AI Tutor",
    category: "Learning",
    description: "Ask NEB study questions and get curriculum-aligned explanations.",
    minLevel: "member",
    icon: MessageCircle,
    iconStyle: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    href: "/ask",
    title: "Ask Veer",
    type: "Quick Answer",
    category: "Learning",
    description: "Ask a focused study question and get a direct tutor response.",
    minLevel: "member",
    icon: Sparkles,
    iconStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    href: "/chat/nepali",
    title: "Nepali Assistant",
    type: "Language Tutor",
    category: "Language",
    description: "Study Nepali language, grammar and literature with a dedicated tutor.",
    minLevel: "member",
    icon: Languages,
    iconStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    href: "/chat/grammar",
    title: "Grammar Console",
    type: "Language Tutor",
    category: "Language",
    description: "Explore English grammar, usage and writing through guided chat.",
    minLevel: "member",
    icon: BookOpen,
    iconStyle: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    href: "/ai/tutor",
    title: "Tutor Console",
    type: "AI Tutor",
    category: "Learning",
    description: "Work through questions with subject modes and saved conversations.",
    minLevel: "plus",
    icon: Sparkles,
    iconStyle: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
  },
  {
    href: "/ai/history",
    title: "Conversation History",
    type: "Chat History",
    category: "Study Tools",
    description: "Search and revisit your saved Veer conversations.",
    minLevel: "plus",
    icon: History,
    iconStyle: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    href: "/ai-quiz",
    title: "Adaptive Quiz Studio",
    type: "Quiz Generator",
    category: "Learning",
    description: "Generate syllabus-based practice quizzes at your chosen difficulty.",
    minLevel: "plus",
    icon: Brain,
    iconStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    href: "/ai-quiz/history",
    title: "Saved Quiz History",
    type: "Quiz History",
    category: "Study Tools",
    description: "Review completed quizzes, answers and feedback.",
    minLevel: "plus",
    icon: History,
    iconStyle: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    href: "/ai/math",
    title: "Math & Derivation Solver",
    type: "Problem Solver",
    category: "Math & Science",
    description: "Get step-by-step help with mathematics and science numericals.",
    minLevel: "plus",
    icon: Calculator,
    iconStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    href: "/ai/deep-dive",
    title: "Deep Concept Studio",
    type: "Concept Tutor",
    category: "Math & Science",
    description: "Unpack difficult concepts from first principles with exam-focused context.",
    minLevel: "plus",
    icon: Lightbulb,
    iconStyle: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  {
    href: "/ai/diagrams",
    title: "Diagram Studio",
    type: "AI Diagrams",
    category: "Visual Learning",
    description: "Create clear academic figures and labelled study diagrams.",
    minLevel: "plus",
    icon: Shapes,
    iconStyle: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    href: "/mind-studio",
    title: "Image & Figure Hub",
    type: "Image Generator",
    category: "Visual Learning",
    description: "Generate academic figures and images from a written prompt.",
    minLevel: "owner",
    icon: Shapes,
    iconStyle: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  {
    href: "/ai/subjects",
    title: "Subject Classrooms",
    type: "Subject Tutors",
    category: "Learning",
    description: "Choose a dedicated classroom with its own conversation history.",
    minLevel: "plus",
    icon: BookOpen,
    iconStyle: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    href: "/search",
    title: "Curriculum Search",
    type: "Study Search",
    category: "Study Tools",
    description: "Find relevant notes, labs, diagrams and past questions in one search.",
    minLevel: "plus",
    icon: Search,
    iconStyle: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    href: "/ai/workspace",
    title: "AI Workspace",
    type: "Study Workspace",
    category: "Study Tools",
    description: "Bring tutor chat, quiz practice and curriculum search into one workspace.",
    minLevel: "plus",
    icon: Target,
    iconStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
];

function createTools(subjects: SubjectClassroom[]): Tool[] {
  const classrooms = subjects.map((subject): Tool => {
    const isLanguage = subject.slug === "nepali" || subject.slug === "english";
    const icon = subject.slug === "physics"
      ? Atom
      : subject.slug === "chemistry"
        ? FlaskConical
        : subject.slug === "biology"
          ? Dna
          : isLanguage
            ? Languages
            : Calculator;

    return {
      href: `/ai/subjects/${subject.slug}`,
      title: subject.title,
      type: "Subject Classroom",
      category: isLanguage ? "Language" : "Math & Science",
      description: subject.description,
      minLevel: "plus",
      icon,
      iconStyle: "bg-primary/10 text-primary",
    };
  });

  return [...CORE_TOOLS, ...classrooms];
}

export function AiToolsDirectory({
  subjects,
}: {
  subjects: SubjectClassroom[];
}) {
  const { user, isLoading } = useSession();
  const [category, setCategory] = useState<"All" | ToolCategory>("All");
  const tools = createTools(subjects);
  const visibleTools =
    category === "All"
      ? tools
      : tools.filter((tool) => tool.category === category);

  return (
    <section aria-label="AI tools directory" className="space-y-4">
      <div
        aria-label="Filter AI tools by category"
        className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="group"
      >
        {CATEGORIES.map((item) => {
          const selected = category === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visibleTools.map((tool) => {
          const Icon = tool.icon;
          const available = !isLoading && hasLevel(user, tool.minLevel);
          const card = (
            <>
              <div className="flex items-start justify-between gap-2">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tool.iconStyle}`}>
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-muted px-2 py-1 text-[9px] font-semibold leading-tight text-muted-foreground">
                  {tool.type}
                </span>
              </div>
              <h2 className="mt-3 text-sm font-bold leading-snug text-foreground">
                {tool.title}
              </h2>
              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
              <span
                className={`mt-3 inline-flex items-center gap-1 text-[10px] font-semibold ${
                  isLoading
                    ? "text-muted-foreground"
                    : available
                      ? "text-primary"
                      : "text-amber-800 dark:text-amber-300"
                }`}
              >
                {isLoading
                  ? "Checking access…"
                  : available
                    ? "Open tool"
                    : `Unavailable · ${ACCESS_LABELS[tool.minLevel]} access`}
                {available && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />}
              </span>
            </>
          );
          const baseClass =
            "flex min-h-44 flex-col rounded-2xl border p-3.5 transition-colors sm:min-h-48 sm:p-4";

          return available ? (
            <Link
              key={tool.href}
              href={tool.href}
              className={`${baseClass} border-border/70 bg-card hover:border-primary/40 hover:bg-accent/40`}
            >
              {card}
            </Link>
          ) : (
            <div
              key={tool.href}
              aria-disabled="true"
              className={`${baseClass} border-amber-300/70 bg-amber-50/70 dark:border-amber-800/50 dark:bg-amber-950/20`}
            >
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}
