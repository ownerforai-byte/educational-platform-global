"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, ChevronDown, Leaf, Send, X } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { shouldShowPlatformGuideWidget } from "@/lib/platform-guide-widget";
import { key } from "@/lib/scoped-storage";
import {
  PREFERENCES_NAMESPACE,
  scheduleNamespacePush,
} from "@/lib/state/user-state";
import {
  postPlatformGuideMessage,
  type PlatformGuideUserContext,
} from "@/lib/api/platform-guide";
import { readGoals, listGoalSubjects } from "@/lib/study-goals";
import { getStreak } from "@/lib/streaks";
import { Button } from "@/components/ui/button";
import { accessLevelFor, ACCESS_LABELS } from "@/lib/core/access-level";
import { AiStatusDot } from "@/components/ai/ai-status-dot";
import { AdSlot } from "@/components/ai/ad-slot";
import { VeerChip, VeerSection } from "@/components/ai/veer-chip";
import {
  VEER_LENS_CHIPS,
  VEER_NATURE_SECTION_ICONS,
  VEER_WIDGET_LENS_PROMPTS,
  VEER_WIDGET_ROOTS,
  VEER_WIDGET_SUGGESTIONS,
} from "@/features/ai/lib/veer-home";

type ChatLine = { role: "user" | "assistant"; content: string };
type View = "home" | "thread";

function buildOpening(planLabel: string): string {
  return `Hi — I'm Veer AI. You're on the ${planLabel} plan. Ask me anything — I'll keep it short and simple.`;
}

/** Collect all available user context from localStorage. */
function collectUserContext(
  user: { plan?: string | null; email?: string | null } | null,
): PlatformGuideUserContext | undefined {
  if (!user) return undefined;
  try {
    const goals = readGoals();
    const goalSubjects = listGoalSubjects();
    const subjectLabels = goalSubjects
      .filter((s) => goals.subjects.includes(s.key))
      .map((s) => s.subjectName);
    const streak = getStreak();

    let completedTopics = 0;
    let inProgressTopics = 0;
    let notStartedTopics = 0;
    try {
      const raw =
        localStorage.getItem(key("neb-progress:v1")) ||
        localStorage.getItem("neb-progress:v1");
      if (raw) {
        const entries: Array<{ status: string }> = JSON.parse(raw);
        completedTopics = entries.filter((e) => e.status === "completed").length;
        inProgressTopics = entries.filter((e) => e.status === "in-progress").length;
        notStartedTopics = entries.filter((e) => e.status === "not-started").length;
        scheduleNamespacePush(PREFERENCES_NAMESPACE, { guideProgress: entries });
      }
    } catch {
      /* ignore */
    }

    let habits: string[] = [];
    try {
      const habitsRaw =
        localStorage.getItem(key("neb-habits:v1")) ||
        localStorage.getItem("neb-habits:v1") ||
        localStorage.getItem("neb-r1-habits:v1");
      if (habitsRaw) {
        const parsed: Array<{ name: string; active?: boolean }> = JSON.parse(habitsRaw);
        habits = parsed
          .filter((h) => h.active !== false)
          .map((h) => h.name)
          .slice(0, 5);
        scheduleNamespacePush(PREFERENCES_NAMESPACE, { habits: parsed });
      }
    } catch {
      /* ignore */
    }

    const plan = (user.plan as string | null | undefined) ?? "member";

    return {
      plan: plan.charAt(0).toUpperCase() + plan.slice(1),
      subjects: subjectLabels.length > 0 ? subjectLabels : undefined,
      examDate: goals.examDate ?? null,
      targetPercent: goals.targetPercent ?? null,
      dailyMinutes: goals.dailyMinutes ?? null,
      completedTopics: completedTopics > 0 ? completedTopics : undefined,
      inProgressTopics: inProgressTopics > 0 ? inProgressTopics : undefined,
      notStartedTopics: notStartedTopics > 0 ? notStartedTopics : undefined,
      streakDays: streak.count > 0 ? streak.count : undefined,
      habits: habits.length > 0 ? habits : undefined,
    };
  } catch {
    return undefined;
  }
}

