import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

const CLASS_SLUG = "class-11e";
const SUBJECT_SLUG = "chemistry";

export default async function ChemistryPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
