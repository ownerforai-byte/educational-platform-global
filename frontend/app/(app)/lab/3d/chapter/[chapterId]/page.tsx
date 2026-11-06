"use client";

/**
 * Legacy chapter gallery → filtered hub view (Phase 3).
 *
 * `/lab/3d/chapter/<id>` used to mount a generic 3D scene for any slug. It is now
 * a view of the single hub scoped to that syllabus unit (`curriculum.unitId`),
 * matching exactly and keeping the deep link alive.
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Cuboid } from "lucide-react";
import { ManifestHubSection } from "@/components/lab/manifest-hub-section";

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Chapter3DHubPage() {
  const params = useParams();
  const chapterId = String(params?.chapterId ?? "");

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:py-12">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <span className="inline-flex h-10 w-10 rounded-2xl bg-orange-500/10 items-center justify-center">
              <Cuboid className="h-5 w-5 text-orange-500" />
            </span>
            {titleFromSlug(chapterId)}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
            Every lab the manifest places in this unit. Open one to run it, then take the
            journey into practice, notes or Veer.
          </p>
        </div>
        <Link
          href="/lab/3d"
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          All 3D Labs
        </Link>
      </div>

      <ManifestHubSection unitId={chapterId} limit={0} />
    </div>
  );
}
