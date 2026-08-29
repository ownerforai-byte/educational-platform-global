import Link from "next/link";
import {
  BookOpen,
  FileText,
  Flashlight,
  TrendingUp,
  GraduationCap,
  FlaskConical,
} from "lucide-react";

const RESOURCE_CARDS = [
  {
    href: "/class-11",
    title: "Class 11",
    description: "Notes, 11E & More tracks for NEB Class 11 subjects.",
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-400",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
    borderLight: "border-blue-200 dark:border-blue-800",
  },
  {
    href: "/class-12",
    title: "Class 12",
    description: "Notes, 12E & More tracks for NEB Class 12 subjects.",
    icon: GraduationCap,
    gradient: "from-violet-500 to-purple-400",
    bgLight: "bg-violet-50 dark:bg-violet-950/30",
    borderLight: "border-violet-200 dark:border-violet-800",
  },
  {
    href: "/subjects",
    title: "All Subjects",
    description: "Biology, Chemistry, Math, Physics, English & Nepali across all tracks.",
    icon: BookOpen,
    gradient: "from-emerald-500 to-teal-400",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    borderLight: "border-emerald-200 dark:border-emerald-800",
  },
  {
    href: "/r-notes",
    title: "Imported R Notes",
    description: "Curated study materials imported from Ravikishan's export.",
    icon: FileText,
    gradient: "from-amber-500 to-orange-400",
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
    borderLight: "border-amber-200 dark:border-amber-800",
  },
  {
    href: "/lab",
    title: "Interactive Lab",
    description: "3D simulations, theory panels, and calculators for all subjects.",
    icon: FlaskConical,
    gradient: "from-rose-500 to-pink-400",
    bgLight: "bg-rose-50 dark:bg-rose-950/30",
    borderLight: "border-rose-200 dark:border-rose-800",
  },
  {
    href: "/world-knowledge",
    title: "World Knowledge",
    description: "General knowledge, current affairs, and global topics.",
    icon: Flashlight,
    gradient: "from-sky-500 to-blue-400",
    bgLight: "bg-sky-50 dark:bg-sky-950/30",
    borderLight: "border-sky-200 dark:border-sky-800",
  },
  {
    href: "/loksewa",
    title: "Loksewa Prep",
    description: "Geography, history, and environment for Loksewa exams.",
    icon: BookOpen,
    gradient: "from-indigo-500 to-violet-400",
    bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
    borderLight: "border-indigo-200 dark:border-indigo-800",
  },
  {
    href: "/levels",
    title: "Education Levels",
    description: "Browse content by education level and curriculum group.",
    icon: TrendingUp,
    gradient: "from-teal-500 to-emerald-400",
    bgLight: "bg-teal-50 dark:bg-teal-950/30",
    borderLight: "border-teal-200 dark:border-teal-800",
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 md:p-10 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">📚 Resources</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all study materials, simulations, and reference content in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {RESOURCE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg card-shimmer"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10">
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.bgLight} border ${card.borderLight} transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5 text-foreground/80" />
                </div>
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
