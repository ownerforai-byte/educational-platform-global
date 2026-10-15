"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Bell,
  BellRing,
  CheckCheck,
  Filter,
  Sparkles,
  BookOpen,
  Coins,
  Layers,
  Clock,
  ArrowRight,
  ExternalLink,
  Megaphone,
  Check,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationItem {
  id: string;
  category: "curriculum" | "ai" | "account" | "system";
  title: string;
  body: string;
  timestamp: string;
  href?: string;
  actionLabel?: string;
  isInitialUnread?: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-phys-xi-docs",
    category: "curriculum",
    title: "NEB Physics XI Resource Documents Published",
    body: "All 26 NEB Physics XI unit study documents (Mechanics, Heat & Thermodynamics, Optics, Electricity, Modern Physics) are now active in their unit Resources sections with worked questions, compare/contrast tables, and .docx downloads.",
    timestamp: "10 mins ago",
    href: "/class-11-notes/physics/chapters/kinematics",
    actionLabel: "View Unit Resources",
    isInitialUnread: true,
  },
  {
    id: "notif-sparks-refill",
    category: "account",
    title: "Daily AI Spark Pool Refilled",
    body: "Your daily spark allowance has been refreshed to full capacity. Ask Veer questions, test your knowledge in the AI quiz, or unlock deep concept notes freely.",
    timestamp: "2 hours ago",
    href: "/credits",
    actionLabel: "Check Spark Balance",
    isInitialUnread: true,
  },
  {
    id: "notif-exam-countdown",
    category: "curriculum",
    title: "Official NEB Exam Countdown Synchronized",
    body: "NEB Class 11 and 12 board examination timeline and subject milestone trackers are live. Review high-yield weightage topics and test your readiness.",
    timestamp: "5 hours ago",
    href: "/exam-countdown",
    actionLabel: "Open Exam Countdown",
    isInitialUnread: true,
  },
  {
    id: "notif-veer-tutor-update",
    category: "ai",
    title: "Veer Study Assistant Enhanced",
    body: "Veer is now grounded in official CDC curriculum definitions and real drawn vector schematics. Open your console to start a lesson or clear concepts.",
    timestamp: "Yesterday",
    href: "/chat",
    actionLabel: "Chat with Veer",
    isInitialUnread: false,
  },
  {
    id: "notif-3d-lab-update",
    category: "system",
    title: "Virtual 3D Laboratory Upgraded",
    body: "Over 96+ interactive 3D simulations are active across Physics, Chemistry, and Biology. Explore optics, projectile motion, and cell biology in 3D.",
    timestamp: "2 days ago",
    href: "/lab/3d",
    actionLabel: "Explore 3D Labs",
    isInitialUnread: false,
  },
  {
    id: "notif-pyq-bank",
    category: "curriculum",
    title: "Previous Year Question Bank Expanded",
    body: "Past 10 years of solved NEB questions for Physics, Chemistry, Biology, and Mathematics with step-by-step model solutions have been updated.",
    timestamp: "3 days ago",
    href: "/pyqs",
    actionLabel: "Practice PYQs",
    isInitialUnread: false,
  },
  {
    id: "notif-account-security",
    category: "account",
    title: "Account Security & Owner Verification Active",
    body: "Administrative approval protection is active. Your notes, saved chat history, and personal bookmarked materials remain private and securely scoped.",
    timestamp: "4 days ago",
    href: "/profile",
    actionLabel: "Account Profile",
    isInitialUnread: false,
  },
];

const CATEGORY_CONFIG = {
  curriculum: {
    label: "Curriculum & Study",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: BookOpen,
  },
  ai: {
    label: "AI & Veer Tutor",
    color: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    icon: Sparkles,
  },
  account: {
    label: "Sparks & Account",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: Coins,
  },
  system: {
    label: "System & Platform",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: Layers,
  },
};

const STORAGE_KEY = "ravikisan_read_notification_ids";

