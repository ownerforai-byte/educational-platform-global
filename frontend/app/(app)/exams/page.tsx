import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Stethoscope, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Exam Hub",
  description: "NEB Board, CEE Medical, and IOE Engineering entrance exam preparation in one place.",
};

const EXAMS = [
  {
    href: "/exams/neb",
    icon: GraduationCap,
    title: "NEB Board Exam",
    description: "NEB Class 11 & 12 board exam — subject PYQs, model questions, and exam schedule.",
    badge: "Board",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    href: "/exams/cee",
    icon: Stethoscope,
    title: "CEE Medical Entrance",
    description: "Health Science entrance — MCQ banks, subject weightage, and high-yield topics.",
    badge: "Medical",
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    href: "/exams/ioe",
    icon: Calculator,
    title: "IOE Engineering Entrance",
    description: "Institute of Engineering entrance — numerical practice, patterns and past sets.",
    badge: "Engineering",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
];

export default function ExamsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exam Hub</h1>
        <p className="mt-2 text-muted-foreground">
          Choose your entrance track and start preparing with targeted resources.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-1">
        {EXAMS.map((exam) => (
          <Link
            key={exam.href}
            href={exam.href}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${exam.color}`}>
              <exam.icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground">{exam.title}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  {exam.badge}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{exam.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
