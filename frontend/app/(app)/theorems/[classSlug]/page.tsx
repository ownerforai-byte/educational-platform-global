import Link from "next/link";
import { getTheoremIndex, filterTheorems } from "@/lib/theorems";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { ChevronRight, FileText, BookOpen } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [
    { classSlug: "class-11-notes" },
    { classSlug: "class-12-notes" },
  ];
}

export default async function TheoremsClassPage({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  const { classSlug } = await params;
  const allEntries = await getTheoremIndex();
  const entries = allEntries.filter((e) => e.classSlug === classSlug);

  // Group by subject
  const subjectMap = new Map<string, typeof entries>();
  for (const e of entries) {
    const arr = subjectMap.get(e.subjectSlug) ?? [];
    arr.push(e);
    subjectMap.set(e.subjectSlug, arr);
  }

  const subjectList = [...subjectMap.entries()].sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/theorems" className="hover:text-foreground">Theorems</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground capitalize">{classSlug}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold tracking-tight capitalize">
          {classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} — Theorems
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {entries.length} theorem{entries.length !== 1 ? "s" : ""} across {subjectMap.size} subject{subjectMap.size !== 1 ? "s" : ""}.
        </p>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="No theorem content yet"
          description="Theorem and proof notes for this class track will be added as we build out the library."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {subjectList.map(([subjectSlug, subjectEntries]) => {
            const subjectData = getSubjectSyllabus(classSlug, subjectSlug);
            return (
              <Link
                key={subjectSlug}
                href={`/theorems/${classSlug}/${subjectSlug}`}
                className="group block rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold capitalize group-hover:text-primary transition-colors">
                      {subjectSlug}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {subjectEntries.length} theorem{subjectEntries.length !== 1 ? "s" : ""} · {subjectData?.units.length ?? 0} units
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
