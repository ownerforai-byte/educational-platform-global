"use client";

import Link from "next/link";
import { ArrowLeft, Cuboid } from "lucide-react";
import { WaveOpticsSuite3D } from "@/components/lab/physics-3d-wave-optics";

export default function SoundWavesCalculatorPage() {
  return (
    <div className="py-4 md:py-6">
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/lab/physics" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Physics Lab</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#3b82f618" }}>
                <Cuboid className="h-4 w-4" style={{ color: "#3b82f6" }} />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none">Sound Waves Calculator</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">Unit: Waves · Sound wave properties, frequency.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/lab/3d" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">
              <Cuboid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All 3D</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, #3b82f608, transparent)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#3b82f618" }}>
              <Cuboid className="h-4 w-4" style={{ color: "#3b82f6" }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base">Sound Waves Calculator</h2>
              <p className="text-xs text-muted-foreground truncate">Sound wave properties, frequency, wavelength.</p>
            </div>
            <span className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">New</span>
          </div>
          <div className="p-5">
            <WaveOpticsSuite3D />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>
          <div className="flex flex-wrap gap-2">
            {["ph-3d-wave", "ph-th-optics", "ph-th-emw", "ph-3d-refraction", "ph-calc-optics", "ph-3d-optics"].map((id) => (
              <Link key={id} href={`/lab/${id}`} className="stat-pill">
                <span className="text-muted-foreground">{id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
