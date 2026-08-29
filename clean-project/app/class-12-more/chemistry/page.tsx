import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

export const runtime = "edge";

const CLASS_SLUG = "class-12-more";
const SUBJECT_SLUG = "chemistry";

export default async function ChemistryPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
