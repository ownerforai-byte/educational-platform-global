/**
 * navigation.ts — THE shared registry for sidebar and footer destinations.
 *
 * BEGINNER GUIDE: How this file works
 * ─────────────────────────────────────
 * 1. Every page on the platform is listed here exactly ONCE.
 * 2. The sidebar, mobile drawer, and footer all read FROM THIS FILE.
 *    That means you only need to add/remove/rename a link in one place.
 * 3. Each link has a `minLevel` — the lowest plan tier that can open it:
 *      "guest" = everyone (even signed-out guests)
 *      "member"  = any signed-in account
 *      "plus"    = Plus plan and above
 *      "pro"     = Pro plan and above
 *      "owner"   = owner email only
 * 4. The `icon` is just a visual; it does not affect access.
 * 5. `hideFromSidebar` keeps footer/home/learn destinations out of the long
 *    sidebar and drawer list without removing them from the shared registry.
 *
 * HOW TO ADD A NEW PAGE
 * ─────────────────────
 *   1. Add a `page.tsx` under `frontend/app/(app)/your-page/` (or `frontend/app/your-page/` for public pages).
 *   2. Add one entry to the correct array below (e.g. `curriculumItems`).
 *   3. Set the right `minLevel` (who should see it).
 *   4. Done — the sidebar, drawer and footer pick it up automatically.
 *
 * DO NOT duplicate a route. The navigation test will catch it.
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
  Download,
  Gift,
  Receipt,
  Repeat,
  Shapes,
  LayoutDashboard,
  Settings,
  Rocket,
  Timer,
  Award,
  Bell,
  MessageSquare,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
// These describe the shape of each link and each group of links.

/** A single navigation link (one row in the sidebar or footer). */
export type NavIcon = ComponentType<{ className?: string }>;

export type NavItem = {
  href: string;       // The URL path, e.g. "/class-11-notes"
  label: string;      // The text shown in the menu
  icon: NavIcon;      // The small icon shown next to the label
  badge?: string;     // Optional small badge text (e.g. "New")
  badgeClass?: string;
  /** Only show this item to owner email addresses. */
  ownerOnly?: boolean;
  /** Only show this item to owner + R1-granted emails. */
  r1Only?: boolean;
  /**
   * The minimum plan tier needed to reach this page.
   * If missing, the section's default is used, then "member".
   */
  minLevel?: AccessLevel;
  /** Keep this destination in the registry/footer, but omit it from the sidebar and drawer. */
  hideFromSidebar?: boolean;
};

/** A collapsible group of navigation links (one section in the sidebar). */
export type NavSection = {
  id: string;         // Stable key used to save collapse state (don't change these)
  label: string;      // Section heading shown in the sidebar
  icon: NavIcon;
  ownerOnly?: boolean;
  r1Only?: boolean;
  minLevel?: AccessLevel;
  items: NavItem[];
};

/**
 * Returns the minimum tier for a single item.
 * Order of priority: item's own setting → section default → "member".
 * Used by the sidebar and footer so both agree on who sees what.
 */
export function navMinLevel(
  item: NavItem,
  section?: Pick<NavSection, "minLevel">,
): AccessLevel {
  return item.minLevel ?? section?.minLevel ?? "member";
}

export function isSidebarNavItem(item: NavItem): boolean {
  return !item.hideFromSidebar;
}

// ─── Link groups ─────────────────────────────────────────────────────────────
// Each array below is ONE section of the navigation.
// Add new pages to the most appropriate array.

/**
 * Quick Access — the top links every signed-in user sees first.
 * These are the most-used destinations: home, dashboard, planner, etc.
 */
