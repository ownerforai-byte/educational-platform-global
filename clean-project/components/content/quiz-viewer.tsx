"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UnderDevelopment } from "@/components/content/under-development";

type Question = {
  id: string;
  type: "multiple_choice" | "true_false";
  prompt: string;
  options?: string[];
  answer: string | boolean;
  explanation?: string;
};

export function QuizViewer({
  title,
  questions,
}: {
  title: string;
  questions: Question[];
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (questions.length === 0) {
    return <UnderDevelopment />;
  }

  const q = questions[current];
  const isCorrect = submitted && selected === q.answer;

  const handleSubmit = () => {
    if (submitted) {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setSubmitted(false);
      }
      return;
    }
    setSubmitted(true);
    if (selected === q.answer) setScore((s) => s + 1);
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <span className="text-sm text-muted-foreground">
          Question {current + 1} / {questions.length}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base font-medium">{q.prompt}</p>

        <div className="space-y-2">
          {(q.type === "multiple_choice" && q.options
            ? q.options
            : ["True", "False"]
          ).map((opt, idx) => {
            const value =
              q.type === "multiple_choice" ? opt : opt === "True";
            const isSelected = selected === value;

            return (
              <Button
                key={idx}
                variant={isSelected ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => !submitted && setSelected(value)}
                disabled={submitted}
              >
                {opt}
              </Button>
            );
          })}
        </div>

        {submitted && (
          <div
            className={`rounded-md border p-3 text-sm ${
              isCorrect
                ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300"
                : "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-300"
            }`}
          >
            <p className="font-medium">
              {isCorrect ? "Correct!" : `Incorrect. Answer: ${String(q.answer)}`}
            </p>
            {q.explanation && (
              <p className="mt-1 text-muted-foreground">{q.explanation}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            Score: {score}
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleSubmit}>
              {submitted
                ? current + 1 < questions.length
                  ? "Next"
                  : "Finish"
                : "Submit"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
