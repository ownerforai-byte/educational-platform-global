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
import type { AccessLevel } from "@/lib/access-level";
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
   * Minimum ACCESS LEVEL that unlocks this index (lib/access-level.ts).
   * "member" = Student Desk · "plus" = +Home +Class 11 · "pro" = every index.
   * Defaults to the section's level, then "member". Owner rung reaches all.
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
  { href: "/home", label: "Home", icon: Home, minLevel: "plus" },
  { href: "/site-index", label: "Everything Index", icon: ListTree, minLevel: "pro" },
  { href: "/levels", label: "Curriculum Levels", icon: Compass, minLevel: "pro" },
];

const curriculumItems: NavItem[] = [
  { href: "/class-11-notes", label: "Class 11 Hub", icon: BookOpen, minLevel: "plus" },
  { href: "/class-12-notes", label: "Class 12 Hub", icon: BookOpen },
  { href: "/subjects", label: "Subjects", icon: Layers },
  { href: "/pyqs", label: "Previous Year Questions", icon: History },
  { href: "/syllabus", label: "Official CDC Syllabus", icon: GraduationCap },
  { href: "/syllabus/additions", label: "Syllabus by Year", icon: Calendar },
  { href: "/practical", label: "Practical Lab Manuals", icon: FlaskConical },
  { href: "/legend", label: "Concept Legends & Facts", icon: Lightbulb },
  { href: "/notes", label: "Notes Archive", icon: FileText },
];

const stemAndRigorItems: NavItem[] = [
  { href: "/lab", label: "Virtual 3D Labs", icon: FlaskConical },
  { href: "/lab/3d", label: "3D Simulations Hub", icon: Box },
  { href: "/lab/bio-3d-organelles", label: "Cell Organelles 3D", icon: Sparkles },
  { href: "/periodic-table", label: "Periodic Table & CEE", icon: Atom },
  { href: "/theorems", label: "Theorems & Proofs", icon: Binary },
  { href: "/derivations", label: "Formula Derivations", icon: Layers },
  { href: "/formulas", label: "Formula Sheets", icon: Sigma },
  { href: "/graphs", label: "Science Graph Bank", icon: LineChart },
  { href: "/mindmap", label: "Visual Mindmaps", icon: Workflow },
];

const toolsItems: NavItem[] = [
  // 2026-10-13: the Veer entries are open to every tier — chat is metered by
  // AI sparks (guest 1 / member 7 / plus 25 / pro 50 / owner unlimited per
  // day), not hidden behind the owner allowlist.
  { href: "/ai", label: "AI Console", icon: Bot },
  { href: "/chat", label: "Veer Study Assistant", icon: Sparkles },
  { href: "/chat/nepali", label: "Nepali Assistant", icon: Languages },
  { href: "/chat/grammar", label: "Grammar Console", icon: BookOpen },
  { href: "/ai/tutor", label: "Veer Tutor Console", icon: Bot },
  { href: "/ai/search", label: "Veer Curriculum Search", icon: Search },
  { href: "/ai-quiz", label: "Adaptive Veer Quiz", icon: HelpCircle },
  { href: "/quiz", label: "Practice Quiz Bank", icon: Target },
  { href: "/exam-countdown", label: "Exam Countdown", icon: Target },
];

const extendedItems: NavItem[] = [
  { href: "/knowledge", label: "Knowledge Hub", icon: BookOpen },
  { href: "/lessons", label: "Lessons Library", icon: GraduationCap },
  { href: "/loksewa", label: "Loksewa GK", icon: Users },
  { href: "/world-knowledge", label: "World Knowledge", icon: Globe },
  { href: "/resources", label: "Resource Vault", icon: Bookmark },
  { href: "/pdfs", label: "PDF Library", icon: FileText },
];

const accountItems: NavItem[] = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/progress", label: "My Progress", icon: UserCheck },
  { href: "/bookmarks", label: "Saved Bookmarks", icon: Bookmark },
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
  { id: "primary", label: "Quick Access", icon: Compass, items: primaryItems },
  { id: "curriculum", label: "Curriculum & Notes", icon: BookOpen, minLevel: "pro", items: curriculumItems },
  { id: "stem", label: "Labs & Reference", icon: FlaskConical, minLevel: "pro", items: stemAndRigorItems },
  { id: "tools", label: "AI & Practice", icon: Sparkles, minLevel: "pro", items: toolsItems },
  { id: "extended", label: "More Resources", icon: Globe, minLevel: "pro", items: extendedItems },
  { id: "account", label: "Student Desk", icon: UserCheck, minLevel: "member", items: accountItems },
  { id: "r1", label: "R1 · Daily Life", icon: Sparkles, r1Only: true, items: r1Items },
  { id: "owner", label: "Owner", icon: Crown, ownerOnly: true, items: ownerItems },
];

/** Shared header shortcuts, resolved from the same access rules as the menus. */
export const QUICK_NAV_ITEMS: NavItem[] = [
  { href: "/search", label: "Search", icon: Search, minLevel: "visitor" },
  ...["/home", "/class-11-notes", "/class-12-notes", "/subjects", "/lab", "/quiz", "/ai"].map((href) => {
    const section = NAV_SECTIONS.find((entry) => entry.items.some((item) => item.href === href))!;
    const item = section.items.find((entry) => entry.href === href)!;
    const labels: Record<string, string> = {
      "/class-11-notes": "Class 11", "/class-12-notes": "Class 12",
      "/subjects": "Subjects", "/lab": "Labs", "/quiz": "Practice", "/ai": "AI tools",
    };
    return { ...item, label: labels[href] ?? item.label, minLevel: navMinLevel(item, section) };
  }),
];

/** Flat list of every menu destination, in render order. */
export const NAV_HREFS: string[] = NAV_SECTIONS.flatMap((section) =>
  section.items.map((item) => item.href),
);
