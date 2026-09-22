import { notFound } from "next/navigation";
import { PRO_SECTIONS, getProSection } from "@/features/knowledge/pro";
import { getChapter, isKnowledgeKindSlug, KNOWLEDGE_KINDS } from "@/features/knowledge/types";
import { KindPage } from "@/features/knowledge/pro/renderers";

export function generateStaticParams() {
  return PRO_SECTIONS.flatMap((s) =>
    s.chapters.flatMap((c) =>
      KNOWLEDGE_KINDS.map((k) => ({ section: s.id, chapter: c.id, kind: k.slug })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; chapter: string; kind: string }>;
}) {
  const { section, chapter, kind } = await params;
  const s = getProSection(section);
  const c = s ? getChapter(s, chapter) : undefined;
  const k = KNOWLEDGE_KINDS.find((x) => x.slug === kind);
  return {
    title: c && k ? `${k.label} — ${c.title}` : "Pro Knowledge",
    description: c?.blurb,
  };
}

export default async function ProKindPage({
  params,
}: {
  params: Promise<{ section: string; chapter: string; kind: string }>;
}) {
  const { section, chapter, kind } = await params;
  if (!isKnowledgeKindSlug(kind)) notFound();
  const s = getProSection(section);
  if (!s) notFound();
  const c = getChapter(s, chapter);
  if (!c) notFound();
  return <KindPage section={s} chapter={c} kind={kind} />;
}
