import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag}`, description: `All content tagged with ${tag}.` };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return (
    <UnderDevelopment
      title={`#${tag}`}
      description={`All notes, questions and resources tagged with "${tag}".`}
      backHref="/search"
      backLabel="Back to Search"
    />
  );
}
