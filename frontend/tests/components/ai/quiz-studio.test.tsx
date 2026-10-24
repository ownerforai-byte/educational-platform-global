import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => ({
  generateQuestions: vi.fn(),
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
        {
          slug: "chemistry",
          name: "Chemistry",
          units: [{ title: "Matter", topics: ["Atomic structure"] }],
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
vi.mock("@/lib/api/ai", () => ({ generateQuestions: mocks.generateQuestions }));
vi.mock("@/lib/api/ai-quiz-history", () => ({ saveQuizHistory: mocks.saveQuizHistory }));

import { QuizStudio } from "@/components/ai/quiz-studio";

const generatedQuestion = {
  prompt: "Which structure contains the cell's genetic material?",
  options: ["Ribosome", "Nucleus", "Vacuole", "Cell wall"],
  correctIndex: 1,
  difficulty: "hard" as const,
  subject: "Biology",
  topic: "Cell structure",
  explanation: "The nucleus contains most of the cell's genetic material.",
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.generateQuestions.mockResolvedValue({
    questions: [generatedQuestion],
    provider: "test-provider",
  });
  mocks.saveQuizHistory.mockResolvedValue({ saved: true, migrated: true });
});

describe("QuizStudio configuration diversity", () => {
  it("generates an easy Class 11 Physics set with a syllabus topic and 5-question request", async () => {
    render(<QuizStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Physics" }));
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Motion" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Easy" }));
    fireEvent.click(screen.getByRole("button", { name: /^5$/ }));
    fireEvent.click(screen.getByRole("button", { name: "Generate 5 Questions" }));

    await waitFor(() => expect(mocks.generateQuestions).toHaveBeenCalledWith({
      classSlug: "class-11-notes",
      subjectSlug: "physics",
      topic: "Motion",
      difficulty: "easy",
      count: 5,
    }));
    expect(await screen.findByText(generatedQuestion.prompt)).toBeInTheDocument();
  });

  it("switches to Class 12, accepts a custom topic, and generates hard Biology questions", async () => {
    render(<QuizStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Class 12" }));
    fireEvent.click(screen.getByRole("button", { name: "Biology" }));
    fireEvent.change(screen.getByPlaceholderText(/newton's second law/i), {
      target: { value: "Cell transport" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Hard" }));
    fireEvent.click(screen.getByRole("button", { name: /^20$/ }));
    fireEvent.click(screen.getByRole("button", { name: "Generate 20 Questions" }));

    await waitFor(() => expect(mocks.generateQuestions).toHaveBeenCalledWith({
      classSlug: "class-12-notes",
      subjectSlug: "biology",
      topic: "Cell transport",
      difficulty: "hard",
      count: 20,
    }));
    expect(await screen.findByText(generatedQuestion.prompt)).toBeInTheDocument();
  });

  it("records the completed quiz result after selecting an answer", async () => {
    render(<QuizStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Physics" }));
    fireEvent.click(screen.getByRole("button", { name: "Generate 10 Questions" }));
    fireEvent.click(await screen.findByText("Nucleus"));
    fireEvent.click(screen.getByRole("button", { name: "Finish Quiz" }));

    await waitFor(() => expect(mocks.saveQuizHistory).toHaveBeenCalledWith(
      expect.objectContaining({
        classSlug: "class-11-notes",
        subjectSlug: "physics",
        answered: 1,
        correct: 1,
        scorePct: 100,
      }),
    ));
    expect(screen.getByText("1 / 1 correct")).toBeInTheDocument();
  });
});
