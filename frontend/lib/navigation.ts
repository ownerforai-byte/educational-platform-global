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
import {
  Home,
  BookOpen,
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
  Target,
  Search,
  Lightbulb,
  FileText,
  Box,
  ListTree,
  Bot,
} from "lucide-react";

export type NavIcon = ComponentType<{ className?: string }>;

export type NavItem = {
  href: string;
  label: string;
  icon: NavIcon;
  badge?: string;
  badgeClass?: string;
};

export type NavSection = {
  /** Stable key — the sidebar persists per-section collapse on it. */
  id: string;
  label: string;
  icon: NavIcon;
  /** Rendered only for allowlisted owner emails (frontend/lib/owner). */
  ownerOnly?: boolean;
  items: NavItem[];
};

/** Quick shortcuts shown at the very top of both navigation surfaces. */
const primaryItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/site-index", label: "Everything Index", icon: ListTree, badge: "All", badgeClass: "bg-primary/15 text-primary" },
  { href: "/search", label: "Search Index", icon: Search, badge: "Ctrl+K", badgeClass: "bg-muted text-muted-foreground border border-border/80" },
  { href: "/levels", label: "Curriculum Levels", icon: Compass, badge: "Tracks", badgeClass: "bg-sky-500/15 text-sky-500" },
];

const curriculumItems: NavItem[] = [
  { href: "/class-11-notes", label: "Class 11 Hub", icon: BookOpen, badge: "XI", badgeClass: "bg-sky-500/15 text-sky-500" },
  { href: "/class-12-notes", label: "Class 12 Hub", icon: BookOpen, badge: "XII", badgeClass: "bg-violet-500/15 text-violet-500" },
  { href: "/subjects", label: "All 6 Subjects", icon: Layers, badge: "Core", badgeClass: "bg-emerald-500/15 text-emerald-500" },
  { href: "/syllabus", label: "Official CDC Syllabus", icon: GraduationCap },
  { href: "/practical", label: "Practical Lab Manuals", icon: FlaskConical, badge: "Labs", badgeClass: "bg-emerald-500/15 text-emerald-500" },
  { href: "/legend", label: "Concept Legends & Facts", icon: Lightbulb, badge: "Facts", badgeClass: "bg-amber-500/15 text-amber-500" },
  { href: "/notes", label: "Notes Archive", icon: FileText, badge: "Archive", badgeClass: "bg-blue-500/15 text-blue-500" },
];

const stemAndRigorItems: NavItem[] = [
  { href: "/lab", label: "Virtual 3D Labs", icon: FlaskConical, badge: "3D", badgeClass: "bg-violet-500/15 text-violet-500" },
  { href: "/lab/3d", label: "3D Simulations Hub", icon: Box, badge: "96+", badgeClass: "bg-indigo-500/15 text-indigo-500" },
  { href: "/lab/bio-3d-organelles", label: "Cell Organelles 3D", icon: Sparkles, badge: "13 Org", badgeClass: "bg-emerald-500/15 text-emerald-500" },
  { href: "/periodic-table", label: "Periodic Table & CEE", icon: Atom, badge: "118", badgeClass: "bg-cyan-500/15 text-cyan-500" },
  { href: "/theorems", label: "Theorems & Proofs", icon: Binary, badge: "Rigor", badgeClass: "bg-amber-500/15 text-amber-500" },
  { href: "/derivations", label: "Formula Derivations", icon: Layers, badge: "Steps", badgeClass: "bg-rose-500/15 text-rose-500" },
  { href: "/graphs", label: "Science Graph Bank", icon: LineChart, badge: "Charts", badgeClass: "bg-indigo-500/15 text-indigo-500" },
  { href: "/mindmap", label: "Visual Mindmaps", icon: Workflow, badge: "Maps", badgeClass: "bg-purple-500/15 text-purple-500" },
];

