import Link from "next/link";
import { getTheoremIndex } from "@/lib/theorems";
import {
  getTheoremProofRoutes,
  getSyllabusTheoremItems,
} from "@/lib/theorem-topics";
import {
  Trophy,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  Atom,
} from "lucide-react";
import { TheoremsExplorer, type TheoremTrackCard, type TheoremEntryData } from "@/components/theorems/theorems-explorer";

export const metadata = {
  title: "Theorems & Formal Proofs Vault — NEB Class 11 & 12",
  description:
    "Syllabus-ordered index of theorems, formal mathematical proofs, and scientific laws for Physics, Chemistry, Biology, and Mathematics across NEB Class 11 and 12.",
};

export default async function TheoremsPage() {
  const allEntries = await getTheoremIndex();

  // Build the syllabus-ordered track cards for all subjects (Physics, Chemistry, Biology, Mathematics)
  const routes = getTheoremProofRoutes();
  const trackCards: TheoremTrackCard[] = routes.map(({ classSlug, subjectSlug }) => {
    const items = getSyllabusTheoremItems(classSlug, subjectSlug);
    return {
      classSlug,
      subjectSlug,
      total: items.length,
      available: items.filter((i) => i.hasCuratedContent).length,
    };
  });

  const totalTheorems = trackCards.reduce((sum, c) => sum + c.total, 0);
  const readyTheorems = trackCards.reduce((sum, c) => sum + c.available, 0);

  const mappedEntries: TheoremEntryData[] = allEntries.map((e) => ({
    classSlug: e.classSlug,
    subjectSlug: e.subjectSlug,
    unitId: e.unitId,
    unitTitle: e.unitTitle,
    topicSlug: e.topicSlug,
    topicTitle: e.topicTitle,
    preview: e.preview,
    hasProof: e.hasProof,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 space-y-10">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-sm">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Trophy className="h-3.5 w-3.5" />
                <span>Academic Rigor · Formal Proofs &amp; Laws</span>
              </div>
              <Link
                href="/derivations"
                className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Looking for step-by-step formula steps?</span>
                <span className="text-primary font-bold">Derivations Vault →</span>
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Theorems &amp; Formal Proofs Vault
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Step-by-step rigorous proofs, physical laws, and mathematical principles across Physics, Chemistry, Biology, and Mathematics
              arranged strictly in official NEB syllabus sequence. Complete with formal theorem statements, geometric visual steps, and board exam mark allocation.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-amber-500" />
                <span>Total Topics</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">{totalTheorems}</p>
              <p className="text-[10px] text-muted-foreground">Curriculum Mapped</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                <span>Curated Proofs</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">{readyTheorems}</p>
              <p className="text-[10px] text-muted-foreground">Detailed Scaffolds</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5 text-violet-500" />
                <span>Classes</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">XI &amp; XII</p>
              <p className="text-[10px] text-muted-foreground">NEB +2 Science</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Explorer Client Component */}
      <TheoremsExplorer trackCards={trackCards} allEntries={mappedEntries} />
    </div>
  );
}
