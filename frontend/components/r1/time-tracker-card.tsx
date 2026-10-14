"use client";

import { useEffect, useState } from "react";
import { Check, Clock, Pause, Play, RotateCcw, Timer } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { useCreateR1Activity, useR1Activities } from "@/features/r1/hooks";
import {
  clearFocusTimerAfterSave,
  formatElapsed,
  initFocusTimer,
  pauseFocusTimer,
  resetFocusTimer,
  setFocusTimerLabel,
  startFocusTimer,
  useFocusTimer,
} from "@/features/r1/focus-timer-store";
import { cn } from "@/lib/utils";

/**
 * Time tracker on the R1 home — the same shared stopwatch as the floating
 * launcher, plus today's tracked total and the recent timed sessions.
 */
export function TimeTrackerCard() {
  const { user } = useSession();
  const { state, elapsedText, elapsedMs } = useFocusTimer();
  const saveSession = useCreateR1Activity();
  const [saved, setSaved] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const { data: activities } = useR1Activities({ from: today, to: today }, !!user);

  useEffect(() => {
    if (user) initFocusTimer(user.id);
  }, [user]);

  const timedToday = (activities ?? []).filter((a) => a.category === "timed");
  const trackedMinutes = timedToday.reduce((sum, a) => sum + (a.minutes ?? 0), 0);
  const recent = timedToday.slice(0, 5);

  const save = () => {
    if (elapsedMs <= 0) return;
    const minutes = Math.max(1, Math.round(elapsedMs / 60000));
    saveSession.mutate(
      {
        activityDate: today,
        title: state.label.trim() || "Timer session",
        category: "timed",
        minutes,
        description: `Timed session ${formatElapsed(elapsedMs)}`,
      },
      {
        onSuccess: () => {
          clearFocusTimerAfterSave();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        },
      }
    );
  };

  return (
    <section className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Timer className="h-4 w-4 text-primary" /> Time tracker
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {trackedMinutes} min today
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div
          className={cn(
            "font-mono text-5xl font-bold tabular-nums tracking-tight",
            state.running ? "text-primary" : "text-foreground"
          )}
        >
          {elapsedText}
        </div>
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            state.running
              ? "bg-emerald-500 animate-pulse"
              : elapsedMs > 0
                ? "bg-amber-500"
                : "bg-muted-foreground/40"
          )}
          title={state.running ? "Running" : elapsedMs > 0 ? "Paused" : "Idle"}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input
          value={state.label}
          onChange={(e) => setFocusTimerLabel(e.target.value)}
          placeholder="What are you timing? (e.g. Kinematics revision)"
          className="min-w-56 flex-1 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          maxLength={120}
        />
        {state.running ? (
          <button
            type="button"
            onClick={pauseFocusTimer}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-600 transition-all hover:bg-amber-500/25"
          >
            <Pause className="h-4 w-4" /> Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={startFocusTimer}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-600 transition-all hover:bg-emerald-500/25"
          >
            <Play className="h-4 w-4" /> Start
          </button>
        )}
        <button
          type="button"
          onClick={resetFocusTimer}
          disabled={elapsedMs <= 0}
          className="inline-flex items-center gap-1.5 rounded-xl bg-muted/60 px-4 py-2 text-sm font-semibold text-muted-foreground transition-all hover:bg-muted disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button
          type="button"
          onClick={save}
          disabled={elapsedMs <= 0 || saveSession.isPending}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4" /> : null}
          {saved ? "Saved to log" : "Save session"}
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Timed sessions today
        </h3>
        {recent.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Nothing saved yet — start the timer and save when you finish.
          </p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {recent.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-2.5 rounded-xl border border-border/60 px-3 py-2 text-sm"
              >
                <span className="flex-1 truncate">{a.title}</span>
                {a.description && (
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {a.description.replace("Timed session ", "")}
                  </span>
                )}
                <span className="text-xs font-semibold text-primary">{a.minutes} min</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
