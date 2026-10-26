"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coins } from "lucide-react";
import { CaptainMark } from "@/components/ai/captain-logo";
import { useSession } from "@/features/auth/hooks/use-session";
import { hasLevel } from "@/lib/access-level";

/**
 * Floating AI launcher (bottom-left corner).
 *
 * OWNER RULE CHANGE 2026-10-17: put the AI widget under the Spark gate. The
 * launcher used to be OPEN to every tier (2026-10-13) and just navigate to
 * /chat. It now sits under the SAME spark gate the home features and the CEE
 * bank use: Pro members and the owner pass the gate and open Veer directly;
 * every lower rung (visitor / member / plus) sees a muted disabled launcher —
 * no lock icon and no plan link.
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

  // Spark gate: Pro + owner open Veer; the lower rungs see a disabled launcher.
  const unlocked = hasLevel(user ?? null, "pro");

  if (!unlocked) {
    // Plans live in the footer only (owner 2026-10-25); the launcher stays inert.
    return (
      <div
        aria-disabled="true"
        title="Veer is Spark-gated — opens at the Pro rung"
        className="fixed left-6 bottom-safe z-50 h-14 w-14 cursor-not-allowed rounded-full border border-border/60 bg-muted/50 shadow-lg grayscale opacity-50 flex items-center justify-center"
      >
        <span className="relative flex items-center justify-center">
          <span
            className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/60"
            aria-hidden="true"
          >
            Spark
          </span>
          <Coins className="absolute -right-1.5 -top-1.5 h-3 w-3 text-muted-foreground/50" />
        </span>
      </div>
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
