import { AppShell } from "@/components/layout/app-shell";
import { Suspense } from "react";
import { RouteCreditGate } from "@/features/credits/route-gate";
// AUTH SYSTEM (owner request 2026-10-17): the login + owner-approval wall.
// Everything in the shell requires a signed-in, APPROVED account; only the
// notice board stays open. Sits in front of the coin gate so a signed-out
// visitor meets the approval lock, never a coin ask.
import { RequireApproval } from "@/features/auth/components/require-approval";
// ADDITIVE (perf/resilience pass): inner error layer and passive intent prefetcher.
// The existing shell/gate structure below is untouched.
import { RouteErrorBoundary } from "@/components/perf/route-error-boundary";
import { TopicNotesPrefetcher } from "@/components/perf/topic-notes-prefetcher";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
          </div>
        </div>
      }
    >
      <AppShell>
        {/* AUTH WALL: locks every route (home, notes, labs, the periodic table,
            chat, profile, …) behind a signed-in, APPROVED account. The notice
            board passes through. Header + nav stay visible above it, so the
            periodic table in the header is present but locked. */}
        <RequireApproval>
          {/* Coin gate: blurs + overlays every paid route until unlocked for
              20 minutes. Public routes (home, AI chat, auth) pass through. */}
          <RouteCreditGate>
            {/* ADDITIVE (perf/resilience pass): a render error inside a route now
                degrades to the shared fallback card while the shell (header,
                nav, theme, offline banner) stays interactive. `app/error.tsx`
                at the root still catches anything thrown outside this subtree —
                this only adds the inner layer, it replaces nothing. */}
            <RouteErrorBoundary>
              {/* ADDITIVE: intent-driven notes prefetcher; renders null, adds no DOM. */}
              <TopicNotesPrefetcher />
              {children}
            </RouteErrorBoundary>
          </RouteCreditGate>
        </RequireApproval>
      </AppShell>
    </Suspense>
  );
}

