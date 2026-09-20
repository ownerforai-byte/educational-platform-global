import Link from "next/link";
import { getTheoremProofRoutes, getSyllabusTheoremItems } from "@/lib/theorem-topics";
import { ChevronRight, BookOpen, Construction } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [
    { classSlug: "class-11-notes" },
    { classSlug: "class-12-notes" },
  ];
}

const SUBJECT_LABELS: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
};

export default async function TheoremsClassPage({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  const { classSlug } = await params;
  const pcbRoutes = getTheoremProofRoutes().filter((r) => r.classSlug === classSlug);
  const pcbCards = pcbRoutes.map(({ subjectSlug }) => {
    const items = getSyllabusTheoremItems(classSlug, subjectSlug);
    return {
      subjectSlug,
      total: items.length,
      available: items.filter((i) => i.hasCuratedContent).length,
    };
  });

  // Non-PCB subjects with indexed filesystem content
  const { getTheoremIndex } = await import("@/lib/theorems");
  const allEntries = await getTheoremIndex();
  const otherSubjects = new Map<string, number>();
  for (const e of allEntries) {
    if (e.classSlug !== classSlug) continue;
    if ((["physics", "chemistry", "biology", "mathematics"] as string[]).includes(e.subjectSlug)) continue;
    otherSubjects.set(e.subjectSlug, (otherSubjects.get(e.subjectSlug) ?? 0) + 1);
  }

  const classLabel = classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const hasAny = pcbCards.length > 0 || otherSubjects.size > 0;

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/theorems" className="hover:text-foreground">Theorems</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground capitalize">{classLabel}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold tracking-tight capitalize">{classLabel} — Theorems &amp; Proofs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Syllabus-ordered theorem, proof and derivation tracks for Physics, Chemistry and Biology.
        </p>
      </div>

      {!hasAny ? (
        <EmptyState
          title="No theorem content yet"
          description="Theorem and proof notes for this class track will be added as we build out the library."
          action={{ label: "Explore All Theorems & Proofs", href: "/theorems" }}
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {pcbCards.map((card) => (
            <Link
              key={card.subjectSlug}
              href={`/theorems/${classSlug}/${card.subjectSlug}`}
              className="group block rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {SUBJECT_LABELS[card.subjectSlug] ?? card.subjectSlug}
                    </h3>
                    {card.available === 0 && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        <Construction className="h-2.5 w-2.5" /> Soon
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {card.total} syllabus topics · {card.available} with full proofs
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          ))}

          {[...otherSubjects.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([subjectSlug, count]) => (
            <Link
              key={subjectSlug}
              href={`/theorems/${classSlug}/${subjectSlug}`}
              className="group block rounded-xl border border-border bg-card p-5 transition-colors hover:border-violet-500/40 hover:bg-accent/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-500">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold capitalize group-hover:text-primary transition-colors">{subjectSlug}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {count} indexed theorem{count !== 1 ? "s" : ""}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
