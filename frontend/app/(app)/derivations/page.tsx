import Link from "next/link";
import { getDerivationIndex } from "@/lib/derivations";
import { getTheoremProofRoutes, getSyllabusTheoremItems } from "@/lib/theorem-topics";
import { getSubjectSyllabus } from "@/lib/syllabus";
import {
  Atom,
  FlaskConical,
  Dna,
  Sigma,
  ChevronRight,
  Construction,
  Sparkles,
} from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export const metadata = {
  title: "Derivations — NEB Physics, Chemistry & Biology (Syllabus Order)",
  description:
    "Every derivation from the official NEB syllabus for Physics, Chemistry and Biology — routed per curriculum order, with Coming Soon placeholders for topics still being authored.",
};

export const dynamic = "force-dynamic";

const SUBJECT_META: Record<string, { label: string; icon: React.ReactNode; accent: string }> = {
  physics: { label: "Physics", icon: <Atom className="h-5 w-5" />, accent: "sky" },
  chemistry: { label: "Chemistry", icon: <FlaskConical className="h-5 w-5" />, accent: "amber" },
  biology: { label: "Biology", icon: <Dna className="h-5 w-5" />, accent: "emerald" },
  mathematics: { label: "Mathematics", icon: <Sigma className="h-5 w-5" />, accent: "violet" },
};

export default async function DerivationsPage() {
  const routes = getTheoremProofRoutes();
  const classOrder = ["class-11-notes", "class-12-notes"];

  const trackCards = routes.map(({ classSlug, subjectSlug }) => {
    const items = getSyllabusTheoremItems(classSlug, subjectSlug);
    return {
      classSlug,
      subjectSlug,
      total: items.length,
      available: items.filter((i) => i.hasCuratedContent).length,
      units: new Set(items.map((i) => i.unitId)).size,
    };
  });

  // Filesystem-indexed derivations for other subjects (outside the ordered tracks)
  const allEntries = await getDerivationIndex();
  const otherByClass = new Map<string, Map<string, number>>();
  for (const e of allEntries) {
    if ((["physics", "chemistry", "biology", "mathematics"] as string[]).includes(e.subjectSlug)) continue;
    const cls = otherByClass.get(e.classSlug) ?? new Map<string, number>();
    cls.set(e.subjectSlug, (cls.get(e.subjectSlug) ?? 0) + 1);
    otherByClass.set(e.classSlug, cls);
  }

  const classLabel = (slug: string) =>
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Official NEB Syllabus Order · Physics · Chemistry · Biology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Derivations Hub
        </h1>
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Every derivation, law and principle from the official NEB Class 11 &amp; 12
          syllabus for Physics, Chemistry and Biology — routed in curriculum order.
          Topics without authored content yet are marked Coming Soon.
        </p>
      </div>

      {/* PCB subject tracks */}
      {[...new Set(routes.map((r) => r.classSlug))]
        .sort((a, b) => classOrder.indexOf(a) - classOrder.indexOf(b))
        .map((classSlug) => (
          <div key={classSlug} className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Atom className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground text-base">{classLabel(classSlug)}</h2>
                  <p className="text-xs text-muted-foreground">Syllabus-ordered derivation tracks</p>
                </div>
              </div>
              <Link
                href={`/derivations/${classSlug}`}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                View Class Track <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trackCards
                .filter((c) => c.classSlug === classSlug)
                .map((card) => {
                  const meta = SUBJECT_META[card.subjectSlug];
                  return (
                    <Link
                      key={card.subjectSlug}
                      href={`/derivations/${card.classSlug}/${card.subjectSlug}`}
                      className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/10 p-4 transition-all hover:border-primary/40 hover:bg-muted/30"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
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
                          {meta?.label ?? card.subjectSlug}
                        </h3>
                        <p className="mt-2 text-[11px] text-muted-foreground">
                          {card.units} units ·{" "}
                          {card.available > 0
                            ? `${card.available} with full derivations`
                            : "all reserved — coming soon"}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                        <span>Open Track</span>
                        <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}

      {/* Other subjects with indexed derivations */}
      {[...otherByClass.entries()].sort(([a], [b]) => classOrder.indexOf(a) - classOrder.indexOf(b)).map(([classSlug, subjMap]) => (
        <div key={classSlug} className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-foreground text-base">{classLabel(classSlug)} — Other Subjects</h2>
                <p className="text-xs text-muted-foreground">Filesystem-indexed derivation content</p>
              </div>
            </div>
            <Link
              href={`/derivations/${classSlug}`}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View Class Track <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...subjMap.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([subjectSlug, count]) => (
              <Link
                key={subjectSlug}
                href={`/derivations/${classSlug}/${subjectSlug}`}
                className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/10 p-4 transition-all hover:border-violet-500/40 hover:bg-muted/30"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    {count} Derivations
                  </span>
                  <h3 className="font-bold text-foreground text-base mt-3 capitalize group-hover:text-primary transition-colors">
                    {subjectSlug}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Open Track</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {routes.length === 0 && otherByClass.size === 0 && (
        <EmptyState
          title="No derivation tracks yet"
          description="Derivation tracks will appear here once the syllabus registers Physics, Chemistry or Biology."
        />
      )}
    </div>
  );
}
