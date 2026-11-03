/**
 * Navigation — ONE definition of what the platform's navigation contains.
 *
 * The sidebar and the mobile drawer used to keep their own hand-written copies
 * of these item lists and they drifted: the drawer never had "Everything Index",
 * never had the Owner section (so owners on a phone could not reach /owner or
 * /controller), and labels/badges silently diverged. Both surfaces now import
 * from here, so a route can only be added or removed once — and the route tests
 * (tests/lib/navigation.test.ts) can validate the whole menu at once.
 *
 * Icons are plain lucide components so this module stays data-only: it renders
 * nothing itself and can be imported by tests without a DOM.
 */

import type { ComponentType } from "react";
import { ACCESS_RANK, type AccessLevel } from "@/lib/access-level";
import {
  Home,
  BookOpen,
  Calendar,
  FlaskConical,
  Layers,
  GraduationCap,
  User,
  UserCheck,
  Bookmark,
  Users,
  Coins,
  Crown,
  ShieldCheck,
  Sparkles,
  Atom,
  Binary,
  Workflow,
  HelpCircle,
  LineChart,
  Compass,
  Globe,
  Sigma,
  Target,
  Search,
  Lightbulb,
  FileText,
  Box,
  ListTree,
  Bot,
  Languages,
  History,
  Activity,
  CalendarCheck,
  NotebookPen,
  Repeat,
  Shapes,
  LayoutDashboard,
  Settings,
  Rocket,
  Timer,
  Award,
} from "lucide-react";

export type NavIcon = ComponentType<{ className?: string }>;

export type NavItem = {
  href: string;
  label: string;
  icon: NavIcon;
  badge?: string;
  badgeClass?: string;
  /** Rendered only for allowlisted owner emails (frontend/lib/owner). */
  ownerOnly?: boolean;
  /** Rendered only for owner + R1-granted emails (the R1 daily-life layer). */
  r1Only?: boolean;
  /**
   * Minimum ACCESS LEVEL that unlocks this index — the plan.md §3 ladder (the
   * same rungs the public /plans matrix shows; plan.md supersedes the older
   * "search-only member" wording). Defaults to the section's level, then
   * "member". Owner rung reaches all.
   */
  minLevel?: AccessLevel;
};

export type NavSection = {
  /** Stable key — the sidebar persists per-section collapse on it. */
  id: string;
  label: string;
  icon: NavIcon;
  /** Rendered only for allowlisted owner emails (frontend/lib/owner). */
  ownerOnly?: boolean;
  /** Rendered only for owner + R1-granted emails (the R1 daily-life layer). */
  r1Only?: boolean;
  /** Default minimum access level for every item in this section (see NavItem). */
  minLevel?: AccessLevel;
  items: NavItem[];
};

/**
 * Resolve the minimum access level that unlocks an item: the item's own level
 * wins, then its section's, then the signed-in base rung. Shared by the sidebar
 * and the mobile drawer so the two surfaces can never disagree on who sees an
 * index.
 */
export function navMinLevel(
  item: NavItem,
  section?: Pick<NavSection, "minLevel">,
): AccessLevel {
  return item.minLevel ?? section?.minLevel ?? "member";
}

/** Quick shortcuts shown at the very top of both navigation surfaces. */
const primaryItems: NavItem[] = [
  // plan.md §3: every signed-in rung has its own tier home (/home/member|plus|
  // pro|owner), so Home opens at Member; the two whole-platform indexes are
  // Pro's "all indexes" headline.
  { href: "/home", label: "Home", icon: Home, minLevel: "member" },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, minLevel: "member" },
  { href: "/onboarding", label: "Set Study Goals", icon: Rocket, minLevel: "visitor" },
  { href: "/planner", label: "Weekly Planner", icon: Calendar, minLevel: "plus" },
  { href: "/srs", label: "Spaced Repetition", icon: Layers, minLevel: "plus" },
  { href: "/mock-exams", label: "Mock Exams", icon: Timer, minLevel: "pro" },
  { href: "/analytics", label: "Analytics", icon: LineChart, minLevel: "pro" },
  { href: "/streaks", label: "Streaks and Badges", icon: Award, minLevel: "member" },
  { href: "/community", label: "Community", icon: Users, minLevel: "plus" },
  { href: "/ask", label: "Ask Veer", icon: HelpCircle, minLevel: "member" },
  { href: "/site-index", label: "Everything Index", icon: ListTree, minLevel: "pro" },
  { href: "/levels", label: "Curriculum Levels", icon: Compass, minLevel: "pro" },
];

