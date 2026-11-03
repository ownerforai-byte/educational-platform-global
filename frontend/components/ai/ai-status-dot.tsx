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

export function AiStatusDot({ className }: { className?: string }) {
  const browserOnline = useOnlineStatus();
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (!browserOnline) return;
    let cancelled = false;
    const probe = async () => {
      try {
        const res = await fetch("/api/ai/status", { cache: "no-store" });
        const data = res.ok ? ((await res.json()) as { online?: boolean }) : null;
        if (!cancelled) setServerOnline(Boolean(data?.online));
      } catch {
        if (!cancelled) setServerOnline(false);
      }
    };
    void probe();
    const id = setInterval(probe, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
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
