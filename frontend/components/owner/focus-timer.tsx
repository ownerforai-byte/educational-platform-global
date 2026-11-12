"use client";

import { useEffect, useState } from "react";
import { Check, Pause, Play, RotateCcw, Timer } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  clearFocusTimerAfterSave,
  formatElapsed,
  initFocusTimer,
  pauseFocusTimer,
  resetFocusTimer,
  setFocusTimerLabel,
  startFocusTimer,
  useFocusTimer,
} from "@/features/owner/focus-timer-store";
import { accessLevelFor } from "@/lib/access-level";
import { cn } from "@/lib/utils";

/**
 * Floating focus timer — owner tier only.
 * Status dot: green = running, amber = paused with time, grey = idle.
 * Sessions stay on-device.
 */
export function FocusTimer() {
  const { user } = useSession();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { state, elapsedText, elapsedMs } = useFocusTimer();
  const [saved, setSaved] = useState(false);

  useEffect(() => setMounted(true), []);

  const allowed = accessLevelFor(user) === "owner";

  useEffect(() => {
    if (user && allowed) initFocusTimer(user.id);
  }, [user, allowed]);

  if (!mounted || !user || !allowed) return null;

  const hasTime = elapsedMs > 0;

  const save = () => {
    if (!hasTime) return;
    clearFocusTimerAfterSave();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const dotClass = state.running
    ? "bg-emerald-500 animate-pulse"
    : hasTime
      ? "bg-amber-500"
      : "bg-muted-foreground/40";

  return (
    <div className="fixed left-6 bottom-safe-panel z-50 flex flex-col items-start gap-2">
      {open && (
        <div className="w-72 rounded-2xl border border-border/60 bg-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Focus timer
            </span>
            <span
              className={cn("h-2 w-2 rounded-full", dotClass)}
              title={state.running ? "Running" : hasTime ? "Paused" : "Idle"}
            />
          </div>

          <div className="mt-2 text-center font-mono text-4xl font-bold tabular-nums tracking-tight">
            {elapsedText}
          </div>

          <input
            value={state.label}
            onChange={(e) => setFocusTimerLabel(e.target.value)}
            placeholder="What are you doing?"
            className="mt-3 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            maxLength={120}
          />

          <div className="mt-3 grid grid-cols-3 gap-2">
            {state.running ? (
              <button
                type="button"
                onClick={pauseFocusTimer}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500/15 px-3 py-2 text-xs font-semibold text-amber-600 transition-all hover:bg-amber-500/25"
              >
                <Pause className="h-3.5 w-3.5" /> Pause
              </button>
            ) : (
              <button
                type="button"
                onClick={startFocusTimer}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-600 transition-all hover:bg-emerald-500/25"
              >
                <Play className="h-3.5 w-3.5" /> Start
              </button>
            )}
            <button
              type="button"
              onClick={resetFocusTimer}
              disabled={!hasTime}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-muted/60 px-3 py-2 text-xs font-semibold text-muted-foreground transition-all hover:bg-muted disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button
              type="button"
              onClick={save}
              disabled={!hasTime}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              {saved ? <Check className="h-3.5 w-3.5" /> : null}
              {saved ? "Cleared" : "Done"}
            </button>
          </div>

          <p className="mt-2.5 text-[11px] leading-tight text-muted-foreground">
            Owner-only timer · {formatElapsed(elapsedMs)} on this session stays
            on this device.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close focus timer" : "Open focus timer"}
        title="Focus timer — owner only"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card shadow-lg transition-all hover:scale-105"
      >
        <Timer className={cn("h-4.5 w-4.5", state.running ? "text-emerald-500" : "text-primary")} />
        <span
          className={cn(
            "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card",
            dotClass,
          )}
        />
        {hasTime && !open && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-background">
            {elapsedText}
          </span>
        )}
      </button>
    </div>
  );
}
