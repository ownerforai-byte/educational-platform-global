import { notFound } from "next/navigation";
import { getResourceById } from "@/lib/curriculum";
import { ResourceForm } from "@/components/content/resource-form";
import { BackButton } from "@/components/navigation/back-button";

export const dynamic = "force-dynamic";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource) notFound();

  const formattedContent =
    typeof resource.content === "object" && resource.content !== null
      ? (resource.content as Record<string, unknown>)
      : typeof resource.content === "string"
        ? { text: resource.content }
        : {};

  const formattedMetadata =
    typeof resource.metadata === "object" && resource.metadata !== null
      ? (resource.metadata as Record<string, unknown>)
      : {};

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Resource</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Editing &quot;{resource.title}&quot; · Type: {resource.type}
          </p>
        </div>
        <BackButton />
      </div>

      <ResourceForm
        topicId={resource.topic_id}
        resource={{
          id: resource.id,
          title: resource.title,
          type: resource.type,
          content: formattedContent,
          media_url: resource.media_url,
          metadata: formattedMetadata,
        }}
      />
    </div>
  );
}
