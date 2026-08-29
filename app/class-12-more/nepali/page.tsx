import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

export const runtime = "edge";

const CLASS_SLUG = "class-12-more";
const SUBJECT_SLUG = "nepali";

export default async function NepaliPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
