"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  AI_SPARK_LIMITS,
  AI_SPARK_TIER_LABELS,
  aiSparkTierFor,
} from "@/lib/ai/ai-spark-tiers";
import { getAiSparkUsage } from "@/lib/api/ai";
import { setLitePoll } from "@/lib/perf/lite";

/**
 * AI SPARK BADGE (owner requests 2026-10-12 + 2026-10-13).
 *
 * The AI spark is a SEPARATE pool from the content spark:
 *   · AI spark — this badge, rendered ONLY at the top of the Veer chat. It is
 *     the daily Veer message allowance per tier: public visitors get 3/day,
 *     members 7/day, Plus 25/day, Pro 50/day, and owners unlimited, per UTC day.
 *   · content spark — the wallet/header badge, spent only on actual
 *     note/content unlocks (see features/credits/constants.ts).
 *
 * The server is the source of truth (GET /api/ai/spark); the localStorage
 * mirror below only makes the number honest before the first reply of the
 * session. Pools refill ONLY at UTC midnight — never on refresh.
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

/** Record one sent Veer message against today's local AI-spark mirror. */
export function recordAiSparkUse(): void {
  const state = readState();
  writeState({ day: state.day, used: state.used + 1 });
  window.dispatchEvent(new CustomEvent("veer-ai-spark"));
}

export function AiSparkBadge({ className = "" }: { className?: string }) {
  const { user } = useSession();
  const tier = aiSparkTierFor(user ?? null);
  const limit = AI_SPARK_LIMITS[tier];
  const metered = Number.isFinite(limit);
  const [used, setUsed] = useState(0);

  useEffect(() => {
    const sync = () => {
      setUsed(readState().used);
      // Server is the source of truth for signed-in tiers (best-effort).
      getAiSparkUsage()
        .then((s) => setUsed(s.used))
        .catch(() => {
          /* offline / signed out — the local mirror stands */
        });
    };
    sync();
    window.addEventListener("veer-ai-spark", sync);
    // Lite (low data) mode stretches the 30s rollover check on every tick —
    // the number still updates on every message via the event above.
    const stopPoll = setLitePoll(sync, 30_000);
    return () => {
      window.removeEventListener("veer-ai-spark", sync);
      stopPoll();
    };
  }, [user?.email]);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-600 dark:text-violet-400 ${className}`}
      title={`AI Spark (${AI_SPARK_TIER_LABELS[tier]}) — ${used}${
        metered ? `/${limit}` : ""
      } Veer message${used === 1 ? "" : "s"} today. ${
        metered
          ? "Resets at 12:00 AM UTC — Plus gets 25/day, Pro gets 50/day."
          : "Unlimited on the owner plan."
      }`}
    >
      <Sparkles className="h-3.5 w-3.5" />
      <span>AI Spark</span>
      <span className="rounded-full bg-violet-500/20 px-1.5 text-[10px]">
        {metered ? `${used}/${limit}` : "∞"} today
      </span>
    </span>
  );
}
