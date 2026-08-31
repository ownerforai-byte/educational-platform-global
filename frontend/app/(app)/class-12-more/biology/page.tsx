import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

const CLASS_SLUG = "class-12-more";
const SUBJECT_SLUG = "biology";

export default async function BiologyPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
