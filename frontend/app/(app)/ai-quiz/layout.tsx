import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veer Quiz Generator — NEB Practice Questions",
  description: "Generate custom MCQs from syllabus content with easy, intermediate, or hard difficulty. Powered by Veer.",
};

export const viewport = {
  themeColor: "#3b82f6",
};

export default function AiQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
