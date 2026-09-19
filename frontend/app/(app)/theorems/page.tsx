import Link from "next/link";
import { getTheoremIndex } from "@/lib/theorems";
import {
  getTheoremProofRoutes,
  getSyllabusTheoremItems,
} from "@/lib/theorem-topics";
import {
  Trophy,
  ChevronRight,
  GraduationCap,
  ArrowRight,
  Construction,
} from "lucide-react";

export const metadata = {
  title: "Theorems & Proofs — NEB Class 11 & 12",
  description:
    "Syllabus-ordered index of theorems, proofs and derivations for Physics, Chemistry and Biology across NEB Class 11 and 12.",
};

const SUBJECT_LABELS: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
};

export default async function TheoremsPage() {
  const allEntries = await getTheoremIndex();

  // Build the syllabus-ordered PCB track cards.
  const routes = getTheoremProofRoutes();
  const trackCards = routes.map(({ classSlug, subjectSlug }) => {
    const items = getSyllabusTheoremItems(classSlug, subjectSlug);
    return {
      classSlug,
      subjectSlug,
      total: items.length,
      available: items.filter((i) => i.hasCuratedContent).length,
    };
  });

  // Curated math/other entries remain visible under their class sections.
  const byClass = new Map<string, Map<string, typeof allEntries>>();
  for (const entry of allEntries) {
    if ((["physics", "chemistry", "biology"] as string[]).includes(entry.subjectSlug)) continue;
    const classMap = byClass.get(entry.classSlug) ?? new Map<string, typeof allEntries>();
    const subjArr = classMap.get(entry.subjectSlug) ?? [];
    subjArr.push(entry);
    classMap.set(entry.subjectSlug, subjArr);
    byClass.set(entry.classSlug, classMap);
  }

  const classLabel = (slug: string) =>
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
          <Trophy className="h-4 w-4" />
          <span>Academic Rigor &amp; Proofs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Theorems, Proofs &amp; Derivations
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Every theorem, proof and derivation from the official NEB syllabus for
          Physics, Chemistry and Biology — in curriculum order. Pages without
          content yet are clearly marked Coming Soon.
        </p>
      </div>

      {/* PCB subject tracks (always routed, empty ones marked coming soon) */}
      <div className="space-y-8">
        {[...new Set(routes.map((r) => r.classSlug))].map((classSlug) => {
          const cards = trackCards.filter((c) => c.classSlug === classSlug);
          return (
            <div key={classSlug} className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-amber-500" />
                  <div>
                    <h2 className="font-bold text-foreground text-base">{classLabel(classSlug)}</h2>
                    <p className="text-xs text-muted-foreground">Syllabus-ordered theorem &amp; derivation tracks</p>
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
                {cards.map((card) => (
                  <Link
                    key={card.subjectSlug}
                    href={`/theorems/${card.classSlug}/${card.subjectSlug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/10 p-4 transition-all hover:border-amber-500/40 hover:bg-muted/30"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          {card.total} Topics
                        </span>
                        {card.available === 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Construction className="h-2.5 w-2.5" /> Soon
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-bold text-foreground text-base mt-3 group-hover:text-primary transition-colors">
                        {SUBJECT_LABELS[card.subjectSlug] ?? card.subjectSlug}
                      </h3>
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        {card.available > 0
                          ? `${card.available} with full proofs & visuals`
                          : "All pages reserved — content coming soon"}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>Study Track</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Non-PCB subjects (e.g. Mathematics) — filesystem-indexed */}
      {[...byClass.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([classSlug, subjectMap]) => (
        <div key={classSlug} className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-violet-500" />
              <div>
                <h2 className="font-bold text-foreground text-base">
                  {classLabel(classSlug)} — Other Subjects
                </h2>
                <p className="text-xs text-muted-foreground">
                  {[...subjectMap.keys()].join(", ")} theorems &amp; proofs (indexed)
                </p>
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
                className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/10 p-4 transition-all hover:border-violet-500/40 hover:bg-muted/30"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
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
                      <p className="text-[10px] text-muted-foreground/70">+{entries.length - 3} more topics</p>
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
      ))}
    </div>
  );
}
