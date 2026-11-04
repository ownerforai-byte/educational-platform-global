import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Blog",
  description: "Study tips, exam strategies, content updates and news from NEB Study Vault.",
};

export default function BlogPage() {
  return (
    <UnderDevelopment
      title="Blog"
      description="Study tips, exam strategies, NEB news and platform updates — published regularly."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
