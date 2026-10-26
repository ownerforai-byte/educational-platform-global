import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => ({
  generateQuestions: vi.fn(),
  evaluateAnswers: vi.fn(),
  saveQuizHistory: vi.fn(),
}));

vi.mock("@/lib/syllabus", () => ({
  SYLLABUS: [
    {
      slug: "class-11-notes",
      subjects: [
        {
          slug: "physics",
          name: "Physics",
          units: [{ title: "Mechanics", topics: ["Motion"] }],
        },
      ],
    },
    {
      slug: "class-12-notes",
      subjects: [
        {
          slug: "biology",
          name: "Biology",
          units: [{ title: "Cell biology", topics: ["Cell structure"] }],
        },
      ],
    },
  ],
}));
vi.mock("@/lib/api/ai", () => ({
  generateQuestions: mocks.generateQuestions,
  evaluateAnswers: mocks.evaluateAnswers,
}));
vi.mock("@/lib/api/ai-quiz-history", () => ({ saveQuizHistory: mocks.saveQuizHistory }));

import { QuizStudio } from "@/components/ai/quiz-studio";

/**
 * Dynamic AI quiz engine (plan.md §11) — one end-to-end test per non-MCQ
 * format: generate → answer → (AI evaluation →) submission report.
 */

beforeEach(() => {
  vi.clearAllMocks();
  mocks.saveQuizHistory.mockResolvedValue({ saved: true, migrated: true });
  mocks.evaluateAnswers.mockResolvedValue({
    results: [
      {
        score: 90,
        verdict: "correct",
        feedback: "Strong answer — you named both factors correctly.",
        modelAnswer: "The ideal answer covers both factors.",
        improvements: ["Add the unit in your final sentence."],
      },
    ],
    summary: "Overall a strong submission — watch the units.",
    provider: "test-provider",
  });
});

function selectFormat(label: RegExp | string) {
  fireEvent.click(screen.getByRole("button", { name: label }));
}

