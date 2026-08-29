import { getEducationLevels } from "@/lib/curriculum";
import { UnderDevelopment } from "@/components/content/under-development";
import Link from "next/link";

const LEVEL_EMOJI: Record<string, string> = {
  "Grade 6-8": "🌱",
  "Grade 9-10": "🌿",
  "Grade 11-12": "🌳",
  "Loksewa": "🏛️",
  "General": "📚",
};

export default async function LevelsPage() {
  const levels = await getEducationLevels();

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">🎓 Education Levels</h1>
        <p className="text-muted-foreground">
          Select an education level to browse available classes.
        </p>
      </div>

      {levels.length === 0 ? (
        <UnderDevelopment />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <Link key={level.id} href={`/levels/${level.slug}`}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg card-shimmer h-full">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                    {LEVEL_EMOJI[level.name] ?? "📂"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">{level.name}</h2>
                    {level.description && (
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{level.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
