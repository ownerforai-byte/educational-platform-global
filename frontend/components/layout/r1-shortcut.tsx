"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { useR1Access } from "@/features/r1/hooks";
import { isOwnerUser } from "@/lib/owner";

/**
 * Header shortcut into the R1 layer (owner + granted emails only).
 * Renders null for everyone else — public visitors never see R1 chrome.
 */
export function R1Shortcut() {
  const { user } = useSession();
  const { data: r1 } = useR1Access(!!user);

  if (!user || !(isOwnerUser(user) || r1 === true)) return null;

  return (
    <Link
      href="/r1"
      className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-xl border border-primary/30 bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/20 transition-all shadow-sm whitespace-nowrap"
      title="R1 — your daily life layer (activities, plans, journal, habits)"
    >
      <Sparkles className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">R1</span>
    </Link>
  );
}