const primaryItems: NavItem[] = [
  { href: "/home",          label: "Home",               icon: Home,          minLevel: "member"  },
  { href: "/dashboard",     label: "Dashboard",          icon: LayoutDashboard, minLevel: "member" },
  { href: "/onboarding",    label: "Set Study Goals",    icon: Rocket,        minLevel: "guest" },
  { href: "/planner",       label: "Weekly Planner",     icon: Calendar,      minLevel: "plus"    },
  { href: "/srs",           label: "Spaced Repetition",  icon: Layers,        minLevel: "plus"    },
  { href: "/mock-exams",    label: "Mock Exams",         icon: Timer,         minLevel: "pro"     },
  { href: "/analytics",     label: "Analytics",          icon: LineChart,     minLevel: "pro"     },
  { href: "/streaks",       label: "Streaks and Badges", icon: Award,         minLevel: "member"  },
  { href: "/community",     label: "Community",          icon: Users,         minLevel: "plus"    },
  { href: "/ask",           label: "Ask Veer",           icon: HelpCircle,    minLevel: "member"  },
  { href: "/my-notes",      label: "My Notes",           icon: NotebookPen,   minLevel: "member"  },
  { href: "/downloads",     label: "Offline Study",      icon: Download,      minLevel: "owner"   },
  { href: "/billing",       label: "Billing",            icon: Receipt,       minLevel: "member", hideFromSidebar: true },
  { href: "/referrals",     label: "Referrals",          icon: Gift,          minLevel: "plus"    },
  { href: "/site-index",    label: "Everything Index",   icon: ListTree,      minLevel: "pro"     },
  { href: "/levels",        label: "Curriculum Levels",  icon: Compass,       minLevel: "pro"     },
  { href: "/practice",      label: "Practice Hub",       icon: Target,        minLevel: "plus", hideFromSidebar: true },
  { href: "/exams",         label: "Exam Hub",           icon: GraduationCap, minLevel: "plus", hideFromSidebar: true },
  { href: "/revision",      label: "Quick Revision",     icon: Repeat,        minLevel: "plus"    },
  { href: "/leaderboard",   label: "Leaderboard",        icon: Award,         minLevel: "plus"    },
  { href: "/goals",         label: "Study Goals",        icon: Target,        minLevel: "member"  },
  { href: "/schedule",      label: "Study Schedule",     icon: Calendar,      minLevel: "plus"    },
  { href: "/certificates",  label: "Certificates",       icon: Award,         minLevel: "plus"    },
  { href: "/announcements", label: "Announcements",      icon: Bell,          minLevel: "member"  },
  { href: "/feedback",      label: "Send Feedback",      icon: MessageSquare, minLevel: "member"  },
  { href: "/changelog",     label: "What's New",         icon: Sparkles,      minLevel: "member"  },
  { href: "/status",        label: "Platform Status",    icon: Activity,      minLevel: "member"  },
];

/**
 * Curriculum & Notes — all class, subject, and syllabus pages.
 * Opens at Plus (class notes cost 1 content spark to unlock).
 */
