import Link from "next/link";
import { getLegendIndex, filterLegends } from "@/lib/legend";
import { BookOpen, FileText, HelpCircle, Lightbulb } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export const metadata = {
  title: "Legend & Key Facts",
  description: "Browse key facts, confusions, and practice reminders across all subjects and classes.",
};

export default async function LegendPage() {
  const entries = await getLegendIndex();

  // Group by class → subject
  const grouped = new Map<
    string,
    Map<string, { count: number; totalFacts: number; topics: string[] }>
  >();
  for (const e of entries) {
    const subjectMap = grouped.get(e.classSlug) ?? new Map();
    const info = subjectMap.get(e.subjectSlug) ?? { count: 0, totalFacts: 0, topics: [] };
    info.count++;
    info.totalFacts += e.facts.length;
    info.topics.push(e.topicSlug);
    subjectMap.set(e.subjectSlug, info);
    grouped.set(e.classSlug, subjectMap);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Legend &amp; Key Facts</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {entries.length} topic entries with {entries.reduce((s, e) => s + e.facts.length, 0)} key facts
          across {grouped.size} class track{grouped.size !== 1 ? "s" : ""}.
          Each card shows core facts, common confusions, and practice tips from the concept library.
        </p>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="Legend entries coming soon"
          description="Key facts and confusion reminders will appear here as concept content is added across subjects."
        />
      ) : (
        <div className="space-y-8">
          {[...grouped.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([classSlug, subjectMap]) => (
            <section key={classSlug} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h2 className="text-lg font-semibold tracking-tight">
                  {classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[...subjectMap.entries()]
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([subjectSlug, { count, totalFacts }]) => {
                    const colorMap: Record<string, string> = {
                      mathematics: "from-violet-500 to-purple-500",
                      physics: "from-sky-500 to-blue-500",
                      chemistry: "from-amber-500 to-orange-500",
                      biology: "from-emerald-500 to-teal-500",
                      english: "from-blue-500 to-cyan-500",
                      nepali: "from-red-500 to-rose-500",
                    };
                    const iconMap: Record<string, string> = {
                      mathematics: "🔢",
                      physics: "⚡",
                      chemistry: "🧪",
                      biology: "🌿",
                      english: "📖",
                      nepali: "🇳🇵",
                    };
                    const label = subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1);
                    return (
                      <Link
                        key={subjectSlug}
                        href={`/legend/${classSlug}/${subjectSlug}`}
                        className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${colorMap[subjectSlug] ?? "from-gray-500 to-gray-400"} text-white shadow-sm`}>
                              <span className="text-lg leading-none">{iconMap[subjectSlug] ?? "📚"}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold capitalize group-hover:text-primary transition-colors">
                                {label}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {count} topic{count !== 1 ? "s" : ""} · {totalFacts} fact{totalFacts !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <Lightbulb className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
