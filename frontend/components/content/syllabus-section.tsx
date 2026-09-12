import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubjectSyllabus } from "@/lib/syllabus";

type SyllabusSectionProps = {
  classSlug: string;
  subjectSlug: string;
};

export function SyllabusSection({ classSlug, subjectSlug }: SyllabusSectionProps) {
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  if (!subject) return null;

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            S
          </span>
          Syllabus — {subject.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {subject.units.map((unit, unitIndex) => (
          <div key={unit.id} className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 font-semibold text-primary">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
                  {unitIndex + 1}
                </span>
                {unit.title}
                {unit.hours !== undefined && (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-normal text-muted-foreground">
                    {unit.hours} hrs
                  </span>
                )}
              </h3>
              <Link
                href={`/${classSlug}/${subjectSlug}/${unit.id}`}
                className="text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                Unit notes →
              </Link>
            </div>
            <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
              {unit.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}