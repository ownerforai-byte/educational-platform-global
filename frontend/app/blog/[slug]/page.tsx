import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), description: "Blog article." };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: _ } = await params;
  return (
    <UnderDevelopment
      title="Blog Article"
      description="This article is being written."
      backHref="/blog"
      backLabel="Back to Blog"
    />
  );
}
