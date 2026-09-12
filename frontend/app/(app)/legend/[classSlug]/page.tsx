import Link from "next/link";
import { getLegendIndex } from "@/lib/legend";
import { ChevronRight, Lightbulb, BookOpen, FileText } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export async function generateStaticParams() {
  return [{ classSlug: "class-11-notes" }, { classSlug: "class-12-notes" }];
}

export default async function LegendClassPage({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  const { classSlug } = await params;
  const all = await getLegendIndex();
  const subjects = all.filter((s) => s.classSlug === classSlug);
  const totalTopics = subjects.reduce((s, sub) => s + sub.totalTopics, 0);
  const totalFacts = subjects.reduce((s, sub) => s + sub.totalFacts, 0);

  const classLabel = classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/legend" className="hover:text-foreground">Legend &amp; Key Facts</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">{classLabel}</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{classLabel} — Legend</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalTopics} topics · {totalFacts} facts · {subjects.length} subjects
        </p>
      </div>

      {subjects.length === 0 ? (
        <EmptyState
          title="No legend content yet"
          description="Concept notes for this class will be scanned and displayed here as they are added."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects
            .sort((a, b) => {
              const order = ["mathematics", "physics", "chemistry", "biology", "english", "nepali"];
              return order.indexOf(a.subjectSlug) - order.indexOf(b.subjectSlug);
            })
            .map((subj) => (
              <Link
                key={subj.subjectSlug}
                href={`/legend/${classSlug}/${subj.subjectSlug}`}
                className={`group block rounded-xl border ${subj.border} bg-gradient-to-br ${subj.gradient} p-5 transition-all hover:scale-[1.015] hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{subj.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                      {subj.subjectName}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {subj.totalTopics} topics
                      </span>
                      <span className="flex items-center gap-1">
                        <Lightbulb className="h-3 w-3" />
                        {subj.totalFacts} facts
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {subj.units.length} units
                      </span>
                    </div>
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
