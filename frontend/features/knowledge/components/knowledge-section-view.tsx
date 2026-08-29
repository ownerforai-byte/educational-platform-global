import Link from "next/link";
import { BackButton } from "@/components/navigation/back-button";
import { UnderDevelopment } from "@/components/content/under-development";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { BookOpen, CheckSquare, FileText } from "lucide-react";
import type { KnowledgeSection } from "../data";

const SECTION_EMOJI: Record<string, string> = {
  "Geography of Nepal": "🏔️",
  History: "📜",
  Environment: "🌲",
  "General Knowledge": "💡",
  "Current Affairs": "📰",
  "Global Topics": "🌍",
};

export function KnowledgeSectionView({
  section,
  hubHref,
  hubLabel,
}: {
  section: KnowledgeSection;
  hubHref: string;
  hubLabel: string;
}) {
  const emoji = SECTION_EMOJI[section.name] ?? "📘";
  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            <Link href={hubHref} className="hover:text-primary hover:underline">
              {hubLabel}
            </Link>
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">{emoji} {section.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
        </div>
        <BackButton />
      </div>

      <Card id="syllabus" className="border-primary/30 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <IconBadge icon={FileText} variant="primary" size="sm" />
            <div>
              <CardTitle className="text-lg">📊 Syllabus</CardTitle>
              <p className="text-sm font-normal text-muted-foreground mt-1">
                Official topic outline for this section. Notes and practice will be added strictly under these topics.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {section.topics.map((topic, index) => (
            <div key={topic.id} className="space-y-2">
              <h3 className="font-semibold text-primary">
                {index + 1}. {topic.title}
              </h3>
              <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                {topic.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={BookOpen} variant="info" size="sm" />
          <h2 className="text-xl font-semibold tracking-tight">📝 Notes</h2>
        </div>
        <UnderDevelopment
          title="Notes Under Development"
          description="Comprehensive notes for this syllabus are being prepared and will be available soon. Each topic will have detailed explanations, examples, and practice questions."
          variant="construction"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={CheckSquare} variant="success" size="sm" />
          <h2 className="text-xl font-semibold tracking-tight">✅ Practice</h2>
        </div>
        <UnderDevelopment
          title="Practice Sets Coming Soon"
          description="Tests, quizzes, and previous year questions (PYQs) for this section will be added in a future update. Track your progress and prepare effectively."
          variant="clock"
        />
      </div>
    </div>
  );
}
