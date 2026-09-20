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
  X,
  Menu,
  GraduationCap,
  Atom,
  Binary,
  Workflow,
  Sparkles,
  HelpCircle,
  Target,
  Users,
  LineChart,
  Compass,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface MobileSection {
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
    title: "Curriculum & Notes",
    items: [
      { href: "/class-11-notes", label: "Class 11 Hub", icon: BookOpen, badge: "XI", badgeClass: "bg-sky-500/15 text-sky-500" },
      { href: "/class-12-notes", label: "Class 12 Hub", icon: BookOpen, badge: "XII", badgeClass: "bg-violet-500/15 text-violet-500" },
      { href: "/subjects", label: "All 6 Subjects", icon: Layers },
      { href: "/syllabus", label: "Official Syllabus", icon: GraduationCap },
      { href: "/levels", label: "Curriculum Levels", icon: Compass },
    ],
  },
  {
    title: "STEM Labs & Rigor",
    items: [
      { href: "/lab", label: "Virtual 3D Labs", icon: FlaskConical, badge: "3D", badgeClass: "bg-violet-500/15 text-violet-500" },
      { href: "/periodic-table", label: "Periodic Table & CEE", icon: Atom, badge: "118", badgeClass: "bg-cyan-500/15 text-cyan-500" },
      { href: "/theorems", label: "Theorems & Proofs", icon: Binary, badge: "Rigor", badgeClass: "bg-amber-500/15 text-amber-500" },
      { href: "/derivations", label: "Formula Derivations", icon: Layers, badge: "Steps", badgeClass: "bg-rose-500/15 text-rose-500" },
      { href: "/mindmap", label: "Visual Mindmaps", icon: Workflow },
      { href: "/graphs", label: "Graph Bank", icon: LineChart },
    ],
  },
  {
    title: "AI & Assessment",
    items: [
      { href: "/chat", label: "AI Study Assistant", icon: Sparkles, badge: "AI", badgeClass: "bg-fuchsia-500/15 text-fuchsia-500" },
      { href: "/ai-quiz", label: "Practice Quizzes", icon: HelpCircle, badge: "NEB", badgeClass: "bg-blue-500/15 text-blue-500" },
      { href: "/exam-countdown", label: "Exam Countdown", icon: Target, badge: "NEB", badgeClass: "bg-amber-500/15 text-amber-500" },
    ],
  },
  {
    title: "Extended & GK",
    items: [
      { href: "/knowledge", label: "Knowledge Hub", icon: BookOpen },
      { href: "/loksewa", label: "Loksewa GK", icon: Users, badge: "GK" },
      { href: "/world-knowledge", label: "World Knowledge", icon: Globe },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
                  <span className="font-bold text-sm tracking-tight leading-tight">NEB Study Vault</span>
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

            {/* Scrollable links */}
            <nav className="flex-1 overflow-y-auto pr-1 space-y-4">
              {mobileSections.map((sec) => (
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
