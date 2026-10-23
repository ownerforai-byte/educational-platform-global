import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calculator,
  CalendarCheck,
  Crown,
  FileQuestion,
  FileText,
  FlaskConical,
  FunctionSquare,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  Library,
  LineChart,
  MessageCircle,
  NotebookPen,
  PenTool,
  Search,
  Settings,
  Sigma,
  Stethoscope,
  Target,
  TrendingUp,
  Brain,
} from "lucide-react";
import { hasLevel, type AccessLevel } from "@/lib/access-level";
import type { AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";

/**
 * THE SECTION REGISTRY — plan.md §3, the single source of truth for
 * "which content sections exist and which rung opens each one".
 *
 * Consumed by:
 *   - the home sections rail (components/home/home-sections.tsx),
 *   - the public /plans availability matrix,
 *   - any tier gate that must decide "may this viewer reach this section?".
 *
 * Diversity rule (plan.md §4): new kinds of content land as NEW rows here —
 * never as an endless column inside an existing section.
 */

export interface PlatformSection {
  id: string;
  title: string;
  description: string;
  /** Minimum access rung (plan.md §2). Owner reaches everything. */
  minTier: AccessLevel;
  icon: LucideIcon;
  href: string;
}

export const SECTIONS: PlatformSection[] = [
  // ── Guest rung ──
  {
    id: "overview-plans",
    title: "Overview & Plans",
    description: "What the platform is, and the whole tier ladder in card form.",
    minTier: "visitor",
    icon: Globe,
    href: "/plans",
  },
  {
    id: "visuals-mindmaps",
    title: "Visuals & Mindmaps",
    description: "HD visuals, concept maps and legend sheets — free for everyone.",
    minTier: "visitor",
    icon: ImageIcon,
    href: "/mindmap",
  },
  {
    id: "labs-3d",
    title: "3D Labs & Simulations",
    description: "Interactive labs across physics, chemistry, biology and math.",
    minTier: "visitor",
    icon: FlaskConical,
    href: "/lab",
  },
  {
    id: "diagram-hub",
    title: "Diagram Hub",
    description: "The drawing studio — every diagram, editable.",
    minTier: "visitor",
    icon: PenTool,
    href: "/mind-studio",
  },
  {
    id: "ai-quiz",
    title: "AI Quiz",
    description: "Adaptive quizzes with a free guest pool.",
    minTier: "visitor",
    icon: Brain,
    href: "/ai-quiz",
  },
  {
    id: "veer-chat",
    title: "Veer AI Chat",
    description: "The AI tutor — spark-metered on every rung (3/7/25/50 per day).",
    minTier: "visitor",
    icon: MessageCircle,
    href: "/ai",
  },

  // ── Member rung ──
  {
    id: "search",
    title: "Search",
    description: "Search the whole library.",
    minTier: "member",
    icon: Search,
    href: "/search",
  },
  {
    id: "class-11-notes",
    title: "Class 11 Notes",
    description: "Theory notes for all six CDC subjects.",
    minTier: "member",
    icon: BookOpen,
    href: "/class-11-notes",
  },
  {
    id: "formula-sheets",
    title: "Formula Sheets",
    description: "One-page formula rails per unit.",
    minTier: "member",
    icon: FunctionSquare,
    href: "/legend",
  },
  {
    id: "resources-reference",
    title: "Resources & Reference",
    description: "Extra references and practical notebooks.",
    minTier: "member",
    icon: Library,
    href: "/resources",
  },
  {
    id: "progress-profile",
    title: "Progress, Profile & Credits",
    description: "XP, streaks, badges and the credits wallet.",
    minTier: "member",
    icon: TrendingUp,
    href: "/profile",
  },

  // ── Plus rung ──
  {
    id: "class-12-notes",
    title: "Class 12 Notes",
    description: "Advanced theory notes and board-exam depth.",
    minTier: "plus",
    icon: GraduationCap,
    href: "/class-12-notes",
  },
  {
    id: "journal",
    title: "Journal",
    description: "Your study journal — private entries, one per day.",
    minTier: "plus",
    icon: NotebookPen,
    href: "/journal",
  },
  {
    id: "worked-numericals",
    title: "Worked Numericals",
    description: "Numerical Physics & Chemistry worked-problem hubs.",
    minTier: "plus",
    icon: Calculator,
    href: "/knowledge/numerical-physics",
  },
  {
    id: "practice-pyq",
    title: "Practice & PYQ",
    description: "Topic practice and past-year question banks — from the past.",
    minTier: "plus",
    icon: FileQuestion,
    href: "/pyqs",
  },
  {
    id: "cee-entrance",
    title: "CEE Medical Entrance",
    description: "CEE-pattern MCQs, traps and high-yield facts.",
    minTier: "plus",
    icon: Stethoscope,
    href: "/ai-quiz",
  },
  {
    id: "board-suite",
    title: "Board Exam Suite",
    description: "Exam countdown, grand tests and CDC syllabi.",
    minTier: "plus",
    icon: Target,
    href: "/exam-countdown",
  },

  // ── Pro rung ──
  {
    id: "derivations-theorems",
    title: "Derivations & Theorems",
    description: "Step-by-step proofs with diagrams.",
    minTier: "pro",
    icon: Sigma,
    href: "/derivations",
  },
  {
    id: "engineering-entrance",
    title: "Engineering (IOE) Entrance",
    description: "Entrance numericals and pattern sets.",
    minTier: "pro",
    icon: Calculator,
    href: "/knowledge/numerical-chemistry",
  },
  {
    id: "loksewa",
    title: "Loksewa",
    description: "Loksewa GK and paper-pattern preparation.",
    minTier: "pro",
    icon: Globe,
    href: "/loksewa",
  },
  {
    id: "graph-bank",
    title: "Graph Bank",
    description: "Science graph bank and plotted explorables.",
    minTier: "pro",
    icon: LineChart,
    href: "/science-graph-bank",
  },
  {
    id: "pdf-library",
    title: "PDF Library",
    description: "Reference documents, each opening in the viewer.",
    minTier: "pro",
    icon: FileText,
    href: "/pdfs",
  },
  {
    id: "knowledge-hubs",
    title: "Knowledge Hubs",
    description: "World Knowledge, General Knowledge, writing & vocabulary.",
    minTier: "pro",
    icon: Globe,
    href: "/knowledge",
  },

  // ── Owner rung ──
  {
    id: "r1-daily-life",
    title: "R1 Daily Life",
    description: "Activities, plans, journal and habits — owner-granted.",
    minTier: "owner",
    icon: CalendarCheck,
    href: "/r1",
  },
  {
    id: "owner-console",
    title: "Owner Console & Control",
    description: "Users, tiers, grants, content control and platform settings.",
    minTier: "owner",
    icon: Crown,
    href: "/owner",
  },
];

/** Section ids, for typed lookups. */
export type SectionId = (typeof SECTIONS)[number]["id"];

/** Look one section up by id. */
export function sectionById(id: string): PlatformSection | undefined {
  return SECTIONS.find((s) => s.id === id);
}

/** Whether this viewer's rung opens the section (owner reaches everything). */
export function isSectionUnlocked(
  user: AiSparkUserLike | null | undefined,
  section: PlatformSection,
): boolean {
  return hasLevel(user, section.minTier);
}

/**
 * Sections to SHOW this viewer. Locked sections stay visible (dimmed cards
 * drive upgrades — plan.md §4), except operator-only surfaces which are hidden
 * entirely below the owner rung.
 */
export function sectionsFor(user: AiSparkUserLike | null | undefined): {
  section: PlatformSection;
  unlocked: boolean;
}[] {
  return SECTIONS.filter(
    (s) => s.id !== "owner-console" || isSectionUnlocked(user, s),
  ).map((section) => ({ section, unlocked: isSectionUnlocked(user, section) }));
}
