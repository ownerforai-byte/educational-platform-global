"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Cuboid } from "lucide-react";
import { TheoryPanel } from "@/components/lab/theory-panel";

export default function TheoryPanelPage() {
  return (
    <div className="py-4 md:py-6">
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/lab/math" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Math Lab</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#8b5cf618" }}>
                <Cuboid className="h-4 w-4" style={{ color: "#8b5cf6" }} />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none">Theorems Theory</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">Unit: All Units · NEB Class 11 & 12 Theorem Proofs.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/lab/theory" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All Theory</span>
            </Link>
            <Link href="/lab/3d" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">
              <Cuboid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All 3D</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, #8b5cf608, transparent)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#8b5cf618" }}>
              <Cuboid className="h-4 w-4" style={{ color: "#8b5cf6" }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base">Theorems Theory — NEB Class 11 & 12 Mathematics</h2>
              <p className="text-xs text-muted-foreground truncate">All theorem proofs from the latest NEB syllabus.</p>
            </div>
            <span className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200 dark:border-amber-800">New</span>
          </div>
          <div className="p-5">
            <TheoryPanel subject="mathematics" topic="theorems" />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>
          <div className="flex flex-wrap gap-2">
            {[{ id: 'math-th-calculus', title: 'Calculus Theory' }, { id: 'math-th-algebra', title: 'Algebra Theory' }, { id: 'math-th-trig', title: 'Trigonometry Theory' }, { id: 'math-th-geo', title: 'Coordinate Geometry Theory' }, { id: 'math-th-stats', title: 'Statistics Theory' }].map((l) => (
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