describe("Quiz formats — choice formats", () => {
  it("generates and auto-checks a True/False set", async () => {
    mocks.generateQuestions.mockResolvedValue({
      questions: [
        {
          prompt: "Velocity is a vector quantity.",
          options: ["True", "False"],
          correctIndex: 0,
          difficulty: "easy",
          subject: "Physics",
          topic: "Motion",
          explanation: "Velocity has both magnitude and direction.",
          format: "true-false",
        },
      ],
      provider: "test-provider",
    });

    render(<QuizStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Physics" }));
    selectFormat(/true\s*\/\s*false/i);
    fireEvent.click(screen.getByRole("button", { name: "Generate 10 Questions" }));

    await waitFor(() => expect(mocks.generateQuestions).toHaveBeenCalledWith(
      expect.objectContaining({ format: "true-false" }),
    ));
    expect(await screen.findByText("Velocity is a vector quantity.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /True/ }));
    fireEvent.click(screen.getByRole("button", { name: "Finish Quiz" }));

    await waitFor(() => expect(mocks.saveQuizHistory).toHaveBeenCalledWith(
      expect.objectContaining({ format: "true-false", answered: 1, correct: 1 }),
    ));
    expect(screen.getByText("1 / 1 correct")).toBeInTheDocument();
  });
});

describe("Quiz formats — AI-graded writing formats", () => {
  it("fill-blank: collects typed answers and shows the AI report", async () => {
    mocks.generateQuestions.mockResolvedValue({
      questions: [
        {
          prompt: "The SI unit of force is the ____.",
          options: [],
          correctIndex: -1,
          difficulty: "easy",
          subject: "Physics",
          topic: "Motion",
          explanation: "The newton (N) is the SI unit of force.",
          format: "fill-blank",
          acceptedAnswers: ["newton", "N"],
        },
      ],
      provider: "test-provider",
    });

    render(<QuizStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Physics" }));
    selectFormat(/fill in the blank/i);
    fireEvent.click(screen.getByRole("button", { name: "Generate 10 Questions" }));

    await waitFor(() => expect(mocks.generateQuestions).toHaveBeenCalledWith(
      expect.objectContaining({ format: "fill-blank" }),
    ));

    fireEvent.change(screen.getByLabelText(/your answer/i), {
      target: { value: "newton" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit for ai evaluation/i }));

    await waitFor(() => expect(mocks.evaluateAnswers).toHaveBeenCalledWith(
      expect.objectContaining({
        format: "fill-blank",
        items: [expect.objectContaining({ userAnswer: "newton" })],
      }),
    ));
    expect(await screen.findByText("AI Submission Report")).toBeInTheDocument();
    expect(screen.getByText(/Strong answer/)).toBeInTheDocument();
    expect(screen.getByText(/Model answer/i)).toBeInTheDocument();
    expect(screen.getByText("Add the unit in your final sentence.")).toBeInTheDocument();
    expect(screen.getByText(/Overall a strong submission/)).toBeInTheDocument();

    await waitFor(() => expect(mocks.saveQuizHistory).toHaveBeenCalledWith(
      expect.objectContaining({ format: "fill-blank", scorePct: 90 }),
    ));
  });

  it("short-answer: sends the essay for rubric grading and reports per-item feedback", async () => {
    mocks.generateQuestions.mockResolvedValue({
      questions: [
        {
          prompt: "Explain why terminal velocity is reached.",
          options: [],
          correctIndex: -1,
          difficulty: "intermediate",
          subject: "Physics",
          topic: "Motion",
          explanation: "Drag balances weight at terminal velocity.",
          format: "short-answer",
          modelAnswer: "When drag equals weight, acceleration is zero.",
          rubric: ["mentions drag", "mentions weight", "zero acceleration"],
          maxScore: 5,
        },
      ],
      provider: "test-provider",
    });

    render(<QuizStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Physics" }));
    selectFormat(/short answer/i);
    fireEvent.click(screen.getByRole("button", { name: "Generate 10 Questions" }));

    await waitFor(() => expect(mocks.generateQuestions).toHaveBeenCalledWith(
      expect.objectContaining({ format: "short-answer" }),
    ));
    expect(screen.getByText(/Marked out of 5/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/your answer/i), {
      target: { value: "Drag equals weight so acceleration stops." },
    });
    expect(screen.getByText(/6 words/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /submit for ai evaluation/i }));
    await waitFor(() => expect(mocks.evaluateAnswers).toHaveBeenCalledWith(
      expect.objectContaining({
        format: "short-answer",
        items: [expect.objectContaining({ rubric: ["mentions drag", "mentions weight", "zero acceleration"] })],
      }),
    ));
    expect(await screen.findByText("AI Submission Report")).toBeInTheDocument();
    expect(screen.getByText(/90\/100 · correct/)).toBeInTheDocument();
  });

  it("long-answer: writing test with the full report and history save", async () => {
    mocks.generateQuestions.mockResolvedValue({
      questions: [
        {
          prompt: "Derive the expression for the range of a projectile.",
          options: [],
          correctIndex: -1,
          difficulty: "hard",
          subject: "Physics",
          topic: "Motion",
          explanation: "Range = u²sin(2θ)/g.",
          format: "long-answer",
          modelAnswer: "Resolve u into components, use t = 2usinθ/g, then x = ucosθ · t.",
          rubric: ["components", "time of flight", "final expression"],
          maxScore: 10,
        },
      ],
      provider: "test-provider",
    });

    render(<QuizStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Physics" }));
    selectFormat(/writing test/i);
    fireEvent.click(screen.getByRole("button", { name: "Generate 10 Questions" }));

    await waitFor(() => expect(mocks.generateQuestions).toHaveBeenCalledWith(
      expect.objectContaining({ format: "long-answer" }),
    ));
    expect(screen.getByText(/Marked out of 10/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/your answer/i), {
      target: { value: "Resolve velocity. Find time of flight. Multiply." },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit for ai evaluation/i }));

    await waitFor(() => expect(mocks.evaluateAnswers).toHaveBeenCalledWith(
      expect.objectContaining({ format: "long-answer" }),
    ));
    expect(await screen.findByText("AI Submission Report")).toBeInTheDocument();
    expect(screen.getByText(/Your answer:/)).toBeInTheDocument();

    await waitFor(() => expect(mocks.saveQuizHistory).toHaveBeenCalledWith(
      expect.objectContaining({ format: "long-answer", correct: 1, scorePct: 90 }),
    ));
  });

  it("keeps the finish button disabled until every writing answer is filled", async () => {
    mocks.generateQuestions.mockResolvedValue({
      questions: [
        {
          prompt: "Define momentum.",
          options: [],
          correctIndex: -1,
          difficulty: "easy",
          subject: "Physics",
          topic: "Motion",
          explanation: "Momentum = mass × velocity.",
          format: "short-answer",
          modelAnswer: "p = mv.",
          rubric: ["mass", "velocity"],
          maxScore: 5,
        },
      ],
      provider: "test-provider",
    });

    render(<QuizStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Physics" }));
    selectFormat(/short answer/i);
    fireEvent.click(screen.getByRole("button", { name: "Generate 10 Questions" }));

    await screen.findByLabelText(/your answer/i);
    expect(
      screen.getByRole("button", { name: /submit for ai evaluation/i }),
    ).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/your answer/i), {
      target: { value: "Mass times velocity." },
    });
    expect(
      screen.getByRole("button", { name: /submit for ai evaluation/i }),
    ).toBeEnabled();
  });
});
