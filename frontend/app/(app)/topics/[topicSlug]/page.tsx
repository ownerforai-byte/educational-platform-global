import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const revalidate = 86_400;

export async function generateMetadata({ params }: { params: Promise<{ topicSlug: string }> }): Promise<Metadata> {
  const { topicSlug } = await params;
  const title = topicSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title, description: `All notes, formulas, PYQs and labs for ${title}.` };
}

export default async function TopicLandingPage({ params }: { params: Promise<{ topicSlug: string }> }) {
  const { topicSlug } = await params;
  const title = topicSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <UnderDevelopment
      title={title}
      description="Canonical topic page: notes, formulas, PYQs and related labs for this topic — coming soon."
      backHref="/search"
      backLabel="Back to Search"
    />
  );
}
