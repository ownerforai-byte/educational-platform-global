import { Skeleton } from "@/components/ui/skeleton";

/** Scoped exam-track skeleton; keeps the app shell while the route paints. */
export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-4xl space-y-5 px-4 py-8"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <span className="sr-only">Loading exam track</span>
      <Skeleton className="h-5 w-32" />
      <div className="space-y-3 rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/70 bg-card p-5">
            <Skeleton className="mb-4 h-8 w-8 rounded-full" />
            <Skeleton className="mb-2 h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