export function PlatformGuideWidget() {
  const pathname = usePathname() ?? "/";
  const { user, isLoading } = useSession();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<PlatformGuideUserContext | undefined>(undefined);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!user || lines.length > 0) return;
    const ctx = collectUserContext(user);
    contextRef.current = ctx;
    const level = accessLevelFor(user);
    const planLabel = ACCESS_LABELS[level];
    setLines([{ role: "assistant", content: buildOpening(planLabel) }]);
  }, [user, lines.length]);

  useEffect(() => {
    if (!open || view !== "thread") return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, open, view]);

  const visible =
    mounted && !isLoading && shouldShowPlatformGuideWidget(pathname, user ?? null);

  const send = useCallback(
    async (override?: string) => {
      const text = (override ?? input).trim();
      if (!text || sending) return;
      setInput("");
      setError(null);
      setView("thread");
      setLines((prev) => [...prev, { role: "user", content: text }]);
      setSending(true);
      try {
        const { reply } = await postPlatformGuideMessage(text, contextRef.current);
        setLines((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Could not reach Veer. Try again.";
        setError(msg);
      } finally {
        setSending(false);
      }
    },
    [input, sending],
  );

  if (!visible) return null;

  const showHome = view === "home";

  return (
    <div className="fixed right-3 bottom-safe z-[45] flex flex-col items-end gap-2 sm:right-4">
      {open && (
        <div
          className="flex h-[min(calc(100dvh-6.75rem),54rem)] w-[min(calc(100vw-0.75rem),34rem)] flex-col overflow-hidden rounded-2xl border border-dashed border-emerald-700/40 bg-card/98 shadow-2xl shadow-emerald-950/20 backdrop-blur-md sm:h-[min(calc(100dvh-6.5rem),58rem)] sm:w-[min(calc(100vw-1.5rem),42rem)] md:w-[min(calc(100vw-2rem),48rem)]"
          role="dialog"
          aria-label="Veer personal AI"
        >
          <header className="flex shrink-0 items-center justify-between gap-2 border-b border-dashed border-emerald-700/30 bg-gradient-to-r from-emerald-500/10 via-card to-card px-3 py-2.5 dark:border-emerald-400/30">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                <Bot className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[13px] font-extrabold tracking-[0.06em] text-foreground">
                  VEER AI
                  <AiStatusDot className="h-2 w-2" />
                </p>
                <p className="text-[10px] text-muted-foreground">Personal study guide · habits · recap</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {view === "thread" && (
                <VeerChip label="Home" onClick={() => setView("home")} />
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close guide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          {showHome ? (
            <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-hidden p-2">
              <div className="flex shrink-0 items-center gap-1.5">
                <Leaf className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                <span className="text-[10px] font-semibold text-muted-foreground">
                  Gentle guide — ask or tap a chip
                </span>
                {lines.length > 1 && (
                  <VeerChip label="Resume chat" onClick={() => setView("thread")} className="ml-auto" />
                )}
              </div>

              <div className="flex shrink-0 flex-col gap-1">
                <VeerSection title="Roots" icon={VEER_NATURE_SECTION_ICONS.roots} border="dash" scroll="x">
                  {VEER_WIDGET_ROOTS.map((chip) => (
                    <VeerChip
                      key={chip.id}
                      label={chip.label}
                      title={chip.prompt}
                      onClick={() => void send(chip.prompt)}
                    />
                  ))}
                </VeerSection>
                <VeerSection title="Focus" icon={VEER_NATURE_SECTION_ICONS.focus} border="line" scroll="x">
                  {VEER_LENS_CHIPS.map((lens) => (
                    <VeerChip
                      key={lens.id}
                      label={lens.label}
                      title={lens.hint}
                      icon={lens.icon}
                      onClick={() => void send(VEER_WIDGET_LENS_PROMPTS[lens.id])}
                    />
                  ))}
                </VeerSection>
              </div>

              <VeerSection
                title="Suggestions"
                icon={VEER_NATURE_SECTION_ICONS.suggestions}
                border="dash"
                scroll="y"
                className="min-h-0 flex-[1.2]"
              >
                {VEER_WIDGET_SUGGESTIONS.map((chip) => (
                  <VeerChip
                    key={chip.id}
                    label={chip.label}
                    title={chip.prompt}
                    onClick={() => void send(chip.prompt)}
                  />
                ))}
              </VeerSection>

              <AdSlot flexible className="min-h-[3.5rem]" />
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-2.5"
            >
              {lines.map((line, i) =>
                line.role === "user" ? (
                  <div
                    key={`${line.role}-${i}`}
                    className="ml-8 rounded-xl bg-primary/12 px-3 py-2 text-[12px] leading-relaxed text-foreground"
                  >
                    {line.content}
                  </div>
                ) : (
                  <article
                    key={`${line.role}-${i}`}
                    aria-label="Veer briefing"
                    className="mr-2 overflow-hidden rounded-xl border border-border/90 bg-card shadow-[0_1px_0_hsl(var(--border)/0.6)]"
                  >
                    <header className="flex items-center justify-between gap-2 border-b border-border/80 bg-muted/40 px-3 py-1.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        Study briefing
                      </p>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
                        Organised for learning
                      </p>
                    </header>
                    <div className="space-y-2 px-3.5 py-3 text-[12px] leading-[1.65] tracking-[0.01em] text-foreground/90">
                      {line.content.split(/\n{2,}/).map((block, bi) => (
                        <p key={bi} className="max-w-[68ch] whitespace-pre-wrap">
                          {block.trim()}
                        </p>
                      ))}
                    </div>
                  </article>
                ),
              )}
              {sending && (
                <p className="ml-1 animate-pulse text-[11px] text-muted-foreground">Veer is thinking…</p>
              )}
              {error && <p className="ml-1 text-[11px] text-destructive">{error}</p>}
            </div>
          )}

          <form
            className="flex shrink-0 gap-1.5 border-t border-dashed border-emerald-700/30 p-2 dark:border-emerald-400/30"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Veer anything…"
              className="h-10 min-w-0 flex-1 rounded-xl border border-border/80 bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
              disabled={sending}
              maxLength={500}
              aria-label="Message to Veer"
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 shrink-0"
              disabled={sending || !input.trim()}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex h-14 items-center gap-2 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600 to-teal-700 px-4 text-white shadow-lg shadow-emerald-950/25 transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
        aria-label={open ? "Close Veer AI" : "Open Veer AI personal guide"}
      >
        {open ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <>
            <Bot className="h-5 w-5" />
            <span className="text-xs font-bold tracking-wide">Veer AI</span>
          </>
        )}
      </button>
    </div>
  );
}
