"use client";

/**
 * Faunal Diversity — REAL ANATOMY STUDIO (second, additive section).
 *
 * Sits BELOW the original faunal suite; nothing above is replaced. Each
 * organism here is a photoreal model with a view switcher so you can move
 * between external skin, transparency, cutaway and one view per organ
 * system — plus a live process animation for each system's working.
 *
 *   Earthworm (120 real metameres) · Paramecium · Frog · Plasmodium ·
 *   Nine phyla.
 */

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Bug, Heart, Network, Sparkles } from "lucide-react";
import { RealEarthwormScene } from "./biology-faunal-real-worm";
import {
  RealParameciumScene,
  RealFrogScene,
  RealPlasmodiumScene,
  RealPhylaScene,
} from "./biology-faunal-real-others";

type RealTabId = "worm" | "paramecium" | "frog" | "plasmodium" | "phyla";

const REAL_TABS: { id: RealTabId; label: string; icon: any; color: string; note: string }[] = [
  { id: "worm", label: "Earthworm — 120 segments", icon: Activity, color: "#d97706", note: "Skin · transparent · cutaway · digestive · excretory · nervous · circulatory · reproductive" },
  { id: "paramecium", label: "Paramecium — real ultrastructure", icon: Bug, color: "#f97316", note: "Ciliary detail · organelles · feeding · osmoregulation · conjugation" },
  { id: "frog", label: "Frog — systems", icon: Heart, color: "#22c55e", note: "Real skin · viscera · digestive · three-chambered heart · urogenital" },
  { id: "plasmodium", label: "Plasmodium — in real blood", icon: Bug, color: "#ef4444", note: "RBC surface · ring trophozoite · rosette schizont · vector flow" },
  { id: "phyla", label: "Nine phyla — real body plans", icon: Network, color: "#38bdf8", note: "Textured / glassy / chitinous · transparent · cutaway" },
];

export function BiologyFaunalReal3D() {
  const [tab, setTab] = useState<RealTabId>("worm");
  const active = REAL_TABS.find((t) => t.id === tab) ?? REAL_TABS[0];

  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3 md:p-4">
        <h2 className="flex flex-wrap items-center gap-2 text-sm font-bold md:text-base">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-3 w-3" /> Real anatomy studio
          </span>
          Photoreal faunal models — every system, switchable
        </h2>
        <p className="mt-1 text-xs text-muted-foreground md:text-sm">
          A second, photoreal explorer that sits below the classic suite above — nothing was removed.
          Real procedural skin, transparency and cutaway views, one view per organ system, live process
          animation (peristalsis, cyclosis, heartbeat, blood flow), and a knowledge table listing every
          exam-asked part with its function. Leader lines carry no arrowheads, as everywhere else.
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as RealTabId)}>
        <TabsList className="flex h-auto flex-wrap gap-1.5">
          {REAL_TABS.map((t) => (
            <TabsTrigger key={t.id} value={t.id} className="gap-1.5 text-xs">
              <span style={{ color: t.color, display: "inline-flex" }}>
                <t.icon className="h-3.5 w-3.5" />
              </span>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <p className="mt-2 text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground">Views available:</span> {active.note}
        </p>

        <TabsContent value="worm">
          <RealEarthwormScene />
        </TabsContent>
        <TabsContent value="paramecium">
          <RealParameciumScene />
        </TabsContent>
        <TabsContent value="frog">
          <RealFrogScene />
        </TabsContent>
        <TabsContent value="plasmodium">
          <RealPlasmodiumScene />
        </TabsContent>
        <TabsContent value="phyla">
          <RealPhylaScene />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default BiologyFaunalReal3D;
