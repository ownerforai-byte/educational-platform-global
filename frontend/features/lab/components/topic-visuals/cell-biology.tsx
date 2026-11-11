"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { BiologyCellScene } from "@/components/lab/3d-rig/biology-cell-scene";
import {
  CELL_HOTSPOTS,
  visibleAnimalStructures,
  visiblePlantStructures,
  type CellMode,
} from "@/components/lab/3d-rig/biology-cell-hotspots";
import { ReadoutGrid } from "@/components/lab/scene-interactivity";

/**
 * Eukaryotic cell — improved 3D ultrastructure (Task 4 showcase).
 *
 * Renders the full 3D-rig showcase: PBR organelles on a noise-displaced
 * membrane, a plant/animal toggle that animates mode-specific organelles in
 * and out, and 7 clickable knowledge hotspots that resolve real concept JSON
 * (never hardcoded strings). Rendering adapts to hardware via scene tiers and
 * honors prefers-reduced-motion.
 *
 * NEB Class 11 Biology — "Detail structure of eukaryotic cells".
 */
export function CellBiologyVisual() {
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [mode, setMode] = useState<CellMode>("plant");

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="Eukaryotic Cell"
        description="3D cell ultrastructure — organelles, plant/animal toggle and clickable knowledge hotspots."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Eukaryotic Cell — Ultrastructure</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to orbit · Scroll to zoom · Click a glowing marker</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BiologyCellScene defaultMode="plant" onModeChange={setMode} />

        <ReadoutGrid
          items={[
            { label: "Cell type", value: mode === "plant" ? "Plant cell" : "Animal cell", highlight: true },
            { label: "Knowledge hotspots", value: CELL_HOTSPOTS.length, unit: "clickable" },
            { label: "Plant-only organelles", value: visiblePlantStructures(mode).join(", ") || "—" },
            { label: "Animal-only organelles", value: visibleAnimalStructures(mode).join(", ") || "—" },
          ]}
        />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Nucleus:</strong> Control center containing DNA; surrounded by nuclear envelope with nucleolus inside.</p>
            <p><strong className="text-foreground">Mitochondria:</strong> Powerhouse of the cell — site of aerobic respiration and ATP production.</p>
            <p><strong className="text-foreground">Endoplasmic Reticulum:</strong> Rough ER (with ribosomes) synthesizes proteins; smooth ER synthesizes lipids.</p>
            <p><strong className="text-foreground">Golgi Body:</strong> Modifies, sorts, and packages proteins for secretion.</p>
            <p><strong className="text-foreground">Chloroplast:</strong> Site of photosynthesis — contains thylakoid stacks (grana) with chlorophyll (plant only).</p>
            <p><strong className="text-foreground">Lysosomes:</strong> Contain hydrolytic enzymes for intracellular digestion (animal only).</p>
            <p><strong className="text-foreground">Cell Wall:</strong> Rigid outer layer (plants) providing structural support — differs from cell membrane.</p>
            <p><strong className="text-foreground">Hotspots:</strong> every glowing marker opens that organelle's real concept fields from the published notes.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
