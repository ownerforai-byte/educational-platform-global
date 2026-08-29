import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import Link from "next/link";
import { Map, Scroll, TreePine } from "lucide-react";

export default function LoksewaPage() {
  const sections = [
    {
      title: "Geography of Nepal",
      description: "Study Nepal's physical features, climate, rivers, mountains, and administrative divisions.",
      href: "/loksewa/geography-of-nepal",
      icon: Map,
      variant: "success" as const,
    },
    {
      title: "History",
      description: "Explore Nepalese history from ancient kingdoms to modern democratic movements.",
      href: "/loksewa/history",
      icon: Scroll,
      variant: "warning" as const,
    },
    {
      title: "Environment",
      description: "Learn about Nepal's biodiversity, conservation, climate change, and environmental policies.",
      href: "/loksewa/environment",
      icon: TreePine,
      variant: "accent" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">🏛️ Loksewa Knowledge</h1>
        <p className="mt-2 text-muted-foreground">
          Prepare for Loksewa with curated materials and practice sets.
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
