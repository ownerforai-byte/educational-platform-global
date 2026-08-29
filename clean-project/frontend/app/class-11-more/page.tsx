import Link from "next/link";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿",
  Chemistry: "🧪",
  English: "📖",
  Mathematics: "🔢",
  Nepali: "🇳🇵",
  Physics: "⚡",
};

export default function Class11MorePage() {
  const subjects = [
    { slug: "biology", name: "Biology", desc: "Biology content for Class 11 More." },
    { slug: "chemistry", name: "Chemistry", desc: "Chemistry content for Class 11 More." },
    { slug: "english", name: "English", desc: "English content for Class 11 More." },
    { slug: "mathematics", name: "Mathematics", desc: "Mathematics content for Class 11 More." },
    { slug: "nepali", name: "Nepali", desc: "Nepali content for Class 11 More." },
    { slug: "physics", name: "Physics", desc: "Physics content for Class 11 More." },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 md:p-10 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">📦 Class 11 More</h1>
        <p className="mt-2 text-muted-foreground">
          Additional resources and supplementary content for Class 11.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <Link key={s.slug} href={`/class-11-more/${s.slug}`}>
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg card-shimmer h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                  {SUBJECT_EMOJI[s.name]}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{s.name}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