const toolsItems: NavItem[] = [
  { href: "/ai", label: "Captain Studio Hub", icon: Bot, badge: "4 Tools", badgeClass: "bg-violet-500/15 text-violet-500" },
  { href: "/chat", label: "Captain Study Assistant", icon: Sparkles, badge: "Chat", badgeClass: "bg-fuchsia-500/15 text-fuchsia-500" },
  { href: "/ai/tutor", label: "Captain Tutor Console", icon: Bot, badge: "History", badgeClass: "bg-fuchsia-500/15 text-fuchsia-500" },
  { href: "/ai/search", label: "Captain Curriculum Search", icon: Search, badge: "Semantic", badgeClass: "bg-emerald-500/15 text-emerald-500" },
  { href: "/ai-quiz", label: "Adaptive Captain Quiz", icon: HelpCircle, badge: "Adaptive", badgeClass: "bg-blue-500/15 text-blue-500" },
  { href: "/quiz", label: "Practice Quiz Bank", icon: Target, badge: "PYQ", badgeClass: "bg-teal-500/15 text-teal-500" },
  { href: "/exam-countdown", label: "Exam Countdown", icon: Target, badge: "NEB", badgeClass: "bg-amber-500/15 text-amber-500" },
];

const extendedItems: NavItem[] = [
  { href: "/knowledge", label: "Knowledge Hub", icon: BookOpen, badge: "Concepts", badgeClass: "bg-sky-500/15 text-sky-500" },
  { href: "/lessons", label: "Lessons Library", icon: GraduationCap, badge: "Theory", badgeClass: "bg-indigo-500/15 text-indigo-500" },
  { href: "/loksewa", label: "Loksewa GK", icon: Users, badge: "GK", badgeClass: "bg-orange-500/15 text-orange-500" },
  { href: "/world-knowledge", label: "World Knowledge", icon: Globe, badge: "Global", badgeClass: "bg-emerald-500/15 text-emerald-500" },
  { href: "/resources", label: "Resource Vault", icon: Bookmark, badge: "Vault", badgeClass: "bg-pink-500/15 text-pink-500" },
];

const accountItems: NavItem[] = [
  { href: "/profile", label: "My Profile", icon: User, badge: "Account" },
  { href: "/progress", label: "My Progress", icon: UserCheck, badge: "Stats" },
  { href: "/bookmarks", label: "Saved Bookmarks", icon: Bookmark, badge: "Saved" },
  { href: "/credits", label: "Credits & Plan", icon: Coins, badge: "Wallet" },
];

const ownerItems: NavItem[] = [
  { href: "/owner", label: "Owner Console", icon: Crown, badge: "Master" },
  { href: "/owner/users", label: "User Management", icon: Users, badge: "Users" },
  { href: "/controller", label: "Controller", icon: ShieldCheck, badge: "Admin" },
];

/**
 * Ordered exactly as the menus render it. The sidebar renders `primary` as its
 * own flat block and wraps the rest in collapsible sections; the mobile drawer
 * renders every section, including the owner-only one for owner accounts.
 */
export const NAV_SECTIONS: NavSection[] = [
  { id: "primary", label: "Quick Access", icon: Compass, items: primaryItems },
  { id: "curriculum", label: "Curriculum & Notes", icon: BookOpen, items: curriculumItems },
  { id: "stem", label: "STEM Labs & Rigor", icon: FlaskConical, items: stemAndRigorItems },
  { id: "tools", label: "Captain & Assessment", icon: Sparkles, items: toolsItems },
  { id: "extended", label: "Knowledge & Prep", icon: Globe, items: extendedItems },
  { id: "account", label: "Student Desk", icon: UserCheck, items: accountItems },
  { id: "owner", label: "Owner", icon: Crown, ownerOnly: true, items: ownerItems },
];

/** Flat list of every menu destination, in render order. */
export const NAV_HREFS: string[] = NAV_SECTIONS.flatMap((section) =>
  section.items.map((item) => item.href),
);
