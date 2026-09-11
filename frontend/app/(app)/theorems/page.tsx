import Link from "next/link";
import { getTheoremIndex } from "@/lib/theorems";
import { BookOpen, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/content/empty-state";

export const metadata = {
  title: "Theorems & Proofs",
  description: "Browse theorem statements and their proofs across all subjects and classes.",
};

export default async function TheoremsPage() {
  const entries = await getTheoremIndex();

  // Group by class → subject
  const grouped = new Map<string, Map<string, { count: number; latest: string }>>();
  for (const e of entries) {
    const subjectMap = grouped.get(e.classSlug) ?? new Map();
    const info = subjectMap.get(e.subjectSlug) ?? { count: 0, latest: "" };
    info.count++;
    info.latest = e.topicSlug;
    subjectMap.set(e.subjectSlug, info);
    grouped.set(e.classSlug, subjectMap);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Theorems &amp; Proofs</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {entries.length} theorem entries across {grouped.size} class track{grouped.size !== 1 ? "s" : ""}.
          Click a subject to explore theorem statements, derivations, and worked proofs.
        </p>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="Theorems coming soon"
          description="Theorem and proof content will appear here as we build out the subject libraries."
        />
      ) : (
        <div className="space-y-8">
          {[...grouped.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([classSlug, subjectMap]) => (
            <section key={classSlug} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h2 className="text-lg font-semibold tracking-tight">{classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[...subjectMap.entries()]
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([subjectSlug, { count }]) => (
                    <Link
                      key={subjectSlug}
                      href={`/theorems/${classSlug}/${subjectSlug}`}
                      className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold capitalize group-hover:text-primary transition-colors">
                              {subjectSlug === "mathematics" ? "Mathematics"
                               : subjectSlug === "physics" ? "Physics"
                               : subjectSlug === "chemistry" ? "Chemistry"
                               : subjectSlug === "biology" ? "Biology"
                               : subjectSlug}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {count} theorem{count !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
