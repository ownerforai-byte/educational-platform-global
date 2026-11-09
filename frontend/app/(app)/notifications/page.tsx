"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bell,
  BellRing,
  CheckCheck,
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
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/notifications";
import { useNotificationState } from "@/lib/hooks/use-notifications";

// The LIVE inbox + read store live in `lib/notifications.ts` (shared with the
// header bell so "mark all read" zeroes every badge). Nothing here is seeded:
// items are created only by real platform events.

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

export default function NotificationsPage() {
  // Read = approved = REMOVED from the list (owner direction 2026-10-24:
  // "make the notification removed once approved (read by user)"). The set
  // holds the ids the user has approved; those cards no longer render.
  //
  // State comes from the SHARED store (plan.md §14 5.1) — the header bell
  // derives its badge from the same snapshot, so "mark all read" here zeroes
  // every badge instantly, in this tab and in all open tabs.
  const { hydrated, items, unreadCount } = useNotificationState();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  /** Approve (read) one notification — it is removed from the list. */
  const markRead = (id: string) => {
    markNotificationRead(id);
  };

  const markAllAsRead = () => {
    markAllNotificationsRead();
  };

  // `items` is already the LIVE pending queue (read items were filtered out by
  // the store), so both the list and every badge derive from the same state.
  const filteredNotifications = useMemo(
    () =>
      items.filter(
        (n) => activeCategory === "all" || n.category === activeCategory,
      ),
    [activeCategory, items],
  );

  const countFor = (category: string) =>
    category === "all"
      ? unreadCount
      : items.filter((n) => n.category === category).length;

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
              {hydrated && unreadCount > 0 && (
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
                {hydrated && unreadCount > 0 && (
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

          {/* Quick Actions — one button only (owner 2026-10-24: "remove reset
              unread, keep mark all read only"). */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="h-8 gap-1.5 text-xs rounded-xl"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              <span>Mark all read</span>
            </Button>
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
            All Alerts ({hydrated ? unreadCount : 0})
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
              {config.label} ({hydrated ? countFor(catKey) : 0})
            </button>
          ))}
        </div>

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
                No live alerts right now — you have {hydrated ? unreadCount : 0} unread. New quiz results and study milestones appear here automatically.
              </p>
            </div>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const catConfig = CATEGORY_CONFIG[notif.category];
            const CatIcon = catConfig.icon;

            return (
              <article
                key={notif.id}
                className="group relative rounded-2xl border transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-primary/30 bg-card hover:border-primary/50 shadow-sm"
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
                      <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" title="Unread" />
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

                {/* Right: approve (read) — the card is removed once approved. */}
                <div className="flex sm:flex-col items-center justify-end sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                  <button
                    type="button"
                    onClick={() => markRead(notif.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors"
                    title="Mark as read"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span className="sm:hidden">Mark read</span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      <footer className="pt-4 border-t border-border/60 text-center text-xs text-muted-foreground">
        Alerts are generated from your real quiz results and study activity — nothing here is pre-seeded.
      </footer>
    </div>
  );
}
