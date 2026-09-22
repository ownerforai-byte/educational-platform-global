import { notFound } from "next/navigation";
import { PRO_SECTIONS, getProSection } from "@/features/knowledge/pro";
import { SectionContents } from "@/features/knowledge/pro/renderers";

export function generateStaticParams() {
  return PRO_SECTIONS.map((s) => ({ section: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const s = getProSection(section);
  return {
    title: s ? `${s.title} — Pro Knowledge` : "Pro Knowledge",
    description: s?.subtitle,
  };
}

export default async function ProSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const s = getProSection(section);
  if (!s) notFound();
  return <SectionContents section={s} />;
}
