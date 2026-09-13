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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

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
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            <Link href={hubHref} className="hover:text-primary hover:underline">
              {hubLabel}
            </Link>
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">
            {emoji} {section.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
        </div>
        <BackButton />
      </div>

      {/* Syllabus Card */}
      <Card id="syllabus" className="border-primary/30 bg-primary/5 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <IconBadge icon={FileText} variant="primary" size="sm" />
            <div>
              <CardTitle className="text-lg">📊 Official Syllabus Outline</CardTitle>
              <p className="text-sm font-normal text-muted-foreground mt-0.5">
                Official curriculum structure and required study points.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.topics.map((topic, index) => (
              <div
                key={topic.id}
                className="rounded-2xl border border-border/70 bg-card p-4 space-y-2 shadow-xs"
              >
                <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{topic.title}</span>
                </h3>
                <ul className="ml-2 space-y-1 text-xs text-muted-foreground">
                  {topic.points.map((point) => (
                    <li key={point} className="flex items-start gap-1.5">
                      <span className="text-primary/70 mt-0.5">&bull;</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <IconBadge icon={BookOpen} variant="info" size="sm" />
          <div>
            <h2 className="text-xl font-bold tracking-tight">📝 High-Yield Study Notes</h2>
            <p className="text-xs text-muted-foreground">
              Core facts, benchmarks, and exam revision summaries.
            </p>
          </div>
        </div>

        {section.notes && section.notes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {section.notes.map((note) => (
              <Card
                key={note.topicId}
                className="rounded-2xl border border-border/80 bg-card hover:border-primary/30 transition shadow-sm overflow-hidden"
              >
                <CardHeader className="bg-muted/30 pb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <CardTitle className="text-base font-bold text-foreground">
                      {note.title}
                    </CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {note.summary}
                  </p>
                </CardHeader>
                <CardContent className="pt-4 space-y-2">
                  <ul className="space-y-2 text-xs text-foreground/90">
                    {note.facts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-sm text-muted-foreground">
            Notes are being indexed for this section.
          </Card>
        )}
      </div>

      {/* Practice Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconBadge icon={CheckSquare} variant="success" size="sm" />
            <div>
              <h2 className="text-xl font-bold tracking-tight">✅ Interactive Practice Quiz</h2>
              <p className="text-xs text-muted-foreground">
                Self-test with instant answers and comprehensive explanations.
              </p>
            </div>
          </div>
          {Object.keys(selectedAnswers).length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetQuiz}
              className="gap-1.5 text-xs rounded-xl h-8"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Quiz
            </Button>
          )}
        </div>

        {section.practice && section.practice.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.practice.map((q, idx) => {
              const selected = selectedAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctIndex;

              return (
                <Card
                  key={q.id}
                  className="rounded-2xl border border-border/80 bg-card p-5 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Question {idx + 1}
                      </span>
                      {isAnswered && (
                        <span
                          className={`text-xs font-semibold inline-flex items-center gap-1 ${
                            isCorrect ? "text-emerald-500" : "text-destructive"
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

                    <p className="text-sm font-semibold text-foreground leading-relaxed mb-4">
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
          <Card className="p-6 text-center text-sm text-muted-foreground">
            Practice question sets are being added for this topic.
          </Card>
        )}
      </div>
    </div>
  );
}
