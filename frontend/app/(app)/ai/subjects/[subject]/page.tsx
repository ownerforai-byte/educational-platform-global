import { notFound } from "next/navigation";
import { SubjectClassroom } from "@/components/ai/subject-classroom";
import {
  SUBJECT_CLASSROOMS,
  getSubjectClassroom,
} from "@/lib/ai/subject-classrooms";

/**
 * /ai/subjects/[subject] — one dedicated AI teaching interface per NEB
 * subject, each with its own private chat history (owner 2026-10-25: "one
 * interface per subject with their own history — no mix up, for clarity").
 *
 * The general Veer consoles keep their existing, untouched history; these
 * classrooms are additive.
 */

export function generateStaticParams() {
  return SUBJECT_CLASSROOMS.map((c) => ({ subject: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const classroom = getSubjectClassroom(subject);
  return {
    title: classroom ? classroom.title : "Subject Classroom",
    description: classroom?.tagline,
  };
}

export default async function SubjectClassroomPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const classroom = getSubjectClassroom(subject);
  if (!classroom) notFound();

  return <SubjectClassroom classroom={classroom} />;
}
