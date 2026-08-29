import { redirect } from "next/navigation";
import { getSubjectSyllabus } from "@/lib/syllabus";




/** Legacy shortcut: /class-11-notes/[subject]/[unit] → chapters/[unit] */
export default async function UnitRedirectPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}) {
  const { subject, unit } = await params;
  const classSlug = "class-11-notes";
  const subjectData = getSubjectSyllabus(classSlug, subject);
  if (!subjectData?.units.some((u) => u.id === unit)) {
    redirect(`/${classSlug}/${subject}`);
  }
  redirect(`/${classSlug}/${subject}/chapters/${unit}`);
}


