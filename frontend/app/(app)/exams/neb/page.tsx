import type { Metadata } from "next";
import { ExamTrackPage } from "@/components/exams/exam-track";

export const metadata: Metadata = {
  title: "NEB Board Exam",
  description:
    "A practical preparation map for NEB Class 11 and 12 board exams, using the study routes already available.",
};

export default function NebPage() {
  return (
    <ExamTrackPage
      eyebrow="Board track"
      title="NEB Board Exam"
      intro="Work from the official Class 11 and 12 syllabus into notes, past questions and timed practice. This is a preparation map, not an official NEB notice feed."
      steps={[
        {
          title: "Anchor to the syllabus",
          body: "Start each unit from the official syllabus page so revision follows the taught order.",
        },
        {
          title: "Read, then recall",
          body: "Use chapter notes and theory pages, then close them and write what you remember.",
        },
        {
          title: "Practise with past papers",
          body: "Move to PYQs and practice quizzes, then mark the units that keep failing.",
        },
        {
          title: "Review on a schedule",
          body: "Put weak units into the planner and revisit them before adding new questions.",
        },
      ]}
      resources={[
        {
          label: "Official Syllabus",
          description: "The curriculum order every subject page follows.",
          href: "/syllabus",
          meta: "Curriculum",
        },
        {
          label: "Class 11 Hub",
          description: "Notes, theory, chapters and mindmaps for the first board year.",
          href: "/class-11-notes",
          meta: "Class 11",
        },
        {
          label: "Class 12 Hub",
          description: "The same structured route for the second board year.",
          href: "/class-12-notes",
          meta: "Class 12",
        },
        {
          label: "Past Year Questions",
          description: "Practise exam-style questions from the existing question bank.",
          href: "/pyqs",
          meta: "Practice",
        },
        {
          label: "Mock Exams",
          description: "Sit a timed paper and review the units it exposes.",
          href: "/mock-exams",
          meta: "Timed",
        },
        {
          label: "Weekly Planner",
          description: "Turn weak units into a repeatable revision week.",
          href: "/planner",
          meta: "Planning",
        },
      ]}
      note="Model-question sets and exam dates are added by the content team; use your school or the relevant examination authority notice for final instructions."
    />
  );
}
