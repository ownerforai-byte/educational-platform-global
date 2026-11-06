import { AppShell } from "@/components/layout/app-shell";
import { Suspense } from "react";
import { RequireApproval } from "@/features/auth/components/require-approval";
import { RouteErrorBoundary } from "@/components/perf/route-error-boundary";
import { TopicNotesPrefetcher } from "@/components/perf/topic-notes-prefetcher";
import { SectionTierGate } from "@/components/content/section-tier-gate";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}>
      <AppShell>
        <RequireApproval>
          <SectionTierGate>
            <RouteErrorBoundary>
              <TopicNotesPrefetcher />
              {children}
            </RouteErrorBoundary>
          </SectionTierGate>
        </RequireApproval>
      </AppShell>
    </Suspense>
  );
}