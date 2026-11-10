"use client";

/**
 * ChatHome — the AI chat's opening frame, shared by every Veer surface.
 *
 * Layout reference (owner 2026-10-27): a greeting card, a "Recent Chats"
 * strip with a See-all link, category chips over tappable question rows —
 * the FRAME comes from the reference, every word is Veer's own (the owner:
 * "the frames not the words … with our own energy").
 *
 * Built low-data on purpose: text and inline icons only, no images, no
 * fetched media, one cheap reshuffle after mount. The frame must paint
 * instantly even mid-stream on a saver connection.
 */

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import {
  Atom,
  Calculator,
  ChevronRight,
  FlaskConical,
  Globe,
  History,
  Languages,
  Leaf,
  SpellCheck,
  Telescope,
} from "lucide-react";
import { CaptainAvatar } from "@/components/ai/captain-logo";
import type { ChatSession } from "@/lib/api/ai";
import { cn } from "@/lib/utils";

export interface ChatHomeQuestion {
  text: string;
  icon?: ComponentType<{ className?: string }>;
}

export interface ChatHomeGroup {
  category: string;
  icon: ComponentType<{ className?: string }>;
  /** Chip tint classes for this category. */
  color: string;
  questions: ChatHomeQuestion[];
}

export interface ChatHomeProps {
  /** Greeting headline for the intro card. */
  title?: string;
  /** One breath of who Veer is — kept short on purpose. */
  blurb?: string;
  /** Conversations to resume (already fetched by the caller). */
  recent: ChatSession[];
  onOpenRecent: (session: string) => void;
  /** "See all" target — the full history console. */
  seeAllHref?: string;
  groups: ChatHomeGroup[];
  /** Bump to reshuffle the starter rows (a fresh conversation = a fresh deck). */
  seed?: number;
  /** Starter rows shown per category (the pool holds more per subject). */
  perGroup?: number;
  onSend: (text: string) => void;
}

/** "18h ago" style stamps for the Recent Chats rows. */
export function relativeTime(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const mins = Math.floor((Date.now() - then) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(then).toLocaleDateString();
}

/** Deterministic first paint (SSR-safe); the shuffle lands after mount. */
function shuffleInPlace<T>(items: T[]): T[] {
  const bag = [...items];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}

/** Subject tints for the category chips (text-only, zero media weight). */
const CATEGORY_VISUALS: Record<
  string,
  { icon: ComponentType<{ className?: string }>; color: string }
> = {
  Physics: {
    icon: Atom,
    color: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300",
  },
  Chemistry: {
    icon: FlaskConical,
    color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
  Biology: {
    icon: Leaf,
    color: "border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-300",
  },
  Mathematics: {
    icon: Calculator,
    color: "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300",
  },
  नेपाली: {
    icon: Languages,
    color: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300",
  },
  Grammar: {
    icon: SpellCheck,
    color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  },
  "World & History": {
    icon: Globe,
    color: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  "Earth & Space": {
    icon: Telescope,
    color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
  },
};

/**
 * Turn plain `{category, questions}` pools (see `lib/ai/study-suggestions`)
 * into a ChatHome deck with subject icons and chip tints attached.
 */
export function buildChatHomeGroups(
  pools: { category: string; questions: string[] }[],
): ChatHomeGroup[] {
  return pools.map((pool) => {
    const visual = CATEGORY_VISUALS[pool.category] ?? CATEGORY_VISUALS.Physics;
    return {
      category: pool.category,
      icon: visual.icon,
      color: visual.color,
      questions: pool.questions.map((text) => ({ text, icon: visual.icon })),
    };
  });
}

export function ChatHome({
  title = "Hey! I'm Veer 👋",
  blurb = "Grounded in the NEB Class 11 & 12 syllabus — and I remember our conversations. Ask me anything and get a real, step-by-step answer.",
  recent,
  onOpenRecent,
  seeAllHref = "/ai/history",
  groups,
  seed = 0,
  perGroup = 5,
  onSend,
}: ChatHomeProps) {
  // Subject classrooms keep their own history (`subj:<slug>:`) — never list
  // those here (owner: "one interface per subject with their own history —
  // no mix up").
  const recents = useMemo(
    () => recent.filter((s) => !s.session.startsWith("subj:")).slice(0, 3),
    [recent],
  );

  // Few rows per category keeps the frame scannable and cheap (low data).
  const capped = useMemo(
    () => groups.map((g) => ({ ...g, questions: g.questions.slice(0, perGroup) })),
    [groups, perGroup],
  );

  const [active, setActive] = useState(groups[0]?.category ?? "");
  const [order, setOrder] = useState<ChatHomeGroup[]>(capped);

  // Starter rows rotate per conversation — but never during SSR (a random
  // order in the server HTML would hydrate mismatched).
  useEffect(() => {
    setOrder(capped.map((g) => ({ ...g, questions: shuffleInPlace(g.questions) })));
    setActive((current) =>
      groups.some((g) => g.category === current) ? current : (groups[0]?.category ?? ""),
    );
  }, [capped, groups, seed]);

  const current =
    order.find((g) => g.category === active) ?? order[0] ?? groups[0];

  return (
    <div className="space-y-6">
      {/* Greeting card */}
      <section className="flex items-start gap-4 rounded-3xl border-2 border-border/80 bg-gradient-to-br from-primary/[0.07] via-card to-card p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-500 text-white shadow-md shadow-primary/20"
        >
          <CaptainAvatar className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-extrabold tracking-tight text-foreground">{title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{blurb}</p>
        </div>
      </section>

      {/* Recent chats */}
      {recents.length > 0 && (
        <section className="space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="flex items-center gap-2 text-[13px] font-bold text-foreground">
              <History className="h-4 w-4 text-primary" aria-hidden="true" />
              Recent Chats
            </h4>
            <Link
              href={seeAllHref}
              className="text-[11px] font-semibold text-primary hover:underline"
            >
              See all ›
            </Link>
          </div>
          <ul className="space-y-2">
            {recents.map((s) => (
              <li key={s.session}>
                <button
                  type="button"
                  onClick={() => onOpenRecent(s.session)}
                  className="flex w-full items-center gap-3 rounded-2xl border-2 border-border/80 bg-card px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-muted/30"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/85 to-violet-500/85 text-white"
                  >
                    <CaptainAvatar className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-foreground">
                      {s.preview || "Conversation"}
                    </span>
                    <span className="block text-[11px] text-muted-foreground">
                      {s.messages} message{s.messages === 1 ? "" : "s"} · {relativeTime(s.lastMessageAt)}
                    </span>
                  </span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Category chips */}
      {order.length > 0 && (
        <section className="space-y-2.5">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Starter categories">
            {order.map((g) => {
              const Icon = g.icon;
              const isActive = g.category === (current?.category ?? active);
              return (
                <button
                  key={g.category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(g.category)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-[11px] font-semibold transition-colors",
                    isActive
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/70 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {g.category}
                </button>
              );
            })}
          </div>

          {/* Tappable starter rows */}
          <ul className="space-y-2">
            {(current?.questions ?? []).map((q) => {
              const Icon = q.icon;
              return (
                <li key={q.text}>
                  <button
                    type="button"
                    onClick={() => onSend(q.text)}
                    className="flex w-full items-center gap-3 rounded-2xl border-2 border-border/80 bg-card px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-muted/30"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    ) : null}
                    <span className="min-w-0 flex-1 text-[13px] font-medium text-foreground">
                      {q.text}
                    </span>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
