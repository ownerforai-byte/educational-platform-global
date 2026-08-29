"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Cuboid } from "lucide-react";
import { PremiumPlaceholder } from "@/components/lab/premium-placeholder";

export default function PremiumPlaceholderPage() {
  return (
    <div className="py-4 md:py-6">
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/lab/chemistry" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Chemistry Lab</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#f59e0b18" }}>
                <Cuboid className="h-4 w-4" style={{ color: "#f59e0b" }} />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none">Molecular Builder 3D</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">Premium · Build molecules.</p>
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
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, #f59e0b08, transparent)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#f59e0b18" }}>
              <Cuboid className="h-4 w-4" style={{ color: "#f59e0b" }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base">Molecular Builder 3D</h2>
              <p className="text-xs text-muted-foreground truncate">Build molecules.</p>
            </div>
            <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200 dark:border-amber-800`}>Premium</span>
          </div>
          <div className="p-5">
            <PremiumPlaceholder title="Molecular Builder 3D" description="Build molecules." />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>
          <div className="flex flex-wrap gap-2">
            {[{ id: 'ch-3d-periodic', title: 'Periodic Table 3D' }, { id: 'ch-3d-advanced', title: 'Chemistry 3D Advanced' }, { id: 'ch-3d-micro', title: 'Microscopy 3D' }, { id: 'ch-th-atomic', title: 'Atomic Structure Theory' }, { id: 'ch-th-bonding', title: 'Chemical Bonding Theory' }, { id: 'ch-th-eq', title: 'Equilibrium Theory' }].map((l) => (
              <Link key={l.id} href={"/lab/" + l.id} className="stat-pill">
                <span className="text-muted-foreground">{l.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
