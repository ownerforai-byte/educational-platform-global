import { AppShell } from "@/components/layout/app-shell";
import { Suspense } from "react";
import { RouteCreditGate } from "@/features/credits/route-gate";
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
      </AppShell>
    </Suspense>
  );
}

