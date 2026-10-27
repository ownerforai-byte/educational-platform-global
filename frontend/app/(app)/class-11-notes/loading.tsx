import { Skeleton } from "@/components/ui/skeleton";

/**
 * Content-area skeleton for the class-11 notes portal (PHASE 2, 2026-10-27).
 * The AppShell (nav/sidebar) persists — only the content panel shows this,
 * so first paint is a card grid instead of a blank screen.
 */
export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-full max-w-2xl" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-6">
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
