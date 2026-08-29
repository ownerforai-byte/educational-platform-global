import { notFound } from "next/navigation";
import { KnowledgeSectionView } from "@/features/knowledge/components/knowledge-section-view";
import { getLoksewaSection } from "@/features/knowledge/data";

export default function HistoryPage() {
  const section = getLoksewaSection("history");
  if (!section) notFound();
  return (
    <KnowledgeSectionView section={section} hubHref="/loksewa" hubLabel="Loksewa Knowledge" />
  );
}
