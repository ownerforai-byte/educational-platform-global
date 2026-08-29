import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

export const runtime = "edge";

const CLASS_SLUG = "class-11-notes";
const SUBJECT_SLUG = "mathematics";

export default async function MathematicsPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
