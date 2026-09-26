"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  BookOpen,
  FlaskConical,
  Layers,
  Globe,
  User,
  LogIn,
  Sparkles,
  X,
  Menu,
  GraduationCap,
  Atom,
  Binary,
  Workflow,
  HelpCircle,
  Target,
  Users,
  LineChart,
  Compass,
  Search,
  Lightbulb,
  FileText,
  Box,
  Bookmark,
  UserCheck,
  Coins,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import { LogOut } from "lucide-react";

interface MobileSection {
  id: string;
  title: string;
  items: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeClass?: string;
  }[];
}

const mobileSections: MobileSection[] = [
  {
    id: "primary",
    title: "Quick Access",
    items: [
      { href: "/", label: "Home Dashboard", icon: Home },
      { href: "/search", label: "Search Index", icon: Search, badge: "Ctrl+K", badgeClass: "bg-muted text-muted-foreground border border-border/80" },
      { href: "/levels", label: "Curriculum Levels", icon: Compass, badge: "5 Tracks", badgeClass: "bg-sky-500/15 text-sky-500" },
    ],
  },
  {
    id: "curriculum",
    title: "Curriculum & Notes",
    items: [
      { href: "/class-11-notes", label: "Class 11 Hub", icon: BookOpen, badge: "XI", badgeClass: "bg-sky-500/15 text-sky-500" },
      { href: "/class-12-notes", label: "Class 12 Hub", icon: BookOpen, badge: "XII", badgeClass: "bg-violet-500/15 text-violet-500" },
      { href: "/subjects", label: "All 6 Subjects", icon: Layers, badge: "Core", badgeClass: "bg-emerald-500/15 text-emerald-500" },
      { href: "/syllabus", label: "Official CDC Syllabus", icon: GraduationCap },
      { href: "/practical", label: "Practical Lab Manuals", icon: FlaskConical, badge: "Labs", badgeClass: "bg-emerald-500/15 text-emerald-500" },
      { href: "/legend", label: "Concept Legends & Facts", icon: Lightbulb, badge: "Facts", badgeClass: "bg-amber-500/15 text-amber-500" },
      { href: "/notes", label: "Notes Archive", icon: FileText, badge: "Archive", badgeClass: "bg-blue-500/15 text-blue-500" },
    ],
  },
  {
    id: "stem",
    title: "STEM Labs & Rigor",
    items: [
      { href: "/lab", label: "Virtual 3D Labs", icon: FlaskConical, badge: "3D", badgeClass: "bg-violet-500/15 text-violet-500" },
      { href: "/lab/3d", label: "3D Simulations Hub", icon: Box, badge: "96+", badgeClass: "bg-indigo-500/15 text-indigo-500" },
      { href: "/lab/bio-3d-organelles", label: "Cell Organelles 3D", icon: Sparkles, badge: "13 Org", badgeClass: "bg-emerald-500/15 text-emerald-500" },
      { href: "/periodic-table", label: "Periodic Table & CEE", icon: Atom, badge: "118", badgeClass: "bg-cyan-500/15 text-cyan-500" },
      { href: "/theorems", label: "Theorems & Proofs", icon: Binary, badge: "Rigor", badgeClass: "bg-amber-500/15 text-amber-500" },
      { href: "/derivations", label: "Formula Derivations", icon: Layers, badge: "Steps", badgeClass: "bg-rose-500/15 text-rose-500" },
      { href: "/graphs", label: "Science Graph Bank", icon: LineChart, badge: "Charts", badgeClass: "bg-indigo-500/15 text-indigo-500" },
      { href: "/mindmap", label: "Visual Mindmaps", icon: Workflow, badge: "Maps", badgeClass: "bg-purple-500/15 text-purple-500" },
    ],
  },
  {
    id: "tools",
    title: "AI & Assessment",
    items: [
      { href: "/chat", label: "AI Study Assistant", icon: Sparkles, badge: "AI", badgeClass: "bg-fuchsia-500/15 text-fuchsia-500" },
      { href: "/ai-quiz", label: "Adaptive AI Quiz", icon: HelpCircle, badge: "Adaptive", badgeClass: "bg-blue-500/15 text-blue-500" },
      { href: "/quiz", label: "Practice Quiz Bank", icon: Target, badge: "PYQ", badgeClass: "bg-teal-500/15 text-teal-500" },
      { href: "/exam-countdown", label: "Exam Countdown", icon: Target, badge: "NEB", badgeClass: "bg-amber-500/15 text-amber-500" },
    ],
  },
  {
    id: "extended",
    title: "Knowledge & Prep",
    items: [
      { href: "/knowledge", label: "Knowledge Hub", icon: BookOpen, badge: "Concepts", badgeClass: "bg-sky-500/15 text-sky-500" },
      { href: "/lessons", label: "Lessons Library", icon: GraduationCap, badge: "Theory", badgeClass: "bg-indigo-500/15 text-indigo-500" },
      { href: "/loksewa", label: "Loksewa GK", icon: Users, badge: "GK", badgeClass: "bg-orange-500/15 text-orange-500" },
      { href: "/world-knowledge", label: "World Knowledge", icon: Globe, badge: "Global", badgeClass: "bg-emerald-500/15 text-emerald-500" },
      { href: "/resources", label: "Resource Vault", icon: Bookmark, badge: "Vault", badgeClass: "bg-pink-500/15 text-pink-500" },
    ],
  },
  {
    id: "account",
    title: "Student Desk",
    items: [
      { href: "/progress", label: "My Progress", icon: UserCheck, badge: "Stats" },
      { href: "/bookmarks", label: "Saved Bookmarks", icon: Bookmark, badge: "Saved" },
      { href: "/credits", label: "Credits & Plan", icon: Coins, badge: "Wallet" },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { user, refresh, logoutUser } = useSession();

  const filteredSections = mobileSections.map((sec) => ({
    ...sec,
    items: sec.items.filter((item) =>
      searchQuery.trim() === ""
        ? true
        : item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sec.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((sec) => sec.items.length > 0);

  return (
    <>
      {/* Hamburger button — visible only on mobile (< lg) */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-xl"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Slide-in sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] border-r border-border bg-card p-4 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-border/50">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20">
                  <span className="text-sm font-extrabold text-white">R</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-tight leading-tight">Ravikisan&apos;s Platform</span>
                  <span className="text-[10px] text-muted-foreground">Class 11 &amp; 12 Global</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Filter Search Input */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick jump to any subject or tool..."
                className="w-full rounded-xl border border-border/80 bg-background/80 py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Scrollable links */}
            <nav className="flex-1 overflow-y-auto pr-1 space-y-4">
              {filteredSections.map((sec) => (
                <div key={sec.title} className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 px-2.5 py-1">
                    {sec.title}
                  </p>
                  <div className="space-y-0.5">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const active =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${
                            active
                              ? "bg-primary/10 text-primary font-semibold shadow-sm"
                              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`shrink-0 text-[8px] font-extrabold px-1.5 py-0.5 rounded-md ${
                                item.badgeClass ?? "bg-primary/15 text-primary"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-3 border-t border-border/40 space-y-2 shrink-0">
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border/70 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90"
                >
                  <User className="h-3.5 w-3.5" />
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

