import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import Link from "next/link";
import { Brain, Newspaper, Globe2 } from "lucide-react";

export default function WorldKnowledgePage() {
  const sections = [
    {
      title: "General Knowledge",
      description: "Broad knowledge across science, history, geography, and culture.",
      href: "/world-knowledge/general-knowledge",
      icon: Brain,
      variant: "accent" as const,
    },
    {
      title: "Current Affairs",
      description: "Stay updated with recent global events and developments.",
      href: "/world-knowledge/current-affairs",
      icon: Newspaper,
      variant: "info" as const,
    },
    {
      title: "Global Topics",
      description: "Explore international issues, treaties, and world organizations.",
      href: "/world-knowledge/global-topics",
      icon: Globe2,
      variant: "success" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">🌍 World Knowledge</h1>
        <p className="mt-2 text-muted-foreground">
          Explore general knowledge, current affairs, and global topics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full transition-all hover:border-primary hover:shadow-lg card-with-icon nav-card group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <IconBadge icon={section.icon} variant={section.variant} className="card-icon" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
