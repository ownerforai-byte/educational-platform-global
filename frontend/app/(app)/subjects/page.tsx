import { SYLLABUS } from "@/lib/syllabus";
import Link from "next/link";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿",
  Chemistry: "🧪",
  English: "📖",
  Mathematics: "🔢",
  Nepali: "🇳🇵",
  Physics: "⚡",
};

export default function SubjectsPage() {
  const trackGroups = SYLLABUS.map((cls) => ({
    name: cls.name,
    slug: cls.slug,
    subjects: cls.subjects,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">📚 Subjects</h1>
        <p className="text-muted-foreground">
          All six NEB subjects. Select a class track and subject to explore.
        </p>
      </div>

      {trackGroups.map((track) => (
        <div key={track.slug} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">
            {track.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {track.subjects.map((subject) => (
              <div
                key={subject.slug}
                className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg card-shimmer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                    {SUBJECT_EMOJI[subject.name] ?? "📘"}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-foreground text-base truncate">
                      {subject.name}
                    </h2>
                    {subject.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                        {subject.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Link
                    href={`/${track.slug}/${subject.slug}`}
                    className="block rounded-lg border border-border/60 px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>View units & topics</span>
                      <span className="text-[10px] text-muted-foreground/60">{subject.units.length} units</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
