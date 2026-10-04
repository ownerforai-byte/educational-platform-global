import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  FileText,
} from "lucide-react";
import { getAllSubjects, getSyllabusHistory } from "@/lib/syllabus-history";

export const metadata = {
  title: "Syllabus Additions by Year — NEB (+2)",
  description:
    "Year-by-year NEB Class 11/12 syllabus additions — what was added, removed, or modified every BS year across subjects.",
};

export default function SyllabusAdditionsPage() {
  const subjects = getAllSubjects();
  const yearMap = new Map<
    number,
    { subject: string; added: number; removed: number; modified: number }[]
  >();

  for (const subject of subjects) {
    for (const y of getSyllabusHistory(subject) ?? []) {
      const list = yearMap.get(y.year) ?? [];
      list.push({
        subject,
        added: y.changes.added.length,
        removed: y.changes.removed.length,
        modified: y.changes.modified.length,
      });
      yearMap.set(y.year, list);
    }
  }

  const years = [...yearMap.keys()].sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Calendar className="h-4 w-4" />
          <span>Year-wise curriculum tracking</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Syllabus by Year
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          NEB syllabus does not land all at once — it grows year by year. See
          every addition, removal, and revision, subject by subject, for each
          BS year.
        </p>
      </header>

      {years.map((year) => {
        const rows = yearMap.get(year) ?? [];
        const totalAdded = rows.reduce((s, r) => s + r.added, 0);
        const totalRemoved = rows.reduce((s, r) => s + r.removed, 0);
        const totalModified = rows.reduce((s, r) => s + r.modified, 0);
        return (
          <section
            key={year}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-5 py-3">
              <h2 className="text-lg font-bold text-foreground">{year} BS</h2>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" /> {totalAdded} added
                </span>
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Minus className="h-3.5 w-3.5" /> {totalModified} modified
                </span>
                <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                  <TrendingDown className="h-3.5 w-3.5" /> {totalRemoved} removed
                </span>
              </div>
            </div>
            <div className="divide-y divide-border/40">
              {rows.map((r) => (
                <Link
                  key={r.subject}
                  href={`/syllabus/${r.subject}/year/${year}`}
                  className="flex items-center justify-between px-5 py-3 text-sm transition-colors hover:bg-muted/30"
                >
                  <span className="font-medium capitalize text-foreground">
                    {r.subject}
                  </span>
                  <span className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    {r.added > 0 && (
                      <span className="text-emerald-600 dark:text-emerald-400">+{r.added}</span>
                    )}
                    {r.modified > 0 && (
                      <span className="text-amber-600 dark:text-amber-400">~{r.modified}</span>
                    )}
                    {r.removed > 0 && (
                      <span className="text-red-600 dark:text-red-400">−{r.removed}</span>
                    )}
                    <FileText className="h-3.5 w-3.5 text-primary" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-xs text-muted-foreground">
        Tip: open any subject&apos;s page (
        <Link href="/syllabus" className="text-primary hover:underline">
          /syllabus
        </Link>
        ) to jump straight into its year-wise topic sheet.
      </p>
    </div>
  );
}
