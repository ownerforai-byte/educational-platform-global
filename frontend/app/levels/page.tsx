import { getEducationLevels } from "@/lib/curriculum";
import { UnderDevelopment } from "@/components/content/under-development";
import Link from "next/link";
import { SYLLABUS } from "@/lib/syllabus";
import { BookOpen, Layers } from "lucide-react";

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
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Education Levels Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">🎓 Education Levels</h1>
        <p className="text-muted-foreground">
          Select an education level to browse available classes.
        </p>

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

      {/* Syllabus Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Syllabus</h2>
          <span className="text-sm text-muted-foreground">Complete NEB curriculum for Class 11 & 12</span>
        </div>

        <p className="text-muted-foreground">
          Browse the official NEB syllabus by subject and class track. Each subject includes detailed units, topics, and teaching hours.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* NEB Class 11 Notes */}
          <Link href="/syllabus/biology" className="group">
            <div className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  🧬
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Biology</h3>
                  <p className="text-xs text-muted-foreground mt-1">Class 11 & 12 — Botany & Zoology</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Layers className="h-3 w-3" />
                <span>36 units across 6 tracks</span>
              </div>
            </div>
          </Link>

          {/* Chemistry */}
          <Link href="/syllabus/chemistry" className="group">
            <div className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  ⚗️
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Chemistry</h3>
                  <p className="text-xs text-muted-foreground mt-1">Class 11 & 12 — General, Physical, Organic</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Layers className="h-3 w-3" />
                <span>44 units across 6 tracks</span>
              </div>
            </div>
          </Link>

          {/* English */}
          <Link href="/syllabus/english" className="group">
            <div className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  📖
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">English</h3>
                  <p className="text-xs text-muted-foreground mt-1">Class 11 & 12 — Language & Literature</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Layers className="h-3 w-3" />
                <span>18 units across 6 tracks</span>
              </div>
            </div>
          </Link>

          {/* Mathematics */}
          <Link href="/syllabus/mathematics" className="group">
            <div className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  🔢
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Mathematics</h3>
                  <p className="text-xs text-muted-foreground mt-1">Class 11 & 12 — Calculus, Algebra, Vectors</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Layers className="h-3 w-3" />
                <span>34 units across 6 tracks</span>
              </div>
            </div>
          </Link>

          {/* Nepali */}
          <Link href="/syllabus/nepali" className="group">
            <div className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  🇳🇵
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Nepali</h3>
                  <p className="text-xs text-muted-foreground mt-1">Class 11 & 12 — भाषा, साहित्य, व्यायरन</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Layers className="h-3 w-3" />
                <span>16 units across 6 tracks</span>
              </div>
            </div>
          </Link>

          {/* Physics */}
          <Link href="/syllabus/physics" className="group">
            <div className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  ⚛️
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Physics</h3>
                  <p className="text-xs text-muted-foreground mt-1">Class 11 & 12 — Mechanics, Optics, Modern Physics</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Layers className="h-3 w-3" />
                <span>54 units across 6 tracks</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
