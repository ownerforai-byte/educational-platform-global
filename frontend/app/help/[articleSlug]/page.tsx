import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export async function generateMetadata({ params }: { params: Promise<{ articleSlug: string }> }): Promise<Metadata> {
  const { articleSlug } = await params;
  return { title: articleSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), description: "Help article." };
}

export default async function HelpArticlePage({ params }: { params: Promise<{ articleSlug: string }> }) {
  const { articleSlug: _ } = await params;
  return (
    <UnderDevelopment
      title="Help Article"
      description="This help article is being written."
      backHref="/help"
      backLabel="Back to Help Center"
    />
  );
}
