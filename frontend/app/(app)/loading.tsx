import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shell-wide content skeleton (2026-11-05 app-shell pass).
 *
 * Route changes now paint the shape of the page instead of a lone spinner, so
 * the header, rail and tab bar stay put and only the content area breathes —
 * the difference between "a website loading a page" and an app switching tabs.
 * Routes with their own richer skeleton (class-11-notes, class-12-notes, lab)
 * still win, because a segment-level loading.tsx sits closer to the route.
 */
export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-5xl space-y-5"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading page</span>

      <div className="space-y-2">
        <Skeleton className="h-7 w-56 max-w-full" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/60 p-5">
            <Skeleton className="mb-3 h-9 w-9 rounded-lg" />
            <Skeleton className="mb-2 h-4 w-32" />
            <Skeleton className="mb-3 h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
