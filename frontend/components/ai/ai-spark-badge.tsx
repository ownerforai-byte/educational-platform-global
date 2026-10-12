"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

/**
 * AI SPARK BADGE (owner request 2026-10-12: "separate the ai(veer) spark and
 * content spark -- ai spark shows while chatting only on top").
 *
 * The AI spark is a SEPARATE pool from the content spark:
 *   · AI spark — this badge, rendered ONLY at the top of the Veer chat. It is
 *     an informational daily counter (resets at UTC midnight with the day).
 *     Veer chat is FREE — no AI spark is ever spent (owner policy 2026-10-12:
 *     "Veer chat and everything else are free — no AI spark is ever spent").
 *   · content spark — the wallet/header badge, spent only on actual
 *     note/content unlocks (see features/credits/constants.ts).
 *
 * The counter tracks how many Veer messages the student has sent today, so
 * the number means something while nothing is ever deducted.
 */

const STORAGE_KEY = "veer.ai-spark.v1";

interface AiSparkState {
  day: string; // YYYY-MM-DD (UTC)
  used: number;
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function readState(): AiSparkState {
  const day = todayUtc();
  if (typeof window === "undefined") return { day, used: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { day, used: 0 };
    const parsed = JSON.parse(raw) as Partial<AiSparkState>;
    if (parsed.day !== day) return { day, used: 0 };
    return { day, used: typeof parsed.used === "number" ? parsed.used : 0 };
  } catch {
    return { day, used: 0 };
  }
}

function writeState(state: AiSparkState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable — the badge degrades to a static display.
  }
}

/** Record one sent Veer message against today's AI spark counter. */
export function recordAiSparkUse(): void {
  const state = readState();
  writeState({ day: state.day, used: state.used + 1 });
  window.dispatchEvent(new CustomEvent("veer-ai-spark"));
}

export function AiSparkBadge({ className = "" }: { className?: string }) {
  const [used, setUsed] = useState(0);

  useEffect(() => {
    const sync = () => setUsed(readState().used);
    sync();
    window.addEventListener("veer-ai-spark", sync);
    const interval = setInterval(sync, 30_000); // pick up UTC rollover
    return () => {
      window.removeEventListener("veer-ai-spark", sync);
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-600 dark:text-violet-400 ${className}`}
      title={`AI Spark — ${used} Veer message${used === 1 ? "" : "s"} today. Chat is free: no AI spark is ever spent.`}
    >
      <Sparkles className="h-3.5 w-3.5" />
      <span>AI Spark</span>
      <span className="rounded-full bg-violet-500/20 px-1.5 text-[10px]">{used} today</span>
    </span>
  );
}