const curriculumItems: NavItem[] = [
  // Class 11, subjects, and notes open at Plus. Members keep the three Veer chats.
  { href: "/class-11-notes", label: "Class 11 Hub", icon: BookOpen, minLevel: "plus" },
  { href: "/class-12-notes", label: "Class 12 Hub", icon: BookOpen, minLevel: "plus" },
  { href: "/subjects", label: "Subjects", icon: Layers, minLevel: "plus" },
  { href: "/pyqs", label: "Previous Year Questions", icon: History, minLevel: "plus" },
  { href: "/syllabus", label: "Official CDC Syllabus", icon: GraduationCap, minLevel: "plus" },
  { href: "/syllabus/additions", label: "Syllabus by Year", icon: Calendar, minLevel: "plus" },
  { href: "/practical", label: "Practical Lab Manuals", icon: FlaskConical, minLevel: "plus" },
  { href: "/legend", label: "Concept Legends & Facts", icon: Lightbulb, minLevel: "plus" },
  { href: "/notes", label: "Notes Archive", icon: FileText, minLevel: "plus" },
];

const stemAndRigorItems: NavItem[] = [
  // Interactive labs are Pro+; visuals/mindmaps stay open to everyone; proofs
  // and graph banks are Pro as well.
  { href: "/lab", label: "Virtual 3D Labs", icon: FlaskConical, minLevel: "plus" },
  { href: "/lab/3d", label: "3D Simulations Hub", icon: Box, minLevel: "plus" },
  { href: "/lab/bio-3d-organelles", label: "Cell Organelles 3D", icon: Sparkles, minLevel: "plus" },
  { href: "/ad-p-table", label: "Ad P Table", icon: Atom, minLevel: "plus" },
  { href: "/periodic-table", label: "Periodic Table & CEE", icon: Atom, minLevel: "pro" },
  { href: "/theorems", label: "Theorems & Proofs", icon: Binary, minLevel: "pro" },
  { href: "/derivations", label: "Formula Derivations", icon: Layers, minLevel: "pro" },
  { href: "/formulas", label: "Formula Sheets", icon: Sigma, minLevel: "plus" },
  { href: "/graphs", label: "Science Graph Bank", icon: LineChart, minLevel: "pro" },
  { href: "/mindmap", label: "Visual Mindmaps", icon: Workflow, minLevel: "plus" },
];

const toolsItems: NavItem[] = [
  // Members get the three chat consoles only (3 messages / day). Every other
  // Veer tool opens at Plus.
  { href: "/ai", label: "AI Console", icon: Bot, minLevel: "plus" },
  { href: "/chat", label: "Veer Study Assistant", icon: Sparkles, minLevel: "member" },
  { href: "/chat/nepali", label: "Nepali Assistant", icon: Languages, minLevel: "member" },
  { href: "/chat/grammar", label: "Grammar Console", icon: BookOpen, minLevel: "member" },
  { href: "/ai/math", label: "Veer Math Solver", icon: Sigma, minLevel: "plus" },
  { href: "/ai/deep-dive", label: "Deep Concept Studio", icon: Lightbulb, minLevel: "plus" },
  { href: "/ai/diagrams", label: "Diagram Hub", icon: Shapes, minLevel: "plus" },
  { href: "/ai/tutor", label: "Veer Tutor Console", icon: Bot, minLevel: "plus" },
  { href: "/ai/search", label: "Veer Curriculum Search", icon: Search, minLevel: "plus" },
  { href: "/ai-quiz", label: "Adaptive Veer Quiz", icon: HelpCircle, minLevel: "plus" },
  // Practice sets open at Plus. Members keep the three chat consoles only.
  { href: "/quiz", label: "Practice Quiz Bank", icon: Target, minLevel: "plus" },
  // plan.md §3 row 12: the board-exam suite (countdown, grand tests) is Plus.
  { href: "/exam-countdown", label: "Exam Countdown", icon: Target, minLevel: "pro" },
];

const extendedItems: NavItem[] = [
  // plan.md §3 rows 18–23: resources & reference open at Member; the knowledge
  // hubs, Loksewa and the PDF library are Pro.
  { href: "/knowledge", label: "Knowledge Hub", icon: BookOpen, minLevel: "pro" },
  { href: "/lessons", label: "Lessons Library", icon: GraduationCap, minLevel: "pro" },
  { href: "/loksewa", label: "Loksewa GK", icon: Users, minLevel: "pro" },
  { href: "/world-knowledge", label: "World Knowledge", icon: Globe, minLevel: "pro" },
  { href: "/resources", label: "Resource Vault", icon: Bookmark, minLevel: "plus" },
  { href: "/pdfs", label: "PDF Library", icon: FileText, minLevel: "pro" },
];

