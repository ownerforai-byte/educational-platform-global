import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  Layers,
  Globe,
  Landmark,
  ArrowRight,
  Sparkles,
  Beaker,
  Zap,
  Dna,
} from "lucide-react";

const quickActions = [
  { href: "/class-11", title: "Class 11", subtitle: "Notes, 11E & More tracks", icon: GraduationCap, gradient: "from-blue-500 to-cyan-400" },
  { href: "/class-12", title: "Class 12", subtitle: "Notes, 12E & More tracks", icon: GraduationCap, gradient: "from-violet-500 to-purple-400" },
  { href: "/subjects", title: "Subjects", subtitle: "Biology, Chemistry, Math & more", icon: Layers, gradient: "from-emerald-500 to-teal-400" },
  { href: "/lab", title: "Interactive Lab", subtitle: "Physics · Chemistry · Math", icon: FlaskConical, gradient: "from-amber-500 to-orange-400" },
];

const exploreLinks = [
  { href: "/loksewa", title: "Loksewa", subtitle: "Geography, history & environment", icon: Landmark, gradient: "from-rose-500 to-pink-400" },
  { href: "/world-knowledge", title: "World Knowledge", subtitle: "GK, current affairs & global topics", icon: Globe, gradient: "from-sky-500 to-blue-400" },
  { href: "/r-notes", title: "R Notes", subtitle: "Curated study materials", icon: BookOpen, gradient: "from-indigo-500 to-violet-400" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 py-8 md:py-12 px-4">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl sm:h-72 sm:w-72" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-accent-cyan/10 blur-3xl sm:h-56 sm:w-56" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4 sm:mb-6">
            <Sparkles className="h-3 w-3" />
            NEB Study Vault
          </div>

          <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Learn smarter.
            <br />
            <span className="text-gradient">Score higher.</span>
          </h1>

          <p className="mb-6 max-w-xl text-sm text-muted-foreground leading-relaxed sm:text-base">
            Syllabus-first learning for NEB (+2) students in Nepal.
            Structured notes, mind maps, interactive labs, and PYQs — all aligned to the official curriculum.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/class-11"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
            >
              <GraduationCap className="h-4 w-4" />
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <FlaskConical className="h-4 w-4" />
              Explore the Lab
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Quick Start ─── */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-0.5 w-4 rounded-full bg-primary" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Quick Start
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${item.gradient}`}
                />
                <div className="relative z-10">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mb-0.5 font-bold text-foreground text-sm truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Knowledge ─── */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-0.5 w-4 rounded-full bg-primary" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Knowledge Hub
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/knowledge/numerical-chemistry", title: "Numerical Chemistry", subtitle: "Mole concept, Stoichiometry, pH, Gas laws", icon: Beaker, gradient: "from-violet-500 to-purple-400" },
            { href: "/knowledge/numerical-physics", title: "Numerical Physics", subtitle: "Kinematics, Optics, Electrostatics, Modern physics", icon: Zap, gradient: "from-blue-500 to-cyan-400" },
            { href: "/knowledge/biology-diagrams", title: "Biology Diagrams", subtitle: "Labeled diagrams for NEB XI & XII", icon: Dna, gradient: "from-emerald-500 to-teal-400" },
            { href: "/knowledge/grammar", title: "English Grammar", subtitle: "Tenses, Voice, Narration, Clauses, Conditionals", icon: BookOpen, gradient: "from-blue-500 to-cyan-400" },
            { href: "/knowledge/byakaran", title: "नेपाली व्याकरण", subtitle: "Shabd, Vakyans, Ling, Vachan, Kaal, Karak", icon: BookOpen, gradient: "from-amber-500 to-orange-400" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${item.gradient}`}
                />
                <div className="relative z-10">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mb-0.5 font-bold text-foreground text-sm truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Explore ─── */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-0.5 w-4 rounded-full bg-primary" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Explore
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {exploreLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} shadow-sm`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
