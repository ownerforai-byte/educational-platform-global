import type { Metadata } from "next";
import { ExamTrackPage } from "@/components/exams/exam-track";

export const metadata: Metadata = {
  title: "IOE Engineering Entrance",
  description:
    "An engineering-entrance preparation map built around mathematics, physics, formulae and timed practice.",
};

export default function IoePage() {
  return (
    <ExamTrackPage
      eyebrow="Engineering entrance"
      title="IOE Engineering Entrance"
      intro="Use mathematics, physics and formula practice as the entrance-prep spine, then move into timed mixed practice. This page does not publish official IOE weightage or dates."
      steps={[
        {
          title: "Secure the maths base",
          body: "Work through Class 11 and 12 mathematics units before timed numerical sets.",
        },
        {
          title: "Connect physics formulae",
          body: "Use formula sheets alongside the physics chapters, not as a replacement for them.",
        },
        {
          title: "Practise mixed problems",
          body: "Alternate topics inside one sitting so recall works under exam conditions.",
        },
        {
          title: "Review the misses",
          body: "Log slow or wrong questions, then revisit those units in the planner.",
        },
      ]}
      resources={[
        {
          label: "Dedicated IOE Entrance Portal (Standalone App)",
          description: "Opens in a separate window with full sidebar, live search, 140-mark practice drill, and Veer AI numerical solver.",
          href: "/ioe.html",
          meta: "Standalone App",
        },
        {
          label: "Engineering Disciplines & NEC License Portal",
          description: "Dedicated portal for BE Civil, Computer, Electrical, Mechanical disciplines and Nepal Engineering Council licensure prep.",
          href: "/engineering.html",
          meta: "Standalone App",
        },
        {
          label: "Class 11 Mathematics",
          description: "The first-year mathematics hub and its chapter routes.",
          href: "/class-11-notes/mathematics",
          meta: "Mathematics",
        },
        {
          label: "Class 12 Mathematics",
          description: "Second-year mathematics, organised by syllabus unit.",
          href: "/class-12-notes/mathematics",
          meta: "Mathematics",
        },
        {
          label: "Class 11 Physics",
          description: "Mechanics, waves and the rest of the first-year physics base.",
          href: "/class-11-notes/physics",
          meta: "Physics",
        },
        {
          label: "Class 12 Physics",
          description: "Second-year physics units with linked notes and theory.",
          href: "/class-12-notes/physics",
          meta: "Physics",
        },
        {
          label: "Formula Sheets",
          description: "Unit-wise formulae for quick recall before a practice set.",
          href: "/formulas",
          meta: "Reference",
        },
        {
          label: "Practice Hub",
          description: "Quizzes, PYQs, drills and mock papers in one place.",
          href: "/practice",
          meta: "Practice",
        },
        {
          label: "Mock Exams",
          description: "Timed papers for checking speed as well as accuracy.",
          href: "/mock-exams",
          meta: "Timed",
        },
        {
          label: "Analytics",
          description: "Topic-level accuracy to guide the next revision block.",
          href: "/analytics",
          meta: "Review",
        },
        {
          label: "Model Questions — Physics",
          description: "Entrance-style physics MCQs in syllabus order, with solving tricks.",
          href: "/exams/ioe/physics/model-questions",
          meta: "Model questions",
        },
        {
          label: "Model Questions — Chemistry",
          description: "Entrance-style chemistry MCQs in syllabus order, with solving tricks.",
          href: "/exams/ioe/chemistry/model-questions",
          meta: "Model questions",
        },
        {
          label: "Model Questions — Mathematics",
          description: "Entrance-style mathematics MCQs in syllabus order, with solving tricks.",
          href: "/exams/ioe/mathematics/model-questions",
          meta: "Model questions",
        },
        {
          label: "Model Questions — English",
          description: "Entrance-style English MCQs in syllabus order, with solving tricks.",
          href: "/exams/ioe/english/model-questions",
          meta: "Model questions",
        },
      ]}
      note="Official IOE syllabus, dates and admission instructions must be checked with the examination authority; this platform links study material and practice tools only."
    />
  );
}
