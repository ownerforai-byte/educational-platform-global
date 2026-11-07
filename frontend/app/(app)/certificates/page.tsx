import type { Metadata } from "next";
import Link from "next/link";
import { Award, ArrowRight, Lock } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Your unit completion certificates.",
};

function subjectUnits() {
  return SYLLABUS.flatMap((cls) =>
    cls.subjects.map((s) => ({
      classSlug: cls.slug,
      subjectSlug: s.slug,
      subjectName: s.name,
      className: cls.name,
      unitCount: s.units.length,
      href: `/${cls.slug}/${s.slug}`,
    })),
  );
}

export default function CertificatesPage() {
  const subjects = subjectUnits();

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="mt-1 text-muted-foreground">
            Earn a certificate for each unit you complete. Finish all units in a
            subject to unlock the subject completion certificate.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center">
        <Lock className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium text-foreground">
          No certificates earned yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete units in your subjects to earn your first certificate.
        </p>
        <Link
          href="/progress"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Track your progress
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Available by subject
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {subjects.map((s) => (
            <div
              key={`${s.classSlug}/${s.subjectSlug}`}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <p className="font-medium text-foreground">{s.subjectName}</p>
              <p className="text-sm text-muted-foreground">{s.className}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {s.unitCount} unit{s.unitCount > 1 ? "s" : ""} available
              </p>
              <Link
                href={s.href}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Start studying
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
