import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

const CLASS_SLUG = "class-11e";
const SUBJECT_SLUG = "nepali";

export default async function NepaliPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
