"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  FlaskConical,
  LogIn,
  LogOut,
  Layers,
  GraduationCap,
  UserCheck,
  Bookmark,
  Users,
  Coins,
  Crown,
  ShieldCheck,
  ChevronsUp,
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
} from "lucide-react";
import { logoutAction } from "@/features/auth/actions";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeClass?: string;
};

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
  { href: "/chat", label: "AI Study Assistant", icon: Sparkles, badge: "AI", badgeClass: "bg-fuchsia-500/15 text-fuchsia-500" },
  { href: "/ai-quiz", label: "Adaptive AI Quiz", icon: HelpCircle, badge: "Adaptive", badgeClass: "bg-blue-500/15 text-blue-500" },
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
  { href: "/progress", label: "My Progress", icon: UserCheck, badge: "Stats" },
  { href: "/bookmarks", label: "Saved Bookmarks", icon: Bookmark, badge: "Saved" },
  { href: "/credits", label: "Credits & Plan", icon: Coins, badge: "Wallet" },
];

const ownerItems: NavItem[] = [
  { href: "/admin", label: "Admin Panel", icon: ShieldCheck, badge: "Admin" },
  { href: "/controller", label: "Controller", icon: Crown, badge: "Master" },
];

function NavSection({
  label,
  icon: LabelIcon,
  items,
  pathname,
  collapsed,
  onToggle,
  railCollapsed,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
  pathname: string;
  collapsed: boolean;
  onToggle: () => void;
  railCollapsed: boolean;
}) {
  const Icon = LabelIcon;
  const activeCount = items.filter(
    (item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
  ).length;

  // ── Collapsed rail: icon-only, centered, with hover tooltips ──────────────
  if (railCollapsed) {
    return (
      <div className="mb-2">
        <div className="flex items-center justify-center py-2" title={label}>
          <Icon className="h-3.5 w-3.5 text-muted-foreground/50" />
        </div>
        <div className="space-y-0.5">
          {items.map((item) => {
            const ItemIcon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "group relative flex items-center justify-center rounded-lg p-2.5 transition-all",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <ItemIcon className={cn("h-4 w-4", isActive && "text-primary")} />
                {item.badge && (
                  <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Expanded: full labels + per-section collapse ──────────────────────────
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all",
          collapsed && "justify-center"
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{label}</span>
            {activeCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/15 px-1 text-[9px] font-bold text-primary">
                {activeCount}
              </span>
            )}
            <ChevronsUp className={cn("h-3 w-3 opacity-50 transition-transform", collapsed && "rotate-180")} />
          </>
        )}
      </button>
      {!collapsed && (
        <div className="mt-0.5 space-y-0.5 pl-1">
          {items.map((item) => {
            const ItemIcon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all relative overflow-hidden",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full" />
                )}
                <ItemIcon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive && "text-primary"
                  )}
                />
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      "shrink-0 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md",
                      item.badgeClass ?? "bg-primary/15 text-primary"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SidebarNavigationProps {
  collapsed?: boolean;
}

export function SidebarNavigation({ collapsed = false }: SidebarNavigationProps) {
  const pathname = usePathname();
  const { user, refresh } = useSession();
  const isLoggedIn = !!user;

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    curriculum: false,
    stem: false,
    tools: false,
    extended: false,
    account: false,
    owner: false,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = async () => {
    await logoutAction();
    refresh();
  };

  return (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-border/40 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20">
            <span className="text-xs font-extrabold text-white">R</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-xs tracking-tight text-foreground whitespace-nowrap">
              Ravikisan&apos;s Platform
            </span>
          )}
        </Link>
      </div>

      {/* Nav sections */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {/* Quick Home & Search shortcuts */}
        <div className="mb-2 space-y-0.5">
          {primaryItems.map((item) => {
            const ItemIcon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all relative overflow-hidden",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/25 shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  collapsed && "justify-center px-2"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-r-full" />
                )}
                <ItemIcon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "shrink-0 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md",
                          item.badgeClass ?? "bg-primary/15 text-primary"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        <NavSection
          label="Curriculum & Notes"
          icon={BookOpen}
          items={curriculumItems}
          pathname={pathname}
          collapsed={collapsedSections.curriculum}
          onToggle={() => toggleSection("curriculum")}
          railCollapsed={collapsed}
        />
        <NavSection
          label="STEM Labs & Rigor"
          icon={FlaskConical}
          items={stemAndRigorItems}
          pathname={pathname}
          collapsed={collapsedSections.stem}
          onToggle={() => toggleSection("stem")}
          railCollapsed={collapsed}
        />
        <NavSection
          label="AI & Assessment"
          icon={Sparkles}
          items={toolsItems}
          pathname={pathname}
          collapsed={collapsedSections.tools}
          onToggle={() => toggleSection("tools")}
          railCollapsed={collapsed}
        />
        <NavSection
          label="Knowledge & Prep"
          icon={Globe}
          items={extendedItems}
          pathname={pathname}
          collapsed={collapsedSections.extended}
          onToggle={() => toggleSection("extended")}
          railCollapsed={collapsed}
        />
        {isLoggedIn && (
          <NavSection
            label="Student Desk"
            icon={UserCheck}
            items={accountItems}
            pathname={pathname}
            collapsed={collapsedSections.account}
            onToggle={() => toggleSection("account")}
            railCollapsed={collapsed}
          />
        )}
        {isOwnerUser(user) && (
          <NavSection
            label="Owner"
            icon={Crown}
            items={ownerItems}
            pathname={pathname}
            collapsed={collapsedSections.owner}
            onToggle={() => toggleSection("owner")}
            railCollapsed={collapsed}
          />
        )}
      </div>

      {/* Bottom action */}
      <div className="border-t border-border/40 p-2.5 shrink-0">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            title={collapsed ? "Log out" : undefined}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">Log out</span>}
          </button>
        ) : (
          <Link
            href="/login"
            title={collapsed ? "Login" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all",
              collapsed && "justify-center"
            )}
          >
            <LogIn className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">Login</span>}
          </Link>
        )}
      </div>
    </nav>
  );
}

