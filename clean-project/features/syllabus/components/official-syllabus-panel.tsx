import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UnitVM } from "../types";

type OfficialSyllabusPanelProps = {
  heading?: string;
  description?: string;
  units: UnitVM[];
  basePath?: string;
  highlightUnitId?: string;
  highlightTopicSlug?: string;
  compact?: boolean;
};

export function OfficialSyllabusPanel({
  heading = "Syllabus",
  description,
  units,
  basePath,
  highlightUnitId,
  highlightTopicSlug,
  compact = false,
}: OfficialSyllabusPanelProps) {
  if (units.length === 0) {
    return (
      <Card id="syllabus">
        <CardHeader>
          <CardTitle className="text-lg">{heading}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Official syllabus has not been added for this section yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="syllabus" className="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg">{heading}</CardTitle>
        {description ? (
          <p className="text-sm font-normal text-muted-foreground">{description}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-5">
        {units.map((unit, unitIndex) => {
          const unitHref = basePath ? `${basePath}/chapters/${unit.id}` : undefined;
          const isHighlightedUnit = highlightUnitId === unit.id;

          return (
            <div
              key={unit.id}
              className={isHighlightedUnit ? "rounded-lg border border-primary/40 bg-background/80 p-3" : "space-y-2"}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                {unitHref ? (
                  <Link href={unitHref} className="font-semibold text-primary hover:underline">
                    Unit {unitIndex + 1}: {unit.title}
                  </Link>
                ) : (
                  <h3 className="font-semibold text-primary">
                    Unit {unitIndex + 1}: {unit.title}
                  </h3>
                )}
                {typeof unit.hours === "number" ? (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground">
                    {unit.hours} hrs
                  </span>
                ) : null}
              </div>
              {compact ? (
                <p className="text-xs text-muted-foreground">{unit.topics.length} official topics</p>
              ) : (
                <ol className="ml-5 list-decimal space-y-1 text-sm text-muted-foreground">
                  {(unit.topicEntries ?? []).map((topic) => {
                    const highlighted = highlightTopicSlug === topic.slug && isHighlightedUnit;
                    const topicHref = basePath
                      ? `${basePath}/chapters/${unit.id}/topics/${topic.slug}`
                      : undefined;
                    return (
                      <li
                        key={topic.slug}
                        className={highlighted ? "font-medium text-foreground" : undefined}
                      >
                        {topicHref ? (
                          <Link href={topicHref} className="hover:text-primary hover:underline">
                            {topic.title}
                          </Link>
                        ) : (
                          topic.title
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
