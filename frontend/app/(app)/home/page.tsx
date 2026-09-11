import Link from "next/link";
import { SYLLABUS } from "@/lib/syllabus";
import { StudyChat } from "@/components/chat/study-chat";
import { BiologyPracticalShowcase } from "@/components/home/biology-practical-showcase";
import { PhysicsPracticalShowcase } from "@/components/home/physics-practical-showcase";
import { ChemistryPracticalShowcase } from "@/components/home/chemistry-practical-showcase";
import { getTheoremIndex } from "@/lib/theorems";
import { getDerivationIndex } from "@/lib/derivations";
import {
  BookOpen,
  FlaskConical,
  Brain,
  Target,
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle2,
  Trophy,
  ChevronRight,
  FileText,
} from "lucide-react";

const SUBJECT_CONFIG: Record<string, { icon: string; color: string; gradient: string; labs: string }> = {
  mathematics: { icon: "🔢", color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", labs: "28+" },
  physics:     { icon: "⚡",  color: "text-sky-400",   gradient: "from-sky-500/20 to-blue-500/20",  labs: "32+" },
  chemistry:   { icon: "🧪", color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", labs: "22+" },
  biology:     { icon: "🌿", color: "text-emerald-400", gradient: "from-emerald-500/20 to-teal-500/20", labs: "24+" },
  english:     { icon: "📖", color: "text-blue-400",  gradient: "from-blue-500/20 to-cyan-500/20", labs: "12+" },
  nepali:      { icon: "🇳🇵", color: "text-red-400", gradient: "from-red-500/20 to-rose-500/20", labs: "10+" },
};

const FEATURES = [
  { icon: FlaskConical, title: "3D Interactive Labs", desc: "Every topic comes with a dedicated 3D animation — drag, zoom, and explore.", countId: "labs", color: "text-violet-400" },
  { icon: Brain, title: "AI Tutor (Agnes)", desc: "Ask any question and get instant, syllabus-aligned explanations.", countId: "ai", color: "text-emerald-400" },
  { icon: Target, title: "Practice Tests", desc: "PYQs, quizzes, and numerical problems for every unit and topic.", countId: "tests", color: "text-sky-400" },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Track your completion across all 6 subjects with visual analytics.", countId: "progress", color: "text-amber-400" },
  { icon: Trophy, title: "Theorem Proofs", desc: "Step-by-step proofs for all mathematics theorems — algebra, trig, calculus.", countId: "theorems", color: "text-rose-400" },
  { icon: BookOpen, title: "Complete Notes", desc: "Full NEB-aligned notes, formula sheets, and mind maps for every chapter.", countId: "notes", color: "text-teal-400" },
];

const FEATURE_COUNTS: Record<string, string> = {
  labs: "96+",
  ai: "UNLIMITED",
  tests: "500+",
  progress: "REAL-TIME",
  notes: "ALL",
};

async function getTheoremsSummary() {
  const entries = await getTheoremIndex();
  const byClass = new Map<string, Map<string, number>>();
  for (const e of entries) {
    const subjectMap = byClass.get(e.classSlug) ?? new Map();
    subjectMap.set(e.subjectSlug, (subjectMap.get(e.subjectSlug) ?? 0) + 1);
    byClass.set(e.classSlug, subjectMap);
  }
  return { entries, byClass };
}

async function getDerivationsSummary() {
  const entries = await getDerivationIndex();
  const byClass = new Map<string, Map<string, number>>();
  for (const e of entries) {
    const subjectMap = byClass.get(e.classSlug) ?? new Map();
    subjectMap.set(e.subjectSlug, (subjectMap.get(e.subjectSlug) ?? 0) + 1);
    byClass.set(e.classSlug, subjectMap);
  }
  return { entries, byClass };
}

export default async function HomePage() {
  const class11 = SYLLABUS.find((c) => c.slug === "class-11-notes")!;
  const class12 = SYLLABUS.find((c) => c.slug === "class-12-notes")!;
  // Import KITS here if possible, but HomePage is server component.
  // Just a placeholder for integration.
  const allSubjects = [...class11.subjects, ...class12.subjects].filter(
    (s, i, arr) => arr.findIndex((x) => x.slug === s.slug) === i
  );
  const { entries: theoremEntries, byClass: theoremByClass } = await getTheoremsSummary();
  const { entries: derivationEntries, byClass: derivationByClass } = await getDerivationsSummary();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col gap-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary w-fit mx-auto">
              <CheckCircle2 className="h-3 w-3" />
              NEB (+2) Curriculum Aligned
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Learn Every Subject
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Through Interactive 3D
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Physics, Chemistry, Biology, Mathematics, English, and Nepali — each topic comes
              with a dedicated 3D lab, AI tutor, practice tests, and complete notes.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <Link
                href="/subjects"
                className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Explore Subjects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors"
              >
                <Play className="h-4 w-4" />
                Go to Lab
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border/40 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap justify-center gap-8 text-center">
          {[
            { label: "Subjects", value: "6" },
            { label: "3D Labs", value: "96+" },
            { label: "Theorem Proofs", value: String(theoremEntries.length) + "+" },
            { label: "Derivations", value: String(derivationEntries.length) + "+" },
            { label: "Practice Tests", value: "500+" },
            { label: "Topics Covered", value: "ALL" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Platform Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const count = f.countId === "theorems" ? `${theoremEntries.length}+` : (FEATURE_COUNTS[f.countId] ?? "?");
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <f.icon className={`h-8 w-8 ${f.color} mb-3`} />
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{f.desc}</p>
                <p className="text-xs font-mono text-primary mt-2">{count} available</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Subject cards */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All Six Subjects</h2>
            <p className="text-sm text-muted-foreground mt-1">Click any subject to open its lab and notes</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allSubjects.map((subject) => {
            const cfg = SUBJECT_CONFIG[subject.slug];
            if (!cfg) return null;
            return (
              <Link
                key={subject.slug}
                href={`/lab?subject=${subject.slug}`}
                className={`group rounded-2xl border border-border/60 bg-gradient-to-br ${cfg.gradient} p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cfg.icon}</span>
                    <div>
                      <h3 className="font-semibold text-foreground text-base">{subject.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {subject.units.length} units &middot; {subject.units.reduce((a, u) => a + u.topics.length, 0)} topics
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                  {subject.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    <FlaskConical className="h-3 w-3" />
                    {cfg.labs} 3D Labs
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    Notes & PYQs
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* AI Lab Tutor - Interactive Chat */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">AI Study Assistant</h2>
          <p className="text-sm text-muted-foreground mt-1">Ask anything about your NEB subjects — get instant explanations and resources</p>
        </div>
        <StudyChat compact={false} />
      </section>

      {/* Theorems & Proofs */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Theorems &amp; Proofs</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {theoremEntries.length} theorem entries across {theoremByClass.size} class track{theoremByClass.size !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/theorems"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {theoremEntries.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card p-8 text-center text-sm text-muted-foreground">
            Theorem and proof content is being added — check back soon.
          </div>
        ) : (
          <div className="space-y-6">
            {[...theoremByClass.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([classSlug, subjectMap]) => {
              const classLabel = classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
              const totalForClass = [...subjectMap.values()].reduce((a, b) => a + b, 0);
              return (
                <div key={classSlug} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                  <div className="px-5 py-3 border-b border-border/60 bg-muted/30 flex items-center gap-3">
                    <Trophy className="h-4 w-4 text-amber-400 shrink-0" />
                    <span className="font-semibold text-sm">{classLabel}</span>
                    <span className="text-xs text-muted-foreground">{totalForClass} theorem{totalForClass !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[...subjectMap.entries()]
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([subjectSlug, count]) => (
                        <Link
                          key={subjectSlug}
                          href={`/theorems/${classSlug}/${subjectSlug}`}
                          className="flex items-center gap-3 rounded-xl border border-border/50 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium capitalize truncate">{subjectSlug}</p>
                            <p className="text-xs text-muted-foreground">{count} theorem{count !== 1 ? "s" : ""}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
                        </Link>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Practical Labs */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Practical</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Hands-on experiments and lab simulations across all science subjects
            </p>
          </div>
          <Link
            href="/practical"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-6">
          <BiologyPracticalShowcase />
          <PhysicsPracticalShowcase />
          <ChemistryPracticalShowcase />
        </div>
      </section>

      {/* Derivations */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Derivations</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {derivationEntries.length} derivation{derivationEntries.length !== 1 ? "s" : ""} across {derivationByClass.size} class track{derivationByClass.size !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/derivations"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {derivationEntries.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card p-8 text-center text-sm text-muted-foreground">
            Derivation content is being added — check back soon.
          </div>
        ) : (
          <div className="space-y-6">
            {[...derivationByClass.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([classSlug, subjectMap]) => {
              const classLabel = classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
              const totalForClass = [...subjectMap.values()].reduce((a, b) => a + b, 0);
              return (
                <div key={classSlug} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                  <div className="px-5 py-3 border-b border-border/60 bg-muted/30 flex items-center gap-3">
                    <FileText className="h-4 w-4 text-violet-400 shrink-0" />
                    <span className="font-semibold text-sm">{classLabel}</span>
                    <span className="text-xs text-muted-foreground">{totalForClass} derivation{totalForClass !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[...subjectMap.entries()]
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([subjectSlug, count]) => (
                        <Link
                          key={subjectSlug}
                          href={`/derivations/${classSlug}/${subjectSlug}`}
                          className="flex items-center gap-3 rounded-xl border border-border/50 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                        >
                          <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 shrink-0">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium capitalize truncate">{subjectSlug}</p>
                            <p className="text-xs text-muted-foreground">{count} derivation{count !== 1 ? "s" : ""}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
                        </Link>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
