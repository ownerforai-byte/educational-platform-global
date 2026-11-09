"use client";

/**
 * AiStatusDot: the one live on/off dot every chat surface shows next to Veer.
 * Green glowing pulse = AI reachable and configured; grey static = offline/unavailable.
 */
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";
import { aiStatusLabel, resolveAiStatus } from "@/lib/chat/ai-status";

const POLL_MS = 60_000;
/** A stalled probe must never hold the poll slot open for a full minute. */
const PROBE_TIMEOUT_MS = 10_000;

export function AiStatusDot({ className }: { className?: string }) {
  const browserOnline = useOnlineStatus();
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (!browserOnline) return;
    let cancelled = false;
    let inFlight: AbortController | null = null;
    const probe = async () => {
      // CodeRabbit: a probe that stalls past the poll interval used to leave a
      // pending request behind while the next tick stacked another on top of
      // it. One bounded request at a time, aborted on unmount.
      if (inFlight) return;
      const current = new AbortController();
      inFlight = current;
      const timeout = setTimeout(() => current.abort(), PROBE_TIMEOUT_MS);
      try {
        const res = await fetch("/api/ai/status", {
          cache: "no-store",
          signal: current.signal,
        });
        const data = res.ok
          ? ((await res.json()) as { online?: boolean; configured?: boolean })
          : null;
        if (!cancelled) setServerOnline(Boolean(data?.configured ?? data?.online));
      } catch {
        if (!cancelled) setServerOnline(false);
      } finally {
        clearTimeout(timeout);
        if (inFlight === current) inFlight = null;
      }
    };
    void probe();
    const id = setInterval(() => void probe(), POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
      inFlight?.abort();
      inFlight = null;
    };
  }, [browserOnline]);

  const status = resolveAiStatus({ browserOnline, serverOnline });
  const label = aiStatusLabel(status, browserOnline);
  return (
    <span
      role="status"
      aria-label={label}
      title={label}
      data-status={status}
      className={cn("relative flex h-2 w-2 shrink-0", className)}
    >
      {status === "online" && (
        <span
          data-testid="ai-status-glow"
          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
        />
      )}
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          status === "online" &&
            "animate-pulse bg-emerald-500 shadow-[0_0_6px_2px_rgba(16,185,129,0.8)]",
          status === "checking" && "bg-amber-400",
          status === "offline" && "bg-zinc-400",
        )}
      />
    </span>
  );
}
