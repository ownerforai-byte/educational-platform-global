"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Lock, MessageSquare } from "lucide-react";

/**
 * LegalBlurGate — hides the platform's infrastructure/hosting identity on the
 * public legal pages behind a "Talk with owner for this" overlay (owner request
 * 2026-10-17: hide the platform's frontend/backend/Supabase details and other
 * internal specifics on the legal pages reached from the footer).
 *
 * The content is still rendered — blurred, inert and aria-hidden — so the page
 * keeps its structure, but a visitor cannot read the stack / hosting / provider
 * specifics without talking to the owner. `compact` fits an inline row (e.g.
 * the owner's address line); the block variant spaces its children like the
 * surrounding legal document.
 */
export function LegalBlurGate({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60">
      <div
        aria-hidden="true"
        className={
          "pointer-events-none select-none blur-[6px] opacity-40 " +
          (compact
            ? "min-h-[2.5rem] px-3 py-2"
            : "min-h-[7rem] px-4 py-4 space-y-4")
        }
      >
        {children}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70 p-3 backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/70 bg-card px-4 py-3 text-center shadow-xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
            <Lock className="h-4 w-4 text-primary" />
          </span>
          <p className="text-xs font-bold text-foreground">Talk with owner for this</p>
          <Link
            href="/notice"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
          >
            <MessageSquare className="h-3 w-3" />
            Contact the owner
          </Link>
        </div>
      </div>
    </div>
  );
}
