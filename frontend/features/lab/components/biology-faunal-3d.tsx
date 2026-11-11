"use client";

/**
 * Faunal Diversity 3D — the full NEB "Faunal Diversity" unit as real WebGL:
 *
 *   Protista/Protozoa (Paramecium structure + reproduction, Plasmodium) ·
 *   Animalia body plans (nine phyla) · Earthworm (external, digestive,
 *   excretory+nervous, reproductive) · Frog (external+heart, urogenital).
 *
 * House rules on every scene:
 *  - Arrow-free SVG leader lines with perpendicular tip terminators.
 *  - Reveal bar: ◉ Reveal → Next +1 …, Show all, Clear.
 *  - TheoryPanel (Look → Principle → Why) under each canvas.
 */

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bug, Network, Activity, Heart } from "lucide-react";
import {
  ParameciumScene,
  ParameciumReproductionScene,
  PlasmodiumScene,
} from "./biology-faunal-3d-protists";
import {
  EarthwormExternalScene,
  EarthwormDigestiveScene,
  EarthwormExcretoryNervousScene,
  EarthwormReproductiveScene,
} from "./biology-faunal-3d-earthworm";
import { PhylaBodyPlansScene, FrogScene, FrogUrogenitalScene } from "./biology-faunal-3d-phyla-frog";
import { BiologyFaunalReal3D } from "./biology-faunal-real-3d";

type TabId =
  | "protists"
  | "protist-repro"
  | "plasmodium"
  | "phyla"
  | "worm-ext"
  | "worm-digestive"
  | "worm-excr-nerv"
  | "worm-repro"
  | "frog-ext"
  | "frog-urog";

const TABS: { id: TabId; label: string; icon: any; color: string }[] = [
  { id: "protists", label: "Paramecium", icon: Bug, color: "#f97316" },
  { id: "protist-repro", label: "Paramecium Reproduction", icon: Bug, color: "#fb923c" },
  { id: "plasmodium", label: "Plasmodium Life Cycle", icon: Bug, color: "#ef4444" },
  { id: "phyla", label: "Nine Phyla", icon: Network, color: "#38bdf8" },
  { id: "worm-ext", label: "Earthworm External", icon: Activity, color: "#d97706" },
  { id: "worm-digestive", label: "Earthworm Digestion", icon: Activity, color: "#f59e0b" },
  { id: "worm-excr-nerv", label: "Excretory + Nervous", icon: Activity, color: "#8b5cf6" },
  { id: "worm-repro", label: "Earthworm Reproduction", icon: Activity, color: "#ec4899" },
  { id: "frog-ext", label: "Frog + Heart", icon: Heart, color: "#22c55e" },
  { id: "frog-urog", label: "Frog Urogenital", icon: Heart, color: "#10b981" },
];

export function BiologyFaunalDiversity3D() {
  const [tab, setTab] = useState<TabId>("protists");

  return (
    <div className="space-y-4">
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)}>
        <TabsList className="flex flex-wrap h-auto gap-1.5">
          {TABS.map((t) => (
            <TabsTrigger key={t.id} value={t.id} className="gap-1.5 text-xs">
              <span style={{ color: t.color, display: "inline-flex" }}><t.icon className="h-3.5 w-3.5" /></span>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="protists"><ParameciumScene /></TabsContent>
        <TabsContent value="protist-repro"><ParameciumReproductionScene /></TabsContent>
        <TabsContent value="plasmodium"><PlasmodiumScene /></TabsContent>
        <TabsContent value="phyla"><PhylaBodyPlansScene /></TabsContent>
        <TabsContent value="worm-ext"><EarthwormExternalScene /></TabsContent>
        <TabsContent value="worm-digestive"><EarthwormDigestiveScene /></TabsContent>
        <TabsContent value="worm-excr-nerv"><EarthwormExcretoryNervousScene /></TabsContent>
        <TabsContent value="worm-repro"><EarthwormReproductiveScene /></TabsContent>
        <TabsContent value="frog-ext"><FrogScene /></TabsContent>
        <TabsContent value="frog-urog"><FrogUrogenitalScene /></TabsContent>
      </Tabs>

      {/* ── additive: the photoreal Real Anatomy Studio, below the original ── */}
      <BiologyFaunalReal3D />
    </div>
  );
}

export default BiologyFaunalDiversity3D;
