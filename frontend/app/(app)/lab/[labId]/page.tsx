/**
 * Lab Page — Dynamic routing component
 * Renders the appropriate lab component based on the lab ID from the URL
 */
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Cuboid, Loader2 } from "lucide-react";
import { LAB_REGISTRY, getLabById } from "@/lib/lab-registry";
import type { LabMeta } from "@/lib/types/lab";
import { LabLearningSection } from "@/components/lab/learning-section";

export default function LabPage() {
  const params = useParams();
  const labId = params?.labId as string;
  const [lab, setLab] = useState<LabMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const found = getLabById(labId);
    if (found) {
      setLab(found);
    } else {
      setError(`Lab "${labId}" not found`);
    }
    setLoading(false);
  }, [labId]);

  const categoryConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {
      physics: { label: "Physics", color: "#3b82f6" },
      chemistry: { label: "Chemistry", color: "#10b981" },
      mathematics: { label: "Mathematics", color: "#8b5cf6" },
      biology: { label: "Biology", color: "#22c55e" },
      class11: { label: "Class 11", color: "#f43f5e" },
    };
    return config[lab?.category ?? "physics"] ?? { label: "Lab", color: "#64748b" };
  }, [lab]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading lab...</span>
      </div>
    );
  }

  if (error || !lab) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/lab" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Labs
        </Link>
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-destructive mb-2">Lab Not Found</h2>
          <p className="text-muted-foreground">{error ?? `Lab "${labId}" does not exist`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-6">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/lab" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Labs</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${categoryConfig.color}18` }}
              >
                <Cuboid className="h-4 w-4" style={{ color: categoryConfig.color }} />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none">{lab.title}</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">{lab.unit ?? lab.description}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/lab/3d"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all"
            >
              <Cuboid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All 3D</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card">
          {/* Lab Header */}
          <div
            className="flex items-center gap-3 px-5 py-3 border-b border-border"
            style={{ background: `linear-gradient(to right, ${categoryConfig.color}08, transparent)` }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${categoryConfig.color}18` }}
            >
              <Cuboid className="h-4 w-4" style={{ color: categoryConfig.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base">{lab.title}</h2>
              <p className="text-xs text-muted-foreground truncate">{lab.description}</p>
            </div>
            <span
              className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                lab.status === "new"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                  : lab.status === "premium"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              }`}
            >
              {lab.status === "new" ? "New" : lab.status === "premium" ? "Premium" : lab.status === "development" ? "Dev" : "Active"}
            </span>
          </div>

          {/* Lab Component */}
          <div className="p-5">
            {typeof lab.component === "function" ? lab.component() : lab.component}
          </div>
        </div>

        {/* Learning structure below the animation — proof / theory / confusions / practice */}
        <LabLearningSection labId={lab.id} />

        {/* Related Labs */}
        <div className="mt-5">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>
          <div className="flex flex-wrap gap-2">
            {LAB_REGISTRY.filter((l) => l.category === lab.category && l.id !== lab.id)
              .slice(0, 6)
              .map((relatedLab) => (
                <Link
                  key={relatedLab.id}
                  href={`/lab/${relatedLab.id}`}
                  className="stat-pill"
                >
                  <span className="text-muted-foreground">{relatedLab.title}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
