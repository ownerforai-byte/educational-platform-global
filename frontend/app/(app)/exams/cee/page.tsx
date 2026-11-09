import type { Metadata } from "next";
import { ExamTrackPage } from "@/components/exams/exam-track";

export const metadata: Metadata = {
  title: "CEE Medical Entrance",
  description:
    "A medical-entrance preparation map built from the Class 11 and 12 science base, quizzes and analytics.",
};

export default function CeePage() {
  return (
    <ExamTrackPage
      eyebrow="Medical entrance"
      title="CEE Medical Entrance"
      intro="Prepare from the same Class 11 and 12 science base, then use quizzes and analytics to find weak topics. This page does not publish official CEE weightage or dates."
      steps={[
        {
          title: "Build the science base",
          body: "Read Physics, Chemistry and Biology in syllabus order before attempting mixed sets.",
        },
        {
          title: "Drill recall",
          body: "Use short quizzes to test definitions, formulae and high-yield facts without notes.",
        },
        {
          title: "Test under time",
          body: "Move to mixed practice and mock papers once single-subject accuracy is steady.",
        },
        {
          title: "Track weak units",
          body: "Use analytics and the planner to revisit the topics that cost the most marks.",
        },
      ]}
      resources={[
        {
          label: "Class 11 Hub",
          description: "The first-year science foundation for entrance revision.",
          href: "/class-11-notes",
          meta: "Foundation",
        },
        {
          label: "Class 12 Hub",
          description: "Second-year Biology, Chemistry and Physics in the same structure.",
          href: "/class-12-notes",
          meta: "Foundation",
        },
        {
          label: "Practice Quiz Bank",
          description: "Short recall sets across the existing question banks.",
          href: "/quiz",
          meta: "Recall",
        },
        {
          label: "Adaptive Veer Quiz",
          description: "Generated questions that adapt to the topics you miss.",
          href: "/ai-quiz",
          meta: "Adaptive",
        },
        {
          label: "Model Questions — Biology",
          description: "Entrance-style biology MCQs in syllabus order, with solving tricks.",
          href: "/exams/cee/biology/model-questions",
          meta: "Model questions",
        },
        {
          label: "Model Questions — Chemistry",
          description: "Entrance-style chemistry MCQs in syllabus order, with solving tricks.",
          href: "/exams/cee/chemistry/model-questions",
          meta: "Model questions",
        },
        {
          label: "Model Questions — Physics",
          description: "Entrance-style physics MCQs in syllabus order, with solving tricks.",
          href: "/exams/cee/physics/model-questions",
          meta: "Model questions",
        },
        {
          label: "Analytics",
          description: "See accuracy by subject and topic before choosing the next drill.",
          href: "/analytics",
          meta: "Review",
        },
        {
          label: "Weekly Planner",
          description: "Schedule the weak units instead of revising only favourite chapters.",
          href: "/planner",
          meta: "Planning",
        },
      ]}
      note="Official CEE syllabus, dates and seat information must be checked with the examination authority; this platform links study material and practice tools only."
    />
  );
}
