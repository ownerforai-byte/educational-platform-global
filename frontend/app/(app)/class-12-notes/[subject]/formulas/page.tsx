import { redirect } from "next/navigation";

export default async function SubjectFormulasRedirect({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  redirect(`/formulas/${subject}`);
}
