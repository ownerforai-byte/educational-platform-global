import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, Check, ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Schools & Institutions",
  description: "Bulk access for schools and colleges. Enquire about institutional plans.",
};

const FEATURES = [
  {
    icon: Users,
    title: "Managed student accounts",
    description: "Bulk-provision accounts for every student in a class or batch — no individual sign-up required.",
  },
  {
    icon: Building2,
    title: "Class dashboards",
    description: "See class-wide progress, quiz scores, and completion rates across all enrolled students.",
  },
  {
    icon: Check,
    title: "Content assignments",
    description: "Assign specific topics, units, or PYQ sets to a class and track completion.",
  },
  {
    icon: Check,
    title: "Tier-based access",
    description: "Choose Plus or Pro tier for your institution — every student gets the same access level.",
  },
];

export default function SchoolPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 py-10 px-4">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Building2 className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Schools &amp; Institutions
        </h1>
        <p className="mt-2 text-muted-foreground">
          Institutional plans for schools and colleges — managed accounts, class
          dashboards and bulk access for NEB Class 11 and 12 students.
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
          Enquire about institutional access
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us your school name, the number of students, and the class levels
          (Class 11, 12, or both). We&apos;ll get back to you with a plan and
          pricing.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <Mail className="h-4 w-4" />
          Contact the owner
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have a school code?
        </p>
        <Link
          href="/school/demo"
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Access your school dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
