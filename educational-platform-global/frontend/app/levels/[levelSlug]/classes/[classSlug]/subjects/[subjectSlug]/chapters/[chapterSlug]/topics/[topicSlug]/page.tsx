import { getTopicDetail } from "@/lib/curriculum";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/navigation/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/content/under-development";
import Link from "next/link";



const RESOURCE_TYPE_LABELS: Record<string, string> = {
  SYLLABUS: "Syllabus",
  MINDMAP: "Mind Map",
  NOTES: "Notes",
  NUMERICAL: "Numericals",
  FLASHCARD: "Flashcards",
  QUIZ: "Quizzes",
  VIDEO: "Videos",
};

export default async function TopicPage({
  params,
}: {
  params: Promise<{
    levelSlug: string;
    classSlug: string;
    subjectSlug: string;
    chapterSlug: string;
    topicSlug: string;
  }>;
}) {
  const { levelSlug, classSlug, subjectSlug, chapterSlug, topicSlug } = await params;
  const detail = await getTopicDetail(
    levelSlug,
    classSlug,
    subjectSlug,
    chapterSlug,
    topicSlug
  );

  if (!detail) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <h1 className="text-2xl font-bold">Topic not found</h1>
      </div>
    );
  }

  const { topic, resources, linkedResources } = detail;

  const grouped = resources.reduce<Record<string, typeof resources>>(
    (acc, r) => {
      const key = r.type;
      acc[key] = acc[key] ?? [];
      acc[key].push(r);
      return acc;
    },
    {}
  );

  const resourceTypes = Object.keys(grouped).sort();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels" },
    { label: topic.title },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
        {topic.description && (
          <p className="text-muted-foreground">{topic.description}</p>
        )}
      </div>

      {resourceTypes.length === 0 && linkedResources.length === 0 ? (
        <UnderDevelopment />
      ) : (
        <div className="space-y-6">
          {resourceTypes.map((type) => (
            <div key={type} className="space-y-3">
              <h2 className="text-xl font-semibold">
                {RESOURCE_TYPE_LABELS[type] ?? type}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(grouped[type] ?? []).map((resource) => (
                  <Link
                    key={resource.id}
                    href={`/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}/chapters/${chapterSlug}/topics/${topicSlug}/resources/${resource.id}`}
                  >
                    <Card className="h-full transition-colors hover:border-primary">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {resource.content_type}
                        </p>
                        {resource.media_url && (
                          <span className="text-sm text-primary">
                            Has media
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {linkedResources.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Linked Resources</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {linkedResources.map((link) => (
                  <Link
                    key={link.id}
                    href={`/levels/${levelSlug}/classes/${classSlug}/subjects/${subjectSlug}/chapters/${chapterSlug}/topics/${topicSlug}/resources/${link.referenced.id}`}
                  >
                    <Card className="h-full transition-colors hover:border-primary">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {link.referenced.title}
                        </CardTitle>
                        <CardDescription>
                          {link.reference_type}
                          {link.attribution ? ` — ${link.attribution}` : ""}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
