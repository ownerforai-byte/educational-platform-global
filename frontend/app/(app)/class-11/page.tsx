import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  FileText,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Trophy,
  ArrowRight,
  Lightbulb,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

export const metadata = {
  title: "NEB Class 11 (Grade XI) Portal — Syllabus, Notes & Interactive Labs",
  description:
    "Complete academic hub for NEB Class 11: Notes, CDC Syllabus, 3D Labs, Practical Manuals, Theorems & Derivations across Physics, Chemistry, Math, Biology, English and Nepali.",
};

const CLASS_11_SUBJECTS = [
  {
    slug: "physics",
    name: "Physics",
    icon: "⚡",
    description: "Mechanics, Heat & Thermodynamics, Waves & Optics, Electricity and Modern Physics.",
    color: "from-sky-500/10 to-blue-500/5",
    border: "border-sky-500/30 hover:border-sky-500",
    units: 5,
    theoremsHref: "/theorems/class-11-notes/physics",
    derivationsHref: "/derivations/class-11-notes/physics",
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    description: "General & Physical Chemistry, Inorganic Chemistry, and Foundations of Organic Chemistry.",
    color: "from-amber-500/10 to-orange-500/5",
    border: "border-amber-500/30 hover:border-amber-500",
    units: 5,
    theoremsHref: "/theorems/class-11-notes/chemistry",
    derivationsHref: "/derivations/class-11-notes/chemistry",
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    icon: "🔢",
    description: "Algebra, Trigonometry, Analytic Geometry, Vectors, Statistics and Differential Calculus.",
    color: "from-violet-500/10 to-purple-500/5",
    border: "border-violet-500/30 hover:border-violet-500",
    units: 7,
    theoremsHref: "/theorems/class-11-notes/mathematics",
    derivationsHref: "/derivations/class-11-notes/mathematics",
  },
  {
    slug: "biology",
    name: "Biology",
    icon: "🌿",
    description: "Biomolecules & Cell Biology, Plant Diversity, Animal Diversity and Ecology.",
    color: "from-emerald-500/10 to-teal-500/5",
    border: "border-emerald-500/30 hover:border-emerald-500",
    units: 4,
    theoremsHref: null,
    derivationsHref: null,
  },
  {
    slug: "english",
    name: "English",
    icon: "📖",
    description: "Short Stories, Poems, Essays, One-act Plays, Reading Comprehension & Technical Writing.",
    color: "from-blue-500/10 to-indigo-500/5",
    border: "border-blue-500/30 hover:border-blue-500",
    units: 2,
    theoremsHref: null,
    derivationsHref: null,
  },
  {
    slug: "nepali",
    name: "Nepali",
    icon: "🇳🇵",
    description: "कथा, कविता, निबन्ध, नाटक, व्यावहारिक लेखन तथा अनिवार्य नेपाली व्याकरण।",
    color: "from-rose-500/10 to-red-500/5",
    border: "border-rose-500/30 hover:border-rose-500",
    units: 2,
    theoremsHref: null,
    derivationsHref: null,
  },
];

const SPECIAL_MODULES = [
  {
    title: "Class 11 Subject Notes",
    description: "Complete chapter-by-chapter theory notes organized by official CDC curriculum order.",
    href: "/class-11-notes",
    icon: BookOpen,
    badge: "Curriculum Notes",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Mathematical Theorems & Proofs",
    description: "Step-by-step rigorous derivations and proofs for Calculus, Algebra, and Trigonometry.",
    href: "/theorems/class-11-notes",
    icon: Trophy,
    badge: "Exam Proofs",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    title: "Derivations & Physics Formulae",
    description: "Interactive visual schematics and solved step-by-step derivations for Class 11.",
    href: "/derivations/class-11-notes",
    icon: Sparkles,
    badge: "High Yield",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Practical Labs & Viva Guides",
    description: "Physics and Chemistry laboratory experiment manuals, procedures, apparatus & calculations.",
    href: "/practical",
    icon: FlaskConical,
    badge: "Lab Practical",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Key Facts & Legend Library",
    description: "Universal formulas, quick revision takeaways, and common misconception clarifications.",
    href: "/legend/class-11-notes",
    icon: Lightbulb,
    badge: "Revision Deck",
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Adaptive AI Quiz Generator",
    description: "Generate instant self-testing quizzes by topic to master Class 11 board exams.",
    href: "/ai-quiz",
    icon: Brain,
    badge: "Self Test",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
];

export default function Class11Page() {
  const c11Syllabus = SYLLABUS.find((c) => c.slug === "class-11-notes");

  return (
    <div className="mx-auto max-w-6xl space-y-12 py-8 md:py-14 px-4">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-12 shadow-sm">
        <div className="relative z-10 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
            <GraduationCap className="h-4 w-4" />
            <span>NEB Higher Secondary Track (Grade XI)</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Class 11 Academic Portal
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            The unified learning dashboard for NEB Class 11 students. Master all core subjects through syllabus-aligned theory notes, interactive 3D simulations, theorem proofs, and practical lab manuals.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/class-11-notes"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
            >
              <BookOpen className="h-4 w-4" />
              Explore Class 11 Notes
            </Link>
            <Link
              href="/theorems/class-11-notes"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              <Trophy className="h-4 w-4 text-amber-500" />
              Theorems &amp; Proofs
            </Link>
            <Link
              href="/syllabus"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              <FileText className="h-4 w-4 text-sky-500" />
              CDC Syllabus
            </Link>
          </div>
        </div>
      </div>

      {/* Subject Tracks Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Official CDC Subject Tracks</h2>
            <p className="text-sm text-muted-foreground">
              Direct access to notes, mindmaps, and syllabus breakdown for all 6 subjects.
            </p>
          </div>
          <Link
            href="/class-11-notes"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            All Notes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLASS_11_SUBJECTS.map((subject) => {
            const syllabusSubj = c11Syllabus?.subjects.find((s) => s.slug === subject.slug);
            const totalTopics = syllabusSubj?.units.reduce((acc, u) => acc + u.topics.length, 0) ?? 0;

            return (
              <div
                key={subject.slug}
                className={`flex flex-col justify-between rounded-2xl border ${subject.border} bg-gradient-to-br ${subject.color} p-5 shadow-sm transition-all hover:shadow-md`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{subject.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {syllabusSubj?.units.length ?? subject.units} units · {totalTopics} topics
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                    {subject.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/50 flex flex-wrap gap-2">
                  <Link
                    href={`/class-11-notes/${subject.slug}`}
                    className="flex-1 text-center rounded-lg bg-primary/10 hover:bg-primary/20 text-primary py-1.5 px-3 text-xs font-semibold transition"
                  >
                    Notes
                  </Link>
                  <Link
                    href={`/class-11-notes/${subject.slug}/mindmap`}
                    className="flex-1 text-center rounded-lg border border-border bg-card hover:bg-muted text-foreground py-1.5 px-3 text-xs font-semibold transition"
                  >
                    Mindmap
                  </Link>
                  <Link
                    href={`/syllabus/${subject.slug}`}
                    className="text-center rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground py-1.5 px-2.5 text-xs transition"
                  >
                    Syllabus
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Modules & High-Yield Sections */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Class 11 Study Resources &amp; Tools</h2>
          <p className="text-sm text-muted-foreground">
            Specialized toolkits designed to maximize conceptual mastery and exam readiness.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIAL_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link key={mod.href} href={mod.href} className="group block">
                <div className="h-full rounded-2xl border border-border/70 bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${mod.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase tracking-wider">
                        {mod.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground text-base mt-4 group-hover:text-primary transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                    <span>Open Module</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
