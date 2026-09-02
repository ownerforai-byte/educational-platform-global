import Link from "next/link";
import { getLegendIndex, filterLegends, groupLegendsBySubject } from "@/lib/legend";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { ChevronRight, Lightbulb } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export async function generateStaticParams() {
  return [
    { classSlug: "class-11-notes" },
    { classSlug: "class-12-notes" },
  ];
}

export default async function LegendClassPage({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  const { classSlug } = await params;
  const allEntries = await getLegendIndex();
  const entries = filterLegends(allEntries, { classSlug });
  const grouped = groupLegendsBySubject(entries);

  const subjectList = [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/legend" className="hover:text-foreground">Legend & Key Facts</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground capitalize">{classSlug}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold tracking-tight capitalize">
          {classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} — Legend
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {entries.length} topic entries with {entries.reduce((s, e) => s + e.facts.length, 0)} key facts across {grouped.size} subject{grouped.size !== 1 ? "s" : ""}.
        </p>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="No legend content yet"
          description="Key facts and confusion notes for this class will be added as concept content is built out."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {subjectList.map(([subjectSlug, subjectEntries]) => {
            const subjectData = getSubjectSyllabus(classSlug, subjectSlug);
            const colorMap: Record<string, string> = {
              mathematics: "from-violet-500/20 to-purple-500/20 border-violet-500/30",
              physics: "from-sky-500/20 to-blue-500/20 border-sky-500/30",
              chemistry: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
              biology: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
              english: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
              nepali: "from-red-500/20 to-rose-500/20 border-red-500/30",
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
            const totalFacts = subjectEntries.reduce((s, e) => s + e.facts.length, 0);
            return (
              <Link
                key={subjectSlug}
                href={`/legend/${classSlug}/${subjectSlug}`}
                className={`group block rounded-xl border ${colorMap[subjectSlug] ?? "border-border"} bg-card p-5 transition-colors hover:scale-[1.01]`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl leading-none">{iconMap[subjectSlug] ?? "📚"}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold capitalize group-hover:text-primary transition-colors">
                      {label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {subjectEntries.length} topic{subjectEntries.length !== 1 ? "s" : ""} · {totalFacts} fact{totalFacts !== 1 ? "s" : ""} · {subjectData?.units.length ?? 0} units
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
