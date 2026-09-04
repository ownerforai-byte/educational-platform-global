import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "Exam Countdown & Study Planner",
  description: "Track days until your NEB exam and get an auto-generated revision plan based on your syllabus coverage.",
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export default function ExamCountdownLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
