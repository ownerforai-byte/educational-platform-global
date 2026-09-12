import React from "react";
import Link from "next/link";
import { getTheoremIndex } from "@/lib/theorems";
import { Trophy, BookOpen, ChevronRight, GraduationCap, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export const metadata = {
  title: "Theorems & Proofs — NEB Class 11 & 12",
  description: "Comprehensive index of step-by-step mathematical theorems and proofs across NEB Class 11 and 12.",
};

export default async function TheoremsPage() {
  const allEntries = await getTheoremIndex();

  // Group by class -> subject
  const byClass = new Map<string, Map<string, typeof allEntries>>();
  for (const entry of allEntries) {
    const classMap = byClass.get(entry.classSlug) ?? new Map<string, typeof allEntries>();
    const subjArr = classMap.get(entry.subjectSlug) ?? [];
    subjArr.push(entry);
    classMap.set(entry.subjectSlug, subjArr);
    byClass.set(entry.classSlug, classMap);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
          <Trophy className="h-4 w-4" />
          <span>Academic Rigor &amp; Proofs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Mathematical Theorems &amp; Proofs
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          {allEntries.length} verified step-by-step theorem statements and proofs across Calculus, Algebra, Trigonometry, and Coordinate Geometry.
        </p>
      </div>

      {allEntries.length === 0 ? (
        <EmptyState
          title="Theorem content is currently loading"
          description="Theorem proofs are being indexed across the notes repository."
        />
      ) : (
        <div className="space-y-8">
          {[...byClass.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([classSlug, subjectMap]) => {
            const classLabel = classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            const totalForClass = [...subjectMap.values()].reduce((acc, arr) => acc + arr.length, 0);

            return (
              <div key={classSlug} className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-amber-500" />
                    <div>
                      <h2 className="font-bold text-foreground text-base">{classLabel}</h2>
                      <p className="text-xs text-muted-foreground">{totalForClass} theorem proofs documented</p>
                    </div>
                  </div>
                  <Link
                    href={`/theorems/${classSlug}`}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    View Class Track <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...subjectMap.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([subjectSlug, entries]) => (
                    <Link
                      key={subjectSlug}
                      href={`/theorems/${classSlug}/${subjectSlug}`}
                      className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/10 p-4 transition-all hover:border-amber-500/40 hover:bg-muted/30"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            {entries.length} Theorems
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-bold text-foreground text-base mt-3 capitalize group-hover:text-primary transition-colors">
                          {subjectSlug}
                        </h3>
                        <div className="mt-2 space-y-1">
                          {entries.slice(0, 3).map((e) => (
                            <p key={e.topicSlug} className="text-[11px] text-muted-foreground truncate">
                              &bull; {e.topicTitle}
                            </p>
                          ))}
                          {entries.length > 3 && (
                            <p className="text-[10px] text-muted-foreground/70">
                              +{entries.length - 3} more topics
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                        <span>Study Proofs</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