export default function NotificationsPage() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize read status from localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setReadIds(new Set(parsed));
          return;
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    // Default unread items
    const defaultRead = new Set<string>();
    INITIAL_NOTIFICATIONS.forEach((n) => {
      if (!n.isInitialUnread) {
        defaultRead.add(n.id);
      }
    });
    setReadIds(defaultRead);
  }, []);

  // Save to localStorage
  const saveReadIds = (newSet: Set<string>) => {
    setReadIds(newSet);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));
    } catch {
      // Ignore localStorage errors
    }
  };

  const toggleRead = (id: string) => {
    const next = new Set(readIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    saveReadIds(next);
  };

  const markAllAsRead = () => {
    const next = new Set(INITIAL_NOTIFICATIONS.map((n) => n.id));
    saveReadIds(next);
  };

  const markAllAsUnread = () => {
    saveReadIds(new Set());
  };

  const unreadCount = useMemo(() => {
    return INITIAL_NOTIFICATIONS.filter((n) => !readIds.has(n.id)).length;
  }, [readIds]);

  const filteredNotifications = useMemo(() => {
    return INITIAL_NOTIFICATIONS.filter((n) => {
      if (activeCategory !== "all" && n.category !== activeCategory) {
        return false;
      }
      if (onlyUnread && readIds.has(n.id)) {
        return false;
      }
      return true;
    });
  }, [activeCategory, onlyUnread, readIds]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-3">
        <Link
          href="/home"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-xs font-semibold text-foreground">Notifications</span>
      </div>

      {/* Header Banner */}
      <header className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-card to-card p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-inner">
              <Bell className="h-6 w-6 text-primary" />
              {isClient && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground shadow-sm">
                  {unreadCount}
                </span>
              )}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                  Notifications Center
                </h1>
                {isClient && unreadCount > 0 && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                Real-time study alerts, curriculum updates, and daily spark notifications.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {unreadCount > 0 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="h-8 gap-1.5 text-xs rounded-xl"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                <span>Mark all read</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsUnread}
                className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset unread</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ── Notice Board Cross-Link Card ── */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
            <Megaphone className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Looking for official platform announcements &amp; policies?
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Account approval guidelines, owner notices, and CDC syllabus compliance are kept permanently on the standing Notice Board.
            </p>
          </div>
        </div>
        <Button asChild size="sm" variant="outline" className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10 shrink-0 gap-1.5 text-xs rounded-xl">
          <Link href="/notice">
            <span>Notice Board</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Filter Tabs & Unread Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            All Alerts ({INITIAL_NOTIFICATIONS.length})
          </button>
          {Object.entries(CATEGORY_CONFIG).map(([catKey, config]) => (
            <button
              key={catKey}
              type="button"
              onClick={() => setActiveCategory(catKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === catKey
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70"
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOnlyUnread(!onlyUnread)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            onlyUnread
              ? "border-primary/50 bg-primary/10 text-primary font-semibold"
              : "border-border/60 text-muted-foreground hover:text-foreground"
          }`}
        >
          <Filter className="h-3 w-3" />
          <span>Unread Only</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/70 bg-card p-12 text-center space-y-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Check className="h-6 w-6" />
            </span>
            <div>
              <p className="text-base font-bold text-foreground">You are all caught up!</p>
              <p className="text-xs text-muted-foreground mt-1">
                No notifications match your current filter. Check back later for new curriculum alerts.
              </p>
            </div>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const isRead = readIds.has(notif.id);
            const catConfig = CATEGORY_CONFIG[notif.category];
            const CatIcon = catConfig.icon;

            return (
              <article
                key={notif.id}
                className={`group relative rounded-2xl border transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                  !isRead
                    ? "border-primary/30 bg-card hover:border-primary/50 shadow-sm"
                    : "border-border/50 bg-card/60 opacity-85 hover:opacity-100"
                }`}
              >
                {/* Left: Indicator & Content */}
                <div className="flex items-start gap-3.5">
                  {/* Category Icon */}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${catConfig.color}`}
                  >
                    <CatIcon className="h-5 w-5" />
                  </span>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${catConfig.color}`}>
                        {catConfig.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notif.timestamp}
                      </span>
                      {!isRead && (
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" title="Unread" />
                      )}
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-foreground leading-snug">
                      {notif.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                      {notif.body}
                    </p>

                    {notif.href && (
                      <div className="pt-1.5">
                        <Link
                          href={notif.href}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                        >
                          <span>{notif.actionLabel || "Explore"}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Mark Read / Unread Toggle */}
                <div className="flex sm:flex-col items-center justify-end sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                  <button
                    type="button"
                    onClick={() => toggleRead(notif.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors"
                    title={isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {isRead ? (
                      <>
                        <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="sm:hidden">Mark unread</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span className="sm:hidden">Mark read</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      <footer className="pt-4 border-t border-border/60 text-center text-xs text-muted-foreground">
        Notifications are refreshed automatically as curriculum modules and spark pools update.
      </footer>
    </div>
  );
}
