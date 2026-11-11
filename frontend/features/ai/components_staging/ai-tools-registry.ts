import {
  Atom,
  Bot,
  Brain,
  Calculator,
  Compass,
  History,
  LayoutGrid,
  MessageCircle,
  Search,
  Shapes,
  type LucideIcon,
} from "lucide-react";

/**
 * The one list of Veer tools.
 *
 * The console rail, the workspace command deck and the hub directory all read
 * from here, so a tool can never appear in the rail but be missing from the
 * workspace (or carry two different descriptions on two pages).
 */
export interface AiTool {
  href: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  group: AiToolGroup;
  /** Accent for the icon chip. */
  accent: string;
}

export type AiToolGroup = "Study" | "Solve" | "Create" | "Review";

export const AI_TOOL_GROUPS: AiToolGroup[] = ["Study", "Solve", "Create", "Review"];

export const AI_TOOLS: AiTool[] = [
  {
    href: "/ai/workspace",
    label: "Workspace",
    blurb: "Every tool in one place, grouped by what you are trying to do.",
    icon: LayoutGrid,
    group: "Study",
    accent: "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    href: "/ai/tutor",
    label: "Tutor console",
    blurb: "Long-form teaching with saved conversations and a prompt enhancer.",
    icon: Bot,
    group: "Study",
    accent: "border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
  },
  {
    href: "/ai-quiz",
    label: "Quiz studio",
    blurb: "Generate MCQ or writing sets and get them graded with feedback.",
    icon: Brain,
    group: "Study",
    accent: "border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    href: "/chat",
    label: "Quick chat",
    blurb: "One-off questions with subject modes — no saved thread needed.",
    icon: MessageCircle,
    group: "Study",
    accent: "border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    href: "/ai/math",
    label: "Math solver",
    blurb: "Step-by-step solutions for numericals and derivations.",
    icon: Calculator,
    group: "Solve",
    accent: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    href: "/ai/deep-dive",
    label: "Deep dive",
    blurb: "Take one topic apart at the depth you choose.",
    icon: Compass,
    group: "Solve",
    accent: "border-teal-500/25 bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    href: "/search",
    label: "Curriculum search",
    blurb: "Ask in plain language; get notes, labs and PYQs with links.",
    icon: Search,
    group: "Solve",
    accent: "border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    href: "/ai/diagrams",
    label: "Diagram hub",
    blurb: "Researched, labelled figures rendered as sharp vectors.",
    icon: Shapes,
    group: "Create",
    accent: "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    href: "/ai/subjects",
    label: "Subject classrooms",
    blurb: "One classroom per subject, each with its own closed history.",
    icon: Atom,
    group: "Study",
    accent: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    href: "/ai/history",
    label: "History console",
    blurb: "Search what you already discussed and pick the thread back up.",
    icon: History,
    group: "Review",
    accent: "border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
  },
];

export function toolsInGroup(group: AiToolGroup): AiTool[] {
  return AI_TOOLS.filter((tool) => tool.group === group);
}
