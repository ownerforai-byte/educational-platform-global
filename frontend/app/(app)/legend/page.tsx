import Link from "next/link";
import { getLegendIndex } from "@/lib/legend";
import { Lightbulb, BookOpen, FileText, TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export const metadata = {
  title: "Legend & Key Facts",
  description: "Complete concept library — key facts, formulas, confusions, and practice from all 6 subjects.",
};

export default async function LegendPage() {
  const subjects = await getLegendIndex();
  const totalTopics = subjects.reduce((s, subj) => s + subj.totalTopics, 0);
  const totalFacts = subjects.reduce((s, subj) => s + subj.totalFacts, 0);

  // Group by class
  const byClass = new Map<string, typeof subjects>();
  for (const s of subjects) {
    const arr = byClass.get(s.classSlug) ?? [];
    arr.push(s);
    byClass.set(s.classSlug, arr);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none" />
        <div className="relative flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Legend &amp; Key Facts</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Complete concept library — {totalTopics} topics across {subjects.filter((s) => s.classSlug === "class-11-notes").length} class tracks
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4 text-amber-500" />
              <span>{totalTopics} topic{totalTopics !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 text-violet-500" />
              <span>{totalFacts} key facts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span>{subjects.length} subjects</span>
            </div>
          </div>
        </div>
      </div>

      {subjects.length === 0 ? (
        <EmptyState
          title="Legend content coming soon"
          description="Key facts and confusion clarifications will appear here as concept content is built across all subjects."
        />
      ) : (
        <div className="space-y-10">
          {[...byClass.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([classSlug, classSubjects]) => (
            <section key={classSlug} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h2 className="text-lg font-semibold tracking-tight">
                  {classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-xs text-muted-foreground">{classSubjects.reduce((s, sub) => s + sub.totalTopics, 0)} topics</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {classSubjects
                  .sort((a, b) => {
                    const order = ["mathematics", "physics", "chemistry", "biology", "english", "nepali"];
                    return order.indexOf(a.subjectSlug) - order.indexOf(b.subjectSlug);
                  })
                  .map((subj) => (
                    <Link
                      key={`${subj.classSlug}/${subj.subjectSlug}`}
                      href={`/legend/${subj.classSlug}/${subj.subjectSlug}`}
                      className={`group block rounded-xl border ${subj.border} bg-gradient-to-br ${subj.gradient} p-5 transition-all hover:scale-[1.015] hover:shadow-md`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl leading-none">{subj.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                            {subj.subjectName}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {subj.description}
                          </p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
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
                        <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
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
