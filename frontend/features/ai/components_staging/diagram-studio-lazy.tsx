"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// PHASE 3 (2026-10-27): the studio pulls puter.js — load it lazily so the
// route shell paints before the drawing runtime downloads. Next 16 forbids
// `ssr: false` dynamics inside Server Components, so the dynamic call lives
// in this Client Component wrapper.
const DiagramStudio = dynamic(
  () =>
    import("@/components/ai/diagram-studio").then((m) => m.DiagramStudio),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-6xl space-y-4 p-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    ),
  },
);

export function DiagramStudioLazy() {
  return <DiagramStudio />;
}
