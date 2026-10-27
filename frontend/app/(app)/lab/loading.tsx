import { Skeleton } from "@/components/ui/skeleton";

/**
 * Content-area skeleton for the lab portal (PHASE 2, 2026-10-27). 3D rigs
 * mount lazily; this skeleton holds the frame until the lab surface is ready.
 */
export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-6">
            <Skeleton className="mb-3 h-40 w-full rounded-md" />
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
