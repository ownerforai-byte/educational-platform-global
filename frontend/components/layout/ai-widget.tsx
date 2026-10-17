"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Coins } from "lucide-react";
import { CaptainMark } from "@/components/ai/captain-logo";
import { useSession } from "@/features/auth/hooks/use-session";
import { hasLevel } from "@/lib/access-level";

/**
 * Floating AI launcher (bottom-left corner).
 *
 * OWNER RULE CHANGE 2026-10-17: "lock ai widget under spark gate also". The
 * launcher used to be OPEN to every tier (2026-10-13) and just navigate to
 * /chat. It now sits under the SAME spark gate the home features and the CEE
 * bank use: Pro members and the owner pass the gate and open Veer directly;
 * every lower rung (visitor / member / plus) sees a LOCKED launcher that points
 * at the plan page instead — matching the indexes bar, where the AI index is a
 * Pro-level unlock.
 *
 * It still hides on the chat routes (owner request 2026-10-11: "disable ai
 * widget in chat") — on /chat and /chat/* you are already standing in the thing
 * it opens. Render nothing until mounted so the first client pass matches the
 * server HTML (no hydration mismatch).
 */
export function AIWidget() {
  const { user, isLoading } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || isLoading) return null;
  if (pathname === "/chat" || pathname.startsWith("/chat/")) return null;

  // Spark gate: Pro + owner unlock Veer; the lower rungs meet the lock.
  const unlocked = hasLevel(user ?? null, "pro");

  if (!unlocked) {
    return (
      <Link
        href="/pro-plan"
        aria-label="Veer is locked under the Spark gate — see your plan"
        title="Veer is Spark-gated — see your plan to unlock"
        className="fixed left-6 bottom-safe z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-muted to-muted/70 border border-amber-500/40 hover:scale-105 transition-all"
      >
        <span className="relative flex items-center justify-center">
          <Lock className="h-6 w-6 text-amber-500" />
          <Coins className="absolute -right-1.5 -top-1.5 h-3 w-3 text-amber-500/80" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/chat"
      aria-label="Open Veer — full chat page"
      className="fixed left-6 bottom-safe z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-primary to-primary/70 hover:scale-105 transition-all"
    >
      <CaptainMark className="h-7 w-7 text-white" />
    </Link>
  );
}
