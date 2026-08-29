import Link from "next/link";
import { ArrowLeft, Beaker, Zap, Dna, BookOpen } from "lucide-react";

const knowledgeSections = [
  {
    href: "/knowledge/numerical-chemistry",
    title: "Numerical Chemistry",
    subtitle: "Calculations: Mole concept, Stoichiometry, Gas laws, pH, Thermochemistry",
    icon: Beaker,
    color: "#8b5cf6",
  },
  {
    href: "/knowledge/numerical-physics",
    title: "Numerical Physics",
    subtitle: "Calculations: Kinematics, Laws of Motion, Gravitation, Electrostatics, Optics",
    icon: Zap,
    color: "#3b82f6",
  },
  {
    href: "/knowledge/biology-diagrams",
    title: "Biology Diagrams",
    subtitle: "NEB XI & XII: Labeled diagrams of cells, organs, systems, processes",
    icon: Dna,
    color: "#22c55e",
  },
  {
    href: "/knowledge/grammar",
    title: "English Grammar",
    subtitle: "Tenses, Voice, Narration, Clauses, Conditionals, Modals",
    icon: BookOpen,
    color: "#3b82f6",
  },
  {
    href: "/knowledge/byakaran",
    title: "नेपाली व्याकरण",
    subtitle: "शब्द, वाक्य, लिङ्ग, वचन, काल, कारक, सन्धि, समास",
    icon: BookOpen,
    color: "#f59e0b",
  },
];

export default function KnowledgePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6 md:py-10 px-4">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Knowledge Hub</h1>
        <p className="text-muted-foreground mt-1">
          Practice numerical problems, study labeled diagrams, and master Nepali grammar — all in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {knowledgeSections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm"
                style={{ backgroundColor: `${s.color}18` }}
              >
                <Icon className="h-6 w-6" style={{ color: s.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors truncate">
                  {s.title}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.subtitle}</p>
              </div>
              <ArrowLeft className="h-4 w-4 text-muted-foreground rotate-180 group-hover:text-primary transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
