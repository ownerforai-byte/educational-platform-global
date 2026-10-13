import { notFound } from "next/navigation";
import { getResource } from "@/lib/api";
import type { Resource } from "@/types/api";
import { EmptyState } from "@/components/content/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesViewer } from "@/components/content/notes-viewer";
import { PdfViewer } from "@/components/content/pdf-viewer";
export const dynamic = "force-dynamic";



export default async function ResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let resource: Resource | null = null;
  try {
    resource = await getResource(id);
  } catch {
    resource = null;
  }
  if (!resource) notFound();

  const content =
    typeof resource.content === "string"
      ? resource.content
      : resource.content
        ? JSON.stringify(resource.content, null, 2)
        : "";

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>
        <p className="text-sm text-muted-foreground">{resource.type}</p>
      </div>

      {resource.type === "PDF" && resource.media_url ? (
        <PdfViewer title={resource.title} mediaUrl={resource.media_url} />
      ) : content ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content</CardTitle>
          </CardHeader>
          <CardContent>
            <NotesViewer title={resource.title} content={content} />
          </CardContent>
        </Card>
      ) : resource.media_url ? (
        <Card>
          <CardContent className="py-6">
            <a
              href={resource.media_url}
              className="text-primary hover:underline"
            >
              Open media
            </a>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          title="No content yet"
          description="This resource has no published content body."
        />
      )}
    </div>
  );
}
