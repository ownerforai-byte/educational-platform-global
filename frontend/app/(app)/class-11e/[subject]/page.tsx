import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";



const CLASS_SLUG = "class-11e";


export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={subject} />;
}


