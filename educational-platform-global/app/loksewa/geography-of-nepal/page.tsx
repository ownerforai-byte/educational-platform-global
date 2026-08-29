import { notFound } from "next/navigation";
import { KnowledgeSectionView } from "@/features/knowledge/components/knowledge-section-view";
import { getLoksewaSection } from "@/features/knowledge/data";

export default function GeographyOfNepalPage() {
  const section = getLoksewaSection("geography-of-nepal");
  if (!section) notFound();
  return (
    <KnowledgeSectionView
      section={section}
      hubHref="/loksewa"
      hubLabel="Loksewa Knowledge"
    />
  );
}
