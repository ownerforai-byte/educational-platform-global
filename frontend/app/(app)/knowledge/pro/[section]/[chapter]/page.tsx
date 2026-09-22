import { notFound } from "next/navigation";
import { PRO_SECTIONS, getProSection } from "@/features/knowledge/pro";
import { getChapter } from "@/features/knowledge/types";
import { ChapterContents } from "@/features/knowledge/pro/renderers";

export function generateStaticParams() {
  return PRO_SECTIONS.flatMap((s) =>
    s.chapters.map((c) => ({ section: s.id, chapter: c.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; chapter: string }>;
}) {
  const { section, chapter } = await params;
  const s = getProSection(section);
  const c = s ? getChapter(s, chapter) : undefined;
  return {
    title: c ? `${c.title} — ${s!.title}` : "Pro Knowledge",
    description: c?.blurb,
  };
}

export default async function ProChapterPage({
  params,
}: {
  params: Promise<{ section: string; chapter: string }>;
}) {
  const { section, chapter } = await params;
  const s = getProSection(section);
  if (!s) notFound();
  const c = getChapter(s, chapter);
  if (!c) notFound();
  return <ChapterContents section={s} chapter={c} />;
}
