import Link from "next/link";
import { ALL_GRAPHS, GRAPH_SUBJECTS, graphsByCategory } from "@/lib/graphs";
import { GraphSketch } from "@/components/graphs/graph-sketch";
import { LineChart } from "lucide-react";

export const metadata = {
  title: "Graph Bank — Every Graph in the NEB Syllabus, Classified",
  description:
    "Complete classification of physics, chemistry, biology and mathematics graphs: basis, meaning, how to read, special cases and visual output.",
};

export const dynamic = "force-dynamic";

const SUBJECT_ACCENT: Record<string, string> = {
  physics: "text-sky-600 dark:text-sky-400",
  chemistry: "text-amber-600 dark:text-amber-400",
  biology: "text-emerald-600 dark:text-emerald-400",
  mathematics: "text-violet-600 dark:text-violet-400",
};

export default function GraphsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <LineChart className="h-3.5 w-3.5" />
          <span>Complete Classification · Physics · Chemistry · Biology · Mathematics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">Graph Bank</h1>
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Every graph in the NEB syllabus — {ALL_GRAPHS.length} types, classified by subject and
          topic in curriculum order. Each one carries its basis, meaning, how to read the slope and
          area, special cases, and its visual output.
        </p>
      </div>

      {/* Classification overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {GRAPH_SUBJECTS.map((s) => {
          const n = ALL_GRAPHS.filter((g) => g.subject === s.slug).length;
          const cats = graphsByCategory(s.slug);
          return (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-2xl border border-border/70 bg-card p-4 hover:border-primary/40 transition-colors"
            >
              <p className="text-sm font-bold text-foreground">{s.label}</p>
              <p className="text-2xl font-black text-primary">{n}</p>
              <p className="text-[11px] text-muted-foreground">{cats.size} categories</p>
            </a>
          );
        })}
      </div>

      {/* Subject sections */}
      {GRAPH_SUBJECTS.map((s) => {
        const cats = graphsByCategory(s.slug);
        const accent = SUBJECT_ACCENT[s.slug] ?? "text-primary";
        return (
          <section key={s.slug} id={s.slug} className="space-y-5 scroll-mt-20">
            <div className="flex items-center gap-3">
              <h2 className={`text-xl font-extrabold ${accent}`}>
                {s.label}
              </h2>
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {ALL_GRAPHS.filter((g) => g.subject === s.slug).length} graphs
              </span>
            </div>

            {[...cats.entries()].map(([category, entries]) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground">{category}</h3>
                  <span className="text-[10px] text-muted-foreground">
                    ({entries.length})
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {entries.map((g) => (
                    <Link
                      key={g.id}
                      href={`/graphs/${g.slug}`}
                      className="group rounded-2xl border border-border/70 bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all"
                    >
                      <div className="bg-muted/30 px-2 pt-2">
                        <GraphSketch
                          series={g.series}
                          marks={g.marks}
                          axes={g.axes}
                          height={170}
                          showLegend={false}
                          angleAxis={g.angleAxis}
                        />
                      </div>
                      <div className="p-4 space-y-1.5">
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {g.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {g.basis}
                        </p>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {g.classLevel === "both" ? "Class 11 & 12" : g.classLevel.replace("-", " ")}
                          </span>
                          <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold">
                            {g.specialCases.length} special cases
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
