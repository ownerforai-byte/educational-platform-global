"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// PHASE 3 (2026-10-27): the hub pulls puter.js — load it lazily so the
// route shell paints before the drawing runtime downloads. Next 16 forbids
// `ssr: false` dynamics inside Server Components, so the dynamic call lives
// in this Client Component wrapper.
const ImageHub = dynamic(
  () => import("@/features/image-hub").then((m) => m.ImageHub),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-6xl space-y-4 px-2 sm:px-4 py-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    ),
  },
);

export function ImageHubLazy() {
  return <ImageHub />;
}
