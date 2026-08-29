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
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 md:p-10 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">🏛️ Loksewa Knowledge</h1>
        <p className="mt-2 text-muted-foreground">
          Prepare for Loksewa with curated materials and practice sets.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg card-shimmer h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{section.title}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{section.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
