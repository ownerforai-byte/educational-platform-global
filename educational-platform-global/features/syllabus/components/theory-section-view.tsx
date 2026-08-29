import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { MathMarkdown } from "@/components/content/math-markdown";
import { PyqYearCard } from "@/components/content/pyq-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubjectNav } from "../queries";
import { getSubjectPyqBank } from "@/lib/pyq-bank";
import { SubjectSectionNav } from "./subject-section-nav";

export async function TheorySectionView({
  classSlug,
  subjectSlug,
}: {
  classSlug: string;
  subjectSlug: string;
}) {
  const { subject, units } = getSubjectNav(classSlug, subjectSlug);
  const basePath = `/${classSlug}/${subjectSlug}`;

  if (!subject) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <EmptyState
          title="Subject not found"
          description="This subject is not in the official syllabus for this class track."
        />
      </div>
    );
  }

  const bank = await getSubjectPyqBank(classSlug, subjectSlug);

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {subject.name} — Theory &amp; PYQs
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Unit-by-unit theory summaries followed by the last{" "}
            {Math.max(1, bank.pyqs.length || 10)} years of board-style previous
            year questions with worked solutions.
          </p>
        </div>
      </div>

      <SubjectSectionNav basePath={basePath} active="theory" />

      {/* Theory blocks */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <h2 className="text-xl font-bold tracking-tight">📘 Theory</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {bank.theory.length === 0 ? (
          <EmptyState
            title="Theory coming soon"
            description="Hand-written theory notes for this subject will appear here once published."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {bank.theory.map((block, idx) => (
              <Card
                key={block.title}
                className="card animate-slide-up border-primary/20"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base leading-snug">
                    {block.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {block.notes.map((note, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-muted/20 px-4 py-3"
                    >
                      <MathMarkdown content={note} className="text-sm" />
                    </div>
                  ))}
                  {block.detail ? (
                    <MathMarkdown content={block.detail} className="text-sm" />
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* PYQ bank */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <h2 className="text-xl font-bold tracking-tight">📝 Previous Year Questions</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <p className="text-sm text-muted-foreground">
          Questions are ordered by year, newest first. Expand a year to read the
          questions, then each question to reveal its step-by-step solution.
        </p>

        {bank.pyqs.length === 0 ? (
          <EmptyState
            title="No PYQs yet"
            description="Year-wise previous year questions for this subject will appear here once published."
          />
        ) : (
          <div className="space-y-4">
            {bank.pyqs.map((pyq) => (
              <PyqYearCard key={pyq.year} year={pyq.year} pyq={pyq} />
            ))}
          </div>
        )}
      </section>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href={`${basePath}/chapters`}
          className="text-muted-foreground hover:text-foreground hover:underline"
        >
          Browse chapters →
        </Link>
        {units.length > 0 ? (
          <Link
            href={`${basePath}/syllabus`}
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            View syllabus →
          </Link>
        ) : null}
      </div>
    </div>
  );
}