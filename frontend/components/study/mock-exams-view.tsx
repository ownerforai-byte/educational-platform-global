"use client";

import { useEffect, useMemo, useState } from "react";
import { Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ComingSoon } from "@/components/content/coming-soon";
import { getEntranceQuestions } from "@/lib/entrance-questions";
import type { EntranceQuestion } from "@/lib/entrance-questions/types";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { assembleMock, answerKey, OMR_LETTERS, scoreMock, type MockPaper, type OmrAnswers } from "@/lib/mock-exam";
import { useAttemptHold } from "@/features/credits/attempt-hold";
import { listGoalSubjects } from "@/lib/study-goals";
import { useStudyGoals } from "./use-study-goals";
import { useSubjectBank } from "./use-subject-bank";
import { SubjectSelect } from "./subject-select";

function mcqPoolFor(subjectKey: string): EntranceQuestion[] {
  const [classSlug, subjectSlug] = subjectKey.split("/");
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  if (!subject) return [];
  const seen = new Set<string>();
  const pool: EntranceQuestion[] = [];
  for (const unit of subject.units) {
    for (const q of getEntranceQuestions(subjectSlug, unit.id)) {
      if (!seen.has(q.q)) {
        seen.add(q.q);
        pool.push(q);
      }
    }
  }
  return pool;
}

/** /mock-exams: timed mock = OMR MCQ section (auto-scored) + written PYQ section (self-marked). */
export function MockExamsView() {
  const { goals } = useStudyGoals();
  const [picked, setPicked] = useState<string | null>(null);
  const subjectKey = picked ?? goals.subjects[0] ?? listGoalSubjects()[0]?.key ?? "";
  const { bank, loading } = useSubjectBank(subjectKey || null);
  const pool = useMemo(() => mcqPoolFor(subjectKey), [subjectKey]);

  const [paper, setPaper] = useState<MockPaper | null>(null);
  const [answers, setAnswers] = useState<OmrAnswers>({});
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Keep this view mounted if the spark window ends mid-attempt (or while the
  // result is on screen); starting a NEW paper still needs an open window.
  const { canStart } = useAttemptHold(paper !== null);

  useEffect(() => {
    if (!paper || submitted) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [paper, submitted]);

  const start = () => {
    if (!canStart) return;
    const next = assembleMock({ mcqPool: pool, pyqs: bank?.pyqs ?? [], seed: Date.now() % 2_147_483_647 });
    setPaper(next);
    setAnswers({});
    setMarks({});
    setSubmitted(false);
    setSecondsLeft(next.durationMinutes * 60);
  };

  const score = paper ? scoreMock(paper, answers, marks) : null;
  const empty = !loading && pool.length === 0 && (bank?.pyqs.length ?? 0) === 0;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Timer className="h-6 w-6" /> Mock exams
        </h1>
        <p className="text-sm text-muted-foreground">
          Objective section on an OMR sheet with auto scoring, plus written past questions you mark against the model answer.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Label htmlFor="mock-subject">Subject</Label>
        <SubjectSelect
          id="mock-subject"
          value={subjectKey}
          chosen={goals.subjects}
          onChange={(k) => {
            if (paper && !canStart) return;
            setPicked(k);
            setPaper(null);
          }}
        />
        <Button onClick={start} disabled={loading || empty || !canStart}>
          {paper ? "New paper" : "Start mock"}
        </Button>
        {!canStart && (
          <span className="text-xs text-muted-foreground">Access session ended. Upgrade your plan to continue.</span>
        )}
      </div>

      {empty && (
        <ComingSoon
          title="Mock paper for this subject"
          kind="Notes"
          message="No entrance MCQs or past questions are indexed for this subject yet."
          backHref="/pyqs"
          backLabel="PYQ bank"
        />
      )}

      {paper && score && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {submitted ? `Score ${score.total} / ${score.outOf} (${score.percent}%)` : `Time left ${mm}:${ss}`}
              </CardTitle>
              <CardDescription>
                {paper.objective.length} MCQs and {paper.written.length} written questions, {paper.durationMinutes} minutes.
              </CardDescription>
            </CardHeader>
            {submitted && (
              <CardContent className="text-sm space-y-1">
                <p>
                  Objective: {score.correct} correct, {score.wrong} wrong, {score.blank} blank.
                </p>
                <p>Written (self-marked): {score.writtenMarks}</p>
                <p className="text-muted-foreground">
                  Answer key: {answerKey(paper).map((k) => `${k.number}.${k.letter}`).join("  ")}
                </p>
              </CardContent>
            )}
          </Card>

          {paper.objective.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Section A: OMR sheet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paper.objective.map((item, i) => (
                  <div key={item.id} className="space-y-1 text-sm">
                    <p className="font-medium">
                      {i + 1}. {item.q}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.options.map((opt, oi) => {
                        const chosen = answers[item.id] === oi;
                        const right = submitted && oi === item.answer;
                        return (
                          <button
                            key={oi}
                            type="button"
                            disabled={submitted}
                            aria-pressed={chosen}
                            onClick={() => setAnswers((a) => ({ ...a, [item.id]: oi }))}
                            className={`rounded-md border px-2 py-1 text-left ${chosen ? "bg-primary text-primary-foreground" : ""} ${right ? "ring-2 ring-green-500" : ""}`}
                          >
                            <span className="font-mono mr-1">{OMR_LETTERS[oi]}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {submitted && <p className="text-muted-foreground">{item.why}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {paper.written.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Section B: written</CardTitle>
                <CardDescription>After submitting, compare with the model answer and enter your marks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paper.written.map((w, i) => (
                  <div key={w.id} className="space-y-2 text-sm">
                    <p className="font-medium">
                      {i + 1}. {w.question} <span className="text-muted-foreground">[{w.marks}] NEB {w.year}</span>
                    </p>
                    {submitted && (
                      <>
                        <p className="whitespace-pre-wrap rounded-md bg-muted p-3">{w.solution ?? "No model answer indexed."}</p>
                        <Label htmlFor={`mark-${w.id}`}>Your marks (0-{w.marks})</Label>
                        <input
                          id={`mark-${w.id}`}
                          type="number"
                          min={0}
                          max={w.marks}
                          className="ml-2 h-8 w-20 rounded-md border bg-background px-2"
                          value={marks[w.id] ?? ""}
                          onChange={(e) => setMarks((m) => ({ ...m, [w.id]: Number(e.target.value) }))}
                        />
                      </>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {!submitted && <Button onClick={() => setSubmitted(true)}>Submit paper</Button>}
        </>
      )}
    </div>
  );
}
