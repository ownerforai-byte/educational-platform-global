/**
 * Lab Page — Dynamic routing component
 * Renders the appropriate lab component based on the lab ID from the URL.
 *
 * Consolidation behaviour:
 *  - Legacy slugs from the removed duplicate static route trees
 *    (e.g. /lab/cell-division-3d, /lab/lees-disc, /lab/symbols-atomic,
 *    /lab/physics-mechanics-suite-3d) are 301-style redirected to their
 *    canonical registry entry.
 *  - Unknown ids redirect to /lab/3d — the single ordered hub for all 3D
 *    content — instead of showing a dead end.
 */
"use client";

import { useState, useEffect, useMemo, createElement } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Cuboid, Loader2 } from "lucide-react";
import { LAB_REGISTRY, getLabById } from "@/lib/lab-registry";
import type { LabMeta } from "@/lib/types/lab";
import { LabLearningSection } from "@/components/lab/learning-section";
import { AnimationFrame, ArrowLabel } from "@/components/lab/annotation/arrow-label";
import { LAB_ANNOTATIONS } from "@/lib/lab-annotations";

/** Legacy route-tree slugs → canonical registry ids. */
const LEGACY_ALIASES: Record<string, string> = {
  // Biology catalog slugs (previous /lab/biology/* tree)
  "cell-3d": "bio-3d-cell",
  "organelles-3d": "bio-3d-organelles",
  "cell-organelles-3d": "bio-3d-organelles",
  "biomolecules-3d": "bio-3d-biomolecules",
  "biota-3d": "bio-3d-biota-conservation",
  "micro-3d": "bio-3d-micro",
  "cell-division-3d": "bio-3d-cell-division",
  "ecology-3d": "bio-3d-ecology",
  "evolution-3d": "bio-3d-evolution",
  "floral-3d": "bio-3d-floral",
  "faunal-3d": "bio-3d-faunal",
  "conservation-3d": "bio-3d-biota-conservation",
  // Heat determinations (previous /lab/physics/heat-* and /lab/heat-determinations/*)
  "heat-determinations": "ph-3d-heat-determinations",
  "ph-heat-determinations": "ph-3d-heat-determinations",
  "lees-disc": "ph-3d-heat-determinations",
  "searles-bar": "ph-3d-heat-determinations",
  "linear-expansion": "ph-3d-heat-determinations",
  "newton-cooling": "ph-3d-heat-determinations",
  // Unit suites (previous /lab/physics/physics-*-suite-3d)
  "physics-mechanics-suite-3d": "ph-3d-mechanics-i",
  "physics-electricity-suite-3d": "ph-3d-electricity-i",
  "physics-magnetism-emi-suite-3d": "ph-3d-magnetism-emi",
  "physics-modern-suite-3d": "ph-3d-modern-suite",
  "physics-elasticity-gas-suite-3d": "ph-3d-elasticity-gas",
  "physics-wave-optics-suite-3d": "ph-3d-wave-suite",
  "ph-calc-elasticity": "ph-3d-elasticity-gas",
  "ph-calc-sound": "ph-3d-wave-suite",
  // Symbols pages
  "symbols-atomic": "ph-symbols-atomic",
  "symbols-electricity": "ph-symbols-electricity",
  "symbols-mechanics": "ph-symbols-mechanics",
  "symbols-waves": "ph-symbols-waves",
  "symbols-math": "math-symbols",
};

// Wrapper that renders a lab component as a proper React element (using createElement),
// ensuring React creates a separate fiber and isolates its hooks from LabPage.
function LabComponent(props: { component: React.ComponentType | (() => React.ReactNode) }) {
  return createElement(props.component as React.ComponentType);
}

export default function LabPage() {
  const params = useParams();
  const router = useRouter();
  const labId = params?.labId as string;
  const [lab, setLab] = useState<LabMeta | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const alias = LEGACY_ALIASES[labId];
    if (alias) {
      router.replace(`/lab/${alias}`);
      return;
    }
    const found = getLabById(labId);
    if (found) {
      setLab(found);
    } else {
      // Unknown id → the single ordered 3D hub.
      router.replace("/lab/3d");
      setMissing(true);
    }
  }, [labId, router]);

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

  if (!lab) {
    return (
      <div className="flex items-center justify-center min-h-[400px] gap-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm">{missing ? "Redirecting to the 3D hub…" : "Loading lab…"}</span>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-6">
      {/* Sticky Header */}
      <div className="sticky top-12 md:top-14 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/lab/3d" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">All 3D Labs</span>
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

          {/* Lab Component + long-arrow annotations */}
          <div className="p-5">
            <AnimationFrame heightClass="min-h-[340px]">
              {typeof lab.component === "function"
                ? <LabComponent component={lab.component} />
                : lab.component}
              {LAB_ANNOTATIONS[lab.id]?.map((ann, i) => (
                <ArrowLabel key={`${lab.id}-${i}`} {...ann} delay={0.3 + i * 0.25} />
              ))}
            </AnimationFrame>
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
