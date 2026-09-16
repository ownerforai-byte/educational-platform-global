"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LabPageShell } from "@/components/lab/lab-page-shell";
import { BiologyCellScene } from "@/components/lab/3d-rig/biology-cell-scene";
import { SpotIndex } from "@/components/lab/3d-rig/spot-index";
import { CELL_HOTSPOTS, resolveCellTopicRef } from "@/components/lab/3d-rig/biology-cell-hotspots";
import { useTopicConceptData } from "@/components/lab/3d-rig/concept-lookup";
import {
  ConceptKnowledgeGrid,
  type RavikishanConceptData,
} from "@/components/content/ravikishan-concept-panels";

/**
 * Showcase 1 (Task 4) — /lab/biology/bio-3d-cell
 *
 * Deep link (resolves real concept JSON, not demo strings — AC-07):
 *   /lab/biology/bio-3d-cell?class=class-11-notes&subject=biology
 *     &unit=cell-biology&topic=detail-structure-of-eukaryotic-cells
 *
 * `classSlug`/`subjectSlug`/`unitId`/`topicSlug` are accepted as aliases, and
 * `unit=cell-biology` is mapped onto the published unit directory by
 * `resolveCellTopicRef`. Missing/unknown values fall back to the cell topic.
 */
function BiologyCell3DContent() {
  const searchParams = useSearchParams();
  const [activeHotspotId, setActiveHotspotId] = useState("");

  const topicRef = useMemo(
    () =>
      resolveCellTopicRef({
        classSlug: searchParams.get("class") ?? searchParams.get("classSlug"),
        subjectSlug: searchParams.get("subject") ?? searchParams.get("subjectSlug"),
        unitId: searchParams.get("unit") ?? searchParams.get("unitId"),
        topicSlug: searchParams.get("topic") ?? searchParams.get("topicSlug"),
      }),
    [searchParams],
  );

  const { data, entry, loading } = useTopicConceptData(topicRef);
  const activeHotspot = CELL_HOTSPOTS.find((hotspot) => hotspot.id === activeHotspotId) ?? null;

  const topicTitle =
    typeof entry?.data.topicTitle === "string" && entry.data.topicTitle.trim().length > 0
      ? entry.data.topicTitle
      : "Cell Ultrastructure";

  // The manifest row is validated at runtime by `toConceptData` for the 3D
  // panel; the 2D grid takes the published shape so both read the same object.
  const gridData = useMemo(
    () => (entry?.data ?? {}) as unknown as RavikishanConceptData,
    [entry],
  );

  return (
    <LabPageShell
      subject="biology"
      unit="Unit 1 · Cell Biology"
      topic={topicTitle}
      labId="bio-3d-cell"
      title="Cell Structure 3D — Plant & Animal Cell Ultrastructure"
      activeHotspot={
        activeHotspot
          ? { title: activeHotspot.label, summary: activeHotspot.summaryA11ySentence }
          : null
      }
      sidebarContent={
        <div className="space-y-4">
          <SpotIndex
            hotspots={CELL_HOTSPOTS}
            activeId={activeHotspotId}
            onFocus={setActiveHotspotId}
          />
          <div className="border-t border-border/50 pt-3">
            <ConceptKnowledgeGrid data={gridData} />
          </div>
        </div>
      }
    >
      <BiologyCellScene
        classSlug={topicRef.classSlug}
        subjectSlug={topicRef.subjectSlug}
        unitId={topicRef.unitId}
        topicSlug={topicRef.topicSlug}
        activeHotspotId={activeHotspotId}
        onOpenHotspot={setActiveHotspotId}
        conceptData={data}
        showSpotIndex={false}
      />
      <p className="mt-3 text-[11px] text-muted-foreground">
        Concept JSON:{" "}
        <code className="font-mono">
          {topicRef.classSlug}/{topicRef.subjectSlug}/{topicRef.unitId}/{topicRef.topicSlug}
        </code>
        {loading ? " — resolving…" : entry ? "" : " — not published yet, showing field slots"}
      </p>
    </LabPageShell>
  );
}

export default function BiologyCell3DPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading 3D cell…</div>}>
      <BiologyCell3DContent />
    </Suspense>
  );
}
