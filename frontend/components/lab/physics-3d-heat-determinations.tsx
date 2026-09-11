"use client";

/**
 * 3D Heat Determination Labs — a tabbed suite of four fully labelled,
 * classic "Determination of…" heat experiments:
 *
 *   1. Lee's Disc Method   → thermal conductivity K of a bad conductor
 *   2. Searle's Bar        → thermal conductivity K of a good conductor
 *   3. Newton's Law Cooling → cooling constant k (exponential decay)
 *   4. Linear Expansion    → coefficient α of a metal rod
 *
 * Each experiment embeds CSS2D part labels inside the 3D scene and
 * complete theory/significance panels inside & below the canvas.
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeesDiscExperiment } from "./physics-3d-lees-disc";
import { SearlesBarExperiment } from "./physics-3d-searles-bar";
import { NewtonCoolingExperiment } from "./physics-3d-newtons-cooling";
import { LinearExpansionExperiment } from "./physics-3d-linear-expansion";

export const Physics3DHeatDeterminations: React.FC = () => {
  return (
    <Tabs defaultValue="lees" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="lees">Lee's Disc (K, bad)</TabsTrigger>
        <TabsTrigger value="searles">Searle's Bar (K, good)</TabsTrigger>
        <TabsTrigger value="newton">Newton Cooling (k)</TabsTrigger>
        <TabsTrigger value="expansion">Linear Expansion (α)</TabsTrigger>
      </TabsList>

      <TabsContent value="lees" className="mt-4">
        <LeesDiscExperiment />
      </TabsContent>

      <TabsContent value="searles" className="mt-4">
        <SearlesBarExperiment />
      </TabsContent>

      <TabsContent value="newton" className="mt-4">
        <NewtonCoolingExperiment />
      </TabsContent>

      <TabsContent value="expansion" className="mt-4">
        <LinearExpansionExperiment />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DHeatDeterminations;
