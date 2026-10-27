"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// PHASE 3 (2026-10-27): the table is a heavy client island (136K element
// bank + block explorer); loaded lazily so the route shell paints first.
// Next 16 forbids `ssr: false` dynamics inside Server Components, so the
// dynamic call lives in this Client Component wrapper.
const PeriodicTableView = dynamic(
  () =>
    import("@/components/periodic-table/periodic-table-view").then(
      (m) => m.PeriodicTableView,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-9 lg:grid-cols-12 py-6">
        {Array.from({ length: 36 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    ),
  },
);

export function PeriodicTableLazy() {
  return <PeriodicTableView />;
}
