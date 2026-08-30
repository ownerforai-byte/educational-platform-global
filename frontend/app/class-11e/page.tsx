import { SYLLABUS } from "@/lib/syllabus";
import Link from "next/link";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿", Chemistry: "🧪", English: "📖",
  Mathematics: "🔢", Nepali: "🇳🇵", Physics: "⚡",
};

const CLASS_SLUG = "class-11e";
const CLASS_NAME = "Class 11E";

export default async function Page() {
  const cls = SYLLABUS.find(c => c.slug === CLASS_SLUG);
  if (!cls) return <div>Class not found</div>;

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{CLASS_NAME}</h1>
        <p className="text-muted-foreground">Choose a subject to explore the syllabus</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cls.subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/${CLASS_SLUG}/${subject.slug}`}
            className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                {SUBJECT_EMOJI[subject.name] ?? "📘"}
              </div>
              <h2 className="font-semibold text-foreground text-base">{subject.name}</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{subject.description}</p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Explore syllabus <span>→</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Syllabus Overview</h2>
        {cls.subjects.map((subject) => (
          <div key={subject.slug} className="rounded-xl border border-border/60 bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{SUBJECT_EMOJI[subject.name] ?? "📘"}</span>
              <h3 className="font-semibold">{subject.name}</h3>
              <span className="text-xs text-muted-foreground">{subject.units.length} units</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {subject.units.map((unit) => (
                <span
                  key={unit.id}
                  className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {unit.title}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
