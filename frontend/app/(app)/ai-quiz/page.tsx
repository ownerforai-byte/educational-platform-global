import { QuizStudio } from "@/components/ai/quiz-studio";

export const metadata = {
  title: "AI Quiz Generator — NEB Practice",
  description:
    "Generate AI practice questions from NEB syllabus content — easy, intermediate, or hard difficulty.",
};

export default function AiQuizPage() {
  return <QuizStudio />;
}
