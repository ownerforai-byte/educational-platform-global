import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

const CLASS_SLUG = "class-12-more";
const SUBJECT_SLUG = "english";

export default async function EnglishPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
