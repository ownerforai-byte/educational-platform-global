import { getLevelBySlug, getClassesByLevel } from "@/lib/curriculum";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SYLLABUS } from "@/lib/syllabus";
import Link from "next/link";
import { GraduationCap, BookOpen, Compass, ArrowRight, Layers, Sparkles } from "lucide-react";

export default async function LevelPage({
  params,
}: {
  params: Promise<{ levelSlug: string }>;
}) {
  const { levelSlug } = await params;
  const [level, classes] = await Promise.all([
    getLevelBySlug(levelSlug),
    getClassesByLevel(levelSlug),
  ]);

  if (!level) {
    return (
      <div className="mx-auto max-w-5xl py-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Levels", href: "/levels" }]} />
          <BackButton />
        </div>
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold">Level not found</h1>
          <p className="text-sm text-muted-foreground mt-2">
            The requested education level does not exist or has been relocated.
          </p>
          <div className="mt-6">
            <Link
              href="/levels"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              Browse All Levels
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: level.name },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10 px-4">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-3xl font-extrabold tracking-tight">{level.name}</h1>
        <p className="text-muted-foreground text-sm">
          {level.description || "Browse all study content, syllabi, and learning tracks."}
        </p>
      </div>

      {classes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <Link key={cls.id} href={`/levels/${level.slug}/classes/${cls.slug}`}>
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{cls.name}</CardTitle>
                  {cls.description && (
                    <CardDescription className="text-xs leading-relaxed">
                      {cls.description}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        /* Rich Curriculum Fallback Tracks */
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Available Academic Curriculum Tracks
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select an official CDC secondary track or specialized preparation module below:
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Grade 11 Track */}
            <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-card to-card p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">NEB Class 11 (Grade XI)</h3>
                    <p className="text-xs text-muted-foreground">
                      {SYLLABUS[0]?.subjects.length ?? 6} official CDC subjects
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Physics, Chemistry, Mathematics, Biology, English &amp; Nepali. Complete chapter notes, practical guides, and 3D simulations.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {SYLLABUS[0]?.subjects.map((s) => (
                    <span
                      key={s.slug}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-background/80 border border-border/60 text-foreground/80"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                <Link
                  href="/class-11"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Explore Grade 11 Portal</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/class-11-notes"
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Browse Notes
                </Link>
              </div>
            </div>

            {/* Grade 12 Track */}
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-card to-card p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">NEB Class 12 (Grade XII)</h3>
                    <p className="text-xs text-muted-foreground">
                      {SYLLABUS[1]?.subjects.length ?? 6} official CDC subjects
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Advanced board exam curriculum with derivations, numerical problem solvers, CDC syllabi, and step-by-step proofs.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {SYLLABUS[1]?.subjects.map((s) => (
                    <span
                      key={s.slug}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-background/80 border border-border/60 text-foreground/80"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                <Link
                  href="/class-12"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Explore Grade 12 Portal</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/class-12-notes"
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Browse Notes
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Gateway Strip */}
          <div className="grid gap-3 sm:grid-cols-3 pt-2">
            <Link
              href="/subjects"
              className="p-4 rounded-xl border border-border/70 bg-card hover:border-primary/40 transition flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Compass className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">All Subjects Directory</h4>
                <p className="text-[11px] text-muted-foreground truncate">Explore every syllabus subject</p>
              </div>
            </Link>

            <Link
              href="/derivations"
              className="p-4 rounded-xl border border-border/70 bg-card hover:border-primary/40 transition flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">Theorems &amp; Derivations</h4>
                <p className="text-[11px] text-muted-foreground truncate">Verified step-by-step proofs</p>
              </div>
            </Link>

            <Link
              href="/loksewa"
              className="p-4 rounded-xl border border-border/70 bg-card hover:border-primary/40 transition flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">Loksewa Knowledge</h4>
                <p className="text-[11px] text-muted-foreground truncate">Geography, history &amp; environment</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
