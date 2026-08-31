import { notFound } from "next/navigation";
import { KnowledgeSectionView } from "@/features/knowledge/components/knowledge-section-view";
import { getWorldKnowledgeSection } from "@/features/knowledge/data";

export default function GlobalTopicsPage() {
  const section = getWorldKnowledgeSection("global-topics");
  if (!section) notFound();
  return (
    <KnowledgeSectionView
      section={section}
      hubHref="/world-knowledge"
      hubLabel="World Knowledge"
    />
  );
}
