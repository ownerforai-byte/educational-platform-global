"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Cuboid } from "lucide-react";
import { Class11Chemistry3DPlus } from "@/components/lab/class11/class11-chemistry-3d-plus";

export default function Class11Chemistry3DPlusPage() {
  return (
    <div className="py-4 md:py-6">
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/lab/class11" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Class11 Lab</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#f43f5e18" }}>
                <Cuboid className="h-4 w-4" style={{ color: "#f43f5e" }} />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none">Class 11 Chemistry 3D Plus</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">Class 11 Chemistry · Extended 3D chemistry.</p>
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
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, #f43f5e08, transparent)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#f43f5e18" }}>
              <Cuboid className="h-4 w-4" style={{ color: "#f43f5e" }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base">Class 11 Chemistry 3D Plus</h2>
              <p className="text-xs text-muted-foreground truncate">Extended 3D chemistry.</p>
            </div>
            <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-800`}>New</span>
          </div>
          <div className="p-5">
            <Class11Chemistry3DPlus />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>
          <div className="flex flex-wrap gap-2">
            {[{ id: 'class11-physics', title: 'Class 11 Physics 3D Plus' }, { id: 'class11-math', title: 'Class 11 Math 3D Plus' }, { id: 'class11-biology', title: 'Class 11 Biology 3D Plus' }].map((l) => (
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
