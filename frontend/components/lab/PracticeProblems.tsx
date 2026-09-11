"use client";

import { useState } from "react";
import { MathInline } from "../content/MathRenderer";

interface Problem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
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

export function PracticeProblems({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const isDark = theme === "dark";
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
      <div style={{
        background: isDark ? "#1e293b" : "#f8fafc",
        border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
        borderRadius: "12px",
        padding: "24px",
        color: isDark ? "#f8fafc" : "#1e293b",
        textAlign: "center",
      }}>
        <h2 style={{ margin: "0 0 16px", fontSize: "20px" }}>🎉 Quiz Complete!</h2>
        <div style={{ fontSize: "48px", fontWeight: 700, color: "#818cf8", marginBottom: "16px" }}>
          {score}/{PROBLEMS.length}
        </div>
        <p style={{ opacity: 0.7, marginBottom: "20px" }}>
          {score === PROBLEMS.length ? "Perfect score! 🌟" : score >= PROBLEMS.length * 0.7 ? "Great job! 👍" : "Keep practicing! 💪"}
        </p>
        <button
          onClick={handleRestart}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "rgba(99, 102, 241, 0.9)",
            color: "#f8fafc",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: isDark ? "#1e293b" : "#f8fafc",
      border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
      borderRadius: "12px",
      padding: "20px",
      color: isDark ? "#f8fafc" : "#1e293b",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "14px", opacity: 0.7 }}>Question {currentProblem + 1} of {PROBLEMS.length}</span>
        <span style={{
          fontSize: "12px",
          padding: "4px 12px",
          borderRadius: "12px",
          background: problem.difficulty === "Easy" ? "rgba(16, 185, 129, 0.2)" : problem.difficulty === "Medium" ? "rgba(245, 158, 11, 0.2)" : "rgba(239, 68, 68, 0.2)",
          color: problem.difficulty === "Easy" ? "#10b981" : problem.difficulty === "Medium" ? "#f59e0b" : "#ef4444",
        }}>
          {problem.difficulty}
        </span>
      </div>

      <h3 style={{ margin: "0 0 16px", fontSize: "16px", lineHeight: 1.5 }}>
        <MathInline expression={problem.question} />
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
        {problem.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showExplanation && handleAnswer(index)}
            disabled={showExplanation}
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: `2px solid ${showExplanation ? (index === problem.correctAnswer ? "#10b981" : selectedAnswer === index ? "#ef4444" : isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)") : isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
              background: showExplanation && index === problem.correctAnswer ? "rgba(16, 185, 129, 0.2)" : showExplanation && selectedAnswer === index ? "rgba(239, 68, 68, 0.2)" : "transparent",
              color: isDark ? "#e2e8f0" : "#334155",
              cursor: showExplanation ? "default" : "pointer",
              fontSize: "14px",
              textAlign: "left",
              transition: "all 0.2s",
            }}
          >
            <MathInline expression={option} />
          </button>
        ))}
      </div>

      {showExplanation && (
        <div style={{
          padding: "12px",
          borderRadius: "8px",
          background: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)",
          fontSize: "13px",
          marginBottom: "16px",
        }}>
          <strong>Explanation:</strong>{" "}
          <MathInline expression={problem.explanation} />
        </div>
      )}

      {showExplanation && (
        <button
          onClick={handleNext}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "rgba(99, 102, 241, 0.9)",
            color: "#f8fafc",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {currentProblem < PROBLEMS.length - 1 ? "Next Question →" : "See Results"}
        </button>
      )}
    </div>
  );
}
