import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Users, BookOpen, ClipboardCheck, ArrowRight } from "lucide-react";
import { SYLLABUS } from "@/lib/core/syllabus";

export const metadata: Metadata = {
  title: "Teacher Portal",
  description:
    "Assign topics, track class progress and manage your students.",
};

const FEATURES = [
  {
    icon: ClipboardCheck,
    title: "Assign topics",
    description:
      "Assign specific units, topics, or PYQ sets to your class. Students see assignments in their dashboard.",
  },
  {
    icon: Users,
    title: "Track student progress",
    description:
      "See which students have completed assigned topics, their quiz scores, and where they are struggling.",
  },
  {
    icon: BookOpen,
    title: "Flag weak units",
    description:
      "Identify units where the class average is low and assign targeted revision or extra practice.",
  },
  {
    icon: GraduationCap,
    title: "Class management",
    description:
      "Manage your student roster, add or remove students, and organize them by class or batch.",
  },
];

export default function TeachersPage() {
  const subjects = SYLLABUS.flatMap((cls) =>
    cls.subjects.map((s) => ({
      name: s.name,
      className: cls.name,
      href: `/${cls.slug}/${s.slug}`,
    })),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-10 py-10 px-4">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Teacher Portal</h1>
        <p className="mt-2 text-muted-foreground">
          Assign topics to classes, track student progress, flag weak units and
          manage your classroom.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-3 font-semibold text-foreground">{f.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Join the waitlist for early access
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The teacher portal is being rolled out to select schools. Join the
          waitlist to get early access for your institution.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Join the waitlist
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Subject browse for teachers */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Subjects you can assign
        </h2>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              {s.name} — {s.className}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
