import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

export const runtime = "edge";

const CLASS_SLUG = "class-11-notes";
const SUBJECT_SLUG = "physics";

export default async function PhysicsPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
