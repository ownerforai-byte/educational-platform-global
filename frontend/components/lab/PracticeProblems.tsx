"use client";

import { useState } from "react";
import { Check, X, RotateCcw, ArrowRight } from "lucide-react";
import { MathInline } from "@/components/content/MathRenderer";
import { Button } from "@/components/ui/button";

export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: ProblemDifficulty;
  topic: string;
}

const PROBLEMS: Problem[] = [
  {
    id: "1",
    question: "What is the volume of a sphere with radius 3?",
    options: ["36π", "36π/3", "12π", "27π"],
    correctAnswer: 1,
    explanation: "V = (4/3)πr³ = (4/3)π(27) = 36π",
    difficulty: "Easy",
    topic: "Geometry",
  },
  {
    id: "2",
    question: "Solve: sin²θ + cos²θ = ?",
    options: ["0", "1", "2", "sinθ"],
    correctAnswer: 1,
    explanation: "This is the fundamental trigonometric identity",
    difficulty: "Easy",
    topic: "Trigonometry",
  },
  {
    id: "3",
    question: "What is the derivative of x²?",
    options: ["x", "2x", "2", "x²"],
    correctAnswer: 1,
    explanation: "Using power rule: d/dx(xⁿ) = nxⁿ⁻¹",
    difficulty: "Medium",
    topic: "Calculus",
  },
  {
    id: "4",
    question: "Find the distance between (1,2) and (4,6)",
    options: ["5", "√17", "3", "4"],
    correctAnswer: 0,
    explanation: "d = √((4-1)² + (6-2)²) = √(9+16) = √25 = 5",
    difficulty: "Medium",
    topic: "Algebra",
  },
  {
    id: "5",
    question: "What is the surface area of a cube with side 4?",
    options: ["64", "96", "128", "32"],
    correctAnswer: 1,
    explanation: "SA = 6s² = 6(16) = 96",
    difficulty: "Easy",
    topic: "Geometry",
  },
  {
    id: "6",
    question: "Solve: 2x² - 8 = 0",
    options: ["x = ±2", "x = ±4", "x = 2", "x = 4"],
    correctAnswer: 0,
    explanation: "2x² = 8 → x² = 4 → x = ±2",
    difficulty: "Medium",
    topic: "Algebra",
  },
  {
    id: "7",
    question: "Evaluate: lim(x→0) sin(x)/x",
    options: ["0", "1", "∞", "undefined"],
    correctAnswer: 1,
    explanation: "This is a fundamental limit: lim(x→0) sin(x)/x = 1",
    difficulty: "Medium",
    topic: "Calculus",
  },
  {
    id: "8",
    question: "Find the determinant of [[2,3],[1,4]]",
    options: ["5", "11", "-5", "8"],
    correctAnswer: 0,
    explanation: "det = (2)(4) - (3)(1) = 8 - 3 = 5",
    difficulty: "Medium",
    topic: "Linear Algebra",
  },
];

const DIFFICULTY_CLASSES: Record<ProblemDifficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Hard: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export function PracticeProblems() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const problem = PROBLEMS[currentProblem];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === problem.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem((c) => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold">🎉 Quiz Complete!</h3>
        <div className="my-4 text-5xl font-bold text-primary">
          {score}/{PROBLEMS.length}
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          {score === PROBLEMS.length
            ? "Perfect score! 🌟"
            : score >= PROBLEMS.length * 0.7
            ? "Great job! 👍"
            : "Keep practicing! 💪"}
        </p>
        <Button onClick={handleRestart}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Question {currentProblem + 1} of {PROBLEMS.length}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_CLASSES[problem.difficulty]}`}
        >
          {problem.difficulty}
        </span>
      </div>

      <h3 className="text-base font-medium leading-relaxed">
        <MathInline expression={problem.question} />
      </h3>

      <div className="flex flex-col gap-2">
        {problem.options.map((option, index) => {
          const isCorrect = index === problem.correctAnswer;
          const isSelected = selectedAnswer === index;
          const stateClasses = showExplanation
            ? isCorrect
              ? "border-emerald-500 bg-emerald-500/10"
              : isSelected
              ? "border-red-500 bg-red-500/10"
              : "border-border opacity-60"
            : "border-border hover:border-primary/50 hover:bg-muted/50";
          return (
            <button
              key={index}
              type="button"
              onClick={() => !showExplanation && handleAnswer(index)}
              disabled={showExplanation}
              className={`flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-left text-sm transition-colors ${stateClasses}`}
            >
              {showExplanation && isCorrect && (
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              )}
              {showExplanation && isSelected && !isCorrect && (
                <X className="h-4 w-4 shrink-0 text-red-500" />
              )}
              <MathInline expression={option} />
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="rounded-lg bg-primary/10 p-3 text-sm">
          <strong>Explanation:</strong>{" "}
          <MathInline expression={problem.explanation} />
        </div>
      )}

      {showExplanation && (
        <Button onClick={handleNext} className="w-full">
          {currentProblem < PROBLEMS.length - 1 ? "Next Question" : "See Results"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
