import Link from "next/link";
import { getSubjectLegend } from "@/lib/legend";
import { ChevronRight, Lightbulb, BookOpen, FileText, Zap, AlertCircle, BookMarked, Target, Calculator } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";
import { MathMarkdown } from "@/components/content/math-markdown";

function FactIcon({ type }: { type: string }) {
  switch (type) {
    case "formula":
      return <Calculator className="h-3.5 w-3.5 text-amber-500" />;
    case "definition":
      return <BookMarked className="h-3.5 w-3.5 text-violet-500" />;
    case "tip":
      return <Zap className="h-3.5 w-3.5 text-emerald-500" />;
    case "confusion":
    case "clarification":
      return <AlertCircle className="h-3.5 w-3.5 text-red-500" />;
    default:
      return <FileText className="h-3.5 w-3.5 text-sky-500" />;
  }
}

export async function generateStaticParams() {
  const { SYLLABUS } = await import("@/lib/syllabus");
  const params: { classSlug: string; subjectSlug: string }[] = [];
  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      params.push({ classSlug: cls.slug, subjectSlug: subject.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const { classSlug, subjectSlug } = await params;
  const subject = await getSubjectLegend(classSlug, subjectSlug);
  const classLabel = classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: subject ? `${subject.subjectName} — Legend` : `${subjectSlug} — Legend`,
    description: subject
      ? `${subject.totalTopics} topics, ${subject.totalFacts} facts & confusions across ${subject.units.length} units`
      : `Legend for ${subjectSlug}`,
  };
}

export default async function LegendSubjectPage({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const { classSlug, subjectSlug } = await params;
  const subject = await getSubjectLegend(classSlug, subjectSlug);

  const classLabel = classSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const subjectLabel = subject?.subjectName ?? subjectSlug;

  if (!subject) {
    return (
      <div className="mx-auto max-w-6xl py-10">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/legend" className="hover:text-foreground">Legend</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/legend/${classSlug}`} className="hover:text-foreground">{classLabel}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground">{subjectLabel}</span>
        </nav>
        <EmptyState
          title="No legend content for this subject"
          description="Concept notes will appear here as they are added to this subject."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/legend" className="hover:text-foreground">Legend</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/legend/${classSlug}`} className="hover:text-foreground">{classLabel}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">{subjectLabel}</span>
      </nav>

      {/* Header */}
      <div className={`rounded-2xl border ${subject.border} bg-gradient-to-br ${subject.gradient} p-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{subject.icon}</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{subjectLabel}</h1>
              <p className="text-sm text-muted-foreground mt-1">{subject.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" /> {subject.totalTopics} topics
            </span>
            <span className="flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4" /> {subject.totalFacts} facts & confusions
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> {subject.units.length} units
            </span>
          </div>
        </div>
      </div>

      {/* Units */}
      <div className="space-y-8">
        {subject.units.length === 0 ? (
          <EmptyState
            title="No units with content yet"
            description="Concept files will be organized by unit as they are created."
          />
        ) : (
          subject.units.map((unit, unitIdx) => (
            <section key={unit.unitId} className="space-y-4">
              {/* Unit Header */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-muted-foreground/70 uppercase tracking-wider">
                    Unit {unitIdx + 1}
                  </span>
                  <h2 className="text-lg font-semibold tracking-tight">{unit.unitTitle}</h2>
                  {unit.hours && (
                    <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                      {unit.hours} hrs
                    </span>
                  )}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-xs text-muted-foreground">{unit.topics.length} topics</span>
              </div>

              {/* Syllabus Topics */}
              {unit.syllabusTopics.length > 0 && (
                <div className="flex flex-wrap gap-2 text-xs">
                  {unit.syllabusTopics.slice(0, 8).map((st, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/50">
                      {st}
                    </span>
                  ))}
                  {unit.syllabusTopics.length > 8 && (
                    <span className="px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/50">
                      +{unit.syllabusTopics.length - 8} more
                    </span>
                  )}
                </div>
              )}

              {/* Topics Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unit.topics.map((topic) => (
                  <article
                    key={`${topic.unitId}/${topic.topicSlug}`}
                    className="group rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-border hover:shadow-sm"
                  >
                    {/* Topic Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                          {topic.topicTitle}
                        </h3>
                        {topic.syllabusTopic && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            Syllabus: {topic.syllabusTopic}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground">
                        {topic.relevance}%
                      </span>
                    </div>

                    {/* Content Count Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {topic.facts.length > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                          <FileText className="h-2.5 w-2.5" />
                          {topic.facts.length} facts
                        </span>
                      )}
                      {topic.confusions.length > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          <AlertCircle className="h-2.5 w-2.5" />
                          {topic.confusions.length} confusions
                        </span>
                      )}
                      {topic.practice.length > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <Target className="h-2.5 w-2.5" />
                          {topic.practice.length} practice
                        </span>
                      )}
                      {topic.animation3D && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                          <Zap className="h-2.5 w-2.5" />
                          3D
                        </span>
                      )}
                    </div>

                    {/* Facts by Type */}
                    {topic.facts.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {["formula", "definition", "tip", "fact"].map((type) => {
                          const typeFacts = topic.facts.filter((f) => f.type === type);
                          if (typeFacts.length === 0) return null;
                          return (
                            <div key={type} className="space-y-1.5">
                              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                <FactIcon type={type} />
                                <span className="uppercase tracking-wide">{type}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted">
                                  {typeFacts.length}
                                </span>
                              </div>
                              <div className="space-y-1 ml-5">
                                {typeFacts.slice(0, 3).map((fact, fi) => (
                                  <div key={fi} className="text-sm text-foreground/85 leading-relaxed">
                                    <MathMarkdown content={fact.content} />
                                  </div>
                                ))}
                                {typeFacts.length > 3 && (
                                  <div className="text-xs text-muted-foreground italic">
                                    +{typeFacts.length - 3} more {type}{typeFacts.length - 3 !== 1 ? "s" : ""}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Confusions */}
                    {topic.confusions.length > 0 && (
                      <div className="space-y-2 mb-3 border-t border-border/50 pt-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>Common Confusions</span>
                        </div>
                        <div className="space-y-2 ml-5">
                          {topic.confusions.slice(0, 2).map((c, ci) => (
                            <div key={ci} className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
                              <p className="text-sm font-medium text-red-700 dark:text-red-400">
                                ❌ {c.misconception}
                              </p>
                              <p className="text-sm text-foreground/80 mt-1">
                                <MathMarkdown content={c.clarification} />
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Practice */}
                    {topic.practice.length > 0 && (
                      <div className="space-y-1 border-t border-border/50 pt-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <Target className="h-3.5 w-3.5" />
                          <span>Practice</span>
                        </div>
                        <div className="space-y-1 ml-5">
                          {topic.practice.slice(0, 2).map((p, pi) => (
                            <div key={pi} className="text-sm text-foreground/85 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30">
                              <MathMarkdown content={p} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Link to topic detail */}
                    <Link
                      href={`/${classSlug}/${subjectSlug}/${topic.unitId}/${topic.topicSlug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                    >
                      View full concept →
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
