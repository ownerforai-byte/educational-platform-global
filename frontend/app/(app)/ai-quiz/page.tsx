import { QuizStudio } from "@/components/ai/quiz-studio";

export const metadata = {
  title: "Captain Quiz Generator — NEB Practice",
  description:
    "Generate practice questions from NEB syllabus content with Captain — easy, intermediate, or hard difficulty.",
};

export default function AiQuizPage() {
  return <QuizStudio />;
}