const curriculumItems: NavItem[] = [
  // Top-level hubs
  { href: "/class-11-notes",  label: "Class 11 Hub",    icon: BookOpen,    minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes",  label: "Class 12 Hub",    icon: BookOpen,    minLevel: "plus", hideFromSidebar: true },
  { href: "/subjects",        label: "Subjects",        icon: Layers,      minLevel: "plus", hideFromSidebar: true },
  { href: "/pyqs",            label: "Past Year Questions", icon: History,  minLevel: "plus", hideFromSidebar: true },
  { href: "/syllabus",        label: "Official Syllabus",  icon: GraduationCap, minLevel: "plus", hideFromSidebar: true },
  { href: "/syllabus/additions", label: "Syllabus by Year", icon: Calendar, minLevel: "plus" },
  { href: "/practical",       label: "Practical Manuals",  icon: FlaskConical, minLevel: "plus" },
  { href: "/legend",          label: "Concept Legends",    icon: Lightbulb, minLevel: "plus" },
  { href: "/notes",           label: "Notes Archive",      icon: FileText,  minLevel: "plus" },
  { href: "/journal",         label: "Study Journal",      icon: NotebookPen, minLevel: "pro" },
  { href: "/search",          label: "Search",             icon: Search,    minLevel: "plus" },

  // Class 11 subjects — each has its own hub page and a theory sub-page
  { href: "/class-11-notes/physics",           label: "Physics (Class 11)",          icon: Atom,        minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/physics/theory",    label: "Physics Theory (11)",         icon: Atom,        minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/chemistry",         label: "Chemistry (Class 11)",        icon: FlaskConical, minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/chemistry/theory",  label: "Chemistry Theory (11)",       icon: FlaskConical, minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/biology",           label: "Biology (Class 11)",          icon: BookOpen,    minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/biology/theory",    label: "Biology Theory (11)",         icon: BookOpen,    minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/mathematics",       label: "Mathematics (Class 11)",      icon: Sigma,       minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/mathematics/theory", label: "Mathematics Theory (11)",    icon: Sigma,       minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/english",           label: "English (Class 11)",          icon: Languages,   minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/english/theory",    label: "English Theory (11)",         icon: Languages,   minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/nepali",            label: "Nepali (Class 11)",           icon: Languages,   minLevel: "plus", hideFromSidebar: true },
  { href: "/class-11-notes/nepali/theory",     label: "Nepali Theory (11)",          icon: Languages,   minLevel: "plus", hideFromSidebar: true },

  // Class 12 subjects — same pattern as Class 11
  { href: "/class-12-notes/physics",           label: "Physics (Class 12)",          icon: Atom,        minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/physics/theory",    label: "Physics Theory (12)",         icon: Atom,        minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/chemistry",         label: "Chemistry (Class 12)",        icon: FlaskConical, minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/chemistry/theory",  label: "Chemistry Theory (12)",       icon: FlaskConical, minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/biology",           label: "Biology (Class 12)",          icon: BookOpen,    minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/biology/theory",    label: "Biology Theory (12)",         icon: BookOpen,    minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/mathematics",       label: "Mathematics (Class 12)",      icon: Sigma,       minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/mathematics/theory", label: "Mathematics Theory (12)",    icon: Sigma,       minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/english",           label: "English (Class 12)",          icon: Languages,   minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/english/theory",    label: "English Theory (12)",        icon: Languages,   minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/nepali",            label: "Nepali (Class 12)",           icon: Languages,   minLevel: "plus", hideFromSidebar: true },
  { href: "/class-12-notes/nepali/theory",     label: "Nepali Theory (12)",          icon: Languages,   minLevel: "plus", hideFromSidebar: true },
];

/**
 * Labs & Reference — interactive labs, formula sheets, theorems, graphs.
 * Most open at Plus; advanced indexes open at Pro.
 */
const stemAndRigorItems: NavItem[] = [
  { href: "/lab",                  label: "Virtual 3D Labs",      icon: FlaskConical, minLevel: "plus", hideFromSidebar: true },
  { href: "/lab/3d",               label: "3D Simulations Hub",   icon: Box,          minLevel: "plus"  },
  { href: "/lab/bio-3d-organelles", label: "Cell Organelles 3D",  icon: Sparkles,     minLevel: "plus"  },
  { href: "/lab/theory",           label: "Lab Theory Hub",       icon: BookOpen,     minLevel: "plus"  },
  { href: "/ad-p-table",           label: "Ad P Table",           icon: Atom,         minLevel: "plus"  },
  { href: "/periodic-table",       label: "Periodic Table & CEE", icon: Atom,         minLevel: "pro", hideFromSidebar: true },
  { href: "/formulas",             label: "Formula Sheets",       icon: Sigma,        minLevel: "plus", hideFromSidebar: true },
  { href: "/theorems",             label: "Theorems & Proofs",    icon: Binary,       minLevel: "pro"   },
  { href: "/derivations",          label: "Formula Derivations",  icon: Layers,       minLevel: "pro"   },
  { href: "/graphs",               label: "Science Graph Bank",   icon: LineChart,    minLevel: "pro"   },
  { href: "/mindmap",              label: "Visual Mindmaps",      icon: Workflow,     minLevel: "plus", hideFromSidebar: true },
  { href: "/mind-studio",          label: "Diagram Studio",       icon: Shapes,       minLevel: "owner" },
  { href: "/science-graph-bank",   label: "Graph Bank (Legacy)",  icon: LineChart,    minLevel: "pro"   },
  { href: "/resources/physics-xi", label: "Physics XI Academic",  icon: BookOpen,     minLevel: "pro"   },
];

/**
 * AI & Practice — Veer AI chat, quiz tools, exam prep.
 * Members get 13 Veer chats/day on the three chat consoles.
 * Plus and above unlock the full AI studio (math, diagrams, deep-dive, etc.).
 */
const toolsItems: NavItem[] = [
  // Available to Members (13 AI sparks/day)
  { href: "/chat",         label: "Veer Study Assistant",    icon: Sparkles,   minLevel: "member", hideFromSidebar: true },
  { href: "/chat/nepali",  label: "Nepali Assistant",        icon: Languages,  minLevel: "member" },
  { href: "/chat/grammar", label: "Grammar Console",         icon: BookOpen,   minLevel: "member" },

  // Available to Plus and above (full AI studio)
  { href: "/ai",           label: "AI Tools",                icon: Bot,        minLevel: "member", hideFromSidebar: true },
  { href: "/ai/math",      label: "Veer Math Solver",        icon: Sigma,      minLevel: "plus"  },
  { href: "/ai/deep-dive", label: "Deep Concept Studio",     icon: Lightbulb,  minLevel: "plus"  },
  { href: "/ai/diagrams",  label: "Diagram Hub",             icon: Shapes,     minLevel: "plus"  },
  { href: "/ai/tutor",     label: "Veer Tutor Console",      icon: Bot,        minLevel: "plus"  },
  { href: "/ai/search",    label: "Veer Curriculum Search",  icon: Search,     minLevel: "plus"  },
  { href: "/ai/workspace", label: "AI Workspace",            icon: Bot,        minLevel: "plus"  },
  { href: "/ai/subjects",  label: "Subject Classrooms",      icon: BookOpen,   minLevel: "plus"  },
  { href: "/ai/history",   label: "AI History",              icon: History,    minLevel: "plus"  },
  { href: "/ai-quiz",      label: "Adaptive Veer Quiz",      icon: HelpCircle, minLevel: "plus", hideFromSidebar: true },
  { href: "/ai-quiz/history", label: "Quiz History",         icon: History,    minLevel: "plus"  },
  { href: "/quiz",         label: "Practice Quiz Bank",      icon: Target,     minLevel: "plus", hideFromSidebar: true },
  { href: "/exam-countdown", label: "Exam Countdown",        icon: Target,     minLevel: "pro"   },

  // Exam tracks (Plus and above)
  { href: "/exams/neb",    label: "NEB Board Exam",          icon: GraduationCap, minLevel: "plus" },
  { href: "/exams/cee",    label: "CEE Medical Entrance",    icon: Target,     minLevel: "plus"  },
  { href: "/exams/ioe",    label: "IOE Engineering Entrance", icon: Target,    minLevel: "plus"  },
];

/**
 * More Resources — knowledge hubs, Loksewa, world knowledge, PDF library.
 * Most open at Pro.
 */
const extendedItems: NavItem[] = [
  { href: "/knowledge",                    label: "Knowledge Hub",          icon: BookOpen,    minLevel: "pro" },
  { href: "/knowledge/pro",               label: "Pro Knowledge Hub",       icon: BookOpen,    minLevel: "pro" },
  { href: "/knowledge/numerical-physics", label: "Numerical Physics",       icon: Sigma,       minLevel: "pro" },
  { href: "/knowledge/numerical-chemistry", label: "Numerical Chemistry",   icon: FlaskConical, minLevel: "pro" },
  { href: "/knowledge/biology-diagrams",  label: "Biology Diagrams",        icon: BookOpen,    minLevel: "pro" },
  { href: "/knowledge/grammar",           label: "English Grammar Hub",     icon: BookOpen,    minLevel: "pro" },
  { href: "/knowledge/writing",           label: "English Writing Hub",     icon: FileText,    minLevel: "pro" },
  { href: "/knowledge/byakaran",          label: "Nepali Byakaran",         icon: Languages,   minLevel: "pro" },
  { href: "/knowledge/analytical-geometry", label: "Analytical Geometry",   icon: Sigma,       minLevel: "pro" },
  { href: "/lessons",                     label: "Lessons Library",         icon: GraduationCap, minLevel: "pro" },
  { href: "/loksewa",                     label: "Loksewa GK",              icon: Users,       minLevel: "pro" },
  { href: "/loksewa/geography-of-nepal",  label: "Geography of Nepal",      icon: Globe,       minLevel: "pro" },
  { href: "/loksewa/history",             label: "Loksewa History",         icon: History,     minLevel: "pro" },
  { href: "/loksewa/environment",         label: "Loksewa Environment",     icon: Globe,       minLevel: "pro" },
  { href: "/world-knowledge",             label: "World Knowledge",         icon: Globe,       minLevel: "pro" },
  { href: "/world-knowledge/general-knowledge", label: "General Knowledge", icon: Globe,       minLevel: "pro" },
  { href: "/world-knowledge/current-affairs",   label: "Current Affairs",   icon: Globe,       minLevel: "pro" },
  { href: "/world-knowledge/global-topics",     label: "Global Topics",     icon: Globe,       minLevel: "pro" },
  { href: "/resources",                   label: "Resource Vault",          icon: Bookmark,    minLevel: "plus" },
  { href: "/pdfs",                        label: "PDF Library",             icon: FileText,    minLevel: "pro" },
];

/**
 * Student Desk — personal account pages (profile, progress, settings, etc.).
 * Only shown when the user is signed in.
 */
const accountItems: NavItem[] = [
  { href: "/profile",       label: "My Profile",       icon: User,        minLevel: "member", hideFromSidebar: true },
  { href: "/progress",      label: "My Progress",      icon: UserCheck,   minLevel: "member" },
  { href: "/bookmarks",     label: "Saved Bookmarks",  icon: Bookmark,    minLevel: "member" },
  { href: "/report-card",   label: "Report Card",      icon: FileText,    minLevel: "plus"   },
  { href: "/settings",      label: "Settings",         icon: Settings,    minLevel: "member", hideFromSidebar: true },
  { href: "/credits",       label: "Credits",          icon: Coins,       minLevel: "member", hideFromSidebar: true },
  { href: "/notifications", label: "Notifications",    icon: Bell,        minLevel: "member" },
  { href: "/achievements", label: "Achievements",     icon: Award,       minLevel: "member" },
  { href: "/notice",        label: "Notice Board",     icon: FileText,    minLevel: "member", hideFromSidebar: true },
];

/**
 * About & Info — public pages anyone can read (no account needed).
 * These also appear in the footer.
 */
const publicItems: NavItem[] = [
  { href: "/about",        label: "About",          icon: HelpCircle,  minLevel: "guest", hideFromSidebar: true },
  { href: "/what-it-has",  label: "What it has",    icon: Shapes,      minLevel: "guest", hideFromSidebar: true },
  { href: "/features",     label: "Features",       icon: Sparkles,    minLevel: "guest" },
  { href: "/how-it-works", label: "How It Works",   icon: Compass,     minLevel: "guest", hideFromSidebar: true },
  { href: "/blog",         label: "Blog",           icon: FileText,    minLevel: "guest", hideFromSidebar: true },
  { href: "/neb-updates",  label: "NEB Updates",    icon: Bell,        minLevel: "guest", hideFromSidebar: true },
  { href: "/contact",      label: "Contact Us",     icon: MessageSquare, minLevel: "guest", hideFromSidebar: true },
  { href: "/help",         label: "Help Center",    icon: HelpCircle,  minLevel: "guest", hideFromSidebar: true },
  { href: "/sitemap-page", label: "Site Map",       icon: ListTree,    minLevel: "guest" },
  { href: "/legal/privacy", label: "Privacy Policy", icon: ShieldCheck, minLevel: "guest", hideFromSidebar: true },
  { href: "/legal/terms", label: "Terms of Service", icon: FileText, minLevel: "guest", hideFromSidebar: true },
  { href: "/legal/cookies", label: "Cookie Policy", icon: Globe, minLevel: "guest", hideFromSidebar: true },
  { href: "/legal/purchases", label: "Purchases & Refunds", icon: Receipt, minLevel: "guest", hideFromSidebar: true },
  { href: "/legal/data-safety", label: "Data Safety", icon: ShieldCheck, minLevel: "guest", hideFromSidebar: true },
  { href: "/legal/content-rating", label: "Content Rating", icon: HelpCircle, minLevel: "guest", hideFromSidebar: true },
  { href: "/legal/attribution", label: "Attribution", icon: FileText, minLevel: "guest", hideFromSidebar: true },
  { href: "/legal/takedown", label: "Takedown Requests", icon: ShieldCheck, minLevel: "guest", hideFromSidebar: true },
  { href: "/school",       label: "For Schools",    icon: GraduationCap, minLevel: "guest" },
  { href: "/teachers",     label: "For Teachers",   icon: Users,       minLevel: "guest" },
  { href: "/parents",      label: "For Parents",    icon: Users,       minLevel: "guest" },
  { href: "/plans",        label: "Plans & Pricing", icon: Coins,      minLevel: "guest", hideFromSidebar: true },
];

/**
 * Owner — management surfaces only visible to owner email addresses.
 * Hidden completely for all other users.
 */
const ownerItems: NavItem[] = [
  { href: "/owner",         label: "Owner Console",   icon: Crown        },
  { href: "/owner/users",   label: "User Management", icon: Users        },
  { href: "/controller",    label: "Controller",      icon: ShieldCheck  },
];

/**
 * R1 Daily Life — personal habits, journal and plans.
 * Only shown to owner emails and accounts that have been granted R1 access.
 */
const r1Items: NavItem[] = [
  { href: "/r1",            label: "R1 Today",        icon: Sparkles     },
  { href: "/r1/activities", label: "Daily Activities", icon: Activity    },
  { href: "/r1/plans",      label: "My Plans",         icon: CalendarCheck },
  { href: "/r1/journal",    label: "Daily Journal",    icon: NotebookPen  },
  { href: "/r1/habits",     label: "Habit Streaks",    icon: Repeat       },
];

// ─── The master list ──────────────────────────────────────────────────────────
/**
 * NAV_SECTIONS — the complete navigation, in the order the sidebar renders it.
 *
 * This is the ONE place to add, remove or reorder nav sections.
 * The sidebar, mobile drawer, and footer ALL read from this.
 *
 * Section IDs must be stable — the sidebar saves collapse state by id.
 * Don't rename them unless you also clear localStorage keys.
 */
export const NAV_SECTIONS: NavSection[] = [
  // id "public" — About & Info pages (always visible, no login needed)
  { id: "public",     label: "About & Info",       icon: Globe,      minLevel: "guest", items: publicItems     },

  // id "primary" — Quick Access (shown as a flat list at the top of the sidebar)
  { id: "primary",    label: "Quick Access",        icon: Compass,    minLevel: "member",  items: primaryItems    },

  // id "curriculum" — Class notes, syllabus, past papers
  { id: "curriculum", label: "Curriculum & Notes",  icon: BookOpen,   minLevel: "member",  items: curriculumItems },

  // id "stem" — Labs, formulas, theorems, graphs
  { id: "stem",       label: "Labs & Reference",    icon: FlaskConical, minLevel: "guest", items: stemAndRigorItems },

  // id "tools" — AI chat, quizzes, exam prep
  { id: "tools",      label: "AI & Practice",       icon: Sparkles,   minLevel: "guest", items: toolsItems      },

  // id "extended" — Knowledge hubs, Loksewa, world knowledge
  { id: "extended",   label: "More Resources",      icon: Globe,      minLevel: "member",  items: extendedItems   },

  // id "account" — Personal account pages (only shown when signed in)
  { id: "account",    label: "Student Desk",        icon: UserCheck,  minLevel: "member",  items: accountItems    },

  // id "r1" — R1 daily life (only shown to owner + R1-granted accounts)
  { id: "r1",         label: "R1 · Daily Life",     icon: Sparkles,   r1Only: true,        items: r1Items         },

  // id "owner" — Owner management console (only shown to owner emails)
  { id: "owner",      label: "Owner",               icon: Crown,      ownerOnly: true,     items: ownerItems      },
];

/** Flat array of every URL in the nav, in sidebar render order. Used by tests. */
export const NAV_HREFS: string[] = NAV_SECTIONS.flatMap((section) =>
  section.items.map((item) => item.href),
);

// ─── Quick links ──────────────────────────────────────────────────────────────
/**
 * QUICK_LINKS — the compact fast-path strip shown on mobile and tier home pages.
 *
 * These are the 8 most-used destinations. They appear as pill buttons.
 * Each one respects the tier ladder: links below the viewer's rung are muted.
 */
export const QUICK_LINKS = [
  { href: "/home",           label: "Home"     },
  { href: "/class-11-notes", label: "Class 11" },
  { href: "/class-12-notes", label: "Class 12" },
  { href: "/subjects",       label: "Subjects" },
  { href: "/lab",            label: "Labs"     },
  { href: "/quiz",           label: "Quiz"     },
  { href: "/chat",           label: "AI"       },
  { href: "/ai/math",        label: "Math"     },
] as const;

/**
 * APP_TABS — the app frame: the five thumb destinations on a phone (bottom
 * tab bar) and the same five icons in the tablet rail.
 *
 * Hrefs must already exist in NAV_SECTIONS (the navigation test enforces it),
 * so mobile, tablet and desktop can never disagree about where a tab lands.
 * The rung of each tab is read from the registry via quickLinkMinTier.
 */
export const APP_TABS = [
  { href: "/home",     label: "Home",     short: "Home",     icon: Home },
  { href: "/subjects", label: "Learn",    short: "Learn",    icon: BookOpen },
  { href: "/ai",      label: "AI Tools",  short: "AI Tools", icon: Bot     },
  { href: "/quiz",     label: "Practice", short: "Practice", icon: Target },
  { href: "/profile",  label: "You",      short: "You",      icon: User },
] as const;

/**
 * Returns the minimum plan tier needed for a quick link.
 * Looks up the href in NAV_SECTIONS so quick links and the sidebar
 * always agree on who can reach a destination.
 */
export function quickLinkMinTier(href: string): AccessLevel {
  for (const section of NAV_SECTIONS) {
    const item = section.items.find((i) => i.href === href);
    if (item) return navMinLevel(item, section);
  }
  return "member";
}

/** Returns true when a viewer at `level` can open the given quick link. */
export function quickLinkUnlocked(level: AccessLevel, href: string): boolean {
  return ACCESS_RANK[level] >= ACCESS_RANK[quickLinkMinTier(href)];
}
