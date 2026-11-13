"use client";

import { useState } from "react";
import Link from "next/link";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  CheckSquare,
  FileText,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { UnderProgressNotice } from "@/components/content/under-progress";
import {
  DocPaper,
  DocToolbar,
  DocSectionHeading,
  DocHighlightCard,
  getDocFontClass,
  type DocFontSize,
} from "@/features/docs/academic-doc-layout";
import type { KnowledgeSection, KnowledgePracticeQuestion } from "../data";

const SECTION_EMOJI: Record<string, string> = {
  "Geography of Nepal": "🏔️",
  History: "📜",
  Environment: "🌲",
  "General Knowledge": "💡",
  "Current Affairs": "📰",
  "Global Topics": "🌍",
};

export function KnowledgeSectionView({
  section,
  hubHref,
  hubLabel,
}: {
  section: KnowledgeSection;
  hubHref: string;
  hubLabel: string;
}) {
  const emoji = SECTION_EMOJI[section.name] ?? "📘";
  const [fontSize, setFontSize] = useState<DocFontSize>("base");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const fontClass = getDocFontClass(fontSize);

  const handleSelect = (qId: string, optIdx: number) => {
    if (selectedAnswers[qId] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowExplanations((prev) => ({ ...prev, [qId]: true }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanations({});
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-12 px-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <p className="text-sm text-muted-foreground">
          <Link href={hubHref} className="hover:text-primary hover:underline">
            ← {hubLabel}
          </Link>
        </p>
        <BackButton />
      </div>

      {/* Docs Viewer Paper Container */}
      <DocPaper ariaLabel={`${section.name} Knowledge Document`}>
        {/* Document Header & Controls */}
        <DocToolbar
          badge="Docs Viewer · Knowledge Document"
          title={`${emoji} ${section.name}`}
          subtitle={section.description}
          metadata={[
            { label: hubLabel, tone: "primary" },
            { label: `${section.topics.length} Syllabus Units`, tone: "sky" },
            { label: `${section.notes?.length ?? 0} Study Notes`, tone: "amber" },
            { label: `${section.practice?.length ?? 0} Practice MCQs`, tone: "emerald" },
          ]}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />

        {/* 1. Official Syllabus Outline */}
        <section id="doc-syllabus" className="space-y-4">
          <DocSectionHeading
            id="doc-syllabus"
            icon={<FileText className="h-5 w-5 text-primary" />}
            tone="text-primary"
          >
            1. Official Syllabus Outline
          </DocSectionHeading>
          <p className="text-xs text-muted-foreground">
            Official curriculum structure and required study points.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.topics.map((topic, index) => (
              <div
                key={topic.id}
                className="rounded-2xl border border-border/70 bg-card p-4 space-y-2 shadow-xs"
              >
                <h4 className="font-semibold text-sm text-primary flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{topic.title}</span>
                </h4>
                <ul className={`ml-2 space-y-1 text-muted-foreground ${fontClass}`}>
                  {topic.points.map((point) => (
                    <li key={point} className="flex items-start gap-1.5 text-xs">
                      <span className="text-primary/70 mt-0.5">&bull;</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 2. High-Yield Study Notes */}
        <section id="doc-notes" className="space-y-4 pt-4 border-t border-border/60">
          <DocSectionHeading
            id="doc-notes"
            icon={<BookOpen className="h-5 w-5 text-amber-500" />}
            tone="text-amber-600 dark:text-amber-400"
          >
            2. High-Yield Study Notes
          </DocSectionHeading>
          <p className="text-xs text-muted-foreground">
            Core facts, benchmarks, and exam revision summaries formatted in standardized cards.
          </p>

          {section.notes && section.notes.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {section.notes.map((note) => (
                <DocHighlightCard
                  key={note.topicId}
                  type="summary"
                  title={note.title}
                >
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {note.summary}
                  </p>
                  <ul className={`space-y-2 text-foreground/90 ${fontClass}`}>
                    {note.facts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </DocHighlightCard>
              ))}
            </div>
          ) : (
            <UnderProgressNotice
              icon={<BookOpen className="h-4 w-4" />}
              title="Study notes under progress — will be added in a future update"
            />
          )}
        </section>

        {/* 3. Interactive Practice Quiz */}
        <section id="doc-practice" className="space-y-4 pt-4 border-t border-border/60">
          <div className="flex items-center justify-between">
            <DocSectionHeading
              id="doc-practice"
              icon={<CheckSquare className="h-5 w-5 text-emerald-500" />}
              tone="text-emerald-600 dark:text-emerald-400"
            >
              3. Interactive Practice & Knowledge Check
            </DocSectionHeading>
            {Object.keys(selectedAnswers).length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetQuiz}
                className="gap-1.5 text-xs rounded-xl h-8 print:hidden"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Quiz
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Self-test with instant answers and comprehensive explanations.
          </p>

          {section.practice && section.practice.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.practice.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correctIndex;

                return (
                  <Card
                    key={q.id}
                    className="rounded-2xl border border-border/80 bg-card p-5 flex flex-col justify-between shadow-xs print:break-inside-avoid"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          Question {idx + 1}
                        </span>
                        {isAnswered && (
                          <span
                            className={`text-xs font-semibold inline-flex items-center gap-1 ${isCorrect ? "text-emerald-500" : "text-destructive"
                              }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3.5 w-3.5" /> Incorrect
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      <p className={`font-semibold text-foreground leading-relaxed mb-4 ${fontClass}`}>
                        {q.question}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          let btnStyle = "border-border/70 hover:bg-muted/50 text-foreground";
                          if (isAnswered) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold";
                            } else if (optIdx === selected) {
                              btnStyle = "border-destructive bg-destructive/15 text-destructive font-semibold";
                            } else {
                              btnStyle = "opacity-50 border-border/40 text-muted-foreground";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelect(q.id, optIdx)}
                              disabled={isAnswered}
                              className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && optIdx === q.correctIndex && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {isAnswered && showExplanations[q.id] && (
                      <div className="mt-4 pt-3 border-t border-border/50 text-xs bg-muted/40 p-2.5 rounded-xl">
                        <p className="font-semibold text-foreground mb-0.5 flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Explanation
                        </p>
                        <p className="text-muted-foreground leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <UnderProgressNotice
              icon={<HelpCircle className="h-4 w-4" />}
              title="Practice questions under progress — will be added in a future update"
            />
          )}
        </section>
      </DocPaper>
    </div>
  );
}
