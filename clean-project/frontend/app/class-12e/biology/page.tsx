import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

const CLASS_SLUG = "class-12e";
const SUBJECT_SLUG = "biology";

export default async function BiologyPage() {
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={SUBJECT_SLUG} />;
}
