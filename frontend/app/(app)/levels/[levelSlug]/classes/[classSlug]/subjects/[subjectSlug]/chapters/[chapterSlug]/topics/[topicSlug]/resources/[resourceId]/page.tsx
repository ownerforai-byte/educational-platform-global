import { getResourceById } from "@/lib/curriculum";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { NotesViewer } from "@/components/content/notes-viewer";
import { NumericalViewer } from "@/components/content/numerical-viewer";
import { FlashcardViewer } from "@/components/content/flashcard-viewer";
import { QuizViewer } from "@/components/content/quiz-viewer";
import { VideoViewer } from "@/components/content/video-viewer";



export default async function ResourcePage({
  params,
}: {
  params: Promise<{
    levelSlug: string;
    classSlug: string;
    subjectSlug: string;
    chapterSlug: string;
    topicSlug: string;
    resourceId: string;
  }>;
}) {
  const { levelSlug, classSlug, subjectSlug, chapterSlug, topicSlug, resourceId } = await params;
  const resource = await getResourceById(resourceId);

  if (!resource) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Resource not found</h1>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    {
      label: resource.title,
      href: `/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}/chapters/${chapterSlug}/topics/${topicSlug}`,
    },
  ];

  const questions = ((resource.metadata as Record<string, unknown> | undefined)?.questions ?? []) as Array<{
    id: string;
    type: "multiple_choice" | "true_false";
    prompt: string;
    options?: string[];
    answer: string | boolean;
    explanation?: string;
  }>;

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>

      {resource.type === "NOTES" && (
        <NotesViewer
          title={resource.title}
          content={String(resource.content ?? "")}
        />
      )}
      {resource.type === "NUMERICAL" && (
        <NumericalViewer
          title={resource.title}
          content={String(resource.content ?? "")}
          metadata={(resource.metadata as Record<string, unknown> | null) ?? null}
        />
      )}
      {resource.type === "FLASHCARD" && (
        <FlashcardViewer
          cards={[
            {
              id: resource.id,
              title: resource.title,
              content: resource.content as Record<string, unknown>,
            },
          ]}
        />
      )}
      {resource.type === "QUIZ" && (
        <QuizViewer title={resource.title} questions={questions} />
      )}
      {resource.type === "VIDEO" && (
        <VideoViewer title={resource.title} mediaUrl={resource.media_url} />
      )}
      {!["NOTES", "NUMERICAL", "FLASHCARD", "QUIZ", "VIDEO"].includes(
        resource.type
      ) && (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            This resource type ({resource.type}) does not have a viewer yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
