import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, BookOpen, TrendingUp, ArrowLeft } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

export const metadata: Metadata = {
  title: "School Dashboard",
  description: "Class-wide analytics and management for schools on the platform.",
};

function titleize(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function SchoolDashboardPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const schoolName = titleize(code);

  const classes = SYLLABUS.map((cls) => ({
    name: cls.name,
    slug: cls.slug,
    subjectCount: cls.subjects.length,
    totalUnits: cls.subjects.reduce((sum, s) => sum + s.units.length, 0),
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{schoolName}</h1>
          <p className="mt-1 text-muted-foreground">
            School dashboard — class analytics, student lists and content
            assignments.
          </p>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <Users className="h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-2xl font-bold text-foreground">—</p>
          <p className="text-sm text-muted-foreground">Enrolled students</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-2xl font-bold text-foreground">
            {classes.reduce((s, c) => s + c.subjectCount, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Subjects available</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-2xl font-bold text-foreground">—</p>
          <p className="text-sm text-muted-foreground">Avg. completion</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-muted/40 p-5">
        <p className="text-sm text-muted-foreground">
          This is a preview of the school dashboard. Full analytics (student
          lists, per-student progress, quiz scores, and content assignment
          management) are activated once the school&apos;s institutional plan is
          confirmed. Leave a message to this email; ravikisan1814@gmail.com to finalize enrollment.
        </p>
        <Link
          href="/contact"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Finalize enrollment →
        </Link>
      </div>

      {/* Classes and subjects */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Classes</h2>
        <div className="space-y-3">
          {classes.map((c) => (
            <div
              key={c.slug}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <p className="font-medium text-foreground">{c.name}</p>
              <p className="text-sm text-muted-foreground">
                {c.subjectCount} subjects • {c.totalUnits} units
              </p>
              <Link
                href={`/${c.slug}`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Browse subjects →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/school"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Schools
      </Link>
    </div>
  );
}
