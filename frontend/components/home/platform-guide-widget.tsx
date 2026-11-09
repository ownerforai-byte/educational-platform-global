"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, ChevronDown, Send, X } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { shouldShowPlatformGuideWidget } from "@/lib/platform-guide-widget";
import {
  postPlatformGuideMessage,
  type PlatformGuideUserContext,
} from "@/lib/api/platform-guide";
import { readGoals, listGoalSubjects } from "@/lib/study-goals";
import { getStreak } from "@/lib/streaks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { accessLevelFor, ACCESS_LABELS } from "@/lib/access-level";

type ChatLine = { role: "user" | "assistant"; content: string };

function buildOpening(planLabel: string): string {
  return `Hi — I'm Veer AI, your personal study guide. You're on the ${planLabel} plan. Ask me about your progress, what to study next, or anything academic.`;
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

    // Read progress from localStorage (set by the progress journey component)
    let completedTopics = 0;
    let inProgressTopics = 0;
    let notStartedTopics = 0;
    try {
      const raw = localStorage.getItem("neb-progress:v1");
      if (raw) {
        const entries: Array<{ status: string }> = JSON.parse(raw);
        completedTopics = entries.filter((e) => e.status === "completed").length;
        inProgressTopics = entries.filter((e) => e.status === "in-progress").length;
        notStartedTopics = entries.filter((e) => e.status === "not-started").length;
      }
    } catch { /* ignore */ }

    // Read habits from r1 localStorage if available
    let habits: string[] = [];
    try {
      const habitsRaw = localStorage.getItem("neb-r1-habits:v1");
      if (habitsRaw) {
        const parsed: Array<{ name: string; active?: boolean }> = JSON.parse(habitsRaw);
        habits = parsed.filter((h) => h.active !== false).map((h) => h.name).slice(0, 5);
      }
    } catch { /* ignore */ }

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
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<PlatformGuideUserContext | undefined>(undefined);

  useEffect(() => setMounted(true), []);

  // Build opening message and collect context once user is known
  useEffect(() => {
    if (!user || lines.length > 0) return;
    const ctx = collectUserContext(user);
    contextRef.current = ctx;
    const level = accessLevelFor(user);
    const planLabel = ACCESS_LABELS[level];
    setLines([{ role: "assistant", content: buildOpening(planLabel) }]);
  }, [user, lines.length]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, open]);

  const visible =
    mounted &&
    !isLoading &&
    shouldShowPlatformGuideWidget(pathname, user ?? null);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setError(null);
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
  }, [input, sending]);

  if (!visible) return null;

  return (
    <div className="fixed right-4 bottom-safe z-[45] flex flex-col items-end gap-2">
      {open && (
        <div
          className="w-[min(100vw-2rem,340px)] overflow-hidden rounded-2xl border border-border/80 bg-card/97 shadow-2xl shadow-black/15 backdrop-blur-md"
          role="dialog"
          aria-label="Veer personal AI"
        >
          {/* Header */}
          <header className="flex items-center justify-between gap-2 border-b border-border/80 bg-gradient-to-r from-primary/10 via-card to-card px-3 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground">Veer AI</p>
                <p className="text-[10px] text-muted-foreground">Personal study guide</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close guide"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* Chat history */}
          <div
            ref={scrollRef}
            className="max-h-64 overflow-y-auto overscroll-contain px-3 py-2.5 space-y-2 text-[13px] leading-snug"
          >
            {lines.map((line, i) => (
              <div
                key={`${line.role}-${i}`}
                className={
                  line.role === "user"
                    ? "ml-8 rounded-2xl rounded-tr-sm bg-primary/12 px-3 py-2 text-foreground"
                    : "mr-8 rounded-2xl rounded-tl-sm bg-muted/60 px-3 py-2 text-muted-foreground"
                }
              >
                {line.content}
              </div>
            ))}
            {sending && (
              <p className="text-[11px] text-muted-foreground animate-pulse ml-1">Veer is thinking…</p>
            )}
            {error && <p className="text-[11px] text-destructive ml-1">{error}</p>}
          </div>

          {/* Input */}
          <form
            className="flex gap-1.5 border-t border-border/80 p-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Veer anything…"
              className="h-9 text-xs"
              disabled={sending}
              maxLength={500}
              aria-label="Message to Veer"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 shrink-0"
              disabled={sending || !input.trim()}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
        aria-label={open ? "Close Veer AI" : "Open Veer AI personal guide"}
      >
        {open ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
