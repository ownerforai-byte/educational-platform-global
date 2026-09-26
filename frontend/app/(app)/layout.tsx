import { AppShell } from "@/components/layout/app-shell";
import { Suspense } from "react";
import { RouteCreditGate } from "@/features/credits/route-gate";

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
            2 hours. Public routes (home, AI chat, auth) pass through. */}
        <RouteCreditGate>{children}</RouteCreditGate>
      </AppShell>
    </Suspense>
  );
}
