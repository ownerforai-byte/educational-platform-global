import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  EntranceModelQuestions,
  type ModelQuestionUnit,
} from "@/components/exams/entrance-model-questions";
import { getModelQuestionUnits, hasEntranceBank } from "@/lib/entrance-questions";
import { findSubjectBySlug } from "@/lib/core/syllabus";

/** CEE (Medical entrance) tests the PCB science base. */
const SUBJECTS = ["physics", "chemistry", "biology"];

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({ subject }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const found = findSubjectBySlug(subject);
  const name = found?.subject.name ?? subject;
  return {
    title: `${name} — CEE Model Questions`,
    description: `Entrance-style ${name} MCQs for the CEE medical entrance, in syllabus order with solving tricks.`,
  };
}

export default async function CeeModelQuestionsPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  if (!SUBJECTS.includes(subject) || !hasEntranceBank(subject)) notFound();
  const found = findSubjectBySlug(subject);
  const subjectName = found?.subject.name ?? subject;
  const units: ModelQuestionUnit[] = getModelQuestionUnits(subject);

  return (
    <EntranceModelQuestions
      trackName="CEE medical entrance"
      trackLabel="CEE"
      subjectName={subjectName}
      units={units}
      backHref="/exams/cee"
      backLabel="Back to CEE Medical Entrance"
    />
  );
}
