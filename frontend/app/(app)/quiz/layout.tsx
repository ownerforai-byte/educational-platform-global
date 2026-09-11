import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "PYQ Practice — NEB Past Year Questions",
  description: "Practice with past year questions from NEB exams. Select a subject and year, then test yourself with instant feedback.",
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