const accountItems: NavItem[] = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/progress", label: "My Progress", icon: UserCheck },
  { href: "/bookmarks", label: "Saved Bookmarks", icon: Bookmark },
  { href: "/report-card", label: "Report Card", icon: FileText, minLevel: "plus" },
  { href: "/settings", label: "Settings", icon: Settings, minLevel: "member" },
  { href: "/credits", label: "Credits & Plan", icon: Coins },
];

const ownerItems: NavItem[] = [
  { href: "/owner", label: "Owner Console", icon: Crown },
  { href: "/owner/users", label: "User Management", icon: Users },
  { href: "/controller", label: "Controller", icon: ShieldCheck },
];

const r1Items: NavItem[] = [
  { href: "/r1", label: "R1 Today", icon: Sparkles },
  { href: "/r1/activities", label: "Daily Activities", icon: Activity },
  { href: "/r1/plans", label: "My Plans", icon: CalendarCheck },
  { href: "/r1/journal", label: "Daily Journal", icon: NotebookPen },
  { href: "/r1/habits", label: "Habit Streaks", icon: Repeat },
];

/**
 * Ordered exactly as the menus render it. The sidebar renders `primary` as its
 * own flat block and wraps the rest in collapsible sections; the mobile drawer
 * renders every section, including the owner-only one for owner accounts.
 */
export const NAV_SECTIONS: NavSection[] = [
  // Section minLevels are only the default for items without their own; every
  // item above carries its plan.md §3 rung explicitly.
  { id: "primary", label: "Quick Access", icon: Compass, minLevel: "member", items: primaryItems },
  { id: "curriculum", label: "Curriculum & Notes", icon: BookOpen, minLevel: "member", items: curriculumItems },
  { id: "stem", label: "Labs & Reference", icon: FlaskConical, minLevel: "visitor", items: stemAndRigorItems },
  { id: "tools", label: "AI & Practice", icon: Sparkles, minLevel: "visitor", items: toolsItems },
  { id: "extended", label: "More Resources", icon: Globe, minLevel: "member", items: extendedItems },
  { id: "account", label: "Student Desk", icon: UserCheck, minLevel: "member", items: accountItems },
  { id: "r1", label: "R1 · Daily Life", icon: Sparkles, r1Only: true, items: r1Items },
  { id: "owner", label: "Owner", icon: Crown, ownerOnly: true, items: ownerItems },
];

/** Flat list of every menu destination, in render order. */
export const NAV_HREFS: string[] = NAV_SECTIONS.flatMap((section) =>
  section.items.map((item) => item.href),
);

/* ── Quick links (the compact fast path) ─────────────────────────────────── */

/**
 * THE QUICK-LINKS REGISTRY — one definition for both surfaces that show the
 * compact fast path: the mobile quick-nav strip and the tier home pages'
 * quick-links rail (components/home/tier-interfaces.tsx).
 *
 * Tier rule (owner direction 2026-10-23 + plan.md §4 "locked cards stay
 * visible"): quick links start at the Member rung — visitors get header + body
 * + footer only — and each rung sees what it can reach while the rest stay
 * visible in a muted disabled state. Plans are available from the footer only.
 */
export const QUICK_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/class-11-notes", label: "Class 11" },
  { href: "/class-12-notes", label: "Class 12" },
  { href: "/subjects", label: "Subjects" },
  { href: "/lab", label: "Labs" },
  { href: "/quiz", label: "Quiz" },
  { href: "/chat", label: "AI" },
  { href: "/ai/math", label: "Math" },
] as const;

/**
 * The rung a quick link first opens at — DERIVED from the NAV registry above
 * (the plan.md §3 ladder, one tier per destination), so the quick strip, the
 * tier-home rails and the sidebar/drawer can never disagree on who reaches a
 * link. Used for tier badges and "Unavailable on this plan" copy.
 */
export function quickLinkMinTier(href: string): AccessLevel {
  for (const section of NAV_SECTIONS) {
    const item = section.items.find((i) => i.href === href);
    if (item) return navMinLevel(item, section);
  }
  return "member";
}

/** Whether this rung reaches the quick link (owner reaches everything). */
export function quickLinkUnlocked(level: AccessLevel, href: string): boolean {
  return ACCESS_RANK[level] >= ACCESS_RANK[quickLinkMinTier(href)];
}
